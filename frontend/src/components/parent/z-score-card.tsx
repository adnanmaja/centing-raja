import React from "react"

export function ZScoreCard({
  title,

  value,

  unit,

  score,

  status,

  warning,

  children,
}: {
  title: string

  value: string

  unit: string

  score: string

  status: string

  warning?: boolean

  children?: React.ReactNode
}) {
  const width = warning
    ? "w-[28%]"
    : score === "+0.5 SD"
      ? "w-[58%]"
      : "w-[70%]"

  return (
    <article className="rounded-xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-['Manrope:SemiBold',sans-serif] text-[9px] font-semibold tracking-[0.04em] text-[#4f6073]">
            {title}
          </p>
          <p className="mt-1 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#191c1d]">
            {value} <span className="text-base">{unit}</span>
          </p>
        </div>
        <span
          className={`rounded px-2 py-1 font-['Manrope:SemiBold',sans-serif] text-[9px] font-semibold ${
            warning
              ? "bg-[#fff0cf] text-[#a66d00]"
              : "bg-[#9ee7bd] text-[#005c38]"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-[9px] text-[#4f6073]">
        <span>Z-Score: {score}</span>
        <span>{warning ? "Normal (Ambang Batas)" : "Standar WHO"}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e8eeeb]">
        <div
          className={`h-full rounded-full ${
            warning ? "bg-[#c8890a]" : "bg-[#007c4a]"
          } ${width}`}
        />
      </div>
      <div className="mt-1 flex justify-between font-['Manrope:Regular',sans-serif] text-[8px] text-[#8a9790]">
        <span>-3</span>
        <span>-2</span>
        <span>0</span>
        <span>+2</span>
        <span>+3</span>
      </div>
      {children}
    </article>
  )
}
