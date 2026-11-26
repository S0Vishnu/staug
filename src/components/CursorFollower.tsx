import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], label, summary, .res, .plot'
const SPOTLIGHT = '.card, .tile, .panel, .article, .paper-card, .stat, .res, .practice-model, .practice-twin'
const MAGNETIC = '.btn, .magnetic, .menu-toggle'

export function CursorFollower() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cursor = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!finePointer.matches || !cursor || !dot || !ring || !label) return

    const html = document.documentElement
    html.classList.add('has-cursor')

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let frame = 0
    let magnet: HTMLElement | null = null

    const releaseMagnet = () => {
      if (magnet) magnet.style.translate = ''
      magnet = null
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x = event.clientX
      y = event.clientY

      if (!html.classList.contains('cursor-visible')) {
        rx = x
        ry = y
        html.classList.add('cursor-visible')
      }

      html.style.setProperty('--px', ((x / window.innerWidth) * 2 - 1).toFixed(3))
      html.style.setProperty('--py', ((y / window.innerHeight) * 2 - 1).toFixed(3))

      const target = event.target as Element | null
      if (!target?.closest) return

      const surface = target.closest<HTMLElement>(SPOTLIGHT)
      if (surface) {
        const box = surface.getBoundingClientRect()
        surface.style.setProperty('--mx', `${x - box.left}px`)
        surface.style.setProperty('--my', `${y - box.top}px`)
      }

      const pull = reduce ? null : target.closest<HTMLElement>(MAGNETIC)
      if (pull !== magnet) releaseMagnet()
      if (pull) {
        magnet = pull
        const box = pull.getBoundingClientRect()
        const dx = x - (box.left + box.width / 2)
        const dy = y - (box.top + box.height / 2)
        pull.style.translate = `${dx * 0.2}px ${dy * 0.32}px`
      }

      const labelled = target.closest<HTMLElement>('[data-cursor]')
      const field = target.closest('input, textarea, select')
      const state = field ? 'text' : labelled ? 'label' : target.closest(INTERACTIVE) ? 'hover' : ''
      cursor.dataset.state = state
      cursor.dataset.tone = target.closest('.paper, .confirm, .form') ? 'ink' : ''
      const text = labelled?.dataset.cursor ?? ''
      if (label.textContent !== text) label.textContent = text
    }

    const onDown = () => {
      cursor.dataset.down = 'true'
    }
    const onUp = () => {
      cursor.dataset.down = ''
    }
    const onLeave = () => {
      html.classList.remove('cursor-visible')
      releaseMagnet()
    }

    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      releaseMagnet()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      html.classList.remove('has-cursor', 'cursor-visible')
    }
  }, [])

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <div className="cursor-ring-inner">
          <span ref={labelRef} className="cursor-label" />
        </div>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
