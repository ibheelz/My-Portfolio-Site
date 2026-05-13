'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Exploration } from '@/src/data/content'

interface ExplorationCardProps {
  exploration: Exploration
}

export default function ExplorationCard({ exploration }: ExplorationCardProps) {
  return (
    <Link
      href={`/explorations/${exploration.slug}`}
      className="exploration-card group"
      style={{
        width: '100%',
        aspectRatio: '1',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(8px, 2vw, 16px)',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer'
      }}
    >
      {/* Image Container */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          borderRadius: 'clamp(12px, 2vw, 20px)',
          overflow: 'hidden',
          backgroundColor: 'var(--grey-bg)',
          position: 'relative'
        }}
      >
        <img
          src={exploration.cardImage}
          alt={exploration.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[400ms]"
        />
      </div>

      {/* Text Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 1vw, 8px)' }}>
        <h3
          className="font-body text-[clamp(12px,2vw,16px)] leading-[1.5]"
          style={{ color: 'rgb(250, 250, 250)', fontFamily: "'Gucina'", fontWeight: 600 }}
        >
          {exploration.title}
        </h3>
      </div>
    </Link>
  )
}
