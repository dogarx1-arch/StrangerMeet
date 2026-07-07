import StatusBadge from '../ui/StatusBadge'
import BtnDanger from '../ui/BtnDanger'

export default function ChatHeader({
  partnerAnonId,
  onSkip,
  onReport,
  connected = true,
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-surface-0 border-b border-ghost shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-cobalt-dim flex items-center justify-center shrink-0">
          <span className="font-serif text-sm font-bold text-cobalt">S</span>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-sans text-sm sm:text-base font-semibold text-ink truncate">
            {partnerAnonId || 'Stranger'}
          </span>

          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-online' : 'bg-danger'}`} />
            <span className="font-mono text-[10px] sm:text-xs text-ink-tertiary">
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onReport}
          className="rounded-full border border-danger/25 px-3 py-2 font-sans text-xs sm:text-sm font-semibold text-danger transition hover:bg-danger-bg"
        >
          Report
        </button>

        <BtnDanger size="sm" onClick={onSkip}>
          Skip →
        </BtnDanger>
      </div>
    </div>
  )
}
