'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUp } from '@phosphor-icons/react'
import { Particles } from '@tsparticles/react'
import type { Engine } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

export default function NotFound() {
  const particlesRef1 = useRef<typeof Particles>(null)
  const particlesRef2 = useRef<typeof Particles>(null)

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine)
  }

  const particlesOptions1 = {
    particles: {
      number: { value: 154 },
      size: { value: { min: 0.5, max: 1.5 } },
      color: { value: 'rgb(97, 97, 97)' },
      opacity: { value: { min: 0.1, max: 0.3 } },
      move: { enable: true, speed: 0.3, direction: 'none' as const, random: true },
      links: { enable: false },
    },
    fullScreen: false,
  }

  const particlesOptions2 = {
    particles: {
      number: { value: 8 },
      size: { value: { min: 2, max: 4 } },
      color: { value: 'rgb(51, 51, 51)' },
      opacity: { value: { min: 0.2, max: 0.5 } },
      move: { enable: true, speed: 0.8, direction: 'none' as const, random: true },
      links: { enable: false },
    },
    fullScreen: false,
  }

  return (
    <div
      className="flex flex-col items-center justify-center relative overflow-visible"
      style={{
        backgroundColor: 'rgb(2, 1, 10)',
        height: '100vh',
        paddingRight: '16px',
        paddingBottom: '16px',
      }}
    >
      {/* First Particle Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          ref={particlesRef1}
          init={particlesInit}
          options={particlesOptions1}
        />
      </div>

      {/* Second Particle Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          ref={particlesRef2}
          init={particlesInit}
          options={particlesOptions2}
        />
      </div>

      {/* Text Block and Button Container */}
      <div style={{ zIndex: 10, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Text Block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* 404 Number */}
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
            404
          </h1>

          {/* Error Message */}
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
            Looks like the page you're searching for took a detour
          </p>
        </div>

        {/* Button */}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(22, 66, 91, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <ArrowUp size={18} weight="regular" color="rgb(129, 195, 215)" style={{ flexShrink: 0 }} />
          <span>Back home</span>
        </Link>
      </div>
    </div>
  )
}
