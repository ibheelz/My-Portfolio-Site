'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Exploration } from '@/src/data/content'

interface ExplorationCardProps {
  exploration: Exploration
}

export default function ExplorationCard({ exploration }: ExplorationCardProps) {
  return (
    <Link href={`/explorations/${exploration.slug}`} className="exploration-card group" style={{ position: 'relative', width: '100%', height: '550px', aspectRatio: '0.889', overflow: 'hidden', textDecoration: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
      {/* Image Container */}
      <div style={{ width: '100%', flex: 1, borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--grey-bg)', position: 'relative' }}>
        <Image
          src={exploration.cardImage}
          alt={exploration.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-[400ms]"
        />
      </div>

      {/* Text Area - positioned absolutely */}
      <div style={{ position: 'absolute', top: '363px', left: 0, right: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 10 }}>
        <h3 className="heading-3" style={{ color: 'rgb(250, 250, 250)' }}>
          {exploration.title}
        </h3>
      </div>
    </Link>
  )
}
