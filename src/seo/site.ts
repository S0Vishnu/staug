export const SITE_ORIGIN = 'https://staug.in'
export const SITE_NAME = 'STAUG'
export const SITE_EMAIL = 'business@staug.in'

/** Update when the public copy of a page changes. Used as sitemap lastmod. */
export const CONTENT_UPDATED = '2026-11-26'

export const OG_IMAGE = {
  path: '/og.png',
  width: 1200,
  height: 630,
  alt: 'STAUG — staff augmentation and real estate digital twins',
} as const

export type PageId = 'home' | 'staff' | 'spatial' | 'about' | 'notFound'

export type Crumb = { name: string; path: string }

export type PageSeo = {
  id: PageId
  path: string
  file: string
  title: string
  description: string
  robots: string
  index: boolean
  crumbs: readonly Crumb[]
}

const indexable = 'index, follow, max-image-preview:large'

export const pages = {
  home: {
    id: 'home',
    path: '/',
    file: 'index.html',
    title: 'STAUG — IT Staff Augmentation & Real Estate Digital Twins',
    description:
      'STAUG places pre-vetted IT professionals into your team and builds 3D digital twins of real estate from brochures, CAD layouts and floor plans.',
    robots: indexable,
    index: true,
    crumbs: [{ name: 'Home', path: '/' }],
  },
  staff: {
    id: 'staff',
    path: '/staff',
    file: 'staff.html',
    title: 'IT Staff Augmentation Services | STAUG',
    description:
      'Scale your technology team with pre-vetted IT professionals. Project-based or dedicated staff augmentation across engineering, design, data, AI and enterprise systems.',
    robots: indexable,
    index: true,
    crumbs: [
      { name: 'Home', path: '/' },
      { name: 'Staff Augmentation', path: '/staff' },
    ],
  },
  spatial: {
    id: 'spatial',
    path: '/spatial',
    file: 'spatial.html',
    title: '3D Digital Twins for Real Estate | STAUG',
    description:
      'Plot Twins and Property Twins for developers and builders. Buyers explore plotted layouts and 360° apartment interiors built from your CAD, brochures and floor plans.',
    robots: indexable,
    index: true,
    crumbs: [
      { name: 'Home', path: '/' },
      { name: 'Spatial Augmentation', path: '/spatial' },
    ],
  },
  about: {
    id: 'about',
    path: '/about',
    file: 'about.html',
    title: 'About STAUG | Staff & Spatial Augmentation',
    description:
      'STAUG is two practices: IT staff augmentation for technology teams, and spatial digital twins that let real estate buyers walk through a project before it is built.',
    robots: indexable,
    index: true,
    crumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
  notFound: {
    id: 'notFound',
    path: '/404',
    file: '404.html',
    title: 'Page not found | STAUG',
    description: 'This page does not exist on STAUG. Visit staff augmentation, spatial digital twins, or the homepage.',
    robots: 'noindex, follow',
    index: false,
    crumbs: [
      { name: 'Home', path: '/' },
      { name: 'Page not found', path: '/404' },
    ],
  },
} as const satisfies Record<PageId, PageSeo>

export const prerenderRoutes = [pages.home, pages.staff, pages.spatial, pages.about, pages.notFound]

export type Faq = {
  question: string
  answer: string
  to: string
  link: string
}

export const homeFaqs: Faq[] = [
  {
    question: 'What does STAUG do?',
    answer:
      'STAUG augments the people and spaces that build a business. Staff augmentation places pre-vetted technology professionals into your teams. Spatial augmentation turns brochures, CAD layouts and floor plans into 3D digital twins buyers can walk through.',
    to: '/about',
    link: 'About the two practices',
  },
  {
    question: 'How does staff augmentation work?',
    answer:
      'There are two engagement models. Project-based work covers an agreed scope, timeline and deliverables. Dedicated resource engagements add professionals to your team for a defined period, under your direction. Workforce types include employees, contractors and temporary workers.',
    to: '/staff',
    link: 'See staff augmentation',
  },
  {
    question: 'What is a Plot Twin?',
    answer:
      'A Plot Twin is a 3D digital twin of a plotted land layout. Plots, roads and boundaries come from the approved layout, with live availability so buyers can browse plot by plot.',
    to: '/spatial#plot-demo',
    link: 'Explore a Plot Twin',
  },
  {
    question: 'What is a Property Twin?',
    answer:
      'A Property Twin is a digital twin of an apartment project. Buyers pick a floor, choose a unit, study its plan and step inside a 360° rendered interior built from the builder’s specifications.',
    to: '/spatial#demo',
    link: 'Explore a Property Twin',
  },
  {
    question: 'How do I contact STAUG?',
    answer:
      'Email business@staug.in or send an enquiry from any page. STAUG replies with a proposal for staff augmentation, a digital twin, or both.',
    to: '/#contact',
    link: 'Send an enquiry',
  },
]

export function absoluteUrl(path: string) {
  if (path === '/') return `${SITE_ORIGIN}/`
  const [pathname, hash] = path.split('#')
  const base = `${SITE_ORIGIN}${pathname}`
  return hash ? `${base}#${hash}` : base
}
