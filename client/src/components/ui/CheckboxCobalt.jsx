export default function CheckboxCobalt({ checked, onChange, label, sublabel, id }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group select-none">
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className={`
          w-5 h-5 rounded border-2 transition-all duration-200
          flex items-center justify-center
          ${checked
            ? 'bg-cobalt border-cobalt'
            : 'bg-surface-0 border-ink-ghost group-hover:border-cobalt/50'
          }
        `}>
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-sans text-sm font-medium text-ink leading-tight">{label}</span>
        {sublabel && (
          <span className="font-sans text-xs text-ink-tertiary mt-0.5 leading-snug">{sublabel}</span>
        )}
      </div>
    </label>
  )
}
