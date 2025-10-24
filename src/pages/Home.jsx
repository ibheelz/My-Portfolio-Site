import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [hoveredChar, setHoveredChar] = useState(null)
  const [clickedChar, setClickedChar] = useState(null)
  const [bigCharAnimation, setBigCharAnimation] = useState(null)
  const [activeSlide, setActiveSlide] = useState(1)
  const [hasSwipedFromFirst, setHasSwipedFromFirst] = useState(false)
  const [expandedDesc, setExpandedDesc] = useState(null)
  const isCharacterClickRef = useRef(false)
  const justUnfocusedRef = useRef(false)
  const sliderRef = useRef(null)
  const navigate = useNavigate()

  const activeChar = clickedChar || hoveredChar


  const handleCharClick = (charNum) => {
    isCharacterClickRef.current = true

    // Check if we're on a small screen (below lg breakpoint - 1024px)
    const isSmallScreen = window.innerWidth < 1024

    if (isSmallScreen) {
      // On small screens, trigger big character animation
      setBigCharAnimation(charNum)
      setClickedChar(charNum)
    } else {
      // On larger screens, use normal behavior
      if (clickedChar === charNum) {
        // Clicking same character - unfocus and clear hover
        setClickedChar(null)
        setHoveredChar(null)
        justUnfocusedRef.current = true
        // Reset after a short delay
        setTimeout(() => {
          justUnfocusedRef.current = false
        }, 100)
      } else {
        // Clicking new character - focus it
        setClickedChar(charNum)
      }
    }
  }

  const handleMouseEnter = (charNum) => {
    if (!clickedChar && !justUnfocusedRef.current) {
      setHoveredChar(charNum)
    }
  }

  const handleMouseLeave = () => {
    if (!clickedChar) {
      setHoveredChar(null)
    }
  }

  useEffect(() => {
    const handlePageClick = () => {
      if (!isCharacterClickRef.current && clickedChar) {
        setClickedChar(null)
      }
      isCharacterClickRef.current = false
    }

    document.addEventListener('click', handlePageClick)
    return () => document.removeEventListener('click', handlePageClick)
  }, [clickedChar])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft
      const slideWidth = slider.offsetWidth
      const newSlide = Math.round(scrollLeft / slideWidth) + 1

      // Track if user has swiped away from first slide
      if (newSlide !== 1 && !hasSwipedFromFirst) {
        setHasSwipedFromFirst(true)
      }

      setActiveSlide(newSlide)
    }

    slider.addEventListener('scroll', handleScroll)
    return () => slider.removeEventListener('scroll', handleScroll)
  }, [hasSwipedFromFirst])

  return (
    <div className="h-screen overflow-hidden bg-[#10171d] p-[8px] lg:p-[12px] flex flex-col animate-fadeIn">
      {/* White container with responsive margins */}
      <div
        className="w-full rounded-[20px] lg:rounded-[30px] bg-cover bg-center bg-no-repeat relative overflow-hidden hero-container"
        style={{
          backgroundImage: 'url(/hero-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient overlays */}
        {/* Red gradient for character 1: desktop OR mobile after swipe */}
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #6e3534 0%, #ae504d 40%, #d88078 100%)',
            opacity: (window.innerWidth >= 1024 ? activeChar === 1 : (activeSlide === 1 && hasSwipedFromFirst)) ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #4a346e 0%, #6e4dae 40%, #a378d8 100%)',
            opacity: (window.innerWidth < 1024 ? activeSlide === 2 : activeChar === 2) ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #6e4a34 0%, #ae764d 40%, #d8a378 100%)',
            opacity: (window.innerWidth < 1024 ? activeSlide === 3 : activeChar === 3) ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #346e4a 0%, #4dae72 40%, #78d8a3 100%)',
            opacity: (window.innerWidth < 1024 ? activeSlide === 4 : activeChar === 4) ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #6e1e34 0%, #ae3d5d 40%, #d86b8a 100%)',
            opacity: (window.innerWidth < 1024 ? activeSlide === 5 : activeChar === 5) ? 1 : 0
          }}
        />

        {/* Logo */}
        <div
          className="absolute animate-slideDown"
          style={{
            top: 'clamp(1rem, 2vh, 2rem)',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <img src="/ibheelz-logo.webp" alt="ibheelz" className="h-[clamp(3.5rem,7vw,4.25rem)] w-auto" style={{ maxHeight: '68px' }} />
        </div>

        {/* Left SVG - now visible on mobile too */}
        <img
          src="/left.svg"
          alt=""
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left svg-gold transition-opacity duration-700 svg-desktop-left svg-logo-left"
        />

        {/* Right SVG - now visible on mobile too */}
        <img
          src="/right.svg"
          alt=""
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right svg-gold transition-opacity duration-700 svg-desktop-right svg-logo-right"
        />

        {/* Mobile Hero text */}
        <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 text-center px-6 w-full z-10 pointer-events-none" style={{ top: 'calc(clamp(3.5rem, 7vw, 4.25rem) + clamp(1rem, 2vh, 2rem) + 50px)' }}>
          <div className="text-white relative">
            {/* Left SVG for mobile - aligned with role title - HIDDEN, using logo arrows instead */}
            <img
              src="/left.svg"
              alt=""
              className="hidden absolute h-[20px] w-auto svg-gold transition-opacity duration-700 svg-mobile-left"
              style={{
                top: 'calc(clamp(1.75rem,5.5vw,2.3rem) / 2)',
                transform: 'translateY(-50%)',
                opacity: activeSlide >= 1 && activeSlide <= 5 ? 1 : 0
              }}
            />

            {/* Right SVG for mobile - aligned with role title - HIDDEN, using logo arrows instead */}
            <img
              src="/right.svg"
              alt=""
              className="hidden absolute h-[20px] w-auto svg-gold transition-opacity duration-700 svg-mobile-right"
              style={{
                top: 'calc(clamp(1.75rem,5.5vw,2.3rem) / 2)',
                transform: 'translateY(-50%)',
                opacity: activeSlide >= 1 && activeSlide <= 5 ? 1 : 0
              }}
            />

            {/* Character 1: Creative Designer */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 1 ? 1 : 0, position: activeSlide === 1 ? 'relative' : 'absolute', top: 0, left: 0, right: 0, zIndex: activeSlide === 1 ? 10 : 1 }}>
              <div className="text-[clamp(1.3rem,4.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3 whitespace-nowrap">
                Creative Designer
              </div>
              <div
                className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 cursor-pointer"
                style={{
                  color: '#d0dadf',
                  overflow: expandedDesc === 1 ? 'visible' : 'hidden',
                  textOverflow: expandedDesc === 1 ? 'clip' : 'ellipsis',
                  whiteSpace: expandedDesc === 1 ? 'normal' : 'nowrap',
                  lineHeight: '1.5',
                  pointerEvents: 'auto'
                }}
                onClick={() => setExpandedDesc(expandedDesc === 1 ? null : 1)}
              >
                I hunt the perfect balance between aesthetics and functionality, leading every project with purpose.
              </div>
            </div>

            {/* Character 2: Branding */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 2 ? 1 : 0, position: activeSlide === 2 ? 'relative' : 'absolute', top: 0, left: 0, right: 0, zIndex: activeSlide === 2 ? 10 : 1 }}>
              <div className="text-[clamp(1.3rem,4.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3 whitespace-nowrap">
                Branding
              </div>
              <div
                className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 cursor-pointer"
                style={{
                  color: '#d0dadf',
                  overflow: expandedDesc === 2 ? 'visible' : 'hidden',
                  textOverflow: expandedDesc === 2 ? 'clip' : 'ellipsis',
                  whiteSpace: expandedDesc === 2 ? 'normal' : 'nowrap',
                  lineHeight: '1.5',
                  pointerEvents: 'auto'
                }}
                onClick={() => setExpandedDesc(expandedDesc === 2 ? null : 2)}
              >
                I deliver brand strategies that hit the mark every time, turning insights into iconic identities.
              </div>
            </div>

            {/* Character 3: AI Creator */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 3 ? 1 : 0, position: activeSlide === 3 ? 'relative' : 'absolute', top: 0, left: 0, right: 0, zIndex: activeSlide === 3 ? 10 : 1 }}>
              <div className="text-[clamp(1.3rem,4.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3 whitespace-nowrap">
                AI Creator
              </div>
              <div
                className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 cursor-pointer"
                style={{
                  color: '#d0dadf',
                  overflow: expandedDesc === 3 ? 'visible' : 'hidden',
                  textOverflow: expandedDesc === 3 ? 'clip' : 'ellipsis',
                  whiteSpace: expandedDesc === 3 ? 'normal' : 'nowrap',
                  lineHeight: '1.5',
                  pointerEvents: 'auto'
                }}
                onClick={() => setExpandedDesc(expandedDesc === 3 ? null : 3)}
              >
                In the AI landscape, it takes a fox's cleverness to transform possibilities into practical magic.
              </div>
            </div>

            {/* Character 4: 3D Design */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 4 ? 1 : 0, position: activeSlide === 4 ? 'relative' : 'absolute', top: 0, left: 0, right: 0, zIndex: activeSlide === 4 ? 10 : 1 }}>
              <div className="text-[clamp(1.3rem,4.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3 whitespace-nowrap">
                3D Design
              </div>
              <div
                className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 cursor-pointer"
                style={{
                  color: '#d0dadf',
                  overflow: expandedDesc === 4 ? 'visible' : 'hidden',
                  textOverflow: expandedDesc === 4 ? 'clip' : 'ellipsis',
                  whiteSpace: expandedDesc === 4 ? 'normal' : 'nowrap',
                  lineHeight: '1.5',
                  pointerEvents: 'auto'
                }}
                onClick={() => setExpandedDesc(expandedDesc === 4 ? null : 4)}
              >
                What I build doesn't just look good, it's engineered for perfection.
              </div>
            </div>

            {/* Character 5: Game Design */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 5 ? 1 : 0, position: activeSlide === 5 ? 'relative' : 'absolute', top: 0, left: 0, right: 0, zIndex: activeSlide === 5 ? 10 : 1 }}>
              <div className="text-[clamp(1.3rem,4.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3 whitespace-nowrap">
                Game Design
              </div>
              <div
                className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 cursor-pointer"
                style={{
                  color: '#d0dadf',
                  overflow: expandedDesc === 5 ? 'visible' : 'hidden',
                  textOverflow: expandedDesc === 5 ? 'clip' : 'ellipsis',
                  whiteSpace: expandedDesc === 5 ? 'normal' : 'nowrap',
                  lineHeight: '1.5',
                  pointerEvents: 'auto'
                }}
                onClick={() => setExpandedDesc(expandedDesc === 5 ? null : 5)}
              >
                I design games that roar to life and leave lasting impressions.
              </div>
            </div>

            <button
              onClick={() => {
                const routes = ['/creative-designer', '/branding', '/ai-creator', '/3d-design', '/game-design']
                navigate(routes[activeSlide - 1])
              }}
              className="mobile-glass-button px-4 py-2 rounded-full text-white font-['Jost',sans-serif] font-medium text-[10px] cursor-pointer"
              style={{ letterSpacing: '0.2em', pointerEvents: 'auto' }}
            >
              PICK CHARACTER
            </button>
          </div>
        </div>

        {/* Mobile: Slider indicator dots */}
        <div className="lg:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {[1, 2, 3, 4, 5].map((dotNum) => (
            <div
              key={dotNum}
              className="transition-all duration-300"
              style={{
                width: activeSlide === dotNum ? '8px' : '6px',
                height: activeSlide === dotNum ? '8px' : '6px',
                borderRadius: '50%',
                backgroundColor: activeSlide === dotNum ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
                boxShadow: activeSlide === dotNum ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Hero text - desktop/tablet */}
        <div className="hidden lg:block absolute top-[20%] lg:top-32 left-1/2 transform -translate-x-1/2 lg:translate-y-0 text-center px-4 sm:px-6 md:px-8 w-full max-w-4xl">
          <div className="text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed lg:mt-0">
            <div
              className="text-[clamp(1.5rem,4.5vw,3rem)] lg:text-5xl font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-none lg:leading-tight transition-opacity duration-700"
              style={{ opacity: activeChar ? 0 : 1 }}
            >
              I craft digital<br className="lg:hidden" /> experiences
            </div>
            <div
              className="text-[clamp(0.875rem,2.5vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2 transition-opacity duration-700"
              style={{ opacity: activeChar ? 0 : 1, color: '#d0dadf' }}
            >
              where art, code, and intelligence converge.
            </div>
            <button
              className="mt-6 px-4 py-2 rounded-full border border-white/30 text-white/30 font-['Jost',sans-serif] font-medium text-[clamp(9px,1.8vw,12px)] transition-opacity duration-700 cursor-default"
              style={{ opacity: activeChar ? 0 : 1, letterSpacing: '0.2em' }}
            >
              CLICK ANY CHARACTER
            </button>
          </div>
        </div>

        {/* Character-specific text - hidden on mobile */}
        <div className="hidden lg:block absolute top-[20%] lg:top-32 left-1/2 transform -translate-x-1/2 lg:translate-y-0 text-center px-4 sm:px-6 md:px-8 w-full max-w-4xl z-20">
          {/* Character 1: Creative Designer */}
          <div className="absolute inset-0 text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed transition-opacity duration-700" style={{ opacity: activeChar === 1 ? 1 : 0, pointerEvents: activeChar === 1 ? 'auto' : 'none' }}>
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight whitespace-nowrap">
              Creative Designer
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              I hunt the perfect balance between aesthetics and functionality, leading every project with purpose.
            </div>
            <button
              onClick={() => navigate('/creative-designer')}
              className="mobile-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
              style={{ opacity: clickedChar === 1 ? 1 : 0, pointerEvents: clickedChar === 1 ? 'auto' : 'none', transition: 'opacity 0.5s ease-in-out' }}
            >
              <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Enter Character
            </button>
          </div>

          {/* Character 2: Branding */}
          <div className="absolute inset-0 text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed transition-opacity duration-700" style={{ opacity: activeChar === 2 ? 1 : 0, pointerEvents: activeChar === 2 ? 'auto' : 'none' }}>
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight whitespace-nowrap">
              Branding
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              I deliver brand strategies that hit the mark every time, turning insights into iconic identities.
            </div>
            <button
              onClick={() => navigate('/branding')}
              className="mobile-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
              style={{ opacity: clickedChar === 2 ? 1 : 0, pointerEvents: clickedChar === 2 ? 'auto' : 'none', transition: 'opacity 0.5s ease-in-out' }}
            >
              <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Enter Character
            </button>
          </div>

          {/* Character 3: AI Creator */}
          <div className="absolute inset-0 text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed transition-opacity duration-700" style={{ opacity: activeChar === 3 ? 1 : 0, pointerEvents: activeChar === 3 ? 'auto' : 'none' }}>
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight whitespace-nowrap">
              AI Creator
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              In the AI landscape, it takes a fox's cleverness to transform possibilities into practical magic.
            </div>
            <button
              onClick={() => navigate('/ai-creator')}
              className="mobile-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
              style={{ opacity: clickedChar === 3 ? 1 : 0, pointerEvents: clickedChar === 3 ? 'auto' : 'none', transition: 'opacity 0.5s ease-in-out' }}
            >
              <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Enter Character
            </button>
          </div>

          {/* Character 4: 3D Design */}
          <div className="absolute inset-0 text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed transition-opacity duration-700" style={{ opacity: activeChar === 4 ? 1 : 0, pointerEvents: activeChar === 4 ? 'auto' : 'none' }}>
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight whitespace-nowrap">
              3D Design
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              What I build doesn't just look good, it's engineered for perfection.
            </div>
            <button
              onClick={() => navigate('/3d-design')}
              className="mobile-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
              style={{ opacity: clickedChar === 4 ? 1 : 0, pointerEvents: clickedChar === 4 ? 'auto' : 'none', transition: 'opacity 0.5s ease-in-out' }}
            >
              <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Enter Character
            </button>
          </div>

          {/* Character 5: Game Design */}
          <div className="absolute inset-0 text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed transition-opacity duration-700" style={{ opacity: activeChar === 5 ? 1 : 0, pointerEvents: activeChar === 5 ? 'auto' : 'none' }}>
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight whitespace-nowrap">
              Game Design
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              I design games that roar to life and leave lasting impressions.
            </div>
            <button
              onClick={() => navigate('/game-design')}
              className="mobile-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
              style={{ opacity: clickedChar === 5 ? 1 : 0, pointerEvents: clickedChar === 5 ? 'auto' : 'none', transition: 'opacity 0.5s ease-in-out' }}
            >
              <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Enter Character
            </button>
          </div>
        </div>

        {/* Mobile: Horizontal slider with one character per slide */}
        <div
          ref={sliderRef}
          className="lg:hidden absolute inset-0 flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
        >
          {[1, 2, 3, 4, 5].map((charNum) => (
            <div
              key={charNum}
              className="flex-shrink-0 w-full h-full flex items-end justify-center snap-center pb-0"
              style={{ scrollSnapAlign: 'center' }}
            >
              <img
                src={`/characters/${charNum}.webp`}
                alt={`Character ${charNum}`}
                className="h-auto w-auto object-contain object-bottom mobile-char-img"
                style={{
                  width: charNum === 1 ? '49%' : charNum === 2 ? '53%' : charNum === 3 ? '51%' : charNum === 4 ? '54%' : '60%',
                  maxHeight: '50%',
                  transform: (charNum === 1 || charNum === 3) ? 'translateY(13px)' : 'none'
                }}
              />
            </div>
          ))}
        </div>

        {/* Desktop: All characters at bottom */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-[95%] lg:w-[90%] justify-center items-end gap-5 animate-slideUp" style={{ bottom: 'clamp(-100px, calc(-150px + 20vh), 0px)' }}>
          <img
            src="/characters/1.webp"
            alt="Character 1"
            className="h-auto w-[16%] cursor-pointer transition-transform duration-[1500ms] char-1"
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(1)}
            style={{
              transform: activeChar && activeChar !== 1 ? 'translateY(100%)' : undefined,
              marginRight: '1%'
            }}
          />
          <img
            src="/characters/2.webp"
            alt="Character 2"
            className="h-auto w-[20%] cursor-pointer transition-transform duration-[1500ms] hover:scale-105 char-2"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(2)}
            style={{
              transform: activeChar && activeChar !== 2 ? 'translateY(100%)' : undefined,
              marginLeft: '10%',
              marginRight: '12%'
            }}
          />
          <img
            src="/characters/3.webp"
            alt="Character 3"
            className="h-auto w-[16%] cursor-pointer transition-transform duration-[1500ms] absolute char-3"
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(3)}
            style={{
              transform: activeChar && activeChar !== 3
                ? 'translateY(100%)'
                : (hoveredChar === 3 || activeChar === 3)
                  ? 'translateY(32px) scale(0.99)'
                  : undefined,
              left: '50%',
              marginLeft: '-8%',
              bottom: 0
            }}
          />
          <img
            src="/characters/4.webp"
            alt="Character 4"
            className="h-auto w-[19%] cursor-pointer transition-transform duration-[1500ms] hover:scale-105 char-4"
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(4)}
            style={{
              transform: activeChar && activeChar !== 4 ? 'translateY(100%)' : undefined,
              marginLeft: '12%',
              marginRight: '1%'
            }}
          />
          <img
            src="/characters/5.webp"
            alt="Character 5"
            className="h-auto w-[20%] cursor-pointer transition-transform duration-[1500ms] char-5"
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(5)}
            style={{ transform: activeChar && activeChar !== 5 ? 'translateY(100%)' : undefined }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center overflow-auto">
        {/* Selected Brands text - responsive */}
        <p className="text-[#d4e2f3] text-center text-xs sm:text-sm tracking-wider font-['Jost',sans-serif] font-medium px-4 mt-5">
         Selected Brands I've Worked On
        </p>

        {/* Brand Logos - scrolling on mobile, static on larger screens */}
        <div className="mt-[30px] animate-logoSlideUp">
        {/* Mobile: Infinite scroll - below 870px */}
        <div className="max-[870px]:block hidden overflow-hidden">
          <div className="flex animate-scroll-mobile">
            <div className="flex gap-8 shrink-0">
              <img src="/logos/1xbet.webp" alt="1xBet" className="h-5 w-auto logo-color" />
              <img src="/logos/betsson.webp" alt="Betsson" className="h-5 w-auto logo-color" />
              <img src="/logos/parimatch.webp" alt="Parimatch" className="h-5 w-auto logo-color" />
              <img src="/logos/pinup.webp" alt="Pin-Up" className="h-5 w-auto logo-color" />
              <img src="/logos/stake.webp" alt="Stake" className="h-5 w-auto logo-color" />
              <img src="/logos/thunderpick.webp" alt="Thunderpick" className="h-5 w-auto logo-color" />
              <img src="/logos/wow.webp" alt="WOW" className="h-5 w-auto logo-color" />
            </div>
            <div className="flex gap-8 shrink-0 ml-8">
              <img src="/logos/1xbet.webp" alt="1xBet" className="h-5 w-auto logo-color" />
              <img src="/logos/betsson.webp" alt="Betsson" className="h-5 w-auto logo-color" />
              <img src="/logos/parimatch.webp" alt="Parimatch" className="h-5 w-auto logo-color" />
              <img src="/logos/pinup.webp" alt="Pin-Up" className="h-5 w-auto logo-color" />
              <img src="/logos/stake.webp" alt="Stake" className="h-5 w-auto logo-color" />
              <img src="/logos/thunderpick.webp" alt="Thunderpick" className="h-5 w-auto logo-color" />
              <img src="/logos/wow.webp" alt="WOW" className="h-5 w-auto logo-color" />
            </div>
          </div>
        </div>

        {/* Desktop: Static grid - 870px and above */}
        <div className="min-[871px]:flex hidden items-center justify-center gap-6 md:gap-8 flex-wrap px-4 max-w-4xl mx-auto">
          <img src="/logos/1xbet.webp" alt="1xBet" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/betsson.webp" alt="Betsson" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/parimatch.webp" alt="Parimatch" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/pinup.webp" alt="Pin-Up" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/stake.webp" alt="Stake" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/thunderpick.webp" alt="Thunderpick" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/wow.webp" alt="WOW" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
        </div>
      </div>

        {/* Buttons section with liquid glass effect */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 px-4 mt-[40px] mb-5">
        <button className="apple-glass-button px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2">
          <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
          View Resume
        </button>
        <button className="apple-glass-button-accent px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base text-white font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2">
          <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Hire Me
        </button>
        </div>
      </div>

      <style jsx>{`
        /* Hero container height - responsive across all screen sizes */
        .hero-container {
          height: clamp(420px, calc(100vh - 280px), 650px);
        }

        /* Ultra-wide screens: increase max height for better proportions */
        @media (min-width: 1920px) {
          .hero-container {
            height: clamp(420px, calc(100vh - 280px), 850px);
          }

          /* Scale desktop character images proportionally with container */
          .char-1 {
            width: 21%;
          }

          .char-2 {
            width: 26%;
          }

          .char-3 {
            width: 21%;
          }

          .char-4 {
            width: 25%;
          }

          .char-5 {
            width: 26%;
          }
        }

        /* Character positioning - responsive on smaller screens, fixed on desktop */
        .char-1 {
          transform: translate(clamp(50px, 10vw, 150px), 0);
        }

        .char-2 {
          transform: translate(0, clamp(10px, 2vh, 22px));
        }

        .char-3 {
          transform: translateY(0);
        }

        .char-4 {
          transform: translate(clamp(-50px, -7vw, -100px), clamp(8px, 1.5vh, 15px));
        }

        .char-5 {
          transform: translate(clamp(-60px, -8vw, -120px), 0);
        }

        /* Desktop: Fixed positioning (no responsive scaling) */
        @media (min-width: 1280px) {
          .char-1 {
            transform: translate(150px, 0);
          }

          .char-2 {
            transform: translate(0, 22px);
          }

          .char-3 {
            transform: translateY(0);
          }

          .char-4 {
            transform: translate(-100px, 15px);
          }

          .char-5 {
            transform: translate(-120px, 0);
          }
        }

        /* Mobile glass button with realistic distortion */
        .mobile-glass-button {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.15) 100%
          );
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow:
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 1px 0 rgba(255, 255, 255, 0.2),
            0 8px 32px 0 rgba(0, 0, 0, 0.2),
            0 2px 8px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .mobile-glass-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.25) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        .mobile-glass-button::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4),
            transparent 50%,
            rgba(255, 255, 255, 0.2)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Logo color filter - white */
        .logo-color {
          filter: brightness(0) invert(1);
        }

        /* SVG color filter - #d8ac65 */
        .svg-gold {
          filter: brightness(0) saturate(100%) invert(76%) sepia(36%) saturate(459%) hue-rotate(358deg) brightness(97%) contrast(89%);
        }

        /* Apple-style liquid glass buttons */
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

        .apple-glass-button-accent {
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
        }

        .apple-glass-button-accent::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 60%
          );
          animation: liquidMove 4s ease-in-out infinite;
        }

        .apple-glass-button-accent::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
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

        .apple-glass-button-red {
          background: linear-gradient(
            135deg,
            rgba(228, 100, 100, 0.25) 0%,
            rgba(228, 100, 100, 0.15) 50%,
            rgba(228, 100, 100, 0.25) 100%
          );
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          border: 1px solid rgba(228, 100, 100, 0.4);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 0 rgba(228, 100, 100, 0.3),
            0 8px 32px 0 rgba(228, 100, 100, 0.15);
        }

        .apple-glass-button-red::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 60%
          );
          animation: liquidMove 4s ease-in-out infinite;
        }

        .apple-glass-button-red::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          animation: glossyShine 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        @keyframes liquidMove {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10%, 10%);
          }
          50% {
            transform: translate(0, 20%);
          }
          75% {
            transform: translate(-10%, 10%);
          }
        }

        @keyframes glossyShine {
          0% {
            left: -100%;
          }
          50%, 100% {
            left: 200%;
          }
        }

        @keyframes slideUp {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
        }

        @keyframes slideDown {
          from {
            transform: translate(-50%, -870px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        .animate-slideDown {
          animation: slideDown 1s ease-out forwards;
        }

        @keyframes logoSlideUp {
          from {
            transform: translateY(870px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-logoSlideUp {
          animation: logoSlideUp 1s ease-out forwards;
        }

        @keyframes scrollMobile {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 1rem));
          }
        }

        .animate-scroll-mobile {
          animation: scrollMobile 12s linear infinite;
          will-change: transform;
        }

        /* SVG positioning */
        .svg-left {
          left: calc(50% - 70px);
        }

        .svg-right {
          right: calc(50% - 70px);
        }

        @media (min-width: 768px) {
          .svg-left {
            left: calc(50% - 120px);
          }

          .svg-right {
            right: calc(50% - 120px);
          }

          .svg-logo-left {
            left: calc(50% - 120px);
          }

          .svg-logo-right {
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

          .svg-logo-left {
            left: calc(50% - 160px);
          }

          .svg-logo-right {
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

          .svg-logo-left {
            left: calc(50% - 200px);
          }

          .svg-logo-right {
            right: calc(50% - 200px);
          }
        }

        /* Desktop SVG positioning - beside logo */
        .svg-desktop-left,
        .svg-desktop-right {
          top: calc(clamp(1rem, 2vh, 2rem) + clamp(3.5rem, 7vw, 4.25rem) / 2);
          transform: translateY(-50%);
        }

        /* Mobile: arrows beside logo */
        .svg-logo-left {
          left: calc(50% - 70px);
        }

        .svg-logo-right {
          right: calc(50% - 70px);
        }

        @media (min-width: 640px) {
          .svg-left {
            left: calc(50% - 90px);
          }

          .svg-right {
            right: calc(50% - 90px);
          }

          .svg-logo-left {
            left: calc(50% - 90px);
          }

          .svg-logo-right {
            right: calc(50% - 90px);
          }
        }

        /* Mobile SVG positioning for role text */
        .svg-mobile-left {
          left: 10px;
        }

        .svg-mobile-right {
          right: 10px;
        }

        @media (max-width: 399px) {
          .svg-mobile-left {
            left: 5px;
          }

          .svg-mobile-right {
            right: 5px;
          }
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

        @keyframes slideUpFromBottom {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUpFromBottom {
          animation: slideUpFromBottom 0.8s ease-out forwards;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Force hero images to 50% height on very small screens */
        @media (max-width: 420px) {
          .mobile-char-img {
            height: 50% !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
