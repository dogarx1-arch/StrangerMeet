import Navbar from '../components/layout/Navbar'

export default function Terms() {
  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-surface-0 p-8 shadow-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">Terms</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink">Terms of Service</h1>
          <p className="mt-3 text-xs text-ink-tertiary">Last updated: June 24, 2026</p>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            By using StrangerMeet, you agree to these Terms of Service. If you do not agree,
            please do not use the website.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-ink">1. Adults Only</h2>
          <p className="mt-3 text-sm leading-7 text-ink-secondary">
            StrangerMeet is intended only for users who are 18 years of age or older. By entering
            the website, you confirm that you meet this age requirement.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-ink">2. Anonymous Text Chat</h2>
          <p className="mt-3 text-sm leading-7 text-ink-secondary">
            StrangerMeet provides anonymous text chat between users. You are responsible for your
            own behavior, messages, decisions, and safety while using the service.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-ink">3. Prohibited Conduct</h2>
          <p className="mt-3 text-sm leading-7 text-ink-secondary">
            You must not use StrangerMeet for harassment, threats, hate speech, scams, spam,
            illegal activity, sexual exploitation, impersonation, malware, or sharing harmful,
            abusive, deceptive, or unlawful content.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-ink">4. Personal Information</h2>
          <p className="mt-3 text-sm leading-7 text-ink-secondary">
            You should not share personal or sensitive information with strangers, including your
            home address, phone number, passwords, financial information, identity documents, school,
            workplace, or private accounts.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-ink">5. Service Availability</h2>
          <p className="mt-3 text-sm leading-7 text-ink-secondary">
            We may update, limit, suspend, or discontinue parts of the service at any time for
            safety, maintenance, legal, or operational reasons.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-ink">6. Contact</h2>
          <p className="mt-3 text-sm leading-7 text-ink-secondary">
            For questions about these terms, contact{' '}
            <a href="https://mail.google.com/mail/u/0/?fs=1&to=support@strangermeet.tech&tf=cm" target="_blank" rel="noopener noreferrer" className="font-semibold text-cobalt underline underline-offset-4">
              support@strangermeet.tech
            </a>
            .
          </p>
        </article>
      </main>
    </div>
  )
}
