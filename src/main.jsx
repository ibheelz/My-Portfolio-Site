import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
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
