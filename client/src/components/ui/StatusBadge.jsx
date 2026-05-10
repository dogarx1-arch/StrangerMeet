export default function StatusBadge({ count, label }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-online-bg">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-online opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-online"></span>
      </span>
      <span className="font-mono text-sm font-medium text-online">
        {typeof count === 'number' ? count.toLocaleString() : count}
      </span>
      {label && (
        <span className="font-sans text-xs text-ink-tertiary">{label}</span>
      )}
    </div>
  )
}
