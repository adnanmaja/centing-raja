export function NakesGrowthTrendChart({
  data,
  comparisonLabel = "Belum ada data",
  summary,
  trendDirection = "stable",
}: {
  data?: { day: string; value: number }[]
  comparisonLabel?: string
  summary?: string
  trendDirection?: "down" | "up" | "stable"
}) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-neutral-700">
            Tren Prevalensi Stunting (30 Hari Terakhir)
          </span>
          <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-neutral-500">
            {comparisonLabel}
          </span>
        </div>

        <div className="mx-auto w-full max-w-4xl py-8 flex flex-col items-center justify-center text-center">
          <svg viewBox="0 0 260 80" className="w-full h-20 overflow-visible opacity-30 mb-2">
            <path d="M0 20H260M0 50H260" stroke="#a1a1aa" strokeDasharray="3 4" />
          </svg>
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm text-neutral-600">
            Belum ada data pengukuran
          </p>
          <p className="font-['Manrope:Regular',sans-serif] text-xs text-neutral-400 mt-1 max-w-sm">
            {summary || "Catat pengukuran balita untuk mulai memantau tren stunting kecamatan."}
          </p>
        </div>
      </div>
    )
  }

  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const valueRange = maxValue - minValue

  // Map data points into the 260x168 canvas coordinate style
  const isSingle = data.length === 1
  const xStep = isSingle ? 0 : 236 / (data.length - 1)
  const points = data.map((d, i) => {
    const x = isSingle ? 130 : 8 + i * xStep
    const y = valueRange === 0 ? 86 : 132 - ((d.value - minValue) / valueRange) * 92
    return { x, y, value: d.value }
  })

  const line = isSingle
    ? ""
    : points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ")
  const areaPath = isSingle
    ? ""
    : `${line} L${points[points.length - 1].x} 154 L${points[0].x} 154 Z`
  return (
    <div className="p-4 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-neutral-700">
          Tren Prevalensi Stunting (30 Hari Terakhir)
        </span>
        <span className={`font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold ${
          trendDirection === "down" ? "text-emerald-800" : trendDirection === "up" ? "text-rose-600" : "text-neutral-600"
        }`}>
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

          {areaPath && <path d={areaPath} fill="url(#nakesChartFill)" />}

          {line && (
            <path
              d={line}
              fill="none"
              stroke="#007c4a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          )}
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
        <span className={`mt-0.5 font-bold text-sm ${
          trendDirection === "down" ? "text-emerald-800" : trendDirection === "up" ? "text-rose-600" : "text-neutral-600"
        }`}>
          {trendDirection === "down" ? "↓" : trendDirection === "up" ? "↑" : "•"}
        </span>
        <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-xs text-neutral-700 leading-5">
          {summary ?? "Data tren prevalensi stunting terhitung dari pengukuran balita tercatat."}
        </p>
      </div>
    </div>
  )
}