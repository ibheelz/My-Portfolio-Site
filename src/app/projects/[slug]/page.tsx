'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/src/data/content'
import ProjectCard from '@/src/components/ProjectCard'
import Label from '@/src/components/Label'

interface ProjectDetailPageProps {
  params: { slug: string }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.slug === params.slug)
  const [scrollY, setScrollY] = useState(0)
  const [navVisible, setNavVisible] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [modalImage, setModalImage] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setNavVisible(currentScrollY > 628)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!project) {
    return <div className="ml-[296px] p-8">Project not found</div>
  }

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      {/* Fixed decorative margins */}
      <div className="fixed top-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-20 hidden lg:block" />
      <div className="fixed bottom-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-20 hidden lg:block" />

      {/* Fixed Top Nav Bar */}
      <nav
        className="fixed top-4 right-4 h-12 z-10 bg-[rgb(14,14,18)] rounded-t-xl border-b-2 border-[rgb(2,1,10)] px-16 md:px-4 flex items-center gap-2.5 overflow-hidden transition-opacity duration-300 hidden lg:flex"
        style={{ left: '312px', opacity: navVisible ? 1 : 0, pointerEvents: navVisible ? 'auto' : 'none' }}
      >
        <h3 className="font-gucina font-medium text-[16px] leading-[28px] text-[rgb(250,250,250)]">
          {project.title}
        </h3>
        <span className="font-gucina text-[12px] leading-[24px] text-[rgb(138,138,138)] ml-auto">
          {project.readingTime || '5'} min read
        </span>
      </nav>


      {/* Main Scrolling Content */}
      <div className="relative w-full overflow-visible bg-[rgb(14,14,18)]">

        {/* Hero Text Overlay */}
        <div
          className="relative w-full overflow-hidden flex flex-col justify-end px-16 pb-6 md:px-4"
          style={{ height: '70vh', paddingLeft: '64px', paddingRight: '64px' }}
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="absolute inset-0 object-cover"
          />

          {/* Gradient overlay for title readability */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
            style={{
              height: '200px',
              background: 'linear-gradient(to top, rgb(14, 14, 18) 0%, rgba(14, 14, 18, 0.6) 50%, transparent 100%)'
            }}
          />

          <h1
            className="font-heading text-[45px] leading-[106px] tracking-[-0.02em] text-[rgb(250,250,250)] uppercase relative z-[2]"
            style={{ fontFamily: 'Mortend' }}
          >
            {project.title}
          </h1>
        </div>

        {/* Content + Sidebar Wrapper */}
        <div className="relative w-full flex flex-row lg:flex-row md:flex-col sm:flex-col items-start z-[40] bg-[rgb(14,14,18)]">
          {/* Main Content Area */}
          <div
            className="flex-1 flex flex-col gap-16 px-16 pt-24 pb-16 md:px-4 sm:px-4 bg-[rgb(14,14,18)] z-[40]"
            style={{ paddingLeft: '64px', paddingRight: '64px' }}
          >
            {project.sections.map((section, index) => (
              <section key={index} id={`section${index + 1}`} className="flex flex-col gap-8 w-full">
                <h2
                  className="font-heading text-[15px] leading-[1.4em] tracking-[0.01em] text-[rgb(250,250,250)] uppercase"
                  style={{ fontFamily: 'Mortend' }}
                >
                  {section.title}
                </h2>
                <p className="font-body text-[16px] leading-[28px] text-[rgb(138,138,138)] whitespace-pre-wrap">
                  {section.content}
                </p>
                {section.image && (
                  <div className="w-full rounded-xl overflow-hidden cursor-pointer group" onClick={() => setModalImage(section.image)}>
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={1400}
                      height={1051}
                      className="w-full h-auto group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Sticky Sidebar */}
          <aside
            className="w-[24%] min-w-[296px] sticky top-0 border-l-2 border-[rgb(2,1,10)] px-6 pt-6 pb-16 flex flex-col hidden lg:flex bg-[rgb(14,14,18)] z-50 overflow-hidden"
            style={{ paddingLeft: '24px', paddingRight: '24px' }}
          >
            {/* Chapters Navigation */}
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
                          ? 'text-[rgb(250,250,250)]'
                          : 'text-[rgb(138,138,138)] hover:text-[rgb(250,250,250)]'
                      }`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Divider */}
            <div className="w-full h-px bg-[rgb(31,31,31)]" style={{ marginTop: '40px', marginBottom: '40px' }} />

            {/* Duration and Date Info */}
            {(project.duration || project.date) && (
              <div className="flex flex-col w-full">
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)] mb-2">
                  Duration and date
                </label>
                <p className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                  {project.duration}
                  {project.duration && project.date && <span> | </span>}
                  {project.date}
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* More Projects Section */}
        <section className="w-full bg-[rgb(14,14,18)] border-t-2 border-[rgb(2,1,10)] overflow-hidden px-16 py-16 flex flex-col gap-8 relative z-[40]" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
          <h2
            className="font-heading text-[15px] leading-[1.4em] tracking-[0.01em] text-[rgb(250,250,250)] uppercase"
            style={{ fontFamily: 'Mortend' }}
          >
            More projects
          </h2>
          <div className="projects-grid grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
            {otherProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Image Modal */}
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
