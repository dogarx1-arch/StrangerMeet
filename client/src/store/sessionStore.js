import { create } from 'zustand'

const useSessionStore = create((set) => ({
  // State
  anonId: null,
  status: 'idle', // 'idle' | 'queued' | 'matched' | 'chatting'
  partnerId: null,
  sessionId: null,
  messages: [],

  // Actions
  setAnonId: (anonId) => set({ anonId }),
  setStatus: (status) => set({ status }),
  setPartnerId: (partnerId) => set({ partnerId }),
  setSessionId: (sessionId) => set({ sessionId }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, {
        ...message,
        time: message.time || Date.now(),
      }],
    })),

  resetSession: () =>
    set({
      status: 'idle',
      partnerId: null,
      sessionId: null,
      messages: [],
    }),
}))

export default useSessionStore
