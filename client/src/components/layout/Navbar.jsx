// ============================================================
// Navbar Component — StrangerMeet
// Fixed top navigation bar with scroll-aware background,
// optional back button, live online count badge, and anon ID.
// ============================================================

import { useEffect, useState } from 'react'

export default function Navbar({ onlineCount = 0, anonId = null, showBack = false, onBack = null }) {
  // Track scroll position to apply frosted glass background
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-black/5'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* ── Left: Logo + optional back button ── */}
          <div className="flex items-center gap-3">
            {/* Back button — shown on inner pages */}
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

            {/* Brand logo */}
            <h1 className="font-serif text-lg font-bold tracking-tight" style={{ color: '#1b1c19' }}>
              Stranger<span style={{ color: '#0038a4' }}>Meet</span>
            </h1>
          </div>

          {/* ── Right: Anon ID pill + online count badge ── */}
          <div className="flex items-center gap-3">
            {/* Anonymous ID — shown only when assigned */}
            {anonId && (
              <span className="hidden sm:inline-flex font-mono text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: '#e8edf8', color: '#0038a4' }}>
                {anonId}
              </span>
            )}

            {/* Live online count with pulsing green dot */}
            {onlineCount > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ backgroundColor: '#eef7f2' }}>
                {/* Pulsing dot animation */}
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

        </div>
      </div>
    </nav>
  )
}