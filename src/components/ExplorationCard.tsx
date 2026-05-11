'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Exploration } from '@/src/data/content'

interface ExplorationCardProps {
  exploration: Exploration
}

export default function ExplorationCard({ exploration }: ExplorationCardProps) {
  return (
    <Link href={`/explorations/${exploration.slug}`} className="exploration-card group" style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '520px', overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}>
        {/* Image Container */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1', borderRadius: '16px', backgroundColor: 'var(--grey-bg)', position: 'relative' }}>
          <Image
            src={exploration.cardImage}
            alt={exploration.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-[400ms]"
          />
        </div>

        {/* Text Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', height: '60px', justifyContent: 'flex-start' }}>
          <h3 className="heading-3">
            {exploration.title}
          </h3>
        </div>
      </Link>
  )
}
