'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Exploration } from '@/src/data/content'
import ToolIcon from './ToolIcon'

interface ExplorationCardProps {
  exploration: Exploration
}

export default function ExplorationCard({ exploration }: ExplorationCardProps) {
  return (
    <Link
      href={`/explore/${exploration.slug}`}
      className="exploration-card group"
      style={{
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <h3
            className="font-body text-[clamp(12px,2.5vw,16px)] leading-[1.5]"
            style={{ color: 'rgb(250, 250, 250)', fontFamily: "'Gucina'", fontWeight: 600 }}
          >
            {exploration.title}
          </h3>
          {exploration.tools && exploration.tools.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              {exploration.tools.map((tool) => (
                <div key={tool} style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ToolIcon name={tool} hideText={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
