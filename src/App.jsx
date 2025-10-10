function App() {
  return (
    <div className="min-h-screen bg-[#15222c] p-[8px] sm:p-[12px]">
      {/* White container with responsive margins */}
      <div className="w-full min-h-[500px] sm:min-h-[600px] md:min-h-[705px] rounded-[20px] sm:rounded-[30px] bg-cover bg-center bg-no-repeat relative overflow-hidden" style={{ backgroundImage: 'url(/hero-bg.png)' }}>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: 'calc(2.4rem)' }}>
          <img src="/ibheelz-logo.png" alt="ibheelz" className="h-9 sm:h-10 md:h-14 w-auto" />
        </div>

        {/* Hero text */}
        <div className="absolute top-1/2 md:top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-center px-4 sm:px-6 w-full">
          <div className="text-white leading-tight sm:leading-snug md:leading-relaxed -mt-12 sm:-mt-16 md:mt-0">
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#e7f2f8] font-['Libre_Baskerville',serif] leading-tight">I craft digital experiences</div>
            <div className="text-base sm:text-lg md:text-2xl mt-2 sm:mt-2 md:mt-3 font-light font-['Jost',sans-serif] text-[#a5c8e4]">where art, code, and intelligence converge.</div>
          </div>
        </div>

        {/* Zazzy image at the bottom - responsive */}
        <img
          src="/zazzy.webp"
          alt="Zazzy"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] animate-slideUp"
        />
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
      `}</style>
    </div>
  )
}

export default App
