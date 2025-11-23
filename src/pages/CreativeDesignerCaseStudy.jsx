import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { attachHireMe } from '../utils/attachHireMe'
// No foreground case image on this page; keep only navbar and background

// Use custom case study background from public/
const csBG = `${import.meta.env.BASE_URL}creative-designer-cs-BG.png`
// Frame image for each cell (on top of gold rectangle)
const frameImage = `${import.meta.env.BASE_URL}frame.png`
// Four black + white logos from images/logos
const logo1 = `${import.meta.env.BASE_URL}images/logos/martell-black.png`
const logo2 = `${import.meta.env.BASE_URL}images/logos/wow-black.png`
const logo3 = `${import.meta.env.BASE_URL}images/logos/miela-black.png`
const logo4 = `${import.meta.env.BASE_URL}images/logos/mielo-black.png`
const logo1W = `${import.meta.env.BASE_URL}images/logos/martell-white.png`
const logo2W = `${import.meta.env.BASE_URL}images/logos/wow-white.png`
const logo3W = `${import.meta.env.BASE_URL}images/logos/miela-white.png`
const logo4W = `${import.meta.env.BASE_URL}images/logos/mielo-white.png`

function CreativeDesignerCaseStudy() {
  const navigate = useNavigate()
  useEffect(() => {
    const cleanup = attachHireMe(document)
    return cleanup
  }, [])

  return (
    <div
      className="min-h-screen bg-[#06080a] px-[clamp(12px,3vw,24px)] relative flex flex-col overflow-hidden"
      style={{ ['--nav-h']: 'clamp(72px, 12vh, 120px)' }}
    >
      {/* Fixed background covering the whole viewport */}
      <div
        className="page-fixed-bg"
        aria-hidden
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${csBG})` }}
      />
      <div className="page-fixed-overlay" aria-hidden />

      {/* Navbar */}
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        <img decoding="async" src="/left.svg" alt="" className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left svg-gold sub-anim-svg-left" />
        <img decoding="async" src="/right.svg" alt="" className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right svg-gold sub-anim-svg-right" />

        {/* Back to Creative Designer */}
        <div className="absolute left-[clamp(16px,3vw,40px)] w-auto">
          <button
            onClick={() => navigate('/creative-designer', { replace: false, state: { animateHero: true } })}
            aria-label="Back to Creative Designer"
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] whitespace-nowrap"
          >
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="hidden sm:inline">Back to Creative Designer</span>
          </button>
        </div>

        {/* Logo center */}
        <img decoding="async" src="/ibheelz-logo.webp" alt="ibheelz" className="h-[clamp(3rem,6vw,4.25rem)] w-auto cursor-pointer sub-anim-logo-slow" style={{ maxHeight: '68px' }} onClick={() => navigate('/')} />

        {/* View Resume on right */}
        <div className="absolute right-[clamp(16px,3vw,40px)]">
          <button onClick={() => window.open('/Resume.pdf', '_blank')} className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] cursor-pointer">
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

      {/* Desktop: three white, fully-rounded vertical columns with margins */}
      <main className="content-layer animate-cases">
        <div className="columns-grid hidden lg:grid" aria-hidden>
          <div className="col-block split-rows">
            <div className="cell-parent tile-1">
              <div className="media">
                <div className="gold-rect" onClick={() => navigate('/creative-designer/case/martell')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/martell') }}>
                  <img className="logo-img logo-black" src={logo1} alt="Logo 1" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-black.png' }} />
                  <img className="logo-img logo-white" src={logo1W} alt="Logo 1 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
            <div className="cell-parent tile-2">
              <div className="media">
                <div className="gold-rect" onClick={() => navigate('/creative-designer/case/wow')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/wow') }}>
                  <img className="logo-img logo-black" src={logo2} alt="Logo 2" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/wow-black.png' }} />
                  <img className="logo-img logo-white" src={logo2W} alt="Logo 2 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/wow-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
          </div>
          <div className="col-block mid-fit">
            <img
              decoding="async"
              src="/creative-fit.png"
              alt="Creative fit"
              className="mid-fit-img anim-content-soft"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none' }}
            />
          </div>
          <div className="col-block split-rows">
            <div className="cell-parent tile-3">
              <div className="media">
                <div className="gold-rect" onClick={() => navigate('/creative-designer/case/miela')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/miela') }}>
                  <img className="logo-img logo-black" src={logo3} alt="Logo 3" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-black.png' }} />
                  <img className="logo-img logo-white" src={logo3W} alt="Logo 3 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
            <div className="cell-parent tile-4">
              <div className="media">
                <div className="gold-rect" onClick={() => navigate('/creative-designer/case/mielo')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/mielo') }}>
                  <img className="logo-img logo-black" src={logo4} alt="Logo 4" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/mielo-black.png' }} />
                  <img className="logo-img logo-white" src={logo4W} alt="Logo 4 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/mielo-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: transparent middle column comes first (hidden), then stack squares vertically */}
        <div className="mobile-stack lg:hidden">
          {/* Mobile: show the middle image first (like hero on Creative Designer) */}
          <div className="mid-fit-mobile">
            <img
              decoding="async"
              src="/creative-fit.png"
              alt="Creative fit"
              className="mid-fit-mobile-img anim-content-soft"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none' }}
            />
          </div>

          {/* Stack the four cases vertically */}
          <div className="cell-parent mobile-cell tile-1">
            <div className="media">
              <div className="gold-rect" onClick={() => navigate('/creative-designer/case/martell')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/martell') }}>
                <img className="logo-img logo-black" src={logo1} alt="Logo 1" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-black.png' }} />
                <img className="logo-img logo-white" src={logo1W} alt="Logo 1 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-white.png' }} />
              </div>
              <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
            </div>
          </div>

          <div className="cell-parent mobile-cell tile-2">
            <div className="media">
              <div className="gold-rect" onClick={() => navigate('/creative-designer/case/wow')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/wow') }}>
                <img className="logo-img logo-black" src={logo2} alt="Logo 2" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/wow-black.png' }} />
                <img className="logo-img logo-white" src={logo2W} alt="Logo 2 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/wow-white.png' }} />
              </div>
              <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
            </div>
          </div>

          <div className="cell-parent mobile-cell tile-3">
            <div className="media">
              <div className="gold-rect" onClick={() => navigate('/creative-designer/case/miela')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/miela') }}>
                <img className="logo-img logo-black" src={logo3} alt="Logo 3" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-black.png' }} />
                <img className="logo-img logo-white" src={logo3W} alt="Logo 3 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-white.png' }} />
              </div>
              <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
            </div>
          </div>

          <div className="cell-parent mobile-cell tile-4">
            <div className="media">
              <div className="gold-rect" onClick={() => navigate('/creative-designer/case/mielo')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/mielo') }}>
                <img className="logo-img logo-black" src={logo4} alt="Logo 4" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/mielo-black.png' }} />
                <img className="logo-img logo-white" src={logo4W} alt="Logo 4 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/mielo-white.png' }} />
              </div>
              <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Hire Me button (mobile only, exact as Creative Designer) */}
      <div className="lg:hidden page-content mobile-sticky-cta flex justify-center items-center px-4 mt-[40px] mb-5">
        <button className="apple-glass-button-neutral px-4 py-2 sm:px-5 sm:py-[8.6px] md:px-6 md:py-[9.6px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base text-white font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2" style={{ minWidth: 'min(65vw, 520px)' }}>
          <svg width="16" height="16" className="sm:w-[17px] sm:h-[17px] md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Hire Me
        </button>
      </div>

      <style>{`
        /* Background spans the entire viewport (match Creative Designer page) */
        .page-fixed-bg { position: fixed; inset: 0; z-index: 0; background-size: cover; background-position: center; pointer-events: none; }
        .page-fixed-overlay { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
        /* Overlay strength like Creative Designer page */
        @media (max-width: 1023.98px) { .page-fixed-overlay { background: rgba(0,0,0,0.35); } }
        @media (min-width: 1024px) { .page-fixed-overlay { background: rgba(0,0,0,0.5); } }
        /* On smaller screens, nudge background 4px to the right */
        @media (max-width: 1023.98px) {
          .page-fixed-bg { background-position: calc(50% - 4px) center; }
        }
        /* On bigger screens, nudge background 4px to the right */
        @media (min-width: 1024px) {
          .page-fixed-bg { background-position: calc(50% - 4px) center; }
        }

        

        /* Glass navbar */
        .liquid-glass-header {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: clamp(20px, 4vw, 30px);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: clamp(12px, 3vw, 24px);
          right: clamp(12px, 3vw, 24px);
          z-index: 10;
        }

        .header-spacer { height: var(--nav-h); }
        .content-layer { position: relative; z-index: 2; }

        /* Mobile sticky CTA fixed to bottom, above overlays */
        .mobile-sticky-cta {
          position: fixed;
          left: clamp(12px, 3vw, 24px);
          right: clamp(12px, 3vw, 24px);
          bottom: max(12px, env(safe-area-inset-bottom));
          z-index: 20;
          margin: 0;
        }

        /* Three rounded columns (desktop only) */
        .columns-grid { grid-template-columns: repeat(3, 1fr); gap: clamp(10px, 2vw, 28px); height: calc(100dvh - var(--nav-h) - 2px); padding: 0 clamp(8px, 1.5vh, 16px) clamp(8px, 1.5vh, 16px); box-sizing: border-box; }
        /* Force only one layout to render (override utilities if needed) */
        .columns-grid { display: none !important; }
        .mobile-stack { display: none !important; }
        .mid-col-mobile { display: none !important; }
        @media (max-width: 1023.98px) {
          .mobile-stack { display: grid !important; }
        }
        @media (min-width: 1024px) {
          .columns-grid { display: grid !important; }
          .mobile-stack { display: none !important; }
        }
        .col-block {
          height: 100%; width: 100%;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: 0;
          border-radius: clamp(12px, 1.2vw, 24px);
          box-shadow: none;
        }
        .split-rows { display: grid; grid-template-rows: repeat(2, minmax(0, 1fr)); row-gap: clamp(8px, 1vh, 16px); padding: clamp(8px, 1vh, 16px); box-sizing: border-box; min-height: 0; }
        /* Make the split columns act as containers only */
        .col-block.split-rows { background: transparent; border: 0; box-shadow: none; min-height: 0; }
        /* Desktop middle fit image */
        .mid-fit { display: flex; align-items: center; justify-content: center; padding: 0 clamp(8px, 1vh, 16px) clamp(8px, 1vh, 16px); }
        /* Large image within column */
        .mid-fit-img { width: auto; height: 85vh; max-height: calc(100% - 2 * clamp(8px, 1vh, 16px)); max-width: 100%; object-fit: contain; border: 0; display: block; }
        /* Make the small rectangle cells invisible but keep content inside */
        .cell-parent {
          width: 100%; height: 100%; min-height: 0;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: 0;
          border-radius: clamp(12px, 1.2vw, 24px);
          box-shadow: none;
          overflow: hidden;
          padding: 40px;
          box-sizing: border-box;
        }
        .media { position: relative; width: 100%; height: 100%; --frame-w: 80%; --frame-h: 80%; --rect-scale: 0.72; }
        /* Keep rectangle perfectly square: use the smaller of W/H */
        /* Square: 90% of frame, never exceeds either axis */
        .gold-rect {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          width: calc(min(var(--frame-w), var(--frame-h)) * var(--rect-scale));
          aspect-ratio: 1 / 1;
          background: #eac28a; border-radius: clamp(10px, 1vw, 18px); z-index: 1;
          display: flex; align-items: center; justify-content: center;
        }
        
        .logo-img { position: relative; z-index: 2; width: var(--logo-w, 40%); height: auto; object-fit: contain; display: block; border: 0; }
        .frame-img { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; width: var(--frame-w); height: var(--frame-h); object-fit: contain; display: block; border: 0; pointer-events: none; }

        /* Interactions (only when hovering square/logo) */
        .cell-parent { cursor: default; }
        .gold-rect { transition: background-color 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1); cursor: pointer; }
        .logo-img { transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), transform 1200ms cubic-bezier(0.22, 1, 0.36, 1); cursor: pointer; }
        .logo-white { opacity: 0; position: absolute; inset: 0; margin: auto; width: var(--logo-w, 40%); height: auto; object-fit: contain; }
        .logo-black { opacity: 1; }
        .gold-rect:hover, .gold-rect:active { background: #ec6d6c; }
        .gold-rect:hover .logo-black, .gold-rect:active .logo-black { opacity: 0; transform: translateY(-2px) scale(0.995); }
        .gold-rect:hover .logo-white, .gold-rect:active .logo-white { opacity: 1; transform: translateY(0) scale(1.01); }

        /* Mobile cell sizing so absolute items have room */
        .mobile-stack .mobile-cell { height: clamp(240px, 72vw, 440px); padding: clamp(16px, 4vw, 28px); }
        /* Use same square scale as desktop; keep frame roomy on mobile */
        .mobile-stack .mobile-cell .media { --frame-w: 92%; --frame-h: 92%; }


        /* Desktop 3-column viewport grid */
        .desktop-grid { grid-template-columns: minmax(0,1fr) var(--midw) minmax(0,1fr); column-gap: 0; height: calc(100dvh - var(--nav-h) - 2px); padding: 0; overflow: hidden; box-sizing: border-box; }
        .left-col, .right-col { height: 100%; margin: 0; padding: 0; }
        .mid-col { height: 100%; background: transparent; pointer-events: none; }

        /* Mobile vertical stack */
        .mobile-stack { display: grid; grid-template-columns: 1fr; row-gap: clamp(16px, 3vh, 24px); padding: 0 clamp(12px, 3vw, 24px); }

        /* Mobile middle image at top — fill viewport (below navbar) */
        .mid-fit-mobile { display: flex; align-items: center; justify-content: center; padding: clamp(8px, 4vw, 16px); }
        .mid-fit-mobile-img { height: calc(100vh - var(--nav-h)); width: auto; max-width: 100%; object-fit: contain; border: 0; display: block; }
        @media (max-width: 1023.98px) {
          /* Keep the middle image directly under the navbar: cancel spacer via negative margin */
          .mid-fit-mobile { transform: none; padding: 0; margin-top: calc(-1 * var(--nav-h) - 25px); }
          .mobile-stack { padding-top: 0; padding-left: clamp(12px, 3vw, 24px); padding-right: clamp(12px, 3vw, 24px); }
          /* Double page margin (x2) for the middle image horizontally */
          .mid-fit-mobile { padding-left: clamp(24px, 6vw, 48px); padding-right: clamp(24px, 6vw, 48px); }
          /* Pull other frames closer to the middle image (tighter) */
          .mobile-stack { row-gap: 0; }
          .mid-fit-mobile { margin-bottom: -32px; }
          .mobile-stack .mobile-cell { padding: clamp(4px, 2vw, 10px); }
          .mobile-stack .mobile-cell:first-of-type { padding-top: 0; }
          /* Use global spacer to offset content exactly by navbar height */
          .header-spacer { height: var(--nav-h) !important; }
        }

        /* Desktop: nudge left/right column content toward the middle column */
        @media (min-width: 1024px) {
          /* Tighter vertical spacing on desktop */
          .columns-grid { gap: clamp(6px, 1vw, 18px); }
          .split-rows { row-gap: clamp(4px, 0.6vh, 10px); }
          .cell-parent { padding: 24px; }
          /* Nudge middle image slightly closer to navbar */
          .mid-fit { margin-top: -24px; }

          /* Left column (first col-block) – add 10% more inward shift */
          .columns-grid > .col-block.split-rows:first-child .media .gold-rect,
          .columns-grid > .col-block.split-rows:first-child .media .frame-img { left: 70%; }
          /* Right column (last col-block) – add 10% more inward shift */
          .columns-grid > .col-block.split-rows:last-child .media .gold-rect,
          .columns-grid > .col-block.split-rows:last-child .media .frame-img { left: 30%; }
          /* No extra gap above middle image */
          .mid-fit-img { transform: none; }
        }

        /* Navbar decorative SVGs */
        .svg-gold { filter: brightness(0) saturate(100%) invert(76%) sepia(36%) saturate(459%) hue-rotate(358deg) brightness(97%) contrast(89%); }
        .svg-left { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); left: calc(50% - 70px); transform: translateY(-50%); }
        .svg-right { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); right: calc(50% - 70px); transform: translateY(-50%); }
        @media (min-width: 768px) { .svg-left { left: calc(50% - 120px); } .svg-right { right: calc(50% - 120px); } }
        @media (min-width: 1024px) { .svg-left { left: calc(50% - 160px); } .svg-right { right: calc(50% - 160px); } }
        @media (min-width: 1280px) { .svg-left { left: calc(50% - 200px); } .svg-right { right: calc(50% - 200px); } }
        @media (min-width: 640px) { .svg-left { left: calc(50% - 90px); } .svg-right { right: calc(50% - 90px); } }

        /* Buttons */
        .glass-button { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16); color: #e7f2f8; }
        .glass-button:hover { background: #ec6d6c; color: #ffffff; border-color: transparent; }

        /* Apple-style neutral glass button for Hire Me (exact as Creative Designer/Home) */
        .apple-glass-button-neutral {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, rgba(180,190,200,0.28) 0%, rgba(180,190,200,0.18) 50%, rgba(180,190,200,0.28) 100%);
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          border: 1px solid rgba(180,190,200,0.45);
          box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.4), inset 0 -1px 0 0 rgba(180,190,200,0.35), 0 8px 32px 0 rgba(180,190,200,0.2);
          color: #ffffff;
        }
        @keyframes liquidMove { 0% { transform: translate(0, 0); } 50% { transform: translate(10%, 5%); } 100% { transform: translate(0, 0); } }
        @keyframes glossyShine { 0% { left: -100%; } 50%, 100% { left: 200%; } }
        .apple-glass-button-neutral::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%); animation: liquidMove 4s ease-in-out infinite; }
        .apple-glass-button-neutral::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent); animation: glossyShine 3s ease-in-out infinite; animation-delay: 0.5s; }

        /* Simple nav entrance animation */
        @keyframes slideDownNav { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideDownNav { animation: slideDownNav 1.5s ease-out forwards; }
        @keyframes subLogoSlowIn { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .sub-anim-logo-slow { animation: subLogoSlowIn 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes subSvgInLeft { from { transform: translateX(-14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes subSvgInRight { from { transform: translateX(14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .sub-anim-svg-left { animation: subSvgInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) 200ms both; }
        .sub-anim-svg-right { animation: subSvgInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) 260ms both; }

        /* Soft content animation (match Creative Designer hero) */
        @keyframes contentSoftIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .anim-content-soft { animation: contentSoftIn 900ms ease-out 200ms both; }

        /* Case tiles entrance animations (desktop + mobile) */
        .animate-cases .cell-parent .gold-rect,
        .animate-cases .cell-parent .frame-img,
        .animate-cases .cell-parent .logo-img { will-change: transform, opacity; }

        /* Match Creative Designer page style: long, gentle slide-in (4.5s) */
        .animate-cases .cell-parent .gold-rect { animation: cdSlideInCenter 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: var(--tile-stagger, 0ms); }
        .animate-cases .cell-parent .frame-img  { animation: cdSlideInCenter 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: var(--tile-stagger, 0ms); }
        /* Animate only the default (black) logo differently from frame/square */
        .animate-cases .cell-parent .logo-img.logo-black { animation: cdLogoArcIn 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: calc(var(--tile-stagger, 0ms) + 200ms); }
        .animate-cases .cell-parent .logo-img.logo-white { animation: none; }

        .animate-cases .tile-1 { --tile-stagger: 120ms; }
        .animate-cases .tile-2 { --tile-stagger: 300ms; }
        .animate-cases .tile-3 { --tile-stagger: 480ms; }
        .animate-cases .tile-4 { --tile-stagger: 660ms; }

        /* Creative Designer-like long slide-in */
        @keyframes cdSlideInCenter {
          from { opacity: 0; transform: translate(-50%, calc(-50% - 40px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        @keyframes cdSlideIn {
          from { opacity: 0; transform: translateY(-40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cdLogoPopIn { }
        @keyframes cdLogoArcIn {
          0%   { opacity: 0; transform: translateY(-32px) rotate(-2deg) scale(0.94); }
          50%  { opacity: 1; transform: translateY(4px) rotate(1.2deg) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-cases .cell-parent .gold-rect,
          .animate-cases .cell-parent .frame-img,
          .animate-cases .cell-parent .logo-img { animation: none !important; opacity: 1; transform: none; }
        }

        /* Removed mobile-specific targets previously */

        /* 640px–1024px: reduce square by 15% only */
        @media (min-width: 640px) and (max-width: 1024px) {
          .media { --rect-scale: 0.612; }
        }

        /* Removed duplicate overlapping 740–1024 and 780–1024 ranges */

        /* Progressive scaling: 1024→800 widens from 35% to 20% reduction */
        /* 35% at ~1024 */
        @media (min-width: 1000px) and (max-width: 1024px) {
          .media { --rect-scale: 0.468; }
        }
        /* 30% near ~960–999 */
        @media (min-width: 960px) and (max-width: 999.98px) {
          .media { --rect-scale: 0.504; }
        }
        /* 25% near ~920–959 */
        @media (min-width: 920px) and (max-width: 959.98px) {
          .media { --rect-scale: 0.54; }
        }
        /* ~22% near 880–919 */
        @media (min-width: 880px) and (max-width: 919.98px) {
          .media { --rect-scale: 0.562; }
        }
        /* ~21% near 840–879 */
        @media (min-width: 840px) and (max-width: 879.98px) {
          .media { --rect-scale: 0.569; }
        }
        /* 20% at ~800–839 */
        @media (min-width: 800px) and (max-width: 839.98px) {
          .media { --rect-scale: 0.576; }
        }

        /* 1024px–730px: increase square height by 60px only */
        @media (min-width: 730px) and (max-width: 1024px) {
          .gold-rect {
            height: calc(min(var(--frame-w), var(--frame-h)) * var(--rect-scale) + 60px);
            aspect-ratio: auto; /* prevent width from forcing height */
          }
        }

        /* Larger screens: make the square 10% smaller than base */
        @media (min-width: 1280px) {
          .media { --rect-scale: 0.648; } /* 0.72 * 0.9 */
        }

        /* Ultra‑wide screens: keep proportions comfortable */
        @media (min-width: 1600px) {
          .media { --frame-w: 75%; --frame-h: 75%; }
        }
        @media (min-width: 1920px) {
          .media { --frame-w: 70%; --frame-h: 70%; }
        }
      `}</style>
    </div>
  )
}

export default CreativeDesignerCaseStudy
