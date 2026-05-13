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
      <div className="explorations-content">
        {/* SECTION 1 - Page Headline */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
          <h1 className="heading-s" style={{ textTransform: 'uppercase' }}>
            Latest creations
          </h1>
          <p className="body-m-leading" style={{ color: 'rgb(138, 138, 138)', maxWidth: '340px' }}>
            Created with Nano Banana and other tools
          </p>
        </section>

        {/* SECTION 2 - Explorations Grid */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div className="explorations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(50px, 1fr))', columnGap: '24px', rowGap: '50px' }}>
            {explorations.map((exploration) => (
              <ExplorationCard key={exploration.slug} exploration={exploration} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
