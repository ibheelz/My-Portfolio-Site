import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

function CreativeDesigner() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCard, setModalCard] = useState(null)
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxClosing, setLightboxClosing] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [enterDir, setEnterDir] = useState(null) // 'left' for next, 'right' for prev
  const lightboxRef = useRef(null)
  const closeBtnRef = useRef(null)
  const thumbsScrollRef = useRef(null)
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)
  // Which gallery to show in lightbox: 'posters' | 'web'
  const [galleryType, setGalleryType] = useState('posters')
  // Lightweight in-memory cache of decoded images
  const preloadedRef = useRef(new Set())

  // Galleries config: served via public/ symlinks to images/
  const galleries = {
    posters: { base: 'posters-and-flyers', length: 16 },
    web: { base: 'web-designs', length: 12 },
  }

  const active = galleries[galleryType]
  const gallery = Array.from({ length: active.length }, (_, i) => (
    `${import.meta.env.BASE_URL}${active.base}/${i + 1}.webp`
  ))

  // Decode helper: resolves once the image is decoded or loaded
  const ensureDecoded = (src) => new Promise((resolve) => {
    if (!src || preloadedRef.current.has(src)) return resolve()
    const img = new Image()
    img.src = src
    if (img.decode) {
      img.decode().catch(() => {}).then(() => { preloadedRef.current.add(src); resolve() })
    } else {
      if (img.complete) { preloadedRef.current.add(src); return resolve() }
      img.onload = () => { preloadedRef.current.add(src); resolve() }
      img.onerror = () => resolve()
    }
  })

  // Lock background scroll and interactions while modal is open
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow

    if (modalOpen || lightboxOpen) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
    } else {
      html.style.overflow = prevHtmlOverflow || ''
      body.style.overflow = prevBodyOverflow || ''
    }

    return () => {
      html.style.overflow = prevHtmlOverflow || ''
      body.style.overflow = prevBodyOverflow || ''
    }
  }, [modalOpen, lightboxOpen])

  // Lightbox keyboard controls and focus trap
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleCloseLightbox()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault(); nextImage()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault(); prevImage()
      } else if (e.key === 'Tab') {
        // simple focus trap: keep focus within lightbox
        const focusables = lightboxRef.current?.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])') || []
        if (focusables.length) {
          const first = focusables[0]
          const last = focusables[focusables.length - 1]
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    setTimeout(() => closeBtnRef.current?.focus(), 0)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, gallery.length])

  // Preload adjacent images after open to avoid perceived lag on first next/prev
  useEffect(() => {
    if (!lightboxOpen || !gallery.length) return
    const next = gallery[(currentIndex + 1) % gallery.length]
    const prev = gallery[(currentIndex - 1 + gallery.length) % gallery.length]
    ;[next, prev].forEach((src) => { if (src) ensureDecoded(src) })
  }, [lightboxOpen, currentIndex, gallery.length])

  // Ensure active thumbnail is always visible in the bottom strip
  useEffect(() => {
    if (!lightboxOpen) return
    const scroller = thumbsScrollRef.current
    if (!scroller) return
    const items = scroller.querySelectorAll('.thumb')
    const target = items && items[currentIndex]
    if (target && typeof target.scrollIntoView === 'function') {
      // slight defer to ensure DOM/layout ready
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      })
    }
  }, [currentIndex, lightboxOpen])

  const handleOpenLightbox = (startIndex = 0) => {
    setCurrentIndex(startIndex)
    setLightboxOpen(true)
  }
  // Open selected gallery after first image is decoded, then animate in
  const openLightboxFor = async (type, startIndex = 0) => {
    const cfg = galleries[type]
    const src = `${import.meta.env.BASE_URL}${cfg.base}/${startIndex + 1}.webp`
    await ensureDecoded(src)
    setGalleryType(type)
    setCurrentIndex(startIndex)
    setLightboxOpen(true)
  }
  const handleCloseLightbox = () => {
    setLightboxClosing(true)
    setTimeout(() => { setLightboxOpen(false); setLightboxClosing(false) }, 140)
  }
  const prevImage = () => {
    setEnterDir('right')
    setCurrentIndex((i) => (i - 1 + gallery.length) % gallery.length)
  }
  const nextImage = () => {
    setEnterDir('left')
    setCurrentIndex((i) => (i + 1) % gallery.length)
  }

  // Touch swipe (mobile): navigate images
  const handleTouchStart = (e) => {
    const t = e.touches && e.touches[0]
    if (!t) return
    touchStartXRef.current = t.clientX
    touchStartYRef.current = t.clientY
  }
  const handleTouchEnd = (e) => {
    const t = e.changedTouches && e.changedTouches[0]
    if (!t) return
    const dx = t.clientX - (touchStartXRef.current ?? t.clientX)
    const dy = t.clientY - (touchStartYRef.current ?? t.clientY)
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    // Only on small screens and when horizontal swipe dominates
    if (window.innerWidth <= 768 && absDx > 40 && absDx > absDy * 1.2) {
      if (dx < 0) nextImage(); else prevImage()
    }
  }

  return (
    <div className="min-h-screen bg-[#06080a] p-[clamp(12px,3vw,24px)] lg:p-[clamp(6px,1.5vw,12px)] animate-fadeIn relative flex flex-col">
      {/* Header with logo and buttons */}
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        {/* Left SVG */}
        <img
          src="/left.svg"
          alt=""
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left svg-gold sub-anim-svg-left"
        />

        {/* Right SVG */}
        <img
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
        <img
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

      {/* 3 x 2 Glass grid beneath navbar */}
      {/* Centered hero image */}
      <div
        className="relative cd-bg flex-1 flex flex-col items-center md:items-center justify-center p-0 mt-0 -mx-[clamp(12px,3vw,24px)] -mb-[clamp(12px,3vw,24px)] lg:-mx-[clamp(6px,1.5vw,12px)] lg:-mb-[clamp(6px,1.5vw,12px)] px-[clamp(18px,4.5vw,36px)] md:px-0 anim-bg-soft"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${import.meta.env.BASE_URL}creative-designer-BG.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center 0px',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Ensure single column on mobile; side columns only at lg+ */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-12 xl:gap-20">
          {/* Left side buttons (lg+) */}
          <div className="hidden lg:flex flex-col gap-28 items-center justify-center lg:my-24">
            {['posters & flyers','web design'].map((label, i) => (
              <button
                key={`left-${i}`}
                className="apple-glass-button-accent anim-btn-soft rounded-full font-['Jost',sans-serif] font-medium capitalize transition-all duration-300 flex items-center justify-center gap-3 px-[clamp(26px,3vw,48px)] py-[clamp(24px,5vw,48px)] text-[clamp(11px,1vw,16px)]"
                style={{ minWidth: 'clamp(280px, 24vw, 480px)', animationDelay: `${i * 80}ms` }}
                onClick={() => {
                  if (label.includes('posters')) openLightboxFor('posters', 0)
                  else if (label.includes('web')) openLightboxFor('web', 0)
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Center hero image */}
          <img
            src={import.meta.env.BASE_URL + 'creative-designer-hero.webp'}
            alt="Creative Designer"
            className="w-full lg:w-auto h-auto object-contain mt-[clamp(48px,8vw,96px)] lg:mt-0 anim-content-soft mx-auto lg:mx-0 max-h-[78vh] lg:max-h-[68vh]"
          />

          {/* Right side buttons (lg+) */}
          <div className="hidden lg:flex flex-col gap-28 items-center justify-center lg:my-24">
            {['packaging design','Editorial design'].map((label, i) => (
              <button
                key={`right-${i}`}
                className="apple-glass-button-accent anim-btn-soft rounded-full font-['Jost',sans-serif] font-medium capitalize transition-all duration-300 flex items-center justify-center gap-3 px-[clamp(26px,3vw,48px)] py-[clamp(24px,5vw,48px)] text-[clamp(11px,1vw,16px)]"
                style={{ minWidth: 'clamp(280px, 24vw, 480px)', animationDelay: `${i * 80 + 120}ms` }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile buttons under hero image, overlaid on BG */}
        <div className="lg:hidden w-full px-0 mt-[clamp(48px,8vw,96px)] mb-[clamp(80px,12vh,140px)] text-center" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Strictly one column on all <=1023px widths (mobile/tablet) */}
          <div className="max-w-[900px] mx-auto grid grid-cols-1 gap-[clamp(14px,3vw,24px)] gap-y-[clamp(40px,10vw,72px)]" style={{ gridTemplateColumns: '1fr' }}>
            {['posters & flyers','web design','packaging design','Editorial design'].map((label, i) => (
              <button
                key={i}
                className="apple-glass-button-accent anim-btn-soft w-full rounded-full font-['Jost',sans-serif] font-medium capitalize transition-all duration-300 flex items-center justify-center gap-3 px-[clamp(26px,3vw,48px)] py-[clamp(37px,6.5vw,67px)] text-[clamp(13px,3.5vw,16px)]"
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => {
                  if (label.includes('posters')) openLightboxFor('posters', 0)
                  else if (label.includes('web')) openLightboxFor('web', 0)
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Big CTA buttons (2 x 2) on small screens only; now inside BG container above */}
      <div className="hidden" />

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
            {/* Two equal panes, no margin/padding */}
            <div className="modal-split">
              <div className="modal-pane-left"></div>
              <div className="modal-pane-right"></div>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {(lightboxOpen || lightboxClosing) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          className={`fixed inset-0 z-[9998] lightbox-overlay ${lightboxClosing ? 'lightbox-fade-out' : 'lightbox-fade-in'}`}
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseLightbox() }}
        >
          {/* Controls positioned at page sides (overlay-level) */}
          <button ref={closeBtnRef} className="lightbox-close" aria-label="Close" onClick={handleCloseLightbox}>×</button>
          <button className="lightbox-chevron lightbox-prev" aria-label="Previous" onClick={prevImage}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="lightbox-chevron lightbox-next" aria-label="Next" onClick={nextImage}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          {/* Modal content */}
          <div ref={lightboxRef} className={`lightbox-modal ${lightboxClosing ? 'scale-out' : 'scale-in'}`} onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-wrap" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <img
                key={currentIndex}
                src={gallery[currentIndex]}
                alt={`Creative design ${currentIndex + 1}`}
                decoding="async"
                fetchpriority="high"
                loading="eager"
                className={`lightbox-image ${enterDir === 'left' ? 'img-enter-left' : enterDir === 'right' ? 'img-enter-right' : ''}`}
                onAnimationEnd={() => setEnterDir(null)}
              />
            </div>
          </div>
          {/* Thumbnails pinned to screen bottom */}
          <div className="lightbox-thumbs" role="listbox" aria-label="Thumbnails" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-thumbs-scroll" ref={thumbsScrollRef}>
              {gallery.map((src, i) => (
                <button
                  key={i}
                  role="option"
                  aria-selected={i === currentIndex}
                  className={`thumb ${i === currentIndex ? 'thumb-active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  title={`View image ${i + 1}`}
                >
                  <img src={src} alt={`Thumbnail ${i + 1}`} loading="lazy" decoding="async" fetchpriority="low" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
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
          position: sticky;
          top: 0;
          z-index: 50;
        }

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
          background: #ec6d6c;
          border-color: #ec6d6c;
          box-shadow: none;
          color: #ffffff; /* white text on pinkish bg */
        }
        /* Ensure icons turn white on pinkish bg */
        .glass-button:hover svg,
        .glass-button:active svg {
          stroke: #ffffff;
          fill: none;
        }

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

        /* Glass grid cards – match navbar glass style */
        .glass-card {
          /* Match navbar fill */
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
        }

        .theme-card {
          /* Middle bottom: solid theme background */
          background: #06080a;
          border: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          box-shadow: none;
        }

        /* Grey merged center card */
        .grey-card {
          background: #06080a; /* page theme color */
          border: none;
        }

        /* Apple-style liquid glass buttons (from homepage) */
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

        .apple-glass-button::before {
          display: none;
        }

        .apple-glass-button:hover {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
        }

        /* Clean outline buttons (distinct from prior glass) */
        .apple-glass-button-accent {
          position: relative;
          border-radius: 9999px;
          color: #f9e4ae;
          background: transparent;
          border: 1px solid rgba(249, 228, 174, 0.54);
          box-shadow: none;
          transition: background 160ms ease, color 160ms ease, border-color 160ms ease, transform 120ms ease;
          will-change: transform, background, color, border-color;
        }
        .apple-glass-button-accent::before,
        .apple-glass-button-accent::after { display: none; }

        .apple-glass-button-accent:hover {
          background: #ed6d6d;
          color: #ffffff;
          border-color: #ed6d6d;
          transform: translateY(-1px);
        }

        .apple-glass-button-accent:active {
          background: #d95857;
          color: #ffffff;
          border-color: #d95857;
          transform: translateY(0);
        }
        .apple-glass-button-accent svg { stroke: currentColor; fill: none; }

        /* Focus ring for accessibility */
        .apple-glass-button-accent:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(237, 109, 109, 0.25);
        }

        @keyframes liquidMove {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10%, 5%); }
          100% { transform: translate(0, 0); }
        }

        @keyframes glossyShine {
          0% { left: -100%; }
          50%, 100% { left: 200%; }
        }

        /* Page-level soft intro animations (exclude navbar) */
        @keyframes bgSoftIn {
          0% { opacity: 0; transform: scale(1.015); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes contentSoftIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .anim-bg-soft { animation: bgSoftIn 800ms ease-out both; }
        .anim-content-soft { animation: contentSoftIn 900ms ease-out 200ms both; }

        /* Desktop-only extra darkening overlay for Creative Designer background */
        .cd-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: rgba(0,0,0,0); /* no extra darkening by default */
        }
        /* Mobile/tablet: lift total darkening to ~30% over base 20% */
        @media (max-width: 1023.98px) {
          .cd-bg::before {
            /* Increase small-screen total darkening to ~60%: 0.2 base + 0.5 overlay combined */
            /* Math: 1 - (1-0.2)*(1-0.5) = 0.6 */
            background: rgba(0,0,0,0.5);
          }
        }
        @media (min-width: 1024px) {
          .cd-bg::before {
            /* Effective ~70% darkening with base 0.2 overlay: 1 - (1-0.2)*(1-0.625) ≈ 0.7 */
            background: rgba(0,0,0,0.625);
          }
        }

        /* Soft button entrance */
        @keyframes btnSoftIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.985); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .anim-btn-soft { opacity: 0; animation: btnSoftIn 600ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .anim-btn-soft { animation: none; opacity: 1; }
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
          /* Theme-aware translucent overlay with backdrop blur */
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
          width: 88vw; /* 10% bigger */
          aspect-ratio: 16 / 9; /* landscape */
          max-height: 88vh; /* 10% bigger */
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
          width: clamp(26px, 3.85vw, 32px); /* 30% smaller */
          height: clamp(26px, 3.85vw, 32px); /* 30% smaller */
          border-radius: 9999px;
          box-sizing: border-box;
        }
        /* Hover handled by .glass-button hover rules */

        /* Split panes (no inner margins) */
        .modal-split {
          display: flex;
          width: 100%;
          height: 100%;
        }
        .modal-pane-left,
        .modal-pane-right {
          flex: 1 1 50%;
          height: 100%;
        }
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

        /* Lightbox */
        .lightbox-overlay {
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 120ms ease;
        }
        .lightbox-fade-in { opacity: 1; }
        .lightbox-fade-out { opacity: 0; }

        .lightbox-modal {
          position: relative;
          width: min(70vw, 1200px);
          max-height: 80vh;
          background: rgba(20,20,22,0.2);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          color: #e7f2f8;
          transform: scale(0.98);
          transition: transform 120ms ease;
        }
        .scale-in { transform: scale(1); }
        .scale-out { transform: scale(0.98); }

        .lightbox-close {
          position: fixed; top: calc(20px + env(safe-area-inset-top)); right: calc(10px + env(safe-area-inset-right)); z-index: 10001;
          width: 32px; height: 32px;
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: #ffffff; border: none;
          font-size: 24px; line-height: 1; font-weight: 600;
        }
        .lightbox-close:hover { color: #ed6d6d; background: transparent; }
        .lightbox-close:active { color: #d95857; }

        .lightbox-chevron {
          position: fixed; top: 50%; transform: translateY(-50%); z-index: 10001;
          width: 42px; height: 42px; border-radius: 9999px; border: 2px solid #ffffff;
          background: rgba(0,0,0,0.45); color: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .lightbox-prev { left: calc(20px + env(safe-area-inset-left)); }
        .lightbox-next { right: calc(20px + env(safe-area-inset-right)); }
        .lightbox-chevron:hover { background: #ed6d6d; border-color: #ed6d6d; color: #ffffff; }
        .lightbox-chevron:active { background: #d95857; border-color: #d95857; color: #ffffff; }

        .lightbox-image-wrap { display: flex; align-items: center; justify-content: center; padding: 20px 20px 90px; touch-action: pan-y; }
        .lightbox-image {
          max-width: 100%;
          max-height: calc(80vh - 110px);
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.35);
          will-change: transform, opacity, filter;
        }

        /* Soft swipe/arrow transition (all screen sizes) */
        @keyframes imgEnterL {
          0%   { opacity: 0; transform: translateX(36px) scale(0.985); filter: blur(6px); }
          100% { opacity: 1; transform: translateX(0)     scale(1);     filter: blur(0); }
        }
        @keyframes imgEnterR {
          0%   { opacity: 0; transform: translateX(-36px) scale(0.985); filter: blur(6px); }
          100% { opacity: 1; transform: translateX(0)      scale(1);     filter: blur(0); }
        }
        .img-enter-left  { animation: imgEnterL 900ms cubic-bezier(0.16, 1, 0.3, 1); }
        .img-enter-right { animation: imgEnterR 900ms cubic-bezier(0.16, 1, 0.3, 1); }

        .lightbox-thumbs {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          height: 86px;
          background: rgba(10,10,12,0.35);
          border-top: 1px solid rgba(255,255,255,0.12);
          z-index: 9999;
          padding-bottom: env(safe-area-inset-bottom);
          /* Center the inner strip when it doesn't overflow */
          text-align: center;
        }
        .lightbox-thumbs-scroll {
          height: 100%;
          overflow-x: auto; overflow-y: hidden;
          padding: 8px 10px;
          display: inline-flex; /* allows centering via parent text-align */
          gap: 10px;
          width: max-content; /* shrink to content width */
          margin: 0 auto;      /* center when not overflowing */
          scroll-snap-type: x mandatory;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }
        .thumb { width: 100px; height: 64px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; background: rgba(255,255,255,0.05); flex: 0 0 auto; scroll-snap-align: center; transition: transform 150ms ease, border-color 150ms ease; }
        .thumb:hover { transform: translateY(-1px); }
        .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .thumb-active { border-color: #ed6d6d; }

        @media (max-width: 768px) {
          .lightbox-modal { width: min(92vw, 900px); max-height: 80vh; }
          .lightbox-image-wrap { padding: 12px 12px 90px; }
          .lightbox-chevron { display: none; }
          /* Soft enter animation on mobile swipe */
          /* Keep only chevron visibility changes on mobile */
          @media (prefers-reduced-motion: reduce) {
            .img-enter-left, .img-enter-right { animation-duration: 0ms; }
          }
        }
      `}</style>
    </div>
  )
}

export default CreativeDesigner
