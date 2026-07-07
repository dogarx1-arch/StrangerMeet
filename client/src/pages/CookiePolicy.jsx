import Navbar from '../components/layout/Navbar'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-surface-0 p-8 shadow-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">Cookies</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink">Cookie Policy</h1>
          <p className="mt-3 text-xs text-ink-tertiary">Last updated: June 24, 2026</p>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            This Cookie Policy explains how cookies and similar technologies may be used on
            StrangerMeet. Cookies are small files that can help websites remember settings, improve
            functionality, support security, measure usage, or support advertising.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-ink">How Cookies May Be Used</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-ink-secondary">
            <li>To keep the website functional and secure.</li>
            <li>To understand general website performance and usage.</li>
            <li>To support advertising if ads are added later.</li>
            <li>To help third-party vendors, including Google, serve and measure ads.</li>
          </ul>

          <h2 className="mt-8 font-serif text-2xl font-bold text-ink">Advertising Cookies</h2>
          <p className="mt-3 text-sm leading-7 text-ink-secondary">
            If Google AdSense or other advertising services are used, third-party vendors may use
            cookies or similar technologies to serve ads based on visits to this website or other
            websites. Users can control cookies through their browser settings and may opt out of
            personalized advertising through Google's Ads Settings.
          </p>
        </article>
      </main>
    </div>
  )
}
