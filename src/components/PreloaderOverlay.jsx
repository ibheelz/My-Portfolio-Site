import { useEffect, useState } from 'react'

export default function PreloaderOverlay() {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const onShow = () => setActive(true)
    const onHide = () => setActive(false)
    window.addEventListener('preloader:show', onShow)
    window.addEventListener('preloader:hide', onHide)
    return () => {
      window.removeEventListener('preloader:show', onShow)
      window.removeEventListener('preloader:hide', onHide)
    }
  }, [])
  if (!active) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100000,
      background: 'rgba(6,8,10,0.8)', backdropFilter: 'blur(6px)'
    }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#fff', fontFamily: 'Jost, sans-serif', textAlign: 'center' }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', margin: '0 auto 14px', animation: 'spin 1s linear infinite' }} />
        <div style={{ opacity: 0.85, fontSize: 14 }}>Preparing your experience…</div>
        <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
      </div>
    </div>
  )
}

