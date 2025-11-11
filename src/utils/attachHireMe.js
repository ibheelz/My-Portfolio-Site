// Attach mailto handler to any "Hire Me" buttons/links under the given root
export function attachHireMe(root = document) {
  const subject = encodeURIComponent('Project Inquiry')
  const body = encodeURIComponent(
    "Hi,\n\nI came across your portfolio and would love to discuss working together.\n\nPlease let me know your availability.\n\nThank you!"
  )
  const mailto = `mailto:abioladeyeye@gmail.com?subject=${subject}&body=${body}`

  const nodes = Array.from(root.querySelectorAll('button, a'))
  const targets = nodes.filter((n) => (n.textContent || '').trim().toLowerCase().includes('hire me'))
  const cleanups = []
  targets.forEach((el) => {
    if (el.dataset.mailtoWired === '1') return
    el.style.cursor = 'pointer'
    const handler = (e) => {
      e.preventDefault()
      try { window.location.href = mailto } catch (_) {}
    }
    el.addEventListener('click', handler)
    if (el.tagName === 'A') {
      try { el.href = mailto; el.target = '_self' } catch (_) {}
    }
    el.dataset.mailtoWired = '1'
    cleanups.push(() => {
      try { el.removeEventListener('click', handler); delete el.dataset.mailtoWired } catch (_) {}
    })
  })

  return () => { cleanups.forEach((fn) => fn()) }
}

