export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-surface-1 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-ink-ghost animate-typing-dot" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 rounded-full bg-ink-ghost animate-typing-dot" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 rounded-full bg-ink-ghost animate-typing-dot" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  )
}
