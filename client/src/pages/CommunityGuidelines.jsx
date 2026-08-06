import Navbar from '../components/layout/Navbar'
import { Helmet } from 'react-helmet-async'
export default function CommunityGuidelines() {
  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />
<Helmet>
  <title>Community Guidelines — StrangerMeet</title>
  <meta name="description" content="Read StrangerMeet Community Guidelines for respectful behavior, safety rules, prohibited conduct, and reporting unsafe activity." />
</Helmet>
      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-surface-0 p-8 shadow-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">Community</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink">Community Guidelines</h1>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            StrangerMeet is anonymous, but anonymity is not permission to harm others. These
            rules explain what behavior is not allowed on the platform.
          </p>

          <section className="mt-8 space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">Be Respectful</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                Do not harass, threaten, bully, shame, or abuse other users.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">No Hate or Violence</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                Do not promote hate, violence, discrimination, extremism, criminal activity, or
                harm against any person or group.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">No Sexual Exploitation</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                Do not use StrangerMeet for coercion, grooming, blackmail, exploitation, or any
                illegal sexual content or conduct.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">No Spam, Scams, or Malware</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">
                Do not send phishing links, fake offers, malware, repeated spam, or requests for
                money.
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
