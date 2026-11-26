import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppShell } from './App'
import { consumePrerenderHead } from './seo/head'
import { CONTENT_UPDATED, prerenderRoutes } from './seo/site'

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  )
  const head = consumePrerenderHead()
  if (!head) throw new Error(`Missing SEO head for ${url}`)
  return { html, head }
}

export { CONTENT_UPDATED, prerenderRoutes }
