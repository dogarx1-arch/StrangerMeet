import StatusBadge from '../ui/StatusBadge'
import BtnDanger from '../ui/BtnDanger'

export default function ChatHeader({ partnerAnonId, onSkip, connected = true }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-surface-0 border-b border-ghost">
      <div className="flex items-center gap-3">
        {/* Stranger avatar */}
        <div className="w-9 h-9 rounded-full bg-cobalt-dim flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-sm font-bold text-cobalt">S</span>
        </div>
        <div className="flex flex-col">
          <span className="font-sans text-sm font-semibold text-ink">
            {partnerAnonId || 'Stranger'}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-online' : 'bg-danger'}`} />
            <span className="font-mono text-[10px] text-ink-tertiary">
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      <BtnDanger size="sm" onClick={onSkip}>
        Skip →
      </BtnDanger>
    </div>
  )
}
