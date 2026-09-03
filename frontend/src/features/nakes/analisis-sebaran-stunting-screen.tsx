import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, ArrowLeft, ChevronRight, ExternalLink, MapPin, Ruler, Users } from "lucide-react"
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

const trajectoryImage = "https://placehold.co/318x318"

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
        <div className="h-16 px-5 flex items-center gap-4">
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

      <div className="flex-1 flex flex-col">
        {/* Title */}
        <div className="px-5 py-6 flex flex-col gap-3">
          <h2 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
            Z-Score Engine
          </h2>
          <p className="text-slate-600 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
            Peta Distribusi Stunting &amp; Analisis Pertumbuhan
          </p>
        </div>

        {/* Ringkasan Kecamatan */}
        <div className="px-5 pb-6">
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
          <div className="px-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="pr-20 text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
                Klasifikasi Status Gizi
                <br />
                (Kemenkes RI)
              </h3>
              <button
                type="button"
                className="pl-2.5 flex items-center gap-1 shrink-0 cursor-pointer text-slate-600 transition-colors hover:text-emerald-800"
              >
                <span className="text-center text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
                  Lihat
                  <br />
                  Detail
                </span>
                <ChevronRight className="size-4 shrink-0" />
              </button>
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
        <div className="px-5 pb-8">
          <div className="p-4 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <h3 className="text-zinc-900 text-base font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
              Referensi Trajektori Pertumbuhan
            </h3>
            <div className="rounded-lg overflow-hidden">
              <img src={trajectoryImage} alt="Grafik trajektori pertumbuhan" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}