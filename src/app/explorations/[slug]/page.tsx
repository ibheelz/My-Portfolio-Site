'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { explorations } from '@/src/data/content'
import ExplorationCard from '@/src/components/ExplorationCard'
import { CaretRight } from '@phosphor-icons/react'

interface ExplorationDetailPageProps {
  params: { slug: string }
}

export default function ExplorationDetailPage({ params }: ExplorationDetailPageProps) {
  const exploration = explorations.find((e) => e.slug === params.slug)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const slideShowRef = useRef<HTMLDivElement>(null)

  if (!exploration) {
    return <div className="ml-[296px] p-8">Exploration not found</div>
  }

  const otherExplorations = explorations.filter((e) => e.slug !== exploration.slug).slice(0, 3)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % exploration.images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [exploration.images.length])

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
      {/* Fixed decorative margins */}
      <div className="fixed top-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-3 hidden lg:block" />
      <div className="fixed bottom-0 left-[312px] right-4 h-4 bg-[rgb(2,1,10)] z-3 hidden lg:block" />

      {/* Main Content */}
      <div className="relative w-full overflow-visible bg-[rgb(14,14,18)]">
        {/* First Section - Split Layout */}
        <div
          className="relative w-full flex flex-col lg:flex-row gap-2.5 border-b-2 border-[rgb(2,1,10)] pb-8 overflow-hidden hidden lg:flex"
          style={{ height: '100vh', paddingLeft: '64px', paddingRight: '64px' }}
        >
          {/* Left Side - Slideshow (65%) */}
          <div
            ref={slideShowRef}
            className="relative overflow-hidden cursor-grab active:cursor-grabbing w-full flex flex-col"
            style={{ width: '65%', height: '100%', flex: '0 0 65%' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            {/* Image Container */}
            <div className="relative flex-1 w-full overflow-hidden">
              {exploration.images.map((image, index) => (
                <div
                  key={index}
                  className="absolute inset-0 w-full h-full transition-opacity duration-500"
                  style={{ opacity: index === currentImageIndex ? 1 : 0 }}
                >
                  <Image
                    src={image}
                    alt={`${exploration.title} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                className="absolute left-8 w-10 h-10 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center z-10 hover:border-[rgb(138,138,138)] transition-colors"
                style={{ top: '50%', transform: 'translateY(-50%)', opacity: currentImageIndex === 0 ? 0.65 : 1 }}
                disabled={currentImageIndex === 0}
              >
                <CaretRight size={16} weight="bold" color="rgb(138,138,138)" style={{ transform: 'scaleX(-1)' }} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-8 w-10 h-10 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center z-10 hover:border-[rgb(138,138,138)] transition-colors"
                style={{ top: '50%', transform: 'translateY(-50%)', opacity: currentImageIndex === exploration.images.length - 1 ? 0.65 : 1 }}
                disabled={currentImageIndex === exploration.images.length - 1}
              >
                <CaretRight size={16} weight="bold" color="rgb(138,138,138)" />
              </button>
            </div>

            {/* Image Indicators */}
            <div className="flex items-center justify-center gap-2 py-4 px-4 bg-[rgb(14,14,18)]">
              {exploration.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: index === currentImageIndex ? 'rgb(250,250,250)' : 'rgb(97,97,97)',
                    width: index === currentImageIndex ? '12px' : '8px'
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Info (35%) */}
          <div className="flex-1 flex flex-col justify-between p-8">
            {/* Top Content */}
            <div className="flex flex-col gap-8" style={{ marginTop: '100px' }}>
              <h1 className="font-heading text-[32px] leading-[40px] tracking-[-0.7px] text-[rgb(250,250,250)] uppercase" style={{ fontFamily: 'Mortend' }}>
                {exploration.title}
              </h1>
            </div>

            {/* Bottom Content */}
            <div className="flex flex-col gap-8">
              {/* Tools */}
              <div className="flex flex-col gap-2.5">
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Tools
                </label>
                <div className="flex flex-wrap gap-2">
                  {exploration.tools.map((tool) => (
                    <div
                      key={tool}
                      className="rounded-full border border-[rgb(51,51,51)] px-3 py-2"
                    >
                      <span className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-3">
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Date
                </label>
                <p className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                  2026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="flex flex-col lg:hidden overflow-hidden w-full">
          {/* Slideshow for mobile */}
          <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing w-full flex flex-col"
            style={{ width: '100%', height: '70vh' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            {/* Image Container */}
            <div className="relative flex-1 w-full overflow-hidden">
              {exploration.images.map((image, index) => (
                <div
                  key={index}
                  className="absolute inset-0 w-full h-full transition-opacity duration-500"
                  style={{ opacity: index === currentImageIndex ? 1 : 0 }}
                >
                  <Image
                    src={image}
                    alt={`${exploration.title} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 w-10 h-10 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center z-10"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                disabled={currentImageIndex === 0}
              >
                <CaretRight size={16} weight="bold" color="rgb(138,138,138)" style={{ transform: 'scaleX(-1)' }} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 w-10 h-10 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center z-10"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                disabled={currentImageIndex === exploration.images.length - 1}
              >
                <CaretRight size={16} weight="bold" color="rgb(138,138,138)" />
              </button>
            </div>

            {/* Image Indicators */}
            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-[rgb(14,14,18)]">
              {exploration.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: index === currentImageIndex ? 'rgb(250,250,250)' : 'rgb(97,97,97)',
                    width: index === currentImageIndex ? '12px' : '8px'
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Info section for mobile */}
          <div className="p-6 bg-[rgb(14,14,18)]">
            <h1 className="font-heading text-[32px] leading-[40px] tracking-[-0.7px] text-[rgb(250,250,250)] uppercase mb-8" style={{ fontFamily: 'Mortend' }}>
              {exploration.title}
            </h1>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2.5">
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Tools
                </label>
                <div className="flex flex-wrap gap-2">
                  {exploration.tools.map((tool) => (
                    <div key={tool} className="rounded-full border border-[rgb(51,51,51)] px-3 py-2">
                      <span className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-gucina font-bold text-[12px] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Date
                </label>
                <p className="font-gucina text-[12px] leading-[18px] text-[rgb(138,138,138)]">
                  2026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* More Explorations Section */}
        <section className="w-full bg-[rgb(14,14,18)] overflow-hidden px-16 py-16 flex flex-col gap-8 relative z-[40]" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
          <h2
            className="font-heading text-[15px] leading-[1.4em] tracking-[0.01em] text-[rgb(250,250,250)] uppercase"
            style={{ fontFamily: 'Mortend' }}
          >
            More explorations
          </h2>
          <div className="explorations-grid grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
            {otherExplorations.map((e) => (
              <ExplorationCard key={e.slug} exploration={e} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
