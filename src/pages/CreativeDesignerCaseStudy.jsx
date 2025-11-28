import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { attachHireMe } from '../utils/attachHireMe'
// No foreground case image on this page; keep only navbar and background

// Use custom case study background from public/
const csBG = `${import.meta.env.BASE_URL}creative-designer-cs-BG.png`
// Frame image for each cell (on top of gold rectangle)
const frameImage = `${import.meta.env.BASE_URL}frame.png`
// Logos: use existing assets under public/logos (ensure no broken paths in prod)
// Some brands only have white variants; use white for both black/white slots to avoid 404s.
const logo1 = `${import.meta.env.BASE_URL}logos/martell-white.png`
const logo2 = `${import.meta.env.BASE_URL}logos/tojoalrojo-logo.webp`
const logo3 = `${import.meta.env.BASE_URL}logos/miela-white.png`
const logo4 = `${import.meta.env.BASE_URL}logos/mielo-white.png`
const logo1W = `${import.meta.env.BASE_URL}logos/martell-white.png`
const logo2W = `${import.meta.env.BASE_URL}logos/tojoalrojo-logo.webp`
const logo3W = `${import.meta.env.BASE_URL}logos/miela-white.png`
const logo4W = `${import.meta.env.BASE_URL}logos/mielo-white.png`

function CreativeDesignerCaseStudy() {
  const navigate = useNavigate()
  useEffect(() => {
    const cleanup = attachHireMe(document)
    return cleanup
  }, [])

  // Ensure page starts at the very top on open (so top image animates in view)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])

  // Remove auto-scroll on mount; let content appear naturally

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
        {/* Inline SVGs to ensure exact gold color */}
        <svg
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left sub-anim-svg-left"
          viewBox="0 0 65 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path fill="#e4c492" d="M63.7782 8.95022C62.9948 6.10936 59.9213 4.33765 57.4957 6.65921C53.217 10.7372 60.8102 14.6625 60.4185 9.40842C61.2622 9.79025 61.6539 10.5997 61.2622 11.9285C60.3883 14.9221 57.8271 14.9374 55.6275 14.3723C53.4731 13.8224 51.6501 12.3256 49.6012 11.4856C44.8253 9.51533 37.5484 12.0507 36.5842 12.402C26.4147 16.4495 19.0174 22.9712 11.0324 22.1312C5.09645 21.505 2.64071 16.2967 2.88176 11.6994C3.10775 7.31596 5.77441 2.88667 11.2283 2.88667C15.3413 2.88667 17.8723 6.59811 17.8723 9.27096C17.8723 12.8297 14.377 14.6625 13.1266 13.074C12.1021 11.7758 13.6991 11.0121 14.2415 9.94299C15.5673 7.37706 12.9157 5.54425 10.5955 6.23155C8.06443 6.99522 7.22075 9.43897 8.00417 11.8827C9.08892 15.2734 11.5145 16.5106 14.4373 16.5106C17.8422 16.5106 20.7198 13.1962 20.7198 9.27096C20.7198 4.88749 16.8177 0 11.2132 0C3.92131 0 0.290421 5.98718 0.0192337 11.562C-0.29715 17.6561 3.28854 24.2389 10.7311 25.0178C14.5428 25.4149 18.2791 24.3611 21.9401 22.7726C20.1172 25.4608 18.8818 28.7751 18.8818 32.8226C18.8818 40.9022 24.0042 46.7519 31.0701 46.7519C36.1774 46.7519 40.3206 43.0557 40.3206 38.5043C40.3206 35.9078 38.9496 33.296 36.8403 31.8451C34.8667 30.4857 32.4411 30.2719 30.0305 31.2494L30.0607 31.3258C27.0023 32.4865 25.6765 37.0686 27.9514 39.0694C29.3676 40.3218 32.1096 40.6425 33.2697 38.8555C33.7518 38.1072 33.8422 37.1144 33.4053 36.3049C32.9081 35.3732 32.2 35.3427 31.4015 35.1594C31.0399 33.8611 33.1793 32.8073 35.2584 34.2277C36.5993 35.1441 37.4882 36.8547 37.4882 38.5043C37.4882 41.0855 35.0475 43.8499 31.0851 43.8499C25.5861 43.8499 21.7443 39.3137 21.7443 32.8073C21.7443 21.4439 33.7066 16.6633 37.6238 15.0901C40.2 14.1432 42.7311 13.6392 45.232 13.9141C48.426 14.2654 51.8309 16.6175 51.8309 20.2678C51.8309 26.1175 46.0456 26.0259 45.6087 24.4985C45.1416 22.8643 46.7386 22.1923 47.6727 21.3064C49.4806 19.5805 48.0494 17.2742 45.8648 17.0298C43.5597 16.7702 41.6765 18.603 41.2998 20.8329C40.8479 23.5669 42.8516 28.2405 47.4467 28.2405C52.4486 28.2405 54.6784 24.2389 54.6784 20.2678C54.6784 18.6794 54.2565 17.2589 53.5484 16.0371C55.3413 16.9229 57.1944 17.4575 59.3337 16.9688C62.7688 16.1745 64.6972 12.3256 63.7782 8.95022Z"/>
        </svg>
        <svg
          className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right sub-anim-svg-right"
          viewBox="0 0 66 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path fill="#e4c492" d="M1.22576 8.61765C2.00919 5.88235 5.08263 4.17647 7.50824 6.41176C11.787 10.3382 4.19374 14.1176 4.58546 9.05882C3.74177 9.42647 3.35005 10.2059 3.74177 11.4853C4.61559 14.3676 7.17679 14.3824 9.37642 13.8382C11.5308 13.3088 13.3538 11.8676 15.4028 11.0588C20.1787 9.16176 27.4555 11.6029 28.4197 11.9412C38.5892 15.8382 45.9866 22.1176 53.9715 21.3088C59.9075 20.7059 62.3632 15.6912 62.1222 11.2647C61.8962 7.04412 59.2295 2.77941 53.7757 2.77941C49.6627 2.77941 47.1316 6.35294 47.1316 8.92647C47.1316 12.3529 50.6269 14.1176 51.8774 12.5882C52.9018 11.3382 51.3049 10.6029 50.7625 9.57353C49.4367 7.10294 52.0883 5.33824 54.4084 6C56.9395 6.73529 57.7832 9.08824 56.9998 11.4412C55.915 14.7059 53.4894 15.8971 50.5666 15.8971C47.1617 15.8971 44.2841 12.7059 44.2841 8.92647C44.2841 4.70588 48.1862 0 53.7907 0C61.0826 0 64.7135 5.76471 64.9847 11.1324C65.3011 17 61.7154 23.3382 54.2728 24.0882C50.4612 24.4706 46.7248 23.4559 43.0638 21.9265C44.8868 24.5147 46.1222 27.7059 46.1222 31.6029C46.1222 39.3824 40.9998 45.0147 33.9339 45.0147C28.8265 45.0147 24.6834 41.4559 24.6834 37.0735C24.6834 34.5735 26.0544 32.0588 28.1636 30.6618C30.1372 29.3529 32.5629 29.1471 34.9734 30.0882L34.9433 30.1618C38.0017 31.2794 39.3275 35.6912 37.0525 37.6176C35.6363 38.8235 32.8943 39.1324 31.7342 37.4118C31.2521 36.6912 31.1617 35.7353 31.5986 34.9559C32.0958 34.0588 32.8039 34.0294 33.6024 33.8529C33.964 32.6029 31.8246 31.5882 29.7455 32.9559C28.4047 33.8382 27.5158 35.4853 27.5158 37.0735C27.5158 39.5588 29.9565 42.2206 33.9188 42.2206C39.4179 42.2206 43.2597 37.8529 43.2597 31.5882C43.2597 20.6471 31.2973 16.0441 27.3802 14.5294C24.8039 13.6176 22.2728 13.1324 19.7719 13.3971C16.5779 13.7353 13.173 16 13.173 19.5147C13.173 25.1471 18.9583 25.0588 19.3953 23.5882C19.8623 22.0147 18.2653 21.3676 17.3312 20.5147C15.5233 18.8529 16.9546 16.6324 19.1391 16.3971C21.4442 16.1471 23.3275 17.9118 23.7041 20.0588C24.1561 22.6912 22.1523 27.1912 17.5572 27.1912C12.5553 27.1912 10.3256 23.3382 10.3256 19.5147C10.3256 17.9853 10.7474 16.6176 11.4555 15.4412C9.66267 16.2941 7.80956 16.8088 5.6702 16.3382C2.23518 15.5735 0.306738 11.8676 1.22576 8.61765Z"/>
        </svg>

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
      <main className="content-layer animate-cases mb-[clamp(80px,12vh,140px)] lg:mb-0">
        <div className="columns-grid hidden lg:grid" aria-hidden>
          <div className="col-block split-rows">
            <div className="cell-parent tile-1">
              <div className="media">
                <div className="gold-rect" onClick={() => navigate('/creative-designer/case/martell')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/martell') }}>
                  <img className="logo-img logo-black" src={logo1} alt="Logo 1" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-white.png' }} />
                  <img className="logo-img logo-white" src={logo1W} alt="Logo 1 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
            <div className="cell-parent tile-2">
              <div className="media">
                <div className="gold-rect" onClick={() => navigate('/creative-designer/case/todoalrojo')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/todoalrojo') }}>
                  <img className="logo-img logo-black" src={logo2} alt="Todoalrojo logo" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/tojoalrojo-logo.webp' }} />
                  <img className="logo-img logo-white" src={logo2W} alt="Todoalrojo logo white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/tojoalrojo-logo.webp' }} />
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
                  <img className="logo-img logo-black" src={logo3} alt="Logo 3" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-white.png' }} />
                  <img className="logo-img logo-white" src={logo3W} alt="Logo 3 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
            <div className="cell-parent tile-4">
              <div className="media">
                <div className="gold-rect" onClick={() => navigate('/creative-designer/case/mielo')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/mielo') }}>
                  <img className="logo-img logo-black" src={logo4} alt="Mielo logo" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/mielo-white.png' }} />
                  <img className="logo-img logo-white" src={logo4W} alt="Mielo logo white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/mielo-white.png' }} />
                </div>
                <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: transparent middle column comes first (hidden), then stack squares vertically */}
        <div className="mobile-stack lg:hidden">
          {/* Mobile: show the middle image first (like hero on Creative Designer) */}
          <div className="mid-fit-mobile" id="cs-top-image">
            <img
              decoding="async"
              src={`${import.meta.env.BASE_URL}creative-fit-mobile.png`}
              alt="Creative fit"
              className="mid-fit-mobile-img anim-content-soft"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/creative-fit-mobile.png' }}
            />
          </div>

          {/* Stack the four cases vertically */}
          <div className="cell-parent mobile-cell tile-1">
            <div className="media">
              <div className="gold-rect" onClick={() => navigate('/creative-designer/case/martell')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/martell') }}>
                <img className="logo-img logo-black" src={logo1} alt="Logo 1" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-white.png' }} />
                <img className="logo-img logo-white" src={logo1W} alt="Logo 1 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/martell-white.png' }} />
              </div>
              <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
            </div>
          </div>

          <div className="cell-parent mobile-cell tile-2">
            <div className="media">
              <div className="gold-rect" onClick={() => navigate('/creative-designer/case/todoalrojo')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/todoalrojo') }}>
                <img className="logo-img logo-black" src={logo2} alt="Todoalrojo logo" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/tojoalrojo-logo.webp' }} />
                <img className="logo-img logo-white" src={logo2W} alt="Todoalrojo logo white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/tojoalrojo-logo.webp' }} />
              </div>
              <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
            </div>
          </div>

          <div className="cell-parent mobile-cell tile-3">
            <div className="media">
              <div className="gold-rect" onClick={() => navigate('/creative-designer/case/miela')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/miela') }}>
                <img className="logo-img logo-black" src={logo3} alt="Logo 3" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-white.png' }} />
                <img className="logo-img logo-white" src={logo3W} alt="Logo 3 white" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/miela-white.png' }} />
              </div>
              <img className="frame-img" src={frameImage} alt="Frame" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/frame.png' }} />
            </div>
          </div>

          <div className="cell-parent mobile-cell tile-4">
            <div className="media">
              <div className="gold-rect" onClick={() => navigate('/creative-designer/case/mielo')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/creative-designer/case/mielo') }}>
                <img className="logo-img logo-black" src={logo4} alt="Logo 4" decoding="async" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/mielo-white.png' }} />
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
        /* Treat large touch devices (e.g., iPad Pro) as mobile layout */
        @media (min-width: 1024px) and (hover: none) and (pointer: coarse) {
          .columns-grid { display: none !important; }
          .mobile-stack { display: grid !important; }
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
          padding-left: 0; padding-right: 0; /* remove horizontal padding */
          box-sizing: border-box;
        }
        .media { position: relative; width: 100%; height: 100%; --frame-w: 80%; --frame-h: 80%; --rect-scale: 0.72; }
        /* Square inside the frame (kept perfectly square) — gold fill removed */
        .gold-rect {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          width: calc(min(var(--frame-w), var(--frame-h)) * var(--rect-scale));
          aspect-ratio: 1 / 1;
          background: transparent !important; border-radius: clamp(10px, 1vw, 18px); z-index: 1;
          display: flex; align-items: center; justify-content: center;
        }
        /* No background fill or hover square */
        
        .logo-img { position: relative; z-index: 2; width: var(--logo-w, 40%); height: auto; object-fit: contain; display: block; border: 0; backface-visibility: hidden; transform: translateZ(0); }
        .frame-img { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) translateZ(0); z-index: 3; width: var(--frame-w); height: var(--frame-h); object-fit: contain; display: block; border: 0; pointer-events: none; backface-visibility: hidden; }

        /* Interactions (only when hovering square/logo) */
        .cell-parent { cursor: default; }
        .gold-rect { transition: background-color 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1); cursor: pointer; }
        .logo-img { transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), transform 1200ms cubic-bezier(0.22, 1, 0.36, 1); cursor: pointer; }
        /* Show white logo by default */
        .logo-white { opacity: 1; position: absolute; inset: 0; margin: auto; width: var(--logo-w, 40%); height: auto; object-fit: contain; }
        .logo-black { opacity: 0; }

        /* Miela (tile-3) — reduce logo size further to 28% */
        .tile-3 { --logo-w: 28%; }
        /* Keep hover interactions for logos only; no background fill */
        .gold-rect:hover, .gold-rect:active { background: transparent !important; }
        .gold-rect:hover .logo-black, .gold-rect:active .logo-black { opacity: 0; transform: translateY(-2px) scale(0.995); }
        .gold-rect:hover .logo-white, .gold-rect:active .logo-white { opacity: 1; transform: translateY(0) scale(1.01); }

        /* Mobile cell sizing so absolute items have room */
        .mobile-stack .mobile-cell { height: clamp(200px, 30dvh, 380px); padding: clamp(16px, 4vw, 28px); padding-left: 0 !important; padding-right: 0 !important; }
        /* Use same square scale as desktop; keep frame roomy on mobile */
        .mobile-stack .mobile-cell .media { --frame-w: 92%; --frame-h: 92%; }

        /* Medium screens (tablets): scale content down so it fits better */
        @media (min-width: 768px) and (max-width: 1023.98px) {
          .mobile-stack { row-gap: clamp(12px, 2vh, 18px); padding-left: clamp(8px, 2vw, 16px); padding-right: clamp(8px, 2vw, 16px); --logo-w: 34%; }
          /* Keep a small inner padding so frame sits within parent */
          .mobile-stack .mobile-cell { height: clamp(200px, 28dvh, 360px); padding: clamp(12px, 2.5vw, 22px); }
          /* Make the frame wider on medium screens while staying inside parent */
          .mobile-stack .mobile-cell .media { --frame-w: 88%; --frame-h: 82%; --rect-scale: 0.68; }
          /* Make top image ~20% bigger on medium screens */
          .mobile-stack .mid-fit-mobile-img { max-height: 50vh; width: auto; height: auto; }
        }

        /* Ensure frames fit fully within their containers on desktop */
        @media (min-width: 1024px) {
          .columns-grid .media { --frame-w: 84%; --frame-h: 78%; --rect-scale: 0.66; }
        }


        /* Desktop 3-column viewport grid */
        .desktop-grid { grid-template-columns: minmax(0,1fr) var(--midw) minmax(0,1fr); column-gap: 0; height: calc(100dvh - var(--nav-h) - 2px); padding: 0; overflow: hidden; box-sizing: border-box; }
        .left-col, .right-col { height: 100%; margin: 0; padding: 0; }
        .mid-col { height: 100%; background: transparent; pointer-events: none; }

        /* Mobile vertical stack */
        .mobile-stack { display: grid; grid-template-columns: 1fr; row-gap: clamp(16px, 3vh, 24px); padding: 0 clamp(12px, 3vw, 24px); }

        /* Mobile middle image at top — fill viewport (below navbar) */
        .mid-fit-mobile { display: flex; align-items: center; justify-content: center; padding: clamp(8px, 4vw, 16px); }
        .mid-fit-mobile-img { height: calc(100dvh - var(--nav-h)); width: auto; max-width: 100%; object-fit: contain; border: 0; display: block; }
        @media (max-width: 1023.98px) {
          /* On mobile, remove fixed viewport height from the top image */
          .mid-fit-mobile-img { height: auto !important; max-height: 50dvh; width: auto; }
          /* Keep the middle image fully below the navbar (no overlap) and shift up by 25px */
          .mid-fit-mobile { transform: none; padding: 0; margin-top: -20px; }
          /* Do not add extra top padding on the stack */
          .mobile-stack { padding-top: 0; padding-left: clamp(12px, 3vw, 24px); padding-right: clamp(12px, 3vw, 24px); }
          /* Double page margin (x2) for the middle image horizontally */
          .mid-fit-mobile { padding-left: clamp(24px, 6vw, 48px); padding-right: clamp(24px, 6vw, 48px); }
          /* Keep comfortable spacing below the top image and between frames */
          .mobile-stack { row-gap: clamp(10px, 2vh, 18px); }
          .mid-fit-mobile { margin-bottom: clamp(14px, 2.2vh, 28px); }
          .mobile-stack .mobile-cell { padding: clamp(4px, 2vw, 10px); }
          .mobile-stack .mobile-cell:first-of-type { padding-top: 0; }
          /* Use the global spacer (nav height) so content starts immediately under navbar */
          .header-spacer { height: var(--nav-h) !important; }
        }
        /* Galaxy Z Fold 5 (tall cover display): allow a bit larger top image */
        @media (max-width: 540px) and (min-height: 900px) and (orientation: portrait) {
          .mid-fit-mobile-img { max-height: 58dvh; }
          .mid-fit-mobile { margin-top: -16px; }
        }
        /* Galaxy Z Fold 5 inner (portrait-ish mid width): slightly larger too */
        @media (min-width: 541px) and (max-width: 900px) and (min-height: 1000px) {
          .mid-fit-mobile-img { max-height: 56dvh; }
        }
        /* Apply mobile spacing/sizing rules to large touch devices (iPad Pro, etc.) */
        @media (min-width: 1024px) and (hover: none) and (pointer: coarse) {
          .mid-fit-mobile-img { height: auto !important; max-height: 50dvh; width: auto; }
          .mid-fit-mobile { transform: none; padding: 0; margin-top: -20px; margin-bottom: clamp(14px, 2.2vh, 28px); }
          .mobile-stack { padding-top: 0; padding-left: clamp(12px, 3vw, 24px); padding-right: clamp(12px, 3vw, 24px); row-gap: clamp(10px, 2vh, 18px); --logo-w: 30%; }
          /* Reduce Miela logo a bit further on iPad Pro */
          .mobile-stack .tile-3 { --logo-w: 24%; }
          .mobile-stack .mobile-cell { height: clamp(200px, 30dvh, 380px); padding: clamp(16px, 4vw, 28px); padding-left: 0 !important; padding-right: 0 !important; }
          .mobile-stack .mobile-cell:first-of-type { padding-top: 0; }
          .header-spacer { height: var(--nav-h) !important; }
        }
        /* EXCEPTION: Nest Hub / short-height large touch screens should use desktop view */
        @media (min-width: 1024px) and (hover: none) and (pointer: coarse) and (max-height: 820px) {
          .columns-grid { display: grid !important; }
          .mobile-stack { display: none !important; }
        }
        /* Large touch devices with short heights (Nest Hub, Nest Hub Max landscape) */
        @media (min-width: 1024px) and (hover: none) and (pointer: coarse) and (max-height: 800px) {
          .mid-fit-mobile-img { max-height: 46dvh; }
          .mobile-stack { row-gap: clamp(8px, 1.6vh, 14px); }
          .mobile-stack .mobile-cell { height: clamp(180px, 26dvh, 340px); }
          .mobile-stack .mobile-cell .media { --frame-w: 90%; --frame-h: 88%; --rect-scale: 0.68; }
        }
        @media (min-width: 1024px) and (hover: none) and (pointer: coarse) and (max-height: 700px) {
          .mid-fit-mobile-img { max-height: 42dvh; }
          .mid-fit-mobile { margin-top: -12px; margin-bottom: clamp(10px, 1.8vh, 20px); }
          .mobile-stack { row-gap: clamp(6px, 1.4vh, 12px); }
          .mobile-stack .mobile-cell { height: clamp(160px, 24dvh, 300px); }
          .mobile-stack .mobile-cell .media { --frame-w: 88%; --frame-h: 86%; --rect-scale: 0.66; }
        }
        /* Extra small heights: cap even smaller for comfort */
        @media (max-width: 1023.98px) and (max-height: 700px) {
          .mid-fit-mobile-img { max-height: 44dvh; }
          .mid-fit-mobile { margin-top: 0; }
        }
        @media (max-width: 1023.98px) and (max-height: 600px) {
          .mid-fit-mobile-img { max-height: 40dvh; }
          .mobile-stack .mobile-cell { height: clamp(180px, 26dvh, 320px); }
        }

        /* Between 400px and 1024px: add space between top image and first frame */
        @media (min-width: 400px) and (max-width: 1023.98px) {
          .mid-fit-mobile { margin-bottom: clamp(14px, 2.2vh, 28px); }
          .mobile-stack { row-gap: clamp(8px, 1.2vh, 16px); }
        }

        /* Very small widths (e.g., iPhone 12/13 portrait at 390px): ensure margin */
        @media (max-width: 399.98px) {
          .mid-fit-mobile { margin-bottom: clamp(16px, 3vh, 28px) !important; }
          .mobile-stack { row-gap: clamp(10px, 2vh, 18px) !important; }
        }

        /* Medium screens: add extra space below top image so first frame isn't tight */
        @media (min-width: 768px) and (max-width: 1023.98px) {
          /* Keep a fixed 30px separation below the top image */
          .mid-fit-mobile { margin-bottom: 30px !important; }
          .mobile-stack { row-gap: clamp(16px, 3vh, 28px) !important; }
        }

        /* Desktop: move only the frames themselves 30px toward the middle */
        @media (min-width: 1024px) {
          .columns-grid > .col-block.split-rows:first-child .media .gold-rect,
          .columns-grid > .col-block.split-rows:first-child .media .frame-img { margin-left: 30px; }
          .columns-grid > .col-block.split-rows:last-child .media .gold-rect,
          .columns-grid > .col-block.split-rows:last-child .media .frame-img { margin-left: -30px; }
        }

        /* Desktop: nudge left/right column content toward the middle column */
        @media (min-width: 1024px) {
          /* Tighter vertical spacing on desktop */
          .columns-grid { gap: clamp(6px, 1vw, 18px); }
          .split-rows { row-gap: clamp(4px, 0.6vh, 10px); }
          /* Restore inner padding so frame sits within cell edges */
          .cell-parent { padding: 24px; padding-left: 0; padding-right: 0; }
          /* Nudge middle image slightly closer to navbar */
          .mid-fit { margin-top: -24px; }

          /* Keep frames centered horizontally; no inward left offsets */
          /* No extra gap above middle image */
          .mid-fit-img { transform: none; }
        }

        /* Navbar decorative SVGs + inline arrow icons */
        img.svg-gold { filter: brightness(0) saturate(100%) invert(84%) sepia(18%) saturate(589%) hue-rotate(349deg) brightness(99%) contrast(91%); }
        svg.svg-gold { color: #e4c492; }
        .svg-left { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); left: calc(50% - 70px); transform: translateY(-50%); }
        .svg-right { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); right: calc(50% - 70px); transform: translateY(-50%); }
        @media (min-width: 768px) { .svg-left { left: calc(50% - 120px); } .svg-right { right: calc(50% - 120px); } }
        @media (min-width: 1024px) { .svg-left { left: calc(50% - 160px); } .svg-right { right: calc(50% - 160px); } }
        @media (min-width: 1280px) { .svg-left { left: calc(50% - 200px); } .svg-right { right: calc(50% - 200px); } }
        @media (min-width: 640px) { .svg-left { left: calc(50% - 90px); } .svg-right { right: calc(50% - 90px); } }

        /* Buttons */
        .glass-button { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16); color: #e7f2f8; }
        .glass-button:hover { background: #7a1f2b; color: #ffffff; border-color: transparent; }
        /* SVG icons turn white on hover */
        .glass-button:hover svg { stroke: #ffffff; fill: none; }

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
        /* Avoid animating logos to prevent flicker */
        .animate-cases .cell-parent .logo-img.logo-black { animation: none; }
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

        /* Case Study: tighter top spacing specifically for 900px–600px heights */
        @media (max-height: 900px) and (min-height: 801px) {
          #cs-top-image { margin-top: 12px; }
        }
        @media (max-height: 800px) and (min-height: 701px) {
          #cs-top-image { margin-top: 10px; }
        }
        @media (max-height: 700px) and (min-height: 601px) {
          #cs-top-image { margin-top: 8px; }
        }

        /* CS only: move top image up by 20px for 900px–650px heights */
        @media (max-height: 900px) and (min-height: 650px) {
          #cs-top-image { margin-top: -20px !important; }
        }

        /* Removed targeted size adjustments for the gold square */

        /* Ultra‑wide screens: keep proportions comfortable */
        @media (min-width: 1600px) {
          .media { --frame-w: 75%; --frame-h: 75%; }
        }
        @media (min-width: 1920px) {
          .media { --frame-w: 70%; --frame-h: 70%; }
        }
        /* Mobile navbar SVGs (small screens only) - use gold when SVG is alone in button */
        @media (max-width: 767px) {
          .liquid-glass-header .glass-button svg { stroke: #e4c492; }
          .liquid-glass-header .glass-button:hover svg,
          .liquid-glass-header .glass-button:active svg { stroke: #e4c492; }
        }
      `}</style>
    </div>
  )
}

export default CreativeDesignerCaseStudy
