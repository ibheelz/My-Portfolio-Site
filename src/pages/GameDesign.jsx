import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function GameDesign() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCard, setModalCard] = useState(null)

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
      <div
        className="flex-1 mt-[clamp(8px,2vh,16px)] grid grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(8px,2vw,16px)] min-h-0"
      >
        {[...Array(6)].map((_, idx) => {
          const base = idx === 4 ? 'theme-card' : 'glass-card cursor-pointer'
          const anim = idx === 1 ? ' anim-card-fade' : (idx === 0 || idx === 3) ? ' anim-card-in-left' : (idx === 2 || idx === 5) ? ' anim-card-in-right' : ''
          const clickProps = idx === 4 ? {} : { onClick: () => { setModalOpen(true); setModalCard(idx) } }
          return (
            <div
              key={idx}
              className={`${base} rounded-[clamp(14px,2vw,22px)] w-full h-full min-h-[clamp(120px,20vh,260px)]${anim} ${idx === 4 ? 'order-first sm:order-none' : ''}`}
              {...clickProps}
            />
          )
        })}
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
            min-height: clamp(180px, 35vh, 360px) !important;
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
      `}</style>
    </div>
  )
}

export default GameDesign
