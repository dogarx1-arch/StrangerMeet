import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Gateway from './pages/Gateway'
import Lobby from './pages/Lobby'
import Searching from './pages/Searching'
import Chat from './pages/Chat'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/enter" element={<Gateway />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/matching" element={<Searching />} />
      <Route path="/chat/:sessionId" element={<Chat />} />
    </Routes>
  )
}
