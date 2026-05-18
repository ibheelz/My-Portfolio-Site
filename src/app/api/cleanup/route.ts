import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/db'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 30)

  const oldVisitors = await prisma.visitor.findMany({
    where: { startedAt: { lt: cutoff } },
    select: { sessionId: true },
  })

  const sessionIds = oldVisitors.map((v) => v.sessionId)

  if (sessionIds.length > 0) {
    await prisma.click.deleteMany({ where: { sessionId: { in: sessionIds } } })
    await prisma.pageView.deleteMany({ where: { sessionId: { in: sessionIds } } })
    await prisma.visitor.deleteMany({ where: { sessionId: { in: sessionIds } } })
  }

  return NextResponse.json({ deleted: sessionIds.length })
}
