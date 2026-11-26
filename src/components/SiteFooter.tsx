import { Link } from 'react-router-dom'
import { SITE_EMAIL, SITE_ORIGIN } from '../seo/site'
import { Logo } from './Logo'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          <Logo height={22} />
          <span className="divider" aria-hidden="true" />
          <span>Staff Augmentation · Spatial Augmentation</span>
        </p>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/staff">Staff Augmentation</Link>
          <Link to="/spatial">Spatial Augmentation</Link>
          <Link to="/about">About</Link>
          <Link to={{ hash: 'contact' }}>Contact</Link>
        </nav>
        <p className="footer-links">
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
          <a href={SITE_ORIGIN}>staug.in</a>
          <span>© 2026 STAUG. All rights reserved.</span>
        </p>
      </div>
    </footer>
  )
}
