import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const csBG = `${import.meta.env.BASE_URL}creative-designer-cs-BG.png`
const mielaImage = `${import.meta.env.BASE_URL}miela-1.png`
const mielaImage2 = `${import.meta.env.BASE_URL}miela-2.png`
const mielaImage3 = `${import.meta.env.BASE_URL}miela-3.png`
const mielaImage4 = `${import.meta.env.BASE_URL}miela-4.png`
const mielaImage5 = `${import.meta.env.BASE_URL}miela-5.png`
const mielaImage6 = `${import.meta.env.BASE_URL}miela-6.png`
const mielaImageMobile = `${import.meta.env.BASE_URL}miela-1-mobile.png`
const mielaImageMobile2 = `${import.meta.env.BASE_URL}miela-2-mobile.png`
const mielaImageMobile3 = `${import.meta.env.BASE_URL}miela-3-mobile.png`
const mielaImageMobile4 = `${import.meta.env.BASE_URL}miela-4-mobile.png`
const mielaImageMobile5 = `${import.meta.env.BASE_URL}miela-5-mobile.png`
const mielaImageMobile6 = `${import.meta.env.BASE_URL}miela-6-mobile.png`
const mielaImageMobile7 = `${import.meta.env.BASE_URL}miela-7-mobile.png`
const mielaImageMobile8 = `${import.meta.env.BASE_URL}miela-8-mobile.png`
const mielaImageMobile9 = `${import.meta.env.BASE_URL}miela-9-mobile.png`
const mielaImageMobile10 = `${import.meta.env.BASE_URL}miela-10-mobile.png`
const bImgs = [1,2,3,4,5,6].map(n => `${import.meta.env.BASE_URL}b${n}.png`)
const rojoBanners = [1,2].map(n => `${import.meta.env.BASE_URL}rojo-banner-${n}.png`)
const rojoBannerSeq = Array.from({ length: 10 }, (_, i) => rojoBanners[i % rojoBanners.length])
const martellImage1 = `${import.meta.env.BASE_URL}martell-1.png`
const martelDayImage = `${import.meta.env.BASE_URL}martel-day.webp`
const martellImage2 = `${import.meta.env.BASE_URL}martell-2.webp`
const martellImage3 = `${import.meta.env.BASE_URL}martell-3.webp`
const martellImage1Mobile = `${import.meta.env.BASE_URL}martell-1-mobile.png?v=4`
const martellImage2Mobile = `${import.meta.env.BASE_URL}martell-2-mobile.png`
const martellVideo1 = `${import.meta.env.BASE_URL}martell-video-1.mp4`
const martellVideo2 = `${import.meta.env.BASE_URL}martell-video-2.mp4`

// Logo sources (black + white variants) from images/, with public/ fallbacks on error
const logos = {
  martell: {
    black: `${import.meta.env.BASE_URL}logos/martell-white.png`,
    white: `${import.meta.env.BASE_URL}logos/martell-white.png`,
    fallbackBlack: '/logos/martell-white.png',
    fallbackWhite: '/logos/martell-white.png',
  },
  todoalrojo: {
    black: `${import.meta.env.BASE_URL}logos/tojoalrojo-logo.webp`,
    white: `${import.meta.env.BASE_URL}logos/tojoalrojo-logo.webp`,
    fallbackBlack: '/logos/tojoalrojo-logo.webp',
    fallbackWhite: '/logos/tojoalrojo-logo.webp',
  },
  miela: {
    black: `${import.meta.env.BASE_URL}logos/miela-white.png`,
    white: `${import.meta.env.BASE_URL}logos/miela-white.png`,
    fallbackBlack: '/logos/miela-white.png',
    fallbackWhite: '/logos/miela-white.png',
  },
  mielo: {
    black: `${import.meta.env.BASE_URL}logos/mielo-white.png`,
    white: `${import.meta.env.BASE_URL}logos/mielo-white.png`,
    fallbackBlack: '/logos/mielo-white.png',
    fallbackWhite: '/logos/mielo-white.png',
  },
}

function CreativeDesignerCaseDetail() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const entry = logos[slug] || logos.martell
  const order = ['martell', 'todoalrojo', 'miela', 'mielo']
  const titles = { martell: 'Martell', todoalrojo: 'Todoalrojo', miela: 'Miela', mielo: 'Mielo' }
  const idx = Math.max(0, order.indexOf(slug || 'martell'))
  const nextSlug = order[(idx + 1) % order.length]

  // Scroll-direction swap for Miela hero (md+ screens only) + mobile 3-frame stepper
  const [showSecond, setShowSecond] = useState(false)
  const [desktopFrame, setDesktopFrame] = useState(0) // 0..5 maps to images 1..6 on md+
  const [mobileFrame, setMobileFrame] = useState(0) // mobile png order: 1 -> 2 -> ... -> 10
  const [enterDirDesktop, setEnterDirDesktop] = useState('') // for horizontal-only animation: '' | 'left' | 'right'
  const [enterDirMobile, setEnterDirMobile] = useState('')   // for horizontal-only animation: '' | 'left' | 'right'
  const lastYRef = useRef(0)
  const lastStepTimeRef = useRef(0)
  const lastInputRef = useRef({ type: '', t: 0 })
  const wheelGestureActiveRef = useRef(false)
  const wheelGestureTimerRef = useRef(null)
  const touchStartYRef = useRef(0)
  const touchStartXRef = useRef(0)
  const pointerStartXRef = useRef(0)
  const pointerActiveRef = useRef(false)
  const [martellPlaying, setMartellPlaying] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxClosing, setLightboxClosing] = useState(false)
  const [lightboxEntering, setLightboxEntering] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [enterDir, setEnterDir] = useState(null)
  const lightboxRef = useRef(null)
  const closeBtnRef = useRef(null)
  const thumbsScrollRef = useRef(null)
  const thumbsInnerRef = useRef(null)

  const martellGallery = [
    { type: 'video', src: martellVideo1 },
    { type: 'image', src: martelDayImage, thumb: martelDayImage },
    { type: 'image', src: martellImage2, thumb: martellImage2 },
    { type: 'image', src: martellImage3, thumb: martellImage3 },
    { type: 'video', src: martellVideo2 },
  ]

  // Lock scroll when lightbox/modal open and hide navbar
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    if (lightboxOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      html.classList.add('lightbox-open')
      body.classList.add('lightbox-open')
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      html.classList.remove('lightbox-open')
      body.classList.remove('lightbox-open')
    }
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      html.classList.remove('lightbox-open')
      body.classList.remove('lightbox-open')
    }
  }, [lightboxOpen])

  // Keyboard: Escape/Arrows inside lightbox
  useEffect(() => {
    if (!lightboxOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') handleCloseLightbox()
      else if (e.key === 'ArrowRight') nextImage()
      else if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, currentIndex])

  // Entrance animation toggles
  const enterTimerRef = useRef(null)
  useEffect(() => {
    if (lightboxOpen) {
      setLightboxEntering(true)
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current)
      enterTimerRef.current = setTimeout(() => setLightboxEntering(false), 1600)
    } else {
      setLightboxEntering(false)
    }
    return () => { if (enterTimerRef.current) clearTimeout(enterTimerRef.current) }
  }, [lightboxOpen])

  const openLightboxAt = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }
  const handleCloseLightbox = () => {
    setLightboxClosing(true)
    setTimeout(() => { setLightboxOpen(false); setLightboxClosing(false) }, 140)
  }
  const nextImage = () => {
    setEnterDir('left')
    setCurrentIndex((i) => (i + 1) % martellGallery.length)
  }
  const prevImage = () => {
    setEnterDir('right')
    setCurrentIndex((i) => (i - 1 + martellGallery.length) % martellGallery.length)
  }

  // Simple touch swipe for lightbox
  const touchStartXRef2 = useRef(0)
  const onTouchStart = (e) => { if (!lightboxOpen) return; if (e.touches && e.touches[0]) touchStartXRef2.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (!lightboxOpen) return
    const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : touchStartXRef2.current
    const dx = endX - touchStartXRef2.current
    if (Math.abs(dx) > 28) { if (dx < 0) nextImage(); else prevImage() }
  }

  // Scroll-reveal for Martell sections (gentle, slow)
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const els = Array.from(document.querySelectorAll('.martell-scroll'))
    if (els.length === 0) return undefined
    // Fallback: if IntersectionObserver not supported, reveal immediately
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in-view'))
      return undefined
    }
    // use IntersectionObserver when available
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const d = el.getAttribute('data-delay') || '0'
            if (d) el.style.transitionDelay = `${parseInt(d, 10)}ms`
            el.classList.add('in-view')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Preload key assets to avoid flashes across browsers
  useEffect(() => {
    const imgs = [martellImage1, martelDayImage, martellImage2, martellImage3]
    const pool = []
    imgs.forEach((src) => {
      if (!src) return
      const im = new Image()
      im.src = src
      pool.push(im)
    })
    return () => { pool.splice(0, pool.length) }
  }, [])

  
  useEffect(() => {
    if (slug !== 'miela') return undefined
    if (typeof window === 'undefined') return undefined
    lastYRef.current = window.scrollY || 0
    const stepByDir = (dir) => {
      if (dir === 0) return
      if (window.innerWidth >= 768) {
        setDesktopFrame((i) => Math.min(5, Math.max(0, i + (dir > 0 ? 1 : -1))))
      }
    }
    // Desktop frame step lock (minimal, still one step per gesture)
    const lockMs = 60
    const onScroll = () => {
      const now = Date.now()
      // Do not step frames on generic scroll; wheel controls desktop frame changes
      lastYRef.current = window.scrollY || 0
      lastInputRef.current = { type: 'scroll', t: now }
    }
    const onWheel = (e) => {
      const now = Date.now()
      const dy = e.deltaY || 0
      if (Math.abs(dy) < 1) return
      // prevent page scroll; treat a small wheel burst as one step
      if (e && typeof e.preventDefault === 'function') e.preventDefault()
      if (!wheelGestureActiveRef.current && now - lastStepTimeRef.current >= lockMs) {
        const dir = dy > 0 ? 1 : -1
        // set horizontal enter direction for smoother nav on desktop
        setEnterDirDesktop(dir > 0 ? 'right' : 'left')
        stepByDir(dir)
        lastStepTimeRef.current = now
        lastInputRef.current = { type: 'wheel', t: now }
        wheelGestureActiveRef.current = true
      }
      if (wheelGestureTimerRef.current) clearTimeout(wheelGestureTimerRef.current)
      wheelGestureTimerRef.current = setTimeout(() => {
        wheelGestureActiveRef.current = false
        wheelGestureTimerRef.current = null
      }, 60)
    }
    const onTouchStart = (e) => {
      if (window.innerWidth >= 768) return
      if (!e.touches || e.touches.length === 0) return
      touchStartYRef.current = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      if (window.innerWidth >= 768) return
      const now = Date.now()
      if (!e.changedTouches || e.changedTouches.length === 0) return
      const endY = e.changedTouches[0].clientY
      const dy = endY - touchStartYRef.current
      const threshold = 40
      if (Math.abs(dy) < threshold) { lastInputRef.current = { type: 'touch', t: now }; return }
      if (now - lastStepTimeRef.current < 200) { lastInputRef.current = { type: 'touch', t: now }; return }
      // Swipe up (dy < 0) -> forward; swipe down (dy > 0) -> back
      stepByDir(dy < 0 ? 1 : -1)
      lastStepTimeRef.current = now
      lastInputRef.current = { type: 'touch', t: now }
    }
    const onKey = (e) => {
      const k = e.key
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","PageUp","PageDown"].includes(k)) {
        if (typeof e.preventDefault === 'function') e.preventDefault()
      }
      const now = Date.now()
      if (now - lastStepTimeRef.current < 60) return
      if (k === 'ArrowRight') { setEnterDirDesktop('right'); stepByDir(1); lastStepTimeRef.current = now; lastInputRef.current = { type: 'key', t: now } ; return }
      if (k === 'ArrowLeft')  { setEnterDirDesktop('left'); stepByDir(-1); lastStepTimeRef.current = now; lastInputRef.current = { type: 'key', t: now } ; return }
      if (k === 'ArrowDown' || k === 'PageDown') { setEnterDirDesktop(''); stepByDir(1); lastStepTimeRef.current = now; lastInputRef.current = { type: 'key', t: now } ; return }
      if (k === 'ArrowUp'   || k === 'PageUp')   { setEnterDirDesktop(''); stepByDir(-1); lastStepTimeRef.current = now; lastInputRef.current = { type: 'key', t: now } ; return }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    // Note: touch handlers are bound on the mobile hero container only
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      if (wheelGestureTimerRef.current) clearTimeout(wheelGestureTimerRef.current)
    }
  }, [slug])

  // Local mobile touch handlers: one image per swipe
  const onMobileTouchStart = (e) => {
    if (window.innerWidth >= 768) return
    if (!e.touches || e.touches.length === 0) return
    touchStartYRef.current = e.touches[0].clientY
    touchStartXRef.current = e.touches[0].clientX
  }
  const onMobileTouchEnd = (e) => {
    if (window.innerWidth >= 768) return
    if (!e.changedTouches || e.changedTouches.length === 0) return
    const now = Date.now()
    const endY = e.changedTouches[0].clientY
    const endX = e.changedTouches[0].clientX
    const dy = endY - touchStartYRef.current
    const dx = endX - touchStartXRef.current
    const threshold = 10
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return
    if (now - lastStepTimeRef.current < 60) return
    if (Math.abs(dx) > Math.abs(dy)) {
      const dir = dx < 0 ? 1 : -1
      setEnterDirMobile(dir > 0 ? 'left' : 'right')
      setMobileFrame((i) => Math.min(9, Math.max(0, i + dir)))
    } else {
      const dir = dy < 0 ? 1 : -1
      setEnterDirMobile('') // vertical keeps default fade
      setMobileFrame((i) => Math.min(9, Math.max(0, i + dir)))
    }
    lastStepTimeRef.current = now
    lastInputRef.current = { type: 'touch', t: now }
  }

  // Desktop horizontal swipe via pointer
  const onDesktopPointerDown = (e) => {
    if (window.innerWidth < 768) return
    pointerActiveRef.current = true
    pointerStartXRef.current = (e.clientX ?? 0)
  }
  const onDesktopPointerUp = (e) => {
    if (window.innerWidth < 768) return
    if (!pointerActiveRef.current) return
    pointerActiveRef.current = false
    const now = Date.now()
    const endX = (e.clientX ?? 0)
    const dx = endX - (pointerStartXRef.current || 0)
    const threshold = 18
    if (Math.abs(dx) < threshold) return
    if (now - lastStepTimeRef.current < 60) return
    const dir = dx < 0 ? 1 : -1
    setEnterDirDesktop(dir > 0 ? 'left' : 'right')
    setDesktopFrame((i) => Math.min(5, Math.max(0, i + dir)))
    lastStepTimeRef.current = now
  }


  return (
    <div className={`min-h-screen bg-[#06080a] px-[clamp(12px,3vw,24px)] relative flex flex-col overflow-x-hidden ${slug === 'miela' ? 'miela-mobile-no-scroll' : ''}`} style={{ ['--nav-h']: 'clamp(72px, 12vh, 120px)' }}>
      {/* Fixed background */}
      <div className="page-fixed-bg" aria-hidden style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${csBG})` }} />
      <div className="page-fixed-overlay" aria-hidden />

      {/* Navbar (same style as case study) */}
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        <img decoding="async" src="/left.svg" alt="" className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left svg-gold sub-anim-svg-left" />
        <img decoding="async" src="/right.svg" alt="" className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right svg-gold sub-anim-svg-right" />

        <div className="absolute left-[clamp(16px,3vw,40px)] w-auto">
          <button
            onClick={() => navigate('/creative-designer/case-study', { replace: false })}
            aria-label="Back to Case Studies"
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] whitespace-nowrap"
          >
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="hidden sm:inline">Back to Case Studies</span>
          </button>
        </div>

        <img decoding="async" src="/ibheelz-logo.webp" alt="ibheelz" className="h-[clamp(3rem,6vw,4.25rem)] w-auto cursor-pointer sub-anim-logo-slow" style={{ maxHeight: '68px' }} onClick={() => navigate('/')} />

        <div className="absolute right-[clamp(16px,3vw,40px)]">
          <button
            onClick={() => navigate(`/creative-designer/case/${nextSlug}`)}
            aria-label={`${titles[nextSlug]} Case Study`}
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] cursor-pointer"
          >
            <span className="hidden sm:inline">{`${titles[nextSlug]} Case Study`}</span>
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="header-spacer" />

      {/* Content layer: show extra media for specific cases */}
      <section className="content-layer flex-1">
        {/* Miela-specific image visible only on md+ screens */}
        {slug === 'miela' && (
          <>
            {/* Mobile: dedicated Miela image */}
            <div className="flex flex-col md:hidden w-full h-full items-center justify-center p-6 miela-hero-in miela-touch" onTouchStart={onMobileTouchStart} onTouchMove={(e)=>e.preventDefault()} onTouchEnd={onMobileTouchEnd}>
              <div className="relative" style={{ height: '60vh', width: '100%' }}>
                <img
                  src={mielaImageMobile}
                  alt="Miela case artwork (mobile)"
                  decoding="async"
                  loading="eager"
                  fetchpriority="high"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 0 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 0 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 0 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-1-mobile.png' }}
                />
                <img
                  src={mielaImageMobile2}
                  alt="Miela case artwork 2 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 1 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 1 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 1 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-2-mobile.png' }}
                />
                <img
                  src={mielaImageMobile3}
                  alt="Miela case artwork 3 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 2 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 2 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 2 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-3-mobile.png' }}
                />
                <img
                  src={mielaImageMobile4}
                  alt="Miela case artwork 4 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 3 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 3 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 3 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-4-mobile.png' }}
                />
                <img
                  src={mielaImageMobile5}
                  alt="Miela case artwork 5 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 4 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 4 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 4 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-5-mobile.png' }}
                />
                <img
                  src={mielaImageMobile6}
                  alt="Miela case artwork 6 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 5 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 5 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 5 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-6-mobile.png' }}
                />
                <img
                  src={mielaImageMobile7}
                  alt="Miela case artwork 7 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 6 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 6 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 6 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-7-mobile.png' }}
                />
                <img
                  src={mielaImageMobile8}
                  alt="Miela case artwork 8 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 7 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 7 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 7 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-8-mobile.png' }}
                />
                <img
                  src={mielaImageMobile9}
                  alt="Miela case artwork 9 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 8 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 8 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 8 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-9-mobile.png' }}
                />
                <img
                  src={mielaImageMobile10}
                  alt="Miela case artwork 10 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 9 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 9 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 9 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-10-mobile.png' }}
                />
              </div>
            </div>

            {/* Desktop/Tablet: hero frames (uniform sizing) */}
            <div className="hidden md:flex md:flex-col w-full h-full items-center justify-center p-8 miela-hero-in miela-desktop-hero" onPointerDown={onDesktopPointerDown} onPointerUp={onDesktopPointerUp} onMouseDown={onDesktopPointerDown} onMouseUp={onDesktopPointerUp}>
              <div className="relative" style={{ height: '50vh', width: '100%' }}>
                <img
                  src={mielaImage}
                  alt="Miela case artwork"
                  decoding="async"
                  loading="eager"
                  fetchpriority="high"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 0 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 0 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 0 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-1.png' }}
                />
                <img
                  src={mielaImage2}
                  alt="Miela case artwork 2"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 1 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 1 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 1 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-2.png' }}
                />
                <img
                  src={mielaImage3}
                  alt="Miela case artwork 3"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 2 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 2 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 2 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-3.png' }}
                />
                <img
                  src={mielaImage4}
                  alt="Miela case artwork 4"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 3 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 3 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 3 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-4.png' }}
                />
                <img
                  src={mielaImage5}
                  alt="Miela case artwork 5"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 4 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 4 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 4 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-5.png' }}
                />
                <img
                  src={mielaImage6}
                  alt="Miela case artwork 6"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[58vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 5 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 5 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 5 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-6.png' }}
                />
              </div>
            </div>

        {/* Smooth infinite marquee of b1..b6 images */}
        <div className="content-layer marquee-bleed marquee-dock flex justify-center items-center miela-marquee-in">
              <div className="smooth-marquee" aria-label="Brand strip">
                <div className="marquee-track" aria-hidden>
                  {/* group A */}
                  <div className="marquee-group">
                    {bImgs.map((src, i) => (
                      <img
                        key={`a-${i}`}
                        src={src}
                        alt=""
                        decoding="async"
                        loading="lazy"
                        className="marquee-img"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/b${(i%6)+1}.png` }}
                      />
                    ))}
                </div>
                  {/* group B (duplicate for seamless loop) */}
                  <div className="marquee-group" aria-hidden>
                    {bImgs.map((src, i) => (
                      <img
                        key={`b-${i}`}
                        src={src}
                        alt=""
                        decoding="async"
                        loading="lazy"
                        className="marquee-img"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/b${(i%6)+1}.png` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Todoalrojo: bottom marquee with two banners (same animation as Miela) */}
        {slug === 'todoalrojo' && (
          <div className="content-layer marquee-bleed marquee-dock flex justify-center items-center miela-marquee-in todoalrojo-marquee">
            <div className="smooth-marquee" aria-label="Todoalrojo banner strip">
              <div className="marquee-track" aria-hidden>
                {/* group A */}
                <div className="marquee-group">
                  {rojoBannerSeq.map((src, i) => (
                    <img
                      key={`ra-${i}`}
                      src={src}
                      alt=""
                      decoding="async"
                      loading="lazy"
                      className="marquee-img"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/rojo-banner-${(i%2)+1}.png` }}
                    />
                  ))}
                </div>
                {/* group B duplicate for seamless loop */}
                <div className="marquee-group" aria-hidden>
                  {rojoBannerSeq.map((src, i) => (
                    <img
                      key={`rb-${i}`}
                      src={src}
                      alt=""
                      decoding="async"
                      loading="lazy"
                      className="marquee-img"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/rojo-banner-${(i%2)+1}.png` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Martell: split the page into two equal columns under the navbar */}
        {slug === 'martell' && (
          <div className="w-full min-h-[calc(100dvh-var(--nav-h))] pb-6 md:pb-10 lg:pt-[100px]">
            {/* Large screens (lg+): two columns */}
            <div className="hidden lg:grid lg:grid-cols-[35%_63%] gap-4 md:gap-6 w-full h-full martell-grid">
              <div className="relative rounded-none h-full px-[8px] md:px-[20px] flex items-center justify-center">
                {/* Video layer (70% viewport height) */}
                <div className="relative h-[70dvh] w-full flex items-center justify-center compat-dvh">
                  <div className="h-[90%] w-auto rounded-[28px] md:rounded-[24px] overflow-hidden mx-auto martell-left-inner">
                    <video
                      src={martellVideo1}
                      className="block h-full w-auto max-w-full object-contain cursor-pointer martell-enter martell-delay-1"
                      poster={martellImage1}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => { try { e.currentTarget.play() } catch (_) {} }}
                      onPlaying={() => setMartellPlaying(true)}
                      onCanPlay={() => { /* ensure fade-in if autoplay paused */ setMartellPlaying((p) => p || false) }}
                      style={{ opacity: martellPlaying ? 1 : 0, transition: 'opacity 300ms ease' }}
                      onClick={() => openLightboxAt(0)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') openLightboxAt(0) }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                </div>
              </div>
              <div className="relative rounded-none h-full px-[8px] md:px-[20px] flex items-center justify-center">
                {/* Right column: 70% Martell-1 image + 30% day image */}
                <div className="relative h-[70dvh] w-full flex items-center justify-center compat-dvh">
                  <div className="h-[90%] w-full mx-auto md:mr-[100px] flex flex-col items-center lg:items-center justify-start gap-[30px] martell-right-inner">
                    <div className="h-[calc(65%_-_30px)] w-full flex items-center justify-center mb-[30px] martell-top">
                      <img
                        src={martellImage1}
                        alt="Martell artwork"
                        decoding="async"
                        loading="eager"
                        className="block h-full w-full object-contain slow-sway martell-enter martell-delay-1"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/martell-1.png' }}
                      />
                    </div>
                    <div className="h-[38%] w-full mt-auto flex items-center justify-center rounded-[28px] md:rounded-[24px] overflow-hidden martell-bottom">
                      <img
                        src={martelDayImage}
                        alt="Martell day visual"
                        decoding="async"
                        loading="lazy"
                        className="block w-full h-auto object-contain cursor-pointer rounded-[28px] md:rounded-[24px] slow-sway martell-enter martell-delay-2"
                        onClick={() => openLightboxAt(1)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') openLightboxAt(1) }}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/martel-day.webp' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet and smaller (lg-): stacked order */}
            <div className="lg:hidden w-full px-[clamp(12px,3vw,24px)] mb-[20px] martell-ipad">
              <div className="w-full mx-auto flex flex-col items-center justify-start gap-8 md:gap-12 martell-stack">
                {/* 1) martell-1-mobile on top */}
                <div className="w-full mt-[30px] martell-scroll martell-hero-mobile" data-delay="80">
                  <img
                    src={martellImage1Mobile}
                    alt="Martell mobile hero"
                    decoding="async"
                    loading="eager"
                    className="block w-full h-auto object-contain slow-sway martell-enter martell-delay-1"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/martell-1-mobile.png' }}
                  />
                </div>
                {/* 2) martell video (left column video) */}
                <div className="w-full rounded-[20px] overflow-hidden martell-scroll" data-delay="140">
                  <video
                    src={martellVideo1}
                    className="block w-full h-auto object-contain cursor-pointer martell-enter martell-delay-2"
                    poster={martellImage1}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => { try { e.currentTarget.play() } catch (_) {} }}
                    onClick={() => openLightboxAt(0)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') openLightboxAt(0) }}
                  />
                </div>
                {/* 3) martell-2-mobile image */}
                <div className="w-full martell-scroll" data-delay="200">
                  <img
                    src={martellImage2Mobile}
                    alt="Martell mobile secondary"
                    decoding="async"
                    loading="lazy"
                    className="block w-full h-auto object-contain slow-sway martell-enter martell-delay-3"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/martell-2-mobile.png' }}
                  />
                </div>
                {/* 4) martell day image (click to open lightbox) */}
                <div className="w-full rounded-[20px] overflow-hidden martell-scroll" data-delay="260">
                  <img
                    src={martelDayImage}
                    alt="Martell day visual"
                    decoding="async"
                    loading="lazy"
                    className="block w-full h-auto object-contain cursor-pointer slow-sway martell-enter martell-delay-4"
                    onClick={() => openLightboxAt(1)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') openLightboxAt(1) }}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/martel-day.webp' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {(slug === 'martell') && (lightboxOpen || lightboxClosing) && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Martell gallery"
            className={`fixed inset-0 z-[9998] lightbox-overlay ${lightboxClosing ? 'lightbox-fade-out' : 'lightbox-fade-in'}`}
            onClick={handleCloseLightbox}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(${csBG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button ref={closeBtnRef} className={`lightbox-close ${lightboxEntering ? 'controls-pop-in' : ''}`} aria-label="Close" onClick={handleCloseLightbox}>×</button>
            <button className="lightbox-chevron lightbox-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); prevImage() }}>
              <span className={`chevron-content ${lightboxEntering ? 'controls-pop-in' : ''}`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </span>
            </button>
            <button className="lightbox-chevron lightbox-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); nextImage() }}>
              <span className={`chevron-content ${lightboxEntering ? 'controls-pop-in' : ''}`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </button>
            <div
              ref={lightboxRef}
              className={`lightbox-modal ${lightboxEntering ? 'modal-pop-in' : (lightboxClosing ? 'scale-out' : 'scale-in')}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-image-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {martellGallery[currentIndex].type === 'video' ? (
                  <video
                    key={`v-${currentIndex}`}
                    src={martellGallery[currentIndex].src}
                    className={`lightbox-image ${enterDir === 'left' ? 'img-enter-left' : enterDir === 'right' ? 'img-enter-right' : ''}`}
                    poster={martellImage1}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => { try { e.currentTarget.play() } catch (_) {} }}
                    onAnimationEnd={() => setEnterDir(null)}
                  />
                ) : (
                  <img
                    key={`i-${currentIndex}`}
                    src={martellGallery[currentIndex].src}
                    alt="Martell gallery item"
                    decoding="async"
                    fetchpriority="high"
                    loading="eager"
                    className={`lightbox-image ${enterDir === 'left' ? 'img-enter-left' : enterDir === 'right' ? 'img-enter-right' : ''}`}
                    onAnimationEnd={() => setEnterDir(null)}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/martel-day.webp' }}
                  />
                )}
              </div>
            </div>
            <div className={`lightbox-thumbs ${lightboxEntering ? 'thumbs-pop-in' : ''}`} role="listbox" aria-label="Thumbnails" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-thumbs-scroll" ref={thumbsScrollRef}>
                <div className="thumbs-inner" ref={thumbsInnerRef}>
                  {martellGallery.map((it, i) => (
                    <button
                      key={i}
                      role="option"
                      aria-selected={i === currentIndex}
                      className={`thumb ${i === currentIndex ? 'thumb-active' : ''} ${it.type === 'video' ? 'video-thumb' : ''}`}
                      onClick={() => setCurrentIndex(i)}
                      title={`View ${it.type}`}
                    >
                      {it.type === 'video' ? (
                        <video
                          src={it.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      ) : (
                        <img src={it.thumb || it.src} alt={`Thumbnail ${i + 1}`} loading="lazy" decoding="async" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Fixed indicators 10px above carousel (all screens) — only for Miela */}
      {slug === 'miela' && (
        <div className="miela-dots-fixed" aria-hidden>
          <div className="hidden md:flex justify-center">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={`d-dot-${idx}`} className={`dot ${desktopFrame === idx ? 'active' : ''}`} />
            ))}
          </div>
          <div className="flex md:hidden justify-center">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={`m-dot-${idx}`} className={`dot ${mobileFrame === idx ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        .page-fixed-bg { position: fixed; left: 0; right: 0; bottom: 0; top: var(--nav-h); background-size: cover; background-position: center; z-index: 0; }
        .page-fixed-overlay { position: fixed; left: 0; right: 0; bottom: 0; top: var(--nav-h); background: rgba(0,0,0,0.35); z-index: 1; pointer-events: none; }
        .liquid-glass-header { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1.5px solid rgba(255,255,255,0.1); border-radius: clamp(20px, 4vw, 30px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: fixed; top: 0; left: clamp(12px, 3vw, 24px); right: clamp(12px, 3vw, 24px); z-index: 10; }
        .header-spacer { height: var(--nav-h); }
        .content-layer { position: relative; z-index: 2; }

        .detail-cell { position: relative; width: min(800px, 90vw); aspect-ratio: 4 / 3; }
        .gold-rect { position: absolute; inset: 0; margin: auto; width: 64%; height: 72%; background: #eac28a; border-radius: clamp(10px, 1vw, 18px); z-index: 1; display: grid; place-items: center; }
        .logo-img { width: 40%; height: 40%; object-fit: contain; z-index: 2; display: block; }
        .frame-img { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; width: 80%; height: 80%; object-fit: contain; pointer-events: none; }

        .svg-gold { filter: brightness(0) saturate(100%) invert(76%) sepia(36%) saturate(459%) hue-rotate(358deg) brightness(97%) contrast(89%); }
        .svg-left { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); left: calc(50% - 70px); transform: translateY(-50%); }
        .svg-right { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); right: calc(50% - 70px); transform: translateY(-50%); }
        @media (min-width: 768px) { .svg-left { left: calc(50% - 120px) } .svg-right { right: calc(50% - 120px) } }
        @media (min-width: 1024px) { .svg-left { left: calc(50% - 160px) } .svg-right { right: calc(50% - 160px) } }
        @media (min-width: 1280px) { .svg-left { left: calc(50% - 200px) } .svg-right { right: calc(50% - 200px) } }
        @media (min-width: 640px) { .svg-left { left: calc(50% - 90px); } .svg-right { right: calc(50% - 90px); } }

        /* Buttons (same theme hover) */
        .glass-button { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16); color: #e7f2f8; }
        .glass-button:hover { background: #ec6d6c; color: #ffffff; border-color: transparent; }

        /* Nav animations */
        @keyframes slideDownNav { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideDownNav { animation: slideDownNav 1.5s ease-out forwards; }
        @keyframes subLogoSlowIn { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .sub-anim-logo-slow { animation: subLogoSlowIn 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes subSvgInLeft { from { transform: translateX(-14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes subSvgInRight { from { transform: translateX(14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .sub-anim-svg-left { animation: subSvgInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) 200ms both; }
        .sub-anim-svg-right { animation: subSvgInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) 260ms both; }

        /* Miela content animations */
        @keyframes fadeUpIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInSlow { from { opacity: 0; } to { opacity: 1; } }
        .miela-hero-in { opacity: 0; animation: fadeUpIn 900ms cubic-bezier(0.22, 1, 0.36, 1) 120ms forwards; will-change: transform, opacity; }
        .miela-marquee-in { opacity: 0; animation: fadeInSlow 900ms ease-out 400ms forwards; }
        .miela-touch { touch-action: none; }
        .swap-img { transition: opacity 1600ms ease; will-change: opacity; }
        @media (prefers-reduced-motion: reduce) { .swap-img { transition-duration: 1ms; } }

        

        /* Smooth continuous marquee (seamless, not too large) */
        .marquee-bleed { width: 100vw; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
        .marquee-dock { position: fixed; left: 0; right: 0; bottom: 0; z-index: 5; padding-bottom: max(0px, env(safe-area-inset-bottom)); }
        .smooth-marquee { width: 100%; overflow: hidden; }
        .marquee-track { display: flex; width: max-content; gap: 0; animation: marqueeScroll 40s linear infinite; will-change: transform; }
        .marquee-group { display: flex; gap: 0; }
        .marquee-img { display: block; margin: 0; height: 25vh; width: auto; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25)); opacity: 0.95; }
        /* Todoalrojo banners use smaller height */
        .todoalrojo-marquee .marquee-img { height: 10vh; }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation-duration: 0.001ms; animation-iteration-count: 1; }
        }

        /* Indicator row hooked to marquee top (inside marquee-dock) */
        .miela-dots-over { position: absolute; left: 0; right: 0; top: -10px; z-index: 6; justify-content: center; gap: 8px; pointer-events: none; }
        .miela-dots-over .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.3);
          box-shadow: none;
          transition: width 180ms ease, height 180ms ease, background 180ms ease, box-shadow 180ms ease;
        }
        .miela-dots-over .dot.active {
          width: 8px; height: 8px;
          background: rgba(255,255,255,0.9);
          box-shadow: 0 0 8px rgba(255,255,255,0.5);
        }

        /* Miela hero horizontal enter (margin-left to preserve absolute centering) */
        @keyframes mielaEnterL {
          0%   { opacity: 0; filter: blur(6px); margin-left: -36px; }
          100% { opacity: 1; filter: blur(0);   margin-left: 0; }
        }
        @keyframes mielaEnterR {
          0%   { opacity: 0; filter: blur(6px); margin-left: 36px; }
          100% { opacity: 1; filter: blur(0);   margin-left: 0; }
        }
        .miela-enter-left  { animation: mielaEnterL 900ms cubic-bezier(0.16, 1, 0.3, 1); }
        .miela-enter-right { animation: mielaEnterR 900ms cubic-bezier(0.16, 1, 0.3, 1); }

        .miela-dots-fixed { position: fixed; left: 0; right: 0; bottom: calc(25vh + 10px + env(safe-area-inset-bottom)); z-index: 6; pointer-events: none; }
        .miela-dots-fixed .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.36); box-shadow: none; margin: 0 4px; transition: width 180ms ease, height 180ms ease, background 180ms ease, box-shadow 180ms ease; }
        .miela-dots-fixed .dot.active { width: 8px; height: 8px; background: rgba(255,255,255,0.95); box-shadow: 0 0 8px rgba(255,255,255,0.5); }

        /* Nudge hero images down on short-height screens */
        @media (max-height: 800px) {
          .miela-desktop-hero .swap-img { transform: translate(-50%, calc(-50% + 60px)); }
        }
        /* Also nudge on ultra‑wide aspect ratios (very wide, limited vertical space) */
        @media (min-aspect-ratio: 2/1) {
          .miela-desktop-hero .swap-img { transform: translate(-50%, calc(-50% + 60px)); }
        }
        /* Add a general top margin to all desktop hero images */
        .miela-desktop-hero .swap-img { margin-top: 15px; }
        /* Lock page scroll on Miela mobile */
        @media (max-width: 767px) {
          .miela-mobile-no-scroll { height: 100vh; overflow: hidden; overscroll-behavior: none; }
          /* Ensure no top margin on mobile hero images */
          .miela-mobile-no-scroll .swap-img { margin-top: 0 !important; }
          /* Reduce gap: remove spacer and extra top padding under navbar */
          .miela-mobile-no-scroll .header-spacer { height: 0 !important; }
          .miela-mobile-no-scroll .miela-hero-in { padding-top: 0 !important; }
        }

        /* Lightbox (same style as Posters & Flyers) */
        .lightbox-overlay {
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 120ms ease;
          overflow: hidden; overscroll-behavior: contain;
        }
        .lightbox-fade-in { opacity: 1; }
        .lightbox-fade-out { opacity: 0; }
        .lightbox-modal {
          position: relative; width: min(70vw, 1200px); max-height: 80vh;
          background: rgba(20,20,22,0.2); border-radius: 16px; overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35); color: #e7f2f8;
          transform: scale(0.98); transform-origin: center center;
          transition: transform 120ms ease; opacity: 0;
        }
        .scale-in { transform: scale(1); opacity: 1; }
        .scale-out { transform: scale(0.98); }
        @keyframes modalPopIn { 0% { opacity: 0; transform: translateY(24px) scale(0.99); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .modal-pop-in { animation: modalPopIn 1200ms cubic-bezier(0.2, 0.85, 0.2, 1) both; }
        @keyframes controlsPopIn { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        .controls-pop-in { animation: controlsPopIn 1200ms ease-out both 220ms; }
        .thumbs-pop-in { animation: controlsPopIn 1300ms ease-out both 260ms; }
        .chevron-content { display: inline-flex; align-items: center; justify-content: center; }
        .lightbox-close {
          position: fixed; top: calc(20px + env(safe-area-inset-top)); right: calc(10px + env(safe-area-inset-right)); z-index: 10001;
          width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: #ffffff; border: none; font-size: 24px; line-height: 1; font-weight: 600; border-radius: 8px;
        }
        .lightbox-close:hover { background: #ec6d6c; color: #ffffff; }
        .lightbox-close:active { background: #ec6d6c; color: #ffffff; }
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
        .lightbox-image-wrap { display: flex; align-items: center; justify-content: center; padding: 20px 20px 90px; touch-action: none; }
        .lightbox-image { max-width: 100%; max-height: calc(80vh - 110px); object-fit: cover; object-position: top center; border-radius: 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.35); will-change: transform, opacity, filter; }
        @keyframes imgEnterL { 0% { opacity: 0; transform: translateX(36px) scale(0.985); filter: blur(6px); } 100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); } }
        @keyframes imgEnterR { 0% { opacity: 0; transform: translateX(-36px) scale(0.985); filter: blur(6px); } 100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); } }
        .img-enter-left { animation: imgEnterL 900ms cubic-bezier(0.16, 1, 0.3, 1); }
        .img-enter-right { animation: imgEnterR 900ms cubic-bezier(0.16, 1, 0.3, 1); }
        .lightbox-thumbs { position: fixed; left: 0; right: 0; bottom: 0; height: 86px; background: rgba(10,10,12,0.35); border-top: none; z-index: 9999; padding-bottom: env(safe-area-inset-bottom); }
        .lightbox-thumbs-scroll { height: 100%; overflow-x: auto; overflow-y: hidden; padding: 8px 10px; -webkit-overflow-scrolling: touch; touch-action: pan-x; text-align: center; white-space: nowrap; }
        .lightbox-thumbs-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .lightbox-thumbs-scroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
        .thumbs-inner { display: inline-block; white-space: nowrap; }
        .thumb { width: 100px; height: 64px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; background: rgba(255,255,255,0.05); display: inline-block; vertical-align: middle; transition: transform 150ms ease, border-color 150ms ease; position: relative; }
        .thumb:hover { transform: translateY(-1px); }
        .thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
        .thumb-active { border-color: #ed6d6d; }
        .thumb.video-thumb::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(0,0,0,0.1), rgba(0,0,0,0.35)); }
        .thumb.video-thumb::before { content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 0; height: 0; border-left: 12px solid #fff; border-top: 8px solid transparent; border-bottom: 8px solid transparent; opacity: 0.9; }
        @media (max-width: 768px) {
          .lightbox-modal { width: min(92vw, 900px); max-height: 80vh; }
          .lightbox-image-wrap { padding: 12px 12px 90px; }
          .lightbox-chevron { display: none; }
        @media (prefers-reduced-motion: reduce) { .img-enter-left, .img-enter-right { animation-duration: 0ms; } }
        }

        /* Ultrawide responsiveness (21:9 and wider) */
        @media (min-aspect-ratio: 21/9), (min-width: 2000px) {
          .martell-grid { grid-template-columns: 33% 65% !important; gap: 24px !important; }
          .martell-left-inner, .martell-right-inner { height: 92% !important; }
          /* Show only Martell-1 (top) and let it fill the right container */
          .martell-top { height: 100% !important; width: 100% !important; margin-bottom: 0 !important; }
          .martell-bottom { display: none !important; }
        }

        /* Very slow, subtle image sway */
        @keyframes slowSway {
          0%   { transform: translateY(0) scale(1); }
          50%  { transform: translateY(-6px) scale(1.008); }
          100% { transform: translateY(0) scale(1); }
        }
        .slow-sway { animation: slowSway 26s ease-in-out infinite; will-change: transform; transform-origin: center center; }
        @media (prefers-reduced-motion: reduce) { .slow-sway { animation: none !important; } }

        /* Soft on-load entrance for Martell media */
        @keyframes martellEnter {
          0%   { opacity: 0; transform: translateY(18px) scale(0.992); }
          100% { opacity: 1; transform: translateY(0)     scale(1); }
        }
        .martell-enter { opacity: 0; animation: martellEnter 1800ms cubic-bezier(0.2, 0.85, 0.2, 1) both; will-change: transform, opacity; }
        .martell-delay-1 { animation-delay: 140ms; }
        .martell-delay-2 { animation-delay: 300ms; }
        .martell-delay-3 { animation-delay: 460ms; }
        .martell-delay-4 { animation-delay: 620ms; }
        @media (prefers-reduced-motion: reduce) { .martell-enter { animation: none !important; opacity: 1 !important; } }

        /* Scroll reveal (very gentle) */
        .martell-scroll { opacity: 0; transform: translateY(22px) scale(0.996); transition: opacity 1200ms ease, transform 1200ms cubic-bezier(0.2, 0.85, 0.2, 1); will-change: transform, opacity; }
        .martell-scroll.in-view { opacity: 1; transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .martell-scroll { opacity: 1 !important; transform: none !important; } }

        /* Dynamic viewport fallback: older browsers use vh instead of dvh */
        @supports not (height: 1dvh) {
          .compat-dvh { height: 70vh !important; }
        }

        

        /* iPad mini tuning (target 744–834px widths) */
        @media screen and (min-width: 744px) and (max-width: 834px) {
          /* 3x increased spacing on iPad mini only */
          .martell-ipad { padding-left: 108px !important; padding-right: 108px !important; padding-bottom: 108px !important; }
          .martell-ipad .martell-stack { gap: 84px !important; }
          .martell-ipad .martell-hero-mobile { margin-top: 120px !important; }
        }

        /* Hide navbar while lightbox open */
        .lightbox-open .liquid-glass-header { display: none !important; }
      `}</style>
    </div>
  )
}

export default CreativeDesignerCaseDetail
