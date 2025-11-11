import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
const Home = lazy(() => import('./pages/Home'))
const CreativeDesigner = lazy(() => import('./pages/CreativeDesigner'))
const Branding = lazy(() => import('./pages/Branding'))
const AICreator = lazy(() => import('./pages/AICreator'))
const ThreeDDesign = lazy(() => import('./pages/ThreeDDesign'))
const GameDesign = lazy(() => import('./pages/GameDesign'))

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creative-designer" element={<CreativeDesigner />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/ai-creator" element={<AICreator />} />
        <Route path="/3d-design" element={<ThreeDDesign />} />
        <Route path="/game-design" element={<GameDesign />} />
      </Routes>
    </Suspense>
  )
}

export default App
