import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Info } from "lucide-react"
import type { Measurement } from "../../lib/api"

type Metric = "Tinggi Badan" | "Berat Badan"

function GrowthChart({
  metric,
  measurements,
}: {
  metric: Metric
  measurements?: Measurement[]
}) {
  const isHeight = metric === "Tinggi Badan"
  const unit = isHeight ? "cm" : "kg"

  const sorted =
    measurements && measurements.length > 0
      ? [...measurements].sort(
          (a, b) => new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime()
        )
      : []

  const defaultPoints = [
    [8, isHeight ? 132 : 134],
    [48, isHeight ? 106 : 110],
    [86, isHeight ? 82 : 86],
    [124, isHeight ? 56 : 66],
    [164, isHeight ? 40 : 50],
    [204, isHeight ? 43 : 52],
  ]

  const calculatedPoints =
    sorted.length > 0
      ? sorted.map((m, idx) => {
          const val = isHeight ? Number(m.height) || 75 : Number(m.weight) || 9
          const ageMonths = Number(m.age) || idx * 6
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
          return [Math.round(x), Math.round(y)]
        })
      : defaultPoints

  const defaultLine = isHeight
    ? "M8 132 L48 106 L86 82 L124 56 L164 40 L204 43 L244 27"
    : "M8 134 L48 110 L86 86 L124 66 L164 50 L204 52 L244 42"

  const line =
    calculatedPoints.length > 1
      ? calculatedPoints.reduce(
          (acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"}${pt[0]} ${pt[1]}`,
          ""
        )
      : defaultLine

  const latestPt = calculatedPoints[calculatedPoints.length - 1]
  const lastMeasurement = sorted.length > 0 ? sorted[sorted.length - 1] : null
  const value = lastMeasurement
    ? String(isHeight ? lastMeasurement.height : lastMeasurement.weight)
    : isHeight
    ? "92"
    : "14.2"
  const ageLabel = lastMeasurement ? `Bulan ${Math.round(Number(lastMeasurement.age))}` : "Bulan 30"

  return (
    <div className="mx-auto w-full max-w-2xl overflow-visible">
      <svg
        viewBox="0 0 260 168"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`Grafik ${metric}`}
      >
        <defs>
          <linearGradient id="nakesGrowthFill" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#8ee0ad" stopOpacity="0.32" />
            <stop offset="1" stopColor="#8ee0ad" stopOpacity="0.14" />
          </linearGradient>
        </defs>

        <path d="M0 58H260M0 102H260" stroke="#e8efeb" strokeDasharray="3 4" />

        <path d={`${line} L244 154 L8 154 Z`} fill="url(#nakesGrowthFill)" />

        <path
          d={line}
          fill="none"
          stroke="#007c4a"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />

        <path d="M224 12V154" stroke="#87c6a1" strokeDasharray="2 2" />

        <g fill="white" stroke="#007c4a" strokeWidth="2">
          {calculatedPoints.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
          ))}
        </g>

        <circle cx={latestPt[0]} cy={latestPt[1]} r="3.5" fill="white" stroke="#007c4a" strokeWidth="2" />

        <g transform="translate(191,18)">
          <rect width="58" height="27" rx="4" fill="white" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.10))" }} />
          <text
            x="29"
            y="12"
            textAnchor="middle"
            fill="#007c4a"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontSize="8"
            fontWeight="700"
          >
            {value} {unit}
          </text>
          <text
            x="29"
            y="21"
            textAnchor="middle"
            fill="#52615a"
            fontFamily="Manrope, sans-serif"
            fontSize="6"
          >
            {ageLabel}
          </text>
        </g>

        <g fill="#52615a" fontFamily="Manrope, sans-serif" fontSize="7">
          <text x="6" y="166">0</text>
          <text x="46" y="166">6</text>
          <text x="83" y="166">12</text>
          <text x="122" y="166">18</text>
          <text x="161" y="166">24</text>
          <text x="216" y="166">30 (Bulan)</text>
        </g>
      </svg>
    </div>
  )
}

export function GrafikPertumbuhanNakesScreen() {
  const navigate = useNavigate()
  const location = useLocation()

  const state = (location.state ?? {}) as {
    anak?: { nama: string }
    measurements?: Measurement[]
  }

  const anak = state.anak ?? { nama: "Leo M." }
  const measurements = state.measurements

  const [metric, setMetric] = useState<Metric>("Tinggi Badan")
  return (
    <main className="min-h-svh bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-30 bg-gray-50/80 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 h-16 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-11 rounded-full flex items-center justify-center text-zinc-900 cursor-pointer transition-colors hover:bg-zinc-100 active:scale-95"
            aria-label="Kembali"
          >
            <ArrowLeft className="size-4" />
          </button>
          <h1 className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
            Grafik Pertumbuhan
          </h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-6 flex flex-col gap-6">
        <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif]">
          Pertumbuhan {anak.nama} berdasarkan riwayat pengukuran.
        </p>

        <div className="bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden sm:max-w-2xl">
          <div className="px-4 pt-4 flex items-center justify-between">
            <h2 className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
              Grafik Tumbuh Kembang
            </h2>
            <button
              type="button"
              className="size-8 rounded-full flex items-center justify-center bg-gray-50 cursor-pointer transition-colors hover:bg-gray-100"
              aria-label="Info grafik"
            >
              <Info className="size-3.5 text-neutral-700" />
            </button>
          </div>

          <div className="pt-4 px-4 flex gap-2">
            {(["Tinggi Badan", "Berat Badan"] as Metric[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMetric(m)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4 cursor-pointer transition-colors ${
                  metric === m
                    ? "bg-emerald-300 text-emerald-800"
                    : "bg-gray-50 text-neutral-700 hover:bg-gray-100"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="p-4">
            <GrowthChart key={metric} metric={metric} measurements={measurements} />
          </div>
        </div>
      </div>
    </main>
  )
}