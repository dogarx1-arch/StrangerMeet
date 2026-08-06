import Navbar from '../components/layout/Navbar'
import { Helmet } from 'react-helmet-async'
export default function AdvertisingDisclosure() {
  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />
<Helmet>
  <title>Advertising Disclosure — StrangerMeet</title>
  <meta name="description" content="Read StrangerMeet Advertising Disclosure to understand where ads may appear, how advertising supports the platform, and how third-party ads may use cookies." />
</Helmet>
      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-surface-0 p-8 shadow-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">Advertising</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink">Advertising Disclosure</h1>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            StrangerMeet may display advertising on informational areas of the website, such as
            the homepage, blog pages, and policy pages. Advertising helps support hosting,
            maintenance, and future safety improvements.
          </p>

          <p className="mt-4 text-sm leading-7 text-ink-secondary">
            We do not plan to place ads inside private chat screens, direct chat areas, or active
            private communication flows. This is important because private communication should
            remain focused on the conversation and user safety.
          </p>

          <p className="mt-4 text-sm leading-7 text-ink-secondary">
            Ads may be served by third-party advertising partners. These partners may use cookies
            or similar technologies according to their own policies and applicable advertising
            standards.
          </p>
        </article>
      </main>
    </div>
  )
}
