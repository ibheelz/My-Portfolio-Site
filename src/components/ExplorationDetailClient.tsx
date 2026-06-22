'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { explorations } from '@/src/data/content'
import ExplorationCard from '@/src/components/ExplorationCard'
import LetsConnectSection from '@/src/components/LetsConnectSection'
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
      {/* Fixed decorative bars */}
      <div className="fixed top-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-3 hidden lg:block" />
      <div className="fixed bottom-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-3 hidden lg:block" />

      <div className="relative w-full bg-[rgb(2,1,10)]">
        {/* Main content rectangle with padding */}
        <div className="mx-4 lg:mx-4 my-4 rounded-2xl overflow-hidden bg-[rgb(14,14,18)]">

          {/* First Section - Full Viewport Height Split Layout */}
          <div className="flex flex-col lg:flex-row gap-2.5 border-b-2 border-[rgb(2,1,10)] pb-8 h-auto lg:h-screen">

            {/* Left Side - Slideshow (square on mobile, 65% on desktop) */}
            <div
              ref={slideShowRef}
              className="w-full lg:w-[65%] relative overflow-hidden cursor-grab active:cursor-grabbing h-auto lg:h-full aspect-square lg:aspect-auto"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => setIsDragging(false)}
            >
              {/* Slideshow Images */}
              <div className="w-full h-full relative">
                {exploration.images.map((image, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 cursor-pointer"
                    style={{ display: index === currentImageIndex ? 'block' : 'none' }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Image
                      src={image}
                      alt={`${exploration.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      quality={80}
                      sizes="100vw"
                    />
                  </div>
                ))}

                {/* Previous Button - Left Middle (hidden on mobile) */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                  className="absolute left-4 top-1/2 z-10 w-10 h-10 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center hover:border-[rgb(138,138,138)] transition-colors hidden lg:flex"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <CaretRight size={16} weight="bold" color="rgb(138,138,138)" style={{ transform: 'scaleX(-1)' }} />
                </button>

                {/* Next Button - Right Middle (hidden on mobile) */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 z-10 w-10 h-10 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center hover:border-[rgb(138,138,138)] transition-colors hidden lg:flex"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <CaretRight size={16} weight="bold" color="rgb(138,138,138)" />
                </button>
              </div>
            </div>

            {/* Right Side - Text Information (remaining width on desktop) */}
            <div className="w-full lg:w-[35%] flex flex-col lg:justify-between p-8 gap-8 lg:gap-0">
              {/* Top Content */}
              <div className="flex flex-col gap-8">
                <h1 className="font-heading text-[32px] leading-[40px] tracking-[-0.7px] text-white uppercase" style={{ fontFamily: 'Mortend', margin: 0 }}>
                  {exploration.title}
                </h1>
                {exploration.description && (
                  <p className="font-gucina text-[14px] leading-[1.6] text-[rgb(138,138,138)]">
                    {exploration.description}
                  </p>
                )}
              </div>

              {/* Bottom Content */}
              <div className="flex flex-col gap-8">
                {/* Tools Block */}
                <div>
                  <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Tools
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {exploration.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1.5 border border-[rgb(51,51,51)] rounded-full font-gucina text-[12px] text-[rgb(138,138,138)]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Date Block */}
                {exploration.date && (
                  <div>
                    <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                      Date
                    </label>
                    <p className="font-gucina text-[12px] text-[rgb(138,138,138)] mt-3">{exploration.date}</p>
                  </div>
                )}
              </div>
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

          {/* Third Section - Let's Connect */}
          <section className="border-t-2 border-[rgb(2,1,10)] px-4 py-24">
            <LetsConnectSection />
          </section>
        </div>
      </div>

      {/* Modal for full screen image view */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative w-full h-full max-w-6xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={exploration.images[currentImageIndex]}
              alt={`${exploration.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center text-white text-2xl z-20"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
