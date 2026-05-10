export default function BtnDanger({ children, onClick, fullWidth = false, size = 'md', disabled = false, className = '' }) {
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
        bg-danger text-white rounded-lg
        transition-all duration-200 ease-out
        hover:bg-danger/90 hover:shadow-lg hover:shadow-danger/20 hover:-translate-y-0.5
        active:translate-y-0 active:shadow-none
        disabled:bg-ink-disabled disabled:text-ink-ghost disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
