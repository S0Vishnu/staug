import { useEffect } from 'react'
import { applyHead, capturePrerenderHead } from '../seo/head'
import type { PageId } from '../seo/site'

export function PageMeta({ page }: { page: PageId }) {
  if (import.meta.env.SSR) capturePrerenderHead(page)

  useEffect(() => {
    applyHead(page)
  }, [page])

  return null
}
