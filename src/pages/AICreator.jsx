import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function AICreator() {
  const navigate = useNavigate()
  const location = useLocation()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCard, setModalCard] = useState(null)
  const [heroKey, setHeroKey] = useState(0)
  useEffect(() => {
    if (location.state && location.state.animateHero) {
      setHeroKey((k) => k + 1)
    }
  }, [])

  // Lock background scroll when modal open
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    if (modalOpen) { html.style.overflow = 'hidden'; body.style.overflow = 'hidden' }
    else { html.style.overflow = prevHtmlOverflow || ''; body.style.overflow = prevBodyOverflow || '' }
    return () => { html.style.overflow = prevHtmlOverflow || ''; body.style.overflow = prevBodyOverflow || '' }
  }, [modalOpen])

  return (
    <div className="min-h-screen bg-[#06080a] p-[clamp(6px,1.5vw,12px)] animate-fadeIn relative flex flex-col">
      {/* Fixed, non-scrolling background layer */}
      <div
        className="page-fixed-bg"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${import.meta.env.BASE_URL}ai-creator-BG.webp)`
        }}
      />
      {/* Fixed darkening overlay (does not scroll) */}
      <div className="page-fixed-overlay" aria-hidden />
      {/* Header with logo and buttons (fixed) */}
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        {/* Left SVG */}
        <img
          src="/left.svg"
          alt=""
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left svg-gold sub-anim-svg-left"
        />

        {/* Right SVG */}
        <img
          src="/right.svg"
          alt=""
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right svg-gold sub-anim-svg-right"
        />

        {/* Back button on the left */}
        <div className="absolute left-[clamp(16px,3vw,40px)] w-auto">
          <button
            onClick={() => navigate('/')}
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full sm:rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] whitespace-nowrap"
          >
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="hidden sm:inline">Character Select</span>
          </button>
        </div>

        {/* Logo centered - clickable */}
        <img
          src="/ibheelz-logo.webp"
          alt="ibheelz"
          className="h-[clamp(3rem,6vw,4.25rem)] w-auto cursor-pointer sub-anim-logo-slow"
          style={{ maxHeight: '68px' }}
          onClick={() => navigate('/')}
        />

        {/* View Resume button on the right */}
        <div className="absolute right-[clamp(16px,3vw,40px)]">
          <button
            onClick={() => window.open('/Resume.pdf', '_blank')}
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full sm:rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] cursor-pointer"
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

      {/* Spacer to offset fixed navbar height */}
      <div className="header-spacer" />

      {/* Background section under navbar (fixed background/overlay) */}
      <div
        className="page-content relative ai-bg subpad flex-1 flex flex-col items-center justify-center p-0 mt-0 -mx-[clamp(12px,3vw,24px)] -mb-[clamp(12px,3vw,24px)] px-[clamp(18px,4.5vw,36px)] md:px-0 anim-bg-soft"
      >
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-20">
          {/* Left side image (Annie) */}
          <div className="hidden lg:flex flex-col items-center justify-center lg:my-24">
            <img
              src={import.meta.env.BASE_URL + 'annie-hero.webp'}
              alt="Annie"
              className="block"
              style={{
                minWidth: 'clamp(320px, 26vw, 640px)',
                height: 'clamp(220px, 32vh, 520px)',
                objectFit: 'contain',
                opacity: 1,
                filter: 'none',
                position: 'relative',
                zIndex: 1
              }}
            />
            <div
              className="ai-badge font-['Jost',sans-serif] font-medium capitalize text-[clamp(11px,1vw,16px)]"
              style={{ minWidth: 'clamp(280px, 24vw, 480px)', height: 'clamp(64px,6.4vw,96px)', marginTop: 'clamp(12px,1.5vw,16px)' }}
            >
              <span className="ai-badge__label">Annie Radley</span>
            </div>
          </div>

          {/* Centered hero image */}
          <img
            key={heroKey}
            src={import.meta.env.BASE_URL + 'ai-creator-hero.webp'}
            alt="AI Creator"
            className="w-full lg:w-auto h-auto object-contain mt-[clamp(48px,8vw,96px)] lg:mt-0 anim-content-soft mx-auto lg:mx-0"
            style={{ maxWidth: 'min(92vw, 1100px)', maxHeight: '75vh' }}
          />

          {/* Right side image (Lucia) */}
          <div className="hidden lg:flex flex-col items-center justify-center lg:my-24">
            <img
              src={import.meta.env.BASE_URL + 'lucia-hero.webp'}
              alt="Lucia"
              className="block"
              style={{
                minWidth: 'clamp(320px, 26vw, 640px)',
                height: 'clamp(220px, 32vh, 520px)',
                objectFit: 'contain',
                opacity: 1,
                filter: 'none',
                position: 'relative',
                zIndex: 1
              }}
            />
            <div
              className="ai-badge font-['Jost',sans-serif] font-medium capitalize text-[clamp(11px,1vw,16px)]"
              style={{ minWidth: 'clamp(280px, 24vw, 480px)', height: 'clamp(64px,6.4vw,96px)', marginTop: 'clamp(12px,1.5vw,16px)' }}
            >
              <span className="ai-badge__label">Lucia Pazmiño</span>
            </div>
          </div>
        </div>

          {/* Mobile stacked images under hero */}
          <div className="lg:hidden w-full px-0 mt-[clamp(36px,7vw,64px)] mb-[clamp(80px,12vh,140px)] text-center">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 gap-[clamp(14px,3vw,24px)]">
            <div className="ai-mobile-pair">
              <img
                src={import.meta.env.BASE_URL + 'annie-hero.webp'}
                alt="Annie"
                className="w-full object-contain mx-auto"
                style={{ height: 'clamp(216px, 48vw, 432px)', opacity: 1, filter: 'none', position: 'relative', zIndex: 1 }}
              />
              <div className="ai-badge w-full font-['Jost',sans-serif] font-medium capitalize text-[clamp(13px,3.5vw,16px)]" style={{ height: 'clamp(77px,11.2vw,112px)', marginTop: 'clamp(16px,4vw,24px)' }}>
                <span className="ai-badge__label">Annie Radley</span>
              </div>
            </div>
            <div className="ai-mobile-pair">
              <img
                src={import.meta.env.BASE_URL + 'lucia-hero.webp'}
                alt="Lucia"
                className="w-full object-contain mx-auto"
                style={{ height: 'clamp(216px, 48vw, 432px)', opacity: 1, filter: 'none', position: 'relative', zIndex: 1 }}
              />
              <div className="ai-badge w-full font-['Jost',sans-serif] font-medium capitalize text-[clamp(13px,3.5vw,16px)]" style={{ height: 'clamp(77px,11.2vw,112px)', marginTop: 'clamp(16px,4vw,24px)' }}>
                <span className="ai-badge__label">Lucia Pazmiño</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hire Me button (mobile only, exact as homepage) */}
      <div className="lg:hidden page-content flex justify-center items-center px-4 mt-[40px] mb-5">
        <button className="apple-glass-button-accent px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base text-white font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2" style={{ minWidth: 'min(65vw, 520px)' }}>
          <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Hire Me
        </button>
      </div>

      {/* Modal overlay */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close glass-button rounded-full"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              title="Close"
            >
              ×
            </button>
            <div className="modal-split">
              <div className="modal-pane-left"></div>
              <div className="modal-pane-right"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Fixed background shared style */
        .page-fixed-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          pointer-events: none;
        }
        .page-fixed-overlay {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: rgba(0,0,0,0);
        }
        .page-content { position: relative; z-index: 2; }
        @media (max-width: 1023.98px) {
          .page-fixed-overlay { background: rgba(0,0,0,0.5); }
          /* Shift background slightly left on smaller screens */
          .page-fixed-bg { background-position: calc(50% - 50px) center; }
        }
        @media (min-width: 1024px) {
          .page-fixed-overlay { background: rgba(0,0,0,0.625); }
        }
        /* Fixed background shared style */
        .page-fixed-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          pointer-events: none;
        }
        .svg-gold {
          filter: brightness(0) saturate(100%) invert(76%) sepia(36%) saturate(459%) hue-rotate(358deg) brightness(97%) contrast(89%);
        }

        .svg-left {
          top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2);
          left: calc(50% - 70px);
          transform: translateY(-50%);
        }

        .svg-right {
          top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2);
          right: calc(50% - 70px);
          transform: translateY(-50%);
        }

        @media (min-width: 768px) {
          .svg-left {
            left: calc(50% - 120px);
          }
          .svg-right {
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
        }

        @media (min-width: 1280px) {
          .svg-left {
            left: calc(50% - 200px);
          }
          .svg-right {
            right: calc(50% - 200px);
          }
        }

        @media (min-width: 640px) {
          .svg-left {
            left: calc(50% - 90px);
          }
          .svg-right {
            right: calc(50% - 90px);
          }
        }

        .liquid-glass-header {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: clamp(20px, 4vw, 30px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: clamp(6px, 1.5vw, 12px);
          right: clamp(6px, 1.5vw, 12px);
          z-index: 10;
        }
        .header-spacer { height: clamp(72px, 12vh, 120px); }

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

        .glass-button:hover,
        .glass-button:active {
          background: #eac28a; /* AI Creator hover/click */
          border-color: #eac28a;
          box-shadow: none;
          color: #10171d;
        }

        /* Cards match navbar fill */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .theme-card {
          background: #06080a;
          border: none;
        }

        /* Small screens: increase card height */
        @media (max-width: 639.98px) {
          .glass-card,
          .theme-card {
            min-height: clamp(260px, 55vh, 640px) !important;
          }
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(6, 8, 10, 0.45);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
          overscroll-behavior: contain;
        }
        .modal-glass {
          position: relative;
          width: 88vw;
          aspect-ratio: 16 / 9;
          max-height: 88vh;
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: clamp(16px, 3vw, 28px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
          color: #e7f2f8;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }
        .modal-close {
          position: absolute;
          top: clamp(12px, 2vw, 20px);
          right: clamp(12px, 2vw, 20px);
          line-height: 1;
          font-size: clamp(12px, 1.6vw, 16px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 200ms ease;
          width: clamp(26px, 3.85vw, 32px);
          height: clamp(26px, 3.85vw, 32px);
          border-radius: 9999px;
          box-sizing: border-box;
        }

        .modal-split { display: flex; width: 100%; height: 100%; }
        .modal-pane-left, .modal-pane-right { flex: 1 1 50%; height: 100%; }
        .modal-pane-left { background: transparent; }
        .modal-pane-right { background: #06080a; color: #e7f2f8; }

        /* Side card entrance animations (match slow style) */
        @keyframes cardInLeft {
          from { transform: translateX(-120vw); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes cardInRight {
          from { transform: translateX(120vw); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .anim-card-in-left { animation: cardInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .anim-card-in-right { animation: cardInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }

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
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUpHero {
          animation: slideUpHero 1s ease-out forwards;
        }

        /* Very slow logo slide-in */
        @keyframes subLogoSlowIn {
          from { transform: translateY(-40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .sub-anim-logo-slow { animation: subLogoSlowIn 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }

        /* Very slow SVGs slide/fade from sides */
        @keyframes subSvgInLeft {
          from { transform: translateX(-14px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes subSvgInRight {
          from { transform: translateX(14px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .sub-anim-svg-left { animation: subSvgInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) 200ms both; }
        .sub-anim-svg-right { animation: subSvgInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) 260ms both; }

        /* Page-level soft intro animations (exclude navbar) */
        @keyframes bgSoftIn {
          0% { opacity: 0; transform: scale(1.015); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes contentSoftIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.992); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .anim-bg-soft { animation: bgSoftIn 800ms ease-out both; }
        .anim-content-soft { animation: contentSoftIn 900ms ease-out 200ms both; }

        /* Match Creative: extra darkening overlay via pseudo */
        .ai-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: rgba(0,0,0,0);
        }
        .ai-bg::before { display: none; }
        /* Apple-style glowing blue accent button (exact as homepage) */
        .apple-glass-button-accent {
          position: relative;
          overflow: hidden;
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
          color: #ffffff;
        }
        .apple-glass-button-accent::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 60%);
          animation: liquidMove 4s ease-in-out infinite;
        }
        .apple-glass-button-accent::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
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
      
      /* AI Creator element badge under hero images */
      .ai-badge {
        position: relative;
      }
      .ai-badge::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url('/ai-element.webp');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
      .ai-badge__label {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #ffffff;
        text-align: center;
        pointer-events: none;
        padding: 0 12px;
      }
      /* Extra spacing between the two mobile pairs */
      @media (max-width: 1023.98px) {
        .ai-mobile-pair { margin-bottom: clamp(36px, 12vw, 72px); }
      }
      /* Hover/click label color (match Creative/Branding) */
      .ai-badge:hover .ai-badge__label { color: #eabe76; }
      .ai-badge:active .ai-badge__label { color: #eabe76; }
        @media (max-width: 639.98px) {
          /* Add 2x horizontal padding on smaller screens */
          .subpad { padding-left: calc(clamp(18px, 4.5vw, 36px) * 2); padding-right: calc(clamp(18px, 4.5vw, 36px) * 2); }
        }
      `}</style>
    </div>
  )
}

export default AICreator
