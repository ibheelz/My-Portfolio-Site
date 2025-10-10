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
    <div className="h-screen overflow-hidden bg-[#15222c] p-[8px] sm:p-[12px] flex flex-col">
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
            top: 'clamp(1rem, 2vh, 2rem)',
            left: clickedChar ? 'clamp(30px, 4vw, 50px)' : '50%',
            transform: clickedChar ? 'translateX(0)' : 'translateX(-50%)'
          }}
        >
          <img src="/ibheelz-logo.png" alt="ibheelz" className="h-[clamp(3.5rem,7vw,4.25rem)] w-auto" style={{ maxHeight: '68px' }} />
        </div>

        {/* Left SVG */}
        <img
          src="/left.svg"
          alt=""
          className="absolute h-[26px] sm:h-[29px] md:h-[32px] lg:h-[32px] xl:h-[32px] w-auto top-1/2 lg:top-[148px] transform -translate-y-1/2 lg:translate-y-0 svg-left svg-gold transition-opacity duration-700"
          style={{ opacity: clickedChar ? 0 : 1 }}
        />

        {/* Right SVG */}
        <img
          src="/right.svg"
          alt=""
          className="absolute h-[26px] sm:h-[29px] md:h-[32px] lg:h-[32px] xl:h-[32px] w-auto top-1/2 lg:top-[148px] transform -translate-y-1/2 lg:translate-y-0 svg-right svg-gold transition-opacity duration-700"
          style={{ opacity: clickedChar ? 0 : 1 }}
        />

        {/* Hero text */}
        <div className="absolute top-1/2 lg:top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-center px-4 sm:px-6 md:px-8 w-full">
          <div className="text-white leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed lg:mt-0">
            <div
              className="text-[clamp(2rem,5vw,3rem)] lg:text-5xl font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-none lg:leading-tight transition-opacity duration-700"
              style={{ opacity: clickedChar ? 0 : 1 }}
            >
              I craft digital<br className="lg:hidden" /> experiences
            </div>
            <div
              className="text-[clamp(1rem,3vw,1.5rem)] lg:text-2xl font-light font-['Jost',sans-serif] mt-3 lg:mt-2 transition-opacity duration-700"
              style={{ opacity: clickedChar ? 0 : 1, color: '#d0dadf' }}
            >
              where art, code, and intelligence converge.
            </div>
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
      `}</style>
    </div>
  )
}

export default App
