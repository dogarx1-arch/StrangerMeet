import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Navbar({ onlineCount = 0, anonId = null, showBack = false, onBack = null }) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const linkClass =
    'rounded-full border border-surface-2 px-4 py-2 font-sans text-sm font-semibold text-ink-secondary transition hover:border-cobalt hover:text-cobalt bg-white/80'

  const mobileLinkClass =
    'block rounded-2xl border border-surface-2 px-4 py-3 font-sans text-sm font-semibold text-ink-secondary transition hover:border-cobalt hover:text-cobalt bg-white'

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled || menuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5'
          : 'bg-white/80 backdrop-blur-md border-b border-black/5 sm:bg-transparent sm:border-transparent'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 min-w-0">
            {showBack && onBack && (
              <button
                onClick={onBack}
                className="text-[#7a7b77] hover:text-[#1b1c19] transition-colors p-1 rounded-md"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <a href="/" className="flex items-center min-w-0">
              <img
                src="/logo.svg"
                alt="StrangerMeet"
                className="h-9 sm:h-10 w-auto max-w-[145px] sm:max-w-none"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!isHomePage && (
              <a href="/" className={linkClass}>
                Home
              </a>
            )}

            <a href="/about" className={linkClass}>About Us</a>
            <a href="/contact" className={linkClass}>Support</a>
            <a href="/blog" className={linkClass}>Blogs</a>

            {anonId && (
              <span className="hidden lg:inline-flex font-mono text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: '#e8edf8', color: '#0038a4' }}>
                {anonId}
              </span>
            )}

            {onlineCount > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ backgroundColor: '#eef7f2' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: '#2d7a4f' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: '#2d7a4f' }} />
                </span>
                <span className="font-mono text-xs font-medium" style={{ color: '#2d7a4f' }}>
                  {onlineCount.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            {onlineCount > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ backgroundColor: '#eef7f2' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: '#2d7a4f' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: '#2d7a4f' }} />
                </span>
                <span className="font-mono text-xs font-medium" style={{ color: '#2d7a4f' }}>
                  {onlineCount.toLocaleString()}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="rounded-full border border-surface-2 bg-white px-3 py-2 text-ink-secondary shadow-sm"
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-5 bg-current mb-1" />
              <span className="block h-0.5 w-5 bg-current mb-1" />
              <span className="block h-0.5 w-5 bg-current" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-3 pt-1">
            <div className="grid gap-2 rounded-3xl bg-white/95 p-3 shadow-sm border border-surface-2">
              {!isHomePage && (
                <a href="/" className={mobileLinkClass}>Home</a>
              )}
              <a href="/about" className={mobileLinkClass}>About Us</a>
              <a href="/contact" className={mobileLinkClass}>Support</a>
              <a href="/blog" className={mobileLinkClass}>Blogs</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
