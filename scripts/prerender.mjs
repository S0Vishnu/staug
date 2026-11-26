import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

process.env.NODE_ENV = 'production'

const { createServer } = await import('vite')

const dist = path.resolve('dist')
const template = readFileSync(path.join(dist, 'index.html'), 'utf8')

if (!template.includes('<!--seo-head-->') || !template.includes('<!--/seo-head-->')) {
  throw new Error('dist/index.html is missing SEO head markers')
}
if (!/<div id="root">\s*<\/div>/.test(template)) {
  throw new Error('dist/index.html is missing an empty #root')
}

function verificationToken(name) {
  const value = process.env[name]
  if (!value) return ''
  if (!/^[A-Za-z0-9_-]{8,120}$/.test(value)) {
    throw new Error(`${name} is set but is not a safe verification token`)
  }
  return value
}

function verificationTags() {
  const google = verificationToken('GOOGLE_SITE_VERIFICATION') || verificationToken('VITE_GSC_VERIFICATION')
  const bing = verificationToken('BING_SITE_VERIFICATION')
  const tags = []
  if (google) tags.push(`<meta name="google-site-verification" content="${google}" />`)
  if (bing) tags.push(`<meta name="msvalidate.01" content="${bing}" />`)
  return tags.length ? `${tags.join('\n    ')}\n    ` : ''
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const loaded = await vite.ssrLoadModule('/src/entry-server.tsx')
  const { render, prerenderRoutes, CONTENT_UPDATED } = loaded
  const extra = verificationTags()
  const locs = []

  for (const route of prerenderRoutes) {
    const { html, head } = render(route.path)
    if (!html || !head) throw new Error(`Empty prerender result for ${route.path}`)
    const page = template
      .replace(/<!--seo-head-->[\s\S]*?<!--\/seo-head-->/, () => `<!--seo-head-->\n    ${extra}${head}\n    <!--/seo-head-->`)
      .replace(/<div id="root">\s*<\/div>/, () => `<div id="root">${html}</div>`)

    if (page.includes('<div id="root"></div>')) throw new Error(`Root was not filled for ${route.path}`)
    if (!page.includes('rel="canonical"')) throw new Error(`Canonical missing for ${route.path}`)
    writeFileSync(path.join(dist, route.file), page)
    console.log(`prerendered ${route.file}`)
    if (route.index) locs.push(route.path === '/' ? 'https://staug.in/' : `https://staug.in${route.path}`)
  }

  const body = locs
    .map((loc) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${CONTENT_UPDATED}</lastmod>\n  </url>`)
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
  console.log(`wrote sitemap.xml (${locs.length} urls)`)
} finally {
  await vite.close()
}
