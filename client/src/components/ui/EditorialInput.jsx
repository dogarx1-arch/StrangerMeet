export default function EditorialInput({ placeholder, value, onChange, onKeyDown, className = '', disabled = false }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full px-4 py-3
        font-sans text-base text-ink placeholder:text-ink-ghost
        bg-surface-0 rounded-lg
        border border-solid border-ghost
        transition-all duration-200
        focus:outline-none focus:border-cobalt/40 focus:bg-white focus:shadow-sm focus:shadow-cobalt/5
        disabled:bg-surface-1 disabled:text-ink-disabled disabled:cursor-not-allowed
        ${className}
      `}
    />
  )
}
