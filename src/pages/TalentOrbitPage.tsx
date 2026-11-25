import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { PageMeta } from '../components/PageMeta'
import { orbitRings } from '../data/talent'
import '../styles/talent.css'

export function TalentOrbitPage() {
  const rings = orbitRings()

  return (
    <>
      <PageMeta title="STAUG — Talent, orbit" />
      <section className="stage">
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 72 }}>
          <div className="split">
            <h1 className="display display-hero measure">
              Every skill, in orbit <em style={{ color: 'var(--gold-3)' }}>around your project.</em>
            </h1>
            <div className="view-switch" aria-label="Talent layouts">
              <Link to="/talent">Editorial</Link>
              <Link to="/talent/orbit" className="is-active">Orbit</Link>
            </div>
          </div>
        </div>
        <div className="orbit-wrap">
          <div className="orbit">
            <span className="track t3" />
            <span className="track t2" />
            <span className="track t1" />
            <span className="pulse" />
            <span className="pulse d2" />
            <div className="core">
              <Logo height={28} />
              <small>TALENT</small>
            </div>
            <Ring prefix="o" className="ring outer" nodes={rings.outer} />
            <Ring prefix="i" className="ring inner" nodes={rings.inner} />
          </div>
        </div>
      </section>
    </>
  )
}

function Ring({
  prefix,
  className,
  nodes,
}: {
  prefix: 'i' | 'o'
  className: string
  nodes: ReturnType<typeof orbitRings>['inner']
}) {
  return (
    <div className={className}>
      <div className="spin">
        {nodes.map((role) => (
          <div key={role.sym} className={`node ${prefix}${role.index}`}>
            <div className="counter">
              <div className="chip-node" tabIndex={0}>{role.name}</div>
              <div className="hud">
                <div className="hud-top">
                  <span>// NODE {role.num}</span>
                  <span>{role.orbitTag}</span>
                </div>
                <p className="hud-name">{role.name}</p>
                {role.lines.map((line) => (
                  <p key={line} className="hl">{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
