import { useNavigate } from 'react-router-dom'

function AICreator() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#15222c] p-[clamp(6px,1.5vw,12px)] animate-fadeIn relative">
      {/* Header with logo and buttons */}
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        {/* Back button on the left */}
        <div className="absolute left-[clamp(16px,3vw,40px)] w-auto">
          <button
            onClick={() => navigate('/')}
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full sm:rounded-[clamp(8px,2vw,12px)] text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] whitespace-nowrap"
          >
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="hidden sm:inline">Character Select</span>
          </button>
        </div>

        {/* Logo centered - clickable */}
        <img
          src="/ibheelz-logo.png"
          alt="ibheelz"
          className="h-[clamp(3rem,6vw,4.25rem)] w-auto cursor-pointer"
          style={{ maxHeight: '68px' }}
          onClick={() => navigate('/')}
        />

        {/* View Resume button on the right */}
        <div className="absolute right-[clamp(16px,3vw,40px)]">
          <button
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full sm:rounded-[clamp(8px,2vw,12px)] text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)]"
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

      {/* Container with hero image */}
      <div className="mt-[clamp(0px,1vh,12px)] w-full rounded-[clamp(16px,4vw,30px)] overflow-hidden relative aspect-square sm:aspect-auto" style={{ backgroundColor: '#222d37', height: 'auto' }}>
        <div className="sm:hidden w-full" style={{ paddingBottom: '100%', position: 'relative' }}>
          {/* Background text for mobile square */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 px-[clamp(12px,4vw,20px)]">
            <h1 className="font-['Libre_Baskerville',serif] font-bold leading-none" style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)', color: '#2c3c4b', marginBottom: 'clamp(-0.5rem, -1vw, -1rem)' }}>
              AI
            </h1>
            <h1 className="font-['Libre_Baskerville',serif] font-bold leading-none" style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)', color: '#2c3c4b' }}>
              CREATOR
            </h1>
          </div>
          {/* Hero image for mobile */}
          <img
            src="/pages-hero-1.webp"
            alt="AI Creator Hero"
            className="absolute bottom-0 left-1/2 w-auto object-contain animate-slideUpHero z-10"
            style={{ height: 'clamp(60%, 20vw, 85%)' }}
          />
        </div>

        {/* Tablet and Desktop */}
        <div className="hidden sm:block relative" style={{ height: 'clamp(300px, 40vh, 550px)', minHeight: '280px' }}>
          {/* Background text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 px-[clamp(12px,4vw,20px)]">
            <h1 className="font-['Libre_Baskerville',serif] font-bold leading-none" style={{ fontSize: 'clamp(4rem, 28vh, 17rem)', color: '#2c3c4b', marginBottom: 'clamp(-2rem, -4vh, -3rem)' }}>
              AI
            </h1>
            <h1 className="font-['Libre_Baskerville',serif] font-bold leading-none" style={{ fontSize: 'clamp(4rem, 28vh, 17rem)', color: '#2c3c4b' }}>
              CREATOR
            </h1>
          </div>

          {/* Hero image on top */}
          <img
            src="/pages-hero-1.webp"
            alt="AI Creator Hero"
            className="absolute bottom-0 left-1/2 w-auto object-contain animate-slideUpHero z-10"
            style={{ height: 'clamp(85%, 38vh, 92%)' }}
          />
        </div>
      </div>

      <style jsx>{`
        .liquid-glass-header {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: clamp(20px, 4vw, 30px);
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
          background: #ffffff;
          border-color: #ffffff;
          box-shadow: none;
          color: #15222c;
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
            transform: translateX(calc(-50% + clamp(200px, 25vw, 400px))) translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateX(calc(-50% + clamp(200px, 25vw, 400px))) translateY(0);
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

export default AICreator
