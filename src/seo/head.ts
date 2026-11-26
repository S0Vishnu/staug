import { OG_IMAGE, SITE_NAME, SITE_ORIGIN, absoluteUrl, pages, type PageId } from './site'
import { buildGraph, type SeoGraph } from './jsonld'

let pendingHead = ''

export function consumePrerenderHead() {
  const head = pendingHead
  pendingHead = ''
  return head
}

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function renderHead(id: PageId) {
  const page = pages[id]
  const graph = buildGraph(id)
  const url = absoluteUrl(page.path)
  const image = `${SITE_ORIGIN}${OG_IMAGE.path}`
  const json = JSON.stringify(graph).replace(/</g, '\\u003c')
  const title = escapeAttr(page.title)
  const description = escapeAttr(page.description)
  const alt = escapeAttr(OG_IMAGE.alt)

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" data-seo="description" />`,
    `<link rel="canonical" href="${url}" data-seo="canonical" />`,
    `<meta name="robots" content="${page.robots}" data-seo="robots" />`,
    `<meta property="og:type" content="website" data-seo="og:type" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" data-seo="og:site_name" />`,
    `<meta property="og:locale" content="en" data-seo="og:locale" />`,
    `<meta property="og:url" content="${url}" data-seo="og:url" />`,
    `<meta property="og:title" content="${title}" data-seo="og:title" />`,
    `<meta property="og:description" content="${description}" data-seo="og:description" />`,
    `<meta property="og:image" content="${image}" data-seo="og:image" />`,
    `<meta property="og:image:secure_url" content="${image}" data-seo="og:image:secure_url" />`,
    `<meta property="og:image:type" content="image/png" data-seo="og:image:type" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" data-seo="og:image:width" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" data-seo="og:image:height" />`,
    `<meta property="og:image:alt" content="${alt}" data-seo="og:image:alt" />`,
    `<meta name="twitter:card" content="summary_large_image" data-seo="twitter:card" />`,
    `<meta name="twitter:title" content="${title}" data-seo="twitter:title" />`,
    `<meta name="twitter:description" content="${description}" data-seo="twitter:description" />`,
    `<meta name="twitter:image" content="${image}" data-seo="twitter:image" />`,
    `<meta name="twitter:image:alt" content="${alt}" data-seo="twitter:image:alt" />`,
    `<script type="application/ld+json" id="seo-jsonld" data-seo="jsonld">${json}</script>`,
  ].join('\n    ')
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"][data-seo]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.setAttribute('data-seo', key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function applyHead(id: PageId) {
  const page = pages[id]
  const graph: SeoGraph = buildGraph(id)
  const url = absoluteUrl(page.path)
  const image = `${SITE_ORIGIN}${OG_IMAGE.path}`

  document.title = page.title
  upsertMeta('name', 'description', page.description)
  upsertMeta('name', 'robots', page.robots)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:locale', 'en')
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:title', page.title)
  upsertMeta('property', 'og:description', page.description)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:image:secure_url', image)
  upsertMeta('property', 'og:image:type', 'image/png')
  upsertMeta('property', 'og:image:width', String(OG_IMAGE.width))
  upsertMeta('property', 'og:image:height', String(OG_IMAGE.height))
  upsertMeta('property', 'og:image:alt', OG_IMAGE.alt)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', page.title)
  upsertMeta('name', 'twitter:description', page.description)
  upsertMeta('name', 'twitter:image', image)
  upsertMeta('name', 'twitter:image:alt', OG_IMAGE.alt)

  let canonical = document.head.querySelector('link[rel="canonical"][data-seo]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    canonical.setAttribute('data-seo', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)

  let script = document.getElementById('seo-jsonld')
  if (!script) {
    script = document.createElement('script')
    script.id = 'seo-jsonld'
    script.setAttribute('type', 'application/ld+json')
    script.setAttribute('data-seo', 'jsonld')
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(graph)
}

export function capturePrerenderHead(id: PageId) {
  pendingHead = renderHead(id)
}
