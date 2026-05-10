import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useSessionStore from '../store/sessionStore'

export default function useMatchmaking(socket) {
  const navigate = useNavigate()
  const { anonId, setStatus, setPartnerId, setSessionId } = useSessionStore()

  const joinQueue = useCallback(() => {
    if (!socket) return
    setStatus('queued')
    socket.emit('queue:join', { anonId })

    // Listen for match (one-time)
    socket.once('queue:paired', ({ sessionId, partnerAnonId }) => {
      setStatus('matched')
      setPartnerId(partnerAnonId)
      setSessionId(sessionId)
      setTimeout(() => {
        setStatus('chatting')
        navigate(`/chat/${sessionId}`)
      }, 800) // brief delay for transition
    })
  }, [socket, anonId, setStatus, setPartnerId, setSessionId, navigate])

  const leaveQueue = useCallback(() => {
    if (!socket) return
    socket.emit('queue:leave')
    socket.off('queue:paired')
    setStatus('idle')
  }, [socket, setStatus])

  return { joinQueue, leaveQueue }
}
