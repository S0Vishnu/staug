import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Connect, type Plugin } from 'vite'

function cleanUrls(): Plugin {
  const dist = path.join(process.cwd(), 'dist')
  const rewrite: Connect.NextHandleFunction = (req, res, next) => {
    if (!req.url) return next()
    const url = new URL(req.url, 'http://localhost')
    const pathname = decodeURIComponent(url.pathname)

    if (pathname.length > 1 && pathname.endsWith('/')) {
      res.statusCode = 301
      res.setHeader('Location', pathname.slice(0, -1) + url.search)
      res.end()
      return
    }

    if (pathname !== '/' && !path.posix.extname(pathname)) {
      const htmlName = `${pathname.slice(1)}.html`
      const file = path.join(dist, htmlName)
      if (fs.existsSync(file)) {
        req.url = `/${htmlName}${url.search}`
      } else if (!pathname.startsWith('/assets') && fs.existsSync(path.join(dist, '404.html'))) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(fs.readFileSync(path.join(dist, '404.html')))
        return
      }
    }

    next()
  }

  return {
    name: 'clean-urls',
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  plugins: [react(), cleanUrls()],
})
