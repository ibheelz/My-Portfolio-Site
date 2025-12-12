import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { attachHireMe } from '../utils/attachHireMe'
const csBG = `${import.meta.env.BASE_URL}brand%20designer-cs-BG.webp`

// Lumea case study images
const lumeaImages = {
  0: '/lumea-1.webp',
  1: '/lumea-2.webp',
  2: '/lumea-6.webp',
  3: '/lumea-9.webp',
  4: '/lumea-8.webp'
}

// All lumea images for lightbox
const lumeaLightboxImages = ['/lumea-1.webp', '/lumea-2.webp', '/lumea-3.webp', '/lumea-4.webp', '/lumea-6.webp', '/lumea-7.webp', '/lumea-8.webp', '/lumea-9.webp']

// Branding case study content for 5 slides
const brandingContent = {
  0: {
    heading: 'The Problem',
    body: 'Luméa had multiple products but no real brand.\nThe packaging looked weak and confusing to customers.',
    mobileSummary: 'Luméa had multiple products with no cohesive brand.'
  },
  1: {
    heading: 'Development Difficulties',
    body: 'I had to organize five different product lines.\nThe ingredients were hard to explain on packaging.',
    mobileSummary: 'Organizing five different product lines with complex ingredients.'
  },
  2: {
    heading: 'The Solution',
    body: 'I designed one clear visual style for all.\nThe soft colors and fonts made it premium.',
    mobileSummary: 'I created unified visual style with soft colors.'
  },
  3: {
    heading: 'Results',
    body: 'Customers recognized the brand much better afterward.\nThe store shelves and online looked much stronger.',
    mobileSummary: 'Brand recognition improved significantly across all retail channels.'
  },
  4: {
    heading: 'Key Takeaway',
    body: 'Good design turned scattered products into one brand.\nConsistency made customers trust Luméa much more.',
    mobileSummary: 'Consistency transformed scattered products into a trusted brand.'
  }
}

const TOTAL_BRANDING_FRAMES = 5

function BrandingCaseStudy() {
  const navigate = useNavigate()
  const [brandingFrame, setBrandingFrame] = useState(0)
  const [enterDir, setEnterDir] = useState('')
  const brandingLastYRef = useRef(0)
  const brandingLastStepTimeRef = useRef(0)
  const wheelGestureActiveRef = useRef(false)
  const wheelGestureTimerRef = useRef(null)
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)

  // Lumea lightbox state
  const [lumeaLightboxOpen, setLumeaLightboxOpen] = useState(false)
  const [lumeaLightboxClosing, setLumeaLightboxClosing] = useState(false)
  const [lumeaCurrentIndex, setLumeaCurrentIndex] = useState(0)
  const [lumeaEnterDir, setLumeaEnterDir] = useState(null)
  const lumeaLightboxRef = useRef(null)
  const lumeaCloseBtnRef = useRef(null)
  const lumeaThumbsScrollRef = useRef(null)
  const lumeaTouchStartXRef = useRef(null)
  const lumeaTouchStartYRef = useRef(null)
  const lumeaPreloadedRef = useRef(new Set())
  const [lumeaLightboxEntering, setLumeaLightboxEntering] = useState(false)
  const lumeaEnterTimerRef = useRef(null)

  useEffect(() => {
    const cleanup = attachHireMe(document)
    return cleanup
  }, [])

  // Lumea lightbox entering animation
  useEffect(() => {
    if (lumeaLightboxOpen && !lumeaLightboxEntering) {
      lumeaEnterTimerRef.current = setTimeout(() => {
        setLumeaLightboxEntering(true)
      }, 50)
    }
    return () => {
      if (lumeaEnterTimerRef.current) clearTimeout(lumeaEnterTimerRef.current)
    }
  }, [lumeaLightboxOpen, lumeaLightboxEntering])

  // Lock background scroll when lightbox open
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    if (lumeaLightboxOpen) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
    }
    else {
      html.style.overflow = prevHtmlOverflow || ''
      body.style.overflow = prevBodyOverflow || ''
    }
    return () => {
      html.style.overflow = prevHtmlOverflow || ''
      body.style.overflow = prevBodyOverflow || ''
    }
  }, [lumeaLightboxOpen])

  // Keyboard navigation
  useEffect(() => {
    const lockMs = 60
    const onKey = (e) => {
      const k = e.key
      const now = Date.now()
      if (now - brandingLastStepTimeRef.current < lockMs) return
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","PageUp","PageDown"].includes(k)) {
        if (typeof e.preventDefault === 'function') e.preventDefault()
      }

      // Lightbox navigation takes priority
      if (lumeaLightboxOpen) {
        if (k === 'ArrowRight') { nextLumeaImage(); brandingLastStepTimeRef.current = now; return }
        if (k === 'ArrowLeft')  { prevLumeaImage(); brandingLastStepTimeRef.current = now; return }
        if (k === 'Escape') { closeLumeaLightbox(); brandingLastStepTimeRef.current = now; return }
        return
      }

      // Slide navigation
      if (k === 'ArrowRight') { setBrandingFrame((i) => (i + 1) % TOTAL_BRANDING_FRAMES); setEnterDir('left'); brandingLastStepTimeRef.current = now; return }
      if (k === 'ArrowLeft')  { setBrandingFrame((i) => (i - 1 + TOTAL_BRANDING_FRAMES) % TOTAL_BRANDING_FRAMES); setEnterDir('right'); brandingLastStepTimeRef.current = now; return }
      if (k === 'ArrowDown' || k === 'PageDown') { setBrandingFrame((i) => (i + 1) % TOTAL_BRANDING_FRAMES); setEnterDir('left'); brandingLastStepTimeRef.current = now; return }
      if (k === 'ArrowUp'   || k === 'PageUp')   { setBrandingFrame((i) => (i - 1 + TOTAL_BRANDING_FRAMES) % TOTAL_BRANDING_FRAMES); setEnterDir('right'); brandingLastStepTimeRef.current = now; return }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lumeaLightboxOpen])

  // Navigation functions
  const nextFrame = () => {
    setEnterDir('left')
    setBrandingFrame((f) => (f + 1) % TOTAL_BRANDING_FRAMES)
  }
  const prevFrame = () => {
    setEnterDir('right')
    setBrandingFrame((f) => (f - 1 + TOTAL_BRANDING_FRAMES) % TOTAL_BRANDING_FRAMES)
  }

  // Wheel navigation
  const handleWheel = (e) => {
    if (wheelGestureActiveRef.current) return
    const now = Date.now()
    const deltaY = e.deltaY
    if (Math.abs(deltaY) < 40) return
    if (now - brandingLastStepTimeRef.current < 140) return
    wheelGestureActiveRef.current = true
    wheelGestureTimerRef.current = setTimeout(() => { wheelGestureActiveRef.current = false }, 140)
    brandingLastStepTimeRef.current = now
    if (deltaY > 0) nextFrame()
    else prevFrame()
  }

  // Touch navigation
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

    if (window.innerWidth <= 768) {
      // Horizontal swipe (left/right)
      if (absDx > 40 && absDx > absDy * 1.2) {
        if (dx < 0) nextFrame(); else prevFrame()
        // Reset so it doesn't fire repeatedly during the same gesture
        touchStartXRef.current = t.clientX
        touchStartYRef.current = t.clientY
      }
      // Vertical swipe (up/down)
      else if (absDy > 40 && absDy > absDx * 1.2) {
        if (dy < 0) nextFrame(); else prevFrame()
        // Reset so it doesn't fire repeatedly during the same gesture
        touchStartXRef.current = t.clientX
        touchStartYRef.current = t.clientY
      }
    }
  }
  const handleTouchEnd = () => {
    touchStartXRef.current = null
    touchStartYRef.current = null
  }

  // Lumea lightbox handlers
  const closeLumeaLightbox = () => {
    setLumeaLightboxClosing(true)
    setTimeout(() => {
      setLumeaLightboxOpen(false)
      setLumeaLightboxClosing(false)
    }, 140)
  }

  const prevLumeaImage = () => {
    setLumeaEnterDir('right')
    setLumeaCurrentIndex((i) => (i - 1 + lumeaLightboxImages.length) % lumeaLightboxImages.length)
  }

  const nextLumeaImage = () => {
    setLumeaEnterDir('left')
    setLumeaCurrentIndex((i) => (i + 1) % lumeaLightboxImages.length)
  }

  const handleLumeaTouchStart = (e) => {
    lumeaTouchStartXRef.current = e.touches?.[0]?.clientX
    lumeaTouchStartYRef.current = e.touches?.[0]?.clientY
  }

  const handleLumeaTouchMove = (e) => {
    if (!lumeaTouchStartXRef.current || !lumeaTouchStartYRef.current) return
    const dx = e.touches?.[0]?.clientX - lumeaTouchStartXRef.current
    const dy = e.touches?.[0]?.clientY - lumeaTouchStartYRef.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      e.preventDefault()
      if (dx > 0) prevLumeaImage()
      else nextLumeaImage()
      lumeaTouchStartXRef.current = null
      lumeaTouchStartYRef.current = null
    }
  }

  const handleLumeaTouchEnd = () => {
    lumeaTouchStartXRef.current = null
    lumeaTouchStartYRef.current = null
  }

  return (
    <div className="min-h-screen bg-[#06080a] p-[clamp(12px,3vw,24px)] lg:p-[clamp(6px,1.5vw,12px)] animate-fadeIn relative flex flex-col branding-page-container branding-mobile-fixed" style={{ ['--nav-h']: 'clamp(72px, 12vh, 120px)' }}>
      {/* Fixed background */}
      <div className="page-fixed-bg" aria-hidden style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${csBG})` }} />
      <div className="page-fixed-overlay" aria-hidden />

      {/* Navbar */}
      {!lumeaLightboxOpen && (
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        {/* Inline SVGs for exact #e4c492 */}
        <svg className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left sub-anim-svg-left" viewBox="0 0 65 47" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path fill="#e4c492" d="M63.7782 8.95022C62.9948 6.10936 59.9213 4.33765 57.4957 6.65921C53.217 10.7372 60.8102 14.6625 60.4185 9.40842C61.2622 9.79025 61.6539 10.5997 61.2622 11.9285C60.3883 14.9221 57.8271 14.9374 55.6275 14.3723C53.4731 13.8224 51.6501 12.3256 49.6012 11.4856C44.8253 9.51533 37.5484 12.0507 36.5842 12.402C26.4147 16.4495 19.0174 22.9712 11.0324 22.1312C5.09645 21.505 2.64071 16.2967 2.88176 11.6994C3.10775 7.31596 5.77441 2.88667 11.2283 2.88667C15.3413 2.88667 17.8723 6.59811 17.8723 9.27096C17.8723 12.8297 14.377 14.6625 13.1266 13.074C12.1021 11.7758 13.6991 11.0121 14.2415 9.94299C15.5673 7.37706 12.9157 5.54425 10.5955 6.23155C8.06443 6.99522 7.22075 9.43897 8.00417 11.8827C9.08892 15.2734 11.5145 16.5106 14.4373 16.5106C17.8422 16.5106 20.7198 13.1962 20.7198 9.27096C20.7198 4.88749 16.8177 0 11.2132 0C3.92131 0 0.290421 5.98718 0.0192337 11.562C-0.29715 17.6561 3.28854 24.2389 10.7311 25.0178C14.5428 25.4149 18.2791 24.3611 21.9401 22.7726C20.1172 25.4608 18.8818 28.7751 18.8818 32.8226C18.8818 40.9022 24.0042 46.7519 31.0701 46.7519C36.1774 46.7519 40.3206 43.0557 40.3206 38.5043C40.3206 35.9078 38.9496 33.296 36.8403 31.8451C34.8667 30.4857 32.4411 30.2719 30.0305 31.2494L30.0607 31.3258C27.0023 32.4865 25.6765 37.0686 27.9514 39.0694C29.3676 40.3218 32.1096 40.6425 33.2697 38.8555C33.7518 38.1072 33.8422 37.1144 33.4053 36.3049C32.9081 35.3732 32.2 35.3427 31.4015 35.1594C31.0399 33.8611 33.1793 32.8073 35.2584 34.2277C36.5993 35.1441 37.4882 36.8547 37.4882 38.5043C37.4882 41.0855 35.0475 43.8499 31.0851 43.8499C25.5861 43.8499 21.7443 39.3137 21.7443 32.8073C21.7443 21.4439 33.7066 16.6633 37.6238 15.0901C40.2 14.1432 42.7311 13.6392 45.232 13.9141C48.426 14.2654 51.8309 16.6175 51.8309 20.2678C51.8309 26.1175 46.0456 26.0259 45.6087 24.4985C45.1416 22.8643 46.7386 22.1923 47.6727 21.3064C49.4806 19.5805 48.0494 17.2742 45.8648 17.0298C43.5597 16.7702 41.6765 18.603 41.2998 20.8329C40.8479 23.5669 42.8516 28.2405 47.4467 28.2405C52.4486 28.2405 54.6784 24.2389 54.6784 20.2678C54.6784 18.6794 54.2565 17.2589 53.5484 16.0371C55.3413 16.9229 57.1944 17.4575 59.3337 16.9688C62.7688 16.1745 64.6972 12.3256 63.7782 8.95022Z"/>
        </svg>
        <svg className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right sub-anim-svg-right" viewBox="0 0 66 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path fill="#e4c492" d="M1.22576 8.61765C2.00919 5.88235 5.08263 4.17647 7.50824 6.41176C11.787 10.3382 4.19374 14.1176 4.58546 9.05882C3.74177 9.42647 3.35005 10.2059 3.74177 11.4853C4.61559 14.3676 7.17679 14.3824 9.37642 13.8382C11.5308 13.3088 13.3538 11.8676 15.4028 11.0588C20.1787 9.16176 27.4555 11.6029 28.4197 11.9412C38.5892 15.8382 45.9866 22.1176 53.9715 21.3088C59.9075 20.7059 62.3632 15.6912 62.1222 11.2647C61.8962 7.04412 59.2295 2.77941 53.7757 2.77941C49.6627 2.77941 47.1316 6.35294 47.1316 8.92647C47.1316 12.3529 50.6269 14.1176 51.8774 12.5882C52.9018 11.3382 51.3049 10.6029 50.7625 9.57353C49.4367 7.10294 52.0883 5.33824 54.4084 6C56.9395 6.73529 57.7832 9.08824 56.9998 11.4412C55.915 14.7059 53.4894 15.8971 50.5666 15.8971C47.1617 15.8971 44.2841 12.7059 44.2841 8.92647C44.2841 4.70588 48.1862 0 53.7907 0C61.0826 0 64.7135 5.76471 64.9847 11.1324C65.3011 17 61.7154 23.3382 54.2728 24.0882C50.4612 24.4706 46.7248 23.4559 43.0638 21.9265C44.8868 24.5147 46.1222 27.7059 46.1222 31.6029C46.1222 39.3824 40.9998 45.0147 33.9339 45.0147C28.8265 45.0147 24.6834 41.4559 24.6834 37.0735C24.6834 34.5735 26.0544 32.0588 28.1636 30.6618C30.1372 29.3529 32.5629 29.1471 34.9734 30.0882L34.9433 30.1618C38.0017 31.2794 39.3275 35.6912 37.0525 37.6176C35.6363 38.8235 32.8943 39.1324 31.7342 37.4118C31.2521 36.6912 31.1617 35.7353 31.5986 34.9559C32.0958 34.0588 32.8039 34.0294 33.6024 33.8529C33.964 32.6029 31.8246 31.5882 29.7455 32.9559C28.4047 33.8382 27.5158 35.4853 27.5158 37.0735C27.5158 39.5588 29.9565 42.2206 33.9188 42.2206C39.4179 42.2206 43.2597 37.8529 43.2597 31.5882C43.2597 20.6471 31.2973 16.0441 27.3802 14.5294C24.8039 13.6176 22.2728 13.1324 19.7719 13.3971C16.5779 13.7353 13.173 16 13.173 19.5147C13.173 25.1471 18.9583 25.0588 19.3953 23.5882C19.8623 22.0147 18.2653 21.3676 17.3312 20.5147C15.5233 18.8529 16.9546 16.6324 19.1391 16.3971C21.4442 16.1471 23.3275 17.9118 23.7041 20.0588C24.1561 22.6912 22.1523 27.1912 17.5572 27.1912C12.5553 27.1912 10.3256 23.3382 10.3256 19.5147C10.3256 17.9853 10.7474 16.6176 11.4555 15.4412C9.66267 16.2941 7.80956 16.8088 5.6702 16.3382C2.23518 15.5735 0.306738 11.8676 1.22576 8.61765Z"/>
        </svg>

        {/* Back to subpage */}
        <div className="absolute left-[clamp(16px,3vw,40px)] w-auto">
          <button
            onClick={() => navigate('/branding', { replace: false, state: { animateHero: true } })}
            aria-label="Back to Branding"
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] whitespace-nowrap"
          >
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="hidden sm:inline">Back to Branding</span>
          </button>
        </div>

        {/* Logo center */}
        <img decoding="async" src="/ibheelz-logo.webp" alt="ibheelz" className="h-[clamp(3rem,6vw,4.25rem)] w-auto cursor-pointer sub-anim-logo-slow" style={{ maxHeight: '68px' }} onClick={() => navigate('/')} />

        {/* View Resume on right */}
        <div className="absolute right-[clamp(16px,3vw,40px)]">
          <button onClick={() => window.open('/Resume.pdf', '_blank')} className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] cursor-pointer">
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
      )}

      {!lumeaLightboxOpen && <div className="header-spacer" />}

      {/* Content: Slide carousel */}
      <section className="page-content relative subpad flex-1 px-0 anim-bg-soft">
        {/* Desktop/tablet: 70/30 split with dots in the gap */}
        <div
          className="branding-desktop-container hidden md:flex w-full h-[calc(100dvh-var(--nav-h)-15px)] flex-col relative miela-hero-in mt-[15px]"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image container: 70% (at top) */}
          <div className="order-1 h-[70%] px-[clamp(12px,3vw,24px)] flex items-center justify-center relative">
            {lumeaImages[brandingFrame] && (
              <div
                className="branding-desk-img-wrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block rounded-[clamp(10px,1vw,18px)] overflow-hidden cursor-pointer"
                onClick={() => {
                  setLumeaLightboxOpen(true)
                  setLumeaCurrentIndex(lumeaLightboxImages.indexOf(lumeaImages[brandingFrame]))
                }}
                style={{
                  opacity: 1,
                  transition: 'opacity 1600ms ease',
                  willChange: 'opacity',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  pointerEvents: 'auto'
                }}
              >
                <img
                  key={`lumea-${brandingFrame}`}
                  src={lumeaImages[brandingFrame]}
                  alt={`Lumea slide ${brandingFrame + 1}`}
                  decoding="async"
                  className="branding-desk-img max-h-[70vh] object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            )}
          </div>
          {/* Dots 25px below image (at 70% + 25px) */}
          <div
            className="branding-desktop-dots absolute left-0 right-0 flex justify-center"
            style={{ top: 'calc(70% + 25px)', zIndex: 30 }}
          >
            <div className="mielo-gap-dots flex justify-center gap-2">
              {Array.from({ length: TOTAL_BRANDING_FRAMES }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setEnterDir(idx > brandingFrame ? 'left' : 'right')
                    setBrandingFrame(idx)
                  }}
                  className={`dot ${brandingFrame === idx ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Text container: 30% (at bottom) */}
          <div className="order-2 h-[30%] px-[clamp(12px,3vw,24px)] flex items-center justify-center overflow-hidden">
            <div className="branding-desktop-text text-center font-['Jost',sans-serif] w-full h-full flex flex-col items-center justify-center overflow-hidden max-h-full px-4">
              {brandingContent[brandingFrame] && (
                <>
                  <h3 className="text-[clamp(21.6px,2.7vw,27.9px)] font-bold text-[#e4c492] mb-3 capitalize">
                    {brandingContent[brandingFrame].heading}
                  </h3>
                  <p className="text-[clamp(16.2px,2.16vw,21.6px)] text-white/80 leading-relaxed whitespace-pre-line">
                    {brandingContent[brandingFrame].body}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: text (50%), dots, then image (50%) */}
        <div
          className="branding-mobile-container md:hidden w-full h-[calc(100dvh-var(--nav-h)-15px)] flex flex-col relative miela-hero-in mt-[15px]"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image container: 50% (shown first, at top) */}
          <div className="order-1 h-[50%] px-[clamp(12px,3vw,24px)] flex items-center justify-center relative">
            {lumeaImages[brandingFrame] && (
              <div className="w-full h-full absolute flex items-center justify-center">
                <div
                  className="rounded-[clamp(10px,1vw,18px)] overflow-hidden inline-block cursor-pointer"
                  onClick={() => {
                    setLumeaLightboxOpen(true)
                    setLumeaCurrentIndex(lumeaLightboxImages.indexOf(lumeaImages[brandingFrame]))
                  }}
                  style={{
                    opacity: 1,
                    transition: 'opacity 1600ms ease',
                    willChange: 'opacity',
                    border: '1.5px solid rgba(255,255,255,0.1)',
                    pointerEvents: 'auto'
                  }}
                >
                  <img
                    key={`lumea-mobile-${brandingFrame}`}
                    src={lumeaImages[brandingFrame]}
                    alt={`Lumea slide ${brandingFrame + 1}`}
                    decoding="async"
                    className="w-auto object-contain"
                    style={{ maxHeight: '50vh', height: 'auto' }}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Dots sit 25px below image block */}
          <div className="absolute left-0 right-0 flex justify-center pointer-events-none" style={{ top: 'calc(50% + 25px)', transform: 'translateY(-50%)', zIndex: 20 }}>
            <div className="mielo-gap-dots flex justify-center gap-2">
              {Array.from({ length: TOTAL_BRANDING_FRAMES }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setEnterDir(idx > brandingFrame ? 'left' : 'right')
                    setBrandingFrame(idx)
                  }}
                  className={`dot ${brandingFrame === idx ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Text container: 50% (shown second, at bottom) */}
          <div className="order-2 h-[50%] px-[clamp(12px,3vw,24px)] flex items-center justify-center overflow-hidden">
            <div className="text-center font-['Jost',sans-serif] w-full h-full flex flex-col items-center justify-center mobile-paras overflow-hidden max-h-full px-4">
              {brandingContent[brandingFrame] && (
                <>
                  <h3 className="text-[clamp(24px,5vw,30px)] font-bold text-[#e4c492] mb-3 capitalize">
                    {brandingContent[brandingFrame].heading}
                  </h3>
                  <p className="text-[clamp(18px,4vw,24px)] text-white/80">
                    {brandingContent[brandingFrame].mobileSummary}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Lumea lightbox */}
        {(lumeaLightboxOpen || lumeaLightboxClosing) && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Lumea images gallery"
            className={`fixed inset-0 z-[9998] lightbox-overlay ${lumeaLightboxClosing ? 'lightbox-fade-out' : 'lightbox-fade-in'}`}
            onClick={closeLumeaLightbox}
          >
            <button ref={lumeaCloseBtnRef} className={`lightbox-close ${lumeaLightboxEntering ? 'controls-pop-in' : ''}`} aria-label="Close" onClick={(e) => { e.stopPropagation(); closeLumeaLightbox() }}>×</button>
            <button className="lightbox-chevron lightbox-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); prevLumeaImage() }}>
              <span className={`chevron-content ${lumeaLightboxEntering ? 'controls-pop-in' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </span>
            </button>
            <button className="lightbox-chevron lightbox-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); nextLumeaImage() }}>
              <span className={`chevron-content ${lumeaLightboxEntering ? 'controls-pop-in' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </button>
            <div className={`lightbox-modal ${lumeaLightboxEntering ? 'modal-pop-in' : (lumeaLightboxClosing ? 'scale-out' : 'scale-in')}`} ref={lumeaLightboxRef} onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-image-wrap" onTouchStart={handleLumeaTouchStart} onTouchMove={handleLumeaTouchMove} onTouchEnd={handleLumeaTouchEnd}>
                <img
                  key={lumeaCurrentIndex}
                  src={lumeaLightboxImages[lumeaCurrentIndex]}
                  alt={`Lumea image ${lumeaCurrentIndex + 1}`}
                  className={`lightbox-image ${lumeaEnterDir === 'left' ? 'img-enter-left' : lumeaEnterDir === 'right' ? 'img-enter-right' : ''}`}
                  decoding="async"
                />
              </div>
            </div>
            <div className={`lightbox-thumbs ${lumeaLightboxEntering ? 'thumbs-pop-in' : ''}`} role="listbox" aria-label="Thumbnails" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-thumbs-scroll" ref={lumeaThumbsScrollRef}>
                <div className="thumbs-inner">
                  {lumeaLightboxImages.map((src, i) => (
                    <button key={i} className={`thumb ${i === lumeaCurrentIndex ? 'thumb-active' : ''}`} aria-label={`Go to image ${i + 1}`} onClick={() => setLumeaCurrentIndex(i)}>
                      <img src={src} alt={``} decoding="async" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <style jsx>{`
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 300ms ease;
          border: none;
          padding: 0;
        }
        .dot.active {
          width: 24px;
          background: #e4c492;
          border-radius: 4px;
        }
        .dot:hover:not(.active) {
          background: rgba(255, 255, 255, 0.5);
        }
        .page-fixed-bg { position: fixed; left: 0; right: 0; bottom: 0; top: clamp(72px, 12vh, 120px); background-size: cover; background-position: center; z-index: 0; }
        .page-fixed-overlay { position: fixed; left: 0; right: 0; bottom: 0; top: clamp(72px, 12vh, 120px); background: rgba(0,0,0,0.35); z-index: 1; }
        .liquid-glass-header {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: clamp(20px, 4vw, 30px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: clamp(12px, 3vw, 24px);
          right: clamp(12px, 3vw, 24px);
          z-index: 10;
        }
        .header-spacer { height: clamp(72px, 12vh, 120px); }
        .page-content { position: relative; z-index: 2; }
        /* Navbar decorative SVGs (match subpage behavior) */
        img.svg-gold {
          filter: brightness(0) saturate(100%) invert(84%) sepia(18%) saturate(589%) hue-rotate(349deg) brightness(99%) contrast(91%);
        }
        svg.svg-gold { color: #e4c492; }
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
          .svg-left { left: calc(50% - 120px); }
          .svg-right { right: calc(50% - 120px); }
        }
        @media (min-width: 1024px) {
          .svg-left { left: calc(50% - 160px); }
          .svg-right { right: calc(50% - 160px); }
        }
        @media (min-width: 1280px) {
          .svg-left { left: calc(50% - 200px); }
          .svg-right { right: calc(50% - 200px); }
        }
        /* Place after others to pull arrows closer on all >=640px (match Creative subpage) */
        @media (min-width: 640px) {
          .svg-left { left: calc(50% - 90px); }
          .svg-right { right: calc(50% - 90px); }
        }
        .glass-button { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16); color: #e7f2f8; }
        /* SVG icons gold by default */
        .glass-button svg { stroke: #e4c492; fill: none; }
        /* Branding theme hover */
        .glass-button:hover { background: #e4c492; color: #10171d; border-color: transparent; }
        /* SVG icons turn dark on hover */
        .glass-button:hover svg { stroke: #10171d; fill: none; }
        .glass-card { background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        @keyframes contentSoftIn { 0% { opacity: 0; transform: translateY(12px) } 100% { opacity: 1; transform: translateY(0) } }
        .anim-content-soft { animation: contentSoftIn 900ms ease-out both; }
        @keyframes bgSoftIn { 0% { opacity: 0; transform: scale(1.015) } 100% { opacity: 1; transform: scale(1) } }
        .anim-bg-soft { animation: bgSoftIn 800ms ease-out both; }
        @keyframes subLogoSlowIn { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .sub-anim-logo-slow { animation: subLogoSlowIn 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes subSvgInLeft { from { transform: translateX(-14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes subSvgInRight { from { transform: translateX(14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .sub-anim-svg-left { animation: subSvgInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) 200ms both; }
        .sub-anim-svg-right { animation: subSvgInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) 260ms both; }
        @keyframes slideDownNav { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideDownNav { animation: slideDownNav 1.5s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        /* Slide animations */
        @keyframes slideEnterL { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideEnterR { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        .slide-enter-left { animation: slideEnterL 600ms cubic-bezier(0.22, 1, 0.36, 1); }
        .slide-enter-right { animation: slideEnterR 600ms cubic-bezier(0.22, 1, 0.36, 1); }
        /* Mobile navbar SVGs (small screens only) - use gold when SVG is alone in button */
        @media (max-width: 767px) {
          .liquid-glass-header .glass-button svg { stroke: #e4c492; }
          .liquid-glass-header .glass-button:hover svg,
          .liquid-glass-header .glass-button:active svg { stroke: #e4c492; }
        }
        /* Image styling */
        .branding-desk-img { object-fit: contain !important; }
        .branding-desk-img-wrap { box-sizing: border-box !important; }
        /* Ensure desktop/tablet layout (image top, text bottom) on md+ screens */
        @media (min-width: 768px) {
          .branding-desktop-container { display: flex !important; }
          .branding-mobile-container { display: none !important; }
        }
        /* Prevent page scroll/bounce on mobile */
        @media (max-width: 767px) {
          .branding-mobile-no-scroll { height: 100vh !important; overflow: hidden !important; overscroll-behavior: none !important; touch-action: none !important; -webkit-touch-callout: none; -webkit-user-select: none; }
        }
        /* Lock entire page on mobile */
        @media (max-width: 767px) {
          .branding-mobile-fixed { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; width: 100% !important; height: 100vh !important; overflow: hidden !important; }
        }
        .miela-hero-in { animation: bgSoftIn 800ms ease-out both; }

        /* Lightbox styles */
        .lightbox-overlay { background-image: linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(${csBG}); background-size: cover; background-position: center; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 120ms ease; overflow: hidden; overscroll-behavior: contain; }
        .lightbox-fade-in { opacity: 1; }
        .lightbox-fade-out { opacity: 0; }
        .lightbox-modal { position: relative; width: min(70vw, 1200px); max-height: 80vh; background: rgba(20,20,22,0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.35); color: #e7f2f8; transform: scale(0.98); transform-origin: center center; transition: transform 120ms ease; opacity: 0; }
        .scale-in { transform: scale(1); opacity: 1; }
        .scale-out { transform: scale(0.98); }
        @keyframes modalPopIn { 0% { opacity: 0; transform: translateY(12px) scale(0.94);} 100% { opacity: 1; transform: translateY(0) scale(1);} }
        .modal-pop-in { animation: modalPopIn 900ms cubic-bezier(0.2, 0.85, 0.2, 1) both; }
        @keyframes controlsPopIn { 0% { opacity: 0; transform: translateY(12px);} 100% { opacity: 1; transform: translateY(0);} }
        .controls-pop-in { animation: controlsPopIn 1200ms ease-out both 220ms; }
        .thumbs-pop-in { animation: controlsPopIn 1300ms ease-out both 260ms; }
        .chevron-content { display: inline-flex; align-items: center; justify-content: center; }
        .lightbox-close { position: fixed; top: calc(20px + env(safe-area-inset-top)); right: calc(10px + env(safe-area-inset-right)); z-index: 10001; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; background: transparent; color: #ffffff; border: none; font-size: 24px; line-height: 1; font-weight: 600; border-radius: 8px; }
        .lightbox-close:hover { background: #aa90db; color: #ffffff; }
        .lightbox-close:active { background: #aa90db; color: #ffffff; }
        .lightbox-chevron { position: fixed; top: 50%; transform: translateY(-50%); z-index: 10001; width: 42px; height: 42px; border-radius: 9999px; border: 2px solid #ffffff; background: rgba(0,0,0,0.45); color: #fff; display: inline-flex; align-items: center; justify-content: center; transition: background 160ms ease, border-color 160ms ease, color 160ms ease; }
        .lightbox-prev { left: calc(20px + env(safe-area-inset-left)); }
        .lightbox-next { right: calc(20px + env(safe-area-inset-right)); }
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
        .thumbs-inner { display: inline-flex; white-space: nowrap; justify-content: center; gap: 8px; }
        .thumb { width: 100px; height: 64px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; background: rgba(255,255,255,0.05); display: inline-block; vertical-align: middle; transition: transform 150ms ease, border-color 150ms ease; }
        .thumb:hover { transform: translateY(-1px); }
        .thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
        .thumb-active { border-color: #aa90db; }
        @media (max-width: 768px) { .lightbox-modal { width: min(92vw, 900px); max-height: 80vh; } .lightbox-image-wrap { padding: 12px 12px 90px; } .lightbox-chevron { display: none; } }
      `}</style>
    </div>
  )
}

export default BrandingCaseStudy
