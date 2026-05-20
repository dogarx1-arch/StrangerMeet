import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import useSessionStore from '../store/sessionStore'

const SOCKET_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

let socketSingleton = null

function getSocket() {
  if (!socketSingleton) {
    socketSingleton = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 10000,
      withCredentials: true,
    })
  }

  return socketSingleton
}

export default function useSocket() {
  const [socketInstance, setSocketInstance] = useState(null)
  const [connected, setConnected] = useState(false)

  const setAnonId = useSessionStore((s) => s.setAnonId)

  useEffect(() => {
    const socket = getSocket()

    setSocketInstance(socket)
    setConnected(socket.connected)

    const handleConnect = () => {
      setConnected(true)
      console.log('[socket] connected:', socket.id)
      console.log('[socket] connected to:', SOCKET_URL)
    }

    const handleConnectError = (err) => {
      setConnected(false)
      console.error('[socket] connection error:', err.message)
      console.error('[socket] attempted URL:', SOCKET_URL)
    }

    const handleDisconnect = (reason) => {
      setConnected(false)
      console.log('[socket] disconnected:', reason)
    }

    const handleSessionInit = ({ anonId }) => {
      setAnonId(anonId)
      console.log('[socket] assigned anonId:', anonId)
    }

    socket.on('connect', handleConnect)
    socket.on('connect_error', handleConnectError)
    socket.on('disconnect', handleDisconnect)
    socket.on('session:init', handleSessionInit)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('connect_error', handleConnectError)
      socket.off('disconnect', handleDisconnect)
      socket.off('session:init', handleSessionInit)

      // Important:
      // Do not disconnect here.
      // The same socket must survive Lobby → Searching → Chat.
    }
  }, [setAnonId])

  return {
    socket: socketInstance,
    connected,
  }
}
