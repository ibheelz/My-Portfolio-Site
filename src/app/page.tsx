'use client'

import Image from 'next/image'
import Link from 'next/link'
import { projects, explorations, blogPosts } from '@/src/data/content'
import { ArrowRight } from '@phosphor-icons/react'

export default function Home() {
  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 3)
  const featuredExplorations = explorations.filter((e) => e.isFeatured).slice(0, 4)

  return (
    <>
      {/* Fixed decorative margins */}
      <div className="fixed-top-margin" />
      <div className="fixed-bottom-margin" />

      {/* Content container */}
      <div className="content-container">
          {/* SECTION 1 - Hero */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '7px', padding: '12px 0px 0px 0px' }}>
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
              <h1
                style={{
                  fontFamily: 'Mortend',
                  fontSize: '38px',
                  fontWeight: 400,
                  lineHeight: '1.4em',
                  letterSpacing: '-0.2px',
                  color: 'var(--white)',
                  maxWidth: '876px',
                  margin: 0,
                }}
              >
                Building value into brands through design.
              </h1>

              {/* What I do block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label
                  style={{
                    fontFamily: 'Gucina',
                    fontSize: '12px',
                    fontWeight: 700,
                    lineHeight: '1.4em',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--grey-text-main)',
                    margin: 0,
                  }}
                >
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
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '28px', overflow: 'hidden' }}>
              <h2
                style={{
                  fontFamily: 'Mortend',
                  fontSize: '15px',
                  lineHeight: '28px',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Recent projects
              </h2>
              <Link
                href="/projects"
                style={{
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  color: 'var(--white)',
                  fontSize: '15px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                View all
                <ArrowRight size={20} weight="bold" />
              </Link>
            </div>

            {/* Projects grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(50px, 1fr))', gap: '24px' }}>
              {featuredProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
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
                    <Image src={project.cardImage} alt={project.title} fill className="object-cover" />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', height: '60px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <h3
                          style={{
                            fontFamily: 'Gucina',
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '28px',
                            letterSpacing: '0.2px',
                            color: 'var(--white)',
                            margin: 0,
                          }}
                        >
                          {project.title}
                        </h3>
                      </div>

                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: 'var(--grey-text-main)', fontFamily: 'Gucina' }}>{project.label1}</span>
                        <div
                          style={{
                            width: '4px',
                            height: '4px',
                            backgroundColor: 'var(--grey-border-darker)',
                            borderRadius: '8px',
                          }}
                        />
                        <span style={{ fontSize: '12px', color: 'var(--grey-text-main)', fontFamily: 'Gucina' }}>{project.label2}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* SECTION 3 - Blog */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '28px', overflow: 'hidden' }}>
              <h2
                style={{
                  fontFamily: 'Mortend',
                  fontSize: '15px',
                  lineHeight: '28px',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Writing
              </h2>
              <Link
                href="/blog"
                style={{
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  color: 'var(--white)',
                  fontSize: '15px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                View all
                <ArrowRight size={20} weight="bold" />
              </Link>
            </div>

            {/* Blog rows */}
            <div>
              {blogPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    width: '100%',
                    borderBottom: `1px solid var(--grey-border)`,
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '40px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'background-color 0.2s, border-radius 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--black)';
                    e.currentTarget.style.borderRadius = '4px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderRadius = '0px';
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'Gucina',
                        fontSize: '16px',
                        lineHeight: '28px',
                        color: 'var(--white)',
                      }}
                    >
                      {post.title}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', width: '400px' }}>
                    {post.labels.slice(0, 2).map((label) => (
                      <div
                        key={label}
                        style={{
                          borderRadius: '40px',
                          border: '1px solid var(--grey-border-darker)',
                          padding: '8px 12px',
                          fontSize: '12px',
                          color: 'var(--grey-text-main)',
                          backgroundColor: 'transparent',
                          fontFamily: 'Gucina',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  <ArrowRight size={24} style={{ opacity: 0, transition: 'opacity 0.2s' }} />
                </Link>
              ))}
            </div>
          </section>

          {/* SECTION 4 - Explorations */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '984px' }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '28px', overflow: 'hidden' }}>
              <h2
                style={{
                  fontFamily: 'Mortend',
                  fontSize: '15px',
                  lineHeight: '28px',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Personal creations
              </h2>
              <Link
                href="/explorations"
                style={{
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  color: 'var(--white)',
                  fontSize: '15px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                View all
                <ArrowRight size={20} weight="bold" />
              </Link>
            </div>

            {/* Explorations grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {featuredExplorations.map((exploration) => (
                <Link
                  key={exploration.slug}
                  href={`/explorations/${exploration.slug}`}
                  style={{
                    width: '100%',
                    height: '348px',
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
                    <Image src={exploration.cardImage} alt={exploration.title} fill className="object-cover" />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', height: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <h3
                        style={{
                          fontFamily: 'Gucina',
                          fontSize: '16px',
                          fontWeight: 500,
                          lineHeight: '28px',
                          color: 'var(--white)',
                          margin: 0,
                        }}
                      >
                        {exploration.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
      </div>
    </>
  )
}
