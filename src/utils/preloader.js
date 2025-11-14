// Lightweight global preloader gate with adaptive delay
// Usage: window.preloadGate(urls, { minMs: 800, maxMs: 5000 })

export function preloadImages(urls = []) {
  const tasks = urls.filter(Boolean).map((url) => new Promise((resolve) => {
    try {
      const img = new Image()
      img.onload = img.onerror = () => resolve()
      img.src = url
      if (img.decode) {
        img.decode().catch(() => {}).then(resolve)
      }
    } catch (_) { resolve() }
  }))
  return Promise.all(tasks)
}

export function setupPreloaderGlobal() {
  if (window.preloadGate) return
  window.preloadGate = function(urls = [], opts = {}) {
    const minMs = typeof opts.minMs === 'number' ? opts.minMs : 800
    const maxMs = typeof opts.maxMs === 'number' ? opts.maxMs : 5000
    const started = Date.now()
    const showEvt = new CustomEvent('preloader:show')
    const hideEvt = new CustomEvent('preloader:hide')
    window.dispatchEvent(showEvt)
    const timerMin = new Promise((r) => setTimeout(r, minMs))
    const timerMax = new Promise((r) => setTimeout(r, maxMs))
    const work = preloadImages(urls)
    // Resolve when images + min delay done, or at max cap
    return Promise.race([
      Promise.all([work, timerMin]).then(() => true),
      timerMax.then(() => false)
    ]).finally(() => {
      window.dispatchEvent(hideEvt)
    })
  }
}

