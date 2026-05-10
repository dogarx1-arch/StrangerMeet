export default function RecentMatches({ matches = [] }) {
  if (matches.length === 0) {
    return (
      <div className="bg-surface-1 rounded-xl p-4 text-center">
        <p className="font-sans text-sm text-ink-ghost">No recent matches yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {matches.map((match, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-surface-1 rounded-xl px-4 py-3 animate-fade-in"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-cobalt-dim flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-3.572a4.5 4.5 0 00-1.242-7.244l-4.5 4.5a4.5 4.5 0 006.364 6.364l-1.757 1.757" />
              </svg>
            </div>
            <span className="font-mono text-xs text-ink-secondary">
              {match.id1} ↔ {match.id2}
            </span>
          </div>
          <span className="font-mono text-[10px] text-ink-ghost">
            {match.time ? new Date(match.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'just now'}
          </span>
        </div>
      ))}
    </div>
  )
}
