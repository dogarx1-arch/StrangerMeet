import { useState } from 'react'

export default function ChatInputBar({ onSend, disabled = false }) {
  const [text, setText] = useState('')

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  const handleKeyDown = (e) => {
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
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled}
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
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
  )
}
