import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-2 bg-surface-0 px-4 py-10 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <img src="/logo.svg" alt="StrangerMeet" className="h-9 w-auto" />

            <p className="mt-4 max-w-sm text-sm leading-6 text-ink-secondary">
              StrangerMeet is an adults-only anonymous text chat platform focused on simple,
              privacy-conscious conversations and safer online habits.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-bold text-ink">Website</h3>
            <ul className="space-y-2 text-sm text-ink-secondary">
              <li><Link className="transition hover:text-cobalt" to="/about">About Us</Link></li>
              <li><Link className="transition hover:text-cobalt" to="/contact">Contact Us</Link></li>
              <li><Link className="transition hover:text-cobalt" to="/blog">Blog</Link></li>
              <li><Link className="transition hover:text-cobalt" to="/safety">Safety Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-bold text-ink">Policies</h3>
            <ul className="space-y-2 text-sm text-ink-secondary">
              <li><Link className="transition hover:text-cobalt" to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link className="transition hover:text-cobalt" to="/cookie-policy">Cookie Policy</Link></li>
              <li><Link className="transition hover:text-cobalt" to="/terms">Terms of Service</Link></li>
              <li><Link className="transition hover:text-cobalt" to="/advertising-disclosure">Advertising Disclosure</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-bold text-ink">Support</h3>
            <ul className="space-y-2 text-sm text-ink-secondary">
              <li><Link className="transition hover:text-cobalt" to="/community-guidelines">Community Guidelines</Link></li>
              <li>
                <a className="transition hover:text-cobalt" href="https://mail.google.com/mail/u/0/?fs=1&to=support@strangermeet.tech&tf=cm" target="_blank" rel="noopener noreferrer">
                  support@strangermeet.tech
                </a>
              </li>
              <li>
                <a className="transition hover:text-cobalt" href="https://mail.google.com/mail/u/0/?fs=1&to=report@strangermeet.tech&tf=cm" target="_blank" rel="noopener noreferrer">
                  report@strangermeet.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-surface-2 pt-6 text-center">
          <p className="text-xs text-ink-tertiary">
            © {year} StrangerMeet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
