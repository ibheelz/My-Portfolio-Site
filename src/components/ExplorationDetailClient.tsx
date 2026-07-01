'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { explorations } from '@/src/data/content'
import ExplorationCard from '@/src/components/ExplorationCard'
import { CaretRight } from '@phosphor-icons/react'
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
<div className="relative w-full overflow-visible bg-[rgb(14,14,18)]">
        {/* Main content rectangle with padding */}
        <div className="mx-4 lg:mx-4 my-4 rounded-2xl overflow-hidden bg-[rgb(14,14,18)]">

          {/* Header Section */}
          <div className="exploration-header border-b-2 border-[rgb(2,1,10)] pb-8 p-8">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div>
                <h1 className="font-heading text-[32px] leading-[40px] tracking-[-0.7px] text-white uppercase mb-4" style={{ fontFamily: 'Mortend', margin: 0 }}>
                  {exploration.title}
                </h1>
                {exploration.description && (
                  <p className="font-gucina text-[14px] leading-[1.6] text-[rgb(138,138,138)]">
                    {exploration.description}
                  </p>
                )}
              </div>
              {exploration.slug === 'lucia' && (
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                  <img src="/instagram-logo.webp" alt="Instagram" style={{ width: '40px', height: '40px', filter: 'brightness(0) invert(1)' }} />
                </a>
              )}
            </div>
          </div>

          {/* Grid Section */}
          <div className="exploration-grid p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5px]">
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

          {/* Second Section - More Explorations Grid */}
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

        </div>
      </div>

      {/* Modal for full screen image view */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black z-[100] flex items-center justify-center py-16 px-4"
          onClick={() => setIsModalOpen(false)}
        >
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
            <div className="flex items-center justify-center max-w-4xl max-h-screen">
              <Image
                src={exploration.images[currentImageIndex]}
                alt={`${exploration.title} - Image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain rounded-lg"
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
        </div>
      )}
    </>
  )
}
