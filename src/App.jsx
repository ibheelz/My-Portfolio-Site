import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreativeDesigner from './pages/CreativeDesigner'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/creative-designer" element={<CreativeDesigner />} />
    </Routes>
  )
}

export default App
