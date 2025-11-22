import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const Home = lazy(() => import('./pages/Home'))
const CreativeDesigner = lazy(() => import('./pages/CreativeDesigner'))
const Branding = lazy(() => import('./pages/Branding'))
const AICreator = lazy(() => import('./pages/AICreator'))
const ThreeDDesign = lazy(() => import('./pages/ThreeDDesign'))
const GameDesign = lazy(() => import('./pages/GameDesign'))
const CreativeDesignerCaseStudy = lazy(() => import('./pages/CreativeDesignerCaseStudy'))
const BrandingCaseStudy = lazy(() => import('./pages/BrandingCaseStudy'))
const AICreatorCaseStudy = lazy(() => import('./pages/AICreatorCaseStudy'))

function RouteGate() {
  const location = useLocation()
  useEffect(() => {
    // Map routes to critical assets to preload before revealing page animations
    const base = import.meta.env.BASE_URL || '/'
    let assets = []
    if (location.pathname === '/' || location.pathname === base) {
      assets = [
        `${base}hero-bg.webp`, `${base}ibheelz-logo.webp`, `${base}left.svg`, `${base}right.svg`,
        `${base}characters/1.webp`, `${base}characters/2.webp`, `${base}characters/3.webp`
      ]
    } else if (location.pathname.includes('creative-designer')) {
      assets = [ `${base}creative-designer-BG.webp`, `${base}creative-designer-hero.webp` ]
      if (location.pathname.includes('case-study')) {
        assets.push(`${base}creative-designer-cs-BG.png`)
      }
    } else if (location.pathname.includes('branding')) {
      assets = [ `${base}branding-BG.webp`, `${base}branding-hero.webp` ]
    } else if (location.pathname.includes('ai-creator')) {
      assets = [ `${base}ai-creator-BG.webp`, `${base}ai-creator-hero.webp`, `${base}annie-hero.webp`, `${base}lucia-hero.webp` ]
    } else if (location.pathname.includes('3d-design')) {
      assets = [ `${base}3d-design-hero.webp` ]
    } else if (location.pathname.includes('game-design')) {
      assets = [ `${base}game-design-hero.webp` ]
    }
    if (window.preloadGate) window.preloadGate(assets, { minMs: 0, maxMs: 0, silent: true })
  }, [location.pathname])
  return null
}

function App() {
  return (
    <Suspense fallback={null}>
      <RouteGate />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creative-designer" element={<CreativeDesigner />} />
        <Route path="/creative-designer/case-study" element={<CreativeDesignerCaseStudy />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/branding/case-study" element={<BrandingCaseStudy />} />
        <Route path="/ai-creator" element={<AICreator />} />
        <Route path="/ai-creator/case-study" element={<AICreatorCaseStudy />} />
        <Route path="/3d-design" element={<ThreeDDesign />} />
        <Route path="/game-design" element={<GameDesign />} />
      </Routes>
    </Suspense>
  )
}

export default App
