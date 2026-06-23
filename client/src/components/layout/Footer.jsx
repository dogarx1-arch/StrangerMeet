import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-2 bg-surface-0 px-4 py-10 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="StrangerMeet"
                className="h-9 w-auto"
              />
            </div>

            <p className="max-w-sm text-sm leading-6 text-ink-secondary">
              StrangerMeet is an anonymous chat platform designed for quick,
              simple, and privacy-focused conversations with strangers online.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-bold text-ink">
              Important Links
            </h3>

            <ul className="space-y-2 text-sm text-ink-secondary">
              <li>
                <Link className="transition hover:text-cobalt" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-cobalt" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-cobalt" to="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-cobalt" to="/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-bold text-ink">
              Safety & Support
            </h3>

            <ul className="space-y-2 text-sm text-ink-secondary">
              <li>
                <Link className="transition hover:text-cobalt" to="/safety">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-cobalt" to="/community-guidelines">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <a
                  className="transition hover:text-cobalt"
                  href="mailto:contact@strangermeet.tech"
                >
                  contact@strangermeet.tech
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
