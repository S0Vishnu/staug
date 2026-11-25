export type TalentGroupId = 'build' | 'create' | 'data' | 'lead'
export type OrbitRing = 'inner' | 'outer'

export type Role = {
  sym: string
  name: string
  table: string
  group: TalentGroupId
  ring: OrbitRing
  orbitTag: string
  lines: [string, string, string]
}

export const groupMeta: Record<
  TalentGroupId,
  { roman: string; title: string }
> = {
  build: { roman: 'I', title: 'Build' },
  create: { roman: 'II', title: 'Design & Create' },
  data: { roman: 'III', title: 'Data & Intelligence' },
  lead: { roman: 'IV', title: 'Lead & Grow' },
}

export const editorialOrder: TalentGroupId[] = ['build', 'create', 'data', 'lead']

/** Periodic-table order used on the Staff Augmentation page. */
export const tableOrder = [
  'Fe',
  'Be',
  'Ux',
  '3d',
  'Qa',
  'Wd',
  'Mo',
  'En',
  'Dm',
  'Pj',
  'Pd',
  'Cw',
  'Ce',
  'Sm',
  'Ai',
  'Da',
  'Rd',
  'Gd',
  'An',
  'Er',
] as const

const catalog: Role[] = [
  {
    sym: 'Fe',
    name: 'Frontend Developers',
    table: 'ENGINEERING',
    group: 'build',
    ring: 'inner',
    orbitTag: 'BUILD',
    lines: [
      'React, Angular and Vue specialists',
      'Pixel-accurate, responsive, accessible UIs',
      'Performance-tuned for every device',
    ],
  },
  {
    sym: 'Be',
    name: 'Backend Developers',
    table: 'ENGINEERING',
    group: 'build',
    ring: 'inner',
    orbitTag: 'BUILD',
    lines: [
      'Node.js, Java, Python, .NET and Go',
      'Scalable APIs, microservices and databases',
      'Secure, well-tested server architecture',
    ],
  },
  {
    sym: 'Wd',
    name: 'Website Development',
    table: 'ENGINEERING',
    group: 'build',
    ring: 'inner',
    orbitTag: 'BUILD',
    lines: [
      'Corporate sites, portals and e-commerce',
      'WordPress, Shopify and headless CMS builds',
      'Fast, secure and SEO-ready',
    ],
  },
  {
    sym: 'Mo',
    name: 'Android & iOS Developers',
    table: 'ENGINEERING',
    group: 'build',
    ring: 'inner',
    orbitTag: 'BUILD',
    lines: [
      'Native Kotlin and Swift apps',
      'Cross-platform Flutter and React Native',
      'From first build to store release',
    ],
  },
  {
    sym: 'En',
    name: 'Engine Developers',
    table: 'ENGINEERING',
    group: 'build',
    ring: 'inner',
    orbitTag: 'BUILD',
    lines: [
      'Unity and Unreal Engine specialists',
      'Real-time 3D, simulations and digital twins',
      'Interactive experiences and custom tools',
    ],
  },
  {
    sym: 'Qa',
    name: 'QA / QC Engineers',
    table: 'ENGINEERING',
    group: 'build',
    ring: 'inner',
    orbitTag: 'BUILD',
    lines: [
      'Manual and automated testing',
      'Functional, regression and load testing',
      'Releases you can ship with confidence',
    ],
  },
  {
    sym: 'Ux',
    name: 'UI / UX Designers',
    table: 'DESIGN',
    group: 'create',
    ring: 'outer',
    orbitTag: 'CREATE',
    lines: [
      'User research, wireframes and prototypes',
      'Design systems built in Figma',
      'Interfaces people enjoy using',
    ],
  },
  {
    sym: '3d',
    name: '3D Modelling',
    table: 'DESIGN',
    group: 'create',
    ring: 'outer',
    orbitTag: 'CREATE',
    lines: [
      'Architectural, product and character models',
      'Texturing, lighting and photoreal rendering',
      'Optimised assets for web, AR and VR',
    ],
  },
  {
    sym: 'Gd',
    name: 'Graphic Designers',
    table: 'CREATIVE',
    group: 'create',
    ring: 'outer',
    orbitTag: 'CREATE',
    lines: [
      'Brand identity, logos and collateral',
      'Social, print and digital campaigns',
      'Visuals that stay on-brand everywhere',
    ],
  },
  {
    sym: 'An',
    name: 'Animators',
    table: 'CREATIVE',
    group: 'create',
    ring: 'outer',
    orbitTag: 'CREATE',
    lines: [
      '2D and 3D animation',
      'Explainers, motion graphics and walkthroughs',
      'Storytelling that moves',
    ],
  },
  {
    sym: 'Ce',
    name: 'Creative Editors',
    table: 'CREATIVE',
    group: 'create',
    ring: 'outer',
    orbitTag: 'CREATE',
    lines: [
      'Video and photo editing',
      'Reels, ads and corporate films',
      'Colour grading, motion and sound polish',
    ],
  },
  {
    sym: 'Cw',
    name: 'Content Writers',
    table: 'CREATIVE',
    group: 'create',
    ring: 'outer',
    orbitTag: 'CREATE',
    lines: [
      'Web copy, blogs and technical documents',
      'A consistent, clear brand voice',
      'SEO-friendly content that converts',
    ],
  },
  {
    sym: 'Ai',
    name: 'AI / ML Developers',
    table: 'DATA & AI',
    group: 'data',
    ring: 'inner',
    orbitTag: 'DATA',
    lines: [
      'Machine learning, NLP and computer vision',
      'LLM integration and AI automation',
      'Models taken from prototype to production',
    ],
  },
  {
    sym: 'Da',
    name: 'Data Analysts',
    table: 'DATA & AI',
    group: 'data',
    ring: 'inner',
    orbitTag: 'DATA',
    lines: [
      'Data cleaning, modelling and visualisation',
      'Power BI, Tableau, SQL and Python',
      'Insights that drive confident decisions',
    ],
  },
  {
    sym: 'Rd',
    name: 'R&D Consultants',
    table: 'LEADERSHIP',
    group: 'data',
    ring: 'inner',
    orbitTag: 'DATA',
    lines: [
      'Feasibility studies and technical research',
      'Proofs of concept and innovation roadmaps',
      'Emerging-technology evaluation',
    ],
  },
  {
    sym: 'Pj',
    name: 'Project Managers',
    table: 'LEADERSHIP',
    group: 'lead',
    ring: 'outer',
    orbitTag: 'LEAD',
    lines: [
      'Agile, Scrum and Waterfall delivery',
      'Scope, timeline and budget control',
      'Clear communication with every stakeholder',
    ],
  },
  {
    sym: 'Pd',
    name: 'Product Managers',
    table: 'LEADERSHIP',
    group: 'lead',
    ring: 'outer',
    orbitTag: 'LEAD',
    lines: [
      'Product vision, roadmaps and backlogs',
      'Customer discovery and market fit',
      'Turning ideas into launched products',
    ],
  },
  {
    sym: 'Sm',
    name: 'Core SMEs',
    table: 'LEADERSHIP',
    group: 'lead',
    ring: 'outer',
    orbitTag: 'LEAD',
    lines: [
      'Subject-matter experts across industries',
      'Domain guidance for complex projects',
      'Bridging business needs and technology',
    ],
  },
  {
    sym: 'Dm',
    name: 'Digital Marketers',
    table: 'GROWTH',
    group: 'lead',
    ring: 'outer',
    orbitTag: 'GROW',
    lines: [
      'SEO, SEM and social media campaigns',
      'Performance marketing with measurable ROI',
      'Analytics-led strategy and reporting',
    ],
  },
  {
    sym: 'Er',
    name: 'ERP & CRM Specialists',
    table: 'ENTERPRISE',
    group: 'lead',
    ring: 'outer',
    orbitTag: 'GROW',
    lines: [
      'SAP, Oracle, Odoo, Salesforce and Zoho',
      'Implementation, customisation and integration',
      'Streamlined business processes',
    ],
  },
]

const bySym = new Map(catalog.map((role) => [role.sym, role]))

export const roles = tableOrder.map((sym) => {
  const role = bySym.get(sym)
  if (!role) throw new Error(`Missing role ${sym}`)
  return role
})

export function padNumber(n: number) {
  return n < 10 ? `0${n}` : String(n)
}

export function editorialGroups() {
  let n = 0
  return editorialOrder.map((id) => {
    const items = catalog.filter((role) => role.group === id)
    return {
      ...groupMeta[id],
      id,
      count: `${items.length} roles`,
      items: items.map((role) => {
        n += 1
        return { ...role, num: padNumber(n) }
      }),
    }
  })
}

export function orbitRings() {
  let n = 0
  const place = (ring: OrbitRing) =>
    catalog
      .filter((role) => role.ring === ring)
      .map((role, index) => {
        n += 1
        return { ...role, num: padNumber(n), index }
      })
  const inner = place('inner')
  const outer = place('outer')
  return { inner, outer }
}
