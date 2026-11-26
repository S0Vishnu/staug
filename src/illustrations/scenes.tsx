function Scene({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="hero-art">
      <img src={src} alt={alt} />
      {caption ? <figcaption className="scene-caption">{caption}</figcaption> : null}
    </figure>
  )
}

export function HeroHome() {
  return (
    <Scene
      src="/illustrations/hero-home.png?v=3d"
      alt="A gold wireframe tower beside a network of connected professionals"
      caption="People · Spaces · Augmented"
    />
  )
}

export function HeroStaff() {
  return (
    <Scene
      src="/illustrations/hero-staff.png?v=3d"
      alt="Your core team in ivory, with pre-vetted STAUG professionals in gold joining the network"
      caption="Your team · STAUG talent"
    />
  )
}

export function CommunityAerial() {
  return (
    <Scene
      src="/illustrations/hero-aerial.png?v=3d"
      alt="Aerial view of a residential community with towers around a landscaped courtyard"
      caption="Property twin · Sample community"
    />
  )
}

export function HeroMissing() {
  return (
    <Scene
      src="/illustrations/hero-missing.png?v=3d"
      alt="A plotted layout with one address missing, marked 404"
      caption="Unmapped address"
    />
  )
}

export function IconPeople() {
  return (
    <svg className="icon icon-lg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="17" cy="16" r="6" />
      <path d="M6 38c1-7 6-11 11-11s10 4 11 11" />
      <circle cx="34" cy="19" r="5" />
      <path d="M29 30c2-2 3.5-3 5-3 4 0 8 3 9 9" />
    </svg>
  )
}

export function IconCube() {
  return (
    <svg className="icon icon-lg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M24 5 41 14v20L24 43 7 34V14z" />
      <path d="M7 14l17 9 17-9M24 23v20" />
    </svg>
  )
}

export function IconPlot() {
  return (
    <svg className="icon" width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M28 10 52 22 28 34 4 22z" />
      <path d="M16 22v-8l6-3 6 3v14M34 25V12l6-3 6 3v13" />
      <circle cx="28" cy="22" r="3" />
      <path d="M4 22v10l24 12 24-12V22" />
    </svg>
  )
}

export function IconPlan() {
  return (
    <svg className="icon" width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="6" y="8" width="44" height="40" />
      <path d="M6 26h18V8M24 34v14M24 34h10M34 26h16M34 26v8" />
      <circle cx="42" cy="40" r="4" />
    </svg>
  )
}
