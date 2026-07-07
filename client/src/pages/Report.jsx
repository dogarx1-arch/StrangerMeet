import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

export default function Report() {
  const location = useLocation()
  const reportLink = 'https://mail.google.com/mail/u/0/?fs=1&to=report@strangermeet.tech&tf=cm'

  const reportedAnonId = location.state?.reportedAnonId
  const sessionId = location.state?.sessionId

  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-surface-0 p-8 shadow-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">
            Report Submitted
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold text-ink">
            Report received
          </h1>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            Thank you. Your report has been submitted and the chat session has been ended.
            The other user only receives a normal chat-ended message.
          </p>

          <div className="mt-6 rounded-2xl bg-surface-1 p-5">
            <h2 className="font-serif text-2xl font-bold text-ink">
              What happens next?
            </h2>

            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              We review safety reports to help reduce harassment, abuse, scams, and unsafe behavior.
              Please do not send passwords, identity documents, payment details, or unnecessary private
              information.
            </p>

            {(reportedAnonId || sessionId) && (
              <div className="mt-4 rounded-2xl bg-surface-0 p-4 text-sm text-ink-secondary">
                {reportedAnonId && (
                  <p>
                    <span className="font-semibold text-ink">Reported user:</span> {reportedAnonId}
                  </p>
                )}

                {sessionId && (
                  <p className="mt-2 break-all">
                    <span className="font-semibold text-ink">Session:</span> {sessionId}
                  </p>
                )}
              </div>
            )}
          </div>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            If you need to add more details, contact us at{' '}
            <a
              href={reportLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cobalt underline underline-offset-4"
            >
              report@strangermeet.tech
            </a>
            .
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/matching"
              className="rounded-full bg-cobalt px-5 py-3 text-center font-sans text-sm font-semibold text-white transition hover:bg-cobalt-strong"
            >
              Find New Chat
            </Link>

            <Link
              to="/lobby"
              className="rounded-full border border-surface-2 px-5 py-3 text-center font-sans text-sm font-semibold text-ink-secondary transition hover:border-cobalt hover:text-cobalt"
            >
              Back to Lobby
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}
