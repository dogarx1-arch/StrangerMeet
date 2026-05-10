import { useState, useEffect } from 'react'
import SectionTag from '../ui/SectionTag'
import BtnGhost from '../ui/BtnGhost'
import BtnDanger from '../ui/BtnDanger'

export default function SessionInfoPanel({ sessionId, status = 'live', messageCount = 0, onReport, onEndSession }) {
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-surface-0 rounded-xl p-5 space-y-5">
      <SectionTag>Session Info</SectionTag>

      <div className="space-y-4 mt-3">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs text-ink-tertiary">Status</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-online animate-pulse" />
            <span className="font-mono text-xs font-medium text-online uppercase">{status}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs text-ink-tertiary">Duration</span>
          <span className="font-mono text-sm text-ink">{formatDuration(duration)}</span>
        </div>

        {/* Messages */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs text-ink-tertiary">Messages</span>
          <span className="font-mono text-sm text-ink">{messageCount}</span>
        </div>

        {/* Storage */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs text-ink-tertiary">Data stored</span>
          <span className="font-mono text-sm text-online">0 bytes</span>
        </div>

        {/* Session ID */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs text-ink-tertiary">Session</span>
          <span className="font-mono text-[10px] text-ink-ghost truncate max-w-[120px]">
            {sessionId ? sessionId.slice(0, 8) + '...' : '—'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-2">
        <BtnGhost fullWidth size="sm" onClick={onReport}>
          Report Stranger
        </BtnGhost>
        <BtnDanger fullWidth size="sm" onClick={onEndSession}>
          End Session
        </BtnDanger>
      </div>
    </div>
  )
}
