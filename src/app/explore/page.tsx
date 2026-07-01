'use client'

import { explorations } from '@/src/data/content'
import ExplorationCard from '@/src/components/ExplorationCard'
import { FadeIn } from '@/src/components/FadeIn'

export default function ExplorationsPage() {
  const getYear = (dateStr?: string) => {
    if (!dateStr) return 0
    const match = dateStr.match(/\d{4}/)
    return match ? parseInt(match[0], 10) : 0
  }

  const sortedExplorations = [...explorations].sort((a, b) => getYear(b.date) - getYear(a.date))

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
        <FadeIn>
          <section style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vw, 12px)', overflow: 'hidden' }}>
            <h1
              className="font-heading text-[clamp(32px,8vw,45px)] leading-[1.2] tracking-[-0.02em] uppercase"
              style={{ fontFamily: 'Mortend', color: 'rgb(250, 250, 250)', margin: 0 }}
            >
              Explorations
            </h1>
          </section>
        </FadeIn>

        {/* SECTION 2 - Explorations Grid */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div
            className="w-full explorations-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(50px, 1fr))',
              columnGap: 'clamp(16px, 4vw, 32px)',
              rowGap: 'clamp(48px, 10vw, 96px)'
            }}
          >
            {sortedExplorations.map((exploration, index) => (
              <FadeIn key={exploration.slug} delay={index * 0.08}>
                <ExplorationCard exploration={exploration} />
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
