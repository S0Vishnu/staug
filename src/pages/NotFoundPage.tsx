import { Breadcrumbs } from '../components/Breadcrumbs'
import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'
import { pages } from '../seo/site'

export function NotFoundPage() {
  return (
    <>
      <PageMeta page="notFound" />
      <section className="container hero stack stack-lg">
        <Breadcrumbs items={pages.notFound.crumbs} />
        <p className="eyebrow">404</p>
        <h1 className="display display-hero">This page is not on STAUG.</h1>
        <p className="lede measure">
          The address may be mistyped or out of date. These are the public pages: staff augmentation, spatial digital twins, and about STAUG.
        </p>
        <div className="cluster">
          <Button to="/">Back to home</Button>
          <Button to="/staff" variant="ghost">Staff Augmentation</Button>
          <Button to="/spatial" variant="ghost">Spatial Augmentation</Button>
          <Button to="/about" variant="ghost">About</Button>
        </div>
      </section>
    </>
  )
}
