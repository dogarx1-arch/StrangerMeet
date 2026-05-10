export default function LiveStats({ online = 0, inChat = 0, waiting = 0 }) {
  const stats = [
    { value: online, label: 'Online', color: 'text-online', bg: 'bg-online-bg' },
    { value: inChat, label: 'In Chat', color: 'text-cobalt', bg: 'bg-cobalt-dim' },
    { value: waiting, label: 'Waiting', color: 'text-ink-secondary', bg: 'bg-surface-1' },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(({ value, label, color, bg }) => (
        <div key={label} className={`${bg} rounded-xl p-4 text-center transition-transform duration-200 hover:scale-105`}>
          <span className={`font-serif text-2xl font-bold ${color} block`}>
            {value.toLocaleString()}
          </span>
          <span className="font-mono text-[10px] tracking-wider uppercase text-ink-ghost mt-1 block">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
