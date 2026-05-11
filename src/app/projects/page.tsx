'use client'

import Link from 'next/link'
import { projects } from '@/src/data/content'
import ProjectCard from '@/src/components/ProjectCard'
import { ArrowDownRight } from '@phosphor-icons/react'

const otherProjects = [
  { name: 'Lucia Davis', label1: 'AI Influencer', label2: 'Personal Project', href: 'https://www.instagram.com/luciaqxxn/' },
  { name: 'Riley Mobolaji', label1: 'AI Influencer', label2: 'Personal Project', href: 'https://www.instagram.com/rileyqxxn/' },
  { name: 'Aria Vale', label1: 'AI Influencer', label2: 'Personal Project', href: 'https://www.instagram.com/_ariavale/' },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.isFeatured)

  return (
    <div className="content-container">
      {/* SECTION 1 - Page Headline */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
        <h1 className="heading-s" style={{ textTransform: 'uppercase' }}>
          Recent projects
        </h1>
        <p className="body-m-leading" style={{ color: 'rgb(138, 138, 138)', width: 'fit-content' }}>
          (2025 - 2026)
        </p>
      </section>

      {/* SECTION 2 - Projects Grid */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(50px, 1fr))', gap: '24px' }}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* SECTION 3 - Other Projects */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '28px', overflow: 'hidden', gap: '2px' }}>
          <h2 className="heading-2" style={{ textTransform: 'uppercase' }}>
            Other projects
          </h2>
        </div>

        <div className="projects-rows-stack" style={{ display: 'flex', flexDirection: 'column', gap: '0', overflow: 'hidden', marginTop: '32px' }}>
          {otherProjects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="projects-row"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '40px',
                borderBottom: '1px solid rgb(31, 31, 31)',
                padding: '12px',
                cursor: 'pointer',
              }}
            >
              {/* Title */}
              <div style={{ flex: 1, zIndex: 2, position: 'relative' }}>
                <p className="body-m-leading projects-row-title" style={{ color: 'rgb(138, 138, 138)' }}>
                  {project.name}
                </p>
              </div>

              {/* Labels */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2, position: 'relative' }}>
                <div
                  style={{
                    borderRadius: '40px',
                    border: '1px solid rgb(51, 51, 51)',
                    padding: '8px 12px',
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: 'rgb(138, 138, 138)',
                    fontFamily: 'Gucina',
                  }}
                >
                  {project.label1}
                </div>
                <div
                  style={{
                    borderRadius: '40px',
                    border: '1px solid rgb(51, 51, 51)',
                    padding: '8px 12px',
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: 'rgb(138, 138, 138)',
                    fontFamily: 'Gucina',
                  }}
                >
                  {project.label2}
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="projects-row-arrow" style={{ width: '36px', height: '36px', zIndex: 2, position: 'relative' }}>
                <ArrowDownRight
                  size={20}
                  weight="bold"
                  color="rgb(143, 134, 152)"
                  style={{ transform: 'rotate(-90deg)' }}
                />
              </div>

              {/* Hover Overlay */}
              <div className="projects-row-overlay" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgb(2, 1, 10)', zIndex: 1, pointerEvents: 'none' }} />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
