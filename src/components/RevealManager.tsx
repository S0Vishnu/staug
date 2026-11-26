import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TARGETS = [
  'section:not(.hero) .eyebrow',
  'section:not(.hero) .display',
  'section:not(.hero) .lede',
  'section:not(.hero) .body',
  '.grid-cards > *',
  '.grid-3 > *',
  '.tile-grid > *',
  '.paper-grid > *',
  '.stat-row > *',
  '.process > li',
  '.steps > li',
  '.talent-table > *',
  '.panel',
  '.article',
  '.form',
  '.twin-stage',
  '.plot-frame',
].join(',')

const SKIP = '.hero, .plot-frame *, .plot-aside, .twin-stage *, [data-reveal-skip]'

export function RevealManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const main = document.getElementById('main')
    if (!main) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) continue
          entry.target.setAttribute('data-reveal', 'in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 },
    )

    const frame = requestAnimationFrame(() => {
      for (const el of main.querySelectorAll<HTMLElement>(TARGETS)) {
        if (el.getAttribute('data-reveal') === 'in') continue
        if (el.closest(SKIP)) continue
        if (el.parentElement?.closest('[data-reveal]')) continue
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [el]
        const index = Math.min(siblings.indexOf(el), 7)
        el.style.setProperty('--reveal-delay', `${index * 80}ms`)
        el.setAttribute('data-reveal', '')
        observer.observe(el)
      }
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [pathname])

  return null
}
