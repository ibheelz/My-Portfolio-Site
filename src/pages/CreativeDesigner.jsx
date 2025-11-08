import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function CreativeDesigner() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCard, setModalCard] = useState(null)

  // Lock background scroll and interactions while modal is open
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow

    if (modalOpen) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
    } else {
      html.style.overflow = prevHtmlOverflow || ''
      body.style.overflow = prevBodyOverflow || ''
    }

    return () => {
      html.style.overflow = prevHtmlOverflow || ''
      body.style.overflow = prevBodyOverflow || ''
    }
  }, [modalOpen])

  return (
    <div className="min-h-screen bg-[#06080a] p-[clamp(6px,1.5vw,12px)] animate-fadeIn relative flex flex-col">
      {/* Header with logo and buttons */}
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

      {/* 3 x 2 Glass grid beneath navbar */}
      {/* Centered hero image */}
      <div
        className="flex-1 flex justify-center items-start md:items-center p-0 mt-0 -mx-[clamp(6px,1.5vw,12px)] -mb-[clamp(6px,1.5vw,12px)] px-[clamp(18px,4.5vw,36px)] md:px-0 anim-bg-soft"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${import.meta.env.BASE_URL}creative-designer-BG.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center 0px',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16">
          {/* Left side buttons (lg+) */}
          <div className="hidden lg:flex flex-col gap-28 items-center justify-center lg:my-24">
            {['web design','posters & flyers'].map((label, i) => (
              <button
                key={`left-${i}`}
                className="apple-glass-button-accent rounded-full text-white font-['Jost',sans-serif] font-medium capitalize transition-all duration-300 flex items-center justify-center gap-3 px-[clamp(26px,3vw,48px)] py-[clamp(24px,5vw,48px)] text-[clamp(12px,1.2vw,18px)]"
                style={{ minWidth: 'clamp(280px, 24vw, 480px)' }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Center hero image */}
          <img
            src={import.meta.env.BASE_URL + 'creative-designer-hero.webp'}
            alt="Creative Designer"
            className="w-full lg:w-auto h-auto object-contain mt-[20px] md:mt-0 anim-content-soft"
            style={{ maxHeight: '78vh' }}
          />

          {/* Right side buttons (lg+) */}
          <div className="hidden lg:flex flex-col gap-28 items-center justify-center lg:my-24">
            {['print design','brochures'].map((label, i) => (
              <button
                key={`right-${i}`}
                className="apple-glass-button-accent rounded-full text-white font-['Jost',sans-serif] font-medium capitalize transition-all duration-300 flex items-center justify-center gap-3 px-[clamp(26px,3vw,48px)] py-[clamp(24px,5vw,48px)] text-[clamp(12px,1.2vw,18px)]"
                style={{ minWidth: 'clamp(280px, 24vw, 480px)' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Big CTA buttons (2 x 2) on small screens only */}
      <div className="lg:hidden px-[clamp(6px,1.5vw,12px)] md:px-[clamp(10px,2vw,16px)] mt-[105px] mb-[clamp(63px,10.5vh,98px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(10px,2vw,18px)] gap-y-[clamp(56px,14vw,98px)]">
          {['web design','posters & flyers','print design','brochures'].map((label, i) => (
            <button
              key={i}
              className="apple-glass-button-accent w-full rounded-full text-white font-['Jost',sans-serif] font-medium capitalize transition-all duration-300 flex items-center justify-center gap-2 py-[clamp(16px,3.5vw,26px)] text-[clamp(11px,1.5vw,14px)]"
            >
              {label}
            </button>
          ))}
        </div>
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
            {/* Two equal panes, no margin/padding */}
            <div className="modal-split">
              <div className="modal-pane-left"></div>
              <div className="modal-pane-right"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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
          position: sticky;
          top: 0;
          z-index: 50;
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

        .glass-button:hover,
        .glass-button:active {
          background: #ec6d6c;
          border-color: #ec6d6c;
          box-shadow: none;
          color: #ffffff; /* white text on pinkish bg */
        }
        /* Ensure icons turn white on pinkish bg */
        .glass-button:hover svg,
        .glass-button:active svg {
          stroke: #ffffff;
          fill: none;
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

        /* Glass grid cards – match navbar glass style */
        .glass-card {
          /* Match navbar fill */
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
        }

        .theme-card {
          /* Middle bottom: solid theme background */
          background: #06080a;
          border: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          box-shadow: none;
        }

        /* Grey merged center card */
        .grey-card {
          background: #06080a; /* page theme color */
          border: none;
        }

        /* Apple-style liquid glass buttons (from homepage) */
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

        /* Match navbar glass style */
        .apple-glass-button-accent {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
          color: #e7f2f8;
        }

        .apple-glass-button-accent::before { display: none; }

        .apple-glass-button-accent::after { display: none; }

        .apple-glass-button-accent:hover,
        .apple-glass-button-accent:active {
          background: #ec6d6c;
          border-color: #ec6d6c;
          box-shadow: none;
          color: #ffffff; /* white text on pinkish bg */
        }
        .apple-glass-button-accent:hover svg,
        .apple-glass-button-accent:active svg {
          stroke: #ffffff;
          fill: none;
        }

        @keyframes liquidMove {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10%, 5%); }
          100% { transform: translate(0, 0); }
        }

        @keyframes glossyShine {
          0% { left: -100%; }
          50%, 100% { left: 200%; }
        }

        /* Page-level soft intro animations (exclude navbar) */
        @keyframes bgSoftIn {
          0% { opacity: 0; transform: scale(1.015); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes contentSoftIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .anim-bg-soft { animation: bgSoftIn 800ms ease-out both; }
        .anim-content-soft { animation: contentSoftIn 900ms ease-out 200ms both; }

        /* Small screens: increase card height */
        @media (max-width: 639.98px) {
          .glass-card,
          .theme-card {
            min-height: clamp(180px, 35vh, 360px) !important;
          }
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          /* Theme-aware translucent overlay with backdrop blur */
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
          width: 88vw; /* 10% bigger */
          aspect-ratio: 16 / 9; /* landscape */
          max-height: 88vh; /* 10% bigger */
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
          width: clamp(26px, 3.85vw, 32px); /* 30% smaller */
          height: clamp(26px, 3.85vw, 32px); /* 30% smaller */
          border-radius: 9999px;
          box-sizing: border-box;
        }
        /* Hover handled by .glass-button hover rules */

        /* Split panes (no inner margins) */
        .modal-split {
          display: flex;
          width: 100%;
          height: 100%;
        }
        .modal-pane-left,
        .modal-pane-right {
          flex: 1 1 50%;
          height: 100%;
        }
        .modal-pane-left { background: transparent; }
        .modal-pane-right { background: #06080a; color: #e7f2f8; }

        /* Card entrance animations */
        @keyframes cardInLeft {
          from { transform: translateX(-120vw); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes cardInRight {
          from { transform: translateX(120vw); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes cardSoftFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        /* Slow entrance (as before) */
        .anim-card-in-left { animation: cardInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .anim-card-in-right { animation: cardInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .anim-card-fade { animation: cardSoftFade 2.4s ease-out 200ms both; }
      `}</style>
    </div>
  )
}

export default CreativeDesigner
