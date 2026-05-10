import { useEffect, useRef } from 'react'
import BubbleStranger from './BubbleStranger'
import BubbleOwn from './BubbleOwn'
import TypingIndicator from './TypingIndicator'

export default function MessageList({ messages = [], isTyping = false, myAnonId }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const formatTime = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      {messages.length === 0 && !isTyping && (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="w-16 h-16 rounded-full bg-cobalt-dim flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <p className="font-serif text-lg text-ink-secondary">Say hello to your stranger</p>
          <p className="font-sans text-sm text-ink-ghost mt-1">Your messages are never stored</p>
        </div>
      )}

      {messages.map((msg, i) =>
        msg.from === myAnonId ? (
          <BubbleOwn key={i} text={msg.text} time={formatTime(msg.time)} />
        ) : (
          <BubbleStranger key={i} text={msg.text} time={formatTime(msg.time)} />
        )
      )}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  )
}
