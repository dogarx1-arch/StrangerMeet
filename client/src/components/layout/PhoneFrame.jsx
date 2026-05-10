export default function PhoneFrame({ children }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Phone bezel */}
      <div className="relative bg-surface-0 rounded-[2rem] shadow-2xl shadow-ink/10 overflow-hidden border border-ghost">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-ink rounded-b-2xl z-10" />
        {/* Screen content */}
        <div className="pt-8 pb-4 min-h-[600px] max-h-[85vh] overflow-y-auto">
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-ink/20 rounded-full" />
        </div>
      </div>
    </div>
  )
}
