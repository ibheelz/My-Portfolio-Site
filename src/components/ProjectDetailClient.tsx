'use client'

import { useState, useEffect, useRef, useLayoutEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft } from '@phosphor-icons/react'
import { projects } from '@/src/data/content'
import ProjectCard from '@/src/components/ProjectCard'
import { FadeIn } from '@/src/components/FadeIn'

const renderStyledContent = (text: string): ReactNode[] => {
  const parts = text.split(/(#TheGirlWithTheBlueHair)/g)
  return parts.map((part, index) => {
    if (part === '#TheGirlWithTheBlueHair') {
      return (
        <span key={index} style={{ color: 'rgb(129, 195, 215)' }}>
          {part}
        </span>
      )
    }
    return part
  })
}

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
  const router = useRouter()
  const project = projects.find((p) => p.slug === slug)
  const [navVisible, setNavVisible] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [modalCarouselImages, setModalCarouselImages] = useState<string[] | null>(null)
  const [modalCarouselIndex, setModalCarouselIndex] = useState(0)
  const [sidebarFixed, setSidebarFixed] = useState(true)
  const [carouselStates, setCarouselStates] = useState<Record<number, { currentIndex: number; isInteracting: boolean }>>({})
  const [carouselIntervals, setCarouselIntervals] = useState<Record<number, NodeJS.Timeout>>({})
  const [touchStartX, setTouchStartX] = useState(0)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const pageContent = document.querySelector('.page-content') as HTMLElement
    if (pageContent) {
      pageContent.scrollTop = 0
    }
    window.scrollY = 0
  }, [slug])

  useEffect(() => {
    const pageContent = document.querySelector('.page-content') as HTMLElement
    if (pageContent) {
      pageContent.scrollTop = 0
    }
  }, [slug])

  useEffect(() => {
    const pageContent = document.querySelector('.page-content') as HTMLElement
    if (!pageContent || !project) return

    const handleScroll = () => {
      let currentSection = 0
      const navHeight = 100

      project.sections.forEach((_, index) => {
        const section = document.querySelector(`#section${index + 1}`) as HTMLElement
        if (section) {
          const rect = section.getBoundingClientRect()
          const pageContentRect = pageContent.getBoundingClientRect()
          const relativeTop = rect.top - pageContentRect.top

          if (relativeTop - navHeight <= pageContent.scrollTop + 20) {
            currentSection = index
          }
        }
      })

      setActiveSection(currentSection)
    }

    pageContent.addEventListener('scroll', handleScroll)
    return () => pageContent.removeEventListener('scroll', handleScroll)
  }, [project])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle modal carousel keyboard navigation
      if (modalCarouselImages) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          setModalCarouselIndex((prev) => (prev - 1 + modalCarouselImages.length) % modalCarouselImages.length)
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          setModalCarouselIndex((prev) => (prev + 1) % modalCarouselImages.length)
        } else if (e.key === 'Escape') {
          setModalCarouselImages(null)
        }
      } else {
        // Only handle arrow keys if a carousel is being interacted with
        Object.entries(carouselStates).forEach(([sectionIndexStr, state]) => {
          if (state.isInteracting) {
            const sectionIndex = parseInt(sectionIndexStr)
            const section = project?.sections[sectionIndex]
            if (section?.images) {
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                handleCarouselPrevious(sectionIndex, section.images.length)
              } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                handleCarouselNext(sectionIndex, section.images.length)
              }
            }
          }
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [carouselStates, project, modalCarouselImages])

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

  useEffect(() => {
    // Initialize carousels as static (no autoplay)
    if (project) {
      const newStates: Record<number, { currentIndex: number; isInteracting: boolean }> = {}
      project.sections.forEach((section, index) => {
        if (section.images && section.images.length > 0) {
          newStates[index] = { currentIndex: 0, isInteracting: false }
        }
      })
      setCarouselStates(newStates)
    }

    return () => {
      // Cleanup intervals
      Object.keys(carouselIntervals).forEach(key => {
        clearInterval(carouselIntervals[parseInt(key)])
      })
    }
  }, [slug])

  if (!project) {
    return <div className="ml-[296px] p-8">Project not found</div>
  }

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  const handleImageContextMenu = (e: React.MouseEvent | React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const handleImageDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const handlePageContextMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG' || target.closest('img')) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }

  const startCarouselAutoplay = (sectionIndex: number, totalImages: number) => {
    const interval = setInterval(() => {
      setCarouselStates(prev => {
        const state = prev[sectionIndex] || { currentIndex: 0, isInteracting: false }
        if (!state.isInteracting) {
          return {
            ...prev,
            [sectionIndex]: {
              ...state,
              currentIndex: (state.currentIndex + 1) % totalImages
            }
          }
        }
        return prev
      })
    }, 3000)

    setCarouselIntervals(prev => ({
      ...prev,
      [sectionIndex]: interval
    }))
  }

  const stopCarouselAutoplay = (sectionIndex: number) => {
    if (carouselIntervals[sectionIndex]) {
      clearInterval(carouselIntervals[sectionIndex])
      setCarouselIntervals(prev => {
        const newIntervals = { ...prev }
        delete newIntervals[sectionIndex]
        return newIntervals
      })
    }
  }

  const handleCarouselClick = (sectionIndex: number) => {
    setCarouselStates(prev => ({
      ...prev,
      [sectionIndex]: {
        ...prev[sectionIndex],
        isInteracting: true
      }
    }))
    stopCarouselAutoplay(sectionIndex)
  }

  const handleCarouselPrevious = (sectionIndex: number, totalImages: number) => {
    setCarouselStates(prev => ({
      ...prev,
      [sectionIndex]: {
        ...prev[sectionIndex],
        currentIndex: (prev[sectionIndex]?.currentIndex || 0) - 1 < 0 ? totalImages - 1 : (prev[sectionIndex]?.currentIndex || 0) - 1
      }
    }))
  }

  const handleCarouselNext = (sectionIndex: number, totalImages: number) => {
    setCarouselStates(prev => ({
      ...prev,
      [sectionIndex]: {
        ...prev[sectionIndex],
        currentIndex: ((prev[sectionIndex]?.currentIndex || 0) + 1) % totalImages
      }
    }))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const difference = touchStartX - touchEndX
    const threshold = 50

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        if (modalCarouselImages) {
          setModalCarouselIndex((prev) => (prev + 1) % modalCarouselImages.length)
        }
      } else {
        if (modalCarouselImages) {
          setModalCarouselIndex((prev) => (prev - 1 + modalCarouselImages.length) % modalCarouselImages.length)
        }
      }
    }
  }

  return (
    <>
      <style>{`
        img {
          user-select: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
        }
      `}</style>
      <div className="fixed top-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-20 hidden lg:block" />
      <div className="fixed bottom-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-20 hidden lg:block" />

      <div className="relative w-full overflow-visible bg-[rgb(14,14,18)]" style={{ userSelect: 'none' }} onContextMenu={handlePageContextMenu}>
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
            gap: '12px',
            zIndex: 50,
          }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center hover:opacity-75 transition-opacity"
            aria-label="Go back"
            style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, marginRight: '4px' }}
          >
            <ArrowLeft size={18} color="rgb(250,250,250)" weight="light" />
          </button>
          <h3 className="font-gucina font-medium text-[16px] leading-[28px] text-[rgb(250,250,250)]" style={{ letterSpacing: '0.01em', margin: 0, whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'none', fontFamily: 'Gucina' }}>
            {project.title}
          </h3>
        </nav>

        <div
          className="relative w-full overflow-hidden flex flex-col justify-end px-16 pb-6 md:px-4"
          style={{ height: '70vh', paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)' }}
        >
          {project.slug === 'martell' && (
            <>
              <Image
                src="/martell-hero-mobile.webp"
                alt={project.title}
                fill
                priority
                quality={80}
                className="absolute inset-0 object-cover block md:hidden"
                sizes="100vw"
                onContextMenu={handleImageContextMenu}
                onDragStart={handleImageDrag}
                style={{ userSelect: 'none' }}
              />
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                priority
                quality={80}
                className="absolute inset-0 object-cover hidden md:block"
                sizes="(max-width: 1240px) 100vw, 100vw"
                onContextMenu={handleImageContextMenu}
                onDragStart={handleImageDrag}
                style={{ userSelect: 'none' }}
              />
            </>
          )}
          {project.slug !== 'martell' && (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              quality={80}
              className="absolute inset-0 object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1240px) 100vw, 100vw"
              onContextMenu={handleImageContextMenu}
              onDragStart={handleImageDrag}
              style={{ userSelect: 'none' }}
            />
          )}

          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
            style={{
              height: '200px',
              background: 'linear-gradient(to top, rgb(14, 14, 18) 0%, rgba(14, 14, 18, 0.6) 50%, transparent 100%)'
            }}
          />

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
                    style={{ fontFamily: 'Mortend', margin: 0, scrollMarginTop: '100px' }}
                  >
                    {section.title}
                  </h2>
                  <p className="font-body text-[clamp(14px,2vw,16px)] leading-[1.6] text-[rgb(138,138,138)] whitespace-pre-wrap">
                    {renderStyledContent(section.content)}
                  </p>
                  {section.images && section.images.length > 0 ? (
                    <div
                      className="w-full rounded-xl overflow-hidden cursor-pointer group relative"
                      onClick={(e) => {
                        e.stopPropagation()
                        setModalCarouselImages(section.images!)
                        setModalCarouselIndex(carouselStates[index]?.currentIndex || 0)
                      }}
                      onMouseEnter={() => {
                        setCarouselStates(prev => ({
                          ...prev,
                          [index]: {
                            ...prev[index],
                            isInteracting: true
                          }
                        }))
                      }}
                    >
                      <div className="relative" style={{ width: '100%', paddingBottom: '75%', position: 'relative' }}>
                        {section.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="absolute inset-0 w-full h-full"
                            style={{ display: (carouselStates[index]?.currentIndex || 0) === imgIndex ? 'block' : 'none' }}
                          >
                            <Image
                              src={image}
                              alt={`${section.title} - Image ${imgIndex + 1}`}
                              fill
                              loading="lazy"
                              quality={75}
                              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1240px) 100vw, 1000px"
                              onContextMenu={(e) => handleImageContextMenu(e as any)}
                              onDragStart={handleImageDrag}
                              style={{ userSelect: 'none' }}
                            />
                          </div>
                        ))}

                        {(carouselStates[index]?.isInteracting) && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCarouselPrevious(index, section.images!.length) }}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] rounded-full flex items-center justify-center z-10 hover:border-[rgb(138,138,138)] transition-colors"
                              style={{ width: '36px', height: '36px' }}
                            >
                              <span style={{ color: 'rgb(138,138,138)', fontSize: '18px' }}>‹</span>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCarouselNext(index, section.images!.length) }}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] rounded-full flex items-center justify-center z-10 hover:border-[rgb(138,138,138)] transition-colors"
                              style={{ width: '36px', height: '36px' }}
                            >
                              <span style={{ color: 'rgb(138,138,138)', fontSize: '18px' }}>›</span>
                            </button>

                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2 z-10">
                              {section.images.map((_, dotIndex) => (
                                <button
                                  key={dotIndex}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setCarouselStates(prev => ({
                                      ...prev,
                                      [index]: { ...prev[index], currentIndex: dotIndex }
                                    }))
                                  }}
                                  className="w-2 h-2 rounded-full transition-all"
                                  style={{
                                    backgroundColor: (carouselStates[index]?.currentIndex || 0) === dotIndex ? 'rgb(250,250,250)' : 'rgb(97,97,97)',
                                    width: (carouselStates[index]?.currentIndex || 0) === dotIndex ? '12px' : '8px'
                                  }}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : section.image && (
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
                        onContextMenu={(e) => handleImageContextMenu(e as any)}
                        onDragStart={handleImageDrag}
                        style={{ userSelect: 'none' }}
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
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveSection(index)
                        const heading = document.querySelector(`#section${index + 1} h2`)
                        if (heading) {
                          heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }}
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
          style={{ userSelect: 'none' }}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={modalImage}
              alt="Full size image"
              width={1400}
              height={1051}
              className="w-full h-auto rounded-lg"
              onContextMenu={(e) => handleImageContextMenu(e as any)}
              onDragStart={handleImageDrag}
              style={{ userSelect: 'none' }}
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

      {modalCarouselImages && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setModalCarouselImages(null)}
          style={{ userSelect: 'none' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full max-w-6xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={modalCarouselImages[modalCarouselIndex]}
              alt={`Image ${modalCarouselIndex + 1}`}
              fill
              className="object-contain"
              onContextMenu={(e) => handleImageContextMenu(e as any)}
              onDragStart={handleImageDrag}
              style={{ userSelect: 'none' }}
            />

            <button
              onClick={(e) => {
                e.stopPropagation()
                setModalCarouselIndex((prev) => (prev - 1 + modalCarouselImages.length) % modalCarouselImages.length)
              }}
              className="absolute left-4 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center z-10 hover:border-[rgb(138,138,138)] transition-colors"
              style={{ width: '36px', height: '36px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <span style={{ color: 'rgb(138,138,138)', fontSize: '18px' }}>‹</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setModalCarouselIndex((prev) => (prev + 1) % modalCarouselImages.length)
              }}
              className="absolute right-4 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center z-10 hover:border-[rgb(138,138,138)] transition-colors"
              style={{ width: '36px', height: '36px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <span style={{ color: 'rgb(138,138,138)', fontSize: '18px' }}>›</span>
            </button>

            <button
              onClick={() => setModalCarouselImages(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center text-white text-2xl z-20"
            >
              ✕
            </button>

            <div className="absolute bottom-4 flex items-center justify-center gap-2 px-4 z-10">
              {modalCarouselImages.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={(e) => {
                    e.stopPropagation()
                    setModalCarouselIndex(dotIndex)
                  }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: modalCarouselIndex === dotIndex ? 'rgb(250,250,250)' : 'rgb(97,97,97)',
                    width: modalCarouselIndex === dotIndex ? '12px' : '8px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
