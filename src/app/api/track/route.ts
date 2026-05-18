import { NextRequest, NextResponse } from 'next/server'
import { isbot } from 'isbot'
import { UAParser } from 'ua-parser-js'
import prisma from '@/src/lib/db'
import { lookupIp } from '@/src/lib/geolocation'
import { notifyVisitorArrival, notifySessionEnd } from '@/src/lib/discord'

type EventType = 'session_start' | 'pageview' | 'click' | 'session_end'

interface TrackBody {
  type: EventType
  sessionId: string
  path?: string
  referrer?: string
  elementText?: string
  elementType?: string
  timeSpent?: number
  totalTime?: number
  pages?: string[]
  clicks?: string[]
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get('user-agent') ?? ''

    if (isbot(ua)) {
      return NextResponse.json({ ok: true })
    }

    const body: TrackBody = await req.json()
    const { type, sessionId } = body

    if (!sessionId) {
      return NextResponse.json({ error: 'missing sessionId' }, { status: 400 })
    }

    if (type === 'session_start') {
      const ip = getClientIp(req)
      const parser = new UAParser(ua)
      const result = parser.getResult()

      const browser = `${result.browser.name ?? 'Unknown'} ${result.browser.major ?? ''}`.trim()
      const os = result.os.name ?? 'Unknown'
      const deviceType =
        result.device.type === 'mobile'
          ? 'Mobile'
          : result.device.type === 'tablet'
          ? 'Tablet'
          : 'Desktop'

      await prisma.visitor.create({
        data: {
          sessionId,
          ip,
          country: null,
          city: null,
          isp: null,
          browser,
          os,
          deviceType,
          referrer: body.referrer ?? null,
          userAgent: ua,
        },
      })

      // Fire-and-forget: don't block response for geolocation & Discord
      Promise.all([
        lookupIp(ip).then(geo =>
          prisma.visitor.update({
            where: { sessionId },
            data: {
              country: geo?.country ?? null,
              city: geo?.city ?? null,
              isp: geo?.isp ?? null,
            },
          })
        ),
        lookupIp(ip).then(geo =>
          notifyVisitorArrival({
            city: geo?.city ?? 'Unknown',
            country: geo?.country ?? 'Unknown',
            ip,
            isp: geo?.isp ?? 'Unknown',
            browser,
            os,
            deviceType,
            referrer: body.referrer ?? null,
            timestamp: new Date(),
          })
        ),
      ]).catch(() => {})
    }

    if (type === 'pageview') {
      await prisma.pageView.create({
        data: {
          sessionId,
          path: body.path ?? '/',
          referrer: body.referrer ?? null,
          timeSpent: body.timeSpent ?? null,
        },
      })
    }

    if (type === 'click') {
      await prisma.click.create({
        data: {
          sessionId,
          path: body.path ?? '/',
          elementText: body.elementText ?? null,
          elementType: body.elementType ?? null,
        },
      })
    }

    if (type === 'session_end') {
      await prisma.visitor.update({
        where: { sessionId },
        data: {
          endedAt: new Date(),
          totalTime: body.totalTime ?? null,
        },
      })

      await notifySessionEnd({
        pages: body.pages ?? [],
        clicks: body.clicks ?? [],
        durationSeconds: body.totalTime ?? 0,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[analytics]', err)
    return NextResponse.json({ ok: true })
  }
}
