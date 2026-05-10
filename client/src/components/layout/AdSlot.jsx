export default function AdSlot({ size = 'banner', className = '' }) {
  const dimensions = {
    banner: { w: 320, h: 50, label: 'Banner 320×50' },
    leaderboard: { w: 728, h: 90, label: 'Leaderboard 728×90' },
    skyscraper: { w: 160, h: 600, label: 'Skyscraper 160×600' },
    infeed: { w: '100%', h: 120, label: 'In-feed Ad' },
  }

  const dim = dimensions[size] || dimensions.banner

  return (
    <div
      className={`
        flex items-center justify-center
        bg-surface-1 rounded-lg
        border border-dashed border-ghost
        font-mono text-xs text-ink-ghost
        select-none overflow-hidden
        transition-opacity duration-300
        ${className}
      `}
      style={{
        width: typeof dim.w === 'number' ? `${dim.w}px` : dim.w,
        height: `${dim.h}px`,
        maxWidth: '100%',
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
        <span>{dim.label}</span>
      </div>
    </div>
  )
}
