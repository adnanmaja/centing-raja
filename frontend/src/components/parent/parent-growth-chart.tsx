import { getAgeMonths, type Child, type Measurement } from "../../lib/api"

export function ParentGrowthChart({
  metric,
  measurements,
  child,
}: {
  metric: "Tinggi Badan" | "Berat Badan"
  measurements?: Measurement[]
  child?: Child | null
}) {
  const isHeight = metric === "Tinggi Badan"
  const unit = isHeight ? "cm" : "kg"

  const sorted = measurements && measurements.length > 0
    ? [...measurements].sort((a, b) => new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime())
    : []

  // Compute points
  const points = sorted.map((m) => {
    const val = isHeight ? Number(m.height) : Number(m.weight)
    // Age in months from days or dates
    let ageMonths = 0
    if (child?.birth_date && m.measured_at) {
      const birth = new Date(child.birth_date)
      const measured = new Date(m.measured_at)
      ageMonths = Math.max(0, (measured.getFullYear() - birth.getFullYear()) * 12 + (measured.getMonth() - birth.getMonth()))
    } else if (m.age) {
      ageMonths = Math.round(Number(m.age) / 30.4375)
    }
    const clampedAge = Math.min(30, Math.max(0, ageMonths))
    const x = 8 + (clampedAge / 30) * 236

    let y = 140
    if (isHeight) {
      const clampedVal = Math.min(110, Math.max(45, val))
      y = 154 - ((clampedVal - 45) / (110 - 45)) * 120
    } else {
      const clampedVal = Math.min(25, Math.max(2, val))
      y = 154 - ((clampedVal - 2) / (25 - 2)) * 120
    }
    return { x, y, val, ageMonths }
  })

  const defaultLine = isHeight
    ? "M8 132 L48 106 L86 82 L124 56 L164 40 L204 43 L244 27"
    : "M8 134 L48 110 L86 86 L124 66 L164 50 L204 52 L244 42"

  const line = points.length > 1
    ? points.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"}${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, "")
    : points.length === 1
    ? `M8 140 L${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
    : defaultLine

  const latest = points.length > 0 ? points[points.length - 1] : null
  const displayVal = latest ? `${latest.val}` : (isHeight ? "92" : "14.2")
  const displayAge = latest ? `Bulan ${latest.ageMonths}` : "Bulan 30"
  const tooltipX = latest ? Math.min(202, Math.max(0, latest.x - 29)) : 191
  const tooltipY = latest ? Math.max(4, latest.y - 32) : 18
  const lastDotX = latest ? latest.x : 204
  const lastDotY = latest ? latest.y : (isHeight ? 43 : 52)

  return (
    <div className="mx-auto mt-5 w-full max-w-4xl overflow-visible">
      <svg
        viewBox="0 0 260 168"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`Grafik ${metric} Leo`}
      >
        <defs>
          <linearGradient id="parentChartFill" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#8ee0ad" stopOpacity="0.32" />
            <stop offset="1" stopColor="#8ee0ad" stopOpacity="0.14" />
          </linearGradient>
        </defs>
        <path d="M0 58H260M0 102H260" stroke="#e8efeb" strokeDasharray="3 4" />
        <path
          d={`${line} L244 154 L8 154 Z`}
          fill="url(#parentChartFill)"
          className="parent-chart-area"
        />
        <path
          d={line}
          fill="none"
          stroke="#007c4a"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          className="parent-chart-line"
        />
        {latest && <path d={`M${latest.x.toFixed(1)} 12V154`} stroke="#87c6a1" strokeDasharray="2 2" />}
        <g
          className="parent-chart-dots"
          fill="white"
          stroke="#007c4a"
          strokeWidth="2"
        >
          {points.length > 0
            ? points.map((pt, idx) => (
                <circle key={idx} cx={pt.x} cy={pt.y} r="3.5" />
              ))
            : [
                [8, 132],
                [48, 106],
                [86, 82],
                [124, 56],
                [164, 40],
                [204, 43],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
              ))}
        </g>
        <circle
          cx={lastDotX}
          cy={lastDotY}
          r="3.5"
          fill="white"
          stroke="#007c4a"
          strokeWidth="2"
        />
        <g transform={`translate(${tooltipX.toFixed(1)},${tooltipY.toFixed(1)})`}>
          <rect width="58" height="27" rx="4" fill="white" className="shadow-sm" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))" />
          <text
            x="29"
            y="12"
            textAnchor="middle"
            fill="#007c4a"
            fontFamily="Manrope, sans-serif"
            fontSize="8"
            fontWeight="700"
          >
            {displayVal} {unit}
          </text>
          <text
            x="29"
            y="21"
            textAnchor="middle"
            fill="#6b7a72"
            fontFamily="Manrope, sans-serif"
            fontSize="6"
          >
            {displayAge}
          </text>
        </g>
        <g fill="#52615a" fontFamily="Manrope, sans-serif" fontSize="7">
          <text x="6" y="166">
            0
          </text>
          <text x="46" y="166">
            6
          </text>
          <text x="83" y="166">
            12
          </text>
          <text x="122" y="166">
            18
          </text>
          <text x="161" y="166">
            24
          </text>
          <text x="216" y="166">
            30 (Bulan)
          </text>
        </g>
      </svg>
    </div>
  )
}
