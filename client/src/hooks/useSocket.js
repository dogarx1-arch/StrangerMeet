import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import useSessionStore from '../store/sessionStore'

const SOCKET_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export default function useSocket() {
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)
  const setAnonId = useSessionStore((s) => s.setAnonId)

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      withCredentials: true,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      console.log('[socket] connected:', socket.id)
      console.log('[socket] connected to:', SOCKET_URL)
    })

    socket.on('connect_error', (err) => {
      setConnected(false)
      console.error('[socket] connection error:', err.message)
      console.error('[socket] attempted URL:', SOCKET_URL)
    })

    socket.on('disconnect', (reason) => {
      setConnected(false)
      console.log('[socket] disconnected:', reason)
    })

    socket.on('session:init', ({ anonId }) => {
      setAnonId(anonId)
      console.log('[socket] assigned anonId:', anonId)
    })

    return () => {
      socket.removeAllListeners()
      socket.disconnect()
      socketRef.current = null
    }
  }, [setAnonId])

  return { socket: socketRef.current, connected }
}
