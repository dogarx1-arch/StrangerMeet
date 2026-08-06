import Navbar from '../components/layout/Navbar'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <div className="min-h-screen bg-vellum">
      <Navbar />

      <Helmet>
        <title>About Us — StrangerMeet</title>
        <meta 
          name="description" 
          content="Learn about StrangerMeet, an adults-only anonymous text chat platform focused on simple, private, and respectful conversations." 
        />
      </Helmet>

      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-surface-0 p-8 shadow-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cobalt">About</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink">About StrangerMeet</h1>

          <p className="mt-6 text-sm leading-7 text-ink-secondary">
            StrangerMeet is an anonymous text-chat platform built for adults who want quick,
            simple conversations with strangers online. The service is designed around a basic
            idea: users should be able to enter a chat without creating a public profile or
            exposing unnecessary personal information.
          </p>

          <p className="mt-4 text-sm leading-7 text-ink-secondary">
            StrangerMeet is not a social network, dating platform, or identity-based community.
            It is a temporary chat experience. Users are matched for text conversation, and they
            can leave the chat at any time if the conversation is uncomfortable, irrelevant, or
            unsafe.
          </p>

          <p className="mt-4 text-sm leading-7 text-ink-secondary">
            Because anonymous conversations can involve risk, we strongly encourage users to
            protect their personal information. Do not share your home address, phone number,
            passwords, financial details, identity documents, school, workplace, or private
            accounts with strangers.
          </p>

          <p className="mt-4 text-sm leading-7 text-ink-secondary">
            The website is intended only for users who are 18 years of age or older. By using
            StrangerMeet, users agree to follow our safety rules, community standards, and terms
            of service.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link 
              to="/safety" 
              className="rounded-full bg-cobalt px-5 py-3 text-sm font-semibold text-white"
            >
              Read Safety Guidelines
            </Link>
            <Link 
              to="/contact" 
              className="rounded-full border border-surface-2 px-5 py-3 text-sm font-semibold text-ink-secondary hover:border-cobalt hover:text-cobalt"
            >
              Contact Us
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}
