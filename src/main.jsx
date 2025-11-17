import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { setupPreloaderGlobal } from './utils/preloader'
// URLs to hashed assets (resolved at build)
import cdBG from './assets/creative-designer-BG.webp'
import cdHero from './assets/creative-designer-hero.webp'
import brBG from './assets/branding-BG.webp'
import brHero from './assets/branding-hero.webp'
import aiBG from './assets/ai-creator-BG.webp'
import aiHero from './assets/ai-creator-hero.webp'
import annieHero from './assets/annie-hero.webp'
import luciaHero from './assets/lucia-hero.webp'
import threeDHero from './assets/3d-design-hero.webp'
import gameHero from './assets/game-design-hero.webp'
import './index.css'

// Ensure all CSS animations start together after a tiny delay on full refresh
;(function setupGlobalAnimationGate() {
  const ready = () => {
    // small delay so images/fonts mount before animations begin
    setTimeout(() => {
      document.body.classList.remove('anim-hold')
      document.body.classList.add('anim-ready')
    }, 180)
  }
  if (document.readyState === 'complete') ready()
  else window.addEventListener('load', ready, { once: true })
})()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// Idle-time warmup: prefetch route bundles and common hero assets
;(function prefetchOnIdle(){
  const idle = (cb) => (window.requestIdleCallback ? window.requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 1200))
  idle(() => {
    // Warm route chunks
    Promise.allSettled([
      import('./pages/CreativeDesigner'),
      import('./pages/Branding'),
      import('./pages/AICreator'),
      import('./pages/ThreeDDesign'),
      import('./pages/GameDesign'),
    ])
    // Prefetch hero/background images (low priority hint)
    ;[
      cdBG, cdHero, brBG, brHero, aiBG, aiHero, annieHero, luciaHero, threeDHero, gameHero,
    ].forEach((url) => {
      try {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.as = 'image'
        link.href = url
        document.head.appendChild(link)
      } catch (_) {}
    })
  })
})()

// Register Service Worker in production for faster repeat loads
// Only register a Service Worker in production builds
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    try {
      const swUrl = import.meta.env.BASE_URL + 'sw.js'
      navigator.serviceWorker.register(swUrl)
    } catch (e) { /* no-op */ }
  })
}

// Setup global preloader gate
setupPreloaderGlobal()
