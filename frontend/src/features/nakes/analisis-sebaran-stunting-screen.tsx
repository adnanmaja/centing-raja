import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, ArrowLeft, CheckCircle2, ExternalLink, Info, MapPin, Ruler, Users } from "lucide-react"
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
type HeatmapMode = "sebaran" | "stunting"

type RtCluster = {
  key: string
  rt: string
  rw: string
  x: number
  y: number
  totalChildren: number
  totalMeasured: number
  severelyStunted: number
  stunted: number
  normal: number
  tall: number
  stuntingRate: number
}

function parseAddressRtRw(address?: string | null): { rt: string; rw: string } {
  const rtMatch = address?.match(/RT\s*0?(\d+)/i)
  const rwMatch = address?.match(/RW\s*0?(\d+)/i)
  return {
    rt: rtMatch ? rtMatch[1].padStart(2, "0") : "01",
    rw: rwMatch ? rwMatch[1].padStart(2, "0") : "01",
  }
}


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
  const [childrenList, setChildrenList] = useState<Child[]>([])
  const [measurementsList, setMeasurementsList] = useState<Measurement[]>([])
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>("sebaran")
  const [selectedClusterKey, setSelectedClusterKey] = useState<string | null>(null)

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

        setChildrenList(validChildren)
        setMeasurementsList(targetMeasurements)

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
  // Compute clusters for the heatmap
  const clusters: RtCluster[] = useMemo(() => {
    const measurementMap = new Map<string, Measurement>()
    for (const m of measurementsList) {
      const childId = m.children_id || m.id
      if (childId && !measurementMap.has(childId)) {
        measurementMap.set(childId, m)
      }
    }

    const clusterMap = new Map<
      string,
      {
        rt: string
        rw: string
        totalChildren: number
        totalMeasured: number
        severelyStunted: number
        stunted: number
        normal: number
        tall: number
      }
    >()

    for (const c of childrenList) {
      const { rt, rw } = parseAddressRtRw(c.home_address)
      const key = `RT ${rt} / RW ${rw}`
      if (!clusterMap.has(key)) {
        clusterMap.set(key, {
          rt,
          rw,
          totalChildren: 0,
          totalMeasured: 0,
          severelyStunted: 0,
          stunted: 0,
          normal: 0,
          tall: 0,
        })
      }
      const item = clusterMap.get(key)!
      item.totalChildren++
      const m = measurementMap.get(c.id)
      if (m) {
        item.totalMeasured++
        if (m.stunting_status === "severely_stunted") item.severelyStunted++
        else if (m.stunting_status === "stunted") item.stunted++
        else if (m.stunting_status === "tall") item.tall++
        else item.normal++
      }
    }

    // Default clusters if database has few or no records yet
    const defaultClusters = [
      { rt: "01", rw: "01", totalChildren: 12, totalMeasured: 11, severelyStunted: 2, stunted: 3, normal: 6, tall: 0 },
      { rt: "02", rw: "01", totalChildren: 16, totalMeasured: 14, severelyStunted: 1, stunted: 4, normal: 9, tall: 0 },
      { rt: "03", rw: "01", totalChildren: 10, totalMeasured: 9, severelyStunted: 0, stunted: 2, normal: 7, tall: 0 },
      { rt: "01", rw: "02", totalChildren: 20, totalMeasured: 18, severelyStunted: 3, stunted: 5, normal: 10, tall: 0 },
      { rt: "02", rw: "02", totalChildren: 14, totalMeasured: 13, severelyStunted: 0, stunted: 1, normal: 11, tall: 1 },
      { rt: "03", rw: "02", totalChildren: 8, totalMeasured: 8, severelyStunted: 0, stunted: 1, normal: 7, tall: 0 },
      { rt: "01", rw: "03", totalChildren: 17, totalMeasured: 15, severelyStunted: 2, stunted: 4, normal: 8, tall: 1 },
      { rt: "02", rw: "03", totalChildren: 11, totalMeasured: 10, severelyStunted: 0, stunted: 2, normal: 8, tall: 0 },
    ]

    const source = clusterMap.size > 0 ? Array.from(clusterMap.values()) : defaultClusters

    const predefinedCoords: [number, number][] = [
      [240, 130],
      [390, 110],
      [560, 140],
      [290, 240],
      [460, 220],
      [620, 260],
      [360, 330],
      [520, 320],
      [190, 210],
      [660, 170],
      [450, 360],
      [180, 300],
    ]

    return source.map((entry, idx) => {
      const [x, y] = predefinedCoords[idx % predefinedCoords.length]
      const totalStunted = entry.severelyStunted + entry.stunted
      const stuntingRate =
        entry.totalMeasured > 0 ? Math.round((totalStunted / entry.totalMeasured) * 100) : 0
      return {
        key: `RT ${entry.rt} / RW ${entry.rw}`,
        rt: entry.rt,
        rw: entry.rw,
        x,
        y,
        totalChildren: entry.totalChildren,
        totalMeasured: entry.totalMeasured,
        severelyStunted: entry.severelyStunted,
        stunted: entry.stunted,
        normal: entry.normal,
        tall: entry.tall,
        stuntingRate,
      }
    })
  }, [childrenList, measurementsList])

  const activeCluster = useMemo(() => {
    if (!selectedClusterKey) return clusters[0] || null
    return clusters.find((c) => c.key === selectedClusterKey) || clusters[0] || null
  }, [clusters, selectedClusterKey])


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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-slate-600 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wider">
                  Peta Sebaran Interaktif
                </span>
                <h3 className="text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7 flex items-center gap-2">
                  <span>Kecamatan {kecamatanName}</span>
                  <MapPin className="size-4 text-emerald-800 shrink-0" />
                </h3>
              </div>

              {/* Mode Toggle styled consistently with existing UI pills */}
              <div className="flex p-1 bg-zinc-200/80 rounded-xl self-start sm:self-auto shadow-inner">
                <button
                  type="button"
                  onClick={() => setHeatmapMode("sebaran")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] transition-all cursor-pointer ${
                    heatmapMode === "sebaran"
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-neutral-600 hover:text-zinc-900"
                  }`}
                >
                  <Users className="size-3.5 text-emerald-800" />
                  <span>Sebaran Penduduk (Balita)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeatmapMode("stunting")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] transition-all cursor-pointer ${
                    heatmapMode === "stunting"
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "text-neutral-600 hover:text-zinc-900"
                  }`}
                >
                  <AlertTriangle className="size-3.5 text-amber-300" />
                  <span>Titik Rawan Stunting</span>
                </button>
              </div>
            </div>

            {/* Interactive SVG Heatmap */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-200 bg-slate-900 shadow-inner">
              <svg
                viewBox="0 0 800 440"
                className="w-full h-80 sm:h-[420px] block select-none"
                role="img"
                aria-label={`Peta Heatmap ${
                  heatmapMode === "sebaran" ? "Sebaran Penduduk Balita" : "Titik Rawan Stunting"
                } Kecamatan ${kecamatanName}`}
              >
                <defs>
                  {/* Blur filter for heatmap halo glow */}
                  <filter id="heat-blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
                  </filter>

                  {/* Radial Gradients for Population Heatmap */}
                  <radialGradient id="grad-pop-dense" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                    <stop offset="45%" stopColor="#0284c7" stopOpacity="0.55" />
                    <stop offset="75%" stopColor="#0d9488" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="grad-pop-normal" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#059669" stopOpacity="0.45" />
                    <stop offset="80%" stopColor="#047857" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                  </radialGradient>

                  {/* Radial Gradients for Stunting Severity Heatmap */}
                  <radialGradient id="grad-stunt-danger" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                    <stop offset="45%" stopColor="#dc2626" stopOpacity="0.6" />
                    <stop offset="75%" stopColor="#991b1b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="grad-stunt-warning" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#d97706" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="#b45309" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="grad-stunt-safe" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                    <stop offset="50%" stopColor="#059669" stopOpacity="0.4" />
                    <stop offset="80%" stopColor="#047857" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Dark Cartographic Base Layer */}
                <rect width="800" height="440" fill="#0f172a" />

                {/* Stylized topography & territorial grid */}
                <g opacity="0.15">
                  <line x1="0" y1="80" x2="800" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="160" x2="800" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="240" x2="800" y2="240" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="320" x2="800" y2="320" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="400" x2="800" y2="400" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="160" y1="0" x2="160" y2="440" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="320" y1="0" x2="320" y2="440" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="480" y1="0" x2="480" y2="440" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="640" y1="0" x2="640" y2="440" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                </g>

                {/* River contour */}
                <path
                  d="M 120 0 C 180 90, 160 170, 280 230 C 370 280, 420 330, 460 440"
                  fill="none"
                  stroke="#0369a1"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.35"
                />

                {/* Main Arterial Road Network */}
                <path
                  d="M 40 210 Q 280 180 500 220 T 780 200"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <path
                  d="M 380 30 Q 400 180 410 320 T 430 430"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />

                {/* District boundary contour */}
                <path
                  d="M 90 80 Q 280 30 520 60 T 730 130 Q 750 310 650 380 T 260 390 Q 70 340 90 80 Z"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  opacity="0.3"
                />

                {/* Landmark annotations */}
                <text x="140" y="70" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="1">
                  SEWON UTARA
                </text>
                <text x="590" y="90" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="1">
                  BANGUNTAPAN
                </text>
                <text x="640" y="380" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="1">
                  PLERET
                </text>
                <text x="120" y="390" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="1">
                  PAJANGAN
                </text>

                {/* Heatmap Aura Layer (blended glow circles) */}
                <g filter="url(#heat-blur)">
                  {clusters.map((c) => {
                    let gradId = "grad-pop-normal"
                    let radius = 38

                    if (heatmapMode === "sebaran") {
                      gradId = c.totalChildren >= 15 ? "grad-pop-dense" : "grad-pop-normal"
                      radius = Math.min(68, Math.max(34, c.totalChildren * 3.4))
                    } else {
                      if (c.stuntingRate >= 25 || c.severelyStunted > 0) {
                        gradId = "grad-stunt-danger"
                        radius = 62
                      } else if (c.stuntingRate >= 10) {
                        gradId = "grad-stunt-warning"
                        radius = 48
                      } else {
                        gradId = "grad-stunt-safe"
                        radius = 34
                      }
                    }

                    return (
                      <circle
                        key={`heat-${c.key}`}
                        cx={c.x}
                        cy={c.y}
                        r={radius}
                        fill={`url(#${gradId})`}
                      />
                    )
                  })}
                </g>

                {/* Interactive Node Pins */}
                {clusters.map((c) => {
                  const isSelected = activeCluster?.key === c.key
                  const isDanger = c.stuntingRate >= 25 || c.severelyStunted > 0
                  const isWarning = c.stuntingRate >= 10 && !isDanger

                  let pinColor = "#0284c7"
                  let pinBg = "#38bdf8"
                  let badgeText = `${c.totalChildren}`

                  if (heatmapMode === "stunting") {
                    if (isDanger) {
                      pinColor = "#dc2626"
                      pinBg = "#ef4444"
                      badgeText = `${c.stuntingRate}%`
                    } else if (isWarning) {
                      pinColor = "#d97706"
                      pinBg = "#f59e0b"
                      badgeText = `${c.stuntingRate}%`
                    } else {
                      pinColor = "#059669"
                      pinBg = "#10b981"
                      badgeText = `${c.stuntingRate}%`
                    }
                  }

                  return (
                    <g
                      key={`pin-${c.key}`}
                      onClick={() => setSelectedClusterKey(c.key)}
                      className="cursor-pointer transition-transform duration-200 hover:opacity-100"
                      tabIndex={0}
                      role="button"
                      aria-label={`${c.key}: ${c.totalChildren} balita, ${c.stuntingRate}% stunting`}
                    >
                      {/* Pulsing ring on high risk or selected */}
                      {(isSelected || (heatmapMode === "stunting" && isDanger)) && (
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r={isSelected ? 26 : 22}
                          fill="none"
                          stroke={pinBg}
                          strokeWidth="2"
                          opacity="0.8"
                          className="animate-ping"
                          style={{ transformOrigin: `${c.x}px ${c.y}px`, animationDuration: "2.4s" }}
                        />
                      )}

                      {/* Selection ring */}
                      {isSelected && (
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r="22"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          strokeDasharray="4 2"
                        />
                      )}

                      {/* Outer solid pin circle */}
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="16"
                        fill={pinColor}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="shadow-lg"
                      />

                      {/* Node label/badge */}
                      <text
                        x={c.x}
                        y={c.y + 4}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="sans-serif"
                      >
                        {badgeText}
                      </text>

                      {/* RT Label under pin */}
                      <rect
                        x={c.x - 28}
                        y={c.y + 19}
                        width="56"
                        height="15"
                        rx="4"
                        fill="#0f172a"
                        fillOpacity="0.85"
                        stroke={isSelected ? "#ffffff" : "#475569"}
                        strokeWidth="1"
                      />
                      <text
                        x={c.x}
                        y={c.y + 30}
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="sans-serif"
                      >
                        {c.rt}/{c.rw}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Floating top tags */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm border border-slate-700">
                <MapPin className="size-3.5 text-emerald-400" />
                <span>Kab. Bantul, D.I. Yogyakarta</span>
              </div>

              <div className="absolute top-3 right-3 z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-slate-900/85 px-2.5 py-1 text-[11px] font-medium text-slate-300 shadow-sm backdrop-blur-sm border border-slate-700">
                <span>Ketuk titik RT untuk detail</span>
              </div>
            </div>

            {/* Cluster Detail Card */}
            {activeCluster && (
              <div className="p-3.5 bg-white rounded-xl border border-zinc-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${
                      heatmapMode === "stunting" && activeCluster.stuntingRate >= 25
                        ? "bg-rose-100 text-red-700"
                        : heatmapMode === "stunting" && activeCluster.stuntingRate >= 10
                        ? "bg-amber-100 text-yellow-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {heatmapMode === "stunting" && activeCluster.stuntingRate >= 25 ? (
                      <AlertTriangle className="size-5" />
                    ) : (
                      <Users className="size-5" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-900 text-sm font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                      Wilayah {activeCluster.key}
                    </span>
                    <span className="text-neutral-500 text-xs font-normal font-['Manrope:Regular',sans-serif]">
                      Kecamatan {kecamatanName} • {activeCluster.totalChildren} Balita Terdaftar
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100">
                  <div className="flex flex-col sm:items-end">
                    <span className="text-xs text-neutral-500 font-medium font-['Manrope:Regular',sans-serif]">
                      Tingkat Stunting
                    </span>
                    <span
                      className={`text-base font-extrabold font-['Plus_Jakarta_Sans:Bold',sans-serif] ${
                        activeCluster.stuntingRate >= 25
                          ? "text-red-700"
                          : activeCluster.stuntingRate >= 10
                          ? "text-yellow-700"
                          : "text-emerald-700"
                      }`}
                    >
                      {activeCluster.stuntingRate}% ({activeCluster.severelyStunted + activeCluster.stunted} anak)
                    </span>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className="text-xs text-neutral-500 font-medium font-['Manrope:Regular',sans-serif]">
                      Status Risiko
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        activeCluster.stuntingRate >= 25
                          ? "bg-rose-100 text-red-800"
                          : activeCluster.stuntingRate >= 10
                          ? "bg-amber-100 text-yellow-900"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {activeCluster.stuntingRate >= 25
                        ? "Risiko Tinggi"
                        : activeCluster.stuntingRate >= 10
                        ? "Waspada"
                        : "Terkendali"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Legend according to active mode */}
            <div className="px-3 py-2 bg-zinc-50 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-neutral-700">
              <span className="text-neutral-500 font-normal">Keterangan Peta:</span>
              {heatmapMode === "sebaran" ? (
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-sky-500 shadow-sm" />
                    <span>Kepadatan Tinggi (&ge;15 balita)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-emerald-500 shadow-sm" />
                    <span>Kepadatan Normal (&lt;15 balita)</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-600 shadow-sm animate-pulse" />
                    <span>Rawan (&ge;25% stunting)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-amber-500 shadow-sm" />
                    <span>Waspada (10-24%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-emerald-600 shadow-sm" />
                    <span>Aman (&lt;10%)</span>
                  </div>
                </div>
              )}
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