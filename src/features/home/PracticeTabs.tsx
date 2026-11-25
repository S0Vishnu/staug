import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { roles } from '../../data/talent'
import { IconCube, IconPeople, IconPlan, IconPlot } from '../../illustrations/scenes'
import '../../styles/home.css'

type PracticeId = 'staff' | 'spatial'

const order: PracticeId[] = ['staff', 'spatial']

const labels: Record<PracticeId, ReactNode> = {
  staff: (
    <>
      <span className="mark">ST</span>aff <span className="mark">AUG</span>mentation
    </>
  ),
  spatial: (
    <>
      <span className="mark">S</span>patial <span className="mark">T</span>win <span className="mark">AUG</span>mentation
    </>
  ),
}

const staffGains = [
  ['Access specialised talent', 'Qualified professionals with the technical expertise your projects require.'],
  ['Scale on demand', 'Increase or reduce team capacity as priorities change.'],
  ['Accelerate delivery', 'Cut recruitment and onboarding delays with experienced professionals.'],
  ['Keep full control', 'You direct tasks, communication and deliverables — unlike outsourcing.'],
]

const staffModels = [
  ['Project-Based Engagement', 'Outcome-driven. Deliverable-focused.'],
  ['Dedicated Resource Engagement', 'Your team. Our talent. Your direction.'],
]

const twins = [
  {
    no: 'TWIN 01',
    title: 'Plot Twin',
    icon: <IconPlot />,
    body: 'A 3D twin of a plotted layout with live availability buyers can browse plot by plot.',
    points: ['Numbered plots, roads and boundaries', 'Available, booked, sold, blocked', 'Sizes and prices on tap'],
    to: '/spatial#plot-demo',
  },
  {
    no: 'TWIN 02',
    title: 'Property Twin',
    icon: <IconPlan />,
    body: 'Every floor, every unit, every room — down to a 360° rendered interior.',
    points: ['Interactive floor selector', 'Clickable floor plates and unit plans', '360° HD interiors, room by room'],
    to: '/spatial#demo',
  },
]

const twinSteps = ['Share your assets', 'We model the twin', 'Render in HD and 360°', 'Launch and sell']

function StaffPanel() {
  return (
    <div className="practice-grid">
      <div className="stack stack-md">
        <div className="practice-head">
          <span className="meta">01</span>
          <IconPeople />
        </div>
        <h2 className="display display-lg">
          Build Faster. <em>Scale Smarter.</em>
        </h2>
        <p className="body">
          Skilled, pre-vetted IT professionals who integrate into your teams and workflows — so you scale capability on demand, without the timelines of traditional hiring.
        </p>
        <div className="practice-stats">
          <div><strong>20</strong><span>Disciplines</span></div>
          <div><strong>02</strong><span>Engagement models</span></div>
          <div><strong>03</strong><span>Workforce types</span></div>
        </div>
        <div className="cluster">
          <Button to="/staff">Explore Staff Augmentation →</Button>
          <Button to="/staff#models" variant="ghost">Engagement models</Button>
        </div>
      </div>

      <div className="stack stack-md">
        <ul className="practice-list">
          {staffGains.map(([title, body], index) => (
            <li key={title}>
              <span className="practice-list-no">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="practice-models">
          {staffModels.map(([title, line]) => (
            <Link key={title} to="/staff#models" className="practice-model">
              <span className="practice-model-title">{title}</span>
              <span className="mark">{line}</span>
            </Link>
          ))}
        </div>
        <Link to="/talent" className="practice-elements" data-cursor="Talent" aria-label="Browse all twenty talent disciplines">
          {roles.slice(0, 8).map((role) => (
            <span key={role.sym} className="practice-element" title={role.name}>{role.sym}</span>
          ))}
          <span className="practice-element is-more">+12</span>
        </Link>
      </div>
    </div>
  )
}

function SpatialPanel() {
  return (
    <div className="practice-grid">
      <div className="stack stack-md">
        <div className="practice-head">
          <span className="meta">02</span>
          <IconCube />
        </div>
        <h2 className="display display-lg">
          Let buyers walk through it <em>before it’s built.</em>
        </h2>
        <p className="body">
          3D digital twins of real estate — from the master plot down to every apartment — with 360° rendered interiors built from your brochures, CAD layouts, palettes and unit plans.
        </p>
        <div className="practice-stats">
          <div><strong>02</strong><span>Digital twins</span></div>
          <div><strong>360°</strong><span>Interiors</span></div>
          <div><strong>04</strong><span>Steps to launch</span></div>
        </div>
        <div className="cluster">
          <Button to="/spatial">Explore Spatial Augmentation →</Button>
          <Button to="/spatial#demo" variant="ghost">Try the live demo</Button>
        </div>
      </div>

      <div className="stack stack-md">
        <div className="practice-twins">
          {twins.map((twin) => (
            <Link key={twin.title} to={twin.to} className="practice-twin" data-cursor="Demo">
              <div className="practice-head">
                <span className="fine">{twin.no}</span>
                {twin.icon}
              </div>
              <h3 className="serif-title">{twin.title}</h3>
              <p>{twin.body}</p>
              <ul className="points">
                {twin.points.map((point) => (
                  <li key={point}><span className="diamond" aria-hidden="true">◆</span>{point}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
        <ol className="practice-steps">
          {twinSteps.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function PracticeTabs() {
  const [active, setActive] = useState<PracticeId>('staff')
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const tabRefs = useRef<Record<PracticeId, HTMLButtonElement | null>>({ staff: null, spatial: null })
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const section = sectionRef.current
      const bar = barRef.current
      if (!section || !bar) return
      const offset = parseFloat(getComputedStyle(bar).top) || 0
      setStuck(section.getBoundingClientRect().top < offset - 1)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useLayoutEffect(() => {
    const place = () => {
      const tab = tabRefs.current[active]
      const indicator = indicatorRef.current
      if (!tab || !indicator) return
      indicator.style.width = `${tab.offsetWidth}px`
      indicator.style.transform = `translateX(${tab.offsetLeft}px)`
    }
    place()
    const settle = window.setTimeout(place, 450)
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => {
      window.clearTimeout(settle)
      window.removeEventListener('resize', place)
    }
  }, [active, stuck])

  const select = (next: PracticeId, focus = false) => {
    if (next === active) return
    setDirection(order.indexOf(next) > order.indexOf(active) ? 'right' : 'left')
    setActive(next)
    if (focus) tabRefs.current[next]?.focus()
    const section = sectionRef.current
    if (section && section.getBoundingClientRect().top < 0) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = order.indexOf(active)
    if (event.key === 'ArrowRight') select(order[(index + 1) % order.length], true)
    else if (event.key === 'ArrowLeft') select(order[(index - 1 + order.length) % order.length], true)
    else if (event.key === 'Home') select(order[0], true)
    else if (event.key === 'End') select(order[order.length - 1], true)
    else return
    event.preventDefault()
  }

  return (
    <section ref={sectionRef} className="practice" aria-label="Our practices">
      <div ref={barRef} className={stuck ? 'practice-bar is-stuck' : 'practice-bar'}>
        <div className="container">
          <div className="practice-tabs" role="tablist" aria-label="Choose a practice" onKeyDown={onKeyDown}>
            {order.map((id, index) => (
              <div key={id} className="practice-tab-slot">
                {index > 0 && (
                  <span className="glyph practice-glyph" data-active={active} aria-hidden="true">◆</span>
                )}
                <button
                  ref={(node) => {
                    tabRefs.current[id] = node
                  }}
                  type="button"
                  role="tab"
                  id={`practice-tab-${id}`}
                  aria-selected={active === id}
                  aria-controls={`practice-panel-${id}`}
                  tabIndex={active === id ? 0 : -1}
                  className="practice-tab"
                  onClick={() => select(id)}
                >
                  {labels[id]}
                </button>
              </div>
            ))}
            <span ref={indicatorRef} className="practice-indicator" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div
        key={active}
        role="tabpanel"
        id={`practice-panel-${active}`}
        aria-labelledby={`practice-tab-${active}`}
        className="container practice-panel"
        data-direction={direction}
      >
        {active === 'staff' ? <StaffPanel /> : <SpatialPanel />}
      </div>
    </section>
  )
}
