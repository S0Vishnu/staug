import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { EnquiryForm } from '../components/EnquiryForm'
import { PageMeta } from '../components/PageMeta'
import { PracticeTabs } from '../features/home/PracticeTabs'
import { IconCube, IconPeople, HeroHome } from '../illustrations/scenes'

const principles = [
  {
    n: 'I.',
    title: 'Precision first',
    body: 'Whether matching a developer to a project or a render to a CAD drawing, we start from your exact requirements.',
  },
  {
    n: 'II.',
    title: 'Seamless integration',
    body: 'Our professionals work inside your tools and processes; our twins drop into your website and sales experience.',
  },
  {
    n: 'III.',
    title: 'Flexible by design',
    body: 'Engagements shaped around your scope, timeline and scale — never the other way round.',
  },
]

export function HomePage() {
  return (
    <>
      <PageMeta title="STAUG — Staff & Spatial Augmentation" />
      <section className="container hero grid-2">
        <div className="stack stack-lg">
          <h1 className="display display-hero">
            We augment what builds a business — its <em>people</em> and its <em>spaces</em>.
          </h1>
          <p className="lede measure-sm">
            STAUG brings pre-vetted technology professionals into your teams, and turns real estate brochures, CAD layouts and floor plans into immersive 3D digital twins your buyers can walk through.
          </p>
          <div className="cluster">
            <Button to="/staff">Staff Augmentation →</Button>
            <Button to="/spatial" variant="ghost">Spatial Augmentation →</Button>
          </div>
        </div>
        <HeroHome />
      </section>

      <PracticeTabs />

      <section className="container section stack stack-lg">
        <div className="stack stack-sm measure">
          <p className="eyebrow">Our businesses</p>
          <h2 className="display display-lg">Two specialised practices. One standard of precision.</h2>
        </div>
        <div className="grid-cards">
          <Link className="card" to="/staff" data-cursor="Explore">
            <div className="split" style={{ alignItems: 'center' }}>
              <span className="meta">01</span>
              <IconPeople />
            </div>
            <h3 className="serif-title">
              <span className="mark">ST</span>aff <span className="mark">AUG</span>mentation
            </h3>
            <p className="body">
              Skilled, pre-vetted IT professionals who integrate into your teams and workflows — so you scale capability on demand, without the timelines of traditional hiring.
            </p>
            <div className="cluster">
              <span className="chip">Employees</span>
              <span className="chip">Contractors</span>
              <span className="chip">Temporary workers</span>
            </div>
            <span className="card-link">Explore Staff Augmentation →</span>
          </Link>
          <Link className="card" to="/spatial" data-cursor="Explore">
            <div className="split" style={{ alignItems: 'center' }}>
              <span className="meta">02</span>
              <IconCube />
            </div>
            <h3 className="serif-title">
              <span className="mark">S</span>patial <span className="mark">T</span>win <span className="mark">AUG</span>mentation
            </h3>
            <p className="body">
              3D digital twins of real estate — from the master plot down to every apartment — with 360° rendered interiors built from your brochures, CAD layouts, palettes and unit plans.
            </p>
            <div className="cluster">
              <span className="chip">Plot Twin</span>
              <span className="chip">Property Twin</span>
              <span className="chip">360° interiors</span>
            </div>
            <span className="card-link">Explore Spatial Augmentation →</span>
          </Link>
        </div>
      </section>

      <section className="band">
        <div className="container section grid-3">
          {principles.map((item) => (
            <div key={item.n} className="stack stack-sm">
              <p className="numeral">{item.n}</p>
              <h3>{item.title}</h3>
              <p className="body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="paper">
        <div className="container section grid-2 grid-2-start">
          <div className="stack stack-md">
            <p className="eyebrow">Get in touch</p>
            <h2 className="display display-lg">Tell us what you need to augment.</h2>
            <p className="body">
              A team that needs to scale, or a project that needs to be seen before it is built — we will respond with a clear proposal.
            </p>
            <div className="stack" style={{ gap: 10, marginTop: 8, color: 'var(--paper-ink)' }}>
              <p style={{ margin: 0 }}>
                Email: <a href="mailto:business@staug.in"><strong>business@staug.in</strong></a>
              </p>
              <p style={{ margin: 0 }}>
                Website: <a href="https://www.staug.in"><strong>www.staug.in</strong></a>
              </p>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  )
}
