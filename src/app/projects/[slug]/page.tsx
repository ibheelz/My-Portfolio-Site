'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/src/data/content'
import ProjectCard from '@/src/components/ProjectCard'
import Label from '@/src/components/Label'
import { Envelope, Phone, MapPin } from '@phosphor-icons/react'

interface ProjectDetailPageProps {
  params: { slug: string }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.slug === params.slug)
  const [scrollY, setScrollY] = useState(0)
  const [navVisible, setNavVisible] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

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

      {/* Fixed Hero Image */}
      <div
        className="fixed top-4 right-4 h-[664px] md:h-[400px] sm:h-[400px] bg-[rgb(14,14,18)] z-[1] overflow-hidden rounded-t-xl hidden lg:block"
        style={{ left: '312px' }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Scrolling Content */}
      <div className="relative w-full overflow-visible">
        {/* Hero Text Overlay */}
        <div
          className="relative w-full h-[680px] md:h-[400px] overflow-hidden flex flex-col justify-end gap-6 px-16 pb-6 md:px-4"
          style={{ paddingLeft: '64px', paddingRight: '64px' }}
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="absolute inset-0 object-cover rounded-t-xl -z-10 lg:hidden"
          />
          <h1
            className="font-heading text-[45px] leading-[106px] tracking-[-0.02em] text-[rgb(250,250,250)] uppercase relative z-10"
            style={{ fontFamily: 'Mortend' }}
          >
            {project.title}
          </h1>
        </div>

        {/* Content + Sidebar Wrapper */}
        <div className="relative w-full flex flex-row lg:flex-row md:flex-col sm:flex-col items-start z-[2]">
          {/* Main Content Area */}
          <div
            className="flex-1 overflow-hidden flex flex-col gap-16 px-16 pt-24 pb-16 md:px-4 sm:px-4"
            style={{ paddingLeft: '64px', paddingRight: '64px', paddingTop: '96px' }}
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
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={800}
                    height={680}
                    className="w-full h-[680px] md:h-[400px] sm:h-[280px] rounded-xl overflow-auto object-cover"
                  />
                )}
              </section>
            ))}
          </div>

          {/* Sticky Sidebar */}
          <aside
            className="w-[24%] min-w-[296px] h-screen sticky top-0 border-l-2 border-[rgb(2,1,10)] px-6 pt-24 pb-16 flex flex-col gap-6 overflow-hidden hidden lg:flex"
            style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '96px' }}
          >
            {/* Chapters Navigation */}
            <nav className="flex flex-col gap-3 w-full">
              <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                Contents
              </label>
              <ul className="flex flex-col gap-1.5 w-full">
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
            <div className="w-full h-px bg-[rgb(31,31,31)]" />

            {/* Technical Details */}
            <div className="flex flex-col gap-10 w-full">
              {/* Role */}
              <div className="flex flex-col gap-5">
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Role
                </label>
                <div className="flex flex-wrap gap-3">
                  {project.roleLabels.map((label) => (
                    <div
                      key={label}
                      className="rounded-full border border-[rgb(51,51,51)] px-3 py-2"
                    >
                      <span className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team */}
              {project.team && (
                <div className="flex flex-col gap-5">
                  <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Team
                  </label>
                  <div className="flex gap-2">
                    {/* Team avatars placeholder */}
                    <div className="w-8 h-8 rounded-full bg-[rgb(31,31,31)]" />
                  </div>
                </div>
              )}

              {/* Duration and Date */}
              <div className="flex flex-col gap-4">
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Duration and date
                </label>
                <p className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                  {project.duration}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* More Projects Section */}
        <section className="w-full bg-[rgb(14,14,18)] border-t-2 border-[rgb(2,1,10)] overflow-hidden px-16 py-16 flex flex-col gap-8">
          <h2
            className="font-heading text-[15px] leading-[1.4em] tracking-[0.01em] text-[rgb(250,250,250)] uppercase"
            style={{ fontFamily: 'Mortend', paddingLeft: '64px' }}
          >
            More projects
          </h2>
          <div className="projects-grid grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
            {otherProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        {/* Let's Connect Section */}
        <section
          className="w-full border-t-2 border-[rgb(2,1,10)] bg-[rgb(14,14,18)] overflow-visible flex flex-row md:flex-col gap-8 px-16 py-24 md:px-4 md:py-12"
          style={{ paddingLeft: '64px', paddingRight: '64px' }}
        >
          {/* Profile Image */}
          <div className="flex-1 relative h-[440px] md:h-[280px]">
            <Image
              src="https://framerusercontent.com/images/5ylj0gysRWJbYU3eEdJqMvks02w.png"
              alt="Profile"
              fill
              className="rounded-2xl object-cover z-[1]"
            />
            <img
              src="https://framerusercontent.com/images/dCtHDieyJay9H91GpY1lWIzFAI.svg"
              alt="Logo"
              width={108}
              height={43}
              className="absolute right-3 bottom-3 z-10"
            />
          </div>

          {/* Connect Info */}
          <div className="flex-1 h-full flex flex-col justify-between gap-6 max-w-[640px]">
            <div className="flex flex-col gap-2.5">
              <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)] w-[233px]">
                Let's connect
              </label>
              <h2 className="font-gucina font-medium text-[28px] leading-[1.3em] tracking-[-0.02em] text-[rgb(250,250,250)] max-w-[544px]">
                I'm not just here to design products; I'm here to connect with people.
              </h2>
              <p className="font-gucina text-[16px] leading-[28px] text-[rgb(138,138,138)] max-w-[500px]">
                As a creative designer, I'm constantly exploring the space where creativity meets technology to create experiences that matter.
              </p>
            </div>

            <div className="flex flex-col gap-6 justify-end">
              {/* Email */}
              <div className="flex gap-4 items-center w-full">
                <div className="w-10 h-10 rounded-lg border border-[rgb(51,51,51)] flex items-center justify-center flex-shrink-0">
                  <Envelope size={20} weight="regular" color="rgb(143,134,152)" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Email
                  </label>
                  <a
                    href="mailto:abioladeyeye@gmail.com"
                    className="font-gucina text-[16px] leading-[20px] tracking-[0.01em] text-[rgb(250,250,250)] hover:underline"
                  >
                    abioladeyeye@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-center w-full">
                <div className="w-10 h-10 rounded-lg border border-[rgb(51,51,51)] flex items-center justify-center flex-shrink-0">
                  <Phone size={20} weight="regular" color="rgb(143,134,152)" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Phone Number
                  </label>
                  <a
                    href="tel:+1234567890"
                    className="font-gucina text-[16px] leading-[20px] tracking-[0.01em] text-[rgb(250,250,250)] hover:underline"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              {/* Residence */}
              <div className="flex gap-4 items-center w-full">
                <div className="w-10 h-10 rounded-lg border border-[rgb(51,51,51)] flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} weight="regular" color="rgb(143,134,152)" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Current Residence
                  </label>
                  <p className="font-gucina text-[16px] leading-[20px] tracking-[0.01em] text-[rgb(250,250,250)]">
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
