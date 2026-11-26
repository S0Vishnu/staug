import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CursorFollower } from './components/CursorFollower'
import { Preloader } from './components/Preloader'
import { RevealManager } from './components/RevealManager'
import { ScrollManager } from './components/ScrollManager'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SpatialPage } from './pages/SpatialPage'
import { StaffPage } from './pages/StaffPage'
import { trackPageView } from './seo/analytics'

function AnalyticsRoute() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    trackPageView(`${pathname}${search}`)
  }, [pathname, search])

  return null
}

function AnimatedRoutes() {
  const { pathname } = useLocation()

  return (
    <div key={pathname} className="page">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/spatial" element={<SpatialPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export function AppShell() {
  return (
    <>
      <AnalyticsRoute />
      <Preloader />
      <CursorFollower />
      <ScrollManager />
      <RevealManager />
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <AnimatedRoutes />
      </main>
      <SiteFooter />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
