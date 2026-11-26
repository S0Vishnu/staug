declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function measurementId() {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return ''
  return id
}

/** Loads GA4 only when VITE_GA_MEASUREMENT_ID is a real measurement ID. */
export function installAnalytics() {
  if (import.meta.env.SSR) return
  const id = measurementId()
  if (!id || window.gtag) return

  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)
}

export function trackPageView(path: string) {
  if (import.meta.env.SSR || !measurementId() || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
