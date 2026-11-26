import { absoluteUrl, homeFaqs, OG_IMAGE, pages, SITE_EMAIL, SITE_NAME, SITE_ORIGIN, type PageId } from './site'

const organizationId = `${SITE_ORIGIN}/#organization`
const websiteId = `${SITE_ORIGIN}/#website`

const organization = {
  '@type': 'Organization',
  '@id': organizationId,
  name: SITE_NAME,
  url: SITE_ORIGIN,
  email: SITE_EMAIL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_ORIGIN}/favicon.svg`,
  },
  description:
    'STAUG augments the people and spaces that build a business — pre-vetted technology talent, and 3D digital twins of real estate.',
}

const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: SITE_NAME,
  url: SITE_ORIGIN,
  publisher: { '@id': organizationId },
  inLanguage: 'en',
}

function webPage(id: PageId, type = 'WebPage') {
  const page = pages[id]
  return {
    '@type': type,
    '@id': `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    inLanguage: 'en',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}${OG_IMAGE.path}`,
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
    },
  }
}

function breadcrumbs(id: PageId) {
  const crumbs = pages[id].crumbs
  if (crumbs.length < 2) return null
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(pages[id].path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

const staffService = {
  '@type': 'Service',
  '@id': `${SITE_ORIGIN}/staff#service`,
  name: 'Staff Augmentation',
  serviceType: 'IT staff augmentation',
  url: `${SITE_ORIGIN}/staff`,
  provider: { '@id': organizationId },
  description: pages.staff.description,
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Startups, SMEs, enterprises and technology companies',
  },
}

const spatialService = {
  '@type': 'Service',
  '@id': `${SITE_ORIGIN}/spatial#service`,
  name: 'Spatial Augmentation',
  serviceType: 'Real estate digital twin',
  url: `${SITE_ORIGIN}/spatial`,
  provider: { '@id': organizationId },
  description: pages.spatial.description,
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Real estate developers, builders and agencies',
  },
}

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_ORIGIN}/#faq`,
  url: `${SITE_ORIGIN}/`,
  mainEntity: homeFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export function buildGraph(id: PageId) {
  const graph: Record<string, unknown>[] = [organization, website]

  graph.push(webPage(id, id === 'about' ? 'AboutPage' : 'WebPage'))

  const crumbs = breadcrumbs(id)
  if (crumbs && id !== 'notFound') graph.push(crumbs)
  if (id === 'home') graph.push(faqPage)
  if (id === 'staff') graph.push(staffService)
  if (id === 'spatial') graph.push(spatialService)

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export type SeoGraph = ReturnType<typeof buildGraph>
