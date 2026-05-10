export default function ScanLog({ steps = [] }) {
  return (
    <div className="space-y-3 max-w-xs mx-auto">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 0.3}s` }}>
          {/* Status icon */}
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {step.status === 'done' && (
              <svg className="w-5 h-5 text-online" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
            {step.status === 'loading' && (
              <div className="w-4 h-4 rounded-full border-2 border-cobalt border-t-transparent animate-spin" />
            )}
            {step.status === 'pending' && (
              <div className="w-4 h-4 rounded-full border-2 border-ink-ghost/30" />
            )}
          </div>

          {/* Label */}
          <span className={`font-mono text-sm ${
            step.status === 'done' ? 'text-ink-secondary' :
            step.status === 'loading' ? 'text-cobalt font-medium' :
            'text-ink-ghost'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}
