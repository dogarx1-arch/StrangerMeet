export default function BtnGhost({ children, onClick, fullWidth = false, size = 'md', disabled = false, className = '' }) {
  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-sans font-semibold tracking-wide
        bg-transparent text-cobalt rounded-lg
        border border-solid border-ghost
        transition-all duration-200 ease-out
        hover:bg-cobalt-dim hover:border-cobalt/30 hover:-translate-y-0.5
        active:translate-y-0
        disabled:text-ink-disabled disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-transparent
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
