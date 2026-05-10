export default function ConcentricRings() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {/* Ring 3 — outermost */}
      <div className="absolute inset-0 rounded-full bg-surface-3/40 animate-pulse-ring-delayed-2" />
      {/* Ring 2 */}
      <div className="absolute inset-6 rounded-full bg-surface-2/60 animate-pulse-ring-delayed" />
      {/* Ring 1 */}
      <div className="absolute inset-12 rounded-full bg-surface-1/80 animate-pulse-ring" />
      {/* Center circle */}
      <div className="relative w-20 h-20 rounded-full bg-cobalt-dim flex items-center justify-center shadow-lg shadow-cobalt/10">
        <svg className="w-8 h-8 text-cobalt animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
    </div>
  )
}
