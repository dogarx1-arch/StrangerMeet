import { create } from 'zustand'

const useSessionStore = create((set) => ({
  anonId: null,
  status: 'idle',
ageConfirmed: false,
  partnerId: null,
  sessionId: null,
  messages: [],

  setAnonId: (anonId) => set({ anonId }),
  setStatus: (status) => set({ status }),
setAgeConfirmed: (ageConfirmed) => set({ ageConfirmed }),
  setPartnerId: (partnerId) => set({ partnerId }),
  setSessionId: (sessionId) => set({ sessionId }),

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          time: message.time || Date.now(),
        },
      ],
    })),

  clearMessages: () => set({ messages: [] }),

  resetSession: () =>
    set({
      status: 'idle',
      partnerId: null,
      sessionId: null,
      messages: [],
    }),
}))

export default useSessionStore
