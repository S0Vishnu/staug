import { Link } from 'react-router-dom'
import type { Crumb } from '../seo/site'

export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  if (items.length < 2) return null

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const current = index === items.length - 1
          return (
            <li key={item.path}>
              {current ? <span aria-current="page">{item.name}</span> : <Link to={item.path}>{item.name}</Link>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
