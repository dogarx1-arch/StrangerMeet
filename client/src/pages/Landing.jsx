import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import AdSlot from '../components/layout/AdSlot'
import SectionTag from '../components/ui/SectionTag'
import BtnCobalt from '../components/ui/BtnCobalt'
import BtnGhost from '../components/ui/BtnGhost'

export default function Landing() {
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    onlineCount: 0,
    inChatCount: 0,
    waitingCount: 0,
  })

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {})
  }, [])

  const features = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      ),
      title: 'Zero Registration',
      desc: 'No email, no password, no account. Just click and talk.',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Ephemeral by Design',
      desc: 'Messages vanish the moment you disconnect. Nothing is ever stored.',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Instant Matching',
      desc: 'Our engine connects you with a stranger in under 3 seconds.',
    },
  ]

  const steps = [
    { num: '01', title: 'Confirm Age', desc: 'Verify you are 18+ to proceed' },
    { num: '02', title: 'Enter Lobby', desc: 'See live stats and choose your chat mode' },
    { num: '03', title: 'Get Matched', desc: 'Our engine pairs you instantly' },
    { num: '04', title: 'Start Chatting', desc: 'Talk freely — nothing is saved' },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden bg-vellum text-ink">
      <Navbar onlineCount={stats.onlineCount} />

      {/* Hero */}
      <section className="px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8">
        <div className="mx-auto w-full max-w-5xl text-center">
          <div className="mb-8 flex w-full justify-center overflow-hidden">
            <AdSlot size="leaderboard" className="hidden max-w-full md:flex" />
            <AdSlot size="banner" className="flex max-w-full md:hidden" />
          </div>

          <SectionTag>Anonymous Chat Platform</SectionTag>

          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
            Talk to strangers,
            <br />
            <span className="text-cobalt">not servers.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl px-1 font-sans text-base leading-7 text-ink-secondary sm:text-lg md:text-xl">
            Fully anonymous, completely ephemeral 1-on-1 text chat.
            No accounts. No logs. No storage. Just conversation.
          </p>

          <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <BtnCobalt size="lg" onClick={() => navigate('/enter')}>
              Enter Lobby →
            </BtnCobalt>

            <BtnGhost
              size="lg"
              onClick={() =>
                document.getElementById('features')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
            >
              Learn More
            </BtnGhost>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
            {[
              { value: stats.onlineCount || 0, label: 'Online Now', sub: 'real-time' },
              { value: 0, label: 'Bytes Stored', sub: 'ever' },
              { value: '∞', label: 'Privacy Level', sub: 'guaranteed' },
            ].map(({ value, label, sub }) => (
              <div
                key={label}
                className="rounded-2xl bg-surface-0 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5 sm:p-7 lg:p-8"
              >
                <span className="block font-serif text-4xl font-black text-cobalt sm:text-4xl md:text-5xl">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </span>
                <span className="mt-2 block font-sans text-sm font-semibold text-ink">
                  {label}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-ink-ghost">
                  {sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-surface-0 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:mb-12">
            <SectionTag>Why StrangerMeet</SectionTag>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl">
              Privacy isn't a feature.
              <br />
              <span className="text-cobalt">It's the architecture.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon, title, desc }) => (
              <article
                key={title}
                className="group rounded-2xl bg-surface-1 p-6 transition duration-300 hover:-translate-y-1 hover:bg-cobalt-dim sm:p-7 lg:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cobalt-dim text-cobalt transition duration-300 group-hover:bg-cobalt group-hover:text-white">
                  {icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 font-sans text-sm leading-6 text-ink-secondary">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:mb-12">
            <SectionTag>How It Works</SectionTag>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl">
              Four steps to <span className="text-cobalt">anonymity</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ num, title, desc }) => (
              <article
                key={num}
                className="rounded-2xl bg-surface-0 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="block font-mono text-4xl font-bold text-cobalt-dim">
                  {num}
                </span>
                <h3 className="mt-3 font-serif text-lg font-bold text-ink">
                  {title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-6 text-ink-tertiary">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-0 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl md:text-5xl">
            Ready to talk?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-7 text-ink-secondary sm:text-lg">
            Join thousands of people having real, anonymous conversations right now.
          </p>
          <div className="mt-8 flex justify-center">
            <BtnCobalt size="lg" onClick={() => navigate('/enter')}>
              Enter Lobby →
            </BtnCobalt>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="font-serif text-sm font-bold text-ink">
            Stranger<span className="text-cobalt">Meet</span>
          </span>

          <span className="font-mono text-xs text-ink-ghost">
            Zero data. Zero logs. Zero compromise.
          </span>
        </div>

        <div className="mt-6 flex w-full justify-center overflow-hidden">
          <AdSlot size="leaderboard" className="hidden max-w-full md:flex" />
          <AdSlot size="banner" className="flex max-w-full md:hidden" />
        </div>
      </footer>
    </main>
  )
}