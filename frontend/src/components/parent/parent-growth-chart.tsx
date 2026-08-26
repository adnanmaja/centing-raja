export function ParentGrowthChart({
  metric,
}: {
  metric: "Tinggi Badan" | "Berat Badan"
}) {
  const isHeight = metric === "Tinggi Badan"

  const value = isHeight ? "92" : "14.2"

  const unit = isHeight ? "cm" : "kg"

  const line = isHeight
    ? "M8 132 L48 106 L86 82 L124 56 L164 40 L204 43 L244 27"
    : "M8 134 L48 110 L86 86 L124 66 L164 50 L204 52 L244 42"

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
        <path d="M224 12V154" stroke="#87c6a1" strokeDasharray="2 2" />
        <g
          className="parent-chart-dots"
          fill="white"
          stroke="#007c4a"
          strokeWidth="2"
        >
          {[
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
          cx="204"
          cy={isHeight ? 43 : 52}
          r="3.5"
          fill="white"
          stroke="#007c4a"
          strokeWidth="2"
        />
        <g transform="translate(191,18)">
          <rect width="58" height="27" rx="4" fill="white" />
          <text
            x="29"
            y="12"
            textAnchor="middle"
            fill="#007c4a"
            fontFamily="Manrope, sans-serif"
            fontSize="8"
            fontWeight="700"
          >
            {value} {unit}
          </text>
          <text
            x="29"
            y="21"
            textAnchor="middle"
            fill="#6b7a72"
            fontFamily="Manrope, sans-serif"
            fontSize="6"
          >
            Bulan 30
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
