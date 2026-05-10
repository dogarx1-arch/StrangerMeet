// ============================================================
// Gateway / Age Verification Page — StrangerMeet
// Users must confirm they are 18+ and understand the ephemeral
// nature of chats before entering the lobby.
// NOTE: No ads on this page per AdSense age-gate policy.
// ============================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import CheckboxCobalt from '../components/ui/CheckboxCobalt'
import BtnCobalt from '../components/ui/BtnCobalt'
import SectionTag from '../components/ui/SectionTag'
import useSessionStore from '../store/sessionStore'

export default function Gateway() {
  const navigate = useNavigate()

  // ── Pull setStatus action from global session store ──
  const setStatus = useSessionStore((s) => s.setStatus)

  // ── Local checkbox state ──
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [ephemeralUnderstood, setEphemeralUnderstood] = useState(false)

  // Both checkboxes must be checked before proceeding
  const canProceed = ageConfirmed && ephemeralUnderstood

  // Handle the "Enter Lobby" button click
  const handleEnter = () => {
    if (!canProceed) return
    setStatus('idle')
    navigate('/lobby')
  }

  return (
    <div className="min-h-screen bg-vellum">
      {/* ── Navigation with back button ── */}
      <Navbar showBack onBack={() => navigate('/')} />

      {/* ── Main Content ── */}
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Desktop: Two-panel layout | Mobile: Single card */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">

            {/* ── Left Panel: Editorial content (desktop only) ── */}
            <div className="hidden lg:block">
              <SectionTag>Before You Enter</SectionTag>
              <h1 className="font-serif text-5xl xl:text-6xl font-black text-ink mt-4 leading-tight">
                This space is for
                <br />
                <span className="text-cobalt">adults only.</span>
              </h1>
              <p className="font-sans text-lg text-ink-secondary mt-6 leading-relaxed max-w-md">
                StrangerMeet connects you with anonymous strangers for real-time text chat.
                Conversations are unmoderated and ephemeral — nothing is recorded or stored.
              </p>

              {/* Privacy guarantee list */}
              <div className="mt-8 space-y-4">
                {/* Guarantee: No data */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cobalt-dim flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-ink">No data collected</h3>
                    <p className="font-sans text-sm text-ink-tertiary">
                      We don't store messages, IP addresses, or any identifiers.
                    </p>
                  </div>
                </div>

                {/* Guarantee: Unmoderated warning */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cobalt-dim flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-ink">Unmoderated content</h3>
                    <p className="font-sans text-sm text-ink-tertiary">
                      Conversations may contain mature themes. Use the report button if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Panel: Confirmation card ── */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-surface-0 rounded-3xl p-8 sm:p-10 shadow-xl shadow-ink/5">

                {/* Mobile: Compact brand header */}
                <div className="lg:hidden text-center mb-8">
                  <h1 className="font-serif text-2xl font-bold text-ink">
                    Stranger<span className="text-cobalt">Meet</span>
                  </h1>
                  <p className="font-sans text-sm text-ink-tertiary mt-2">
                    Anonymous 1-on-1 text chat
                  </p>
                </div>

                {/* Desktop: Card section header */}
                <div className="hidden lg:block mb-8">
                  <SectionTag>Confirm & Enter</SectionTag>
                  <h2 className="font-serif text-2xl font-bold text-ink mt-2">
                    Almost there
                  </h2>
                </div>

                {/* 18+ age badge */}
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-danger-bg flex items-center justify-center">
                    <span className="font-serif text-3xl font-black text-danger">18+</span>
                  </div>
                </div>

                {/* ── Confirmation checkboxes ── */}
                <div className="space-y-5 mb-8">
                  {/* Checkbox 1: Age confirmation */}
                  <CheckboxCobalt
                    id="age-confirm"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    label="I confirm I am 18 years of age or older"
                    sublabel="This is a legal requirement to use this service."
                  />
                  {/* Checkbox 2: Ephemeral chat understanding */}
                  <CheckboxCobalt
                    id="ephemeral-confirm"
                    checked={ephemeralUnderstood}
                    onChange={(e) => setEphemeralUnderstood(e.target.checked)}
                    label="I understand all chats are ephemeral"
                    sublabel="Messages are never saved and vanish on disconnect."
                  />
                </div>

                {/* ── Enter Lobby CTA ── */}
                <BtnCobalt fullWidth size="lg" onClick={handleEnter} disabled={!canProceed}>
                  Enter Lobby →
                </BtnCobalt>

                <p className="font-mono text-[10px] text-ink-ghost text-center mt-4">
                  By entering, you agree to our community guidelines.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}