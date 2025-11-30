import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const csBG = `${import.meta.env.BASE_URL}creative-designer-cs-BG.webp`
const mielaImage = `${import.meta.env.BASE_URL}miela-1.webp?v=1`
const mielaImage2 = `${import.meta.env.BASE_URL}miela-2.webp?v=1`
const mielaImage3 = `${import.meta.env.BASE_URL}miela-3.webp?v=1`
const mielaImage4 = `${import.meta.env.BASE_URL}miela-4.webp?v=1`
const mielaImage5 = `${import.meta.env.BASE_URL}miela-5.webp?v=1`
const mielaImage6 = `${import.meta.env.BASE_URL}miela-6.webp?v=1`
const mielaImageMobile = `${import.meta.env.BASE_URL}miela-1-mobile.webp?v=1`
const mielaImageMobile2 = `${import.meta.env.BASE_URL}miela-2-mobile.webp?v=1`
const mielaImageMobile3 = `${import.meta.env.BASE_URL}miela-3-mobile.webp?v=1`
const mielaImageMobile4 = `${import.meta.env.BASE_URL}miela-4-mobile.webp?v=1`
const mielaImageMobile5 = `${import.meta.env.BASE_URL}miela-5-mobile.webp?v=1`
const mielaImageMobile6 = `${import.meta.env.BASE_URL}miela-6-mobile.webp?v=1`
const mielaImageMobile7 = `${import.meta.env.BASE_URL}miela-7-mobile.webp?v=1`
const mielaImageMobile8 = `${import.meta.env.BASE_URL}miela-8-mobile.webp?v=1`
const mielaImageMobile9 = `${import.meta.env.BASE_URL}miela-9-mobile.webp?v=1`
const mielaImageMobile10 = `${import.meta.env.BASE_URL}miela-10-mobile.webp?v=1`
const bImgs = [1,2,3,4,5,6].map(n => `${import.meta.env.BASE_URL}b${n}.webp`)
const rojoBanners = [1,2].map(n => `${import.meta.env.BASE_URL}rojo-banner-${n}.webp`)
const rojoBannerSeq = Array.from({ length: 10 }, (_, i) => rojoBanners[i % rojoBanners.length])
const todoalrojoDashboard = `${import.meta.env.BASE_URL}todoalrojo-dashboard.webp`
const todoalrojoLeaderboard = `${import.meta.env.BASE_URL}todoalrojo-leaderboard.webp`
const todoalrojoVip = `${import.meta.env.BASE_URL}todoalrojo-vip.webp`
const todoalrojoTask = `${import.meta.env.BASE_URL}todoalrojo-task.webp`
const todoalrojoShop = `${import.meta.env.BASE_URL}todoalrojo-shop.webp`
const todo1 = `${import.meta.env.BASE_URL}todo-1.webp`
const todo2 = `${import.meta.env.BASE_URL}todo-2.webp`
const todo3 = `${import.meta.env.BASE_URL}todo-3.webp`
const todo4 = `${import.meta.env.BASE_URL}todo-4.webp`
const todo5 = `${import.meta.env.BASE_URL}todo-5.webp`
const todoMobile1 = `${import.meta.env.BASE_URL}todo-mobile-1.webp`
const todoMobile2 = `${import.meta.env.BASE_URL}todo-mobile-2.webp`
const todoMobile3 = `${import.meta.env.BASE_URL}todo-mobile-3.webp`
const todoMobile5 = `${import.meta.env.BASE_URL}todo-mobile-5.webp`
const todoMobile4 = `${import.meta.env.BASE_URL}todo-mobile-4.webp`
const todoalrojo1 = `${import.meta.env.BASE_URL}todoalrojo-1.webp`
const todoalrojo2 = `${import.meta.env.BASE_URL}todoalrojo-2.webp`
const todoalrojo3 = `${import.meta.env.BASE_URL}todoalrojo-3.webp`
const todoalrojoCards = [1,2,3,4].map(n => `${import.meta.env.BASE_URL}todoalrojo-card-${n}.webp`)
const martellImage1 = `${import.meta.env.BASE_URL}martell-1.webp`
const martelDayImage = `${import.meta.env.BASE_URL}martel-day.webp`
const martellImage2 = `${import.meta.env.BASE_URL}martell-2.webp`
const martellImage3 = `${import.meta.env.BASE_URL}martell-3.webp`
const martellImage1Mobile = `${import.meta.env.BASE_URL}martell-1-mobile.webp?v=4`
const martellImage2Mobile = `${import.meta.env.BASE_URL}martell-2-mobile.webp`
const martellVideo1 = `${import.meta.env.BASE_URL}martell-video-1.mp4`
const martellVideo2 = `${import.meta.env.BASE_URL}martell-video-2.mp4`
const mieloImages = Array.from({ length: 9 }, (_, i) => `${import.meta.env.BASE_URL}mielo-${i}.webp`)
const mieloMobileImages = [
  `${import.meta.env.BASE_URL}mielo-0.webp`,
  ...Array.from({ length: 8 }, (_, i) => `${import.meta.env.BASE_URL}mielo-mobile-${i + 1}.webp`)
]
const TOTAL_MIELO_FRAMES = 9

// Logo sources (black + white variants) from images/, with public/ fallbacks on error
const logos = {
  martell: {
    black: `${import.meta.env.BASE_URL}logos/martell-white.webp`,
    white: `${import.meta.env.BASE_URL}logos/martell-white.webp`,
    fallbackBlack: '/logos/martell-white.webp',
    fallbackWhite: '/logos/martell-white.webp',
  },
  todoalrojo: {
    black: `${import.meta.env.BASE_URL}logos/tojoalrojo-logo.webp`,
    white: `${import.meta.env.BASE_URL}logos/tojoalrojo-logo.webp`,
    fallbackBlack: '/logos/tojoalrojo-logo.webp',
    fallbackWhite: '/logos/tojoalrojo-logo.webp',
  },
  miela: {
    black: `${import.meta.env.BASE_URL}logos/miela-white.webp`,
    white: `${import.meta.env.BASE_URL}logos/miela-white.webp`,
    fallbackBlack: '/logos/miela-white.webp',
    fallbackWhite: '/logos/miela-white.webp',
  },
  mielo: {
    black: `${import.meta.env.BASE_URL}logos/mielo-white.webp`,
    white: `${import.meta.env.BASE_URL}logos/mielo-white.webp`,
    fallbackBlack: '/logos/mielo-white.webp',
    fallbackWhite: '/logos/mielo-white.webp',
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
  const [mielaMobileDir, setMielaMobileDir] = useState('') // '' | 'left' | 'right' (horizontal)
  const [mielaMobileKey, setMielaMobileKey] = useState(0) // triggers animation reset on vertical swipe
  const mielaMobileTimerRef = useRef(null) // clears direction after animation
  const [mielaMobileVertDir, setMielaMobileVertDir] = useState('') // '' | 'up' | 'down' (vertical)
  const mielaMobileVertTimerRef = useRef(null)
  const TOTAL_MIELA_FRAMES = 10

  // Todoalrojo navigation state
  const [todoalrojoFrame, setTodoalrojoFrame] = useState(0) // 0..4 (5 frames)
  const [enterDirTodoalrojo, setEnterDirTodoalrojo] = useState('')
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
  const [rojoSlide, setRojoSlide] = useState(0) // 0 or 1 for slide 5 bottom slideshow
  const [rojoCardsSlide, setRojoCardsSlide] = useState(0) // 0 or 1 for right-column cards slideshow
  const [todoEntryAnim, setTodoEntryAnim] = useState(false)
  const [todoMobileDir, setTodoMobileDir] = useState('') // '' | 'left' | 'right'
  const [todoMobileKey, setTodoMobileKey] = useState(0)
  const todoMobileTimerRef = useRef(null)
  const [todoMobileVertDir, setTodoMobileVertDir] = useState('') // '' | 'up' | 'down'
  const todoMobileVertTimerRef = useRef(null)
  const TOTAL_TODO_FRAMES = 5

  // Mielo navigation state
  const [mieloFrame, setMieloFrame] = useState(0) // 0..8 (9 frames)
  const [enterDirMielo, setEnterDirMielo] = useState('')
  const mieloLastYRef = useRef(0)
  const mieloLastStepTimeRef = useRef(0)
  const mieloLastInputRef = useRef({ type: '', t: 0 })
  const mieloWheelGestureActiveRef = useRef(false)
  const mieloWheelGestureTimerRef = useRef(null)
  const mieloTouchStartYRef = useRef(0)
  const mieloTouchStartXRef = useRef(0)
  const mieloPointerStartXRef = useRef(0)
  const mieloPointerActiveRef = useRef(false)

  // Mielo lightbox state
  const [mieloLightboxOpen, setMieloLightboxOpen] = useState(false)
  const [mieloLightboxClosing, setMieloLightboxClosing] = useState(false)
  const [mieloLightboxEntering, setMieloLightboxEntering] = useState(false)
  const [mieloLightboxIndex, setMieloLightboxIndex] = useState(0)
  const mieloLightboxRef = useRef(null)
  const mieloCloseBtnRef = useRef(null)

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

  // Todoalrojo lightbox gallery (images only)
  const todoalrojoGallery = [
    { type: 'image', src: todoalrojoDashboard, thumb: todoalrojoDashboard },
    { type: 'image', src: todoalrojoLeaderboard, thumb: todoalrojoLeaderboard },
    { type: 'image', src: todoalrojoVip, thumb: todoalrojoVip },
    { type: 'image', src: todoalrojoTask, thumb: todoalrojoTask },
    { type: 'image', src: todoalrojoShop, thumb: todoalrojoShop },
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
    // Trigger a one-time entry animation for Todoalrojo columns on page load
    if (slug === 'todoalrojo') {
      setTodoEntryAnim(true)
      const t = setTimeout(() => setTodoEntryAnim(false), 1000)
      return () => clearTimeout(t)
    }
    return undefined
  }, [slug])

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

  // Simple looping slideshow for Todoalrojo slide 5 bottom panel (toggle between -1 and -2)
  useEffect(() => {
    if (slug !== 'todoalrojo') return undefined
    if (todoalrojoFrame !== 4) return undefined
    // Slow, subtle crossfade every ~6.5s
    const id = setInterval(() => setRojoSlide((i) => (i + 1) % 2), 6500)
    return () => clearInterval(id)
  }, [slug, todoalrojoFrame])

  // Faster 3s interval for right-column cards crossfade
  useEffect(() => {
    if (slug !== 'todoalrojo') return undefined
    if (todoalrojoFrame !== 4) return undefined
    const id = setInterval(() => setRojoCardsSlide((i) => (i + 1) % 2), 3000)
    return () => clearInterval(id)
  }, [slug, todoalrojoFrame])

  // Carousel animation state - forces re-mount on navigation
  const [carouselKey, setCarouselKey] = useState(0)

  // Reset carousel animation on page load and navigation
  useEffect(() => {
    setCarouselKey((k) => k + 1)
  }, [slug])

  // === MOBILE CAROUSEL ANIMATION FIX ===
  // For mobile: use JavaScript-based animation (most reliable)
  // For desktop: rely on CSS animation
  const animationRef = useRef(null)
  const animationStartTimeRef = useRef(null)
  const isMobileRef = useRef(false)
  const isAnimatingRef = useRef(false)

  // Initialize mobile carousel animation on mount and when carousel key changes
  useEffect(() => {
    // Detect mobile (max-width 768px)
    isMobileRef.current = window.innerWidth <= 768

    // Get all marquee tracks (Miela, Todoalrojo, etc)
    const marqueeElements = document.querySelectorAll('.marquee-track')
    if (!marqueeElements.length) return

    // Mobile: use JavaScript-based animation for reliability
    if (isMobileRef.current) {
      let frameId = null
      let lastTimestamp = 0
      isAnimatingRef.current = true
      animationStartTimeRef.current = null

      const animateMobile = (timestamp) => {
        if (!isAnimatingRef.current) {
          frameId = requestAnimationFrame(animateMobile)
          return
        }

        // Initialize start time on first frame
        if (animationStartTimeRef.current === null) {
          animationStartTimeRef.current = timestamp
        }

        // Calculate elapsed time in seconds
        const elapsed = (timestamp - animationStartTimeRef.current) / 1000
        // 40 second animation cycle
        const cycleDuration = 40
        // Current position in cycle (0 to 1)
        const progress = (elapsed % cycleDuration) / cycleDuration
        // Translate from 0 to -50%
        const translateValue = -50 * progress

        // Apply to all marquee tracks
        marqueeElements.forEach((track) => {
          track.style.transform = `translateX(${translateValue}%)`
          track.style.WebkitTransform = `translateX(${translateValue}%)`
        })

        frameId = requestAnimationFrame(animateMobile)
      }

      // Start animation with a small delay to ensure DOM is ready
      const startId = setTimeout(() => {
        frameId = requestAnimationFrame(animateMobile)
      }, 10)

      return () => {
        clearTimeout(startId)
        if (frameId) {
          cancelAnimationFrame(frameId)
        }
        isAnimatingRef.current = false
      }
    }

    // Desktop: use CSS animation, but force it to restart
    else {
      // Force CSS animation restart by toggling animation
      const restartAnimation = () => {
        marqueeElements.forEach((track) => {
          // Remove animation temporarily
          track.style.animation = 'none'
          track.style.webkitAnimation = 'none'

          // Trigger reflow
          void track.offsetHeight

          // Re-apply animation
          track.style.animation = 'marqueeScroll 40s linear infinite !important'
          track.style.webkitAnimation = 'marqueeScroll 40s linear infinite !important'
          track.style.animationPlayState = 'running !important'
          track.style.webkitAnimationPlayState = 'running !important'
        })
      }

      // Start immediately and also after a tick
      restartAnimation()
      const timerId = setTimeout(restartAnimation, 100)

      return () => clearTimeout(timerId)
    }
  }, [carouselKey])

  // Handle visibility change (pause/resume on mobile, ensure running on desktop)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page hidden: pause mobile animation
        if (isMobileRef.current) {
          isAnimatingRef.current = false
        }
      } else {
        // Page visible: resume animation
        if (isMobileRef.current) {
          isAnimatingRef.current = true
          // Reset timing so animation restarts smoothly
          animationStartTimeRef.current = null
        } else {
          // Desktop: ensure CSS animation is running
          const marqueeElements = document.querySelectorAll('.marquee-track')
          marqueeElements.forEach((track) => {
            track.style.animationPlayState = 'running !important'
            track.style.webkitAnimationPlayState = 'running !important'
          })
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Handle window resize to detect mobile/desktop change
  useEffect(() => {
    const handleResize = () => {
      isMobileRef.current = window.innerWidth <= 768
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  // Mielo lightbox handlers
  const mieloLightboxEnterTimerRef = useRef(null)
  useEffect(() => {
    if (mieloLightboxOpen) {
      setMieloLightboxEntering(true)
      if (mieloLightboxEnterTimerRef.current) clearTimeout(mieloLightboxEnterTimerRef.current)
      mieloLightboxEnterTimerRef.current = setTimeout(() => setMieloLightboxEntering(false), 1600)
    } else {
      setMieloLightboxEntering(false)
    }
    return () => { if (mieloLightboxEnterTimerRef.current) clearTimeout(mieloLightboxEnterTimerRef.current) }
  }, [mieloLightboxOpen])

  // Mielo lightbox ESC key handler
  useEffect(() => {
    if (!mieloLightboxOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') handleCloseMieloLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mieloLightboxOpen])

  const openMieloLightboxAt = (index) => {
    // Always use the current frame index to ensure correct image is shown
    setMieloLightboxIndex(mieloFrame)
    setMieloLightboxOpen(true)
  }
  const handleCloseMieloLightbox = () => {
    setMieloLightboxClosing(true)
    setTimeout(() => { setMieloLightboxOpen(false); setMieloLightboxClosing(false) }, 140)
  }

  // Simple touch swipe for lightbox
  const touchStartXRef2 = useRef(0)
  const todoTouchStartYRef = useRef(0)
  const onTouchStart = (e) => { if (!lightboxOpen) return; if (e.touches && e.touches[0]) touchStartXRef2.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (!lightboxOpen) return
    const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : touchStartXRef2.current
    const dx = endX - touchStartXRef2.current
    if (Math.abs(dx) > 28) { if (dx < 0) nextImage(); else prevImage() }
  }

  // Todoalrojo mobile swipe (stacked mobile view): swipe up/down to change frames
  const onTodoMobileTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return
    todoTouchStartYRef.current = e.touches[0].clientY
    touchStartXRef.current = e.touches[0].clientX
  }
  const onTodoMobileTouchEnd = (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return
    const endY = e.changedTouches[0].clientY
    const endX = e.changedTouches[0].clientX
    const dy = endY - (todoTouchStartYRef.current || 0)
    const dx = endX - (touchStartXRef.current || 0)
    const threshold = 14
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return
    // Horizontal swipe: next/prev frame with left/right slide animation
    if (Math.abs(dx) > Math.abs(dy)) {
      const dir = dx < 0 ? 1 : -1
      const d = dir > 0 ? 'right' : 'left'
      setEnterDirTodoalrojo(d)
      setTodoMobileDir(d)
      setTodoalrojoFrame((i) => (i + dir + TOTAL_TODO_FRAMES) % TOTAL_TODO_FRAMES)
      if (todoMobileTimerRef.current) clearTimeout(todoMobileTimerRef.current)
      todoMobileTimerRef.current = setTimeout(() => { setTodoMobileDir(''); setEnterDirTodoalrojo('') }, 900)
    } else {
      // Vertical swipe: next/prev without directional slide
      const dir = dy < 0 ? 1 : -1
      setEnterDirTodoalrojo('')
      // set vertical animation direction similar to Miela's gentle fade/slide
      const vd = dir > 0 ? 'up' : 'down'
      setTodoMobileVertDir(vd)
      setTodoMobileKey((k) => k + 1)
      if (todoMobileVertTimerRef.current) clearTimeout(todoMobileVertTimerRef.current)
      todoMobileVertTimerRef.current = setTimeout(() => setTodoMobileVertDir(''), 900)
      setTodoalrojoFrame((i) => (i + dir + TOTAL_TODO_FRAMES) % TOTAL_TODO_FRAMES)
    }
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

  // Preload key assets to avoid flashes across browsers (skip martellImage1 to avoid flicker before video loads)
  useEffect(() => {
    const imgs = [martelDayImage, martellImage2, martellImage3]
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
  // === MIELA MOBILE TOUCH: uses exact TODOALROJO animation logic ===
  const onMobileTouchStart = (e) => {
    if (window.innerWidth >= 768) return
    if (!e.touches || e.touches.length === 0) return
    touchStartYRef.current = e.touches[0].clientY
    touchStartXRef.current = e.touches[0].clientX
  }
  const onMobileTouchEnd = (e) => {
    if (window.innerWidth >= 768) return
    if (!e.changedTouches || e.changedTouches.length === 0) return
    const endY = e.changedTouches[0].clientY
    const endX = e.changedTouches[0].clientX
    const dy = endY - touchStartYRef.current
    const dx = endX - touchStartXRef.current
    const threshold = 14
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return
    // Horizontal swipe: next/prev frame with left/right slide animation (EXACT TODOALROJO LOGIC)
    if (Math.abs(dx) > Math.abs(dy)) {
      const dir = dx < 0 ? 1 : -1
      const d = dir > 0 ? 'right' : 'left'
      setEnterDirMobile(d)
      setMielaMobileDir(d)
      setMobileFrame((i) => (i + dir + TOTAL_MIELA_FRAMES) % TOTAL_MIELA_FRAMES)
      if (mielaMobileTimerRef.current) clearTimeout(mielaMobileTimerRef.current)
      mielaMobileTimerRef.current = setTimeout(() => { setMielaMobileDir(''); setEnterDirMobile('') }, 900)
    } else {
      // Vertical swipe: next/prev without directional slide (EXACT TODOALROJO LOGIC)
      const dir = dy < 0 ? 1 : -1
      setEnterDirMobile('')
      setMielaMobileDir('')
      // set vertical animation direction similar to Todoalrojo's approach
      const vd = dir > 0 ? 'up' : 'down'
      setMielaMobileVertDir(vd)
      setMielaMobileKey((k) => k + 1)
      if (mielaMobileVertTimerRef.current) clearTimeout(mielaMobileVertTimerRef.current)
      mielaMobileVertTimerRef.current = setTimeout(() => setMielaMobileVertDir(''), 900)
      setMobileFrame((i) => (i + dir + TOTAL_MIELA_FRAMES) % TOTAL_MIELA_FRAMES)
    }
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

  // Todoalrojo navigation (same pattern as Miela)
  useEffect(() => {
    if (slug !== 'todoalrojo') return undefined
    if (typeof window === 'undefined') return undefined

    const stepByDir = (dir) => {
      if (dir === 0) return
      setTodoalrojoFrame((i) => (i + (dir > 0 ? 1 : -1) + TOTAL_TODO_FRAMES) % TOTAL_TODO_FRAMES)
    }

    const lockMs = 60
    const onWheel = (e) => {
      const now = Date.now()
      const dy = e.deltaY || 0
      if (Math.abs(dy) < 1) return
      if (e && typeof e.preventDefault === 'function') e.preventDefault()
      if (!wheelGestureActiveRef.current && now - lastStepTimeRef.current >= lockMs) {
        const dir = dy > 0 ? 1 : -1
        setEnterDirTodoalrojo(dir > 0 ? 'right' : 'left')
        stepByDir(dir)
        lastStepTimeRef.current = now
        wheelGestureActiveRef.current = true
      }
      if (wheelGestureTimerRef.current) clearTimeout(wheelGestureTimerRef.current)
      wheelGestureTimerRef.current = setTimeout(() => {
        wheelGestureActiveRef.current = false
        wheelGestureTimerRef.current = null
      }, 60)
    }

    const onKey = (e) => {
      const k = e.key
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","PageUp","PageDown"].includes(k)) {
        if (typeof e.preventDefault === 'function') e.preventDefault()
      }
      const now = Date.now()
      if (now - lastStepTimeRef.current < 60) return
      if (k === 'ArrowRight') { setEnterDirTodoalrojo('right'); stepByDir(1); lastStepTimeRef.current = now; return }
      if (k === 'ArrowLeft')  { setEnterDirTodoalrojo('left'); stepByDir(-1); lastStepTimeRef.current = now; return }
      if (k === 'ArrowDown' || k === 'PageDown') { setEnterDirTodoalrojo(''); stepByDir(1); lastStepTimeRef.current = now; return }
      if (k === 'ArrowUp'   || k === 'PageUp')   { setEnterDirTodoalrojo(''); stepByDir(-1); lastStepTimeRef.current = now; return }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      if (wheelGestureTimerRef.current) clearTimeout(wheelGestureTimerRef.current)
    }
  }, [slug])

  // Mielo navigation (same pattern as Todoalrojo)
  useEffect(() => {
    if (slug !== 'mielo') return undefined
    if (typeof window === 'undefined') return undefined

    const stepByDir = (dir) => {
      if (dir === 0) return
      setMieloFrame((i) => (i + (dir > 0 ? 1 : -1) + TOTAL_MIELO_FRAMES) % TOTAL_MIELO_FRAMES)
    }

    const lockMs = 60
    const onWheel = (e) => {
      const now = Date.now()
      const dy = e.deltaY || 0
      if (Math.abs(dy) < 1) return
      if (e && typeof e.preventDefault === 'function') e.preventDefault()
      if (!mieloWheelGestureActiveRef.current && now - mieloLastStepTimeRef.current >= lockMs) {
        const dir = dy > 0 ? 1 : -1
        setEnterDirMielo(dir > 0 ? 'right' : 'left')
        stepByDir(dir)
        mieloLastStepTimeRef.current = now
        mieloWheelGestureActiveRef.current = true
      }
      if (mieloWheelGestureTimerRef.current) clearTimeout(mieloWheelGestureTimerRef.current)
      mieloWheelGestureTimerRef.current = setTimeout(() => {
        mieloWheelGestureActiveRef.current = false
        mieloWheelGestureTimerRef.current = null
      }, 60)
    }

    const onKey = (e) => {
      const k = e.key
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","PageUp","PageDown"].includes(k)) {
        if (typeof e.preventDefault === 'function') e.preventDefault()
      }
      const now = Date.now()
      if (now - mieloLastStepTimeRef.current < 60) return
      if (k === 'ArrowRight') { setEnterDirMielo('right'); stepByDir(1); mieloLastStepTimeRef.current = now; return }
      if (k === 'ArrowLeft')  { setEnterDirMielo('left'); stepByDir(-1); mieloLastStepTimeRef.current = now; return }
      if (k === 'ArrowDown' || k === 'PageDown') { setEnterDirMielo(''); stepByDir(1); mieloLastStepTimeRef.current = now; return }
      if (k === 'ArrowUp'   || k === 'PageUp')   { setEnterDirMielo(''); stepByDir(-1); mieloLastStepTimeRef.current = now; return }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      if (mieloWheelGestureTimerRef.current) clearTimeout(mieloWheelGestureTimerRef.current)
    }
  }, [slug])

  // Mielo mobile touch handlers
  const onMieloTouchStart = (e) => {
    if (window.innerWidth >= 768) return
    if (!e.touches || e.touches.length === 0) return
    mieloTouchStartYRef.current = e.touches[0].clientY
    mieloTouchStartXRef.current = e.touches[0].clientX
  }
  const onMieloTouchEnd = (e) => {
    if (window.innerWidth >= 768) return
    if (!e.changedTouches || e.changedTouches.length === 0) return
    const endY = e.changedTouches[0].clientY
    const endX = e.changedTouches[0].clientX
    const dy = endY - mieloTouchStartYRef.current
    const dx = endX - mieloTouchStartXRef.current
    const threshold = 14
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return
    // Horizontal swipe: next/prev frame with left/right slide animation
    if (Math.abs(dx) > Math.abs(dy)) {
      const dir = dx < 0 ? 1 : -1
      const d = dir > 0 ? 'right' : 'left'
      setEnterDirMielo(d)
      setMieloFrame((i) => (i + dir + TOTAL_MIELO_FRAMES) % TOTAL_MIELO_FRAMES)
    } else {
      // Vertical swipe: next/prev without directional slide
      const dir = dy < 0 ? 1 : -1
      setEnterDirMielo('')
      setMieloFrame((i) => (i + dir + TOTAL_MIELO_FRAMES) % TOTAL_MIELO_FRAMES)
    }
  }

  return (
    <div className={`min-h-screen bg-[#06080a] px-[clamp(12px,3vw,24px)] relative flex flex-col overflow-x-hidden ${slug === 'miela' ? 'miela-mobile-no-scroll' : ''} ${slug === 'todoalrojo' ? 'todoalrojo-mobile-compact todoalrojo-compact' : ''}`} style={{ ['--nav-h']: 'clamp(72px, 12vh, 120px)' }}>
      {/* Fixed background */}
      <div className="page-fixed-bg" aria-hidden style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${csBG})` }} />
      <div className="page-fixed-overlay" aria-hidden />

      {/* Navbar (same style as case study) */}
      <div className={`liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative ${mieloLightboxOpen ? 'hidden' : ''}`}>
        {/* Inline SVGs to ensure exact color #e4c492 */}
        <svg
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left sub-anim-svg-left"
          viewBox="0 0 65 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path fill="#e4c492" d="M63.7782 8.95022C62.9948 6.10936 59.9213 4.33765 57.4957 6.65921C53.217 10.7372 60.8102 14.6625 60.4185 9.40842C61.2622 9.79025 61.6539 10.5997 61.2622 11.9285C60.3883 14.9221 57.8271 14.9374 55.6275 14.3723C53.4731 13.8224 51.6501 12.3256 49.6012 11.4856C44.8253 9.51533 37.5484 12.0507 36.5842 12.402C26.4147 16.4495 19.0174 22.9712 11.0324 22.1312C5.09645 21.505 2.64071 16.2967 2.88176 11.6994C3.10775 7.31596 5.77441 2.88667 11.2283 2.88667C15.3413 2.88667 17.8723 6.59811 17.8723 9.27096C17.8723 12.8297 14.377 14.6625 13.1266 13.074C12.1021 11.7758 13.6991 11.0121 14.2415 9.94299C15.5673 7.37706 12.9157 5.54425 10.5955 6.23155C8.06443 6.99522 7.22075 9.43897 8.00417 11.8827C9.08892 15.2734 11.5145 16.5106 14.4373 16.5106C17.8422 16.5106 20.7198 13.1962 20.7198 9.27096C20.7198 4.88749 16.8177 0 11.2132 0C3.92131 0 0.290421 5.98718 0.0192337 11.562C-0.29715 17.6561 3.28854 24.2389 10.7311 25.0178C14.5428 25.4149 18.2791 24.3611 21.9401 22.7726C20.1172 25.4608 18.8818 28.7751 18.8818 32.8226C18.8818 40.9022 24.0042 46.7519 31.0701 46.7519C36.1774 46.7519 40.3206 43.0557 40.3206 38.5043C40.3206 35.9078 38.9496 33.296 36.8403 31.8451C34.8667 30.4857 32.4411 30.2719 30.0305 31.2494L30.0607 31.3258C27.0023 32.4865 25.6765 37.0686 27.9514 39.0694C29.3676 40.3218 32.1096 40.6425 33.2697 38.8555C33.7518 38.1072 33.8422 37.1144 33.4053 36.3049C32.9081 35.3732 32.2 35.3427 31.4015 35.1594C31.0399 33.8611 33.1793 32.8073 35.2584 34.2277C36.5993 35.1441 37.4882 36.8547 37.4882 38.5043C37.4882 41.0855 35.0475 43.8499 31.0851 43.8499C25.5861 43.8499 21.7443 39.3137 21.7443 32.8073C21.7443 21.4439 33.7066 16.6633 37.6238 15.0901C40.2 14.1432 42.7311 13.6392 45.232 13.9141C48.426 14.2654 51.8309 16.6175 51.8309 20.2678C51.8309 26.1175 46.0456 26.0259 45.6087 24.4985C45.1416 22.8643 46.7386 22.1923 47.6727 21.3064C49.4806 19.5805 48.0494 17.2742 45.8648 17.0298C43.5597 16.7702 41.6765 18.603 41.2998 20.8329C40.8479 23.5669 42.8516 28.2405 47.4467 28.2405C52.4486 28.2405 54.6784 24.2389 54.6784 20.2678C54.6784 18.6794 54.2565 17.2589 53.5484 16.0371C55.3413 16.9229 57.1944 17.4575 59.3337 16.9688C62.7688 16.1745 64.6972 12.3256 63.7782 8.95022Z"/>
        </svg>
        <svg
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right sub-anim-svg-right"
          viewBox="0 0 66 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path fill="#e4c492" d="M1.22576 8.61765C2.00919 5.88235 5.08263 4.17647 7.50824 6.41176C11.787 10.3382 4.19374 14.1176 4.58546 9.05882C3.74177 9.42647 3.35005 10.2059 3.74177 11.4853C4.61559 14.3676 7.17679 14.3824 9.37642 13.8382C11.5308 13.3088 13.3538 11.8676 15.4028 11.0588C20.1787 9.16176 27.4555 11.6029 28.4197 11.9412C38.5892 15.8382 45.9866 22.1176 53.9715 21.3088C59.9075 20.7059 62.3632 15.6912 62.1222 11.2647C61.8962 7.04412 59.2295 2.77941 53.7757 2.77941C49.6627 2.77941 47.1316 6.35294 47.1316 8.92647C47.1316 12.3529 50.6269 14.1176 51.8774 12.5882C52.9018 11.3382 51.3049 10.6029 50.7625 9.57353C49.4367 7.10294 52.0883 5.33824 54.4084 6C56.9395 6.73529 57.7832 9.08824 56.9998 11.4412C55.915 14.7059 53.4894 15.8971 50.5666 15.8971C47.1617 15.8971 44.2841 12.7059 44.2841 8.92647C44.2841 4.70588 48.1862 0 53.7907 0C61.0826 0 64.7135 5.76471 64.9847 11.1324C65.3011 17 61.7154 23.3382 54.2728 24.0882C50.4612 24.4706 46.7248 23.4559 43.0638 21.9265C44.8868 24.5147 46.1222 27.7059 46.1222 31.6029C46.1222 39.3824 40.9998 45.0147 33.9339 45.0147C28.8265 45.0147 24.6834 41.4559 24.6834 37.0735C24.6834 34.5735 26.0544 32.0588 28.1636 30.6618C30.1372 29.3529 32.5629 29.1471 34.9734 30.0882L34.9433 30.1618C38.0017 31.2794 39.3275 35.6912 37.0525 37.6176C35.6363 38.8235 32.8943 39.1324 31.7342 37.4118C31.2521 36.6912 31.1617 35.7353 31.5986 34.9559C32.0958 34.0588 32.8039 34.0294 33.6024 33.8529C33.964 32.6029 31.8246 31.5882 29.7455 32.9559C28.4047 33.8382 27.5158 35.4853 27.5158 37.0735C27.5158 39.5588 29.9565 42.2206 33.9188 42.2206C39.4179 42.2206 43.2597 37.8529 43.2597 31.5882C43.2597 20.6471 31.2973 16.0441 27.3802 14.5294C24.8039 13.6176 22.2728 13.1324 19.7719 13.3971C16.5779 13.7353 13.173 16 13.173 19.5147C13.173 25.1471 18.9583 25.0588 19.3953 23.5882C19.8623 22.0147 18.2653 21.3676 17.3312 20.5147C15.5233 18.8529 16.9546 16.6324 19.1391 16.3971C21.4442 16.1471 23.3275 17.9118 23.7041 20.0588C24.1561 22.6912 22.1523 27.1912 17.5572 27.1912C12.5553 27.1912 10.3256 23.3382 10.3256 19.5147C10.3256 17.9853 10.7474 16.6176 11.4555 15.4412C9.66267 16.2941 7.80956 16.8088 5.6702 16.3382C2.23518 15.5735 0.306738 11.8676 1.22576 8.61765Z"/>
        </svg>

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
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-1-mobile.webp' }}
                />
                <img
                  src={mielaImageMobile2}
                  alt="Miela case artwork 2 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 1 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 1 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 1 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-2-mobile.webp' }}
                />
                <img
                  src={mielaImageMobile3}
                  alt="Miela case artwork 3 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 2 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 2 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 2 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-3-mobile.webp' }}
                />
                <img
                  src={mielaImageMobile4}
                  alt="Miela case artwork 4 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 3 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 3 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 3 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-4-mobile.webp' }}
                />
                <img
                  src={mielaImageMobile5}
                  alt="Miela case artwork 5 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 4 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 4 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 4 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-5-mobile.webp' }}
                />
                <img
                  src={mielaImageMobile6}
                  alt="Miela case artwork 6 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 5 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 5 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 5 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-6-mobile.webp' }}
                />
                <img
                  src={mielaImageMobile7}
                  alt="Miela case artwork 7 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 6 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 6 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 6 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-7-mobile.webp' }}
                />
                <img
                  src={mielaImageMobile8}
                  alt="Miela case artwork 8 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 7 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 7 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 7 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-8-mobile.webp' }}
                />
                <img
                  src={mielaImageMobile9}
                  alt="Miela case artwork 9 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 8 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 8 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 8 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-9-mobile.webp' }}
                />
                <img
                  src={mielaImageMobile10}
                  alt="Miela case artwork 10 (mobile)"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-auto max-w-[94vw] object-contain ${enterDirMobile === 'left' && mobileFrame === 9 ? 'miela-enter-left' : ''} ${enterDirMobile === 'right' && mobileFrame === 9 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: mobileFrame === 9 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-10-mobile.webp' }}
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
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-1.webp' }}
                />
                <img
                  src={mielaImage2}
                  alt="Miela case artwork 2"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 1 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 1 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 1 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-2.webp' }}
                />
                <img
                  src={mielaImage3}
                  alt="Miela case artwork 3"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 2 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 2 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 2 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-3.webp' }}
                />
                <img
                  src={mielaImage4}
                  alt="Miela case artwork 4"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 3 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 3 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 3 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-4.webp' }}
                />
                <img
                  src={mielaImage5}
                  alt="Miela case artwork 5"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[54vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 4 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 4 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 4 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-5.webp' }}
                />
                <img
                  src={mielaImage6}
                  alt="Miela case artwork 6"
                  decoding="async"
                  loading="lazy"
                  className={`swap-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[94vw] h-[58vh] object-contain ${enterDirDesktop === 'left' && desktopFrame === 5 ? 'miela-enter-left' : ''} ${enterDirDesktop === 'right' && desktopFrame === 5 ? 'miela-enter-right' : ''}`}
                  style={{ opacity: desktopFrame === 5 ? 1 : 0 }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/miela-6.webp' }}
                />
              </div>
            </div>

        {/* Smooth infinite marquee of b1..b6 images */}
        <div key={`miela-carousel-${carouselKey}`} className="content-layer marquee-bleed marquee-dock flex justify-center items-center miela-marquee-in">
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
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/b${(i%6)+1}.webp` }}
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
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/b${(i%6)+1}.webp` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Todoalrojo: two-column body layout with navigation */}
        {slug === 'todoalrojo' && (
          <div className="w-full min-h-[calc(100dvh-var(--nav-h)-10vh)] flex items-center justify-center relative">
            {/* Desktop/Tablet (md+): original 2-column carousel */}
            <div className="hidden md:block relative w-full max-w-[1540px] 2xl:max-w-[2000px] todoalrojo-ultrawide-adjust h-[70vh] todoalrojo-desktop">
              {/* Frame 0: todoalrojo-dashboard + todo-1 */}
              <div className="absolute inset-0 grid grid-cols-2 gap-12 md:gap-16 2xl:gap-24 px-[clamp(12px,3vw,24px)]" style={{ opacity: todoalrojoFrame === 0 ? 1 : 0, transition: 'opacity 1600ms ease' }}>
                <div className="h-full flex items-center justify-center">
                  <div className={`rounded-[clamp(10px,1vw,18px)] overflow-hidden max-h-full max-w-full ${todoEntryAnim ? 'miela-hero-in' : ''} ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 0 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 0 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todoalrojoDashboard}
                      alt="Todoalrojo Dashboard"
                      decoding="async"
                      loading="eager"
                      className="max-w-full max-h-[70vh] object-contain cursor-pointer"
                      onClick={() => openLightboxAt(0)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') openLightboxAt(0) }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-dashboard.webp' }}
                    />
                  </div>
                </div>
                <div className="h-full flex items-center justify-center">
                  <div className={`max-h-full max-w-full ${todoEntryAnim ? 'miela-hero-in' : ''} ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 0 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 0 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todo1}
                      alt="Todo 1"
                      decoding="async"
                      loading="eager"
                      className="max-w-full max-h-[70vh] object-contain"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todo-1.webp' }}
                    />
                  </div>
                </div>
              </div>

              {/* Frame 1: todoalrojo-task (left) + todo-2 (right) */}
              <div className="absolute inset-0 grid grid-cols-2 gap-12 md:gap-16 2xl:gap-24 px-[clamp(12px,3vw,24px)]" style={{ opacity: todoalrojoFrame === 1 ? 1 : 0, transition: 'opacity 1600ms ease' }}>
                <div className="h-full flex items-center justify-center">
                  <div className={`rounded-[clamp(10px,1vw,18px)] overflow-hidden max-h-full max-w-full ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 1 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 1 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todoalrojoTask}
                      alt="Todoalrojo Task"
                      decoding="async"
                      loading="lazy"
                      className="max-w-full max-h-[70vh] object-contain cursor-pointer"
                      onClick={() => openLightboxAt(3)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') openLightboxAt(3) }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-task.webp' }}
                    />
                  </div>
                </div>
                <div className="h-full flex items-center justify-center">
                  <div className={`max-h-full max-w-full ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 1 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 1 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todo2}
                      alt="Todo 2"
                      decoding="async"
                      loading="lazy"
                      className="max-w-full max-h-[70vh] object-contain"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todo-2.webp' }}
                    />
                  </div>
                </div>
              </div>

              {/* Frame 2: todoalrojo-shop (left) + todo-3 (right) */}
              <div className="absolute inset-0 grid grid-cols-2 gap-12 md:gap-16 2xl:gap-24 px-[clamp(12px,3vw,24px)]" style={{ opacity: todoalrojoFrame === 2 ? 1 : 0, transition: 'opacity 1600ms ease' }}>
                <div className="h-full flex items-center justify-center">
                  <div className={`rounded-[clamp(10px,1vw,18px)] overflow-hidden max-h-full max-w-full ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 2 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 2 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todoalrojoShop}
                      alt="Todoalrojo Shop"
                      decoding="async"
                      loading="lazy"
                      className="max-w-full max-h-[70vh] object-contain cursor-pointer"
                      onClick={() => openLightboxAt(4)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') openLightboxAt(4) }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-shop.webp' }}
                    />
                  </div>
                </div>
                <div className="h-full flex items-center justify-center">
                  <div className={`max-h-full max-w-full ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 2 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 2 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todo3}
                      alt="Todo 3"
                      decoding="async"
                      loading="lazy"
                      className="max-w-full max-h-[70vh] object-contain"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todo-3.webp' }}
                    />
                  </div>
                </div>
              </div>

              {/* Frame 3: todo-4 + vip (left) + todoalrojo-leaderboard (right) */}
              <div className="absolute inset-0 grid grid-cols-2 gap-12 md:gap-16 2xl:gap-24 px-[clamp(12px,3vw,24px)]" style={{ opacity: todoalrojoFrame === 3 ? 1 : 0, transition: 'opacity 1600ms ease' }}>
                <div className="h-full flex flex-col justify-center items-center gap-8">
                  {/* Todo-4 on top with spacing from VIP */}
                  <div className={`${enterDirTodoalrojo === 'left' && todoalrojoFrame === 3 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 3 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todo4}
                      alt="Todo 4"
                      decoding="async"
                      loading="lazy"
                      className="w-auto max-w-full h-auto object-contain"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todo-4.webp' }}
                    />
                  </div>
                  {/* VIP image, rounded and constrained */}
                  <div className={`rounded-[clamp(10px,1vw,18px)] overflow-hidden w-full max-w-[90%] ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 3 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 3 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todoalrojoVip}
                      alt="Todoalrojo VIP"
                      decoding="async"
                      loading="lazy"
                      className="w-full h-auto object-cover"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-vip.webp' }}
                    />
                  </div>
                </div>
                <div className="h-full flex items-center justify-center">
                  <div className={`rounded-[clamp(10px,1vw,18px)] overflow-hidden max-w-full ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 3 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 3 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todoalrojoLeaderboard}
                      alt="Todoalrojo Leaderboard"
                      decoding="async"
                      loading="lazy"
                      className="max-w-full max-h-[70vh] object-contain"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-leaderboard.webp' }}
                    />
                  </div>
                </div>
              </div>

              {/* Frame 4: todo-5 (top-left) + rojo-3 full-width under; right column 2x2 cards */}
              <div className="absolute inset-0 grid grid-cols-2 gap-12 md:gap-16 2xl:gap-24 px-[clamp(12px,3vw,24px)]" style={{ opacity: todoalrojoFrame === 4 ? 1 : 0, transition: 'opacity 1600ms ease' }}>
                {/* Left column: split into two rows, fill parent */}
                <div className="h-full min-h-0 grid grid-rows-[1fr_1fr] gap-6 md:gap-8">
                  <div className={`rounded-[clamp(10px,1vw,18px)] overflow-hidden flex items-center justify-center ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 4 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 4 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todo5}
                      alt="Todo 5"
                      decoding="async"
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todo-5.webp' }}
                    />
                  </div>
                  <div className={`rounded-[clamp(10px,1vw,18px)] overflow-hidden relative ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 4 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 4 ? 'miela-enter-right' : ''}`}>
                    <img
                      src={todoalrojo1}
                      alt="Todoalrojo slide 1"
                      decoding="async"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: rojoSlide === 0 ? 1 : 0, transition: 'opacity 2400ms ease-in-out', willChange: 'opacity' }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-1.webp' }}
                    />
                    <img
                      src={todoalrojo2}
                      alt="Todoalrojo slide 2"
                      decoding="async"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: rojoSlide === 1 ? 1 : 0, transition: 'opacity 2400ms ease-in-out', willChange: 'opacity' }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-2.webp' }}
                    />
                    {/* Background fallback (3) visible briefly while first image fades in */}
                    <img
                      src={todoalrojo3}
                      alt="Todoalrojo background"
                      decoding="async"
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{ opacity: 0.0001 }}
                      aria-hidden
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-3.webp' }}
                    />
                  </div>
                </div>
                {/* Right column: cards side-by-side, allow overflow at bottom */}
                <div className={`grid grid-cols-2 gap-x-[20px] items-end pb-[40px] ${enterDirTodoalrojo === 'left' && todoalrojoFrame === 4 ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' && todoalrojoFrame === 4 ? 'miela-enter-right' : ''}`}>
                  {/* Left cell: card-1 ⇄ card-3, each image in its own wrapper using 90% height, bottom-aligned (no gap) */}
                  <div className="relative h-full min-h-0 overflow-hidden">
                    <div
                      className="absolute left-0 right-0 bottom-0 h-[90%]"
                      style={{ opacity: rojoCardsSlide === 0 ? 1 : 0, transition: 'opacity 1200ms ease-in-out', willChange: 'opacity' }}
                    >
                      <img
                        src={todoalrojoCards[0]}
                        alt="Todoalrojo card 1"
                        decoding="async"
                        loading="lazy"
                        className="absolute inset-x-0 bottom-0 w-full h-auto max-h-full object-contain block"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-card-1.webp' }}
                      />
                    </div>
                    <div
                      className="absolute left-0 right-0 bottom-0 h-[90%]"
                      style={{ opacity: rojoCardsSlide === 1 ? 1 : 0, transition: 'opacity 1200ms ease-in-out', willChange: 'opacity' }}
                    >
                      <img
                        src={todoalrojoCards[2]}
                        alt="Todoalrojo card 3"
                        decoding="async"
                        loading="lazy"
                        className="absolute inset-x-0 bottom-0 w-full h-auto max-h-full object-contain block"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-card-3.webp' }}
                      />
                    </div>
                  </div>

                  {/* Right cell: card-2 ⇄ card-4, each image in its own wrapper using 90% height, bottom-aligned (no gap) */}
                  <div className="relative h-full min-h-0 overflow-hidden">
                    <div
                      className="absolute left-0 right-0 bottom-0 h-[90%]"
                      style={{ opacity: rojoCardsSlide === 0 ? 1 : 0, transition: 'opacity 1200ms ease-in-out', willChange: 'opacity' }}
                    >
                      <img
                        src={todoalrojoCards[1]}
                        alt="Todoalrojo card 2"
                        decoding="async"
                        loading="lazy"
                        className="absolute inset-x-0 bottom-0 w-full h-auto max-h-full object-contain block"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-card-2.webp' }}
                      />
                    </div>
                    <div
                      className="absolute left-0 right-0 bottom-0 h-[90%]"
                      style={{ opacity: rojoCardsSlide === 1 ? 1 : 0, transition: 'opacity 1200ms ease-in-out', willChange: 'opacity' }}
                    >
                      <img
                        src={todoalrojoCards[3]}
                        alt="Todoalrojo card 4"
                        decoding="async"
                        loading="lazy"
                        className="absolute inset-x-0 bottom-0 w-full h-auto max-h-full object-contain block"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-card-4.webp' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile (sm only): stack mobile-specific Todo first, then Todoalrojo-1 beneath */}
            <div className="md:hidden w-full px-[clamp(12px,3vw,24px)] miela-hero-in miela-touch todoalrojo-mobile" onTouchStart={onTodoMobileTouchStart} onTouchMove={(e)=>e.preventDefault()} onTouchEnd={onTodoMobileTouchEnd}>
              <div className="w-full mx-auto flex flex-col items-center justify-start gap-0 py-0 min-w-0">
                <div key={`todo-mob-top-${todoMobileKey}`} className={`w-full h-[48vh] flex items-start ${todoMobileDir === 'left' ? 'miela-enter-left' : ''} ${todoMobileDir === 'right' ? 'miela-enter-right' : ''} ${todoMobileVertDir === 'up' ? 'miela-enter-up' : ''} ${todoMobileVertDir === 'down' ? 'miela-enter-down' : ''}`}>
                  <img
                    src={
                      todoalrojoFrame === 0 ? todoMobile1 :
                      (todoalrojoFrame === 2 ? todoMobile3 :
                      (todoalrojoFrame === 3 ? todoMobile4 :
                      (todoalrojoFrame === 4 ? todoMobile5 : todoMobile2)))
                    }
                    alt={
                      todoalrojoFrame === 0 ? 'Todo mobile 1 (mobile-specific)' :
                      (todoalrojoFrame === 2 ? 'Todo mobile 3 (mobile-specific)' :
                      (todoalrojoFrame === 3 ? 'Todo mobile 4 (mobile-specific)' :
                      (todoalrojoFrame === 4 ? 'Todo mobile 5 (mobile-specific)' : 'Todo mobile 2 (mobile-specific)')))
                    }
                    decoding="async"
                    loading="eager"
                    className={`block w-full h-full object-contain object-top rounded-[clamp(10px,1vw,18px)] swap-img ${enterDirTodoalrojo === 'left' ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' ? 'miela-enter-right' : ''}`}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = (todoalrojoFrame === 0 ? '/todo-mobile-1.webp' : (todoalrojoFrame === 2 ? '/todo-mobile-3.webp' : (todoalrojoFrame === 3 ? '/todo-mobile-4.webp' : (todoalrojoFrame === 4 ? '/todo-mobile-5.webp' : '/todo-mobile-2.webp')))) }}
                  />
                </div>
                <div key={`todo-mob-bot-${todoMobileKey}`} className={`w-full h-[25vh] ${todoMobileDir === 'left' ? 'miela-enter-left' : ''} ${todoMobileDir === 'right' ? 'miela-enter-right' : ''} ${todoMobileVertDir === 'up' ? 'miela-enter-up' : ''} ${todoMobileVertDir === 'down' ? 'miela-enter-down' : ''}`}>
                  {todoalrojoFrame === 4 ? (
                    <div className="grid grid-cols-2 h-full gap-x-[20px] items-end">
                      {/* Left card stack: 1 ⇄ 3 */}
                      <div className="relative h-full min-h-0 overflow-hidden rounded-[clamp(16px,2.5vw,28px)]">
                        <img
                          src={todoalrojoCards[0]}
                          alt="Todoalrojo card 1"
                          decoding="async"
                          loading="lazy"
                          className={`absolute inset-0 w-full h-full object-contain swap-img ${enterDirTodoalrojo === 'left' ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' ? 'miela-enter-right' : ''}`}
                          style={{ opacity: rojoCardsSlide === 0 ? 1 : 0, transition: 'opacity 1200ms ease-in-out' }}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-card-1.webp' }}
                        />
                        <img
                          src={todoalrojoCards[2]}
                          alt="Todoalrojo card 3"
                          decoding="async"
                          loading="lazy"
                          className={`absolute inset-0 w-full h-full object-contain swap-img ${enterDirTodoalrojo === 'left' ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' ? 'miela-enter-right' : ''}`}
                          style={{ opacity: rojoCardsSlide === 1 ? 1 : 0, transition: 'opacity 1200ms ease-in-out' }}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-card-3.webp' }}
                        />
                      </div>
                      {/* Right card stack: 2 ⇄ 4 */}
                      <div className="relative h-full min-h-0 overflow-hidden rounded-[clamp(16px,2.5vw,28px)]">
                        <img
                          src={todoalrojoCards[1]}
                          alt="Todoalrojo card 2"
                          decoding="async"
                          loading="lazy"
                          className={`absolute inset-0 w-full h-full object-contain swap-img ${enterDirTodoalrojo === 'left' ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' ? 'miela-enter-right' : ''}`}
                          style={{ opacity: rojoCardsSlide === 0 ? 1 : 0, transition: 'opacity 1200ms ease-in-out' }}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-card-2.webp' }}
                        />
                        <img
                          src={todoalrojoCards[3]}
                          alt="Todoalrojo card 4"
                          decoding="async"
                          loading="lazy"
                          className={`absolute inset-0 w-full h-full object-contain swap-img ${enterDirTodoalrojo === 'left' ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' ? 'miela-enter-right' : ''}`}
                          style={{ opacity: rojoCardsSlide === 1 ? 1 : 0, transition: 'opacity 1200ms ease-in-out' }}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-card-4.webp' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={
                        todoalrojoFrame === 0 ? todoalrojoDashboard :
                        (todoalrojoFrame === 2 ? todoalrojoShop :
                        (todoalrojoFrame === 3 ? todoalrojoVip : todoalrojoTask))
                      }
                      alt={
                        todoalrojoFrame === 0 ? 'Todoalrojo Dashboard' :
                        (todoalrojoFrame === 2 ? 'Todoalrojo Shop' :
                        (todoalrojoFrame === 3 ? 'Todoalrojo VIP' : 'Todoalrojo Task'))
                      }
                      decoding="async"
                      loading="lazy"
                      className={`block w-full ${todoalrojoFrame === 3 ? 'h-auto max-h-full object-contain object-center' : 'h-full object-cover object-top'} rounded-[clamp(20px,4vw,32px)] swap-img ${enterDirTodoalrojo === 'left' ? 'miela-enter-left' : ''} ${enterDirTodoalrojo === 'right' ? 'miela-enter-right' : ''}`}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = (todoalrojoFrame === 0 ? '/todoalrojo-dashboard.webp' : (todoalrojoFrame === 2 ? '/todoalrojo-shop.webp' : (todoalrojoFrame === 3 ? '/todoalrojo-vip.webp' : '/todoalrojo-task.webp'))) }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Todoalrojo: bottom marquee with two banners (same animation as Miela) */}
        {slug === 'todoalrojo' && (
          <div key={`todoalrojo-carousel-${carouselKey}`} className="content-layer marquee-bleed marquee-dock flex justify-center items-center miela-marquee-in todoalrojo-marquee">
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
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/rojo-banner-${(i%2)+1}.webp` }}
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
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/rojo-banner-${(i%2)+1}.webp` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Martell: split the page into two equal columns under the navbar */}
        {slug === 'martell' && (
          <div className="w-full min-h-[calc(100dvh-var(--nav-h))] pb-6 md:pb-10 lg:pt-0">
            {/* Large screens (lg+): two columns */}
            <div className="hidden lg:grid lg:grid-cols-[35%_63%] gap-4 md:gap-6 w-full h-full martell-grid">
              <div className="relative rounded-none h-full px-[8px] md:px-[20px] flex items-center justify-center">
                {/* Video layer: 90% of page height (minus navbar) */}
                <div className="relative h-[calc(100dvh-var(--nav-h))] w-full flex items-center justify-center compat-dvh">
                  <div className="h-[90%] w-auto rounded-[28px] md:rounded-[24px] overflow-hidden mx-auto martell-left-inner">
                    <video
                      src={martellVideo1}
                      className="block h-full w-auto max-w-full object-contain cursor-pointer martell-enter martell-delay-1"
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
                {/* Right column container: 90% of page height (minus navbar) */}
                <div className="relative h-[calc(100dvh-var(--nav-h))] w-full flex items-center justify-center compat-dvh">
                  <div className="h-[90%] w-full mx-auto lg:ml-[-30px] flex flex-col items-center lg:items-center justify-start gap-[30px] martell-right-inner">
                    <div className="h-[calc(65%_-_30px)] w-full flex items-center justify-center mb-[30px] martell-top">
                      <img
                        src={martellImage1}
                        alt="Martell artwork"
                        decoding="async"
                        loading="eager"
                        className="block h-full w-full object-contain slow-sway martell-enter martell-delay-1"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/martell-1.webp' }}
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
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/martell-1-mobile.webp' }}
                  />
                </div>
                {/* 2) martell video (left column video) */}
                <div className="w-full rounded-[20px] overflow-hidden martell-scroll" data-delay="140">
                  <video
                    src={martellVideo1}
                    className="block w-full h-auto object-contain cursor-pointer martell-enter martell-delay-2"
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
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/martell-2-mobile.webp' }}
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

        {(slug === 'todoalrojo') && (lightboxOpen || lightboxClosing) && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Todoalrojo gallery"
            className={`fixed inset-0 z[9998] lightbox-overlay ${lightboxClosing ? 'lightbox-fade-out' : 'lightbox-fade-in'}`}
            onClick={handleCloseLightbox}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(${csBG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button ref={closeBtnRef} className={`lightbox-close ${lightboxEntering ? 'controls-pop-in' : ''}`} aria-label="Close" onClick={handleCloseLightbox}>×</button>
            <button className="lightbox-chevron lightbox-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setEnterDir('right'); setCurrentIndex((i)=> (i - 1 + todoalrojoGallery.length) % todoalrojoGallery.length) }}>
              <span className={`chevron-content ${lightboxEntering ? 'controls-pop-in' : ''}`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </span>
            </button>
            <button className="lightbox-chevron lightbox-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); setEnterDir('left'); setCurrentIndex((i)=> (i + 1) % todoalrojoGallery.length) }}>
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
                <img
                  key={`t-i-${currentIndex}`}
                  src={todoalrojoGallery[currentIndex % todoalrojoGallery.length].src}
                  alt="Todoalrojo gallery item"
                  decoding="async"
                  fetchpriority="high"
                  loading="eager"
                  className={`lightbox-image ${enterDir === 'left' ? 'img-enter-left' : enterDir === 'right' ? 'img-enter-right' : ''}`}
                  onAnimationEnd={() => setEnterDir(null)}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/todoalrojo-dashboard.webp' }}
                />
              </div>
            </div>
            <div className={`lightbox-thumbs ${lightboxEntering ? 'thumbs-pop-in' : ''}`} role="listbox" aria-label="Thumbnails" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-thumbs-scroll" ref={thumbsScrollRef}>
                <div className="thumbs-inner" ref={thumbsInnerRef}>
                  {todoalrojoGallery.map((it, i) => (
                    <button
                      key={`t-${i}`}
                      role="option"
                      aria-selected={i === currentIndex}
                      className={`thumb ${i === currentIndex ? 'thumb-active' : ''}`}
                      onClick={() => setCurrentIndex(i)}
                      title={`View image ${i+1}`}
                    >
                      <img src={it.thumb || it.src} alt={`Thumbnail ${i + 1}`} loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mielo: single column with 70/30 split and navigation */}
        {slug === 'mielo' && (
          <>
            {/* Desktop: 9 desktop frames */}
            <div className="hidden md:flex w-full h-[calc(100dvh-var(--nav-h))] flex-col gap-4 relative" onTouchStart={onMieloTouchStart} onTouchMove={(e)=>e.preventDefault()} onTouchEnd={onMieloTouchEnd}>
              {/* Image container: 70% height with 9 frames */}
              <div className="h-[70%] px-[clamp(12px,3vw,24px)] flex items-center justify-center relative">
                {/* All 9 image frames stacked */}
                {mieloImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="rounded-[clamp(10px,1vw,18px)] overflow-hidden w-auto h-full absolute cursor-pointer"
                    style={{
                      opacity: mieloFrame === idx ? 1 : 0,
                      transition: 'opacity 1600ms ease',
                      willChange: 'opacity'
                    }}
                    onClick={() => openMieloLightboxAt(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') openMieloLightboxAt(idx) }}
                  >
                    <img
                      src={src}
                      alt={`Mielo design frame ${idx}`}
                      decoding="async"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className={`h-full w-auto object-contain ${enterDirMielo === 'left' && mieloFrame === idx ? 'miela-enter-left' : ''} ${enterDirMielo === 'right' && mieloFrame === idx ? 'miela-enter-right' : ''}`}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/mielo-${idx}.webp` }}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation dots in the gap */}
              <div className="absolute left-0 right-0 flex justify-center pointer-events-none" style={{ top: 'calc(70% + 8px)' }}>
                <div className="mielo-gap-dots flex justify-center gap-2">
                  {Array.from({ length: TOTAL_MIELO_FRAMES }).map((_, idx) => (
                    <div key={idx} className={`dot ${mieloFrame === idx ? 'active' : ''}`} />
                  ))}
                </div>
              </div>

              {/* Content container: 30% height */}
              <div className="h-[30%] px-[clamp(12px,3vw,24px)] flex items-center justify-center">
                {/* Add content here */}
              </div>
            </div>

            {/* Mobile: 9 mobile frames (mielo-0 + mielo-mobile-1 through 8) */}
            <div className="md:hidden w-full h-[calc(100dvh-var(--nav-h))] flex flex-col gap-4 relative" onTouchStart={onMieloTouchStart} onTouchMove={(e)=>e.preventDefault()} onTouchEnd={onMieloTouchEnd}>
              {/* Image container: 70% height with 9 frames */}
              <div className="h-[70%] px-[clamp(12px,3vw,24px)] flex items-center justify-center relative">
                {/* All 9 image frames stacked */}
                {mieloMobileImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="rounded-[clamp(10px,1vw,18px)] overflow-hidden w-auto h-full absolute cursor-pointer"
                    style={{
                      opacity: mieloFrame === idx ? 1 : 0,
                      transition: 'opacity 1600ms ease',
                      willChange: 'opacity'
                    }}
                    onClick={() => openMieloLightboxAt(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') openMieloLightboxAt(idx) }}
                  >
                    <img
                      src={src}
                      alt={`Mielo mobile frame ${idx}`}
                      decoding="async"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className={`h-full w-auto object-contain ${enterDirMielo === 'left' && mieloFrame === idx ? 'miela-enter-left' : ''} ${enterDirMielo === 'right' && mieloFrame === idx ? 'miela-enter-right' : ''}`}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = idx === 0 ? '/mielo-0.webp' : `/mielo-mobile-${idx}.webp` }}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation dots in the gap */}
              <div className="absolute left-0 right-0 flex justify-center pointer-events-none" style={{ top: 'calc(70% + 8px)' }}>
                <div className="mielo-gap-dots flex justify-center gap-2">
                  {Array.from({ length: TOTAL_MIELO_FRAMES }).map((_, idx) => (
                    <div key={idx} className={`dot ${mieloFrame === idx ? 'active' : ''}`} />
                  ))}
                </div>
              </div>

              {/* Content container: 30% height */}
              <div className="h-[30%] px-[clamp(12px,3vw,24px)] flex items-center justify-center">
                {/* Add content here */}
              </div>
            </div>
          </>
        )}

        {/* Mielo lightbox modal */}
        {(slug === 'mielo') && (mieloLightboxOpen || mieloLightboxClosing) && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mielo image lightbox"
            className={`fixed inset-0 z-[9998] mielo-lightbox-bg flex items-center justify-center ${mieloLightboxClosing ? 'mielo-lightbox-fade-out' : 'mielo-lightbox-fade-in'}`}
            onClick={handleCloseMieloLightbox}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(${csBG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button ref={mieloCloseBtnRef} className={`mielo-lightbox-close ${mieloLightboxEntering ? 'mielo-close-pop-in' : ''}`} aria-label="Close" onClick={handleCloseMieloLightbox}>×</button>
            <div
              ref={mieloLightboxRef}
              className={`mielo-lightbox-modal ${mieloLightboxClosing ? 'mielo-modal-scale-out' : 'mielo-modal-pop-in'}`}
              style={{ width: '95vw', height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={`mielo-${mieloLightboxIndex}`}
                src={window.innerWidth < 768 ? mieloMobileImages[mieloLightboxIndex] : mieloImages[mieloLightboxIndex]}
                alt={`Mielo image ${mieloLightboxIndex}`}
                decoding="async"
                fetchpriority="high"
                loading="eager"
                className="mielo-lightbox-image"
                style={{ maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain', margin: '0 auto' }}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  if (window.innerWidth < 768) {
                    e.currentTarget.src = mieloLightboxIndex === 0 ? '/mielo-0.webp' : `/mielo-mobile-${mieloLightboxIndex}.webp`
                  } else {
                    e.currentTarget.src = `/mielo-${mieloLightboxIndex}.webp`
                  }
                }}
              />
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

      {/* Fixed indicators 50px above carousel — for Todoalrojo */}
      {slug === 'todoalrojo' && (
        <div className="todoalrojo-dots-fixed" aria-hidden>
          <div className="flex justify-center">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={`todo-dot-${idx}`} className={`dot ${todoalrojoFrame === idx ? 'active' : ''}`} />
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

        /* Gold styles: filter only for <img>, exact color for inline <svg> */
        img.svg-gold { filter: brightness(0) saturate(100%) invert(76%) sepia(36%) saturate(459%) hue-rotate(358deg) brightness(97%) contrast(89%); }
        svg.svg-gold { color: #e4c492; }
        .svg-left { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); left: calc(50% - 70px); transform: translateY(-50%); }
        .svg-right { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); right: calc(50% - 70px); transform: translateY(-50%); }
        @media (min-width: 768px) { .svg-left { left: calc(50% - 120px) } .svg-right { right: calc(50% - 120px) } }
        @media (min-width: 1024px) { .svg-left { left: calc(50% - 160px) } .svg-right { right: calc(50% - 160px) } }
        @media (min-width: 1280px) { .svg-left { left: calc(50% - 200px) } .svg-right { right: calc(50% - 200px) } }
        @media (min-width: 640px) { .svg-left { left: calc(50% - 90px); } .svg-right { right: calc(50% - 90px); } }

        /* Buttons (same theme hover) */
        .glass-button { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16); color: #e7f2f8; }
        /* SVG icons gold by default */
        .glass-button svg { stroke: #e4c492; fill: none; }
        .glass-button:hover { background: #7a1f2b; color: #ffffff; border-color: transparent; }
        /* SVG icons turn white on hover */
        .glass-button:hover svg { stroke: #ffffff; fill: none; }

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
        .miela-hero-in { animation: fadeUpIn 900ms cubic-bezier(0.22, 1, 0.36, 1) 120ms forwards; will-change: transform, opacity; opacity: 1; }
        /* BULLETPROOF carousel animation - always visible, never disappears */
        .miela-marquee-in {
          opacity: 1 !important;
          animation: fadeInSlow 900ms ease-out 400ms forwards !important;
          visibility: visible !important;
          display: flex !important;
        }
        .miela-touch { touch-action: none; }
        .swap-img { transition: opacity 1600ms ease; will-change: opacity; }
        /* Ensure inline opacity styles work correctly */
        .swap-img { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .swap-img { transition-duration: 1ms; } }

        

        /* Smooth continuous marquee (seamless, not too large) */
        .marquee-bleed { width: 100vw; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
        /* BULLETPROOF - carousel dock always visible and never hidden */
        .marquee-dock {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 100 !important;
          padding-bottom: max(0px, env(safe-area-inset-bottom));
          visibility: visible !important;
          opacity: 1 !important;
          display: flex !important;
          pointer-events: none;
        }
        /* Ensure carousel is always visible, even during animation */
        .marquee-dock.miela-marquee-in { min-height: 25vh; }
        .marquee-dock.miela-marquee-in.todoalrojo-marquee { min-height: 10vh; }
        @media (max-width: 767px) {
          .marquee-dock { min-height: auto !important; }
          .marquee-dock.miela-marquee-in { min-height: 15vh !important; }
          .marquee-dock.miela-marquee-in.todoalrojo-marquee { min-height: 8vh !important; }
        }
        .smooth-marquee { width: 100%; overflow: hidden; position: relative; }
        /* BULLETPROOF marquee animation - works on all browsers */
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 0;
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0) translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        /* Desktop: CSS animation */
        @media (min-width: 769px) {
          .marquee-track {
            animation: marqueeScroll 40s linear infinite !important;
            -webkit-animation: marqueeScroll 40s linear infinite !important;
            animation-play-state: running !important;
            -webkit-animation-play-state: running !important;
          }
        }
        /* Mobile: JavaScript handles animation (no CSS animation to avoid conflicts) */
        @media (max-width: 768px) {
          .marquee-track {
            animation: none !important;
            -webkit-animation: none !important;
          }
        }
        .marquee-group { display: flex; gap: 0; }
        .marquee-img { display: block; margin: 0; height: 25vh; width: auto; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25)); opacity: 0.95; }
        /* Todoalrojo banners: 10vh on desktop, 8vh on mobile */
        .todoalrojo-marquee .marquee-img { height: 10vh; }
        /* Smaller screens: reduce carousel heights */
        @media (max-width: 767px) {
          .marquee-img { height: 15vh; }
          .todoalrojo-marquee .marquee-img { height: 8vh; }
        }

        /* BULLETPROOF marquee scroll animation - continuous loop */
        @keyframes marqueeScroll {
          0% { transform: translateX(0); -webkit-transform: translateX(0); }
          100% { transform: translateX(-50%); -webkit-transform: translateX(-50%); }
        }
        @-webkit-keyframes marqueeScroll {
          0% { -webkit-transform: translateX(0); }
          100% { -webkit-transform: translateX(-50%); }
        }

        /* Respect reduced motion but still show carousel */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: translateX(-25%);
          }
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
        /* Vertical mobile entrance (gentle) */
        @keyframes mielaEnterU {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes mielaEnterD {
          0%   { opacity: 0; transform: translateY(-16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .miela-enter-up   { animation: mielaEnterU 750ms cubic-bezier(0.2, 0.85, 0.2, 1); }
        .miela-enter-down { animation: mielaEnterD 750ms cubic-bezier(0.2, 0.85, 0.2, 1); }

        .miela-dots-fixed { position: fixed; left: 0; right: 0; bottom: calc(25vh + 5px + env(safe-area-inset-bottom)); z-index: 6; pointer-events: none; }
        .miela-dots-fixed .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.36); box-shadow: none; margin: 0 4px; transition: width 180ms ease, height 180ms ease, background 180ms ease, box-shadow 180ms ease; }
        .miela-dots-fixed .dot.active { width: 8px; height: 8px; background: rgba(255,255,255,0.95); box-shadow: 0 0 8px rgba(255,255,255,0.5); }

        .todoalrojo-dots-fixed { position: fixed; left: 0; right: 0; bottom: calc(10vh + 5px + env(safe-area-inset-bottom)); z-index: 6; pointer-events: none; }

        /* Mobile: adjust dots position for reduced carousel height */
        @media (max-width: 767px) {
          .miela-dots-fixed { bottom: calc(15vh + 5px + env(safe-area-inset-bottom)); }
          .todoalrojo-dots-fixed { bottom: calc(8vh + 5px + env(safe-area-inset-bottom)); }
        }
        .todoalrojo-dots-fixed .dot { width: 5.7px; height: 5.7px; border-radius: 50%; background: rgba(255,255,255,0.36); box-shadow: none; margin: 0 4px; transition: width 180ms ease, height 180ms ease, background 180ms ease, box-shadow 180ms ease; }
        .todoalrojo-dots-fixed .dot.active { width: 7.6px; height: 7.6px; background: rgba(255,255,255,0.95); box-shadow: 0 0 8px rgba(255,255,255,0.5); }

        /* Mielo gap dots - positioned in the margin between image and content sections */
        .mielo-gap-dots { display: flex; justify-content: center; align-items: center; gap: 8px; }
        .mielo-gap-dots .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.36); box-shadow: none; transition: width 180ms ease, height 180ms ease, background 180ms ease, box-shadow 180ms ease; }
        .mielo-gap-dots .dot.active { width: 8px; height: 8px; background: rgba(255,255,255,0.95); box-shadow: 0 0 8px rgba(255,255,255,0.5); }

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
          width: 32px; height: 32px;
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: #ffffff; border: none;
          font-size: 24px; line-height: 1; font-weight: 600; border-radius: 8px;
        }
        .lightbox-close:hover { background: #7a1f2b; color: #ffffff; }
        .lightbox-close:active { background: #7a1f2b; color: #ffffff; }
        .lightbox-chevron {
          position: fixed; top: 50%; transform: translateY(-50%); z-index: 10001;
          width: 42px; height: 42px; border-radius: 9999px; border: 2px solid #ffffff;
          background: rgba(0,0,0,0.45); color: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .lightbox-prev { left: calc(20px + env(safe-area-inset-left)); }
        .lightbox-next { right: calc(20px + env(safe-area-inset-right)); }
        .lightbox-chevron:hover { background: rgba(122,31,43,0.9); border-color: #7a1f2b; color: #ffffff; }
        .lightbox-chevron:active { background: rgba(122,31,43,1); border-color: #7a1f2b; color: #ffffff; }
        /* Ensure nav button arrows stay gold even on hover */
        .glass-button svg.svg-gold { color: #e4c492; }

        /* Mobile navbar SVGs (small screens only) - use gold when SVG is alone in button */
        @media (max-width: 767px) {
          .liquid-glass-header .glass-button svg { stroke: #e4c492; }
          .liquid-glass-header .glass-button:hover svg,
          .liquid-glass-header .glass-button:active svg { stroke: #e4c492; }
        }

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
        .thumb-active { border-color: #7a1f2b; }
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
          .compat-dvh { height: calc(100vh - var(--nav-h)) !important; }
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

        /* Ultrawide screen responsiveness for todoalrojo (3440px+) */
        @media (min-width: 3440px) {
          .todoalrojo-ultrawide-adjust { max-width: 2400px !important; }
        }

        /* Force mobile layout on portrait devices (e.g., Zenbook Fold portrait) */
        @media (orientation: portrait) {
          .todoalrojo-desktop { display: none !important; }
          .todoalrojo-mobile { display: block !important; }
        }
        /* Reduce overall top spacing by 30px for Todoalrojo */
        .todoalrojo-compact .header-spacer { height: max(0px, calc(var(--nav-h) - 30px)) !important; }

        /* Mobile: reduce top spacer/nav height for Todoalrojo */
        @media (max-width: 768px) {
          .todoalrojo-mobile-compact { --nav-h: 48px; }
          .todoalrojo-mobile-compact .header-spacer { height: var(--nav-h) !important; }
        }

        /* Mielo lightbox animations */
        @keyframes mieloLightboxFadeIn {
          0% { opacity: 0; backdrop-filter: blur(0); }
          100% { opacity: 1; backdrop-filter: blur(8px); }
        }
        @keyframes mieloLightboxFadeOut {
          0% { opacity: 1; backdrop-filter: blur(8px); }
          100% { opacity: 0; backdrop-filter: blur(0); }
        }
        @keyframes mieloModalScaleIn {
          0% { opacity: 0; transform: scale(0.92) translateY(-20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes mieloModalPopIn {
          0% { opacity: 0; transform: scale(0.88) translateY(-30px); }
          50% { transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes mieloModalScaleOut {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.92) translateY(-20px); }
        }
        @keyframes mieloClosePopIn {
          0% { opacity: 0; transform: scale(0.4) rotate(-45deg); }
          75% { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .mielo-lightbox-bg { animation: mieloLightboxFadeIn 500ms ease-out forwards; }
        .mielo-lightbox-fade-in { animation: mieloLightboxFadeIn 500ms ease-out forwards; }
        .mielo-lightbox-fade-out { animation: mieloLightboxFadeOut 140ms ease-out forwards; }

        .mielo-lightbox-modal { will-change: transform, opacity; }
        .mielo-modal-scale-in { animation: mieloModalScaleIn 600ms cubic-bezier(0.23, 1, 0.320, 1) forwards; }
        .mielo-modal-pop-in { animation: mieloModalPopIn 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .mielo-modal-scale-out { animation: mieloModalScaleOut 140ms ease-in forwards; }

        .mielo-lightbox-close {
          position: fixed;
          top: clamp(12px, 3vw, 24px);
          right: clamp(12px, 3vw, 24px);
          z-index: 9999;
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.12);
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          color: #ffffff;
          font-size: 32px;
          font-weight: 300;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 200ms ease;
        }
        .mielo-lightbox-close:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.3);
          transform: scale(1.1);
        }
        .mielo-lightbox-close:active {
          transform: scale(0.95);
        }
        .mielo-close-pop-in { animation: mieloClosePopIn 600ms cubic-bezier(0.23, 1, 0.320, 1) forwards; }

        .mielo-lightbox-image { will-change: transform, opacity; }
      `}</style>
    </div>
  )
}

export default CreativeDesignerCaseDetail
