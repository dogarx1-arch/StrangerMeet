export default function BubbleStranger({ text, time }) {
  return (
    <div className="flex justify-start animate-slide-up">
      <div className="max-w-[80%] sm:max-w-[70%]">
        <div className="bg-surface-1 rounded-2xl rounded-tl-sm px-4 py-2.5">
          <p className="font-sans text-sm text-ink leading-relaxed break-words">{text}</p>
        </div>
        {time && (
          <span className="font-mono text-[10px] text-ink-ghost mt-1 ml-2 block">{time}</span>
        )}
      </div>
    </div>
  )
}
