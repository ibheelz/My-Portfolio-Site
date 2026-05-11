'use client'

import { explorations } from '@/src/data/content'
import ExplorationCard from '@/src/components/ExplorationCard'

export default function ExplorationsPage() {
  return (
    <div className="ml-[296px] bg-grey-background p-16" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Header */}
      <div className="mb-16" style={{ gap: '2px', marginBottom: '64px' }}>
        <p className="text-heading-s font-semibold mb-2">Explorations</p>
        <p className="text-body-m text-grey-text-main">Creative experiments and visual explorations</p>
      </div>

      {/* Explorations Grid */}
      <div className="grid grid-cols-4 gap-6" style={{ gap: '24px' }}>
        {explorations.map((exploration) => (
          <ExplorationCard key={exploration.slug} exploration={exploration} />
        ))}
      </div>
    </div>
  )
}
