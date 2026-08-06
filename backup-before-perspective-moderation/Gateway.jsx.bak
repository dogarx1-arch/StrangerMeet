// ============================================================
// Gateway / Age Verification Page — StrangerMeet
// Users must confirm they are 18+ and agree to Terms.
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

  const setStatus = useSessionStore((s) => s.setStatus)

  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const canProceed = ageConfirmed && termsAccepted

  const handleEnter = () => {
    if (!canProceed) return
    setStatus('idle')
    navigate('/lobby')
  }

  return (
    <div className="min-h-screen bg-vellum">
      <Navbar showBack onBack={() => navigate('/')} />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">

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

              <div className="mt-8 space-y-4">
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

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-surface-0 rounded-3xl p-8 sm:p-10 shadow-xl shadow-ink/5">

                <div className="lg:hidden text-center mb-8">
                  <h1 className="font-serif text-2xl font-bold text-ink">
                    Stranger<span className="text-cobalt">Meet</span>
                  </h1>
                  <p className="font-sans text-sm text-ink-tertiary mt-2">
                    Anonymous 1-on-1 text chat
                  </p>
                </div>

                <div className="hidden lg:block mb-8">
                  <SectionTag>Confirm & Enter</SectionTag>
                  <h2 className="font-serif text-2xl font-bold text-ink mt-2">
                    Almost there
                  </h2>
                </div>

                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-danger-bg flex items-center justify-center">
                    <span className="font-serif text-3xl font-black text-danger">18+</span>
                  </div>
                </div>

                <div className="space-y-5 mb-8">
                  <CheckboxCobalt
                    id="age-confirm"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    label="I confirm I am 18 years of age or older"
                    sublabel="This is a legal requirement to use this service."
                  />

                  <label
                    htmlFor="terms-confirm"
                    className="flex cursor-pointer items-start gap-3 rounded-2xl border border-surface-2 bg-surface-1 p-4 transition hover:border-cobalt/40"
                  >
                    <input
                      id="terms-confirm"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 h-5 w-5 accent-[#0038a4]"
                    />

                    <span className="font-sans text-sm leading-6 text-ink-secondary">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setShowTerms(true)
                        }}
                        className="font-semibold text-cobalt underline underline-offset-2 hover:text-cobalt-dark"
                      >
                        Terms and Conditions
                      </button>
                      .
                      <span className="mt-1 block text-xs text-ink-tertiary">
                        Please read the terms before entering the chat.
                      </span>
                    </span>
                  </label>
                </div>

                <BtnCobalt fullWidth size="lg" onClick={handleEnter} disabled={!canProceed}>
                  Enter Lobby →
                </BtnCobalt>

                <p className="font-mono text-[10px] text-ink-ghost text-center mt-4">
                  By entering, you confirm that you are 18+ and agree to follow our rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-surface-0 p-6 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink">
                  Terms and Conditions
                </h2>
                <p className="mt-1 text-sm text-ink-tertiary">
                  Please read these terms before using StrangerMeet.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="rounded-full bg-surface-1 px-3 py-1 text-lg font-bold text-ink hover:bg-cobalt hover:text-white"
                aria-label="Close terms"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-sm leading-6 text-ink-secondary">
              <p>
                <strong>1. Age Requirement:</strong> StrangerMeet is only for users who are
                18 years of age or older. By using this website, you confirm that you meet
                this age requirement.
              </p>

              <p>
                <strong>2. Anonymous Chat:</strong> StrangerMeet allows anonymous text chat
                with strangers. You are responsible for your own words, behavior, and safety
                during conversations.
              </p>

              <p>
                <strong>3. No Illegal or Harmful Use:</strong> You must not use StrangerMeet
                for harassment, threats, hate speech, sexual exploitation, scams, spam,
                illegal activity, or sharing harmful content.
              </p>

              <p>
                <strong>4. No Personal Information:</strong> For your safety, do not share
                private information such as your home address, phone number, passwords,
                financial details, or identity documents.
              </p>

              <p>
                <strong>5. Ephemeral Conversations:</strong> StrangerMeet is designed for
                temporary conversations. Chats are not intended to be permanent records.
                However, users should still avoid sharing sensitive information.
              </p>

              <p>
                <strong>6. Reporting and Safety:</strong> If another user behaves in a harmful
                or abusive way, you may leave the chat or use the report option where available.
              </p>

              <p>
                <strong>7. Service Availability:</strong> We may update, limit, suspend, or
                discontinue parts of the service at any time for safety, maintenance, or legal
                reasons.
              </p>

              <p>
                <strong>8. Acceptance:</strong> By clicking the checkbox and entering the
                lobby, you agree to these Terms and Conditions.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="rounded-full bg-cobalt px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-cobalt-dark"
              >
                I have read the terms
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
