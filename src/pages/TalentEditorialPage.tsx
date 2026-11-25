import { Link } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'
import { editorialGroups } from '../data/talent'
import '../styles/talent.css'

export function TalentEditorialPage() {
  const groups = editorialGroups()

  return (
    <>
      <PageMeta title="STAUG — Talent, editorial index" />
      <section className="container section stack stack-lg" style={{ paddingBottom: 160 }}>
        <div className="split">
          <div className="stack stack-sm measure">
            <p className="eyebrow">Our talent</p>
            <h1 className="display display-hero">
              Twenty disciplines. <em>One bench.</em>
            </h1>
            <p className="body">Every skill your roadmap calls for, organised the way your projects run.</p>
          </div>
          <div className="stack view-meta">
            <div className="view-switch" aria-label="Talent layouts">
              <Link to="/talent" className="is-active">Editorial</Link>
              <Link to="/talent/orbit">Orbit</Link>
            </div>
            <p className="quiet">Hover or focus a discipline to learn more</p>
          </div>
        </div>
        <div className="editorial">
          {groups.map((group) => (
            <div key={group.id}>
              <div className="col-head">
                <span className="col-roman">{group.roman}</span>
                <h2 className="col-title">{group.title}</h2>
                <span className="col-count">{group.count}</span>
              </div>
              {group.items.map((role) => (
                <button key={role.sym} type="button" className="item">
                  <span className="item-num">{role.num}</span>
                  <span className="item-name">{role.name}</span>
                  <span className="item-arrow" aria-hidden="true">↗</span>
                  <span className="glass">
                    {role.lines.map((line) => (
                      <span key={line} className="gl">{line}</span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
