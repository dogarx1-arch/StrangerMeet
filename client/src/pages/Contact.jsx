import Navbar from '../components/layout/Navbar'

export default function Contact() {
  const contactLink = 'https://mail.google.com/mail/u/0/?fs=1&to=contact@strangermeet.tech&tf=cm'
  const supportLink = 'https://mail.google.com/mail/u/0/?fs=1&to=support@strangermeet.tech&tf=cm'
  const privacyLink = 'https://mail.google.com/mail/u/0/?fs=1&to=privacy@strangermeet.tech&tf=cm'
  const reportLink = 'https://mail.google.com/mail/u/0/?fs=1&to=report@strangermeet.tech&tf=cm'

  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-surface-0 p-8 shadow-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">Contact</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink">Contact Us</h1>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            You can contact StrangerMeet for general questions, support requests, privacy
            concerns, safety reports, or website-related issues.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <section className="rounded-2xl bg-surface-1 p-6">
              <h2 className="font-serif text-2xl font-bold text-ink">General Contact</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                For general website questions and basic communication.
              </p>
              <a href={contactLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-cobalt underline underline-offset-4">
                contact@strangermeet.tech
              </a>
            </section>

            <section className="rounded-2xl bg-surface-1 p-6">
              <h2 className="font-serif text-2xl font-bold text-ink">Support</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                For user support, technical issues, or help using the website.
              </p>
              <a href={supportLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-cobalt underline underline-offset-4">
                support@strangermeet.tech
              </a>
            </section>

            <section className="rounded-2xl bg-surface-1 p-6">
              <h2 className="font-serif text-2xl font-bold text-ink">Privacy Questions</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                For privacy-policy questions or data-related concerns.
              </p>
              <a href={privacyLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-cobalt underline underline-offset-4">
                privacy@strangermeet.tech
              </a>
            </section>

            <section className="rounded-2xl bg-surface-1 p-6">
              <h2 className="font-serif text-2xl font-bold text-ink">Reports & Safety</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                For abuse reports, unsafe behavior, harassment, scams, or safety concerns.
              </p>
              <a href={reportLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-cobalt underline underline-offset-4">
                report@strangermeet.tech
              </a>
            </section>
          </div>

          <p className="mt-8 text-sm leading-7 text-ink-secondary">
            Please do not send passwords, payment information, government identity numbers,
            or other highly sensitive personal details through email.
          </p>
        </article>
      </main>
    </div>
  )
}
