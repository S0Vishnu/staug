import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const origin = 'https://staug.in'
const pages = [
  { file: 'index.html', path: '/', phrase: 'We augment what builds a business', index: true },
  { file: 'staff.html', path: '/staff', phrase: 'Build Faster.', index: true },
  { file: 'spatial.html', path: '/spatial', phrase: 'Let buyers walk through it', index: true },
  { file: 'about.html', path: '/about', phrase: 'Two specialised practices.', index: true },
  { file: '404.html', path: '/404', phrase: 'This page is not on STAUG.', index: false },
]
const routes = new Set(pages.map((page) => page.path))
const staticFiles = new Set(['/favicon.svg', '/og.png', '/robots.txt', '/sitemap.xml'])
const forbiddenSchema = new Set([
  'aggregateRating',
  'review',
  'reviewCount',
  'ratingValue',
  'price',
  'priceRange',
  'streetAddress',
])

const failures = []
const fail = (message) => failures.push(message)

function canonicalFor(pathname) {
  return pathname === '/' ? `${origin}/` : `${origin}${pathname}`
}

function meta(html, key) {
  const patterns = [
    new RegExp(`<meta[^>]*(?:name|property)="${key}"[^>]*content="([^"]*)"`, 'i'),
    new RegExp(`<meta[^>]*content="([^"]*)"[^>]*(?:name|property)="${key}"`, 'i'),
  ]
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match) return match[1]
  }
  return ''
}

function walk(node) {
  if (Array.isArray(node)) {
    node.forEach(walk)
    return
  }
  if (!node || typeof node !== 'object') return
  for (const [key, value] of Object.entries(node)) {
    if (forbiddenSchema.has(key)) fail(`structured data includes ${key}, which this site does not publish`)
    walk(value)
  }
}

function publishedFile(pathname) {
  if (!pathname.startsWith('/') || pathname.includes('\\') || pathname.includes('\0')) return false
  let decoded
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return false
  }
  if (decoded.includes('..')) return false
  const root = path.resolve(dist)
  const filePath = path.resolve(root, decoded.slice(1))
  if (filePath !== root && !filePath.startsWith(root + path.sep)) return false
  try {
    return statSync(filePath).isFile()
  } catch {
    return false
  }
}

function checkHref(href, file) {
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return
  if (href.startsWith('https://www.staug.in') || href.startsWith('http://') || href.startsWith('//')) {
    fail(`${file} links to a non-canonical URL: ${href}`)
    return
  }
  let pathname = href
  if (href.startsWith(origin)) pathname = href.slice(origin.length) || '/'
  else if (/^https?:\/\//.test(href)) return
  pathname = pathname.split('#')[0].split('?')[0] || '/'
  if (routes.has(pathname) || staticFiles.has(pathname)) return
  if (pathname.startsWith('/fonts/') || pathname.startsWith('/assets/')) return
  if (publishedFile(pathname)) return
  fail(`${file} has a broken internal link: ${href}`)
}

const titles = new Map()
const descriptions = new Map()

for (const page of pages) {
  const full = path.join(dist, page.file)
  if (!existsSync(full)) {
    fail(`missing ${page.file}`)
    continue
  }
  const html = readFileSync(full, 'utf8')
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim() ?? ''
  const description = meta(html, 'description')
  const robots = meta(html, 'robots')
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]
    ?? html.match(/<link[^>]*href="([^"]+)"[^>]*rel="canonical"/)?.[1]
    ?? ''
  const h1 = html.match(/<h1\b/g)?.length ?? 0
  if (!title) fail(`${page.file} is missing a title`)
  if (!html.includes(page.phrase)) fail(`${page.file} is missing prerendered text: ${page.phrase}`)
  if (title.length > 70) fail(`${page.file} title is ${title.length} characters`)
  if (!description) fail(`${page.file} is missing a meta description`)
  if (description.length < 70 || description.length > 170) {
    fail(`${page.file} description is ${description.length} characters`)
  }
  if (titles.has(title)) fail(`duplicate title in ${page.file} and ${titles.get(title)}`)
  else if (title) titles.set(title, page.file)
  if (descriptions.has(description)) fail(`duplicate description in ${page.file} and ${descriptions.get(description)}`)
  else if (description) descriptions.set(description, page.file)
  if (h1 !== 1) fail(`${page.file} has ${h1} h1 elements`)
  if (canonical !== canonicalFor(page.path)) fail(`${page.file} canonical is ${canonical || 'missing'}`)
  if (html.includes('fonts.googleapis.com') || html.includes('fonts.gstatic.com')) {
    fail(`${page.file} still loads Google Fonts`)
  }
  if (html.includes('https://www.staug.in')) fail(`${page.file} still references www.staug.in`)

  if (page.index) {
    if (!robots.includes('index') || robots.includes('noindex')) fail(`${page.file} is not indexable`)
  } else if (!robots.includes('noindex')) {
    fail(`${page.file} should be noindex`)
  }

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  if (blocks.length !== 1) fail(`${page.file} has ${blocks.length} JSON-LD blocks`)
  else {
    let data
    try {
      data = JSON.parse(blocks[0][1])
    } catch {
      fail(`${page.file} has invalid JSON-LD`)
    }
    if (data) {
      if (data['@context'] !== 'https://schema.org' || !Array.isArray(data['@graph']) || data['@graph'].length === 0) {
        fail(`${page.file} JSON-LD is missing @context or @graph`)
      }
      for (const node of data['@graph'] ?? []) {
        if (!node['@type']) fail(`${page.file} has a JSON-LD node without @type`)
      }
      walk(data)
    }
  }

  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt=/.test(tag)) fail(`${page.file} has an img without alt`)
  }
  for (const tag of html.match(/<svg\b[^>]*>/g) ?? []) {
    if (/role="img"/.test(tag) && !/aria-label=/.test(tag) && !/aria-labelledby=/.test(tag)) {
      fail(`${page.file} has an svg image without an accessible name`)
    }
  }
  for (const match of html.matchAll(/\shref="([^"]*)"/g)) checkHref(match[1], page.file)
}

const robotsPath = path.join(dist, 'robots.txt')
if (!existsSync(robotsPath)) fail('missing robots.txt')
else {
  const robots = readFileSync(robotsPath, 'utf8')
  if (!/User-agent:\s*\*/i.test(robots)) fail('robots.txt is missing User-agent')
  if (!/Allow:\s*\//i.test(robots)) fail('robots.txt does not allow crawling')
  if (/Disallow:\s*\/\s*$/im.test(robots)) fail('robots.txt disallows the whole site')
  if (!robots.includes('Sitemap: https://staug.in/sitemap.xml')) fail('robots.txt is missing the sitemap URL')
}

const sitemapPath = path.join(dist, 'sitemap.xml')
if (!existsSync(sitemapPath)) fail('missing sitemap.xml')
else {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  if (!sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) fail('sitemap namespace is missing')
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const expected = pages.filter((page) => page.index).map((page) => canonicalFor(page.path))
  for (const loc of expected) {
    if (!locs.includes(loc)) fail(`sitemap is missing ${loc}`)
  }
  for (const loc of locs) {
    if (!expected.includes(loc)) fail(`sitemap includes unexpected URL ${loc}`)
    if (loc.includes('www.staug.in') || loc.endsWith('/404')) fail(`sitemap URL is not canonical: ${loc}`)
  }
  if (!/<\/urlset>\s*$/.test(sitemap)) fail('sitemap is not closed')
}

if (existsSync(path.join(dist, 'assets'))) {
  for (const file of readdirSync(path.join(dist, 'assets'))) {
    if (!file.endsWith('.css') && !file.endsWith('.js')) continue
    const text = readFileSync(path.join(dist, 'assets', file), 'utf8')
    if (text.includes('fonts.googleapis.com') || text.includes('fonts.gstatic.com')) {
      fail(`${file} still references Google Fonts`)
    }
  }
}

if (!existsSync(path.join(dist, 'og.png'))) fail('missing og.png')
if (!existsSync(path.join(dist, 'fonts', 'manrope-latin.woff2'))) fail('missing self-hosted Manrope')
if (!existsSync(path.join(dist, 'fonts', 'cormorant-garamond-latin.woff2'))) fail('missing self-hosted Cormorant Garamond')

if (failures.length) {
  console.error(`SEO check failed (${failures.length})`)
  for (const message of failures) console.error(`- ${message}`)
  process.exit(1)
}

console.log(`SEO check passed (${pages.length} pages)`)
