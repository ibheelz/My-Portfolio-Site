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
  const [isModalOpen, setIsModalOpen] = useState(false)
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
          style={{ minHeight: 'clamp(60vh, 80vh, 100vh)', paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)' }}
        >
          {/* Left Side - Slideshow */}
          <div
            ref={slideShowRef}
            className="relative overflow-hidden cursor-grab active:cursor-grabbing w-full flex flex-col"
            style={{ flex: '1 1 60%', height: '100%' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            {/* Image Container */}
            <div
              className="relative flex-1 w-full overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setIsModalOpen(true)}
            >
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
            <div className="flex items-center justify-center gap-2 bg-[rgb(14,14,18)]" style={{ paddingTop: 'clamp(6px, 1vw, 8px)', paddingBottom: 'clamp(6px, 1vw, 8px)', paddingLeft: 'clamp(12px, 2vw, 16px)', paddingRight: 'clamp(12px, 2vw, 16px)' }}>
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

          {/* Right Side - Info */}
          <div className="flex-1 flex flex-col justify-between" style={{ padding: 'clamp(24px, 5vw, 48px)', paddingTop: 'clamp(24px, 10vw, 96px)' }}>
            {/* Top Content */}
            <div className="flex flex-col" style={{ gap: 'clamp(16px, 4vw, 32px)', marginTop: 'clamp(60px, 10vw, 100px)' }}>
              <h1 className="font-heading text-[clamp(28px,6vw,40px)] leading-[1.3] tracking-[-0.02em] text-[rgb(250,250,250)] uppercase" style={{ fontFamily: 'Mortend' }}>
                {exploration.title}
              </h1>
              {exploration.description && (
                <p className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.7] text-[rgb(138,138,138)]">
                  {exploration.description}
                </p>
              )}
            </div>

            {/* Bottom Content */}
            <div className="flex flex-col" style={{ gap: 'clamp(16px, 4vw, 32px)' }}>
              {/* Tools */}
              <div className="flex flex-col" style={{ gap: 'clamp(8px, 2vw, 12px)' }}>
                <label className="font-gucina font-bold text-[clamp(10px,1.5vw,12px)] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Tools
                </label>
                <div className="flex flex-wrap" style={{ gap: 'clamp(6px, 1.5vw, 10px)' }}>
                  {exploration.tools.map((tool) => (
                    <div
                      key={tool}
                      className="rounded-full border border-[rgb(51,51,51)]"
                      style={{ padding: 'clamp(4px, 1vw, 6px) clamp(8px, 1.5vw, 12px)' }}
                    >
                      <span className="font-gucina text-[clamp(10px,1.5vw,12px)] leading-[1.5] text-[rgb(138,138,138)]">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date */}
              {exploration.date && (
                <div className="flex flex-col" style={{ gap: 'clamp(8px, 1.5vw, 12px)' }}>
                  <label className="font-gucina font-bold text-[clamp(10px,1.5vw,12px)] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Date
                  </label>
                  <p className="font-gucina text-[clamp(10px,1.5vw,12px)] leading-[1.5] text-[rgb(138,138,138)]">
                    {exploration.date}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="flex flex-col lg:hidden overflow-hidden w-full" style={{ paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)' }}>
          {/* Title at top */}
          <div className="bg-[rgb(14,14,18)]" style={{ paddingTop: 'clamp(24px, 5vw, 48px)', paddingBottom: 'clamp(12px, 2vw, 16px)' }}>
            <h1 className="font-heading text-[clamp(28px,7vw,36px)] leading-[1.3] tracking-[-0.02em] text-[rgb(250,250,250)] uppercase" style={{ fontFamily: 'Mortend' }}>
              {exploration.title}
            </h1>
          </div>

          {/* Slideshow for mobile */}
          <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing w-full flex flex-col"
            style={{ width: '100%', height: 'clamp(250px, 50vh, 450px)' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            {/* Image Container */}
            <div
              className="relative flex-1 w-full overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setIsModalOpen(true)}
            >
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
            <div className="flex items-center justify-center gap-2 bg-[rgb(14,14,18)]" style={{ paddingTop: 'clamp(6px, 1vw, 8px)', paddingBottom: 'clamp(6px, 1vw, 8px)', paddingLeft: 'clamp(12px, 2vw, 16px)', paddingRight: 'clamp(12px, 2vw, 16px)' }}>
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
          <div className="bg-[rgb(14,14,18)]" style={{ paddingTop: 'clamp(24px, 5vw, 48px)', paddingBottom: 'clamp(24px, 5vw, 48px)' }}>
            {exploration.description && (
              <p className="font-gucina text-[clamp(14px,2vw,16px)] leading-[1.7] text-[rgb(138,138,138)]" style={{ marginBottom: 'clamp(16px, 4vw, 24px)' }}>
                {exploration.description}
              </p>
            )}

            <div className="flex flex-col" style={{ gap: 'clamp(16px, 4vw, 24px)' }}>
              <div className="flex flex-col" style={{ gap: 'clamp(8px, 2vw, 12px)' }}>
                <label className="font-gucina font-bold text-[clamp(10px,1.5vw,12px)] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                  Tools
                </label>
                <div className="flex flex-wrap" style={{ gap: 'clamp(6px, 1.5vw, 10px)' }}>
                  {exploration.tools.map((tool) => (
                    <div key={tool} className="rounded-full border border-[rgb(51,51,51)]" style={{ padding: 'clamp(4px, 1vw, 6px) clamp(8px, 1.5vw, 12px)' }}>
                      <span className="font-gucina text-[clamp(10px,1.5vw,12px)] leading-[1.5] text-[rgb(138,138,138)]">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {exploration.date && (
                <div className="flex flex-col" style={{ gap: 'clamp(8px, 1.5vw, 12px)' }}>
                  <label className="font-gucina font-bold text-[clamp(10px,1.5vw,12px)] leading-[1.4em] tracking-[0.14em] uppercase text-[rgb(97,97,97)]">
                    Date
                  </label>
                  <p className="font-gucina text-[clamp(10px,1.5vw,12px)] leading-[1.5] text-[rgb(138,138,138)]">
                    {exploration.date}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* More Explorations Section */}
        <section className="w-full bg-[rgb(14,14,18)] overflow-hidden flex flex-col relative z-[40]" style={{ padding: 'clamp(32px, 8vw, 64px)', paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)', gap: 'clamp(24px, 5vw, 40px)' }}>
          <h2
            className="font-heading text-[clamp(12px,2.5vw,15px)] leading-[1.4] tracking-[0.07em] text-[rgb(250,250,250)] uppercase"
            style={{ fontFamily: 'Mortend' }}
          >
            More explorations
          </h2>
          <div className="explorations-grid w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 30vw, 400px), 1fr))', columnGap: 'clamp(16px, 4vw, 32px)', rowGap: 'clamp(32px, 6vw, 64px)' }}>
            {otherExplorations.map((e) => (
              <ExplorationCard key={e.slug} exploration={e} />
            ))}
          </div>
        </section>

        {/* Image Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative w-full h-full max-w-6xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Image
                src={exploration.images[currentImageIndex]}
                alt={`${exploration.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />

              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 w-10 h-10 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center z-10 hover:border-[rgb(138,138,138)] transition-colors"
                style={{ top: '50%', transform: 'translateY(-50%)', opacity: currentImageIndex === 0 ? 0.65 : 1 }}
                disabled={currentImageIndex === 0}
              >
                <CaretRight size={16} weight="bold" color="rgb(138,138,138)" style={{ transform: 'scaleX(-1)' }} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 w-10 h-10 rounded-full bg-[rgb(2,1,10)] border border-[rgb(51,51,51)] flex items-center justify-center z-10 hover:border-[rgb(138,138,138)] transition-colors"
                style={{ top: '50%', transform: 'translateY(-50%)', opacity: currentImageIndex === exploration.images.length - 1 ? 0.65 : 1 }}
                disabled={currentImageIndex === exploration.images.length - 1}
              >
                <CaretRight size={16} weight="bold" color="rgb(138,138,138)" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center text-white text-2xl z-20"
              >
                ✕
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 flex items-center justify-center gap-2 px-4">
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
          </div>
        )}
      </div>
    </>
  )
}
