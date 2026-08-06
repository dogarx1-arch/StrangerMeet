import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Gateway from './pages/Gateway'
import Lobby from './pages/Lobby'
import Searching from './pages/Searching'
import Chat from './pages/Chat'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import Safety from './pages/Safety'
import CommunityGuidelines from './pages/CommunityGuidelines'
import CookiePolicy from './pages/CookiePolicy'
import AdvertisingDisclosure from './pages/AdvertisingDisclosure'
import Blog from './pages/Blog'
import BlogArticle from './pages/BlogArticle'
import Report from './pages/Report'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import useSessionStore from './store/sessionStore'

function RequireAgeGate({ children }) {
  const ageConfirmed = useSessionStore((s) => s.ageConfirmed)
  if (!ageConfirmed) return <Navigate to="/enter" replace />
  return children
}

export default function App() {
  return (
    <div className="min-h-screen bg-vellum">
      <ScrollToTop />

      <Routes>
          <Route path="/" element={<Landing />} />
        <Route path="/enter" element={<Gateway />} />
        <Route path="/lobby" element={<RequireAgeGate><Lobby /></RequireAgeGate>} />
        <Route path="/matching" element={<RequireAgeGate><Searching /></RequireAgeGate>} />
        <Route path="/chat/:sessionId" element={<RequireAgeGate><Chat /></RequireAgeGate>} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/report" element={<Report />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        
        
        <Route path="/safety" element={<Safety />} />
        <Route path="/community-guidelines" element={<CommunityGuidelines />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/advertising-disclosure" element={<AdvertisingDisclosure />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
      </Routes>

      <Footer />
    </div>
  )
}
