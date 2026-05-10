export default function BubbleOwn({ text, time }) {
  return (
    <div className="flex justify-end animate-slide-up">
      <div className="max-w-[80%] sm:max-w-[70%]">
        <div className="bg-cobalt rounded-2xl rounded-tr-sm px-4 py-2.5">
          <p className="font-sans text-sm text-white leading-relaxed break-words">{text}</p>
        </div>
        {time && (
          <span className="font-mono text-[10px] text-ink-ghost mt-1 mr-2 block text-right">{time}</span>
        )}
      </div>
    </div>
  )
}
