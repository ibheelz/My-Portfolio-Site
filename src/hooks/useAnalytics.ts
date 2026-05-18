'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

function generateUUID(): string {
  return crypto.randomUUID()
}

function getOrCreateSessionId(): string {
  const existing = sessionStorage.getItem('_aid')
  if (existing) return existing
  const id = generateUUID()
  sessionStorage.setItem('_aid', id)
  return id
}

function post(body: Record<string, unknown>) {
  if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })
    navigator.sendBeacon('/api/track', blob)
  } else {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {})
  }
}

export function useAnalytics() {
  const pathname = usePathname()
  const sessionIdRef = useRef<string | null>(null)
  const sessionStartRef = useRef<number>(Date.now())
  const pageStartRef = useRef<number>(Date.now())
  const prevPathRef = useRef<string | null>(null)
  const sessionStartedRef = useRef(false)
  const pagesRef = useRef<string[]>([])
  const clickTextsRef = useRef<string[]>([])
  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (isInitializedRef.current) return
    isInitializedRef.current = true

    const sessionId = getOrCreateSessionId()
    sessionIdRef.current = sessionId
    sessionStartRef.current = Date.now()
    pageStartRef.current = Date.now()

    const sessionAlreadyStarted = sessionStorage.getItem('_aid_started')

    if (!sessionAlreadyStarted) {
      sessionStorage.setItem('_aid_started', '1')
      sessionStartedRef.current = true

      post({
        type: 'session_start',
        sessionId,
        referrer: document.referrer || null,
      })
    }

    pagesRef.current.push(pathname)
    post({
      type: 'pageview',
      sessionId,
      path: pathname,
      referrer: document.referrer || null,
    })

    prevPathRef.current = pathname
  }, [])

  useEffect(() => {
    const sessionId = sessionIdRef.current
    if (!sessionId) return
    if (prevPathRef.current === null) return
    if (prevPathRef.current === pathname) return

    const timeSpent = Math.round((Date.now() - pageStartRef.current) / 1000)
    pageStartRef.current = Date.now()

    pagesRef.current.push(pathname)

    post({
      type: 'pageview',
      sessionId,
      path: pathname,
      referrer: prevPathRef.current,
      timeSpent,
    })

    prevPathRef.current = pathname
  }, [pathname])

  useEffect(() => {
    const sessionId = sessionIdRef.current
    if (!sessionId) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const closest = target.closest('a, button, [role="button"]') as HTMLElement | null
      const el = closest ?? target

      let text = (el.innerText ?? el.getAttribute('aria-label') ?? '').trim()
      // Remove newlines and extra whitespace
      text = text.replace(/\s+/g, ' ').slice(0, 100)
      const type = el.tagName.toLowerCase()

      if (!text) return

      if (!clickTextsRef.current.includes(text)) {
        clickTextsRef.current.push(text)
      }

      post({
        type: 'click',
        sessionId,
        path: window.location.pathname,
        elementText: text,
        elementType: type,
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    const handleUnload = () => {
      const sessionId = sessionIdRef.current
      if (!sessionId) return

      const totalTime = Math.round((Date.now() - sessionStartRef.current) / 1000)

      const body = JSON.stringify({
        type: 'session_end',
        sessionId,
        totalTime,
        pages: pagesRef.current,
        clicks: clickTextsRef.current,
      })

      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/track', blob)
    }

    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('pagehide', handleUnload)
    return () => {
      window.removeEventListener('beforeunload', handleUnload)
      window.removeEventListener('pagehide', handleUnload)
    }
  }, [])
}
