import { EnquiryForm } from './EnquiryForm'

export function ContactSection() {
  return (
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
  )
}
