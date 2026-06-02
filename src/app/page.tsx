'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects, explorations } from '@/src/data/content'
import { ArrowRight } from '@phosphor-icons/react'
import { FadeIn } from '@/src/components/FadeIn'

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = ['Branding', '3D Modelling', 'Visual Design', 'Generative AI Design', 'E-commerce Design', 'Marketing Design']
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
          <section style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '50px' }} className="sm:mb-[50px] max-sm:mb-0">
            {/* Top row with dot */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(8px, 1.5vw, 12px)' }}>
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
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', padding: '0px', margin: 0 }}>
                {/* Headline */}
                <h1 className="font-heading text-[clamp(32px,8vw,45px)] leading-[1.2] tracking-[-0.02em] uppercase" style={{ fontFamily: 'Mortend', margin: 0, marginTop: '-0.2em', maxWidth: 'clamp(100%, 100%, 876px)' }}>
                  Building value into brands through design.
                </h1>

                {/* What I do block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label className="uppercase-headline">
                    What I do
                  </label>

                  {/* Desktop Labels row */}
                  <div className="hidden sm:flex" style={{ flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                    {services.map(
                      (label) => (
                        <button
                          key={label}
                          onClick={() => setSelectedService(label)}
                          onMouseEnter={() => setSelectedService(label)}
                          onMouseLeave={() => setSelectedService(null)}
                          style={{
                            borderRadius: '40px',
                            border: selectedService === label ? '1px solid #000000' : '1px solid var(--grey-border-darker)',
                            padding: '8px 12px',
                            fontSize: '12px',
                            lineHeight: '18px',
                            color: selectedService === label ? 'rgb(129, 195, 215)' : 'var(--grey-text-main)',
                            backgroundColor: selectedService === label ? '#000000' : 'transparent',
                            fontFamily: 'Gucina',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                        >
                          {label}
                        </button>
                      )
                    )}
                  </div>

                  {/* Mobile carousel */}
                  <div className="sm:hidden overflow-hidden w-full" style={{ marginTop: '10px', marginBottom: '0px' }}>
                    <style>{`
                      @keyframes scroll-services {
                        0% {
                          transform: translateX(0);
                        }
                        100% {
                          transform: translateX(calc(-50% - 4px));
                        }
                      }

                      .service-scroll-container {
                        display: flex;
                        gap: 8px;
                        animation: scroll-services 30s linear infinite;
                        width: max-content;
                      }

                      .service-item {
                        flex-shrink: 0;
                      }
                    `}</style>
                    <div className="service-scroll-container">
                      {services.map((label) => (
                        <button
                          key={`scroll-${label}`}
                          onClick={() => setSelectedService(label)}
                          style={{
                            borderRadius: '40px',
                            border: '1px solid var(--grey-border-darker)',
                            padding: '8px 12px',
                            fontSize: '12px',
                            lineHeight: '18px',
                            color: 'var(--grey-text-main)',
                            backgroundColor: 'transparent',
                            fontFamily: 'Gucina',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                          className="service-item"
                        >
                          {label}
                        </button>
                      ))}
                      {services.map((label) => (
                        <button
                          key={`scroll-dup-${label}`}
                          style={{
                            borderRadius: '40px',
                            border: '1px solid var(--grey-border-darker)',
                            padding: '8px 12px',
                            fontSize: '12px',
                            lineHeight: '18px',
                            color: 'var(--grey-text-main)',
                            backgroundColor: 'transparent',
                            fontFamily: 'Gucina',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            pointerEvents: 'none',
                          }}
                          className="service-item"
                          aria-hidden="true"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* SECTION 2 - Recent Projects */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 8vw, 32px)', marginTop: '0px' }} className="max-sm:-mt-5">
            {/* Section header */}
            <FadeIn>
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
            </FadeIn>

            {/* Projects grid */}
            <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(50px, 1fr))', columnGap: 'clamp(16px, 4vw, 32px)', rowGap: 'clamp(48px, 10vw, 96px)' }}>
              {featuredProjects.map((project, index) => (
                <FadeIn key={project.slug} delay={index * 0.08}>
                  <Link
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
                </FadeIn>
              ))}
            </div>
          </section>

          {/* SECTION 3 - Explorations */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '100px' }}>
            {/* Section header */}
            <FadeIn>
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
            </FadeIn>

            {/* Explorations grid */}
            <div className="explorations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(50px, 1fr))', columnGap: 'clamp(16px, 4vw, 32px)', rowGap: 'clamp(48px, 10vw, 96px)' }}>
              {featuredExplorations.map((exploration, index) => (
                <FadeIn key={exploration.slug} delay={index * 0.08}>
                  <Link
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
                </FadeIn>
              ))}
            </div>
          </section>
      </div>
    </>
  )
}
