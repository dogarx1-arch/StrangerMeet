import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import AdSlot from '../components/layout/AdSlot'
import ChatHeader from '../components/chat/ChatHeader'
import MessageList from '../components/chat/MessageList'
import ChatInputBar from '../components/chat/ChatInputBar'
import SessionInfoPanel from '../components/chat/SessionInfoPanel'
import useSessionStore from '../store/sessionStore'
import useSocket from '../hooks/useSocket'

export default function Chat() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { socket } = useSocket()
  const { anonId, partnerId, messages, addMessage, resetSession } = useSessionStore()
  const [isTyping, setIsTyping] = useState(false)
  const [connected, setConnected] = useState(true)

  useEffect(() => {
    if (!socket) return

    const handleMessage = ({ text, from, time }) => {
      addMessage({ text, from, time })
      setIsTyping(false)
    }
    const handleTyping = () => {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 3000)
    }
    const handleSkipped = () => {
      setConnected(false)
      setTimeout(() => { resetSession(); navigate('/lobby') }, 3000)
    }

    socket.on('chat:message', handleMessage)
    socket.on('chat:typing', handleTyping)
    socket.on('chat:skipped', handleSkipped)

    return () => {
      socket.off('chat:message', handleMessage)
      socket.off('chat:typing', handleTyping)
      socket.off('chat:skipped', handleSkipped)
    }
  }, [socket, addMessage, resetSession, navigate])

  const handleSend = useCallback((text) => {
    if (!socket) return
    socket.emit('chat:message', { text, sessionId })
    addMessage({ text, from: anonId, time: Date.now() })
  }, [socket, sessionId, anonId, addMessage])

  const handleTyping = useCallback(() => {
    if (!socket) return
    socket.emit('chat:typing', { sessionId })
  }, [socket, sessionId])

  const handleSkip = () => {
    if (!socket) return
    socket.emit('chat:skip', { sessionId })
    resetSession()
    navigate('/matching')
  }

  const handleReport = () => {
    fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportedAnonId: partnerId, reporterAnonId: anonId, reason: 'inappropriate', sessionId }),
    }).catch(() => {})
  }

  const handleEndSession = () => { resetSession(); navigate('/lobby') }

  return (
    <div className="h-screen bg-vellum flex flex-col">
      <Navbar anonId={anonId} />
      <div className="flex-1 pt-14 flex overflow-hidden">
        {/* Desktop: Left session panel */}
        <div className="hidden lg:block w-72 p-4 overflow-y-auto">
          <SessionInfoPanel
            sessionId={sessionId}
            messageCount={messages.length}
            onReport={handleReport}
            onEndSession={handleEndSession}
          />
        </div>

        {/* Center: Chat area */}
        <div className="flex-1 flex flex-col min-w-0 bg-surface-0 lg:rounded-t-2xl">
          <ChatHeader partnerAnonId={partnerId} onSkip={handleSkip} connected={connected} />
          {!connected && (
            <div className="bg-danger-bg px-4 py-2 text-center">
              <span className="font-sans text-sm text-danger font-medium">
                Stranger disconnected. Returning to lobby...
              </span>
            </div>
          )}
          <MessageList messages={messages} isTyping={isTyping} myAnonId={anonId} />
          <ChatInputBar
            onSend={handleSend}
            disabled={!connected}
            onKeyDown={handleTyping}
          />
        </div>

        {/* Desktop: Right ad */}
        <div className="hidden lg:flex w-48 p-4 items-start justify-center">
          <AdSlot size="skyscraper" />
        </div>
      </div>
    </div>
  )
}
