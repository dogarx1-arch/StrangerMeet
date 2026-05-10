import BtnCobalt from '../ui/BtnCobalt'

export default function StartChatButtons({ onStartText, disabled = false }) {
  return (
    <div className="space-y-3">
      <BtnCobalt fullWidth size="lg" onClick={onStartText} disabled={disabled}>
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          Start Text Chat
        </span>
      </BtnCobalt>

      {/* Video Chat — Coming Soon */}
      <button
        disabled
        className="
          relative w-full px-6 py-3.5
          font-sans font-semibold text-lg text-ink-disabled
          bg-surface-2 rounded-lg cursor-not-allowed
          flex items-center justify-center gap-2
        "
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        Video Chat
        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-cobalt text-white text-[10px] font-mono font-medium rounded-full uppercase tracking-wider">
          Coming Soon
        </span>
      </button>
    </div>
  )
}
