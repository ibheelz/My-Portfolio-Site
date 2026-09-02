'use client'

import { useState, useEffect, useRef, useLayoutEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { projects } from '@/src/data/content'
import ProjectCard from '@/src/components/ProjectCard'
import ToolIcon from '@/src/components/ToolIcon'
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
  const [carouselStates, setCarouselStates] = useState<Record<number, { currentIndex: number; isInteracting: boolean }>>({})
  const [carouselIntervals, setCarouselIntervals] = useState<Record<number, NodeJS.Timeout>>({})
  const [touchStartX, setTouchStartX] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const isManuallyScrollingRef = useRef(false)

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const pageContent = document.querySelector('.page-content') as HTMLElement
      if (pageContent) {
        pageContent.scrollTop = 0
      }
      window.scrollY = 0
    }
  }, [slug])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageContent = document.querySelector('.page-content') as HTMLElement
      if (pageContent) {
        pageContent.scrollTop = 0
      }
    }
  }, [slug])

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
    if (!modalCarouselImages) {
      // Clear all existing intervals first
      Object.keys(carouselIntervals).forEach(key => {
        clearInterval(carouselIntervals[parseInt(key)])
      })

      // Reset interaction state and restart autoplay
      setCarouselStates(prev => {
        const updated = { ...prev }
        Object.entries(updated).forEach(([indexStr, state]) => {
          const index = parseInt(indexStr)
          updated[index] = { ...state, isInteracting: false }
        })
        return updated
      })

      // Restart autoplay for all carousels
      Object.entries(carouselStates).forEach(([indexStr, state]) => {
        const index = parseInt(indexStr)
        const section = project?.sections[index]
        if (section?.images) {
          startCarouselAutoplay(index, section.images.length)
        }
      })
    }
  }, [modalCarouselImages])

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
      if (isManuallyScrollingRef.current) {
        return
      }

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
        } else {
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
    // Initialize carousels
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

  useEffect(() => {
    // Start autoplay for all carousels after they're initialized
    if (project && Object.keys(carouselStates).length > 0) {
      project.sections.forEach((section, index) => {
        if (section.images && section.images.length > 0 && !carouselIntervals[index]) {
          startCarouselAutoplay(index, section.images.length)
        }
      })
    }
  }, [carouselStates, project])

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
    // Clear any existing interval first
    if (carouselIntervals[sectionIndex]) {
      clearInterval(carouselIntervals[sectionIndex])
    }

    const interval = setInterval(() => {
      setCarouselStates(prev => {
        const state = prev[sectionIndex] || { currentIndex: 0, isInteracting: false }
        if (!state.isInteracting && !modalCarouselImages) {
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
    }, 4500)

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
        currentIndex: (prev[sectionIndex]?.currentIndex || 0) - 1 < 0 ? totalImages - 1 : (prev[sectionIndex]?.currentIndex || 0) - 1,
        isInteracting: true
      }
    }))
    stopCarouselAutoplay(sectionIndex)
  }

  const handleCarouselNext = (sectionIndex: number, totalImages: number) => {
    setCarouselStates(prev => ({
      ...prev,
      [sectionIndex]: {
        ...prev[sectionIndex],
        currentIndex: ((prev[sectionIndex]?.currentIndex || 0) + 1) % totalImages,
        isInteracting: true
      }
    }))
    stopCarouselAutoplay(sectionIndex)
  }

  const resumeCarouselAutoplay = (sectionIndex: number, totalImages: number) => {
    setCarouselStates(prev => ({
      ...prev,
      [sectionIndex]: {
        ...prev[sectionIndex],
        isInteracting: false
      }
    }))
    startCarouselAutoplay(sectionIndex, totalImages)
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

        .carousel-image {
          transition: opacity 1.2s ease-in-out;
        }

        .carousel-image img {
          transition: none !important;
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
            className="flex-1 flex flex-col bg-[rgb(14,14,18)] z-[40]"
            style={{ paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)', paddingTop: 'clamp(32px, 8vw, 64px)', paddingBottom: 'clamp(32px, 8vw, 64px)', gap: 'clamp(32px, 8vw, 64px)' }}
          >
            {project.sections.map((section, index) => (
              <FadeIn key={index} delay={index * 0.06}>
                {index === 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '64px', paddingBottom: '32px', borderBottom: '1px solid rgb(31, 31, 31)' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: 'rgb(97, 97, 97)', textTransform: 'uppercase', fontFamily: 'Gucina', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                        Type
                      </p>
                      <p style={{ fontSize: '14px', color: 'rgb(250, 250, 250)', fontFamily: 'Gucina', margin: 0 }}>
                        {project.slug === 'martell' || project.slug === 'jameson' ? 'Out-of-Home Advertising' : project.slug === 'duskline' ? 'Listening Bar' : project.slug === 'verdant' ? 'Cafe' : project.slug === 'rash' ? 'Sports' : 'TBD'}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: 'rgb(97, 97, 97)', textTransform: 'uppercase', fontFamily: 'Gucina', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                        Year
                      </p>
                      <p style={{ fontSize: '14px', color: 'rgb(250, 250, 250)', fontFamily: 'Gucina', margin: 0 }}>
                        {project.date ? project.date.split(' ').pop() : 'TBD'}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: 'rgb(97, 97, 97)', textTransform: 'uppercase', fontFamily: 'Gucina', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                        Scope
                      </p>
                      <p style={{ fontSize: '14px', color: 'rgb(250, 250, 250)', fontFamily: 'Gucina', margin: 0 }}>
                        {project.slug === 'martell' || project.slug === 'jameson' ? '3D Modelling' : project.slug === 'duskline' ? 'Branding, Visual Design' : project.slug === 'verdant' ? 'Branding, Visual Design' : project.slug === 'rash' ? 'Branding' : 'TBD'}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: 'rgb(97, 97, 97)', textTransform: 'uppercase', fontFamily: 'Gucina', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                        Tools
                      </p>
                      {(project.slug === 'martell' || project.slug === 'jameson') ? (
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0px' }}>
                          <ToolIcon name="Blender" />
                          <ToolIcon name="Photoshop" />
                        </div>
                      ) : (project.slug === 'duskline' || project.slug === 'verdant') ? (
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0px' }}>
                          <ToolIcon name="Figma" />
                          <ToolIcon name="Photoshop" />
                        </div>
                      ) : project.slug === 'rash' ? (
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0px' }}>
                          <ToolIcon name="Photoshop" />
                          <ToolIcon name="Illustrator" />
                        </div>
                      ) : (
                        <p style={{ fontSize: '14px', color: 'rgb(250, 250, 250)', fontFamily: 'Gucina', margin: 0 }}>
                          TBD
                        </p>
                      )}
                    </div>
                  </div>
                )}
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
                    (['martell', 'jameson', 'rash', 'verdant', 'duskline'].includes(project?.slug || '')) ? (
                      <div className="w-full flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {section.images.map((image, imgIndex) => (
                          <>
                            <div
                              key={imgIndex}
                              className="w-full rounded-xl overflow-hidden"
                              style={{ position: 'relative', width: '100%', paddingBottom: '75%' }}
                            >
                              <Image
                                src={image}
                                alt={`${section.title} - Image ${imgIndex + 1}`}
                                fill
                                loading="eager"
                                quality={75}
                                className="w-full h-full rounded-xl"
                                style={{ objectFit: 'cover', userSelect: 'none', borderRadius: '12px' }}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1240px) 100vw, 1000px"
                                onContextMenu={(e) => handleImageContextMenu(e as any)}
                                onDragStart={handleImageDrag}
                              />
                            </div>
                            {section.video && imgIndex === 0 && (
                              <div style={{ position: 'relative', width: 'calc(100% + 128px)', marginLeft: '-64px', marginRight: '-64px', marginTop: '32px', height: '900px', borderRadius: '12px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: section.video }} />
                            )}
                          </>
                        ))}
                      </div>
                    ) : (
                      <div
                        className={`w-full rounded-xl overflow-hidden group relative ${(['duskline', 'verdant'].includes(project?.slug || '') && !isMobile) ? '' : 'cursor-pointer'}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          const noModalProjects = ['rash', 'duskline', 'verdant']
                          if (isMobile || !noModalProjects.includes(project?.slug || '')) {
                            setModalCarouselImages(section.images!)
                            setModalCarouselIndex(carouselStates[index]?.currentIndex || 0)
                          }
                        }}
                        onMouseEnter={() => {
                          setCarouselStates(prev => ({
                            ...prev,
                            [index]: {
                              ...prev[index],
                              isInteracting: true
                            }
                          }))
                          stopCarouselAutoplay(index)
                        }}
                        onMouseLeave={() => {
                          resumeCarouselAutoplay(index, section.images!.length)
                        }}
                      >
                        <div className="relative" style={{ width: '100%', ...((['duskline', 'verdant'].includes(project?.slug || '')) ? { position: 'relative', minHeight: 'auto' } : { paddingBottom: '75%', position: 'relative' }) }}>
                          {section.images.map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="absolute inset-0 w-full h-full carousel-image"
                              style={{
                                opacity: (carouselStates[index]?.currentIndex || 0) === imgIndex ? 1 : 0,
                                pointerEvents: (carouselStates[index]?.currentIndex || 0) === imgIndex ? 'auto' : 'none'
                              }}
                            >
                              <Image
                                src={image}
                                alt={`${section.title} - Image ${imgIndex + 1}`}
                                fill
                                loading="eager"
                                quality={75}
                                className="w-full h-full"
                                style={{ objectFit: (project.slug === 'duskline' || project.slug === 'verdant') ? 'contain' : 'cover', userSelect: 'none' }}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1240px) 100vw, 1000px"
                                onContextMenu={(e) => handleImageContextMenu(e as any)}
                                onDragStart={handleImageDrag}
                              />
                            </div>
                          ))}

                          {(carouselStates[index]?.isInteracting) && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleCarouselPrevious(index, section.images!.length) }}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: 'rgb(40, 40, 40)' }}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleCarouselNext(index, section.images!.length) }}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: 'rgb(40, 40, 40)' }}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
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
                    )
                  ) : section.image && (
                    <div
                      className={`w-full rounded-xl overflow-hidden group ${(['martell', 'jameson', 'rash', 'duskline', 'verdant'].includes(project?.slug || '') && !isMobile) ? '' : 'cursor-pointer'}`}
                      style={{ maxHeight: (['duskline', 'verdant', 'rash'].includes(project?.slug || '')) ? 'auto' : (['martell', 'jameson'].includes(project?.slug || '') ? 'auto' : '70vh') }}
                      onClick={() => {
                        const noModalProjects = ['martell', 'jameson', 'rash', 'duskline', 'verdant']
                        if (isMobile || !noModalProjects.includes(project?.slug || '')) {
                          setModalImage(section.image || null)
                        }
                      }}
                    >
                      <Image
                        src={section.image}
                        alt={section.title}
                        width={1400}
                        height={1051}
                        loading="lazy"
                        quality={75}
                        className="w-full h-full group-hover:opacity-90 transition-opacity"
                        style={{
                          objectFit: (project.slug === 'duskline' || project.slug === 'verdant') ? 'contain' : 'cover',
                          userSelect: 'none'
                        }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1240px) 100vw, 1000px"
                        onContextMenu={(e) => handleImageContextMenu(e as any)}
                        onDragStart={handleImageDrag}
                      />
                    </div>
                  )}
                  {section.video && (
                    <div style={{ position: 'relative', width: 'calc(100% + 128px)', marginLeft: '-64px', marginRight: '-64px', marginTop: '32px', height: '900px', borderRadius: '12px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: section.video }} />
                  )}
                </section>
              </FadeIn>
            ))}
          </div>

        </div>

        <section className="w-full bg-[rgb(14,14,18)] border-t-2 border-[rgb(2,1,10)] overflow-hidden px-16 py-16 flex flex-col gap-8 relative z-[40]" style={{ paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)', paddingTop: 'clamp(32px, 8vw, 64px)', paddingBottom: 'clamp(32px, 8vw, 64px)' }}>
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <h2
                className="font-heading text-[clamp(14px,2vw,16px)] leading-[1.4em] tracking-[0.07em] text-[rgb(250,250,250)] uppercase"
                style={{ fontFamily: 'Mortend', margin: 0 }}
              >
                More projects
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
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                See all
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
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
          className="fixed inset-0 bg-black z-[100] flex items-center justify-center py-16 px-4"
          onClick={() => setModalImage(null)}
          style={{ userSelect: 'none' }}
        >
          <button
            onClick={() => setModalImage(null)}
            className="absolute top-6 right-6 w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-black hover:bg-red-600 active:text-black active:bg-red-600 z-50 transition-colors font-extrabold text-xs"
          >
            ✕
          </button>

          <div className="flex items-center justify-center max-w-[90vw] max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={modalImage}
              alt="Full size image"
              width={1600}
              height={900}
              className="object-contain rounded-lg"
              onContextMenu={(e) => handleImageContextMenu(e as any)}
              onDragStart={handleImageDrag}
              style={{ userSelect: 'none' }}
            />
          </div>
        </div>
      )}

      {modalCarouselImages && (
        <div
          className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center px-4"
          onClick={() => setModalCarouselImages(null)}
          style={{ userSelect: 'none', paddingTop: '60px', paddingBottom: '100px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setModalCarouselImages(null)}
            className="absolute top-6 right-6 w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-black hover:bg-red-600 active:text-black active:bg-red-600 z-50 transition-colors font-extrabold text-xs"
          >
            ✕
          </button>

          <div className="flex items-center justify-center gap-6 w-full flex-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setModalCarouselIndex((prev) => (prev - 1 + modalCarouselImages.length) % modalCarouselImages.length)
              }}
              className="hidden md:flex flex-shrink-0 w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: 'rgb(40, 40, 40)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className={`flex items-center justify-center h-full ${isMobile ? 'w-screen' : 'max-w-[90vw]'}`}>
              <Image
                src={modalCarouselImages[modalCarouselIndex]}
                alt={`Image ${modalCarouselIndex + 1}`}
                width={1600}
                height={900}
                className="object-contain rounded-lg"
                priority
                onContextMenu={(e) => handleImageContextMenu(e as any)}
                onDragStart={handleImageDrag}
                style={{ userSelect: 'none', maxHeight: '50vh', width: 'auto', height: 'auto' }}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setModalCarouselIndex((prev) => (prev + 1) % modalCarouselImages.length)
              }}
              className="hidden md:flex flex-shrink-0 w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: 'rgb(40, 40, 40)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-[calc(1.5rem-20px)] left-1/2 transform -translate-x-1/2 font-gucina text-[14px] text-[rgb(138,138,138)]">
            {modalCarouselIndex + 1} / {modalCarouselImages.length}
          </div>
        </div>
      )}
    </>
  )
}
