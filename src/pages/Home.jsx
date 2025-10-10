import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [hoveredChar, setHoveredChar] = useState(null)
  const [clickedChar, setClickedChar] = useState(null)
  const [bigCharAnimation, setBigCharAnimation] = useState(null)
  const [activeSlide, setActiveSlide] = useState(1)
  const [hasSwipedFromFirst, setHasSwipedFromFirst] = useState(false)
  const isCharacterClickRef = useRef(false)
  const justUnfocusedRef = useRef(false)
  const sliderRef = useRef(null)
  const navigate = useNavigate()

  const activeChar = clickedChar || hoveredChar


  const handleCharClick = (charNum) => {
    isCharacterClickRef.current = true

    // Check if we're on a small screen (below sm breakpoint - 640px)
    const isSmallScreen = window.innerWidth < 640

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
    <div className="h-screen overflow-hidden bg-[#15222c] p-[8px] sm:p-[12px] flex flex-col animate-fadeIn">
      {/* White container with responsive margins */}
      <div
        className="w-full rounded-[20px] sm:rounded-[30px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: 'clamp(420px, calc(100vh - 280px), 650px)'
        }}
      >
        {/* Gradient overlays */}
        {/* Blue gradient for character 1 on desktop only */}
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #344a6e 0%, #4d8eae 40%, #78bcd8 100%)',
            opacity: (window.innerWidth >= 640 && activeChar === 1) ? 1 : 0
          }}
        />
        {/* Red gradient for first slide after swipe (mobile only) */}
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #6e3534 0%, #ae504d 40%, #d88078 100%)',
            opacity: (window.innerWidth < 640 && activeSlide === 1 && hasSwipedFromFirst) ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #4a346e 0%, #6e4dae 40%, #a378d8 100%)',
            opacity: (window.innerWidth < 640 ? activeSlide === 2 : activeChar === 2) ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #346e4a 0%, #4dae72 40%, #78d8a3 100%)',
            opacity: (window.innerWidth < 640 ? activeSlide === 3 : activeChar === 3) ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #6e4a34 0%, #ae764d 40%, #d8a378 100%)',
            opacity: (window.innerWidth < 640 ? activeSlide === 4 : activeChar === 4) ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #344a6e 0%, #4d8eae 40%, #78bcd8 100%)',
            opacity: (window.innerWidth < 640 ? activeSlide === 5 : activeChar === 5) ? 1 : 0
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
          <img src="/ibheelz-logo.png" alt="ibheelz" className="h-[clamp(3.5rem,7vw,4.25rem)] w-auto" style={{ maxHeight: '68px' }} />
        </div>

        {/* Left SVG - hidden on mobile */}
        <img
          src="/left.svg"
          alt=""
          className="hidden sm:block absolute h-[26px] sm:h-[29px] md:h-[32px] lg:h-[32px] xl:h-[32px] w-auto top-1/2 lg:top-[148px] transform -translate-y-1/2 lg:translate-y-0 svg-left svg-gold transition-opacity duration-700"
          style={{ opacity: activeChar ? 0 : 1 }}
        />

        {/* Right SVG - hidden on mobile */}
        <img
          src="/right.svg"
          alt=""
          className="hidden sm:block absolute h-[26px] sm:h-[29px] md:h-[32px] lg:h-[32px] xl:h-[32px] w-auto top-1/2 lg:top-[148px] transform -translate-y-1/2 lg:translate-y-0 svg-right svg-gold transition-opacity duration-700"
          style={{ opacity: activeChar ? 0 : 1 }}
        />

        {/* Mobile Hero text */}
        <div className="sm:hidden absolute left-1/2 transform -translate-x-1/2 text-center px-6 w-full z-10 pointer-events-none" style={{ top: 'calc(clamp(3.5rem, 7vw, 4.25rem) + clamp(1rem, 2vh, 2rem) + 50px)' }}>
          <div className="text-white">
            {/* Character 1: Creative Designer */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 1 ? 1 : 0, position: activeSlide === 1 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}>
              <div className="text-[clamp(1.75rem,5.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3">
                Creative Designer
              </div>
              <div className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 leading-relaxed" style={{ color: '#d0dadf' }}>
                crafting visual stories that inspire and engage.
              </div>
            </div>

            {/* Character 2: Branding */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 2 ? 1 : 0, position: activeSlide === 2 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}>
              <div className="text-[clamp(1.75rem,5.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3">
                Branding
              </div>
              <div className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 leading-relaxed" style={{ color: '#d0dadf' }}>
                building memorable identities that resonate and endure.
              </div>
            </div>

            {/* Character 3: AI Creator */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 3 ? 1 : 0, position: activeSlide === 3 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}>
              <div className="text-[clamp(1.75rem,5.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3">
                AI Creator
              </div>
              <div className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 leading-relaxed" style={{ color: '#d0dadf' }}>
                harnessing artificial intelligence for innovative solutions.
              </div>
            </div>

            {/* Character 4: 3D Design */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 4 ? 1 : 0, position: activeSlide === 4 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}>
              <div className="text-[clamp(1.75rem,5.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3">
                3D Design
              </div>
              <div className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 leading-relaxed" style={{ color: '#d0dadf' }}>
                creating immersive worlds that captivate and inspire.
              </div>
            </div>

            {/* Character 5: Game Design */}
            <div className="transition-opacity duration-700" style={{ opacity: activeSlide === 5 ? 1 : 0, position: activeSlide === 5 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}>
              <div className="text-[clamp(1.75rem,5.5vw,2.3rem)] font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight mb-3">
                Game Design
              </div>
              <div className="text-[clamp(0.875rem,2.8vw,1.1rem)] font-light font-['Jost',sans-serif] mb-5 leading-relaxed" style={{ color: '#d0dadf' }}>
                designing interactive experiences that thrill and entertain.
              </div>
            </div>

            <button
              className="mobile-glass-button px-4 py-2 rounded-full text-white font-['Jost',sans-serif] font-medium text-[10px] cursor-default"
              style={{ letterSpacing: '0.2em' }}
            >
              PICK CHARACTER
            </button>
          </div>
        </div>

        {/* Mobile: Slider indicator dots */}
        <div className="sm:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
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
        <div className="hidden sm:block absolute top-1/2 lg:top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-center px-4 sm:px-6 md:px-8 w-full">
          <div className="text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed lg:mt-0">
            <div
              className="text-[clamp(2rem,5vw,3rem)] lg:text-5xl font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-none lg:leading-tight transition-opacity duration-700"
              style={{ opacity: activeChar ? 0 : 1 }}
            >
              I craft digital<br className="lg:hidden" /> experiences
            </div>
            <div
              className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2 transition-opacity duration-700"
              style={{ opacity: activeChar ? 0 : 1, color: '#d0dadf' }}
            >
              where art, code, and intelligence converge.
            </div>
            <button
              className="mt-6 px-4 py-2 rounded-full border-2 border-white/30 text-white font-['Jost',sans-serif] font-medium text-xs transition-opacity duration-700 cursor-default"
              style={{ opacity: activeChar ? 0 : 1, letterSpacing: '0.2em' }}
            >
              PICK ANY CHARACTER
            </button>
          </div>
        </div>

        {/* Character-specific text - hidden on mobile */}
        <div className="hidden sm:block absolute top-1/2 lg:top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-center px-4 sm:px-6 md:px-8 w-full">
          {/* Character 1: Creative Designer */}
          <div className="absolute inset-0 text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed transition-opacity duration-700" style={{ opacity: activeChar === 1 ? 1 : 0, pointerEvents: activeChar === 1 ? 'auto' : 'none' }}>
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight">
              Creative Designer
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              crafting visual stories that inspire and engage.
            </div>
            <button
              onClick={() => navigate('/creative-designer')}
              className="apple-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
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
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight">
              Branding
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              building memorable identities that resonate and endure.
            </div>
            <button
              onClick={() => navigate('/branding')}
              className="apple-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
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
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight">
              AI Creator
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              harnessing artificial intelligence for innovative solutions.
            </div>
            <button
              onClick={() => navigate('/ai-creator')}
              className="apple-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
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
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight">
              3D Design
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              creating immersive worlds that captivate and inspire.
            </div>
            <button
              onClick={() => navigate('/3d-design')}
              className="apple-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
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
            <div className="text-[clamp(2.5rem,6vw,4rem)] lg:text-6xl font-bold text-white font-['Libre_Baskerville',serif] leading-none lg:leading-tight">
              Game Design
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2" style={{ color: '#d0dadf' }}>
              designing interactive experiences that thrill and entertain.
            </div>
            <button
              onClick={() => navigate('/game-design')}
              className="apple-glass-button mt-6 px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base font-['Jost',sans-serif] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 mx-auto"
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
          className="sm:hidden absolute inset-0 flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
        >
          {[1, 2, 3, 4, 5].map((charNum) => (
            <div
              key={charNum}
              className="flex-shrink-0 w-full h-full flex items-end justify-center snap-center pb-0"
              style={{ scrollSnapAlign: 'center' }}
            >
              <img
                src={`/characters/${charNum}.png`}
                alt={`Character ${charNum}`}
                className="h-auto w-auto object-contain object-bottom"
                style={{
                  width: charNum === 2 ? '40%' : '55%',
                  maxHeight: '70%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Desktop: All characters at bottom */}
        <div className="hidden sm:flex absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] justify-center items-end gap-5 animate-slideUp">
          <img
            src="/characters/1.png"
            alt="Character 1"
            className="h-auto w-[20%] cursor-pointer transition-transform duration-700 hover:scale-105"
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(1)}
            style={{ transform: activeChar && activeChar !== 1 ? 'translateY(100%)' : 'translateY(0)' }}
          />
          <img
            src="/characters/2.png"
            alt="Character 2"
            className="h-auto w-[14%] cursor-pointer transition-transform duration-700 hover:scale-105"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(2)}
            style={{ transform: activeChar && activeChar !== 2 ? 'translateY(100%)' : 'translateY(0)' }}
          />
          <img
            src="/characters/3.png"
            alt="Character 3"
            className="h-auto w-[20%] cursor-pointer transition-transform duration-700 hover:scale-105"
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(3)}
            style={{ transform: activeChar && activeChar !== 3 ? 'translateY(100%)' : 'translateY(0)' }}
          />
          <img
            src="/characters/4.png"
            alt="Character 4"
            className="h-auto w-[20%] cursor-pointer transition-transform duration-700 hover:scale-105"
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(4)}
            style={{ transform: activeChar && activeChar !== 4 ? 'translateY(100%)' : 'translateY(0)' }}
          />
          <img
            src="/characters/5.png"
            alt="Character 5"
            className="h-auto w-[20%] cursor-pointer transition-transform duration-700 hover:scale-105"
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCharClick(5)}
            style={{ transform: activeChar && activeChar !== 5 ? 'translateY(100%)' : 'translateY(0)' }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center overflow-auto">
        {/* Selected Brands text - responsive */}
        <p className="text-[#d4e2f3] text-center text-xs sm:text-sm uppercase tracking-wider font-['Jost',sans-serif] font-medium px-4 mt-5">
         Selected Brands I've Worked On
        </p>

        {/* Brand Logos - scrolling on mobile, static on larger screens */}
        <div className="mt-[30px] animate-logoSlideUp">
        {/* Mobile: Infinite scroll - below 870px */}
        <div className="max-[870px]:block hidden overflow-hidden">
          <div className="flex animate-scroll-mobile">
            <div className="flex gap-8 shrink-0">
              <img src="/logos/1xbet.png" alt="1xBet" className="h-5 w-auto logo-color" />
              <img src="/logos/betsson.png" alt="Betsson" className="h-5 w-auto logo-color" />
              <img src="/logos/parimatch.png" alt="Parimatch" className="h-5 w-auto logo-color" />
              <img src="/logos/pinup.png" alt="Pin-Up" className="h-5 w-auto logo-color" />
              <img src="/logos/stake.png" alt="Stake" className="h-5 w-auto logo-color" />
              <img src="/logos/thunderpick.png" alt="Thunderpick" className="h-5 w-auto logo-color" />
              <img src="/logos/wow.png" alt="WOW" className="h-5 w-auto logo-color" />
            </div>
            <div className="flex gap-8 shrink-0 ml-8">
              <img src="/logos/1xbet.png" alt="1xBet" className="h-5 w-auto logo-color" />
              <img src="/logos/betsson.png" alt="Betsson" className="h-5 w-auto logo-color" />
              <img src="/logos/parimatch.png" alt="Parimatch" className="h-5 w-auto logo-color" />
              <img src="/logos/pinup.png" alt="Pin-Up" className="h-5 w-auto logo-color" />
              <img src="/logos/stake.png" alt="Stake" className="h-5 w-auto logo-color" />
              <img src="/logos/thunderpick.png" alt="Thunderpick" className="h-5 w-auto logo-color" />
              <img src="/logos/wow.png" alt="WOW" className="h-5 w-auto logo-color" />
            </div>
          </div>
        </div>

        {/* Desktop: Static grid - 870px and above */}
        <div className="min-[871px]:flex hidden items-center justify-center gap-6 md:gap-8 flex-wrap px-4 max-w-4xl mx-auto">
          <img src="/logos/1xbet.png" alt="1xBet" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/betsson.png" alt="Betsson" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/parimatch.png" alt="Parimatch" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/pinup.png" alt="Pin-Up" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/stake.png" alt="Stake" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/thunderpick.png" alt="Thunderpick" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/wow.png" alt="WOW" className="h-6 md:h-[26.6px] logo-color hover:opacity-60 transition-opacity duration-300" />
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
          color: #15222c;
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
          left: calc(50% - 130px - 5vw);
        }

        .svg-right {
          right: calc(50% - 130px - 5vw);
        }

        @media (min-width: 768px) {
          .svg-left {
            left: calc(50% - 250px);
          }

          .svg-right {
            right: calc(50% - 250px);
          }
        }

        @media (min-width: 1024px) {
          .svg-left {
            left: calc(50% - 380px);
          }

          .svg-right {
            right: calc(50% - 380px);
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
      `}</style>
    </div>
  )
}

export default Home
