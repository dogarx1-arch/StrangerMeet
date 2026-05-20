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

  const { socket, connected } = useSocket()
  const { bindQueueEvents, joinQueue, leaveQueue } = useMatchmaking(socket)

  const anonId = useSessionStore((s) => s.anonId)

  const [steps, setSteps] = useState([
    { label: 'Connecting to server', status: 'pending' },
    { label: 'Entering matchmaking queue', status: 'pending' },
    { label: 'Searching for available stranger', status: 'pending' },
  ])

  useEffect(() => {
    setSteps((prev) =>
      prev.map((step, index) =>
        index === 0
          ? { ...step, status: connected ? 'done' : 'loading' }
          : step
      )
    )
  }, [connected])

  useEffect(() => {
    if (!socket || !connected || !anonId) {
      console.log('[searching] waiting before queue join:', {
        hasSocket: !!socket,
        connected,
        anonId,
      })
      return
    }

    bindQueueEvents()

    setSteps((prev) =>
      prev.map((step, index) =>
        index === 1 ? { ...step, status: 'loading' } : step
      )
    )

    const joined = joinQueue()

    if (joined) {
      setSteps((prev) =>
        prev.map((step, index) => {
          if (index === 1) return { ...step, status: 'done' }
          if (index === 2) return { ...step, status: 'loading' }
          return step
        })
      )
    }

    return () => {
      const latestStatus = useSessionStore.getState().status

      if (latestStatus === 'queued') {
        leaveQueue()
      }
    }
  }, [
    socket,
    connected,
    anonId,
    bindQueueEvents,
    joinQueue,
    leaveQueue,
  ])

  const handleCancel = () => {
    leaveQueue()
    navigate('/lobby')
  }

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

        <p className="font-sans text-sm text-ink-tertiary mt-2 text-center">
          {connected && anonId
            ? `Searching as ${anonId}`
            : 'Connecting to secure chat server...'}
        </p>

        <div className="mt-8">
          <ScanLog steps={steps} />
        </div>

        <div className="mt-10">
          <BtnGhost onClick={handleCancel}>
            Cancel Search
          </BtnGhost>
        </div>
      </div>

      <div className="flex justify-center px-4 pb-8">
        <AdSlot size="leaderboard" className="hidden md:flex" />
        <AdSlot size="banner" className="flex md:hidden" />
      </div>
    </div>
  )
}
