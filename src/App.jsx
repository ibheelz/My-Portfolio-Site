import { useState, useEffect, useRef } from 'react'

function App() {
  const [hoveredChar, setHoveredChar] = useState(null)
  const [clickedChar, setClickedChar] = useState(null)
  const isCharacterClickRef = useRef(false)
  const justUnfocusedRef = useRef(false)

  const activeChar = clickedChar || hoveredChar

  const handleCharClick = (charNum) => {
    isCharacterClickRef.current = true
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

  return (
    <div className="min-h-screen bg-[#15222c] p-[8px] sm:p-[12px]">
      {/* White container with responsive margins */}
      <div
        className="w-full min-h-[500px] sm:min-h-[600px] md:min-h-[705px] rounded-[20px] sm:rounded-[30px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient overlays */}
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #6e3534 0%, #ae504d 40%, #d88078 100%)',
            opacity: activeChar === 1 ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #4a346e 0%, #6e4dae 40%, #a378d8 100%)',
            opacity: activeChar === 2 ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #346e4a 0%, #4dae72 40%, #78d8a3 100%)',
            opacity: activeChar === 3 ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #6e4a34 0%, #ae764d 40%, #d8a378 100%)',
            opacity: activeChar === 4 ? 1 : 0
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            background: 'linear-gradient(to bottom, #344a6e 0%, #4d8eae 40%, #78bcd8 100%)',
            opacity: activeChar === 5 ? 1 : 0
          }}
        />

        {/* Logo */}
        <div
          className="absolute animate-slideDown transition-all duration-700"
          style={{
            top: 'calc(1.5rem + 0.5vw)',
            left: clickedChar ? '50px' : '50%',
            transform: clickedChar ? 'translateX(0)' : 'translateX(-50%)'
          }}
        >
          <img src="/ibheelz-logo.png" alt="ibheelz" className="h-[clamp(3.5rem,8vw,4.25rem)] lg:h-[68px] w-auto" />
        </div>

        {/* Left SVG */}
        <img
          src="/left.svg"
          alt=""
          className="absolute h-8 sm:h-9 md:h-10 lg:h-12 xl:h-14 w-auto opacity-60 top-1/2 lg:top-32 transform -translate-y-1/2 lg:translate-y-0 svg-left transition-opacity duration-700"
          style={{ opacity: clickedChar ? 0 : 0.6 }}
        />

        {/* Right SVG */}
        <img
          src="/right.svg"
          alt=""
          className="absolute h-8 sm:h-9 md:h-10 lg:h-12 xl:h-14 w-auto opacity-60 top-1/2 lg:top-32 transform -translate-y-1/2 lg:translate-y-0 svg-right transition-opacity duration-700"
          style={{ opacity: clickedChar ? 0 : 0.6 }}
        />

        {/* Hero text */}
        <div
          className="absolute top-1/2 lg:top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-center px-4 sm:px-6 md:px-8 w-full transition-opacity duration-700"
          style={{ opacity: clickedChar ? 0 : 1 }}
        >
          <div className="text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed lg:mt-0">
            <div className="text-[clamp(2rem,5vw,3rem)] lg:text-5xl font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-none lg:leading-tight">
              I craft digital<br className="lg:hidden" /> experiences
            </div>
            <div className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] text-[#a5c8e4] mt-3 lg:mt-2">where art, code, and intelligence converge.</div>
          </div>
        </div>

        {/* Characters at the bottom - responsive */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] flex justify-center items-end gap-5 animate-slideUp">
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

      {/* Selected Brands text - responsive */}
      <p className="text-[#d4e2f3] text-center mt-8 sm:mt-12 md:mt-20 text-xs sm:text-sm uppercase tracking-wider font-['Jost',sans-serif] font-medium px-4">
       Selected Brands I've Worked On
      </p>

      {/* Brand Logos - scrolling on mobile, static on larger screens */}
      <div className="mt-6 sm:mt-8 md:mt-10">
        {/* Mobile: Infinite scroll */}
        <div className="md:hidden overflow-hidden">
          <div className="flex animate-scroll-mobile">
            <div className="flex gap-8 shrink-0">
              <img src="/logos/1xbet.png" alt="1xBet" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/betsson.png" alt="Betsson" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/parimatch.png" alt="Parimatch" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/pinup.png" alt="Pin-Up" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/stake.png" alt="Stake" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/thunderpick.png" alt="Thunderpick" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/wow.png" alt="WOW" className="h-5 brightness-0 invert w-auto" />
            </div>
            <div className="flex gap-8 shrink-0 ml-8">
              <img src="/logos/1xbet.png" alt="1xBet" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/betsson.png" alt="Betsson" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/parimatch.png" alt="Parimatch" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/pinup.png" alt="Pin-Up" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/stake.png" alt="Stake" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/thunderpick.png" alt="Thunderpick" className="h-5 brightness-0 invert w-auto" />
              <img src="/logos/wow.png" alt="WOW" className="h-5 brightness-0 invert w-auto" />
            </div>
          </div>
        </div>

        {/* Desktop: Static grid */}
        <div className="hidden md:flex items-center justify-center gap-6 md:gap-8 flex-wrap px-4 max-w-4xl mx-auto">
          <img src="/logos/1xbet.png" alt="1xBet" className="h-6 md:h-7 brightness-0 invert hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/betsson.png" alt="Betsson" className="h-6 md:h-7 brightness-0 invert hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/parimatch.png" alt="Parimatch" className="h-6 md:h-7 brightness-0 invert hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/pinup.png" alt="Pin-Up" className="h-6 md:h-7 brightness-0 invert hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/stake.png" alt="Stake" className="h-6 md:h-7 brightness-0 invert hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/thunderpick.png" alt="Thunderpick" className="h-6 md:h-7 brightness-0 invert hover:opacity-60 transition-opacity duration-300" />
          <img src="/logos/wow.png" alt="WOW" className="h-6 md:h-7 brightness-0 invert hover:opacity-60 transition-opacity duration-300" />
        </div>
      </div>

      <style jsx>{`
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
            transform: translate(-50%, -100%);
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

        /* SVG positioning - reduces from 50px on desktop to less on mobile */
        .svg-left {
          left: calc(50% - 140px - 8vw);
        }

        .svg-right {
          right: calc(50% - 140px - 8vw);
        }

        @media (min-width: 1024px) {
          .svg-left {
            left: calc(50% - 420px);
          }

          .svg-right {
            right: calc(50% - 420px);
          }
        }
      `}</style>
    </div>
  )
}

export default App
