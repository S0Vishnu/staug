import { useEffect } from 'react'

export function PageMeta({ title }: { title: string }) {
  useEffect(() => {
    document.title = title
  }, [title])
  return null
}
