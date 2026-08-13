'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/src/data/content'
import ProjectCard from '@/src/components/ProjectCard'
import { FadeIn } from '@/src/components/FadeIn'

export default function ProjectsPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const getYear = (dateStr?: string) => {
    if (!dateStr) return 0
    const match = dateStr.match(/\d{4}/)
    return match ? parseInt(match[0], 10) : 0
  }

  const services = ['Branding', '3D Modelling', 'Visual Design', 'Generative AI Design', 'E-commerce Design', 'Marketing Design']
  const sortedProjects = projects.sort((a, b) => getYear(b.date) - getYear(a.date))

  return (
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
