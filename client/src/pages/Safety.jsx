import Navbar from '../components/layout/Navbar'
import { Helmet } from 'react-helmet-async'
export default function Safety() {
  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />
<Helmet>
  <title>Safety Guidelines — StrangerMeet</title>
  <meta name="description" content="Learn safety guidelines for using StrangerMeet, including privacy protection, scam avoidance, reporting abuse, and respectful anonymous chatting." />
</Helmet>
      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-surface-0 p-8 shadow-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">Safety</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink">Safety Guidelines</h1>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            Anonymous chat can be interesting, but it can also involve risks. These guidelines
            are written to help users protect themselves while using StrangerMeet.
          </p>

          <section className="mt-8 space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">Protect Your Identity</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                Do not share your full name, address, phone number, passwords, financial details,
                school, workplace, private accounts, or identity documents.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">Leave Uncomfortable Chats</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                If someone pressures you, threatens you, asks for sensitive information, or makes
                you uncomfortable, leave the chat immediately.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">Avoid Scams</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                Do not send money, gift cards, login codes, account access, payment details, or
                personal documents to anyone you meet in anonymous chat.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">Adults Only</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                StrangerMeet is intended for users who are 18 years of age or older.
              </p>
            </div>
          </section>
        
          <section className="mt-8 rounded-2xl bg-surface-1 p-6">
            <h2 className="font-serif text-2xl font-bold text-ink">Report Safety Issues</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              If you need to report harassment, scams, abuse, threats, or unsafe behavior,
              contact us at{' '}
              <a
                href="https://mail.google.com/mail/u/0/?fs=1&to=report@strangermeet.tech&tf=cm"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cobalt underline underline-offset-4"
              >
                report@strangermeet.tech
              </a>
              .
            </p>
          </section>

        </article>
      </main>
    </div>
  )
}
