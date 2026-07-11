import { useState, useRef, useCallback } from 'react'

const MAX_MESSAGE_LENGTH = 1000
const TYPING_EMIT_INTERVAL_MS = 2000

export default function ChatInputBar({ onSend, onTyping, disabled = false }) {
  const [text, setText] = useState('')
  const isComposingRef = useRef(false)
  const lastTypingEmitRef = useRef(0)

  const emitTypingThrottled = useCallback(() => {
    if (!onTyping) return

    const now = Date.now()

    if (now - lastTypingEmitRef.current > TYPING_EMIT_INTERVAL_MS) {
      lastTypingEmitRef.current = now
      onTyping()
    }
  }, [onTyping])

  const handleSend = () => {
    const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH)

    if (!trimmed || disabled) return

    onSend(trimmed)
    setText('')
  }

  const handleChange = (e) => {
    const value = e.target.value.slice(0, MAX_MESSAGE_LENGTH)
    setText(value)

    if (value.trim()) {
      emitTypingThrottled()
    }
  }

  const handleCompositionStart = () => {
    isComposingRef.current = true
  }

  const handleCompositionEnd = () => {
    isComposingRef.current = false
  }

  const handleKeyDown = (e) => {
    if (isComposingRef.current || e.keyCode === 229) return

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2 px-3 py-3 bg-surface-0 border-t border-ghost">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        placeholder="Type a message..."
        disabled={disabled}
        maxLength={MAX_MESSAGE_LENGTH}
        enterKeyHint="send"
        inputMode="text"
        className="
          flex-1 px-4 py-2.5
          font-sans text-sm text-ink placeholder:text-ink-ghost
          bg-surface-1 rounded-full
          border border-solid border-ghost
          transition-all duration-200
          focus:outline-none focus:border-cobalt/40 focus:bg-white focus:shadow-sm
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        id="chat-input"
        autoComplete="off"
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="
          flex items-center justify-center
          w-10 h-10 rounded-full
          bg-cobalt text-white
          transition-all duration-200
          hover:bg-cobalt-mid hover:shadow-md hover:shadow-cobalt/20
          active:scale-95
          disabled:bg-ink-disabled disabled:cursor-not-allowed disabled:hover:shadow-none
        "
        id="send-button"
        aria-label="Send message"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  )
}
