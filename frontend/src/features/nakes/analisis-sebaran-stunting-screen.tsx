import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, ArrowLeft, ExternalLink, MapPin, Ruler, Users } from "lucide-react"
import { getNakesChildren, getNakesMeasurements, type Child, type Measurement } from "../../lib/api"
type StatusGizi = {
  label: string
  sdRange: string
  description: string
  count: number
  countUnknown?: boolean
  iconBg: string
  iconColor: string
  labelColor: string
  barColor: string
  barHeight: string
}

const statusGiziList: StatusGizi[] = [
  {
    label: "Sangat Pendek",
    sdRange: "<-3 SD",
    description: "Risiko stunting berat, memerlukan intervensi gizi segera.",
    count: 0,
    iconBg: "bg-rose-200",
    iconColor: "text-red-800",
    labelColor: "text-red-700",
    barColor: "bg-red-700",
    barHeight: "h-28",
  },
  {
    label: "Pendek",
    sdRange: "-3 SD s/d < -2 SD",
    description: "Terindikasi stunting, perlu pemantauan gizi rutin.",
    count: 0,
    iconBg: "bg-orange-300",
    iconColor: "text-yellow-900",
    labelColor: "text-yellow-800",
    barColor: "bg-yellow-800",
    barHeight: "h-24",
  },
  {
    label: "Normal",
    sdRange: "-2 SD s/d +3 SD",
    description: "Pertumbuhan sesuai dengan kurva standar nasional.",
    count: 0,
    iconBg: "bg-transparent",
    iconColor: "text-emerald-800",
    labelColor: "text-emerald-800",
    barColor: "bg-emerald-800",
    barHeight: "h-28",
  },
  {
    label: "Tinggi",
    sdRange: ">+3 SD",
    description: "Pertumbuhan di atas rata-rata tinggi anak seusianya.",
    count: 0,
    iconBg: "bg-blue-100",
    iconColor: "text-slate-600",
    labelColor: "text-slate-600",
    barColor: "bg-slate-600",
    barHeight: "h-24",
  },
]

// Standar TB/PB menurut umur (cm), laki-laki, 0-24 bulan.
// Sumber: Standar Antropometri Anak (Permenkes No. 2 Tahun 2020 / WHO Child Growth Standards)
const MEDIAN_TBU = [
  49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7,
  76.9, 78.0, 79.1, 80.2, 81.2, 82.3, 83.2, 84.2, 85.1, 86.0, 86.9, 87.8,
]
const MIN2SD_TBU = [
  46.1, 50.8, 54.4, 57.3, 59.7, 61.7, 63.3, 64.8, 66.2, 67.5, 68.7, 69.9, 71.0,
  72.1, 73.1, 74.1, 75.0, 76.0, 76.9, 77.7, 78.6, 79.4, 80.2, 81.0, 81.7,
]
const MIN3SD_TBU = [
  44.2, 48.9, 52.4, 55.3, 57.6, 59.6, 61.2, 62.7, 64.0, 65.2, 66.4, 67.6, 68.6,
  69.6, 70.6, 71.6, 72.5, 73.3, 74.2, 75.0, 75.8, 76.5, 77.2, 78.0, 78.7,
]

function TrajectoryChart() {
  const W = 600
  const H = 320
  const left = 44
  const right = 20
  const top = 16
  const bottom = 44
  const yMin = 40
  const yMax = 95
  const maxMonth = 24

  const x = (m: number) => left + (m / maxMonth) * (W - left - right)
  const y = (v: number) => H - bottom - ((v - yMin) / (yMax - yMin)) * (H - top - bottom)

  const toPath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")

  const yTicks = [40, 50, 60, 70, 80, 90]
  const xTicks = [0, 3, 6, 9, 12, 15, 18, 21, 24]

  return (
    <div className="flex flex-col gap-3">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-80"
        role="img"
        aria-label="Grafik trajektori pertumbuhan tinggi badan menurut umur"
      >
        <rect x="0" y="0" width={W} height={H} fill="#ffffff" rx="8" />

        {yTicks.map((t) => (
          <g key={`y-${t}`}>
            <line x1={left} x2={W - right} y1={y(t)} y2={y(t)} stroke="#e4e4e7" strokeWidth="1" />
            <text x={left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#475569">
              {t}
            </text>
          </g>
        ))}

        {xTicks.map((t) => (
          <g key={`x-${t}`}>
            <line x1={x(t)} x2={x(t)} y1={top} y2={H - bottom} stroke="#f4f4f5" strokeWidth="1" />
            <text x={x(t)} y={H - bottom + 16} textAnchor="middle" fontSize="11" fill="#475569">
              {t}
            </text>
          </g>
        ))}

        <text x={(left + W - right) / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="#475569">
          Umur (bulan)
        </text>
        <text
          x={12}
          y={(top + H - bottom) / 2}
          textAnchor="middle"
          fontSize="11"
          fill="#475569"
          transform={`rotate(-90 12 ${(top + H - bottom) / 2})`}
        >
          Tinggi badan (cm)
        </text>

        {/* Area normal: -2 SD sampai median ke atas dibatasi oleh garis */}
        <path d={toPath(MIN3SD_TBU)} fill="none" stroke="#b91c1c" strokeWidth="2" strokeDasharray="5 4" />
        <path d={toPath(MIN2SD_TBU)} fill="none" stroke="#a16207" strokeWidth="2" strokeDasharray="5 4" />
        <path d={toPath(MEDIAN_TBU)} fill="none" stroke="#065f46" strokeWidth="2.5" />
      </svg>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-0.5 bg-emerald-800" />
          Median
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 border-t-2 border-dashed border-yellow-700" />
          -2 SD (batas stunting)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 border-t-2 border-dashed border-red-700" />
          -3 SD (sangat pendek)
        </span>
      </div>

      <p className="text-slate-600 text-[11px] leading-4 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
        Kurva TB/U laki-laki usia 0-24 bulan. Sumber: Standar Antropometri Anak, Permenkes RI No. 2 Tahun 2020.
      </p>
    </div>
  )
}

export function AnalisisSebaranStuntingScreen() {
  const navigate = useNavigate()
  const [statusList, setStatusList] = useState<StatusGizi[]>(statusGiziList)
  const [totalMeasured, setTotalMeasured] = useState(0)
  const [coverageRate, setCoverageRate] = useState(0)
  const [kecamatanName, setKecamatanName] = useState("Bantul")
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let active = true
    setIsLoading(true)

    Promise.all([
      getNakesChildren(200, 0).catch(() => [] as Child[]),
      getNakesMeasurements(500, 0).catch(() => [] as Measurement[]),
    ])
      .then(([children, measurements]) => {
        if (!active) return

        if (Array.isArray(children) && children.length > 0) {
          // infer kecamatan from child home addresses
          for (const c of children) {
            if (c.home_address) {
              const parts = c.home_address.split(",")
              if (parts.length > 0 && parts[0].trim().length > 2) {
                setKecamatanName(parts[0].trim())
                break
              }
            }
          }
        }

        const validMeasurements = Array.isArray(measurements) ? measurements : []
        const validChildren = Array.isArray(children) ? children : []

        // Group latest measurement per child for accurate cross-sectional analysis
        const latestMeasurementsByChild = new Map<string, Measurement>()
        const sortedMeasurements = [...validMeasurements].sort(
          (a, b) => new Date(b.measured_at).getTime() - new Date(a.measured_at).getTime()
        )
        for (const m of sortedMeasurements) {
          const childKey = m.children_id || m.id
          if (!latestMeasurementsByChild.has(childKey)) {
            latestMeasurementsByChild.set(childKey, m)
          }
        }

        const targetMeasurements =
          latestMeasurementsByChild.size > 0
            ? Array.from(latestMeasurementsByChild.values())
            : validMeasurements

        let severelyCount = 0
        let stuntedCount = 0
        let normalCount = 0
        let tallCount = 0

        for (const m of targetMeasurements) {
          if (m.stunting_status === "severely_stunted") severelyCount++
          else if (m.stunting_status === "stunted") stuntedCount++
          else if (m.stunting_status === "tall") tallCount++
          else normalCount++
        }

        const measuredCount = targetMeasurements.length
        const totalChildrenCount = Math.max(validChildren.length, measuredCount)
        const cov = totalChildrenCount > 0 ? Math.round((measuredCount / totalChildrenCount) * 100) : 0

        setTotalMeasured(measuredCount)
        setCoverageRate(cov)
        setStatusList([
          {
            ...statusGiziList[0],
            count: severelyCount,
          },
          {
            ...statusGiziList[1],
            count: stuntedCount,
          },
          {
            ...statusGiziList[2],
            count: normalCount,
          },
          {
            ...statusGiziList[3],
            count: tallCount,
          },
        ])
      })
      .catch((err) => {
        console.warn("[Centing] Failed to fetch data for analisis sebaran stunting:", err)
      })
      .finally(() => {
        if (active) {
          setIsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="min-h-svh bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-50/80 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl h-16 px-5 sm:px-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-full flex items-center justify-center text-zinc-900 cursor-pointer transition-all hover:bg-zinc-200/60 active:scale-95"
            aria-label="Kembali"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="flex-1 text-zinc-900 text-xl font-extrabold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
            Analisis Sebaran Stunting
          </h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col mx-auto w-full max-w-6xl">
        {/* Title */}
        <div className="px-5 sm:px-8 py-6 flex flex-col gap-3">
          <h2 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
            Z-Score Engine
          </h2>
          <p className="text-slate-600 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
            Peta Distribusi Stunting &amp; Analisis Pertumbuhan
          </p>
        </div>

        {/* Ringkasan Kecamatan */}
        <div className="px-5 sm:px-8 pb-6">
          <div className="p-4 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="pr-20 text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
                Ringkasan Kecamatan:
                <br />
                {kecamatanName}
              </h3>
              <MapPin className="size-4 text-emerald-800 shrink-0" />
            </div>

            <div className="relative rounded-xl overflow-hidden border border-zinc-200 bg-zinc-200 shadow-inner">
              <iframe
                title="Peta Wilayah Bantul"
                src="https://www.openstreetmap.org/export/embed.html?bbox=110.24%2C-7.98%2C110.44%2C-7.80&layer=mapnik&marker=-7.888%2C110.33"
                className="w-full h-72 border-0 block"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur-sm">
                <MapPin className="size-3.5 text-emerald-800" />
                <span>Kab. Bantul, D.I. Yogyakarta</span>
              </div>
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-rose-100/95 px-2.5 py-1 text-xs font-bold text-red-800 shadow-sm backdrop-blur-sm">
                <span className="size-2 rounded-full bg-red-600 animate-pulse" />
                <span>Area Pemantauan Stunting</span>
              </div>
              <a
                href="https://www.openstreetmap.org/?mlat=-7.888&mlon=110.33#map=12/-7.888/110.33"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur-sm hover:bg-white hover:text-emerald-800"
              >
                <span>Buka Peta</span>
                <ExternalLink className="size-3" />
              </a>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 p-3 bg-gray-50 rounded-lg flex flex-col gap-1">
                <span className="text-slate-600 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                  Total Anak Diukur
                </span>
                <span className="text-emerald-800 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
                  {isLoading ? "..." : totalMeasured.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex-1 p-3 bg-gray-50 rounded-lg flex flex-col gap-1">
                <span className="text-slate-600 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                  Cakupan Pengukuran
                </span>
                <span className="text-emerald-800 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
                  {isLoading ? "..." : `${coverageRate}%`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Klasifikasi Status Gizi */}
        <div className="pb-6">
          <div className="px-5 sm:px-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="pr-20 text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
                Klasifikasi Status Gizi
                <br />
                (Kemenkes RI)
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {statusList.map((status) => (
                <div
                  key={status.label}
                  className="p-4 relative bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center gap-4 overflow-hidden"
                >
                  <div
                    className={`absolute left-0 top-0 w-2 ${status.barHeight} ${status.barColor}`}
                  />
                  <div className={`size-12 ${status.iconBg} rounded-full flex items-center justify-center shrink-0`}>
                    {status.label === "Normal" ? (
                      <Ruler className={`size-5 ${status.iconColor}`} />
                    ) : status.label === "Tinggi" ? (
                      <Users className={`size-4 ${status.iconColor}`} />
                    ) : (
                      <AlertTriangle className={`size-4 ${status.iconColor}`} />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-900 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                        {status.label}
                      </span>
                      <span
                        className={`text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4 ${status.labelColor}`}
                      >
                        {status.sdRange}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
                      {status.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
                      {isLoading ? "..." : (status.countUnknown ? "—" : status.count.toLocaleString("id-ID"))}
                    </span>
                    <span className="text-slate-600 text-[10px] font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-4">
                      anak
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Referensi Trajektori Pertumbuhan */}
        <div className="px-5 sm:px-8 pb-8">
          <div className="p-4 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <h3 className="text-zinc-900 text-base font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
              Referensi Trajektori Pertumbuhan
            </h3>
            <div className="rounded-lg overflow-hidden">
              <TrajectoryChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}