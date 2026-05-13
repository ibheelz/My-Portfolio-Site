'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Exploration } from '@/src/data/content'

interface ExplorationCardProps {
  exploration: Exploration
}

export default function ExplorationCard({ exploration }: ExplorationCardProps) {
  return (
    <Link href={`/explorations/${exploration.slug}`} className="exploration-card group" style={{ width: '100%', aspectRatio: '1', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
      {/* Image Container */}
      <div style={{ width: '100%', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--grey-bg)', position: 'relative' }}>
        <Image
          src={exploration.cardImage}
          alt={exploration.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-[400ms]"
        />
      </div>

      {/* Text Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3 className="heading-3" style={{ color: 'rgb(250, 250, 250)' }}>
          {exploration.title}
        </h3>
      </div>
    </Link>
  )
}
