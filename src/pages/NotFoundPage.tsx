import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Button } from '../components/Button'
import { ContactSection } from '../components/ContactSection'
import { PageMeta } from '../components/PageMeta'
import { HeroMissing, IconCube, IconPeople } from '../illustrations/scenes'
import { pages } from '../seo/site'

const ways = [
  {
    to: '/staff',
    meta: '01',
    title: (
      <>
        <span className="mark">ST</span>aff <span className="mark">AUG</span>mentation
      </>
    ),
    body: 'Pre-vetted technology professionals who join your team for a project or a defined period.',
    link: 'Explore Staff Augmentation →',
    icon: <IconPeople />,
  },
  {
    to: '/spatial',
    meta: '02',
    title: (
      <>
        <span className="mark">S</span>patial <span className="mark">AUG</span>mentation
      </>
    ),
    body: 'Plot Twins and Property Twins built from brochures, CAD layouts and floor plans.',
    link: 'Explore Spatial Augmentation →',
    icon: <IconCube />,
  },
  {
    to: '/about',
    meta: '03',
    title: 'About STAUG',
    body: 'How the two practices sit together, and the standard both of them are held to.',
    link: 'Read about STAUG →',
    icon: (
      <svg className="icon icon-lg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M24 6 40 15v18L24 42 8 33V15z" />
        <path d="M24 20v14M17 24h14" />
      </svg>
    ),
  },
]

export function NotFoundPage() {
  return (
    <>
      <PageMeta page="notFound" />
      <section className="container hero grid-2">
        <div className="stack stack-lg">
          <Breadcrumbs items={pages.notFound.crumbs} />
          <p className="eyebrow">404</p>
          <h1 className="display display-hero">This page is not on STAUG.</h1>
          <p className="lede measure-sm">
            The address may be mistyped or out of date. These are the public pages: staff augmentation, spatial digital twins, and about STAUG.
          </p>
          <div className="cluster">
            <Button to="/">Back to home</Button>
            <Button to="#contact" variant="ghost">Contact</Button>
          </div>
        </div>
        <HeroMissing />
      </section>

      <section className="container section stack stack-lg">
        <div className="stack stack-sm measure">
          <p className="eyebrow">Public pages</p>
          <h2 className="display display-lg">Start from a page that exists.</h2>
        </div>
        <div className="grid-3">
          {ways.map((way) => (
            <Link key={way.to} className="card" to={way.to} data-cursor="Explore">
              <div className="split" style={{ alignItems: 'center' }}>
                <span className="meta">{way.meta}</span>
                {way.icon}
              </div>
              <h3>{way.title}</h3>
              <p className="body">{way.body}</p>
              <span className="card-link">{way.link}</span>
            </Link>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  )
}
