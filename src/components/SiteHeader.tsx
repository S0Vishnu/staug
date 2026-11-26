import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode, RefObject } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from './Button'
import { Logo } from './Logo'

type Item = { to: string; label: string; end?: boolean }

const links: Item[] = [
  { to: '/staff', label: 'Staff Augmentation' },
  { to: '/spatial', label: 'Spatial Augmentation' },
  { to: '/about', label: 'About us' },
  { to: '#contact', label: 'Contact' },
]

function ctaFor(pathname: string) {
  if (pathname.startsWith('/staff')) return { to: '/staff#cta', label: 'Hire talent' }
  if (pathname.startsWith('/spatial')) return { to: '/spatial#cta', label: 'Start a twin' }
  return { to: '#contact', label: 'Book a consultation' }
}

function NavItem({ item, className = 'navlink', children }: { item: Item; className?: string; children?: ReactNode }) {
  const { pathname, hash } = useLocation()
  const [path, fragment] = item.to.split('#')
  const target = path || '/'
  const content = children ?? item.label

  if (item.to.startsWith('#')) {
    const active = hash === item.to
    return (
      <Link to={{ hash: item.to.slice(1) }} className={active ? `${className} is-active` : className}>
        {content}
      </Link>
    )
  }

  if (fragment) {
    const active = pathname === target && hash === `#${fragment}`
    return (
      <Link to={item.to} className={active ? `${className} is-active` : className}>
        {content}
      </Link>
    )
  }

  return (
    <NavLink
      to={item.to}
      end={item.end ?? item.to === '/'}
      className={({ isActive }) => (isActive ? `${className} is-active` : className)}
    >
      {content}
    </NavLink>
  )
}

function useScrollChrome(progressRef: RefObject<HTMLSpanElement | null>) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
      }
      setScrolled(y > 24)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 320)
        last = y
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [progressRef])

  return { scrolled, hidden }
}

export function SiteHeader() {
  const { pathname, hash } = useLocation()
  const cta = ctaFor(pathname)
  const locationKey = `${pathname}${hash}`
  const [openKey, setOpenKey] = useState<string | null>(null)
  const open = openKey === locationKey
  const progressRef = useRef<HTMLSpanElement>(null)
  const { scrolled, hidden } = useScrollChrome(progressRef)
  const headerRef = useRef<HTMLElement>(null)
  const concealed = hidden && !open

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const sync = () => {
      document.documentElement.style.setProperty('--chrome-top', concealed ? '0px' : `${header.offsetHeight}px`)
    }
    sync()
    const timer = window.setTimeout(sync, 450)
    window.addEventListener('resize', sync)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', sync)
    }
  }, [concealed, scrolled])

  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenKey(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      html.classList.remove('menu-open')
    }
  }, [open])

  const classes = ['site-header', scrolled && 'is-scrolled', concealed && 'is-hidden', open && 'is-open']
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <header ref={headerRef} className={classes}>
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="STAUG home">
            <Logo />
          </Link>
          <nav className="nav" aria-label="Main">
            {links.map((item) => (
              <NavItem key={item.to + item.label} item={item} />
            ))}
            <Button to={cta.to} size="sm">
              {cta.label}
            </Button>
          </nav>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpenKey(open ? null : locationKey)}
          >
            <span className="menu-toggle-text" aria-hidden="true">
              <span>Menu</span>
              <span>Close</span>
            </span>
            <span className="burger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
        <span className="scroll-progress" aria-hidden="true">
          <span ref={progressRef} />
        </span>
      </header>

      <div id="mobile-menu" className={open ? 'mobile-menu is-open' : 'mobile-menu'} inert={!open}>
        <div className="mobile-menu-bg" aria-hidden="true" />
        <nav className="mobile-menu-inner container" aria-label="Mobile">
          <p className="mobile-menu-eyebrow">Navigate</p>
          <ul className="mobile-links">
            {links.map((item, i) => (
              <li key={item.to + item.label} style={{ '--i': i } as CSSProperties}>
                <NavItem item={item} className="mobile-link">
                  <span className="mobile-link-no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mobile-link-label">{item.label}</span>
                  <span className="mobile-link-arrow" aria-hidden="true">→</span>
                </NavItem>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-foot" style={{ '--i': links.length } as CSSProperties}>
            <Button to={cta.to}>{cta.label} →</Button>
            <div className="mobile-menu-contact">
              <a href="mailto:business@staug.in">business@staug.in</a>
              <a href="https://www.staug.in">www.staug.in</a>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
