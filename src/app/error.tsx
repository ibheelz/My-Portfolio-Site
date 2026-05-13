'use client'

import Link from 'next/link'
import { ArrowUp } from '@phosphor-icons/react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        backgroundColor: 'rgb(2, 1, 10)',
        height: '100vh',
        paddingRight: '16px',
        paddingBottom: '16px',
      }}
    >
      <div style={{ zIndex: 10, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'Mortend',
              fontSize: '45px',
              lineHeight: '106px',
              letterSpacing: '-0.02em',
              color: 'rgb(250, 250, 250)',
              margin: 0,
              fontWeight: 400,
            }}
          >
            Error
          </h1>

          <p
            style={{
              fontFamily: 'Gucina',
              fontSize: '28px',
              lineHeight: '1.3em',
              letterSpacing: '-0.02em',
              color: 'rgb(250, 250, 250)',
              maxWidth: '480px',
              margin: 0,
              fontWeight: 500,
            }}
          >
            Something went wrong
          </p>
        </div>

        <Link
          href="/"
          style={{
            marginTop: '64px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '12px 36px',
            borderRadius: '40px',
            border: '1px solid rgb(129, 195, 215)',
            backgroundColor: 'transparent',
            color: 'rgb(129, 195, 215)',
            fontFamily: 'Gucina',
            fontSize: '12px',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 2,
          }}
          className="hover:bg-[rgb(22,66,91)] hover:bg-opacity-20"
        >
          <ArrowUp size={18} weight="regular" color="rgb(129, 195, 215)" style={{ flexShrink: 0 }} />
          <span>Back home</span>
        </Link>
      </div>
    </div>
  )
}
