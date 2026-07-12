import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChatHeader from '../components/chat/ChatHeader'
import MessageList from '../components/chat/MessageList'
import ChatInputBar from '../components/chat/ChatInputBar'
import SessionInfoPanel from '../components/chat/SessionInfoPanel'
import useSessionStore from '../store/sessionStore'
import useSocket from '../hooks/useSocket'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://strangermeet.tech'

export default function Chat() {
  const { sessionId } = useParams()
  const navigate = useNavigate()

  const { socket, connected: socketConnected } = useSocket()

  const {
    anonId,
    partnerId,
    messages,
    addMessage,
    resetSession,
  } = useSessionStore()

  const [isTyping, setIsTyping] = useState(false)
  const [partnerConnected, setPartnerConnected] = useState(true)
  const [chatEnded, setChatEnded] = useState(false)
  const [endReason, setEndReason] = useState('Chat ended.')
  const [viewportHeight, setViewportHeight] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return

    const vv = window.visualViewport

    const updateHeight = () => setViewportHeight(vv.height)
    updateHeight()

    vv.addEventListener('resize', updateHeight)

    return () => {
      vv.removeEventListener('resize', updateHeight)
    }
  }, [])

  useEffect(() => {
    if (!sessionId || !partnerId) {
      navigate('/lobby')
    }
  }, [sessionId, partnerId, navigate])

  useEffect(() => {
    if (!socket) return

    const handleMessage = ({ text, from, time }) => {
      if (chatEnded) return

      addMessage({ text, from, time })
      setIsTyping(false)
    }

    const handleTyping = () => {
      if (chatEnded) return

      setIsTyping(true)

      setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    }

    const handlePartnerEnded = (payload = {}) => {
      setPartnerConnected(false)
      setChatEnded(true)
      setIsTyping(false)
      setEndReason(payload.reason || 'Chat ended. The stranger has left or disconnected.')
    }

    const handleMessageBlocked = (payload = {}) => {
      addMessage({
        text: payload.reason || 'Your message was blocked for violating our community guidelines.',
        from: 'system',
        time: Date.now(),
        system: true,
      })
    }

    socket.on('chat:message', handleMessage)
    socket.on('chat:typing', handleTyping)
    socket.on('chat:skipped', handlePartnerEnded)
    socket.on('chat:partner-disconnected', handlePartnerEnded)
    socket.on('chat:message-blocked', handleMessageBlocked)

    return () => {
      socket.off('chat:message', handleMessage)
      socket.off('chat:typing', handleTyping)
      socket.off('chat:skipped', handlePartnerEnded)
      socket.off('chat:partner-disconnected', handlePartnerEnded)
      socket.off('chat:message-blocked', handleMessageBlocked)
    }
  }, [socket, addMessage, chatEnded])

  useEffect(() => {
    const notifyServerBeforeLeaving = () => {
      if (socket && sessionId && !chatEnded) {
        socket.emit('chat:skip', { sessionId })
      }
    }

    window.addEventListener('beforeunload', notifyServerBeforeLeaving)
    window.addEventListener('pagehide', notifyServerBeforeLeaving)

    return () => {
      window.removeEventListener('beforeunload', notifyServerBeforeLeaving)
      window.removeEventListener('pagehide', notifyServerBeforeLeaving)
    }
  }, [socket, sessionId, chatEnded])

  const handleSend = useCallback((text) => {
    if (!socket || !sessionId || !text.trim() || chatEnded || !partnerConnected) return

    socket.emit('chat:message', {
      text,
      sessionId,
    })

    addMessage({
      text,
      from: anonId,
      time: Date.now(),
    })
  }, [socket, sessionId, anonId, addMessage, chatEnded, partnerConnected])

  const handleTyping = useCallback(() => {
    if (!socket || !sessionId || chatEnded || !partnerConnected) return

    socket.emit('chat:typing', {
      sessionId,
    })
  }, [socket, sessionId, chatEnded, partnerConnected])

  const handleSkip = () => {
    if (socket && sessionId && !chatEnded) {
      socket.emit('chat:skip', { sessionId })
    }

    resetSession()
    navigate('/matching')
  }

  const handleReport = () => {
    const reportedUser = partnerId
    const currentSession = sessionId

    const reportPayload = {
      reportedAnonId: reportedUser,
      reporterAnonId: anonId,
      reason: 'inappropriate',
      sessionId: currentSession,
    }

    fetch(`${API_BASE_URL}/api/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportPayload),
    }).catch(() => {})

    if (socket && currentSession && !chatEnded) {
      socket.emit('chat:report', {
        sessionId: currentSession,
        reason: 'inappropriate',
      })
    }

    navigate('/report', {
      replace: true,
      state: {
        reportedAnonId: reportedUser,
        sessionId: currentSession,
      },
    })

    setTimeout(() => {
      resetSession()
    }, 0)
  }

  const handleReturnLobby = () => {
    resetSession()
    navigate('/lobby')
  }

  const handleFindNew = () => {
    resetSession()
    navigate('/matching')
  }

  const handleEndSession = () => {
    if (socket && sessionId && !chatEnded) {
      socket.emit('chat:skip', { sessionId })
    }

    resetSession()
    navigate('/lobby')
  }

  const canSend = socketConnected && partnerConnected && !chatEnded

  return (
    <div
      className="fixed inset-0 z-40 h-[100dvh] w-screen bg-vellum flex overflow-hidden overscroll-none"
      style={viewportHeight ? { height: `${viewportHeight}px` } : undefined}
    >
      <div className="hidden lg:block w-72 p-4 overflow-y-auto">
        <SessionInfoPanel
          sessionId={sessionId}
          messageCount={messages.length}
          onReport={handleReport}
          onEndSession={handleEndSession}
        />
      </div>

      <div className="relative flex-1 flex flex-col min-w-0 h-full bg-surface-0 lg:rounded-2xl lg:my-4 lg:mr-4 overflow-hidden overscroll-none">
        <ChatHeader
          partnerAnonId={partnerId}
          onSkip={handleSkip}
          onReport={handleReport}
          connected={canSend}
        />

        {!partnerConnected && (
          <div className="shrink-0 bg-danger-bg px-4 py-2 text-center">
            <span className="font-sans text-sm text-danger font-medium">
              Stranger disconnected.
            </span>
          </div>
        )}

        <div className="flex-1 min-h-0 overscroll-contain">
          <MessageList
            messages={messages}
            isTyping={isTyping}
            myAnonId={anonId}
          />
        </div>

        <div className="shrink-0 bg-surface-0 border-t border-ghost pb-[env(safe-area-inset-bottom)]">
          <ChatInputBar
            onSend={handleSend}
            onTyping={handleTyping}
            disabled={!canSend}
          />
        </div>

        {chatEnded && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/35 px-4">
            <div className="w-full max-w-sm rounded-3xl bg-surface-0 p-6 text-center shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-danger-bg">
                <span className="font-serif text-2xl font-bold text-danger">!</span>
              </div>

              <h2 className="mt-4 font-serif text-2xl font-bold text-ink">
                Chat ended
              </h2>

              <p className="mt-3 text-sm leading-6 text-ink-secondary">
                {endReason}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleReturnLobby}
                  className="rounded-full border border-surface-2 px-4 py-3 font-sans text-sm font-semibold text-ink-secondary transition hover:border-cobalt hover:text-cobalt"
                >
                  Lobby
                </button>

                <button
                  type="button"
                  onClick={handleFindNew}
                  className="rounded-full bg-cobalt px-4 py-3 font-sans text-sm font-semibold text-white transition hover:bg-cobalt-strong"
                >
                  New Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
