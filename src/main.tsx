import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import { installAnalytics } from './seo/analytics'
import './styles/fonts.css'
import './styles/motion.css'
import './styles/system.css'

const container = document.getElementById('root')
if (!container) throw new Error('Missing #root')

installAnalytics()

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
