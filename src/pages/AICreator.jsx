import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { attachHireMe } from '../utils/attachHireMe'
import aiBG from '../assets/ai-creator-BG.webp'
import aiHero from '../assets/ai-creator-hero.webp'
// Use the hero images inside images/annie and images/lucia folders
const annieHero = `${import.meta.env.BASE_URL}images/annie/annie-hero.webp`
const luciaHero = `${import.meta.env.BASE_URL}images/lucia/lucia-hero.webp`

function AICreator() {
  const navigate = useNavigate()
  const location = useLocation()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCard, setModalCard] = useState(null)
  const [heroKey, setHeroKey] = useState(0)
  // Lightbox state and controls (match CreativeDesigner)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxClosing, setLightboxClosing] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [enterDir, setEnterDir] = useState(null)
  const lightboxRef = useRef(null)
  const closeBtnRef = useRef(null)
  const thumbsScrollRef = useRef(null)
  const thumbsInnerRef = useRef(null)
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)
  const [lightboxEntering, setLightboxEntering] = useState(false)
  const enterTimerRef = useRef(null)
  const [subject, setSubject] = useState('annie') // 'annie' | 'lucia'
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

  // Lock background scroll when modal or lightbox open
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    if (modalOpen || lightboxOpen) { html.style.overflow = 'hidden'; body.style.overflow = 'hidden' }
    else { html.style.overflow = prevHtmlOverflow || ''; body.style.overflow = prevBodyOverflow || '' }
    return () => { html.style.overflow = prevHtmlOverflow || ''; body.style.overflow = prevBodyOverflow || '' }
  }, [modalOpen, lightboxOpen])

  // Entrance animation flag (match Creative/Branding)
  useEffect(() => {
    if (lightboxOpen) {
      setLightboxEntering(true)
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current)
      enterTimerRef.current = setTimeout(() => setLightboxEntering(false), 1600)
    } else {
      setLightboxEntering(false)
      if (enterTimerRef.current) { clearTimeout(enterTimerRef.current); enterTimerRef.current = null }
    }
    return () => {
      if (enterTimerRef.current) { clearTimeout(enterTimerRef.current); enterTimerRef.current = null }
    }
  }, [lightboxOpen])

  // Keyboard navigation (match Creative/Branding)
  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); nextImage() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prevImage() }
    }
    window.addEventListener('keydown', onKey)
    // move focus to close button for accessibility and key events
    setTimeout(() => closeBtnRef.current?.focus(), 0)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen])

  // Lightbox helpers (same UX as CreativeDesigner)
  // Show all 5 subject images, excluding the hero files
  const gallery = subject === 'annie'
    ? Array.from({ length: 5 }, (_, i) => `${import.meta.env.BASE_URL}images/annie/a${i + 1}.webp`)
    : Array.from({ length: 5 }, (_, i) => `${import.meta.env.BASE_URL}images/lucia/l${i + 1}.webp`)

  const openLightboxFor = (who, startIndex = 0) => {
    setSubject(who)
    setCurrentIndex(startIndex)
    // Ensure animation class is present on first paint
    setLightboxEntering(true)
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
  const handleTouchStart = (e) => {
    const t = e.touches && e.touches[0]
    if (!t) return
    touchStartXRef.current = t.clientX
    touchStartYRef.current = t.clientY
  }
  const handleTouchMove = () => {}
  const handleTouchEnd = (e) => {
    const t = e.changedTouches && e.changedTouches[0]
    if (!t) return
    const dx = t.clientX - (touchStartXRef.current ?? t.clientX)
    const dy = t.clientY - (touchStartYRef.current ?? t.clientY)
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    if (window.innerWidth <= 768 && absDx > 40 && absDx > absDy * 1.2) {
      if (dx < 0) nextImage(); else prevImage()
    }
  }

  // Keep active thumbnail centered when navigating
  useEffect(() => {
    if (!lightboxOpen) return
    const scroller = thumbsScrollRef.current
    if (!scroller) return
    const items = scroller.querySelectorAll('.thumb')
    const target = items && items[currentIndex]
    if (target && typeof target.scrollIntoView === 'function') {
      requestAnimationFrame(() => {
        try { target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) } catch {}
      })
    }
  }, [currentIndex, lightboxOpen])

  return (
    <div className="min-h-screen bg-[#06080a] p-[clamp(6px,1.5vw,12px)] animate-fadeIn relative flex flex-col">
      {/* Fixed, non-scrolling background layer */}
      <div
        className="page-fixed-bg"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${aiBG})`
        }}
      />
      {/* Fixed darkening overlay (does not scroll) */}
      <div className="page-fixed-overlay" aria-hidden />
      {/* Header with logo and buttons (fixed) */}
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        {/* Left SVG */}
        <svg className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left nav-decoration-svg sub-anim-svg-left" viewBox="0 0 65 47" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path fill="#e4c492" d="M63.7782 8.95022C62.9948 6.10936 59.9213 4.33765 57.4957 6.65921C53.217 10.7372 60.8102 14.6625 60.4185 9.40842C61.2622 9.79025 61.6539 10.5997 61.2622 11.9285C60.3883 14.9221 57.8271 14.9374 55.6275 14.3723C53.4731 13.8224 51.6501 12.3256 49.6012 11.4856C44.8253 9.51533 37.5484 12.0507 36.5842 12.402C26.4147 16.4495 19.0174 22.9712 11.0324 22.1312C5.09645 21.505 2.64071 16.2967 2.88176 11.6994C3.10775 7.31596 5.77441 2.88667 11.2283 2.88667C15.3413 2.88667 17.8723 6.59811 17.8723 9.27096C17.8723 12.8297 14.377 14.6625 13.1266 13.074C12.1021 11.7758 13.6991 11.0121 14.2415 9.94299C15.5673 7.37706 12.9157 5.54425 10.5955 6.23155C8.06443 6.99522 7.22075 9.43897 8.00417 11.8827C9.08892 15.2734 11.5145 16.5106 14.4373 16.5106C17.8422 16.5106 20.7198 13.1962 20.7198 9.27096C20.7198 4.88749 16.8177 0 11.2132 0C3.92131 0 0.290421 5.98718 0.0192337 11.562C-0.29715 17.6561 3.28854 24.2389 10.7311 25.0178C14.5428 25.4149 18.2791 24.3611 21.9401 22.7726C20.1172 25.4608 18.8818 28.7751 18.8818 32.8226C18.8818 40.9022 24.0042 46.7519 31.0701 46.7519C36.1774 46.7519 40.3206 43.0557 40.3206 38.5043C40.3206 35.9078 38.9496 33.296 36.8403 31.8451C34.8667 30.4857 32.4411 30.2719 30.0305 31.2494L30.0607 31.3258C27.0023 32.4865 25.6765 37.0686 27.9514 39.0694C29.3676 40.3218 32.1096 40.6425 33.2697 38.8555C33.7518 38.1072 33.8422 37.1144 33.4053 36.3049C32.9081 35.3732 32.2 35.3427 31.4015 35.1594C31.0399 33.8611 33.1793 32.8073 35.2584 34.2277C36.5993 35.1441 37.4882 36.8547 37.4882 38.5043C37.4882 41.0855 35.0475 43.8499 31.0851 43.8499C25.5861 43.8499 21.7443 39.3137 21.7443 32.8073C21.7443 21.4439 33.7066 16.6633 37.6238 15.0901C40.2 14.1432 42.7311 13.6392 45.232 13.9141C48.426 14.2654 51.8309 16.6175 51.8309 20.2678C51.8309 26.1175 46.0456 26.0259 45.6087 24.4985C45.1416 22.8643 46.7386 22.1923 47.6727 21.3064C49.4806 19.5805 48.0494 17.2742 45.8648 17.0298C43.5597 16.7702 41.6765 18.603 41.2998 20.8329C40.8479 23.5669 42.8516 28.2405 47.4467 28.2405C52.4486 28.2405 54.6784 24.2389 54.6784 20.2678C54.6784 18.6794 54.2565 17.2589 53.5484 16.0371C55.3413 16.9229 57.1944 17.4575 59.3337 16.9688C62.7688 16.1745 64.6972 12.3256 63.7782 8.95022Z"/>
        </svg>

        {/* Right SVG */}
        <svg className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right nav-decoration-svg sub-anim-svg-right" viewBox="0 0 66 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path fill="#e4c492" d="M1.22576 8.61765C2.00919 5.88235 5.08263 4.17647 7.50824 6.41176C11.787 10.3382 4.19374 14.1176 4.58546 9.05882C3.74177 9.42647 3.35005 10.2059 3.74177 11.4853C4.61559 14.3676 7.17679 14.3824 9.37642 13.8382C11.5308 13.3088 13.3538 11.8676 15.4028 11.0588C20.1787 9.16176 27.4555 11.6029 28.4197 11.9412C38.5892 15.8382 45.9866 22.1176 53.9715 21.3088C59.9075 20.7059 62.3632 15.6912 62.1222 11.2647C61.8962 7.04412 59.2295 2.77941 53.7757 2.77941C49.6627 2.77941 47.1316 6.35294 47.1316 8.92647C47.1316 12.3529 50.6269 14.1176 51.8774 12.5882C52.9018 11.3382 51.3049 10.6029 50.7625 9.57353C49.4367 7.10294 52.0883 5.33824 54.4084 6C56.9395 6.73529 57.7832 9.08824 56.9998 11.4412C55.915 14.7059 53.4894 15.8971 50.5666 15.8971C47.1617 15.8971 44.2841 12.7059 44.2841 8.92647C44.2841 4.70588 48.1862 0 53.7907 0C61.0826 0 64.7135 5.76471 64.9847 11.1324C65.3011 17 61.7154 23.3382 54.2728 24.0882C50.4612 24.4706 46.7248 23.4559 43.0638 21.9265C44.8868 24.5147 46.1222 27.7059 46.1222 31.6029C46.1222 39.3824 40.9998 45.0147 33.9339 45.0147C28.8265 45.0147 24.6834 41.4559 24.6834 37.0735C24.6834 34.5735 26.0544 32.0588 28.1636 30.6618C30.1372 29.3529 32.5629 29.1471 34.9734 30.0882L34.9433 30.1618C38.0017 31.2794 39.3275 35.6912 37.0525 37.6176C35.6363 38.8235 32.8943 39.1324 31.7342 37.4118C31.2521 36.6912 31.1617 35.7353 31.5986 34.9559C32.0958 34.0588 32.8039 34.0294 33.6024 33.8529C33.964 32.6029 31.8246 31.5882 29.7455 32.9559C28.4047 33.8382 27.5158 35.4853 27.5158 37.0735C27.5158 39.5588 29.9565 42.2206 33.9188 42.2206C39.4179 42.2206 43.2597 37.8529 43.2597 31.5882C43.2597 20.6471 31.2973 16.0441 27.3802 14.5294C24.8039 13.6176 22.2728 13.1324 19.7719 13.3971C16.5779 13.7353 13.173 16 13.173 19.5147C13.173 25.1471 18.9583 25.0588 19.3953 23.5882C19.8623 22.0147 18.2653 21.3676 17.3312 20.5147C15.5233 18.8529 16.9546 16.6324 19.1391 16.3971C21.4442 16.1471 23.3275 17.9118 23.7041 20.0588C24.1561 22.6912 22.1523 27.1912 17.5572 27.1912C12.5553 27.1912 10.3256 23.3382 10.3256 19.5147C10.3256 17.9853 10.7474 16.6176 11.4555 15.4412C9.66267 16.2941 7.80956 16.8088 5.6702 16.3382C2.23518 15.5735 0.306738 11.8676 1.22576 8.61765Z"/>
        </svg>

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
        className="page-content relative ai-bg subpad flex-1 flex flex-col items-center justify-center p-0 mt-0 -mx-[clamp(12px,3vw,24px)] -mb-[clamp(12px,3vw,24px)] px-[clamp(18px,4.5vw,36px)] md:px-0 anim-bg-soft"
      >
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-20">
          {/* Left side image (Annie) */}
          <div className="hidden lg:flex flex-col items-center justify-center lg:my-24">
            <img decoding="async" fetchpriority="high"
              src={annieHero}
              alt="Annie"
              className="block cursor-pointer"
              onClick={() => openLightboxFor('annie', 0)}
              style={{
                minWidth: 'clamp(320px, 26vw, 640px)',
                height: 'clamp(220px, 32vh, 520px)',
                objectFit: 'contain',
                opacity: 1,
                filter: 'none',
                position: 'relative',
                zIndex: 1
              }}
            />
            <div
              className="ai-badge font-['Jost',sans-serif] font-medium capitalize text-[clamp(11px,1vw,16px)]"
              role="button"
              tabIndex={0}
              onClick={() => openLightboxFor('annie', 0)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightboxFor('annie', 0) } }}
              style={{ minWidth: 'clamp(280px, 24vw, 480px)', height: 'clamp(64px,6.4vw,96px)', marginTop: 'clamp(12px,1.5vw,16px)', cursor: 'pointer' }}
            >
              <span className="ai-badge__label">Annie Radley</span>
            </div>
          </div>

          {/* Centered hero image */}
          <img
            id="ai-hero"
            key={heroKey}
            src={aiHero}
            alt="AI Creator"
            className="w-full lg:w-auto h-auto object-contain mt-[clamp(48px,8vw,96px)] lg:mt-0 anim-content-soft mx-auto lg:mx-0 max-h-[78vh] lg:max-h-[68vh]"
            decoding="async"
            fetchpriority="high"
          />

          {/* Right side image (Lucia) */}
          <div className="hidden lg:flex flex-col items-center justify-center lg:my-24">
            <img decoding="async"
              src={luciaHero}
              alt="Lucia"
              className="block cursor-pointer"
              onClick={() => openLightboxFor('lucia', 0)}
              style={{
                minWidth: 'clamp(320px, 26vw, 640px)',
                height: 'clamp(220px, 32vh, 520px)',
                objectFit: 'contain',
                opacity: 1,
                filter: 'none',
                position: 'relative',
                zIndex: 1
              }}
            />
            <div
              className="ai-badge font-['Jost',sans-serif] font-medium capitalize text-[clamp(11px,1vw,16px)]"
              role="button"
              tabIndex={0}
              onClick={() => openLightboxFor('lucia', 0)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightboxFor('lucia', 0) } }}
              style={{ minWidth: 'clamp(280px, 24vw, 480px)', height: 'clamp(64px,6.4vw,96px)', marginTop: 'clamp(12px,1.5vw,16px)', cursor: 'pointer' }}
            >
              <span className="ai-badge__label">Lucia Pazmiño</span>
            </div>
          </div>
        </div>

        {/* Desktop-only Case Study button under hero */}
        <div className="hidden lg:flex w-full justify-center mt-10 mb-6">
          <button
            onClick={() => navigate('/ai-creator/case-study')}
            className="ai-case-btn px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-full text-sm sm:text-base text-white font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2"
          >
            <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Case Study
          </button>
        </div>

          {/* Mobile stacked images under hero */}
          <div className="lg:hidden w-full px-0 mt-[clamp(36px,7vw,64px)] mb-[clamp(80px,12vh,140px)] text-center">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 gap-[clamp(14px,3vw,24px)]">
            <div className="ai-mobile-pair">
              <img loading="lazy" decoding="async"
                src={annieHero}
                alt="Annie"
                className="w-full object-contain mx-auto cursor-pointer"
                onClick={() => openLightboxFor('annie', 0)}
                style={{ height: 'clamp(216px, 48vw, 432px)', opacity: 1, filter: 'none', position: 'relative', zIndex: 1 }}
              />
              <div className="ai-badge w-full font-['Jost',sans-serif] font-medium capitalize text-[clamp(13px,3.5vw,16px)]" role="button" tabIndex={0} onClick={() => openLightboxFor('annie', 0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightboxFor('annie', 0) } }} style={{ height: 'clamp(77px,11.2vw,112px)', marginTop: 'clamp(16px,4vw,24px)', cursor: 'pointer' }}>
                <span className="ai-badge__label">Annie Radley</span>
              </div>
            </div>
            <div className="ai-mobile-pair">
              <img loading="lazy" decoding="async"
                src={luciaHero}
                alt="Lucia"
                className="w-full object-contain mx-auto cursor-pointer"
                onClick={() => openLightboxFor('lucia', 0)}
                style={{ height: 'clamp(216px, 48vw, 432px)', opacity: 1, filter: 'none', position: 'relative', zIndex: 1 }}
              />
              <div className="ai-badge w-full font-['Jost',sans-serif] font-medium capitalize text-[clamp(13px,3.5vw,16px)]" role="button" tabIndex={0} onClick={() => openLightboxFor('lucia', 0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightboxFor('lucia', 0) } }} style={{ height: 'clamp(77px,11.2vw,112px)', marginTop: 'clamp(16px,4vw,24px)', cursor: 'pointer' }}>
                <span className="ai-badge__label">Lucia Pazmiño</span>
              </div>
            </div>
          </div>
          {/* Mobile-only Case Study button (gold), placed beneath images */}
          <div className="mt-5">
            <button
              onClick={() => navigate('/ai-creator/case-study')}
              className="apple-glass-button px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-full text-sm sm:text-base font-['Jost',sans-serif] font-medium transition-all duration-300 inline-flex items-center gap-1.5 sm:gap-2"
            >
              <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              Case Study
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hire Me button (mobile only, exact as homepage) */}
      <div className="lg:hidden page-content mobile-sticky-cta flex justify-center items-center px-4 mt-[40px] mb-5">
        <button className="apple-glass-button-accent px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base text-white font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2" style={{ minWidth: 'min(65vw, 520px)' }}>
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

      {/* Image Lightbox (same style as CreativeDesigner) */}
      {(lightboxOpen || lightboxClosing) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          className={`fixed inset-0 z-[9998] lightbox-overlay ${lightboxClosing ? 'lightbox-fade-out' : 'lightbox-fade-in'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(${aiBG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Controls positioned at page sides (overlay-level) */}
          <button ref={closeBtnRef} className={`lightbox-close ${lightboxEntering ? 'controls-pop-in' : ''}`} aria-label="Close" onClick={handleCloseLightbox}>×</button>
          <button className="lightbox-chevron lightbox-prev" aria-label="Previous" onClick={prevImage}>
            <span className={`chevron-content ${lightboxEntering ? 'controls-pop-in' : ''}`}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </span>
          </button>
          <button className="lightbox-chevron lightbox-next" aria-label="Next" onClick={nextImage}>
            <span className={`chevron-content ${lightboxEntering ? 'controls-pop-in' : ''}`}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
          </button>
          {/* Modal content */}
          <div
            ref={lightboxRef}
            className={`lightbox-modal ${lightboxEntering ? 'modal-pop-in' : (lightboxClosing ? 'scale-out' : 'scale-in')}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-image-wrap" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <div
                key={`row-${currentIndex}`}
                className={`lightbox-image-row subject-${subject} ${typeof window !== 'undefined' && window.innerWidth > 768 && enterDir ? (enterDir === 'left' ? 'block-enter-left' : 'block-enter-right') : ''} ${typeof window !== 'undefined' && window.innerWidth >= 769 && subject === 'annie' && currentIndex === 4 ? 'row-free' : ''} ${typeof window !== 'undefined' && window.innerWidth >= 1024 && subject === 'annie' && currentIndex === 4 ? 'row-annie-last' : ''} ${typeof window !== 'undefined' && window.innerWidth <= 768 && subject === 'lucia' && (currentIndex === 0 || currentIndex === 1) ? 'lucia-center' : ''}`}
                onAnimationEnd={() => { try { if (typeof window !== 'undefined' && window.innerWidth > 768) setEnterDir(null) } catch {} }}
              >
                <img
                  key={currentIndex}
                  src={gallery[currentIndex]}
                  alt={`${subject} ${currentIndex + 1}`}
                  decoding="async"
                  fetchpriority="high"
                  loading="eager"
                  className={`lightbox-image ${typeof window !== 'undefined' && window.innerWidth <= 768 && enterDir ? (enterDir === 'left' ? 'img-enter-left' : 'img-enter-right') : ''} has-side`}
                  onAnimationEnd={() => setEnterDir(null)}
                />
                <div
                  className={`lightbox-rect right ${typeof window !== 'undefined' && window.innerWidth <= 768 ? (enterDir === 'left' ? 'img-enter-left' : (enterDir === 'right' ? 'img-enter-right' : '')) : ''} ${subject === 'annie' && currentIndex === 0 ? 'annie-first' : ''}`}
                  aria-hidden="false"
                >
                  <div className="lightbox-rect-content">
                    <div className="lightbox-rect-inner">
                      {/* Header (Annie only on first image; Lucia always) */}
                      {currentIndex === 0 && (
                        <>
                          <div className="lightbox-rect-title">{subject === 'annie' ? 'Annie Radley' : 'Lucia Pazmiño'}</div>
                          <div className="lightbox-rect-sub">
                            {subject === 'lucia' ? (
                              <>
                                <img src="/flags/ar.svg" alt="Argentina flag" className="flag-icon" />
                                <span>Argentinian influencer</span>
                              </>
                            ) : (
                              <>
                                <img src="/flags/uk.svg" alt="UK flag" className="flag-icon" />
                                <span>British influencer</span>
                              </>
                            )}
                          </div>
                        </>
                      )}

                      {/* Descriptions for Annie & Lucia (each sentence as its own paragraph), styled like the first image */}
                      {(subject === 'annie' || subject === 'lucia') && (() => {
                        const textMap = subject === 'lucia'
                          ? {
                              0: [
                                "Lucia Pazmiño blends warm Latina confidence with a natural elegance that makes her stand out instantly.",
                                "She’s expressive, magnetic, and carries herself with that effortless mix of attitude and softness that defines her personality.",
                              ],
                              1: [
                                "Lucia’s everyday charm comes from how real she is.",
                                "She switches between Spanish and English without thinking, laughs at her own messiness, and brings a playful, spontaneous energy that feels genuinely relatable and human.",
                              ],
                              2: [
                                "Passion drives everything about Lucia.",
                                "She feels intensely, expresses herself openly, and has that confident, emotional spark that makes her a modern muse.",
                                "Her personality is bold, warm, and unmistakably alive.",
                              ],
                              3: [
                                "Lucia balances sweetness with a fiery edge.",
                                "She’s flirty, fun, and full of personality, always carrying that blend of charm and boldness that gives her a vibrant, unforgettable presence.",
                              ],
                              4: [
                                "Beneath her confidence, Lucia has a reflective, emotional depth.",
                                "She values connection, late-night thoughts, and honest moments, giving her a grounded softness that adds real dimension to who she is.",
                              ],
                            }
                          : {
                              0: [
                                "Annie Radley is built around a mix of calm confidence and modern British elegance.",
                                "She carries herself with the energy of someone who knows her direction in life, blending discipline with a soft, relatable warmth.",
                                "At 25, she embodies that balance between ambition and ease that defines her London lifestyle.",
                              ],
                              1: [
                                "Annie’s personality leans into a friendly, best-friend charm — expressive, playful, and grounded.",
                                "She loves everyday moments, has a subtle sense of humour, and speaks with that warm British tone that feels instantly familiar.",
                                "She’s stylish, but never tries too hard, which is a big part of her appeal.",
                              ],
                              2: [
                                "Fashion and self-expression are central to who Annie is.",
                                "She gravitates toward minimal, clean aesthetics and lets her personality shine through simple choices.",
                                "There’s an authenticity in her style that mirrors her character: effortless, composed, and quietly confident.",
                              ],
                              3: [
                                "Fitness and wellness are a core part of Annie’s identity.",
                                "She’s the disciplined, early-morning type — focused, driven, and committed to personal growth.",
                                "Her energy reflects someone who pushes herself but stays balanced, always pairing strength with softness.",
                              ],
                              4: [
                                "Annie also has a reflective side that defines her emotional depth.",
                                "She values calm spaces, warm conversations, and moments of quiet clarity.",
                                "Her personality blends ambition with introspection, giving her that rare mix of strength, sensitivity, and elegance.",
                              ],
                            }
                        const arr = textMap[currentIndex]
                        if (!arr || !arr.length) return null
                        return (
                          <div className="lightbox-rect-desc-block">
                            {arr.map((t, i) => (
                              <p key={i} className="lightbox-rect-desc">{t}</p>
                            ))}
                          </div>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Thumbnails pinned to screen bottom */}
          <div className={`lightbox-thumbs ${lightboxEntering ? 'thumbs-pop-in' : ''}`} role="listbox" aria-label="Thumbnails" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-thumbs-scroll" ref={thumbsScrollRef}>
              <div className="thumbs-inner" ref={thumbsInnerRef}>
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
          /* Shift background slightly left on smaller screens */
          .page-fixed-bg { background-position: calc(50% - 50px) center; }
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
          filter: brightness(0) saturate(100%) invert(84%) sepia(18%) saturate(589%) hue-rotate(349deg) brightness(99%) contrast(91%);
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

        /* SVG icons gold by default */
        .glass-button svg {
          stroke: #e4c492;
          fill: none;
        }

        .glass-button:hover,
        .glass-button:active {
          background: #eac28a; /* AI Creator hover/click */
          border-color: #eac28a;
          box-shadow: none;
          color: #10171d; /* black icons/text for AI */
        }

        /* SVG icons turn black on hover/click */
        .glass-button:hover svg,
        .glass-button:active svg {
          stroke: #10171d;
          fill: none;
        }

        /* Cards match navbar fill */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
        }

        /* Mobile gold button style (match other pages) */
        .apple-glass-button,
        .apple-glass-button-accent { position: relative; overflow: hidden; }
        .apple-glass-button {
          background: #d8ac65;
          border: none;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
          color: #10171d; /* black text on gold */
        }
        .apple-glass-button::before { display: none; }
        .apple-glass-button:hover {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
        }

        /* AI theme Case Studu button - glow-only (moving shine), no solid fill by default */
        .ai-case-btn {
          position: relative;
          overflow: hidden;
          background: transparent; /* no solid fill */
          border: 1.5px solid rgba(234, 194, 138, 0.85); /* AI theme edge */
          box-shadow: none; /* no outer glow */
          color: #ffffff;
        }
        /* Remove inner glow; keep only moving shine */
        .ai-case-btn::before { content: none; }
        .ai-case-btn::after {
          content: '';
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: glossyShine 3s ease-in-out infinite; animation-delay: 0.5s;
        }
        .ai-case-btn:hover,
        .ai-case-btn:active {
          /* Gold fill with black text on interaction (match mobile gold) */
          background: #d8ac65;
          border-color: #d8ac65;
          color: #10171d;
        }
        .ai-case-btn:hover svg,
        .ai-case-btn:active svg { stroke: #10171d; fill: none; }
        .theme-card {
          background: #06080a;
          border: none;
        }

        /* Small screens: increase card height */
        @media (max-width: 639.98px) {
          .glass-card,
          .theme-card {
            min-height: clamp(260px, 55vh, 640px) !important;
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

        /* Side card entrance animations (match slow style) */
        @keyframes cardInLeft {
          from { transform: translateX(-120vw); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes cardInRight {
          from { transform: translateX(120vw); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .anim-card-in-left { animation: cardInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .anim-card-in-right { animation: cardInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }

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

        /* Page-level soft intro animations (exclude navbar) */
        @keyframes bgSoftIn {
          0% { opacity: 0; transform: scale(1.015); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes contentSoftIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.992); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .anim-bg-soft { animation: bgSoftIn 800ms ease-out both; }
        .anim-content-soft { animation: contentSoftIn 900ms ease-out 200ms both; }
        /* Reduce top spacing on mobile by decreasing margin (no transform clashes) */
        @media (max-width: 1023.98px) { #ai-hero { margin-top: calc(clamp(48px, 8vw, 96px) - 55px) !important; transform: none; } }
        /* Ensure exactly 20px gap on small-height mobiles */
        @media (max-width: 1023.98px) and (max-height: 700px) { #ai-hero { margin-top: 20px !important; } }

        /* Match Creative: extra darkening overlay via pseudo */
        .ai-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: rgba(0,0,0,0);
        }
        .ai-bg::before { display: none; }
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
      
      /* AI Creator element badge under hero images */
      .ai-badge {
        position: relative;
      }
      .ai-badge::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url('/ai-element.webp');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
      .ai-badge__label {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #ffffff;
        text-align: center;
        pointer-events: none;
        padding: 0 12px;
      }
      /* Extra spacing between the two mobile pairs */
      @media (max-width: 1023.98px) {
        .ai-mobile-pair { margin-bottom: clamp(36px, 12vw, 72px); }
      }
      /* Hover/click label color (match Creative/Branding) */
      .ai-badge:hover .ai-badge__label { color: #eabe76; }
      .ai-badge:active .ai-badge__label { color: #eabe76; }
        @media (max-width: 639.98px) {
          /* Add 2x horizontal padding on smaller screens */
          .subpad { padding-left: calc(clamp(18px, 4.5vw, 36px) * 2); padding-right: calc(clamp(18px, 4.5vw, 36px) * 2); }
        }
      `}</style>
      {/* Lightbox styles copied to match CreativeDesigner */}
      <style>{`
        .lightbox-overlay { opacity: 1; transition: opacity 140ms ease; }
        .lightbox-fade-in { opacity: 1; }
        .lightbox-fade-out { opacity: 0; }
        .lightbox-modal {
          position: relative;
          margin: 0 auto;
          top: 10vh;
          width: auto;
          max-width: min(95vw, 1200px);
          max-height: 80vh;
          background: rgba(20,20,22,0.2);
          border-radius: 12px; /* allow outer corners to show, including rect right side */
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          color: #e7f2f8;
          transform: scale(0.98);
          transform-origin: center center;
          transition: transform 120ms ease;
          opacity: 1; /* show immediately so glass blur is visible without delay */
        }
        .scale-in { transform: scale(1); opacity: 1; }
        .scale-out { transform: scale(0.98); }
        @keyframes modalPopIn { 0% { transform: translateY(12px) scale(0.94); } 100% { transform: translateY(0) scale(1); } }
        .modal-pop-in { animation: modalPopIn 600ms cubic-bezier(0.2, 0.85, 0.2, 1) both; }
        @keyframes controlsPopIn { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        .controls-pop-in { animation: controlsPopIn 1200ms ease-out both 220ms; }
        .thumbs-pop-in { animation: controlsPopIn 1300ms ease-out both 260ms; }
        .chevron-content { display: inline-flex; align-items: center; justify-content: center; }
        .lightbox-close {
          position: fixed; top: calc(20px + env(safe-area-inset-top)); right: calc(10px + env(safe-area-inset-right)); z-index: 10001;
          width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: #ffffff; border: none; font-size: 24px; line-height: 1; font-weight: 600; border-radius: 8px;
        }
        /* Match AI Creator navbar button color */
        .lightbox-close:hover { background: #eac28a; color: #10171d; }
        .lightbox-close:active { background: #eac28a; color: #10171d; }
        .lightbox-chevron {
          position: fixed; top: 50%; transform: translateY(-50%); z-index: 10001;
          width: 42px; height: 42px; border-radius: 9999px; border: 2px solid #ffffff;
          background: rgba(0,0,0,0.45); color: #fff; display: inline-flex; align-items: center; justify-content: center;
          transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .lightbox-prev { left: calc(20px + env(safe-area-inset-left)); }
        .lightbox-next { right: calc(20px + env(safe-area-inset-right)); }
        /* Match AI Creator navbar button color */
        .lightbox-chevron:hover { background: #eac28a; border-color: #eac28a; color: #10171d; }
        .lightbox-chevron:active { background: #eac28a; border-color: #eac28a; color: #10171d; }
        .lightbox-image-wrap { display: flex; align-items: center; justify-content: center; padding: 20px 20px 90px; touch-action: none; }
        .lightbox-image-row {
          display: inline-flex; align-items: stretch; gap: 0;
          max-height: calc(80vh - 110px);
          border-radius: 0; overflow: visible;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        }
        /* Make the image size to full available height and keep aspect, width auto.
           Its box matches the bitmap edge so it touches the side panel with no gap. */
        .lightbox-image { 
          flex: 0 0 auto;
          height: calc(80vh - 110px);
          width: auto;
          max-height: calc(80vh - 110px);
          object-fit: contain;
          border-radius: 0; box-shadow: none; display: block;
        }
        /* Round only outer corners when side panel is present */
        .lightbox-image.has-side { border-top-left-radius: 12px !important; border-bottom-left-radius: 12px !important; }
        /* Off-white side panel for Annie first image (not overlay) */
        .lightbox-rect {
          flex: 0 0 35vw; /* keep panel width consistent while allowing centering */
          align-self: stretch; /* match image height exactly */
          /* Glass style to match navbar */
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
          color: #ffffff;
          display: flex; flex-direction: column; align-items: flex-start; justify-content: center; /* vertical center, left aligned */
          box-sizing: border-box;
          /* Use first-image horizontal padding for all images */
          padding: clamp(24px, 4.5vw, 48px) clamp(28px, 8vw, 100px);
          overflow: hidden; /* ensure rounded corners render crisply */
          will-change: transform, backdrop-filter; /* prevent initial flicker */
          backface-visibility: hidden;
        }
        /* Annie first image: responsive padding (~5x max) and doubled paragraph spacing */
        .lightbox-rect.annie-first { padding: clamp(28px, 8vw, 100px); }
        .lightbox-rect.annie-first .lightbox-rect-desc { margin-bottom: 24px; }
        .lightbox-rect.right { border-top-right-radius: 12px !important; border-bottom-right-radius: 12px !important; }
        .lightbox-rect-content {
          position: relative;
          text-align: left;
          font-family: 'Jost', sans-serif;
          width: 100%;
          display: flex; flex-direction: column; align-items: stretch; justify-content: flex-start;
          word-break: break-word; overflow-wrap: break-word; hyphens: auto;
        }
        .lightbox-rect-inner { width: 100%; max-width: 52ch; margin: 0 auto; }
        .lightbox-rect-title, .lightbox-rect-sub, .lightbox-rect-desc { text-align: left; margin-left: 0; margin-right: 0; }
        /* Match heading size used across other pages and set to gold */
        .lightbox-rect-title { font-weight: 700; font-size: clamp(20px, 2.5vw, 26px); line-height: 1.2; color: #e4c492; }
        .lightbox-rect-sub {
          margin-top: 6px;
          margin-bottom: clamp(4px, 0.8vw, 10px);
          font-size: clamp(12px, 1.6vw, 14px);
          opacity: 0.92;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 0.02em;
          color: #ffffff;
        }
        .flag-icon { width: clamp(14px, 1.6vw, 18px); height: auto; display: inline-block; border-radius: 2px; }
        .lightbox-rect-desc-block { margin-top: clamp(4px, 0.8vw, 10px); width: 100%; }
        /* Body text matches case pages: white body, consistent size, thin; 5% smaller */
        .lightbox-rect-desc { font-size: calc(0.95 * clamp(15px, 2vw, 20px)); line-height: 1.7; color: #ffffff; margin: 0 0 20px; font-weight: 200; }
        @keyframes imgEnterL { 0% { opacity: 0; transform: translateX(36px) scale(0.985); filter: blur(6px); } 100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); } }
        @keyframes imgEnterR { 0% { opacity: 0; transform: translateX(-36px) scale(0.985); filter: blur(6px); } 100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); } }
        .img-enter-left  { animation: imgEnterL 900ms cubic-bezier(0.16, 1, 0.3, 1); }
        .img-enter-right { animation: imgEnterR 900ms cubic-bezier(0.16, 1, 0.3, 1); }

        /* Desktop seamless pair animation (no opacity to avoid glass flicker) */
        @keyframes blockEnterL { 0% { transform: translateX(36px) scale(0.985); } 100% { transform: translateX(0) scale(1); } }
        @keyframes blockEnterR { 0% { transform: translateX(-36px) scale(0.985); } 100% { transform: translateX(0) scale(1); } }
        .block-enter-left  { animation: blockEnterL 900ms cubic-bezier(0.16, 1, 0.3, 1); }
        .block-enter-right { animation: blockEnterR 900ms cubic-bezier(0.16, 1, 0.3, 1); }

        /* Mobile: stack image + panel in one scrollable container */
        @media (max-width: 768px) {
          .lightbox-image-row {
            flex-direction: column;
            width: min(92vw, 1000px);
            height: calc(80vh - 110px); /* leave room for bottom thumbs */
            overflow-y: auto; overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-y;
            overscroll-behavior: contain;
            border-radius: 12px; /* keep outer corners */
          }
          .lightbox-image-wrap { padding: 12px; }
          /* Keep mobile heights consistent with desktop viewport-based height */
          /* Make image content width match rectangle inner width (20px padding on rect) */
          .lightbox-image {
            box-sizing: border-box;
            width: calc(100% - (2 * clamp(28px, 8vw, 100px)));
            margin: 0 clamp(28px, 8vw, 100px) 20px;
            aspect-ratio: 1 / 1;            /* make image square */
            height: auto;                    /* let aspect-ratio compute height */
            max-height: none;                /* avoid shrinking square */
            object-fit: cover;               /* fill square nicely */
            object-position: top center;     /* crop from the top, not center */
            border-radius: 12px !important;
          }
          /* Center Lucia image 1 and 2 horizontally on mobile */
          .lucia-center .lightbox-image { margin-left: auto !important; margin-right: auto !important; }
          /* Let rectangle height grow with its text on small screens */
          .lightbox-rect { box-sizing: border-box; width: 100%; flex: 0 0 auto; height: auto; overflow: visible; border-radius: 12px !important; }
          /* Add scroll only on small screens for long text; show a visible thin scrollbar */
          .lightbox-rect-content {
            max-height: 100%;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding-right: 16px;           /* space between text and scrollbar */
            scrollbar-gutter: stable;      /* where supported, reserve gutter */
            scrollbar-width: thin;         /* Firefox */
            scrollbar-color: rgba(0,0,0,0.2) transparent; /* 20% opacity */
          }
          .lightbox-rect-content::-webkit-scrollbar { width: 2px; }
          .lightbox-rect-content::-webkit-scrollbar-track { background: transparent; }
          .lightbox-rect-content::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 8px; }
          /* Lucia mobile: no overrides; matches Annie */
          /* Mirror for Annie to keep behavior consistent if needed */
          .subject-annie .lightbox-image {
            border-top-left-radius: 12px !important;
            border-top-right-radius: 12px !important;
            border-bottom-left-radius: 12px !important;
            border-bottom-right-radius: 12px !important;
          }
          .subject-annie .lightbox-rect {
            border-top-left-radius: 12px !important;
            border-top-right-radius: 12px !important;
            border-bottom-left-radius: 12px !important;
            border-bottom-right-radius: 12px !important;
          }
          .lightbox-rect.right { border-radius: 12px !important; }
        }
        
        /* Desktop: enforce seamless outer rounding on the pair (container handles corners) */
        @media (min-width: 769px) {
          .lightbox-image-row { border-radius: 12px; overflow: hidden; }
          .lightbox-image.has-side { border-radius: 0 !important; }
          .lightbox-rect.right { border-radius: 0 !important; }

          /* Annie last image: make image and rectangle same width and stretch to same height */
          @media (min-width: 1024px) {
            .row-annie-last { align-items: stretch !important; }
            .row-annie-last .lightbox-image { flex: 0 0 50% !important; width: 50% !important; height: auto !important; max-height: none !important; }
            .row-annie-last .lightbox-rect { flex: 0 0 50% !important; height: auto !important; }
          }

          /* Allow last image (index 4) to have its own natural height */
          .row-free { max-height: none !important; }
          .row-free .lightbox-image { height: auto !important; max-height: none !important; }

          /* Last image wider layout */
          
          
          /* Rectangle text: visible thin scrollbar on desktop when overflow */
          .lightbox-rect-content {
            max-height: 100%;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding-right: 16px;           /* match mobile spacing */
            scrollbar-gutter: stable;      /* where supported */
            scrollbar-width: thin;         /* Firefox */
            scrollbar-color: rgba(0,0,0,0.2) transparent;
          }
          .lightbox-rect-content::-webkit-scrollbar { width: 2px; }
          .lightbox-rect-content::-webkit-scrollbar-track { background: transparent; }
          .lightbox-rect-content::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 8px; }
          /* No custom indicator on desktop to avoid double bars */
        }
        .lightbox-thumbs { position: fixed; left: 0; right: 0; bottom: 0; height: 86px; background: rgba(10,10,12,0.35); border-top: none; z-index: 9999; padding-bottom: env(safe-area-inset-bottom); }
        .lightbox-thumbs-scroll { height: 100%; overflow-x: auto; overflow-y: hidden; padding: 8px 10px; -webkit-overflow-scrolling: touch; touch-action: pan-x; text-align: center; white-space: nowrap; }
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

export default AICreator
