import { useNavigate, useParams } from 'react-router-dom'

const csBG = `${import.meta.env.BASE_URL}creative-designer-cs-BG.png`
const frameImage = `${import.meta.env.BASE_URL}frame.png`
const mielaImage = `${import.meta.env.BASE_URL}miela-1.png`
const mielaImageMobile = `${import.meta.env.BASE_URL}miela-1-mobile.png`
const bImgs = [1,2,3,4,5,6].map(n => `${import.meta.env.BASE_URL}b${n}.png`)

// Logo sources (black + white variants) from images/, with public/ fallbacks on error
const logos = {
  martell: {
    black: `${import.meta.env.BASE_URL}images/logos/martell-black.png`,
    white: `${import.meta.env.BASE_URL}images/logos/martell-white.png`,
    fallbackBlack: '/logos/martell-black.png',
    fallbackWhite: '/logos/martell-white.png',
  },
  wow: {
    black: `${import.meta.env.BASE_URL}images/logos/wow-black.png`,
    white: `${import.meta.env.BASE_URL}images/logos/wow-white.png`,
    fallbackBlack: '/logos/wow-black.png',
    fallbackWhite: '/logos/wow-white.png',
  },
  miela: {
    black: `${import.meta.env.BASE_URL}images/logos/miela-black.png`,
    white: `${import.meta.env.BASE_URL}images/logos/miela-white.png`,
    fallbackBlack: '/logos/miela-black.png',
    fallbackWhite: '/logos/miela-white.png',
  },
  mielo: {
    black: `${import.meta.env.BASE_URL}images/logos/mielo-black.png`,
    white: `${import.meta.env.BASE_URL}images/logos/mielo-white.png`,
    fallbackBlack: '/logos/mielo-black.png',
    fallbackWhite: '/logos/mielo-white.png',
  },
}

function CreativeDesignerCaseDetail() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const entry = logos[slug] || logos.martell
  const order = ['martell', 'wow', 'miela', 'mielo']
  const titles = { martell: 'Martell', wow: 'WOW', miela: 'Miela', mielo: 'Mielo' }
  const idx = Math.max(0, order.indexOf(slug || 'martell'))
  const nextSlug = order[(idx + 1) % order.length]

  return (
    <div className="min-h-screen bg-[#06080a] px-[clamp(12px,3vw,24px)] relative flex flex-col overflow-hidden" style={{ ['--nav-h']: 'clamp(72px, 12vh, 120px)' }}>
      {/* Fixed background */}
      <div className="page-fixed-bg" aria-hidden style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${csBG})` }} />
      <div className="page-fixed-overlay" aria-hidden />

      {/* Navbar (same style as case study) */}
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        <img decoding="async" src="/left.svg" alt="" className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left svg-gold sub-anim-svg-left" />
        <img decoding="async" src="/right.svg" alt="" className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right svg-gold sub-anim-svg-right" />

        <div className="absolute left-[clamp(16px,3vw,40px)] w-auto">
          <button
            onClick={() => navigate('/creative-designer/case-study', { replace: false })}
            aria-label="Back to Case Studies"
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] whitespace-nowrap"
          >
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="hidden sm:inline">Back to Case Studies</span>
          </button>
        </div>

        <img decoding="async" src="/ibheelz-logo.webp" alt="ibheelz" className="h-[clamp(3rem,6vw,4.25rem)] w-auto cursor-pointer sub-anim-logo-slow" style={{ maxHeight: '68px' }} onClick={() => navigate('/')} />

        <div className="absolute right-[clamp(16px,3vw,40px)]">
          <button
            onClick={() => navigate(`/creative-designer/case/${nextSlug}`)}
            aria-label={`${titles[nextSlug]} Case Study`}
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] cursor-pointer"
          >
            <span className="hidden sm:inline">{`${titles[nextSlug]} Case Study`}</span>
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="header-spacer" />

      {/* Content layer: show extra media for specific cases */}
      <section className="content-layer flex-1">
        {/* Miela-specific image visible only on md+ screens */}
        {slug === 'miela' && (
          <>
            {/* Mobile: dedicated Miela image */}
            <div className="flex md:hidden w-full h-full items-center justify-center p-6 miela-hero-in">
              <img
                src={mielaImageMobile}
                alt="Miela case artwork (mobile)"
                decoding="async"
                loading="eager"
                className="h-[52vh] w-auto max-w-[94vw] object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/miela-1-mobile.png'
                }}
              />
            </div>

            {/* Desktop/Tablet: main Miela image */}
            <div className="hidden md:flex w-full h-full items-center justify-center p-8 miela-hero-in">
              <img
                src={mielaImage}
                alt="Miela case artwork"
                decoding="async"
                loading="eager"
                className="h-[40vh] w-auto max-w-[90vw] object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/miela-1.png'
                }}
              />
            </div>

            {/* Smooth infinite marquee of b1..b6 images */}
            <div className="content-layer marquee-bleed marquee-dock flex justify-center items-center miela-marquee-in">
              <div className="smooth-marquee" aria-label="Brand strip">
                <div className="marquee-track" aria-hidden>
                  {/* group A */}
                  <div className="marquee-group">
                    {bImgs.map((src, i) => (
                      <img
                        key={`a-${i}`}
                        src={src}
                        alt=""
                        decoding="async"
                        loading="lazy"
                        className="marquee-img"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/b${(i%6)+1}.png` }}
                      />
                    ))}
                  </div>
                  {/* group B (duplicate for seamless loop) */}
                  <div className="marquee-group" aria-hidden>
                    {bImgs.map((src, i) => (
                      <img
                        key={`b-${i}`}
                        src={src}
                        alt=""
                        decoding="async"
                        loading="lazy"
                        className="marquee-img"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/b${(i%6)+1}.png` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <style>{`
        .page-fixed-bg { position: fixed; left: 0; right: 0; bottom: 0; top: var(--nav-h); background-size: cover; background-position: center; z-index: 0; }
        .page-fixed-overlay { position: fixed; left: 0; right: 0; bottom: 0; top: var(--nav-h); background: rgba(0,0,0,0.35); z-index: 1; pointer-events: none; }
        .liquid-glass-header { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1.5px solid rgba(255,255,255,0.1); border-radius: clamp(20px, 4vw, 30px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: fixed; top: 0; left: clamp(12px, 3vw, 24px); right: clamp(12px, 3vw, 24px); z-index: 10; }
        .header-spacer { height: var(--nav-h); }
        .content-layer { position: relative; z-index: 1000; }

        .detail-cell { position: relative; width: min(800px, 90vw); aspect-ratio: 4 / 3; }
        .gold-rect { position: absolute; inset: 0; margin: auto; width: 64%; height: 72%; background: #eac28a; border-radius: clamp(10px, 1vw, 18px); z-index: 1; display: grid; place-items: center; }
        .logo-img { width: 40%; height: 40%; object-fit: contain; z-index: 2; display: block; }
        .frame-img { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; width: 80%; height: 80%; object-fit: contain; pointer-events: none; }

        .svg-gold { filter: brightness(0) saturate(100%) invert(76%) sepia(36%) saturate(459%) hue-rotate(358deg) brightness(97%) contrast(89%); }
        .svg-left { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); left: calc(50% - 70px); transform: translateY(-50%); }
        .svg-right { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); right: calc(50% - 70px); transform: translateY(-50%); }
        @media (min-width: 768px) { .svg-left { left: calc(50% - 120px) } .svg-right { right: calc(50% - 120px) } }
        @media (min-width: 1024px) { .svg-left { left: calc(50% - 160px) } .svg-right { right: calc(50% - 160px) } }
        @media (min-width: 1280px) { .svg-left { left: calc(50% - 200px) } .svg-right { right: calc(50% - 200px) } }
        @media (min-width: 640px) { .svg-left { left: calc(50% - 90px); } .svg-right { right: calc(50% - 90px); } }

        /* Buttons (same theme hover) */
        .glass-button { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16); color: #e7f2f8; }
        .glass-button:hover { background: #ec6d6c; color: #ffffff; border-color: transparent; }

        /* Nav animations */
        @keyframes slideDownNav { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideDownNav { animation: slideDownNav 1.5s ease-out forwards; }
        @keyframes subLogoSlowIn { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .sub-anim-logo-slow { animation: subLogoSlowIn 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes subSvgInLeft { from { transform: translateX(-14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes subSvgInRight { from { transform: translateX(14px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .sub-anim-svg-left { animation: subSvgInLeft 4.5s cubic-bezier(0.22, 1, 0.36, 1) 200ms both; }
        .sub-anim-svg-right { animation: subSvgInRight 4.5s cubic-bezier(0.22, 1, 0.36, 1) 260ms both; }

        /* Miela content animations */
        @keyframes fadeUpIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInSlow { from { opacity: 0; } to { opacity: 1; } }
        .miela-hero-in { opacity: 0; animation: fadeUpIn 900ms cubic-bezier(0.22, 1, 0.36, 1) 120ms forwards; will-change: transform, opacity; }
        .miela-marquee-in { opacity: 0; animation: fadeInSlow 900ms ease-out 400ms forwards; }

        /* Smooth continuous marquee (seamless, not too large) */
        .marquee-bleed { width: 100vw; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
        .marquee-dock { position: fixed; left: 0; right: 0; bottom: 0; z-index: 5; padding-bottom: max(0px, env(safe-area-inset-bottom)); }
        .smooth-marquee { width: 100%; overflow: hidden; }
        .marquee-track { display: flex; width: max-content; gap: 0; animation: marqueeScroll 40s linear infinite; will-change: transform; }
        .marquee-group { display: flex; gap: 0; }
        .marquee-img { display: block; margin: 0; height: 30vh; width: auto; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25)); opacity: 0.95; }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation-duration: 0.001ms; animation-iteration-count: 1; }
        }
      `}</style>
    </div>
  )
}

export default CreativeDesignerCaseDetail
