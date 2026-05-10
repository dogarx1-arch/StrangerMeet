import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import useSessionStore from '../store/sessionStore'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || ''

export default function useSocket() {
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)
  const setAnonId = useSessionStore((s) => s.setAnonId)

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      console.log('[socket] connected:', socket.id)
    })

    socket.on('disconnect', () => {
      setConnected(false)
      console.log('[socket] disconnected')
    })

    socket.on('session:init', ({ anonId }) => {
      setAnonId(anonId)
      console.log('[socket] assigned anonId:', anonId)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [setAnonId])

  return { socket: socketRef.current, connected }
}
