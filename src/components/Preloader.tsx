import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type Phase = 'load' | 'exit' | 'done'

const letters = 'STAUG'.split('')

export function Preloader() {
  const [phase, setPhase] = useState<Phase>('load')
  const countRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minimum = reduce ? 900 : 1900
    const start = performance.now()
    let fontsReady = false
    let frame = 0
    let exitTimer = 0
    let doneTimer = 0

    document.fonts?.ready.then(() => {
      fontsReady = true
    })

    const tick = (now: number) => {
      const time = Math.min((now - start) / minimum, 1)
      const eased = 1 - Math.pow(1 - time, 3)
      const progress = fontsReady ? eased : Math.min(eased, 0.92)
      const value = Math.round(progress * 100)
      if (countRef.current) countRef.current.textContent = String(value).padStart(3, '0')
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`

      if (progress >= 1) {
        exitTimer = window.setTimeout(() => {
          setPhase('exit')
          root.classList.remove('is-loading')
          doneTimer = window.setTimeout(() => setPhase('done'), 1300)
        }, 180)
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className="preloader" data-phase={phase} role="status" aria-label="Loading STAUG">
      <div className="pl-panel pl-top" />
      <div className="pl-panel pl-bottom" />
      <div className="pl-center" aria-hidden="true">
        <svg className="pl-mark" viewBox="0 0 32 64">
          <polygon points="16,2 30,32 16,62 2,32" />
          <polygon className="pl-inner" points="16,14 24,32 16,50 8,32" />
        </svg>
        <div className="pl-word">
          {letters.map((letter, i) => (
            <span key={letter + i} style={{ '--i': i } as CSSProperties}>
              {letter}
            </span>
          ))}
        </div>
        <p className="pl-tag">Staff · Spatial · Augmentation</p>
      </div>
      <div className="pl-foot" aria-hidden="true">
        <span>People &amp; spaces, augmented</span>
        <span ref={countRef} className="pl-count">000</span>
      </div>
      <span className="pl-bar" aria-hidden="true">
        <span ref={barRef} />
      </span>
    </div>
  )
}
