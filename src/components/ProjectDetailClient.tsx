'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { projects } from '@/src/data/content'
import ProjectCard from '@/src/components/ProjectCard'
import { FadeIn } from '@/src/components/FadeIn'

interface Project {
  slug: string
  title: string
  heroImage: string
  readingTime?: string
  sections: Array<{
    title: string
    content: string
    image?: string
  }>
  duration?: string
  date?: string
}

interface ProjectDetailClientProps {
  slug: string
}

export default function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const project = projects.find((p) => p.slug === slug)
  const [navVisible, setNavVisible] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [sidebarFixed, setSidebarFixed] = useState(true)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setNavVisible(true)
        }
      },
      { threshold: 0 }
    )

    if (heroTitleRef.current) {
      observer.observe(heroTitleRef.current)
    }

    const handleScroll = () => {
      const sections = project?.sections || []
      let activeIndex = 0

      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(`section${i + 1}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            activeIndex = i
          }
        }
      }
      setActiveSection(activeIndex)

      const headings = document.querySelectorAll('h2')
      let moreProjectsSection = null
      for (const heading of headings) {
        if (heading.textContent?.includes('More projects')) {
          moreProjectsSection = heading.closest('section')
          break
        }
      }

      if (moreProjectsSection) {
        const rect = moreProjectsSection.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2) {
          setSidebarFixed(false)
        } else {
          setSidebarFixed(true)
        }
      }
    }

    const scrollContainer = document.querySelector('.page-content') || window
    scrollContainer.addEventListener('scroll', handleScroll)

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [project])

  if (!project) {
    return <div className="ml-[296px] p-8">Project not found</div>
  }

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      <div className="fixed top-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-20 hidden lg:block" />
      <div className="fixed bottom-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-20 hidden lg:block" />

      <div className="relative w-full overflow-visible bg-[rgb(14,14,18)]">
        <nav
          className="project-detail-nav hidden lg:block"
          style={{
            position: 'sticky',
            top: 0,
            height: '48px',
            width: '100%',
            backgroundColor: 'rgb(14,14,18)',
            borderRadius: '12px 12px 0 0',
            borderBottom: '2px solid rgb(2,1,10)',
            overflow: 'visible',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'nowrap',
            paddingLeft: 'clamp(16px, 5vw, 64px)',
            paddingRight: 'clamp(16px, 5vw, 64px)',
            paddingTop: '0px',
            paddingBottom: '0px',
            gap: '0px',
            zIndex: 50,
          }}
        >
          <h3 className="font-gucina font-medium text-[16px] leading-[28px] text-[rgb(250,250,250)]" style={{ letterSpacing: '0.01em', margin: 0, whiteSpace: 'nowrap', marginRight: '20px', flexShrink: 0, textTransform: 'none', fontFamily: 'Gucina' }}>
            {project.title}
          </h3>
          <span className="font-gucina text-[12px] leading-[24px] text-[rgb(138,138,138)]" style={{ letterSpacing: '0.01em', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {project.readingTime || '5'} min read
          </span>
        </nav>

        <div
          className="relative w-full overflow-hidden flex flex-col justify-end px-16 pb-6 md:px-4"
          style={{ height: '70vh', paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)' }}
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            quality={80}
            className="absolute inset-0 object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1240px) 100vw, 100vw"
          />

          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
            style={{
              height: '200px',
              background: 'linear-gradient(to top, rgb(14, 14, 18) 0%, rgba(14, 14, 18, 0.6) 50%, transparent 100%)'
            }}
          />

          <FadeIn className="relative z-[2]">
            <h1
              ref={heroTitleRef}
              className="font-heading text-[clamp(32px,8vw,45px)] leading-[1.2] tracking-[-0.02em] text-[rgb(250,250,250)] uppercase"
              style={{ fontFamily: 'Mortend', margin: 0 }}
            >
              {project.title}
            </h1>
          </FadeIn>
        </div>

        <div className="relative w-full flex flex-row lg:flex-row md:flex-col sm:flex-col items-start z-[40] bg-[rgb(14,14,18)]">
          <div
            className="flex-1 flex flex-col bg-[rgb(14,14,18)] z-[40] border-r-2 border-[rgb(2,1,10)]"
            style={{ paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)', paddingTop: 'clamp(32px, 8vw, 64px)', paddingBottom: 'clamp(32px, 8vw, 64px)', gap: 'clamp(32px, 8vw, 64px)' }}
          >
            {project.sections.map((section, index) => (
              <FadeIn key={index} delay={index * 0.06}>
                <section id={`section${index + 1}`} className="flex flex-col gap-8 w-full">
                  <h2
                    className="font-heading text-[clamp(14px,2vw,16px)] leading-[1.4em] tracking-[0.07em] text-[rgb(250,250,250)] uppercase"
                    style={{ fontFamily: 'Mortend', margin: 0 }}
                  >
                    {section.title}
                  </h2>
                  <p className="font-body text-[clamp(14px,2vw,16px)] leading-[1.6] text-[rgb(138,138,138)] whitespace-pre-wrap">
                    {section.content}
                  </p>
                  {section.image && (
                    <div className="w-full rounded-xl overflow-hidden cursor-pointer group" onClick={() => setModalImage(section.image || null)}>
                      <Image
                        src={section.image}
                        alt={section.title}
                        width={1400}
                        height={1051}
                        loading="lazy"
                        quality={75}
                        className="w-full h-auto group-hover:opacity-90 transition-opacity"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1240px) 100vw, 1000px"
                      />
                    </div>
                  )}
                </section>
              </FadeIn>
            ))}
          </div>

          <aside
            ref={sidebarRef}
            className="w-[24%] min-w-[296px] flex flex-col hidden lg:flex bg-[rgb(14,14,18)]"
            style={{
              position: 'sticky',
              top: '80px',
              height: 'auto',
              paddingLeft: 'clamp(16px, 2vw, 32px)',
              paddingRight: 'clamp(16px, 2vw, 32px)',
              paddingTop: 'clamp(16px, 2vw, 24px)',
              paddingBottom: 'clamp(32px, 8vw, 64px)',
              alignSelf: 'flex-start',
            }}
          >
            <nav className="flex flex-col gap-2 w-full" style={{ height: 'auto', position: 'relative', top: 'auto', borderRadius: 'unset', backgroundColor: 'transparent', zIndex: 'auto' }}>
              <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                Contents
              </label>
              <ul className="flex flex-col gap-1 w-full">
                {project.sections.map((section, index) => (
                  <li key={index}>
                    <a
                      href={`#section${index + 1}`}
                      className={`font-gucina text-[12px] leading-[18px] tracking-[0.01em] transition-colors duration-200 cursor-pointer ${
                        activeSection === index
                          ? 'sidebar-active-link'
                          : 'text-[rgb(138,138,138)] hover:text-[rgb(250,250,250)]'
                      }`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="w-full h-px bg-[rgb(31,31,31)]" style={{ marginTop: 'clamp(24px, 4vw, 48px)', marginBottom: 'clamp(24px, 4vw, 48px)' }} />

            {(project.duration || project.date) && (
              <div className="flex flex-col w-full">
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)] mb-2">
                  Duration and date
                </label>
                <p className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                  {project.duration}
                  {project.duration && project.date && <span style={{ margin: '0 12px' }}>|</span>}
                  {project.date}
                </p>
              </div>
            )}
          </aside>
        </div>

        <section className="w-full bg-[rgb(14,14,18)] border-t-2 border-[rgb(2,1,10)] overflow-hidden px-16 py-16 flex flex-col gap-8 relative z-[40]" style={{ paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)', paddingTop: 'clamp(32px, 8vw, 64px)', paddingBottom: 'clamp(32px, 8vw, 64px)' }}>
          <FadeIn>
            <h2
              className="font-heading text-[clamp(14px,2vw,16px)] leading-[1.4em] tracking-[0.07em] text-[rgb(250,250,250)] uppercase"
              style={{ fontFamily: 'Mortend', margin: 0 }}
            >
              More projects
            </h2>
          </FadeIn>
          <div className="projects-grid grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1" style={{ columnGap: 'clamp(16px, 4vw, 32px)', rowGap: 'clamp(48px, 10vw, 96px)' }}>
            {otherProjects.map((p, index) => (
              <FadeIn key={p.slug} delay={index * 0.08}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </section>
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={modalImage}
              alt="Full size image"
              width={1400}
              height={1051}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
