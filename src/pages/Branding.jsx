import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { attachHireMe } from '../utils/attachHireMe'
import brandingBG from '../assets/branding-BG.webp'
import brandingHero from '../assets/branding-hero.webp'
// Load all merchandise images at build time (drop new files into src/assets/merchandise)
const merchImports = import.meta.glob('../assets/merchandise/*.{webp,png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' })
const merchImages = Object.values(merchImports).sort()

function Branding() {
  const navigate = useNavigate()
  const location = useLocation()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCard, setModalCard] = useState(null)
  const [heroKey, setHeroKey] = useState(0)
  // Lightbox state (match CreativeDesigner style)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxClosing, setLightboxClosing] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [enterDir, setEnterDir] = useState(null)
  const lightboxRef = useRef(null)
  const closeBtnRef = useRef(null)
  const thumbsScrollRef = useRef(null)
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)
  const preloadedRef = useRef(new Set())
  const [lightboxEntering, setLightboxEntering] = useState(false)
  const enterTimerRef = useRef(null)
  useEffect(() => {
    if (location.state && location.state.animateHero) {
      setHeroKey((k) => k + 1)
    }
  }, [])

  // Ensure subpage "Hire Me" buttons trigger mailto (works on client-side navigation)
  useEffect(() => {
    const cleanup = attachHireMe(document)
    return cleanup
  }, [])

  // Preload page background image to speed up LCP on this subpage
  useEffect(() => {
    const href = brandingBG
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    document.head.appendChild(link)
    return () => { try { document.head.removeChild(link) } catch (_) {} }
  }, [])

  // Preload hero image to reduce LCP
  useEffect(() => {
    const href = brandingHero
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    document.head.appendChild(link)
    return () => { try { document.head.removeChild(link) } catch (_) {} }
  }, [])

  // Lock background scroll when modal open
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    if (modalOpen || lightboxOpen) { html.style.overflow = 'hidden'; body.style.overflow = 'hidden' }
    else { html.style.overflow = prevHtmlOverflow || ''; body.style.overflow = prevBodyOverflow || '' }
    return () => { html.style.overflow = prevHtmlOverflow || ''; body.style.overflow = prevBodyOverflow || '' }
  }, [modalOpen, lightboxOpen])

  // Decode helper
  const ensureDecoded = (src) => new Promise((resolve) => {
    if (!src || preloadedRef.current.has(src)) return resolve()
    const img = new Image(); img.src = src
    if (img.decode) { img.decode().catch(() => {}).then(() => { preloadedRef.current.add(src); resolve() }) }
    else { if (img.complete) { preloadedRef.current.add(src); return resolve() }; img.onload = () => { preloadedRef.current.add(src); resolve() }; img.onerror = () => resolve() }
  })

  // Lightbox keyboard controls
  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); nextImage() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prevImage() }
    }
    window.addEventListener('keydown', onKey)
    setTimeout(() => closeBtnRef.current?.focus(), 0)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen])

  // Entrance animation flag
  useEffect(() => {
    if (lightboxOpen) {
      setLightboxEntering(true)
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current)
      enterTimerRef.current = setTimeout(() => setLightboxEntering(false), 1600)
    } else {
      setLightboxEntering(false)
      if (enterTimerRef.current) { clearTimeout(enterTimerRef.current); enterTimerRef.current = null }
    }
    return () => { if (enterTimerRef.current) { clearTimeout(enterTimerRef.current); enterTimerRef.current = null } }
  }, [lightboxOpen])

  const openMerch = async (startIndex = 0) => {
    const list = merchImages.length
      ? merchImages
      : Array.from({ length: 24 }, (_, i) => `${import.meta.env.BASE_URL}merchandise/${i + 1}.webp`)
    try {
      if (window.preloadGate) {
        window.preloadGate(list, { minMs: 0, maxMs: 0, silent: true })
      } else {
        const first = list[startIndex] || list[0]
        if (first) ensureDecoded(first)
      }
    } catch (_) {}
    setCurrentIndex(startIndex)
    // Ensure animation class is present on first paint
    setLightboxEntering(true)
    setLightboxOpen(true)
  }
  const handleCloseLightbox = () => {
    setLightboxClosing(true)
    setTimeout(() => { setLightboxOpen(false); setLightboxClosing(false) }, 140)
  }
  const imgCount = merchImages.length || 0
  const fallbackCount = 24 // allow up to 24 numbered images if using public/merchandise
  const total = imgCount || fallbackCount
  const prevImage = () => { setEnterDir('right'); setCurrentIndex((i) => (i - 1 + total) % total) }
  const nextImage = () => { setEnterDir('left'); setCurrentIndex((i) => (i + 1) % total) }

  // Mobile swipe (match Creative)
  const handleTouchStart = (e) => {
    const t = e.touches && e.touches[0]
    if (!t) return
    touchStartXRef.current = t.clientX
    touchStartYRef.current = t.clientY
  }
  const handleTouchMove = (e) => {
    const t = e.touches && e.touches[0]
    if (!t) return
    const dx = t.clientX - (touchStartXRef.current ?? t.clientX)
    const dy = t.clientY - (touchStartYRef.current ?? t.clientY)
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    if (window.innerWidth <= 768 && absDx > 40 && absDx > absDy * 1.2) {
      if (dx < 0) nextImage(); else prevImage()
      // Reset so it doesn't fire repeatedly during the same gesture
      touchStartXRef.current = t.clientX
      touchStartYRef.current = t.clientY
    }
  }
  const handleTouchEnd = () => {
    touchStartXRef.current = null
    touchStartYRef.current = null
  }

  return (
    <div className="min-h-screen bg-[#06080a] p-[clamp(6px,1.5vw,12px)] animate-fadeIn relative flex flex-col">
      {/* Fixed, non-scrolling background layer */}
      <div
        className="page-fixed-bg"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${brandingBG})`
        }}
      />
      {/* Fixed darkening overlay (does not scroll) */}
      <div className="page-fixed-overlay" aria-hidden />
      {/* Header with logo and buttons (fixed) */}
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        {/* Left SVG */}
        <img decoding="async"
          src="/left.svg"
          alt=""
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left svg-gold sub-anim-svg-left"
        />

        {/* Right SVG */}
        <img decoding="async"
          src="/right.svg"
          alt=""
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right svg-gold sub-anim-svg-right"
        />

        {/* Back button on the left */}
        <div className="absolute left-[clamp(16px,3vw,40px)] w-auto">
          <button
            onClick={() => navigate('/')}
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full sm:rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] whitespace-nowrap"
          >
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="hidden sm:inline">Character Select</span>
          </button>
        </div>

        {/* Logo centered - clickable */}
        <img decoding="async"
          src="/ibheelz-logo.webp"
          alt="ibheelz"
          className="h-[clamp(3rem,6vw,4.25rem)] w-auto cursor-pointer sub-anim-logo-slow"
          style={{ maxHeight: '68px' }}
          onClick={() => navigate('/')}
        />

        {/* View Resume button on the right */}
        <div className="absolute right-[clamp(16px,3vw,40px)]">
          <button
            onClick={() => window.open('/Resume.pdf', '_blank')}
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full sm:rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] cursor-pointer"
          >
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            <span className="hidden sm:inline">View Resume</span>
          </button>
        </div>
      </div>

      {/* Spacer to offset fixed navbar height */}
      <div className="header-spacer" />

      {/* Background section under navbar (fixed background/overlay) */}
      <div
        className="page-content relative brand-bg subpad flex-1 flex flex-col items-center justify-center p-0 mt-0 -mx-[clamp(12px,3vw,24px)] -mb-[clamp(12px,3vw,24px)] px-[clamp(18px,4.5vw,36px)] md:px-0 anim-bg-soft"
      >
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-20">
          {/* Left side button (lg+) */}
          <div className="hidden lg:flex flex-col items-center justify-center lg:my-24">
            <button
              className="branding-image-button anim-btn-soft font-['Jost',sans-serif] font-medium capitalize transition-all duration-300 flex items-center justify-center text-[clamp(11px,1vw,16px)]"
              style={{ minWidth: 'clamp(280px, 24vw, 480px)', height: 'clamp(64px,6vw,96px)' }}
            >
              <span className="branding-image-button__label">Brand Identity</span>
            </button>
          </div>

          {/* Centered hero image */}
          <img
            id="branding-hero"
            key={heroKey}
            src={brandingHero}
            alt="Brand Designer"
            className="w-full lg:w-auto h-auto object-contain mt-[clamp(48px,8vw,96px)] lg:mt-0 anim-content-soft mx-auto lg:mx-0 max-h-[78vh] lg:max-h-[68vh]"
            decoding="async"
            fetchpriority="high"
          />

          {/* Right side button (lg+) */}
          <div className="hidden lg:flex flex-col items-center justify-center lg:my-24">
            <button
              className="branding-image-button anim-btn-soft font-['Jost',sans-serif] font-medium capitalize transition-all duration-300 flex items-center justify-center text-[clamp(11px,1vw,16px)]"
              style={{ minWidth: 'clamp(280px, 24vw, 480px)', height: 'clamp(64px,6vw,96px)' }}
              onClick={() => openMerch(0)}
            >
              <span className="branding-image-button__label">Merchandise</span>
            </button>
          </div>
        </div>

        {/* Desktop-only Case Study button under hero */}
        <div className="hidden lg:flex w-full justify-center mt-10 mb-6">
          <button
            onClick={() => navigate('/branding/case-study')}
            className="branding-case-btn px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-full text-sm sm:text-base text-white font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2"
          >
            <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Case Studies
          </button>
        </div>

        {/* Mobile buttons under hero image */}
        <div className="lg:hidden w-full px-0 mt-[clamp(36px,7vw,64px)] mb-[clamp(80px,12vh,140px)] text-center">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 gap-[clamp(14px,3vw,24px)]">
            {['Brand Identity','Merchandise'].map((label, i) => (
              <button
                key={i}
                className="branding-image-button anim-btn-soft w-full font-['Jost',sans-serif] font-medium capitalize transition-all duration-300 flex items-center justify-center text-[clamp(13px,3.5vw,16px)]"
                style={{ height: 'clamp(64px,10vw,86px)' }}
                onClick={() => { if (label === 'Merchandise') openMerch(0) }}
              >
                <span className="branding-image-button__label">{label}</span>
              </button>
            ))}
          </div>
          {/* Mobile-only Case Study button (use gold style on small screens) */}
          <div className="mt-5">
            <button
              onClick={() => navigate('/branding/case-study')}
              className="apple-glass-button px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-full text-sm sm:text-base font-['Jost',sans-serif] font-medium transition-all duration-300 inline-flex items-center gap-1.5 sm:gap-2"
            >
              <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              Case Studies
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hire Me button (mobile only, exact as homepage) */}
      <div className="lg:hidden page-content mobile-sticky-cta flex justify-center items-center px-4 mt-[40px] mb-5">
        <button className="apple-glass-button-neutral px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base text-white font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2" style={{ minWidth: 'min(65vw, 520px)' }}>
          <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Hire Me
        </button>
      </div>

      {/* Modal overlay */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close glass-button rounded-full"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              title="Close"
            >
              ×
            </button>
            <div className="modal-split">
              <div className="modal-pane-left"></div>
              <div className="modal-pane-right"></div>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox for Merchandise */}
      {(lightboxOpen || lightboxClosing) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Merchandise gallery"
          className={`fixed inset-0 z-[9998] lightbox-overlay ${lightboxClosing ? 'lightbox-fade-out' : 'lightbox-fade-in'}`}
        >
          <button ref={closeBtnRef} className={`lightbox-close ${lightboxEntering ? 'controls-pop-in' : ''}`} aria-label="Close" onClick={handleCloseLightbox}>×</button>
          <button className="lightbox-chevron lightbox-prev" aria-label="Previous" onClick={prevImage}>
            <span className={`chevron-content ${lightboxEntering ? 'controls-pop-in' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </span>
          </button>
          <button className="lightbox-chevron lightbox-next" aria-label="Next" onClick={nextImage}>
            <span className={`chevron-content ${lightboxEntering ? 'controls-pop-in' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
          </button>
          <div className={`lightbox-modal ${lightboxEntering ? 'modal-pop-in' : (lightboxClosing ? 'scale-out' : 'scale-in')}`} ref={lightboxRef} onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-wrap" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <img
                key={currentIndex}
                src={(merchImages.length ? merchImages[currentIndex % merchImages.length] : `${import.meta.env.BASE_URL}merchandise/${currentIndex + 1}.webp`)}
                alt={`Merchandise ${currentIndex + 1}`}
                className={`lightbox-image ${enterDir === 'left' ? 'img-enter-left' : enterDir === 'right' ? 'img-enter-right' : ''}`}
                decoding="async"
              />
            </div>
          </div>
          <div className={`lightbox-thumbs ${lightboxEntering ? 'thumbs-pop-in' : ''}`} role="listbox" aria-label="Thumbnails" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-thumbs-scroll" ref={thumbsScrollRef}>
              <div className="thumbs-inner">
                {(merchImages.length ? merchImages : Array.from({ length: fallbackCount }, (_, i) => `${import.meta.env.BASE_URL}merchandise/${i + 1}.webp`)).map((src, i) => (
                  <button key={i} className={`thumb ${i === (currentIndex % total) ? 'thumb-active' : ''}`} aria-label={`Go to image ${i + 1}`} onClick={() => setCurrentIndex(i)}>
                    <img src={src} alt={``} decoding="async" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Fixed background shared style */
        .page-fixed-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          pointer-events: none;
        }
        .page-fixed-overlay {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: rgba(0,0,0,0);
        }
        .page-content { position: relative; z-index: 2; }
        /* Mobile sticky CTA fixed to bottom, above overlays */
        .mobile-sticky-cta {
          position: fixed;
          left: clamp(6px, 1.5vw, 12px);
          right: clamp(6px, 1.5vw, 12px);
          bottom: max(12px, env(safe-area-inset-bottom));
          z-index: 20;
          margin: 0;
        }
        @media (max-width: 1023.98px) {
          .page-fixed-overlay { background: rgba(0,0,0,0.35); }
        }
        @media (min-width: 1024px) {
          .page-fixed-overlay { background: rgba(0,0,0,0.5); }
        }
        /* Fixed background shared style */
        .page-fixed-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          pointer-events: none;
        }
        .svg-gold {
          filter: brightness(0) saturate(100%) invert(76%) sepia(36%) saturate(459%) hue-rotate(358deg) brightness(97%) contrast(89%);
        }

        .svg-left {
          top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2);
          left: calc(50% - 70px);
          transform: translateY(-50%);
        }

        .svg-right {
          top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2);
          right: calc(50% - 70px);
          transform: translateY(-50%);
        }

        @media (min-width: 768px) {
          .svg-left {
            left: calc(50% - 120px);
          }
          .svg-right {
            right: calc(50% - 120px);
          }
        }

        @media (min-width: 1024px) {
          .svg-left {
            left: calc(50% - 160px);
          }
          .svg-right {
            right: calc(50% - 160px);
          }
        }

        @media (min-width: 1280px) {
          .svg-left {
            left: calc(50% - 200px);
          }
          .svg-right {
            right: calc(50% - 200px);
          }
        }

        @media (min-width: 640px) {
          .svg-left {
            left: calc(50% - 90px);
          }
          .svg-right {
            right: calc(50% - 90px);
          }
        }

        .liquid-glass-header {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: clamp(20px, 4vw, 30px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: clamp(6px, 1.5vw, 12px);
          right: clamp(6px, 1.5vw, 12px);
          z-index: 10;
        }
        .header-spacer { height: clamp(72px, 12vh, 120px); }

        .glass-button {
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: 1.5px solid #ffffff;
          box-shadow: none;
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .glass-button:hover,
        .glass-button:active {
          background: #aa90db; /* Branding hover/click */
          border-color: #aa90db;
          box-shadow: none;
          color: #ffffff; /* white text */
        }

        /* Cards match navbar fill */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .theme-card {
          background: #06080a;
          border: none;
        }

        /* Grey merged center card */
        .grey-card {
          background: #06080a; /* page theme color */
          border: none;
        }

        /* Small screens: increase card height */
        @media (max-width: 639.98px) {
          .glass-card,
          .theme-card {
            min-height: clamp(180px, 35vh, 360px) !important;
          }
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(6, 8, 10, 0.45);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
          overscroll-behavior: contain;
        }
        .modal-glass {
          position: relative;
          width: 88vw;
          aspect-ratio: 16 / 9;
          max-height: 88vh;
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: clamp(16px, 3vw, 28px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
          color: #e7f2f8;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }
        .modal-close {
          position: absolute;
          top: clamp(12px, 2vw, 20px);
          right: clamp(12px, 2vw, 20px);
          line-height: 1;
          font-size: clamp(12px, 1.6vw, 16px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 200ms ease;
          width: clamp(26px, 3.85vw, 32px);
          height: clamp(26px, 3.85vw, 32px);
          border-radius: 9999px;
          box-sizing: border-box;
        }

        .modal-split { display: flex; width: 100%; height: 100%; }
        .modal-pane-left, .modal-pane-right { flex: 1 1 50%; height: 100%; }
        .modal-pane-left { background: transparent; }
        .modal-pane-right { background: #06080a; color: #e7f2f8; }

        /* Card entrance animations */
        @keyframes cardInLeft {
          from { transform: translateX(-120vw); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes cardInRight {
          from { transform: translateX(120vw); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes cardSoftFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        /* Slow entrance (as before) */
        .anim-card-in-left { animation: cardInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .anim-card-in-right { animation: cardInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .anim-card-fade { animation: cardSoftFade 2.4s ease-out 200ms both; }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes slideDownNav {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideDownNav {
          animation: slideDownNav 1.5s ease-out forwards;
        }

        @keyframes slideUpHero {
          from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUpHero {
          animation: slideUpHero 1s ease-out forwards;
        }

        /* Very slow logo slide-in */
        @keyframes subLogoSlowIn {
          from { transform: translateY(-40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .sub-anim-logo-slow { animation: subLogoSlowIn 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }

        /* Very slow SVGs slide/fade from sides */
        @keyframes subSvgInLeft {
          from { transform: translateX(-14px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes subSvgInRight {
          from { transform: translateX(14px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .sub-anim-svg-left { animation: subSvgInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) 200ms both; }
        .sub-anim-svg-right { animation: subSvgInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) 260ms both; }

        /* Soft content fade/slide-in for hero image (all screen sizes) */
        @keyframes contentSoftIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.992); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .anim-content-soft { animation: contentSoftIn 900ms ease-out 200ms both; }

        /* Enhanced hero image animation (enter + subtle float) */
        @keyframes heroEnter {
          0% { opacity: 0; transform: translateY(16px) scale(0.985); }
          60% { opacity: 1; transform: translateY(0) scale(1.012); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heroFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        .anim-hero-image {
          will-change: transform, opacity;
          animation: heroEnter 720ms cubic-bezier(0.2, 0.85, 0.2, 1) both, heroFloat 7000ms ease-in-out 900ms infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-hero-image { animation: heroEnter 400ms ease-out both; }
        }

        /* Page-level soft intro animations (exclude navbar) */
        @keyframes bgSoftIn {
          0% { opacity: 0; transform: scale(1.015); }
          100% { opacity: 1; transform: scale(1); }
        }
        .anim-bg-soft { animation: bgSoftIn 800ms ease-out both; }
        /* Reduce top spacing on mobile by decreasing margin (no transform clashes) */
        @media (max-width: 1023.98px) { #branding-hero { margin-top: calc(clamp(48px, 8vw, 96px) - 55px) !important; transform: none; } }
        /* Ensure exactly 20px gap on small-height mobiles */
        @media (max-width: 1023.98px) and (max-height: 700px) { #branding-hero { margin-top: 20px !important; } }

        /* Match Creative: extra darkening overlay via pseudo */
        .brand-bg::before { display: none; }
        @media (max-width: 639.98px) {
          /* Add 2x horizontal padding on smaller screens */
          .subpad { padding-left: calc(clamp(18px, 4.5vw, 36px) * 2); padding-right: calc(clamp(18px, 4.5vw, 36px) * 2); }
        }

        /* Apple-style gold button (match homepage) */
        .apple-glass-button,
        .apple-glass-button-accent {
          position: relative;
          overflow: hidden;
        }
        .apple-glass-button {
          background: #d8ac65;
          border: none;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
          color: #10171d;
        }
        .apple-glass-button::before { display: none; }
        .apple-glass-button:hover {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
        }

        /* Apple-style glowing blue accent button (exact as homepage) */
        .apple-glass-button-accent {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            rgba(165, 200, 228, 0.25) 0%,
            rgba(165, 200, 228, 0.15) 50%,
            rgba(165, 200, 228, 0.25) 100%
          );
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          border: 1px solid rgba(165, 200, 228, 0.4);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 0 rgba(165, 200, 228, 0.3),
            0 8px 32px 0 rgba(165, 200, 228, 0.15);
          color: #ffffff;
        }
        /* Neutral gray button for Hire Me (mobile) */
        .apple-glass-button-neutral {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, rgba(180,190,200,0.28) 0%, rgba(180,190,200,0.18) 50%, rgba(180,190,200,0.28) 100%);
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          border: 1px solid rgba(180,190,200,0.45);
          box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.4), inset 0 -1px 0 0 rgba(180,190,200,0.35), 0 8px 32px 0 rgba(180,190,200,0.2);
          color: #ffffff;
        }
        .apple-glass-button-neutral::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%); animation: liquidMove 4s ease-in-out infinite; }
        .apple-glass-button-neutral::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent); animation: glossyShine 3s ease-in-out infinite; animation-delay: 0.5s; }
        .apple-glass-button-accent::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 60%);
          animation: liquidMove 4s ease-in-out infinite;
        }
        .apple-glass-button-accent::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: glossyShine 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .apple-glass-button-accent:hover {
          background: linear-gradient(
            135deg,
            rgba(165, 200, 228, 0.35) 0%,
            rgba(165, 200, 228, 0.25) 50%,
            rgba(165, 200, 228, 0.35) 100%
          );
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 0 rgba(165, 200, 228, 0.4),
            0 8px 32px 0 rgba(165, 200, 228, 0.25);
        }

        /* Branding theme Case Study button - glow-only (moving shine), no solid fill */
        .branding-case-btn {
          position: relative;
          overflow: hidden;
          background: transparent; /* no solid fill */
          border: 1.5px solid rgba(170, 144, 219, 0.85); /* theme-colored edge */
          box-shadow: none; /* glow comes from moving overlays */
          color: #ffffff;
        }
        /* Remove inner glow: keep only moving shine (::after) */
        .branding-case-btn::before { content: none; }
        .branding-case-btn::after {
          content: '';
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: glossyShine 3s ease-in-out infinite; animation-delay: 0.5s;
        }
        .branding-case-btn:hover,
        .branding-case-btn:active {
          /* Fill with branding theme color on hover/click */
          background: linear-gradient(135deg, #aa90db 0%, #9f84d3 50%, #aa90db 100%);
          border-color: #aa90db;
        }

        /* Glowing movement (match Home) */
        @keyframes liquidMove {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10%, 5%); }
          100% { transform: translate(0, 0); }
        }
        @keyframes glossyShine {
          0% { left: -100%; }
          50%, 100% { left: 200%; }
        }

        /* Branding image-based buttons */
        .branding-image-button {
          position: relative;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          cursor: pointer;
        }
        .branding-image-button::before {
          content: "";
          position: absolute; inset: 0;
          background-image: url('/branding-button.webp');
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
        .branding-image-button__label {
          position: relative;
          color: #ffffff;
          text-align: center;
          width: 100%; height: 100%;
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0 12px;
          pointer-events: none;
          transition: color 160ms ease;
        }
        /* Hover/click label color (match Creative) */
        .branding-image-button:hover .branding-image-button__label { color: #eabe76; }
        .branding-image-button:active .branding-image-button__label { color: #eabe76; }

        /* Lightbox (reuse Creative styles) */
        /* Lightbox (exact same as Creative) */
        .lightbox-overlay { background-image: linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(${brandingBG}); background-size: cover; background-position: center; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 120ms ease; overflow: hidden; overscroll-behavior: contain; }
        .lightbox-fade-in { opacity: 1; }
        .lightbox-fade-out { opacity: 0; }
        .lightbox-modal { position: relative; width: min(70vw, 1200px); max-height: 80vh; background: rgba(20,20,22,0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.35); color: #e7f2f8; transform: scale(0.98); transform-origin: center center; transition: transform 120ms ease; opacity: 0; }
        .scale-in { transform: scale(1); opacity: 1; }
        .scale-out { transform: scale(0.98); }
        .scale-in { transform: scale(1); }
        .scale-out { transform: scale(0.98); }
        @keyframes modalPopIn { 0% { opacity: 0; transform: translateY(12px) scale(0.94);} 100% { opacity: 1; transform: translateY(0) scale(1);} }
        .modal-pop-in { animation: modalPopIn 900ms cubic-bezier(0.2, 0.85, 0.2, 1) both; }
        @keyframes controlsPopIn { 0% { opacity: 0; transform: translateY(12px);} 100% { opacity: 1; transform: translateY(0);} }
        .controls-pop-in { animation: controlsPopIn 1200ms ease-out both 220ms; }
        .thumbs-pop-in { animation: controlsPopIn 1300ms ease-out both 260ms; }
        .chevron-content { display: inline-flex; align-items: center; justify-content: center; }
        .lightbox-close { position: fixed; top: calc(20px + env(safe-area-inset-top)); right: calc(10px + env(safe-area-inset-right)); z-index: 10001; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; background: transparent; color: #ffffff; border: none; font-size: 24px; line-height: 1; font-weight: 600; border-radius: 8px; }
        /* Match Branding navbar button color */
        .lightbox-close:hover { background: #aa90db; color: #ffffff; }
        .lightbox-close:active { background: #aa90db; color: #ffffff; }
        .lightbox-chevron { position: fixed; top: 50%; transform: translateY(-50%); z-index: 10001; width: 42px; height: 42px; border-radius: 9999px; border: 2px solid #ffffff; background: rgba(0,0,0,0.45); color: #fff; display: inline-flex; align-items: center; justify-content: center; transition: background 160ms ease, border-color 160ms ease, color 160ms ease; }
        .lightbox-prev { left: calc(20px + env(safe-area-inset-left)); }
        .lightbox-next { right: calc(20px + env(safe-area-inset-right)); }
        /* Match Branding navbar button color */
        .lightbox-chevron:hover { background: #aa90db; border-color: #aa90db; color: #ffffff; }
        .lightbox-chevron:active { background: #aa90db; border-color: #aa90db; color: #ffffff; }
        .lightbox-image-wrap { display: flex; align-items: center; justify-content: center; padding: 20px 20px 90px; touch-action: none; }
        .lightbox-image { max-width: 100%; max-height: calc(80vh - 110px); object-fit: cover; object-position: top center; border-radius: 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.35); will-change: transform, opacity, filter; }
        @keyframes imgEnterL { 0% { opacity: 0; transform: translateX(36px) scale(0.985); filter: blur(6px);} 100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0);} }
        @keyframes imgEnterR { 0% { opacity: 0; transform: translateX(-36px) scale(0.985); filter: blur(6px);} 100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0);} }
        .img-enter-left { animation: imgEnterL 900ms cubic-bezier(0.16, 1, 0.3, 1); }
        .img-enter-right { animation: imgEnterR 900ms cubic-bezier(0.16, 1, 0.3, 1); }
        .lightbox-thumbs { position: fixed; left: 0; right: 0; bottom: 0; height: 86px; background: rgba(10,10,12,0.35); border-top: none; z-index: 9999; padding-bottom: env(safe-area-inset-bottom); }
        .lightbox-thumbs-scroll { height: 100%; overflow-x: auto; overflow-y: hidden; padding: 8px 10px; -webkit-overflow-scrolling: touch; touch-action: pan-x; text-align: center; white-space: nowrap; }
        .lightbox-thumbs-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .lightbox-thumbs-scroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
        .thumbs-inner { display: inline-block; white-space: nowrap; }
        .thumb { width: 100px; height: 64px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; background: rgba(255,255,255,0.05); display: inline-block; vertical-align: middle; transition: transform 150ms ease, border-color 150ms ease; }
        .thumb:hover { transform: translateY(-1px); }
        .thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
        .thumb-active { border-color: #ed6d6d; }
        @media (max-width: 768px) { .lightbox-modal { width: min(92vw, 900px); max-height: 80vh; } .lightbox-image-wrap { padding: 12px 12px 90px; } .lightbox-chevron { display: none; } }
      `}</style>
    </div>
  )
}

export default Branding
