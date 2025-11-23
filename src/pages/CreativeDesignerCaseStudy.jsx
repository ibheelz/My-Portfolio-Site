import { useNavigate } from 'react-router-dom'
// No foreground case image on this page; keep only navbar and background

// Use custom case study background from public/
const csBG = `${import.meta.env.BASE_URL}creative-designer-cs-BG.png`
// Frame image for each cell (on top of gold rectangle)
const frameImage = `${import.meta.env.BASE_URL}frame.png`
// Four black + white logos from public/logos
const logo1 = `${import.meta.env.BASE_URL}logos/martell-black.png`
const logo2 = `${import.meta.env.BASE_URL}logos/wow-black.png`
const logo3 = `${import.meta.env.BASE_URL}logos/miela-black.png`
const logo4 = `${import.meta.env.BASE_URL}logos/mielo-black.png`
const logo1W = `${import.meta.env.BASE_URL}logos/martell-white.png`
const logo2W = `${import.meta.env.BASE_URL}logos/wow-white.png`
const logo3W = `${import.meta.env.BASE_URL}logos/miela-white.png`
const logo4W = `${import.meta.env.BASE_URL}logos/mielo-white.png`

function CreativeDesignerCaseStudy() {
  const navigate = useNavigate()

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
      <main className="content-layer" style={{ position: 'relative', zIndex: 1000 }}>
        <div className="columns-grid hidden lg:grid" aria-hidden>
          <div className="col-block split-rows">
            <div className="cell-parent">
              <div className="media">
                <div className="gold-rect">
                  <img className="logo-img logo-black" src={logo1} alt="Logo 1" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-black.png' }} />
                  <img className="logo-img logo-white" src={logo1W} alt="Logo 1 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
            <div className="cell-parent">
              <div className="media">
                <div className="gold-rect">
                  <img className="logo-img logo-black" src={logo2} alt="Logo 2" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/wow-black.png' }} />
                  <img className="logo-img logo-white" src={logo2W} alt="Logo 2 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/wow-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
          </div>
          <div className="col-block" />
          <div className="col-block split-rows">
            <div className="cell-parent">
              <div className="media">
                <div className="gold-rect">
                  <img className="logo-img logo-black" src={logo3} alt="Logo 3" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-black.png' }} />
                  <img className="logo-img logo-white" src={logo3W} alt="Logo 3 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
            <div className="cell-parent">
              <div className="media">
                <div className="gold-rect">
                  <img className="logo-img logo-black" src={logo4} alt="Logo 4" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/mielo-black.png' }} />
                  <img className="logo-img logo-white" src={logo4W} alt="Logo 4 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/mielo-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        /* Background spans the entire viewport */
        .page-fixed-bg { position: fixed; left: 0; right: 0; bottom: 0; top: var(--nav-h); background-size: cover; background-position: center; z-index: 0; }
        .page-fixed-overlay { position: fixed; left: 0; right: 0; bottom: 0; top: var(--nav-h); background: rgba(0,0,0,0.35); z-index: 1; pointer-events: none; }

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
        .content-layer { position: relative; z-index: 1000; }

        /* Three rounded columns (desktop only) */
        .columns-grid { grid-template-columns: repeat(3, 1fr); gap: clamp(10px, 2vw, 28px); height: calc(100dvh - var(--nav-h) - 2px); padding: clamp(8px, 1.5vh, 16px); box-sizing: border-box; }
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
        .media { position: relative; width: 100%; height: 100%; }
        .gold-rect { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 64%; height: 72%; background: #eac28a; border-radius: clamp(10px, 1vw, 18px); z-index: 1; display: flex; align-items: center; justify-content: center; }
        .logo-img { position: relative; z-index: 2; width: 40%; height: 40%; object-fit: contain; display: block; border: 0; }
        .frame-img { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; width: 80%; height: 80%; object-fit: contain; display: block; border: 0; pointer-events: none; }

        /* Interactions */
        .cell-parent { cursor: pointer; }
        .gold-rect { transition: background-color 200ms ease, transform 200ms ease; }
        .logo-img { transition: opacity 200ms ease, transform 200ms ease; }
        .logo-white { opacity: 0; position: absolute; inset: 0; margin: auto; width: 40%; height: 40%; object-fit: contain; }
        .logo-black { opacity: 1; }
        .cell-parent:hover .gold-rect, .cell-parent:active .gold-rect { background: #ec6d6c; }
        .cell-parent:hover .logo-black, .cell-parent:active .logo-black { opacity: 0; }
        .cell-parent:hover .logo-white, .cell-parent:active .logo-white { opacity: 1; }
        

        /* Desktop 3-column viewport grid */
        .desktop-grid { grid-template-columns: minmax(0,1fr) var(--midw) minmax(0,1fr); column-gap: 0; height: calc(100dvh - var(--nav-h) - 2px); padding: 0; overflow: hidden; box-sizing: border-box; }
        .left-col, .right-col { height: 100%; margin: 0; padding: 0; }
        .mid-col { height: 100%; background: transparent; pointer-events: none; }

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

        /* Simple nav entrance animation */
        @keyframes slideDownNav { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideDownNav { animation: slideDownNav 1.5s ease-out forwards; }
        @keyframes subLogoSlowIn { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .sub-anim-logo-slow { animation: subLogoSlowIn 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes subSvgInLeft { from { transform: translateX(-14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes subSvgInRight { from { transform: translateX(14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .sub-anim-svg-left { animation: subSvgInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) 200ms both; }
        .sub-anim-svg-right { animation: subSvgInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) 260ms both; }
      `}</style>
    </div>
  )
}

export default CreativeDesignerCaseStudy
