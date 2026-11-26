import { Breadcrumbs } from '../components/Breadcrumbs'
import { Button } from '../components/Button'
import { ContactSection } from '../components/ContactSection'
import { PageMeta } from '../components/PageMeta'
import { pages } from '../seo/site'
import { PlotTwin } from '../features/spatial/PlotTwin'
import { PropertyTwin } from '../features/spatial/PropertyTwin'
import { CommunityAerial, IconPlan, IconPlot } from '../illustrations/scenes'
import '../styles/spatial.css'

const sources = [
  ['Brochures', 'M5 4h14l6 6v16H5zM19 4v6h6M9 15h12M9 19h12M9 23h8'],
  ['CAD layouts', 'M4 26 26 4M4 4h22v22H4zM15 15m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0'],
  ['Colour palettes', 'M10 11a5 5 0 1 0 0.01 0M20 11a5 5 0 1 0 0.01 0M15 20a5 5 0 1 0 0.01 0'],
  ['Brand design', 'M15 3l3.5 7.5L26 12l-5.5 5.5L22 26l-7-4-7 4 1.5-8.5L4 12l7.5-1.5z'],
  ['Unit plans', 'M4 4h22v22H4zM4 14h10V4M14 20v6M20 14h6'],
  ['Floor plans', 'M3 6h16v8h8v12H3zM3 14h16M11 6v20M19 20h8'],
  ['Amenity designs', 'M3 22c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2M3 17c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2M9 14V5h6v9'],
]

const steps = [
  ['Share your assets', 'Brochure, CAD layouts, floor and unit plans, palettes, brand guidelines and amenity designs.'],
  ['We model the twin', 'Site, towers and interiors built to the builder’s specifications, materials and finishes.'],
  ['Render in HD and 360°', 'Photoreal renders, aerials and 360° rooms — reviewed with you until they match your vision.'],
  ['Launch and sell', 'Use the twin on your website, in the sales gallery and in broker presentations.'],
]

export function SpatialPage() {
  return (
    <>
      <PageMeta page="spatial" />
      <section className="container hero grid-2">
        <div className="stack stack-lg">
          <Breadcrumbs items={pages.spatial.crumbs} />
          <p className="kicker">
            <span className="mark">STAUG</span> · <span className="mark">S</span>patial <span className="mark">T</span>win <span className="mark">AUG</span>mentation
          </p>
          <h1 className="display display-xl">
            Let buyers walk through it <em>before it’s built.</em>
          </h1>
          <p className="lede measure-sm">
            We create 3D digital twins of real estate — plotted land layouts with live plot availability, and apartment projects with photoreal 360° interiors — built from your brochure, CAD layouts, palettes, unit plans, floor plans and amenity designs, exactly as the builder planned.
          </p>
          <div className="cluster">
            <Button to="/spatial#demo">Try the live demo</Button>
            <Button to="/spatial#twins" variant="ghost">Plot Twin vs Property Twin</Button>
          </div>
        </div>
        <CommunityAerial />
      </section>

      <section id="twins" className="band">
        <div className="container section stack stack-lg">
          <div className="stack stack-sm measure">
            <p className="eyebrow">Two digital twins</p>
            <h2 className="display display-lg">From the master plot to the last cushion.</h2>
          </div>
          <div className="grid-cards">
            <article className="article">
              <IconPlot />
              <p className="fine">TWIN 01</p>
              <h3 className="serif-title">Plot Twin</h3>
              <p className="body">
                A 3D digital twin of a plotted land layout — every plot, road and boundary drawn from the approved layout — set in its real surroundings, with live availability buyers can browse plot by plot.
              </p>
              <ul className="points">
                {['3D layout with numbered plots, roads and boundaries', 'Colour-coded status: available, booked, sold, blocked', 'Plot sizes, dimensions and prices on tap', 'Nearby places and location context'].map((item) => (
                  <li key={item}><span className="diamond" aria-hidden="true">◆</span>{item}</li>
                ))}
              </ul>
            </article>
            <article className="article is-featured">
              <IconPlan />
              <p className="fine">TWIN 02</p>
              <h3 className="serif-title">Property Twin</h3>
              <p className="body">
                Every floor, every unit, every room. Buyers pick a floor, choose an apartment on the floor plate, study its dimensioned plan and step inside a 360° rendered interior.
              </p>
              <ul className="points">
                {['Interactive floor selector with unit counts and types', 'Floor plates with clickable units', 'Furnished unit plans with real dimensions', '360° HD interiors, room by room'].map((item) => (
                  <li key={item}><span className="diamond" aria-hidden="true">◆</span>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="container section stack stack-lg">
        <div className="split">
          <div className="stack stack-sm measure">
            <p className="eyebrow">Built from your documents</p>
            <h2 className="display display-lg">Faithful to the builder’s plan.</h2>
          </div>
          <p className="body measure-sm">Share what you already have. We translate it into an accurate, on-brand twin — no site visit required.</p>
        </div>
        <div className="tile-grid">
          {sources.map(([label, path]) => (
            <div key={label} className="tile">
              <svg className="icon" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d={path} />
              </svg>
              <span style={{ fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="plot-demo" className="band">
        <div className="container section stack stack-lg">
          <div className="split">
            <div className="stack stack-sm measure">
              <p className="eyebrow">Live demo · Twin 01</p>
              <h2 className="display display-lg">Explore a Plot Twin.</h2>
            </div>
            <p className="quiet">Tap a plot, or filter by status</p>
          </div>
          <PlotTwin />
        </div>
      </section>

      <section id="demo" className="band" style={{ borderTop: 0 }}>
        <div className="container section stack stack-lg">
          <div className="split">
            <div className="stack stack-sm measure">
              <p className="eyebrow">Live demo · Twin 02</p>
              <h2 className="display display-lg">Explore a Property Twin.</h2>
            </div>
            <p className="quiet">Sample project — illustrative data</p>
          </div>
          <PropertyTwin />
        </div>
      </section>

      <section className="container section stack stack-lg">
        <div className="stack stack-sm measure">
          <p className="eyebrow">How it works</p>
          <h2 className="display display-lg">From drawings to a twin, in four steps.</h2>
        </div>
        <ol className="process">
          {steps.map(([title, body], index) => (
            <li key={title}>
              <span className="process-no">0{index + 1}</span>
              <h3 style={{ fontSize: 19 }}>{title}</h3>
              <p className="body">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="cta" className="paper">
        <div className="container-narrow section center-copy">
          <p className="eyebrow">For developers, builders and agencies</p>
          <h2 className="display display-cta">
            Turn your plans into a place <em>buyers can visit.</em>
          </h2>
          <p className="lede">
            Send us your project documents and we’ll propose a Plot Twin, a Property Twin, or both.
          </p>
          <div className="cluster" style={{ justifyContent: 'center' }}>
            <Button href="mailto:business@staug.in" variant="ink">Start your digital twin</Button>
            <Button to="/staff" variant="line">Discover Staff Augmentation</Button>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  )
}
