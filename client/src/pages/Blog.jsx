import Navbar from '../components/layout/Navbar'
import { Link } from 'react-router-dom'

const posts = [
  {
    slug: 'how-to-stay-safe-anonymous-chat',
    title: 'How to Stay Safe in Anonymous Chat',
    excerpt: 'Simple safety habits that protect your identity when speaking with strangers online.',
  },
  {
    slug: 'online-privacy-tips-for-beginners',
    title: 'Online Privacy Tips for Beginners',
    excerpt: 'A beginner-friendly guide to reducing digital risk without becoming overwhelmed.',
  },
  {
    slug: 'what-is-ephemeral-messaging',
    title: 'What Is Ephemeral Messaging?',
    excerpt: 'Understand temporary messaging, its benefits, and its limits.',
  },
  {
    slug: 'how-to-report-online-harassment',
    title: 'How to Report Online Harassment',
    excerpt: 'Practical steps for documenting, reporting, and responding to abusive behavior.',
  },
  {
    slug: 'webrtc-explained',
    title: 'WebRTC Explained for Chat Users',
    excerpt: 'A plain-English explanation of WebRTC and what it means for communication apps.',
  },
  {
    slug: 'vpn-for-anonymous-chat',
    title: 'Should You Use a VPN for Anonymous Chat?',
    excerpt: 'What VPNs can protect, what they cannot protect, and how to use them wisely.',
  },
  {
    slug: 'random-chat-mental-health',
    title: 'Random Chat and Mental Health',
    excerpt: 'How to use anonymous chat without letting it affect your mood or wellbeing.',
  },
  {
    slug: 'omegle-alternatives-2026',
    title: 'Omegle Alternatives in 2026',
    excerpt: 'What users should look for in modern random chat platforms.',
  },
]

export default function Blog() {
  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">Blog</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink sm:text-5xl">
            Privacy, safety, and anonymous chat guides
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink-secondary">
            Helpful, original guides for people who want to understand online privacy,
            anonymous chat safety, and responsible digital communication.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-3xl bg-surface-0 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h2 className="font-serif text-2xl font-bold text-ink">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-5 inline-block rounded-full bg-cobalt px-5 py-3 text-sm font-semibold text-white"
              >
                Read Article
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
