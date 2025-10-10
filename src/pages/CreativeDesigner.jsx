import { useNavigate } from 'react-router-dom'

function CreativeDesigner() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#15222c] p-[8px] sm:p-[12px] animate-fadeIn relative">
      {/* Header with logo and buttons */}
      <div className="liquid-glass-header flex items-center justify-center py-3 sm:py-4 relative">
        {/* Back button on the left */}
        <div className="absolute left-6 sm:left-8 md:left-10 w-auto">
          <button
            onClick={() => navigate('/')}
            className="glass-button px-2 py-1 sm:px-3 sm:py-[5px] md:px-3.5 md:py-[6px] rounded-[10px] sm:rounded-[11px] md:rounded-[12px] text-xs sm:text-sm font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
          >
            <svg width="10" height="10" className="sm:w-[11px] sm:h-[11px] md:w-[12px] md:h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Character Select
          </button>
        </div>

        {/* Logo centered - clickable */}
        <img
          src="/ibheelz-logo.png"
          alt="ibheelz"
          className="h-[clamp(3.5rem,7vw,4.25rem)] w-auto cursor-pointer"
          style={{ maxHeight: '68px' }}
          onClick={() => navigate('/')}
        />

        {/* View Resume button on the right */}
        <div className="absolute right-6 sm:right-8 md:right-10">
          <button
            className="glass-button px-2 py-1 sm:px-3 sm:py-[5px] md:px-3.5 md:py-[6px] rounded-[10px] sm:rounded-[11px] md:rounded-[12px] text-xs sm:text-sm font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-1 sm:gap-1.5"
          >
            <svg width="10" height="10" className="sm:w-[11px] sm:h-[11px] md:w-[12px] md:h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            View Resume
          </button>
        </div>
      </div>

      {/* Container with hero image */}
      <div className="mt-0 sm:mt-2 md:mt-3 w-full rounded-[20px] sm:rounded-[25px] md:rounded-[30px] overflow-hidden relative aspect-square sm:aspect-auto" style={{ backgroundColor: '#222d37', height: 'auto' }}>
        <div className="sm:hidden w-full" style={{ paddingBottom: '100%', position: 'relative' }}>
          {/* Background text for mobile square */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 px-4">
            <h1 className="font-['Libre_Baskerville',serif] font-bold leading-none" style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)', color: '#2c3c4b', marginBottom: 'clamp(-0.5rem, -1vw, -1rem)' }}>
              CREATIVE
            </h1>
            <h1 className="font-['Libre_Baskerville',serif] font-bold leading-none" style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)', color: '#2c3c4b' }}>
              DESIGNER
            </h1>
          </div>
          {/* Hero image for mobile */}
          <img
            src="/pages-hero-1.webp"
            alt="Creative Designer Hero"
            className="absolute bottom-0 left-1/2 h-[80%] w-auto object-contain animate-slideUpHero z-10"
          />
        </div>

        {/* Tablet and Desktop */}
        <div className="hidden sm:block relative" style={{ height: 'clamp(340px, 40vh, 500px)' }}>
          {/* Background text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 px-4">
            <h1 className="font-['Libre_Baskerville',serif] font-bold leading-none" style={{ fontSize: 'clamp(4rem, 28vh, 17rem)', color: '#2c3c4b', marginBottom: 'clamp(-2rem, -4vh, -3rem)' }}>
              CREATIVE
            </h1>
            <h1 className="font-['Libre_Baskerville',serif] font-bold leading-none" style={{ fontSize: 'clamp(4rem, 28vh, 17rem)', color: '#2c3c4b' }}>
              DESIGNER
            </h1>
          </div>

          {/* Hero image on top */}
          <img
            src="/pages-hero-1.webp"
            alt="Creative Designer Hero"
            className="absolute bottom-0 left-1/2 h-[88%] md:h-[90%] w-auto object-contain animate-slideUpHero z-10"
          />
        </div>
      </div>

      <style jsx>{`
        .liquid-glass-header {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
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

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ffffff;
          box-shadow: none;
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

        @keyframes slideUpHero {
          from {
            transform: translateX(calc(-50% + min(400px, 30vw))) translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateX(calc(-50% + min(400px, 30vw))) translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUpHero {
          animation: slideUpHero 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default CreativeDesigner
