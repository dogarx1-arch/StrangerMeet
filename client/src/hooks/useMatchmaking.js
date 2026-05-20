import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useSessionStore from '../store/sessionStore'

export default function useMatchmaking(socket) {
  const navigate = useNavigate()

  const {
    anonId,
    setStatus,
    setPartnerId,
    setSessionId,
  } = useSessionStore()

  const bindQueueEvents = useCallback(() => {
    if (!socket) return

    socket.off('queue:waiting')
    socket.off('queue:paired')
    socket.off('queue:error')

    socket.on('queue:waiting', ({ position, waitingCount }) => {
      console.log('[queue] waiting:', { position, waitingCount })
      setStatus('queued')
    })

    socket.on('queue:error', ({ message }) => {
      console.error('[queue] error:', message)
      setStatus('idle')
    })

    socket.on('queue:paired', ({ sessionId, partnerAnonId }) => {
      console.log('[queue] paired:', { sessionId, partnerAnonId })

      setStatus('matched')
      setPartnerId(partnerAnonId)
      setSessionId(sessionId)

      setTimeout(() => {
        setStatus('chatting')
        navigate(`/chat/${sessionId}`)
      }, 500)
    })
  }, [socket, setStatus, setPartnerId, setSessionId, navigate])

  const joinQueue = useCallback(() => {
    if (!socket) {
      console.warn('[queue] cannot join: socket missing')
      return false
    }

    if (!socket.connected) {
      console.warn('[queue] cannot join: socket not connected')
      return false
    }

    if (!anonId) {
      console.warn('[queue] cannot join: anonId not ready')
      return false
    }

    console.log('[queue] joining with anonId:', anonId)

    setStatus('queued')
    socket.emit('queue:join', { anonId })

    return true
  }, [socket, anonId, setStatus])

  const leaveQueue = useCallback(() => {
    if (!socket) return

    console.log('[queue] leaving queue')

    socket.emit('queue:leave')
    socket.off('queue:waiting')
    socket.off('queue:paired')
    socket.off('queue:error')

    setStatus('idle')
  }, [socket, setStatus])

  return {
    bindQueueEvents,
    joinQueue,
    leaveQueue,
  }
}
