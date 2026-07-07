import Navbar from '../components/layout/Navbar'

export default function PrivacyPolicy() {
  const privacyLink = 'https://mail.google.com/mail/u/0/?fs=1&to=privacy@strangermeet.tech&tf=cm'
  const reportLink = 'https://mail.google.com/mail/u/0/?fs=1&to=report@strangermeet.tech&tf=cm'
  const contactLink = 'https://mail.google.com/mail/u/0/?fs=1&to=contact@strangermeet.tech&tf=cm'

  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-surface-0 p-8 shadow-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">Privacy Policy</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink">Privacy Policy</h1>

          <p className="mt-4 text-sm leading-7 text-ink-secondary">
            Last updated: June 2026
          </p>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            StrangerMeet is an adults-only anonymous text chat platform. This Privacy Policy explains
            what information may be processed when you visit the website, use the chat service, contact
            us, or interact with safety and support features. We try to keep the service simple and
            privacy-conscious, but anonymous chat still requires technical processing to keep the website
            running, prevent abuse, and maintain security.
          </p>

          <section className="mt-8 rounded-2xl border border-cobalt/20 bg-cobalt/5 p-6">
            <h2 className="font-serif text-2xl font-bold text-ink">Google Advertising and Cookies Disclosure</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              StrangerMeet may use Google AdSense or other third-party advertising services on public
              informational pages such as the homepage, blog, safety pages, and policy pages. Third-party
              vendors, including Google, may use cookies to serve ads based on a user's prior visits to
              this website or other websites. Google's use of advertising cookies enables it and its
              partners to serve ads to users based on visits to StrangerMeet and/or other sites on the
              Internet.
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              Users may opt out of personalized advertising by visiting Google Ads Settings. Users may
              also learn more about advertising choices through aboutads.info and youronlinechoices.eu.
              You can also read Google's information about how Google uses data from sites and apps that
              use its services.
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              Ads are not intended to appear inside active private chat sessions, chat messages, chat
              input areas, or private communication screens.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Information We May Process</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              We do not require users to create an account to use the basic anonymous chat experience.
              However, some information may still be processed automatically. This may include browser
              type, device type, approximate technical location information, IP address, timestamps,
              pages visited, error logs, and security-related data. This information helps the website
              load correctly, protect against spam or abuse, diagnose technical issues, and improve
              reliability.
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              If you contact us by email, we may receive your email address, message content, and any
              information you choose to include. Please do not send passwords, government ID numbers,
              payment details, or highly sensitive personal information through email or chat.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Chat Messages</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              StrangerMeet is designed for temporary anonymous conversations. Chat messages are processed
              so they can be delivered between matched users during a live session. Users should understand
              that no online platform can guarantee perfect confidentiality. The person you chat with may
              copy, record, screenshot, or share what you send. For this reason, you should never share
              your real name, address, phone number, passwords, financial details, private photos, or any
              information that could identify or harm you.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Cookies and Similar Technologies</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              Cookies are small files stored by your browser. StrangerMeet may use functional cookies
              to support basic website behavior, analytics cookies to understand general website usage,
              and advertising cookies if ads are enabled on public pages. You can control or delete
              cookies through your browser settings. Blocking cookies may affect some website features.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-surface-2">
              <table className="w-full text-left text-sm text-ink-secondary">
                <thead className="bg-surface-1 text-ink">
                  <tr>
                    <th className="p-4">Cookie Type</th>
                    <th className="p-4">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-surface-2">
                    <td className="p-4 font-semibold text-ink">Functional</td>
                    <td className="p-4">Helps the website load, remember basic preferences, and maintain normal functionality.</td>
                  </tr>
                  <tr className="border-t border-surface-2">
                    <td className="p-4 font-semibold text-ink">Analytics</td>
                    <td className="p-4">Helps understand general traffic patterns and improve website performance.</td>
                  </tr>
                  <tr className="border-t border-surface-2">
                    <td className="p-4 font-semibold text-ink">Advertising</td>
                    <td className="p-4">May help third-party vendors, including Google, show relevant ads on public pages.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Data Retention</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              Technical logs may be kept for a limited period for security, troubleshooting, and abuse
              prevention. Email messages may be retained as long as needed to respond to the request,
              maintain records, or handle safety reports. Temporary chat-related technical processing is
              used to operate live conversations. We aim to keep only what is reasonably necessary for
              service operation, legal compliance, safety, and support.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-bold text-ink">GDPR Rights for EEA/UK Users</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              If you are located in the European Economic Area or the United Kingdom, you may have rights
              under applicable privacy law, including the right to access, correct, delete, restrict, or
              object to certain processing of personal data. You may also have the right to data portability
              and the right to lodge a complaint with a supervisory authority. To make a privacy request,
              contact us at{' '}
              <a href={privacyLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-cobalt underline underline-offset-4">
                privacy@strangermeet.tech
              </a>
              .
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-bold text-ink">CCPA/CPRA Rights for California Users</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              If you are a California resident, you may have rights to know what categories of personal
              information are collected, request deletion of certain information, request correction,
              and opt out of certain sharing or selling of personal information where applicable.
              StrangerMeet does not sell personal information in the ordinary meaning of selling user
              data for money. Advertising cookies may still be considered sharing under some privacy laws,
              depending on how third-party advertising is used.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Safety Reports</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              If you need to report harassment, abuse, threats, scams, or unsafe behavior, contact us at{' '}
              <a href={reportLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-cobalt underline underline-offset-4">
                report@strangermeet.tech
              </a>
              . Include only the information needed to explain the issue. Do not send unnecessary sensitive data.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Contact</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary">
              For general questions, contact{' '}
              <a href={contactLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-cobalt underline underline-offset-4">
                contact@strangermeet.tech
              </a>
              . For privacy questions, contact{' '}
              <a href={privacyLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-cobalt underline underline-offset-4">
                privacy@strangermeet.tech
              </a>
              .
            </p>
          </section>
        </article>
      </main>
    </div>
  )
}
