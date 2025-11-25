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
      const now = Date.now()
      if (now - lastStepTimeRef.current < 60) return
      if (["ArrowRight"].includes(e.key)) { setEnterDirDesktop('left'); stepByDir(1); lastStepTimeRef.current = now; lastInputRef.current = { type: 'key', t: now } }
      if (["ArrowLeft"].includes(e.key))  { setEnterDirDesktop('right'); stepByDir(-1); lastStepTimeRef.current = now; lastInputRef.current = { type: 'key', t: now } }
      if (['ArrowDown','PageDown'].includes(e.key)) { setEnterDirDesktop(''); stepByDir(1); lastStepTimeRef.current = now; lastInputRef.current = { type: 'key', t: now } }
      if (['ArrowUp','PageUp'].includes(e.key))   { setEnterDirDesktop(''); stepByDir(-1); lastStepTimeRef.current = now; lastInputRef.current = { type: 'key', t: now } }
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
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 0 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 0 ? 'img-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 0 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-1-mobile.png' }}
                />
                <img
                  src={mielaImageMobile2}
                  alt="Miela case artwork 2 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 1 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 1 ? 'img-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 1 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-2-mobile.png' }}
                />
                <img
                  src={mielaImageMobile3}
                  alt="Miela case artwork 3 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 2 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 2 ? 'img-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 2 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-3-mobile.png' }}
                />
                <img
                  src={mielaImageMobile4}
                  alt="Miela case artwork 4 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 3 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 3 ? 'img-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 3 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-4-mobile.png' }}
                />
                <img
                  src={mielaImageMobile5}
                  alt="Miela case artwork 5 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 4 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 4 ? 'img-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 4 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-5-mobile.png' }}
                />
                <img
                  src={mielaImageMobile6}
                  alt="Miela case artwork 6 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 5 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 5 ? 'img-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 5 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-6-mobile.png' }}
                />
                <img
                  src={mielaImageMobile7}
                  alt="Miela case artwork 7 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 6 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 6 ? 'img-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 6 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-7-mobile.png' }}
                />
                <img
                  src={mielaImageMobile8}
                  alt="Miela case artwork 8 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 7 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 7 ? 'img-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 7 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-8-mobile.png' }}
                />
                <img
                  src={mielaImageMobile9}
                  alt="Miela case artwork 9 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 8 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 8 ? 'img-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 8 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-9-mobile.png' }}
                />
                <img
                  src={mielaImageMobile10}
                  alt="Miela case artwork 10 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 9 ? 'img-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 9 ? 'img-enter-right' : ''}`}
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
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 0 ? 'img-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 0 ? 'img-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 0 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-1.png' }}
                />
                <img
                  src={mielaImage2}
                  alt="Miela case artwork 2"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 1 ? 'img-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 1 ? 'img-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 1 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-2.png' }}
                />
                <img
                  src={mielaImage3}
                  alt="Miela case artwork 3"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 2 ? 'img-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 2 ? 'img-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 2 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-3.png' }}
                />
                <img
                  src={mielaImage4}
                  alt="Miela case artwork 4"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 3 ? 'img-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 3 ? 'img-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 3 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-4.png' }}
                />
                <img
                  src={mielaImage5}
                  alt="Miela case artwork 5"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 4 ? 'img-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 4 ? 'img-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 4 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-5.png' }}
                />
                <img
                  src={mielaImage6}
                  alt="Miela case artwork 6"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[58vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 5 ? 'img-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 5 ? 'img-enter-right' : ''}`}
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

        {/* Martell: split the page into two equal columns under the navbar */}
        {slug === 'martell' && (
          <div className="w-full h-[calc(100dvh-var(--nav-h))] pb-6 md:pb-10">
            <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-4 md:gap-6 w-full h-full">
              <div className="relative rounded-none h-full px-[20px] md:pl-[100px] md:pr-[80px] flex items-center justify-center">
                {/* Video layer (70% viewport height) */}
                <div className="relative h-[70dvh] w-full flex items-center justify-center">
                  <div className="h-full w-auto rounded-[24px] overflow-hidden mx-auto">
                    <video
                      src={`${import.meta.env.BASE_URL}martel-video.mp4`}
                      className="block h-full w-auto max-w-full object-contain"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => { try { e.currentTarget.play() } catch (_) {} }}
                      onPlaying={() => setMartellPlaying(true)}
                      onCanPlay={() => { /* ensure fade-in if autoplay paused */ setMartellPlaying((p) => p || false) }}
                      style={{ opacity: martellPlaying ? 1 : 0, transition: 'opacity 300ms ease' }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-transparent rounded-none h-full" />
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

        /* Lightbox-like horizontal enter for hero images */
        @keyframes imgEnterL {
          0%   { opacity: 0; filter: blur(6px); margin-left: 36px; }
          100% { opacity: 1; filter: blur(0);   margin-left: 0; }
        }
        @keyframes imgEnterR {
          0%   { opacity: 0; filter: blur(6px); margin-left: -36px; }
          100% { opacity: 1; filter: blur(0);   margin-left: 0; }
        }
        .img-enter-left  { animation: imgEnterL 900ms cubic-bezier(0.16, 1, 0.3, 1); }
        .img-enter-right { animation: imgEnterR 900ms cubic-bezier(0.16, 1, 0.3, 1); }

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

        
      `}</style>
    </div>
  )
}

export default CreativeDesignerCaseDetail
