// ============================================================
// Lobby Page — StrangerMeet
// Shows live stats, online user count, recent matches, and
// the "Start Chatting" button. Subscribes to socket events
// for real-time stats and recent match updates.
// ============================================================

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import AdSlot from '../components/layout/AdSlot'
import SectionTag from '../components/ui/SectionTag'
import LiveStats from '../components/lobby/LiveStats'
import RecentMatches from '../components/lobby/RecentMatches'
import StartChatButtons from '../components/lobby/StartChatButtons'
import useSessionStore from '../store/sessionStore'
import useSocket from '../hooks/useSocket'

export default function Lobby() {
  const navigate = useNavigate()

  const { socket, connected } = useSocket()

  const { anonId, status } = useSessionStore()

  const [stats, setStats] = useState({
    onlineCount: 0,
    inChatCount: 0,
    waitingCount: 0,
  })

  const [recentMatches, setRecentMatches] = useState([])

  useEffect(() => {
    if (!socket) return

    const handleStats = (data) => {
      setStats(data)
    }

    const handleMatches = (data) => {
      setRecentMatches(Array.isArray(data) ? data : [])
    }

    socket.on('stats:update', handleStats)
    socket.on('matches:recent', handleMatches)

    return () => {
      socket.off('stats:update', handleStats)
      socket.off('matches:recent', handleMatches)
    }
  }, [socket])

  const handleStartChat = () => {
    navigate('/matching')
  }

  return (
    <div className="min-h-screen bg-vellum">
      <Navbar
        onlineCount={stats.onlineCount}
        anonId={anonId}
        showBack
        onBack={() => navigate('/enter')}
      />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <AdSlot size="leaderboard" className="hidden md:flex" />
            <AdSlot size="banner" className="flex md:hidden" />
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            <div className="space-y-8">
              <div className="bg-surface-0 rounded-2xl p-6 sm:p-8">
                <SectionTag>Lobby</SectionTag>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-3">
                  Welcome back,{' '}
                  <span className="text-cobalt">{anonId || 'stranger'}</span>
                </h1>

                <p className="font-sans text-ink-secondary mt-2">
                  {connected
                    ? "You're connected and ready to chat."
                    : 'Connecting to server...'}
                </p>

                <div className="mt-6">
                  <LiveStats
                    online={stats.onlineCount}
                    inChat={stats.inChatCount}
                    waiting={stats.waitingCount}
                  />
                </div>
              </div>

              <div className="bg-surface-0 rounded-2xl p-6 sm:p-8">
                <SectionTag>Start Chatting</SectionTag>

                <h2 className="font-serif text-xl font-bold text-ink mt-3 mb-4">
                  Choose your mode
                </h2>

                <StartChatButtons
                  onStartText={handleStartChat}
                  disabled={!connected || status === 'queued'}
                />
              </div>

              <div className="bg-surface-0 rounded-2xl p-6 sm:p-8">
                <SectionTag>Recent Matches</SectionTag>

                <h2 className="font-serif text-xl font-bold text-ink mt-3 mb-4">
                  Latest connections
                </h2>

                <RecentMatches matches={recentMatches} />
              </div>
            </div>

            <div className="hidden lg:block space-y-6">
              <AdSlot size="skyscraper" className="mx-auto" />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <AdSlot size="leaderboard" className="hidden md:flex" />
            <AdSlot size="banner" className="flex md:hidden" />
          </div>
        </div>
      </div>
    </div>
  )
}
