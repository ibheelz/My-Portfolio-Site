import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreativeDesigner from './pages/CreativeDesigner'
import Branding from './pages/Branding'
import AICreator from './pages/AICreator'
import ThreeDDesign from './pages/ThreeDDesign'
import GameDesign from './pages/GameDesign'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/creative-designer" element={<CreativeDesigner />} />
      <Route path="/branding" element={<Branding />} />
      <Route path="/ai-creator" element={<AICreator />} />
      <Route path="/3d-design" element={<ThreeDDesign />} />
      <Route path="/game-design" element={<GameDesign />} />
    </Routes>
  )
}

export default App
