import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Info } from "lucide-react"
import {
  getChildMeasurements,
  type Child,
  type Measurement,
} from "../../lib/api"


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

  const sorted = measurements
    ? [...measurements]
        .filter((measurement) => {
          const value = Number(isHeight ? measurement.height : measurement.weight)
          return Number.isFinite(value) && Number.isFinite(Number(measurement.age))
        })
        .sort(
          (a, b) =>
            new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime(),
        )
    : []

  if (sorted.length === 0) {
    return (
      <div className="rounded-xl bg-gray-50 p-8 text-center text-sm text-neutral-600">
        Belum ada data pengukuran untuk grafik ini.
      </div>
    )
  }

  const calculatedPoints = sorted.map((measurement) => {
    const value = Number(isHeight ? measurement.height : measurement.weight)
    const ageMonths = Number(measurement.age)
    const clampedAge = Math.min(30, Math.max(0, ageMonths))
    const x = 8 + (clampedAge / 30) * 236

    let y = 140
    if (isHeight) {
      const clampedValue = Math.min(110, Math.max(45, value))
      y = 154 - ((clampedValue - 45) / (110 - 45)) * 120
    } else {
      const clampedValue = Math.min(25, Math.max(2, value))
      y = 154 - ((clampedValue - 2) / (25 - 2)) * 120
    }
    return [Math.round(x), Math.round(y)] as [number, number]
  })

  const line =
    calculatedPoints.length > 1
      ? calculatedPoints.reduce(
          (acc, point, index) =>
            `${acc} ${index === 0 ? "M" : "L"}${point[0]} ${point[1]}`,
          "",
        )
      : `M${calculatedPoints[0][0]} ${calculatedPoints[0][1]}`

  const latestPoint = calculatedPoints[calculatedPoints.length - 1]
  const lastMeasurement = sorted[sorted.length - 1]
  const value = String(isHeight ? lastMeasurement.height : lastMeasurement.weight)
  const ageLabel = `Bulan ${Math.round(Number(lastMeasurement.age))}`

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

        {calculatedPoints.length > 1 && (
          <path d={`${line} L244 154 L8 154 Z`} fill="url(#nakesGrowthFill)" />
        )}

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

        <circle
          cx={latestPoint[0]}
          cy={latestPoint[1]}
          r="3.5"
          fill="white"
          stroke="#007c4a"
          strokeWidth="2"
        />

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
    child?: Child
    measurements?: Measurement[]
  }

  const [measurements, setMeasurements] = useState<Measurement[] | undefined>(
    state.measurements,
  )
  const [loading, setLoading] = useState(!state.measurements)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [metric, setMetric] = useState<Metric>("Tinggi Badan")

  useEffect(() => {
    if (state.measurements || !state.child?.id) {
      if (!state.measurements && !state.child?.id) {
        setErrorMessage(
          "Data anak tidak tersedia. Buka grafik dari detail pertumbuhan.",
        )
      }
      setLoading(false)
      return
    }

    let active = true
    getChildMeasurements(state.child.id)
      .then((data) => {
        if (active) setMeasurements(data)
      })
      .catch(() => {
        if (active) setErrorMessage("Riwayat pengukuran gagal dimuat.")
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [state.child?.id, state.measurements])

  const childName = state.child?.full_name || "Anak"

  return (
    <main className="flex min-h-svh flex-col bg-gray-50">
      <header className="sticky top-0 z-30 bg-gray-50/80 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex size-11 items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-zinc-100 active:scale-95"
            aria-label="Kembali"
          >
            <ArrowLeft className="size-4" />
          </button>
          <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold leading-7 text-zinc-900">
            Grafik Pertumbuhan
          </h1>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-6 sm:px-8">
        <p className="font-['Manrope:Regular',sans-serif] text-sm text-neutral-700">
          Pertumbuhan {childName} berdasarkan riwayat pengukuran.
        </p>

        {loading && (
          <p className="rounded-xl bg-white p-8 text-center text-sm text-neutral-600">
            Memuat riwayat pengukuran...
          </p>
        )}
        {errorMessage && (
          <p role="alert" className="rounded-xl bg-white p-8 text-center text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {!loading && !errorMessage && (
          <div className="max-w-2xl overflow-hidden rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between px-4 pt-4">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold leading-7 text-zinc-900">
                Grafik Tumbuh Kembang
              </h2>
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-full bg-gray-50 transition-colors hover:bg-gray-100"
                aria-label="Info grafik"
              >
                <Info className="size-3.5 text-neutral-700" />
              </button>
            </div>

            <div className="flex gap-2 px-4 pt-4">
              {(["Tinggi Badan", "Berat Badan"] as Metric[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMetric(item)}
                  className={`rounded-full px-4 py-1.5 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold transition-colors ${
                    metric === item
                      ? "bg-emerald-300 text-emerald-800"
                      : "bg-gray-50 text-neutral-700 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="p-4">
              <GrowthChart metric={metric} measurements={measurements} />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}