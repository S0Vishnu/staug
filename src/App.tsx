import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { CursorFollower } from './components/CursorFollower'
import { Preloader } from './components/Preloader'
import { RevealManager } from './components/RevealManager'
import { ScrollManager } from './components/ScrollManager'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { HomePage } from './pages/HomePage'
import { SpatialPage } from './pages/SpatialPage'
import { StaffPage } from './pages/StaffPage'
import { TalentEditorialPage } from './pages/TalentEditorialPage'
import { TalentOrbitPage } from './pages/TalentOrbitPage'

function AnimatedRoutes() {
  const { pathname } = useLocation()

  return (
    <div key={pathname} className="page">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/spatial" element={<SpatialPage />} />
        <Route path="/talent" element={<TalentEditorialPage />} />
        <Route path="/talent/orbit" element={<TalentOrbitPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
