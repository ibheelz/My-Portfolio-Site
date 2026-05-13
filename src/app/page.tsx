'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects, explorations } from '@/src/data/content'
import { ArrowRight } from '@phosphor-icons/react'

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 3)
  const featuredExplorations = explorations.filter((e) => e.isFeatured).slice(0, 3)

  return (
    <>
      {/* Fixed decorative margins */}
      <div className="fixed-top-margin" />
      <div className="fixed-bottom-margin" />

      {/* Content container */}
      <div className="content-container">
          {/* SECTION 1 - Hero */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vw, 12px)', paddingTop: 'clamp(32px, 8vw, 48px)' }}>
            {/* Top row with dot */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div></div>
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: 'var(--grey-border)',
                  borderRadius: '4px',
                }}
              />
            </div>

            {/* Headline + What I do */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', padding: '0px' }}>
              {/* Headline */}
              <h1 className="font-heading text-[clamp(32px,8vw,45px)] leading-[1.2] tracking-[-0.02em] uppercase" style={{ fontFamily: 'Mortend', margin: 0, maxWidth: '876px' }}>
                Building value into <br /> brands through design.
              </h1>

              {/* What I do block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label className="uppercase-headline">
                  What I do
                </label>

                {/* Labels row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '736px' }}>
                  {['Branding', '3D Modelling', 'Visual Design', 'Generative AI Design', 'E-commerce Design', 'Marketing Design'].map(
                    (label) => (
                      <div
                        key={label}
                        style={{
                          borderRadius: '40px',
                          border: '1px solid var(--grey-border-darker)',
                          padding: '8px 12px',
                          fontSize: '12px',
                          lineHeight: '18px',
                          color: 'var(--grey-text-main)',
                          backgroundColor: 'transparent',
                          fontFamily: 'Gucina',
                        }}
                      >
                        {label}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 - Recent Projects */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '50px' }}>
            {/* Section header */}
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '28px', overflow: 'hidden' }}
              onMouseEnter={() => setHoveredSection('projects')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h2 className="heading-2">
                Featured
              </h2>
              <Link
                href="/projects"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  color: 'rgb(129, 195, 215)',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                }}
              >
                View all
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>

            {/* Projects grid */}
            <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(50px, 1fr))', gap: '24px' }}>
              {featuredProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="project-card project-card-home group"
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--grey-bg)',
                      position: 'relative',
                    }}
                  >
                    <Image src={project.cardImage} alt={project.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[400ms]" />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <h3 className="heading-3">
                        {project.title}
                      </h3>

                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span className="body-s">{project.label1}</span>
                        <div
                          style={{
                            width: '4px',
                            height: '4px',
                            backgroundColor: 'var(--grey-border-darker)',
                            borderRadius: '8px',
                          }}
                        />
                        <span className="body-s">{project.label2}</span>
                      </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* SECTION 3 - Explorations */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '100px' }}>
            {/* Section header */}
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '28px', overflow: 'hidden' }}
              onMouseEnter={() => setHoveredSection('explorations')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h2 className="heading-2">
                Personal creations
              </h2>
              <Link
                href="/explorations"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  color: 'rgb(129, 195, 215)',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                }}
              >
                View all
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>

            {/* Explorations grid */}
            <div className="explorations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(50px, 1fr))', gap: '24px' }}>
              {featuredExplorations.map((exploration) => (
                <Link
                  key={exploration.slug}
                  href={`/explorations/${exploration.slug}`}
                  className="exploration-card exploration-card-home group"
                  style={{
                    width: '100%',
                    height: '520px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--grey-bg)',
                      position: 'relative',
                    }}
                  >
                    <Image src={exploration.cardImage} alt={exploration.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[400ms]" />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', height: '60px', justifyContent: 'flex-start' }}>
                    <h3 className="heading-3">
                      {exploration.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
      </div>
    </>
  )
}
