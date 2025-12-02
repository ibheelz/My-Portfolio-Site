import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { attachHireMe } from '../utils/attachHireMe'
const csBG = `${import.meta.env.BASE_URL}ai-creator-cs-BG.webp`

function AICreatorCaseStudy() {
  const navigate = useNavigate()
  // Slides: desktop and mobile image sets (auto-govern dot count)
  const aiSlidesDesktop = Array.from({ length: 13 }, (_, i) => `/aria-${i + 1}.webp`)
  const aiSlidesMobile = Array.from({ length: 13 }, (_, i) => `/aria-mobile-${i + 1}.webp`)
  const aiSlidesContent = [
    {
      heading: 'Aria Vale',
      lines: [
        'I created Aria as an AI influencer project during my time at Miela Digital.',
        'Building her from zero followers, I managed authentic fitness, travel, gaming, and lifestyle content for US audiences.'
      ]
    },
    {
      heading: 'Authentic Engagement Style',
      lines: [
        "Aria's playful and open personality made her stand out through genuine audience interaction and engagement.",
        'Unlike typical influencers, she actively engaged with comments and maintained real conversations with her community.'
      ]
    },
    {
      heading: 'Sun Chasing & Window Photography',
      lines: [
        'Her favorite creative approach was capturing natural light through windows in her home daily.',
        'This simple yet effective aesthetic became her signature style, setting her apart from filtered content.'
      ]
    },
    {
      heading: 'Minimalist Fashion Philosophy',
      lines: [
        'Aria maintained a simple, understated style with neutral tones and timeless pieces instead of expensive.',
        'Her accessible fashion choices resonated with followers who appreciated an influencer avoiding constant trend chasing.'
      ]
    },
    {
      heading: 'Spain Adventures & Sagrada Familia',
      lines: [
        'She traveled to Barcelona and explored the iconic Sagrada Familia, gaining significant Spanish audience growth.',
        'Local communities responded warmly to her genuine interest in Spanish culture and architectural heritage.'
      ]
    },
    {
      heading: 'Chichén Itzá Archaeological Wonder',
      lines: [
        "Aria visited Mexico's Chichén Itzá, one of the world's seven wonders, with authentic enthusiasm.",
        'Standing before this marvel, she shared genuine awe that resonated deeply with travel-focused audiences.'
      ]
    },
    {
      heading: 'Mexico City Urban Exploration',
      lines: [
        'Her Mexico City visit showcased urban culture, local food, and vibrant community interactions authentically.',
        'She engaged beyond typical tourist attractions, building connections with her growing Latin American audience base.'
      ]
    },
    {
      heading: 'USA-Based Lifestyle Simplicity',
      lines: [
        'Despite growing influence, Aria maintained a grounded American lifestyle that remained refreshingly relatable daily.',
        'Followers trusted her because she lived authentic normalcy, balancing work, fitness, and genuine personal moments.'
      ]
    },
    {
      heading: 'Daily Engagement & Active Community Management',
      lines: [
        'Aria posted daily content and actively managed direct messages, maintaining consistent audience engagement always.',
        'Her willingness to engage directly with followers, even handling inappropriate messages, created a loyal community.'
      ]
    },
    {
      heading: 'World of Warships Campaign Success',
      lines: [
        'Through authentic content integration and genuine enthusiasm, Aria generated fifty monthly game downloads consistently.',
        'This measurable result proved her influence translates to real action and significant brand partnership value.'
      ]
    },
    {
      heading: 'Community Gaming Sessions & Live Engagement',
      lines: [
        'She organized live World of Warships gaming sessions, inviting followers to play and interact.',
        'These real-time engagement opportunities created memorable shared experiences that transcended typical social media interactions.'
      ]
    },
    {
      heading: 'Strategic Call-to-Action in Military Cosplay',
      lines: [
        'Aria combined authentic gaming interest with strategic messaging in military-inspired cosplay to drive registrations.',
        'Her natural approach to call-to-actions felt genuine within her content narrative without alienating audiences.'
      ]
    },
    {
      heading: 'Campaign Impact & Registration Success',
      lines: [
        'By promoting the game through multiple content formats, Aria successfully moved her audience to action.',
        'The campaign delivered measurable registration increases and proved her long-term brand partnership value.'
      ]
    }
  ]
  // Mobile-specific paraphrased 8-word lines per slide
  const aiSlidesMobileShort = [
    { lines: [
      'Created Aria, an AI influencer, at Miela Digital.',
      'Built authentic fitness, travel, gaming, lifestyle content daily.'
    ]},
    { lines: [
      'Playful, open personality encouraged genuine audience interaction online.',
      'She engaged comments, real conversations with community daily.'
    ]},
    { lines: [
      'Preferred natural light through home windows each day.',
      'Signature aesthetic, apart from heavily filtered content online.'
    ]},
    { lines: [
      'Simple, understated style with neutral timeless pieces always.',
      'Avoided trends; accessibility resonated with appreciative followers greatly.'
    ]},
    { lines: [
      'Traveled Barcelona, explored Sagrada Familia; Spanish growth surged.',
      'Communities welcomed genuine cultural interest and appreciation deeply.'
    ]},
    { lines: [
      "Visited Mexico's Chichén Itzá with authentic enthusiasm shown.",
      'Shared awe, resonating with travel-focused audiences online deeply.'
    ]},
    { lines: [
      'Explored Mexico City’s urban culture and local food.',
      'Connected beyond tourism, growing Latin American audience base.'
    ]},
    { lines: [
      'Maintained grounded, relatable American lifestyle each day publicly.',
      'Balanced work, fitness, and genuine personal moments naturally.'
    ]},
    { lines: [
      'Posted daily; actively managed direct messages consistently too.',
      'Handled inappropriate messages; built loyal engaged community anyway.'
    ]},
    { lines: [
      'World of Warships campaign delivered measurable downloads monthly.',
      'Authentic integration showed real action and value clearly.'
    ]},
    { lines: [
      'Hosted live gaming sessions with followers participating regularly.',
      'Created memorable shared experiences beyond social media posts.'
    ]},
    { lines: [
      'Military-inspired cosplay with strategic registration messaging effectively.',
      'Natural calls-to-action fit her authentic narrative seamlessly too.'
    ]},
    { lines: [
      'Multi-format promotion moved audience towards registrations successfully.',
      'Campaign proved long-term influence and partnership value strong.'
    ]},
  ]
  const [aiFrame, setAiFrame] = useState(0)
  const lastStepRef = useRef(0)
  // Mobile touch swipe state
  const aiTouchStartXRef = useRef(0)
  const aiTouchStartYRef = useRef(0)
  // Slides list (increase items to add more slides and dots auto-update)
  const aiSlides = ['/mielo-0.webp']

  useEffect(() => {
    const cleanup = attachHireMe(document)
    return cleanup
  }, [])

  // Lock page scroll on mobile (prevent page moving/scrolling)
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const html = document.documentElement
    const body = document.body
    const apply = window.innerWidth <= 768

    // Prevent default touch scroll behavior
    const preventScroll = (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault()
      }
    }

    if (apply) {
      html.classList.add('ai-mobile-no-scroll')
      body.classList.add('ai-mobile-no-scroll')
      document.addEventListener('touchmove', preventScroll, { passive: false })
    }

    const onResize = () => {
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        html.classList.add('ai-mobile-no-scroll')
        body.classList.add('ai-mobile-no-scroll')
        document.addEventListener('touchmove', preventScroll, { passive: false })
      } else {
        html.classList.remove('ai-mobile-no-scroll')
        body.classList.remove('ai-mobile-no-scroll')
        document.removeEventListener('touchmove', preventScroll)
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('touchmove', preventScroll)
      html.classList.remove('ai-mobile-no-scroll')
      body.classList.remove('ai-mobile-no-scroll')
    }
  }, [])

  // Minimal navigation: arrow keys and wheel to step frames (match Mielo feel)
  useEffect(() => {
    const lockMs = 60
    const onWheel = (e) => {
      const now = Date.now()
      if (now - lastStepRef.current < lockMs) return
      const dy = e.deltaY || 0
      if (Math.abs(dy) < 1) return
      if (e && typeof e.preventDefault === 'function') e.preventDefault()
      setAiFrame((i) => (i + (dy > 0 ? 1 : -1) + aiSlidesDesktop.length) % aiSlidesDesktop.length)
      lastStepRef.current = now
    }
    const onKey = (e) => {
      const k = e.key
      const now = Date.now()
      if (now - lastStepRef.current < lockMs) return
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","PageUp","PageDown"].includes(k)) {
        if (typeof e.preventDefault === 'function') e.preventDefault()
      }
      if (k === 'ArrowRight') { setAiFrame((i) => (i + 1) % aiSlidesDesktop.length); lastStepRef.current = now; return }
      if (k === 'ArrowLeft')  { setAiFrame((i) => (i - 1 + aiSlidesDesktop.length) % aiSlidesDesktop.length); lastStepRef.current = now; return }
      if (k === 'ArrowDown' || k === 'PageDown') { setAiFrame((i) => (i + 1) % aiSlidesDesktop.length); lastStepRef.current = now; return }
      if (k === 'ArrowUp'   || k === 'PageUp')   { setAiFrame((i) => (i - 1 + aiSlidesDesktop.length) % aiSlidesDesktop.length); lastStepRef.current = now; return }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#06080a] p-[clamp(12px,3vw,24px)] lg:p-[clamp(6px,1.5vw,12px)] animate-fadeIn relative flex flex-col ai-page-container" style={{ ['--nav-h']: 'clamp(72px, 12vh, 120px)' }}>
      {/* Fixed background */}
      <div className="page-fixed-bg" aria-hidden style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${csBG})` }} />
      <div className="page-fixed-overlay" aria-hidden />

      {/* Navbar */}
      <div className="liquid-glass-header animate-slideDownNav flex items-center justify-center py-[clamp(10px,2.5vh,16px)] relative">
        {/* Inline SVGs for exact #e4c492 */}
        <svg className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-left sub-anim-svg-left" viewBox="0 0 65 47" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path fill="#e4c492" d="M63.7782 8.95022C62.9948 6.10936 59.9213 4.33765 57.4957 6.65921C53.217 10.7372 60.8102 14.6625 60.4185 9.40842C61.2622 9.79025 61.6539 10.5997 61.2622 11.9285C60.3883 14.9221 57.8271 14.9374 55.6275 14.3723C53.4731 13.8224 51.6501 12.3256 49.6012 11.4856C44.8253 9.51533 37.5484 12.0507 36.5842 12.402C26.4147 16.4495 19.0174 22.9712 11.0324 22.1312C5.09645 21.505 2.64071 16.2967 2.88176 11.6994C3.10775 7.31596 5.77441 2.88667 11.2283 2.88667C15.3413 2.88667 17.8723 6.59811 17.8723 9.27096C17.8723 12.8297 14.377 14.6625 13.1266 13.074C12.1021 11.7758 13.6991 11.0121 14.2415 9.94299C15.5673 7.37706 12.9157 5.54425 10.5955 6.23155C8.06443 6.99522 7.22075 9.43897 8.00417 11.8827C9.08892 15.2734 11.5145 16.5106 14.4373 16.5106C17.8422 16.5106 20.7198 13.1962 20.7198 9.27096C20.7198 4.88749 16.8177 0 11.2132 0C3.92131 0 0.290421 5.98718 0.0192337 11.562C-0.29715 17.6561 3.28854 24.2389 10.7311 25.0178C14.5428 25.4149 18.2791 24.3611 21.9401 22.7726C20.1172 25.4608 18.8818 28.7751 18.8818 32.8226C18.8818 40.9022 24.0042 46.7519 31.0701 46.7519C36.1774 46.7519 40.3206 43.0557 40.3206 38.5043C40.3206 35.9078 38.9496 33.296 36.8403 31.8451C34.8667 30.4857 32.4411 30.2719 30.0305 31.2494L30.0607 31.3258C27.0023 32.4865 25.6765 37.0686 27.9514 39.0694C29.3676 40.3218 32.1096 40.6425 33.2697 38.8555C33.7518 38.1072 33.8422 37.1144 33.4053 36.3049C32.9081 35.3732 32.2 35.3427 31.4015 35.1594C31.0399 33.8611 33.1793 32.8073 35.2584 34.2277C36.5993 35.1441 37.4882 36.8547 37.4882 38.5043C37.4882 41.0855 35.0475 43.8499 31.0851 43.8499C25.5861 43.8499 21.7443 39.3137 21.7443 32.8073C21.7443 21.4439 33.7066 16.6633 37.6238 15.0901C40.2 14.1432 42.7311 13.6392 45.232 13.9141C48.426 14.2654 51.8309 16.6175 51.8309 20.2678C51.8309 26.1175 46.0456 26.0259 45.6087 24.4985C45.1416 22.8643 46.7386 22.1923 47.6727 21.3064C49.4806 19.5805 48.0494 17.2742 45.8648 17.0298C43.5597 16.7702 41.6765 18.603 41.2998 20.8329C40.8479 23.5669 42.8516 28.2405 47.4467 28.2405C52.4486 28.2405 54.6784 24.2389 54.6784 20.2678C54.6784 18.6794 54.2565 17.2589 53.5484 16.0371C55.3413 16.9229 57.1944 17.4575 59.3337 16.9688C62.7688 16.1745 64.6972 12.3256 63.7782 8.95022Z"/>
        </svg>
        <svg className="absolute h-[20px] sm:h-[26px] md:h-[32px] w-auto transform svg-right sub-anim-svg-right" viewBox="0 0 66 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path fill="#e4c492" d="M1.22576 8.61765C2.00919 5.88235 5.08263 4.17647 7.50824 6.41176C11.787 10.3382 4.19374 14.1176 4.58546 9.05882C3.74177 9.42647 3.35005 10.2059 3.74177 11.4853C4.61559 14.3676 7.17679 14.3824 9.37642 13.8382C11.5308 13.3088 13.3538 11.8676 15.4028 11.0588C20.1787 9.16176 27.4555 11.6029 28.4197 11.9412C38.5892 15.8382 45.9866 22.1176 53.9715 21.3088C59.9075 20.7059 62.3632 15.6912 62.1222 11.2647C61.8962 7.04412 59.2295 2.77941 53.7757 2.77941C49.6627 2.77941 47.1316 6.35294 47.1316 8.92647C47.1316 12.3529 50.6269 14.1176 51.8774 12.5882C52.9018 11.3382 51.3049 10.6029 50.7625 9.57353C49.4367 7.10294 52.0883 5.33824 54.4084 6C56.9395 6.73529 57.7832 9.08824 56.9998 11.4412C55.915 14.7059 53.4894 15.8971 50.5666 15.8971C47.1617 15.8971 44.2841 12.7059 44.2841 8.92647C44.2841 4.70588 48.1862 0 53.7907 0C61.0826 0 64.7135 5.76471 64.9847 11.1324C65.3011 17 61.7154 23.3382 54.2728 24.0882C50.4612 24.4706 46.7248 23.4559 43.0638 21.9265C44.8868 24.5147 46.1222 27.7059 46.1222 31.6029C46.1222 39.3824 40.9998 45.0147 33.9339 45.0147C28.8265 45.0147 24.6834 41.4559 24.6834 37.0735C24.6834 34.5735 26.0544 32.0588 28.1636 30.6618C30.1372 29.3529 32.5629 29.1471 34.9734 30.0882L34.9433 30.1618C38.0017 31.2794 39.3275 35.6912 37.0525 37.6176C35.6363 38.8235 32.8943 39.1324 31.7342 37.4118C31.2521 36.6912 31.1617 35.7353 31.5986 34.9559C32.0958 34.0588 32.8039 34.0294 33.6024 33.8529C33.964 32.6029 31.8246 31.5882 29.7455 32.9559C28.4047 33.8382 27.5158 35.4853 27.5158 37.0735C27.5158 39.5588 29.9565 42.2206 33.9188 42.2206C39.4179 42.2206 43.2597 37.8529 43.2597 31.5882C43.2597 20.6471 31.2973 16.0441 27.3802 14.5294C24.8039 13.6176 22.2728 13.1324 19.7719 13.3971C16.5779 13.7353 13.173 16 13.173 19.5147C13.173 25.1471 18.9583 25.0588 19.3953 23.5882C19.8623 22.0147 18.2653 21.3676 17.3312 20.5147C15.5233 18.8529 16.9546 16.6324 19.1391 16.3971C21.4442 16.1471 23.3275 17.9118 23.7041 20.0588C24.1561 22.6912 22.1523 27.1912 17.5572 27.1912C12.5553 27.1912 10.3256 23.3382 10.3256 19.5147C10.3256 17.9853 10.7474 16.6176 11.4555 15.4412C9.66267 16.2941 7.80956 16.8088 5.6702 16.3382C2.23518 15.5735 0.306738 11.8676 1.22576 8.61765Z"/>
        </svg>

        {/* Back to AI Creator */}
        <div className="absolute left-[clamp(16px,3vw,40px)] w-auto">
          <button
            onClick={() => navigate('/ai-creator', { replace: false, state: { animateHero: true } })}
            aria-label="Back to AI Creator"
            className="glass-button p-[clamp(12px,3vw,18px)] sm:px-[clamp(10px,2vw,14px)] sm:py-[clamp(6px,1.5vh,10px)] rounded-full text-[clamp(10px,2vw,14px)] font-['Jost',sans-serif] font-medium transition-all duration-300 flex items-center gap-[clamp(4px,1vw,6px)] whitespace-nowrap"
          >
            <svg className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="hidden sm:inline">Back to AI Creator</span>
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

      <div className="header-spacer" />

      {/* Duplicate of Mielo slide 1 (desktop and mobile) with the same positioning/layout */}
      <section className="page-content relative subpad flex-1 px-0 anim-bg-soft">
        {/* Desktop/tablet: 70/30 split with dots in the gap */}
        <div className="hidden md:flex w-full h-[calc(100dvh-var(--nav-h)-15px)] flex-col relative miela-hero-in mt-[15px]">
          {/* Image container: 70% */}
          <div className="h-[70%] px-[clamp(12px,3vw,24px)] flex items-center justify-center relative">
            {/* Stack all frames (like Mielo) */}
            {aiSlidesDesktop.map((src, idx) => (
              <div
                key={`desk-${idx}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block rounded-[clamp(10px,1vw,18px)] overflow-hidden"
                style={{
                  opacity: aiFrame === idx ? 1 : 0,
                  transition: 'opacity 1600ms ease',
                  willChange: 'opacity',
                  border: '1.5px solid rgba(255,255,255,0.1)'
                }}
              >
                <img
                  src={src}
                  alt={`AI Creator slide ${idx+1}`}
                  decoding="async"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className="w-auto h-auto max-h-full object-contain"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = src }}
                />
              </div>
            ))}
          </div>
          {/* Dots in the gap */}
          <div className="absolute left-0 right-0 flex justify-center pointer-events-none" style={{ top: 'calc(70% + 28px)', transform: 'translateY(-50%)', zIndex: 20 }}>
            <div className="mielo-gap-dots flex justify-center gap-2">
              {Array.from({ length: aiSlidesDesktop.length }).map((_, idx) => (
                <div key={idx} className={`dot ${aiFrame === idx ? 'active' : ''}`} />
              ))}
            </div>
          </div>
          {/* Text container: 30% */}
          <div className="h-[30%] px-[clamp(12px,3vw,24px)] flex items-center justify-center">
            <div className="text-center font-['Jost',sans-serif] w-full h-full flex flex-col items-center justify-center overflow-y-auto">
              <h3 className="text-[clamp(20px,2.5vw,26px)] font-bold text-[#e4c492] mb-3 capitalize">{aiSlidesContent[aiFrame]?.heading}</h3>
              <p className="text-[clamp(15px,2vw,20px)] text-white/80 leading-relaxed whitespace-pre-line">
                {(aiSlidesContent[aiFrame]?.lines || []).join('\n')}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: image (70%), dots, then text (30%) */}
        <div
          className="md:hidden w-full h-[calc(100dvh-var(--nav-h)-15px)] flex flex-col relative miela-hero-in mt-[15px]"
          onTouchStart={(e) => {
            if (!e.touches || e.touches.length === 0) return
            aiTouchStartXRef.current = e.touches[0].clientX
            aiTouchStartYRef.current = e.touches[0].clientY
          }}
          onTouchMove={(e) => { if (e.cancelable) e.preventDefault() }}
          onTouchEnd={(e) => {
            if (!e.changedTouches || e.changedTouches.length === 0) return
            const now = Date.now()
            if (now - lastStepRef.current < 60) return
            const endX = e.changedTouches[0].clientX
            const endY = e.changedTouches[0].clientY
            const dx = endX - (aiTouchStartXRef.current || 0)
            const dy = endY - (aiTouchStartYRef.current || 0)
            const threshold = 14
            if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return
            if (Math.abs(dx) >= Math.abs(dy)) {
              setAiFrame((i) => (i + (dx < 0 ? 1 : -1) + aiSlidesMobile.length) % aiSlidesMobile.length)
            } else {
              setAiFrame((i) => (i + (dy < 0 ? 1 : -1) + aiSlidesMobile.length) % aiSlidesMobile.length)
            }
            lastStepRef.current = now
          }}
        >
          {/* Image container: 70% */}
          <div className="h-[70%] px-[clamp(12px,3vw,24px)] flex items-center justify-center relative">
            {/* Stack mobile frames center (like Mielo) */}
            {aiSlidesMobile.map((src, idx) => (
              <div key={`mob-${idx}`} className="w-full h-full absolute flex items-center justify-center">
                <div
                  className="rounded-[clamp(10px,1vw,18px)] overflow-hidden w-full"
                  style={{
                    opacity: aiFrame === idx ? 1 : 0,
                    transition: 'opacity 1600ms ease',
                    willChange: 'opacity'
                  }}
                >
                  <img
                    src={src}
                    alt={`AI Creator slide mobile ${idx+1}`}
                    decoding="async"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="w-full h-auto object-contain"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = src }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Dots in the gap */}
          <div className="absolute left-0 right-0 flex justify-center pointer-events-none" style={{ top: 'calc(70% - 20px)', transform: 'translateY(-50%)', zIndex: 20 }}>
            <div className="mielo-gap-dots flex justify-center gap-2">
              {Array.from({ length: aiSlidesMobile.length }).map((_, idx) => (
                <div key={idx} className={`dot ${aiFrame === idx ? 'active' : ''}`} />
              ))}
            </div>
          </div>
          {/* Text container: 30% */}
          <div className="h-[30%] px-[clamp(12px,3vw,24px)] mb-[clamp(12px,3vw,24px)] flex items-start justify-center pt-[clamp(8px,2vw,16px)]">
            <div className="text-center font-['Jost',sans-serif] w-full flex flex-col items-center justify-start mobile-paras">
              <h3 className="text-[clamp(24px,5vw,30px)] font-bold text-[#e4c492] mb-3 capitalize">{aiSlidesContent[aiFrame]?.heading}</h3>
              {(aiSlidesMobileShort[aiFrame]?.lines || []).map((ln, i) => (
                <p key={i} className="text-[clamp(18px,4vw,24px)] text-white/80">{ln}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-fixed-bg { position: fixed; left: 0; right: 0; bottom: 0; top: var(--nav-h); background-size: cover; background-position: center; z-index: 0; }
        .page-fixed-overlay { position: fixed; left: 0; right: 0; bottom: 0; top: var(--nav-h); background: rgba(0,0,0,0.35); z-index: 1; }
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
        .page-content { position: relative; z-index: 2; }
        /* Prevent page scroll/bounce on mobile */
        @media (max-width: 767px) {
          .ai-mobile-no-scroll { height: 100vh !important; overflow: hidden !important; overscroll-behavior: none !important; touch-action: none !important; }
          /* Ensure the mobile wrapper accounts for bottom margin space */
          .ai-mobile-wrap { box-sizing: border-box; }
          /* Very short screens: tighten split to avoid clipping */
          @media (max-height: 640px) {
            .ai-mobile-wrap .mobile-paras h3 { margin-bottom: 8px; }
            .ai-mobile-wrap .mobile-paras p { font-size: clamp(16px,4.2vw,20px); }
          }
        }
        /* Additional mobile scroll prevention for main container */
        @media (max-width: 767px) {
          .ai-mobile-no-scroll.ai-page-container { height: 100vh !important; overflow: hidden !important; }
          /* Prevent scrolling on the page content */
          .ai-mobile-no-scroll .page-content { overflow: hidden !important; }
          .ai-mobile-no-scroll .miela-hero-in { overflow: hidden !important; }
        }
        /* Decorative SVGs and inline arrow icons */
        img.svg-gold { filter: brightness(0) saturate(100%) invert(84%) sepia(18%) saturate(589%) hue-rotate(349deg) brightness(99%) contrast(91%); }
        svg.svg-gold { color: #e4c492; }
        .svg-left { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); left: calc(50% - 70px); transform: translateY(-50%); }
        .svg-right { top: calc(clamp(10px,2.5vh,16px) + clamp(3rem,6vw,4.25rem) / 2); right: calc(50% - 70px); transform: translateY(-50%); }
        @media (min-width: 768px) { .svg-left { left: calc(50% - 120px) } .svg-right { right: calc(50% - 120px) } }
        @media (min-width: 1024px) { .svg-left { left: calc(50% - 160px) } .svg-right { right: calc(50% - 160px) } }
        @media (min-width: 1280px) { .svg-left { left: calc(50% - 200px) } .svg-right { right: calc(50% - 200px) } }
        @media (min-width: 640px) { .svg-left { left: calc(50% - 90px) } .svg-right { right: calc(50% - 90px) } }
        .glass-button { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16); color: #e7f2f8; }
        /* SVG icons gold by default */
        .glass-button svg { stroke: #e4c492; fill: none; }
        /* AI theme hover */
        .glass-button:hover { background: #eac28a; color: #10171d; border-color: transparent; }
        /* SVG icons turn black on hover */
        .glass-button:hover svg { stroke: #10171d; fill: none; }

        .glass-card { background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        @keyframes contentSoftIn { 0% { opacity: 0; transform: translateY(12px) } 100% { opacity: 1; transform: translateY(0) } }
        .anim-content-soft { animation: contentSoftIn 900ms ease-out both; }
        @keyframes bgSoftIn { 0% { opacity: 0; transform: scale(1.015) } 100% { opacity: 1; transform: scale(1) } }
        .anim-bg-soft { animation: bgSoftIn 800ms ease-out both; }
        @keyframes subLogoSlowIn { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .sub-anim-logo-slow { animation: subLogoSlowIn 4.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        /* Mobile navbar SVGs (small screens only) - use gold when SVG is alone in button */
        @media (max-width: 767px) {
          .liquid-glass-header .glass-button svg { stroke: #e4c492; }
          .liquid-glass-header .glass-button:hover svg,
          .liquid-glass-header .glass-button:active svg { stroke: #e4c492; }
        }

        /* Mielo gap dots (same style) */
        .mielo-gap-dots { display: flex; justify-content: center; align-items: center; gap: 8px; }
        .mielo-gap-dots .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.36); box-shadow: none; transition: width 180ms ease, height 180ms ease, background 180ms ease, box-shadow 180ms ease; }
        .mielo-gap-dots .dot.active { width: 8px; height: 8px; background: rgba(255,255,255,0.95); box-shadow: 0 0 8px rgba(255,255,255,0.5); }
        /* Mobile paragraph spacing (slide text) */
        @media (max-width: 767px) {
          .mobile-paras p { line-height: 1.2; margin: 0 0 1.2em 0; }
          .mobile-paras p:last-child { margin-bottom: 0; }
        }
      `}</style>
    </div>
  )
}

export default AICreatorCaseStudy
