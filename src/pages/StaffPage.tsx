import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'
import { padNumber, roles } from '../data/talent'
import { HeroStaff } from '../illustrations/scenes'
import '../styles/talent.css'

const gains: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: 'Access specialised talent',
    body: 'Qualified professionals with the technical expertise your projects and business objectives require.',
    icon: (
      <svg className="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="14" cy="14" r="9" />
        <path d="M21 21l8 8M10 14h8M14 10v8" />
      </svg>
    ),
  },
  {
    title: 'Scale on demand',
    body: 'Increase or reduce team capacity as project requirements and business priorities change.',
    icon: (
      <svg className="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 26h24M8 26V16M14 26V10M20 26V14M26 26V5" />
      </svg>
    ),
  },
  {
    title: 'Accelerate project delivery',
    body: 'Cut recruitment and onboarding delays by adding experienced professionals to your existing teams.',
    icon: (
      <svg className="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M3 22h8l4-14 4 18 3-8h7" />
      </svg>
    ),
  },
  {
    title: 'Optimise operational costs',
    body: 'Minimise the overheads of permanent hiring, benefits, infrastructure and long-term commitments.',
    icon: (
      <svg className="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="16" cy="16" r="12" />
        <path d="M20 11.5c-1-1.3-2.4-2-4-2-2.2 0-4 1.3-4 3.2 0 4.3 8.2 2.4 8.2 6.6 0 1.9-1.9 3.2-4.2 3.2-1.8 0-3.3-.8-4.2-2.1M16 6.5v3M16 22.5v3" />
      </svg>
    ),
  },
  {
    title: 'Maintain business continuity',
    body: 'Keep projects on track with additional technical resources and consistent development support.',
    icon: (
      <svg className="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M16 3 27 7v8c0 7-5 12-11 14C10 27 5 22 5 15V7z" />
        <path d="M11 16l4 4 7-8" />
      </svg>
    ),
  },
  {
    title: 'Enable global collaboration',
    body: 'Work with professionals across locations and time zones to support flexible development schedules.',
    icon: (
      <svg className="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="16" cy="16" r="12" />
        <path d="M4 16h24M16 4c4 3.5 5.5 7.5 5.5 12S20 24.5 16 28C12 24.5 10.5 20.5 10.5 16S12 7.5 16 4" />
      </svg>
    ),
  },
]

const reasons = [
  ['Faster access to skilled professionals', 'Skip lengthy recruitment. Qualified professionals contribute with minimal onboarding time.'],
  ['Flexibility without long-term commitments', 'Engage by project duration, workload and requirements — free of traditional employment constraints.'],
  ['Reduced recruitment and operational costs', 'Save on talent acquisition, recruitment infrastructure, benefits and administrative overheads.'],
  ['Focus on core business activities', 'Your internal teams own strategy while augmented professionals support execution and delivery.'],
  ['Access to a wider talent pool', 'Go beyond geographical limits to specialised skills across multiple technology domains.'],
  ['Greater control and team integration', 'Unlike outsourcing, you keep direct control of project management, tasks, communication and deliverables.'],
]

const reasonsToChoose = [
  ['Quality-assured talent', 'Professionals evaluated for relevant technical skills and project suitability.'],
  ['Seamless integration', 'Resources that adapt to your tools, processes, communication channels and methodologies.'],
  ['Flexible engagement models', 'Staffing aligned with your project scope, duration and resource requirements.'],
  ['Technology-driven teams', 'Software development, QA, UI/UX, cloud, DevOps and other IT specialisations.'],
  ['Collaborative delivery', 'Professionals who work as an extension of your internal team and timelines.'],
  ['Scalable workforce solutions', 'Expand technical capability as your business and project requirements evolve.'],
]

const workforce = ['Employees', 'Contractors', 'Temporary workers']

export function StaffPage() {
  return (
    <>
      <PageMeta title="STAUG — Staff Augmentation" />
      <section className="container hero grid-2">
        <div className="stack stack-lg">
          <p className="kicker">
            <span className="mark">STAUG</span> · <span className="mark">ST</span>aff <span className="mark">AUG</span>mentation
          </p>
          <h1 className="display display-xl">
            Build Faster.
            <br />
            <em>Scale Smarter.</em>
          </h1>
          <div className="stack" style={{ gap: 10, borderTop: '1px solid var(--line-2)', paddingTop: 22 }}>
            <p className="lede" style={{ fontSize: 18, color: 'var(--ivory-2)' }}>
              Struggling to keep up with the ever-changing demands of your business?
            </p>
            <p className="lede" style={{ fontSize: 18, color: 'var(--ivory-2)' }}>
              Finding it difficult to find the right talent for your specific needs?
            </p>
          </div>
          <p className="body measure-sm">
            Get the specialised skills and expertise you need, when you need them — without long-term commitment.
          </p>
          <div className="cluster">
            <Button to="/staff#cta">Build your team</Button>
            <Button to="/staff#models" variant="ghost">See engagement models</Button>
          </div>
        </div>
        <HeroStaff />
      </section>

      <section className="band">
        <div className="container section-sm stack stack-lg">
          <h2 className="display display-md measure">
            Flexibility to scale your workforce up or down — with pre-screened, qualified candidates that save you time and effort.
          </h2>
          <div className="stat-row">
            {workforce.map((label, index) => (
              <div key={label} className="stat">
                <span className="index">{padNumber(index + 1)}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section grid-2 grid-2-start">
        <div className="stack stack-sm">
          <p className="eyebrow">About the practice</p>
          <h2 className="display display-lg">Talent that integrates. Capability that scales.</h2>
        </div>
        <div className="prose">
          <p className="body">STAUG empowers businesses to scale their technology capabilities by providing skilled, pre-vetted IT professionals who seamlessly integrate into existing teams and workflows.</p>
          <p className="body">We help organisations bridge critical skill gaps, strengthen technical capabilities and accelerate project delivery — without the complexities and long timelines of traditional recruitment.</p>
          <p className="body">Our flexible model gives you the right talent at the right time, scaling resources to project demands while you keep complete control over your teams, workflows and deliverables. With professionals across technology domains and time zones, STAUG enables seamless collaboration and continuous development.</p>
        </div>
      </section>

      <section id="talent" className="container section stack stack-lg" style={{ paddingTop: 0 }}>
        <div className="split">
          <div className="stack stack-sm measure">
            <p className="eyebrow">Our talent</p>
            <h2 className="display display-lg">The STAUG Table of Talent.</h2>
            <p className="body">Twenty elements. Combine them in any formula your project needs.</p>
          </div>
          <p className="quiet">
            Hover or focus an element to learn more · <Link to="/talent">Open the editorial index</Link>
          </p>
        </div>
        <div className="talent-table">
          {roles.map((role, index) => (
            <button key={role.sym} type="button" className="res">
              <span className="res-ghost" aria-hidden="true">{role.sym}</span>
              <span className="res-face">
                <span className="res-meta">
                  <span>{padNumber(index + 1)}</span>
                  <span>{role.table}</span>
                </span>
                <span className="res-sym" aria-hidden="true">{role.sym}</span>
                <span className="res-name">{role.name}</span>
              </span>
              <span className="res-info">
                <span className="res-kicker">{role.name}</span>
                {role.lines.map((line) => (
                  <span key={line} className="res-line">{line}</span>
                ))}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="container section stack stack-lg" style={{ paddingTop: 0 }}>
        <div className="stack stack-sm">
          <p className="eyebrow">What you gain with STAUG</p>
          <h2 className="display display-md">Our flexible staffing model enables you to</h2>
        </div>
        <div className="tile-grid">
          {gains.map((item) => (
            <article key={item.title} className="tile">
              {item.icon}
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="container section grid-2 grid-2-start">
          <div className="stack stack-md">
            <p className="eyebrow">The smarter choice</p>
            <h2 className="display display-lg">Why is staff augmentation the smarter choice?</h2>
            <p className="body">
              Traditional recruitment can be slow, expensive and restrictive — especially when you need specialised skills for immediate requirements. Staff augmentation lets you bring in the expertise you need without committing to permanent workforce expansion.
            </p>
          </div>
          <ol className="steps">
            {reasons.map(([title, body], index) => (
              <li key={title} className="step-row">
                <span className="step-no">{padNumber(index + 1)}</span>
                <div>
                  <h3 style={{ fontSize: 18, marginBottom: 6 }}>{title}</h3>
                  <p className="body" style={{ fontSize: 16 }}>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="paper">
        <div className="container section stack stack-lg">
          <div className="split">
            <div className="stack stack-sm measure">
              <p className="eyebrow">Why choose STAUG</p>
              <h2 className="display display-lg">The right talent makes a measurable difference.</h2>
            </div>
            <p className="body measure-sm">
              We understand your technical requirements, identify suitable professionals and enable a smooth integration into your existing work environment.
            </p>
          </div>
          <div className="paper-grid">
            {reasonsToChoose.map(([title, body]) => (
              <article key={title} className="paper-card">
                <span className="rule" />
                <h3 style={{ fontSize: 19 }}>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="models" className="container section stack stack-lg">
        <div className="stack stack-sm measure">
          <p className="eyebrow">Flexible engagement models</p>
          <h2 className="display display-lg">Choose how you work with us.</h2>
        </div>
        <div className="grid-cards">
          <article className="panel">
            <h3 className="serif-title" style={{ fontSize: 38 }}>Project-Based Engagement</h3>
            <p className="mark" style={{ margin: 0 }}>Outcome-driven. Deliverable-focused.</p>
            <p className="body">
              Engage STAUG to execute specific tasks, assignments or deliverables within an agreed scope and timeline. We align the right expertise to your requirements and complete defined deliverables efficiently, to agreed quality standards and milestones.
            </p>
            <ul className="points cols">
              {['Clearly defined scope and deliverables', 'Milestone-based execution and tracking', 'Predictable project costs', 'Access to specialised expertise', 'Short- or long-term assignments', 'Focus on measurable outcomes'].map((item) => (
                <li key={item}><span className="diamond" aria-hidden="true">◆</span>{item}</li>
              ))}
            </ul>
            <div className="best">
              <p className="fine">BEST SUITED FOR</p>
              <p className="body" style={{ marginTop: 6 }}>Organisations with clearly defined requirements, specific project scopes or outcomes to deliver within a stipulated timeline.</p>
            </div>
          </article>
          <article className="panel is-featured">
            <h3 className="serif-title" style={{ fontSize: 38 }}>Dedicated Resource Engagement</h3>
            <p className="mark" style={{ margin: 0 }}>Your team. Our talent. Your direction.</p>
            <p className="body">
              Skilled IT professionals who work as an extension of your team for a defined period. You manage their daily activities, assign tasks and monitor progress — whether you need one specialist or several.
            </p>
            <ul className="points cols">
              {['Dedicated professionals for an agreed duration', 'Direct control over tasks and priorities', 'Seamless integration with existing teams', 'Flexible engagement periods', 'Reduced recruitment overheads', 'Easy workforce scalability'].map((item) => (
                <li key={item}><span className="diamond" aria-hidden="true">◆</span>{item}</li>
              ))}
            </ul>
            <div className="best">
              <p className="fine">BEST SUITED FOR</p>
              <p className="body" style={{ marginTop: 6 }}>Startups, SMEs and enterprises needing extra technical capacity, specialised skills or consistent development support over a specific period.</p>
            </div>
          </article>
        </div>
      </section>

      <section id="cta" className="band">
        <div className="container-narrow section center-copy">
          <h2 className="display display-cta">
            Build your team. <em>Your way.</em>
          </h2>
          <p className="lede">
            Whether you&apos;re a startup accelerating product development, an enterprise addressing skill shortages, or a technology company managing multiple projects — STAUG gives you the right professionals without the limits of conventional hiring.
          </p>
          <div className="cluster" style={{ justifyContent: 'center' }}>
            <Button href="mailto:business@staug.in">Talk to our team</Button>
            <Button to="/spatial" variant="ghost">Discover Spatial Augmentation</Button>
          </div>
        </div>
      </section>
    </>
  )
}
