import { Link } from 'react-router-dom'
import { ContactSection } from '../components/ContactSection'
import { PageMeta } from '../components/PageMeta'
import { IconCube, IconPeople } from '../illustrations/scenes'

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

export function AboutPage() {
  return (
    <>
      <PageMeta title="STAUG — About us" />
      <section className="container hero grid-2">
        <div className="stack stack-lg">
          <p className="eyebrow">About us</p>
          <h1 className="display display-hero">
            Two specialised practices. <em>One standard of precision.</em>
          </h1>
          <p className="lede measure-sm">
            STAUG augments the two things a business is built on: the people who make it, and the spaces it sells. Both practices start from your exact requirements and stay with you until the work is in place.
          </p>
        </div>
        <div className="stack stack-lg">
          <p className="body">
            <span className="mark">ST</span>aff <span className="mark">AUG</span>mentation brings pre-vetted technology professionals into your teams — employees, contractors and temporary specialists — without the timelines of traditional hiring.
          </p>
          <p className="body">
            <span className="mark">S</span>patial <span className="mark">T</span>win <span className="mark">AUG</span>mentation turns brochures, CAD layouts, palettes and floor plans into 3D digital twins buyers can walk through before a project is built.
          </p>
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

      <section className="container section stack stack-lg">
        <div className="stack stack-sm measure">
          <p className="eyebrow">The practices</p>
          <h2 className="display display-lg">People, and the places they sell.</h2>
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
              Skilled, pre-vetted IT professionals who integrate into your teams and workflows — so you scale capability on demand.
            </p>
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
              Plot Twins and Property Twins, from the master layout down to a 360° rendered room, built from the documents you already have.
            </p>
            <span className="card-link">Explore Spatial Augmentation →</span>
          </Link>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
