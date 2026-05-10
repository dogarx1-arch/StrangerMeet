import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import AdSlot from '../components/layout/AdSlot'
import ConcentricRings from '../components/searching/ConcentricRings'
import ScanLog from '../components/searching/ScanLog'
import BtnGhost from '../components/ui/BtnGhost'
import useSessionStore from '../store/sessionStore'
import useSocket from '../hooks/useSocket'
import useMatchmaking from '../hooks/useMatchmaking'

export default function Searching() {
  const navigate = useNavigate()
  const { socket } = useSocket()
  const { leaveQueue } = useMatchmaking(socket)
  const { setStatus, setPartnerId, setSessionId } = useSessionStore()

  const [steps, setSteps] = useState([
    { label: 'Preferences matched', status: 'pending' },
    { label: 'Available users found', status: 'pending' },
    { label: 'Establishing connection...', status: 'pending' },
  ])

  useEffect(() => {
    const t1 = setTimeout(() => setSteps(p => p.map((s,i) => i===0 ? {...s,status:'done'} : s)), 800)
    const t2 = setTimeout(() => setSteps(p => p.map((s,i) => i===1 ? {...s,status:'done'} : s)), 1600)
    const t3 = setTimeout(() => setSteps(p => p.map((s,i) => i===2 ? {...s,status:'loading'} : s)), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    if (!socket) return
    const handlePaired = ({ sessionId, partnerAnonId }) => {
      setSteps(p => p.map(s => ({...s, status:'done'})))
      setStatus('matched')
      setPartnerId(partnerAnonId)
      setSessionId(sessionId)
      setTimeout(() => { setStatus('chatting'); navigate(`/chat/${sessionId}`) }, 600)
    }
    socket.on('queue:paired', handlePaired)
    return () => socket.off('queue:paired', handlePaired)
  }, [socket, navigate, setStatus, setPartnerId, setSessionId])

  const handleCancel = () => { leaveQueue(); navigate('/lobby') }

  return (
    <div className="min-h-screen bg-vellum flex flex-col">
      <Navbar showBack onBack={handleCancel} />
      <div className="pt-20 flex justify-center px-4">
        <AdSlot size="leaderboard" className="hidden md:flex" />
        <AdSlot size="banner" className="flex md:hidden" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <ConcentricRings />
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-10 text-center">
          Finding a <span className="text-cobalt">stranger</span>...
        </h1>
        <p className="font-sans text-sm text-ink-tertiary mt-2 text-center">Scanning for available connections</p>
        <div className="mt-8"><ScanLog steps={steps} /></div>
        <div className="mt-10"><BtnGhost onClick={handleCancel}>Cancel Search</BtnGhost></div>
      </div>
      <div className="flex justify-center px-4 pb-8">
        <AdSlot size="leaderboard" className="hidden md:flex" />
        <AdSlot size="banner" className="flex md:hidden" />
      </div>
    </div>
  )
}
