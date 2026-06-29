'use client'

import Link from 'next/link'
import { projects } from '@/src/data/content'
import ProjectCard from '@/src/components/ProjectCard'
import { FadeIn } from '@/src/components/FadeIn'

export default function ProjectsPage() {
  const getYear = (dateStr?: string) => {
    if (!dateStr) return 0
    const match = dateStr.match(/\d{4}/)
    return match ? parseInt(match[0], 10) : 0
  }

  const sortedProjects = projects.sort((a, b) => getYear(b.date) - getYear(a.date))

  return (
    <div className="content-container">
      {/* SECTION 1 - Page Headline */}
      <FadeIn>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vw, 12px)', overflow: 'hidden', marginBottom: '32px' }}>
          <h1 className="font-heading text-[clamp(32px,8vw,45px)] leading-[1.2] tracking-[-0.02em] uppercase" style={{ fontFamily: 'Mortend', margin: 0 }}>
            Selected Projects
          </h1>
        </section>
      </FadeIn>

      {/* SECTION 2 - Projects Grid */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: 'clamp(32px, 8vw, 64px)' }}>
        <div className="projects-grid" style={{ display: 'grid', rowGap: 'clamp(12px, 4vw, 64px)' }}>
          {sortedProjects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>

    </div>
  )
}
