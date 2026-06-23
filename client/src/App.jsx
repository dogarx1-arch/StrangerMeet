import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Gateway from './pages/Gateway'
import Lobby from './pages/Lobby'
import Searching from './pages/Searching'
import Chat from './pages/Chat'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-vellum">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/enter" element={<Gateway />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/matching" element={<Searching />} />
        <Route path="/chat/:sessionId" element={<Chat />} />
      </Routes>

      <Footer />
    </div>
  )
}
