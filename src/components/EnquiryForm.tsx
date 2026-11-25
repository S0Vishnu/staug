import { useState, type FormEvent } from 'react'
import { Button } from './Button'

const interests = [
  'Staff Augmentation — Project-based',
  'Staff Augmentation — Dedicated resources',
  'Spatial Augmentation — Plot Twin',
  'Spatial Augmentation — Property Twin',
]

type Fields = {
  name: string
  company: string
  email: string
  interest: string
  message: string
}

const empty: Fields = {
  name: '',
  company: '',
  email: '',
  interest: interests[0],
  message: '',
}

export function EnquiryForm() {
  const [fields, setFields] = useState<Fields>(empty)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }))
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!fields.name.trim() || !fields.email.includes('@')) {
      setError('Please add your name and a work email.')
      return
    }
    setError('')
    setSent(true)
  }

  if (sent) {
    const body = [
      `Name: ${fields.name}`,
      `Company: ${fields.company || '—'}`,
      `Email: ${fields.email}`,
      `Interest: ${fields.interest}`,
      '',
      fields.message,
    ].join('\n')
    const mailto = `mailto:business@staug.in?subject=${encodeURIComponent('STAUG enquiry')}&body=${encodeURIComponent(body)}`

    return (
      <div className="confirm" role="status">
        <p className="eyebrow eyebrow-ink">Enquiry received</p>
        <h3 className="serif-title" style={{ fontSize: 36 }}>
          Thank you, {fields.name.split(' ')[0]}.
        </h3>
        <p className="body">
          We will reply with a clear proposal. If you would rather send it directly, open the email draft.
        </p>
        <div className="cluster">
          <Button href={mailto} variant="ink">
            Email this enquiry
          </Button>
          <Button
            variant="line"
            onClick={() => {
              setSent(false)
              setFields(empty)
            }}
          >
            Send another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form className="form" aria-label="Enquiry form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <div className="field-wrap">
          <label htmlFor="h-name">Full name</label>
          <input
            id="h-name"
            className="field"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => update('name', event.target.value)}
          />
        </div>
        <div className="field-wrap">
          <label htmlFor="h-company">Company</label>
          <input
            id="h-company"
            className="field"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={(event) => update('company', event.target.value)}
          />
        </div>
      </div>
      <div className="field-wrap">
        <label htmlFor="h-email">Work email</label>
        <input
          id="h-email"
          className="field"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(event) => update('email', event.target.value)}
        />
      </div>
      <div className="field-wrap">
        <label htmlFor="h-interest">I&apos;m interested in</label>
        <select
          id="h-interest"
          className="field"
          value={fields.interest}
          onChange={(event) => update('interest', event.target.value)}
        >
          {interests.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="field-wrap">
        <label htmlFor="h-msg">Project details</label>
        <textarea
          id="h-msg"
          className="field"
          rows={4}
          value={fields.message}
          onChange={(event) => update('message', event.target.value)}
        />
      </div>
      {error ? <p className="form-note">{error}</p> : null}
      <Button type="submit" variant="ink">
        Send enquiry
      </Button>
    </form>
  )
}
