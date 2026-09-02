'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { explorations } from '@/src/data/content'
import ExplorationCard from '@/src/components/ExplorationCard'
import ToolIcon from '@/src/components/ToolIcon'
import { CaretRight, ArrowLeft } from '@phosphor-icons/react'
import { FadeIn } from '@/src/components/FadeIn'

interface ExplorationDetailClientProps {
  slug: string
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function ExplorationDetailClient({ slug }: ExplorationDetailClientProps) {
  const router = useRouter()
  const baseExploration = explorations.find((e) => e.slug === slug)
  const [exploration, setExploration] = useState(baseExploration)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const slideShowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (baseExploration) {
      setExploration({
        ...baseExploration,
        images: baseExploration.randomizeImages !== false ? shuffleArray(baseExploration.images) : baseExploration.images
      })
      setCurrentImageIndex(0)
      // Scroll to reveal description text below navbar on page load
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          const headerSection = document.querySelector('.exploration-header')
          if (headerSection) {
            headerSection.scrollIntoView({ behavior: 'auto', block: 'start' })
          }
        }, 0)
      }
    }
  }, [slug])

  if (!exploration) {
    return <div className="ml-[296px] p-8">Exploration not found</div>
  }

  const otherExplorations = explorations.filter((e) => e.slug !== exploration.slug).slice(0, 3)


  useEffect(() => {
    if (!isModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, currentImageIndex, exploration.images.length])

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + exploration.images.length) % exploration.images.length)
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % exploration.images.length)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    const dragDistance = e.clientX - dragStart
    if (dragDistance > 50) handlePrevious()
    else if (dragDistance < -50) handleNext()
  }

  return (
    <>
      <nav
        className="hidden lg:flex"
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
          {exploration.title}
        </h3>
      </nav>
<div className="relative w-full overflow-visible bg-[rgb(14,14,18)]">
        {/* Main content rectangle with padding */}
        <div className="mx-4 lg:mx-4 my-4 rounded-2xl overflow-hidden bg-[rgb(14,14,18)]">

          {/* Header Section */}
          <FadeIn>
            <div className="exploration-header border-b-2 border-[rgb(2,1,10)] pb-4 px-8 py-4" style={{ marginTop: '0', scrollMarginTop: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div>
                {exploration.description && (
                  <p className="font-gucina text-[14px] leading-[1.6]" style={{ color: ['posters', 'lucia'].includes(exploration.slug) ? 'white' : 'rgb(138,138,138)' }}>
                    {exploration.description}
                  </p>
                )}
                {exploration.tools && exploration.tools.length > 0 && (
                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px', marginBottom: '8px', alignItems: 'center' }}>
                    {exploration.tools.map((tool) => (
                      <div key={tool} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ToolIcon name={tool} hideText={true} />
                        </div>
                        <span className="font-gucina text-[12px] text-[rgb(138,138,138)]">{tool}</span>
                      </div>
                    ))}
                  </div>
                )}
                {exploration.slug === 'lucia' && (
                  <a
                    href="https://www.instagram.com/luciaqxxn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex lg:hidden mt-4"
                    style={{ alignItems: 'center', justifyContent: 'center', width: 'fit-content', transition: 'all 0.3s ease', backgroundColor: 'transparent', padding: '0', border: 'none' }}
                    onMouseEnter={(e) => {
                      const link = e.currentTarget as HTMLAnchorElement
                      link.style.backgroundColor = 'white'
                      link.style.padding = '12px 16px'
                      link.style.border = '1px solid rgb(200, 200, 200)'
                      link.style.borderRadius = '8px'
                      const img = link.querySelector('img')
                      if (img) img.style.filter = 'brightness(0)'
                    }}
                    onMouseLeave={(e) => {
                      const link = e.currentTarget as HTMLAnchorElement
                      link.style.backgroundColor = 'transparent'
                      link.style.padding = '0'
                      link.style.border = 'none'
                      link.style.borderRadius = '0'
                      const img = link.querySelector('img')
                      if (img) img.style.filter = 'brightness(0) invert(1)'
                    }}
                  >
                    <img src="/instagram-logo.webp" alt="Instagram" style={{ width: '100px', height: 'auto', filter: 'brightness(0) invert(1)', display: 'block', transition: 'filter 0.3s ease' }} />
                  </a>
                )}
              </div>
              {exploration.slug === 'lucia' && (
                <a
                  href="https://www.instagram.com/luciaqxxn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:flex"
                  style={{ alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s ease', backgroundColor: 'transparent', padding: '0', border: 'none' }}
                  onMouseEnter={(e) => {
                    const link = e.currentTarget as HTMLAnchorElement
                    link.style.backgroundColor = 'white'
                    link.style.padding = '12px 16px'
                    link.style.border = '1px solid rgb(200, 200, 200)'
                    link.style.borderRadius = '8px'
                    const img = link.querySelector('img')
                    if (img) img.style.filter = 'brightness(0)'
                  }}
                  onMouseLeave={(e) => {
                    const link = e.currentTarget as HTMLAnchorElement
                    link.style.backgroundColor = 'transparent'
                    link.style.padding = '0'
                    link.style.border = 'none'
                    link.style.borderRadius = '0'
                    const img = link.querySelector('img')
                    if (img) img.style.filter = 'brightness(0) invert(1)'
                  }}
                >
                  <img src="/instagram-logo.webp" alt="Instagram" style={{ width: '100px', height: 'auto', filter: 'brightness(0) invert(1)', display: 'block', transition: 'filter 0.3s ease' }} />
                </a>
              )}
            </div>
            </div>
          </FadeIn>

          {/* Grid Section */}
          <FadeIn delay={0.1}>
            <div className="exploration-grid p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[18px] md:gap-[5px]">
              {exploration.images.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group" onClick={() => setIsModalOpen(true)}>
                  <Image
                    src={image}
                    alt={`${exploration.title} - Image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
            </div>
          </FadeIn>

          {/* Second Section - More Explorations Grid */}
          <FadeIn delay={0.2}>
            <section className="px-4 py-16">
            <h2 className="font-heading text-[16px] leading-[1.2] tracking-[-0.02em] text-white uppercase mb-8" style={{ fontFamily: 'Mortend' }}>
              More explorations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherExplorations.map((e, index) => (
                <ExplorationCard key={e.slug} exploration={e} />
              ))}
            </div>
            </section>
          </FadeIn>

        </div>
      </div>

      {/* Modal for full screen image view */}
      {isModalOpen && (
        <FadeIn className="fixed inset-0 bg-black z-[100] flex items-center justify-center py-16 px-4" onClick={() => setIsModalOpen(false)}>
          {/* Close button - top right */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-black hover:bg-red-600 active:text-black active:bg-red-600 z-50 transition-colors font-extrabold text-xs"
          >
            ✕
          </button>

          <div className="flex items-center justify-center gap-6 w-full h-full" onClick={(e) => e.stopPropagation()}>
            {/* Left Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-transparent border border-[rgb(138,138,138)] flex items-center justify-center hover:bg-[#60A5FA] hover:border-[#60A5FA] active:bg-[#60A5FA] active:border-[#60A5FA] hover:text-black active:text-black transition-colors"
            >
              <svg className="w-4 h-4 text-[rgb(138,138,138)] hover:text-black active:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <div className="flex items-center justify-center flex-1 max-w-4xl max-h-screen" key={currentImageIndex}>
              <Image
                key={`${exploration.slug}-${currentImageIndex}`}
                src={exploration.images[currentImageIndex]}
                alt={`${exploration.title} - Image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain rounded-lg w-full h-auto"
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1000px"
              />
            </div>

            {/* Right Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-transparent border border-[rgb(138,138,138)] flex items-center justify-center hover:bg-[#60A5FA] hover:border-[#60A5FA] active:bg-[#60A5FA] active:border-[#60A5FA] hover:text-black active:text-black transition-colors"
            >
              <svg className="w-4 h-4 text-[rgb(138,138,138)] hover:text-black active:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Counter at bottom */}
          <div className="absolute bottom-[calc(1.5rem-20px)] left-1/2 transform -translate-x-1/2 font-gucina text-[14px] text-[rgb(138,138,138)]">
            {currentImageIndex + 1} / {exploration.images.length}
          </div>
        </FadeIn>
      )}
    </>
  )
}
