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
        <p className="footer-links">
          <a href="mailto:business@staug.in">business@staug.in</a>
          <a href="https://www.staug.in">www.staug.in</a>
          <span>© 2026 STAUG. All rights reserved.</span>
        </p>
      </div>
    </footer>
  )
}
