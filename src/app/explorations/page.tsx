'use client'

import { explorations } from '@/src/data/content'
import ExplorationCard from '@/src/components/ExplorationCard'

export default function ExplorationsPage() {
  return (
    <>
      {/* Fixed decorative margins */}
      <div className="fixed-top-margin" />
      <div className="fixed-bottom-margin" />

      {/* Content container */}
      <div
        className="w-full bg-[rgb(14,14,18)]"
        style={{
          paddingTop: 'clamp(32px, 8vw, 64px)',
          paddingBottom: 'clamp(32px, 8vw, 64px)',
          paddingLeft: 'clamp(16px, 5vw, 64px)',
          paddingRight: 'clamp(16px, 5vw, 64px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(32px, 8vw, 64px)'
        }}
      >
        {/* SECTION 1 - Page Headline */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vw, 12px)', overflow: 'hidden' }}>
          <h1
            className="font-heading text-[clamp(32px,8vw,45px)] leading-[1.2] tracking-[-0.02em] uppercase"
            style={{ fontFamily: 'Mortend', color: 'rgb(250, 250, 250)' }}
          >
            Latest creations
          </h1>
          <p
            className="font-body text-[clamp(14px,2vw,16px)] leading-[1.6] tracking-[0.01em]"
            style={{ color: 'rgb(138, 138, 138)', maxWidth: '100%', fontFamily: "'Gucina'" }}
          >
            Created with Nano Banana and other tools
          </p>
        </section>

        {/* SECTION 2 - Explorations Grid */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div
            className="w-full"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 30vw, 400px), 1fr))',
              columnGap: 'clamp(16px, 4vw, 32px)',
              rowGap: 'clamp(32px, 6vw, 64px)'
            }}
          >
            {explorations.map((exploration) => (
              <ExplorationCard key={exploration.slug} exploration={exploration} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
