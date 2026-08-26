export function NakesGrowthTrendChart({
  data,
  comparisonLabel = "-2.4% vs Jan",
  summary,
}: {
  data: { day: string; value: number }[]
  comparisonLabel?: string
  summary?: string
}) {
  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))

  // Map data points into the same 260x168 canvas coordinate style as ParentGrowthChart
  const xStep = 236 / (data.length - 1)
  const points = data.map((d, i) => {
    const x = 8 + i * xStep
    const y =
      132 - ((d.value - minValue) / (maxValue - minValue || 1)) * 92
    return { x, y, value: d.value }
  })

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ")
  const areaPath = `${line} L${points[points.length - 1].x} 154 L${points[0].x} 154 Z`

  const first = data[0].value
  const last = data[data.length - 1].value
  const deltaLabel = `${(last - first).toFixed(1)}% (${first.toFixed(1)}% ke ${last.toFixed(1)}%)`

  return (
    <div className="p-4 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-neutral-700">
          Tren Prevalensi Stunting (30 Hari Terakhir)
        </span>
        <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-emerald-800">
          {comparisonLabel}
        </span>
      </div>

      <div className="mx-auto w-full max-w-4xl overflow-visible">
        <svg
          viewBox="0 0 260 168"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Grafik tren prevalensi stunting"
        >
          <defs>
            <linearGradient id="nakesChartFill" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#8ee0ad" stopOpacity="0.32" />
              <stop offset="1" stopColor="#8ee0ad" stopOpacity="0.14" />
            </linearGradient>
          </defs>

          <path d="M0 58H260M0 102H260" stroke="#e8efeb" strokeDasharray="3 4" />

          <path d={areaPath} fill="url(#nakesChartFill)" />

          <path
            d={line}
            fill="none"
            stroke="#007c4a"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          <g fill="white" stroke="#007c4a" strokeWidth="2">
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.5" />
            ))}
          </g>

          {points.map((p, i) => {
            const isFirst = i === 0
            const isLast = i === points.length - 1
            return (
              <text
                key={i}
                x={p.x}
                y={p.y - 10}
                textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
                fill="#007c4a"
                fontFamily="Manrope, sans-serif"
                fontSize="9"
                fontWeight="700"
              >
                {p.value.toFixed(1)}%
              </text>
            )
          })}

          <g fill="#52615a" fontFamily="Manrope, sans-serif" fontSize="7">
            {data.map((d, i) => (
              <text
                key={d.day}
                x={points[i].x}
                y="166"
                textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}
              >
                {d.day}
              </text>
            ))}
          </g>
        </svg>
      </div>

      <div className="flex items-start gap-2 pt-1">
        <span className="text-emerald-800 mt-0.5">↓</span>
        <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-xs text-neutral-700 leading-5">
          {summary ?? `Tren prevalensi stunting menurun sebesar ${deltaLabel}.`}
        </p>
      </div>
    </div>
  )
}