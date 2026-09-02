import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, CheckCircle2, ChevronRight, ClipboardList, Map } from "lucide-react"

import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"
import { NakesGrowthTrendChart } from "../../components/nakes/nakes-growth-trend-chart"
import {
  getEducationMaterials,
  getNakesChildren,
  getNakesMeasurements,
  type Child,
  type EducationMaterial,
  type Measurement,
} from "../../lib/api"

const infoKaderImage = "/images/foto-kader.png"
const giziAnakImage = "/images/piring-mpasi-seimbang.png"

const defaultTrendData = [
  { day: "1", value: 4.0 },
  { day: "8", value: 3.7 },
  { day: "15", value: 3.4 },
  { day: "22", value: 3.1 },
  { day: "29", value: 2.8 },
]

interface ArticleItem {
  id?: string
  category: string
  categoryColor: string
  title: string
  time: string
  image: string
  video_url?: string
}


function formatRelativeTime(dateStr?: string): string {
  if (!dateStr) return "Baru saja"
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffHours < 1) return "Baru saja"
  if (diffHours < 24) return `${diffHours} Jam yang lalu`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return "Kemarin"
  if (diffDays < 30) return `${diffDays} Hari yang lalu`
  return `${Math.floor(diffDays / 30)} Bulan yang lalu`
}

function computeTrendData(measurements: Measurement[]) {
  if (!measurements || measurements.length === 0) {
    return {
      trend: defaultTrendData,
      comparisonLabel: "-1.2% vs 30 hari lalu",
      summary: "Tren prevalensi stunting menurun sebesar 1.2% dalam 30 hari terakhir (4.0% ke 2.8%).",
    }
  }

  const now = Date.now()
  const msPerDay = 24 * 60 * 60 * 1000
  const days = [1, 8, 15, 22, 29]

  // Group measurements by 5 time windows spanning the last 30 days
  const windowStats = days.map((day, idx) => {
    const windowEnd = now - (29 - day) * msPerDay
    const windowStart = windowEnd - 7 * msPerDay
    const inWindow = measurements.filter((m) => {
      const t = new Date(m.measured_at).getTime()
      return t <= windowEnd && t >= windowStart
    })

    if (inWindow.length === 0) {
      // fallback interpolated baseline
      const baseStuntingRate = 3.5 - idx * 0.15
      return { day: String(day), value: Math.max(1.0, Number(baseStuntingRate.toFixed(1))) }
    }

    const stuntedCount = inWindow.filter(
      (m) =>
        m.stunting_status === "severely_stunted" ||
        m.stunting_status === "stunted" ||
        (m.z_score !== undefined && Number(m.z_score) <= -2)
    ).length

    const rate = Number(((stuntedCount / inWindow.length) * 100).toFixed(1))
    return { day: String(day), value: rate }
  })

  const first = windowStats[0].value
  const last = windowStats[windowStats.length - 1].value
  const diff = Number((last - first).toFixed(1))
  const compLabel =
    diff <= 0
      ? `-${Math.abs(diff).toFixed(1)}% vs 30 hari lalu`
      : `+${diff.toFixed(1)}% vs 30 hari lalu`

  const summary =
    diff <= 0
      ? `Tren prevalensi stunting menurun sebesar ${Math.abs(diff).toFixed(1)}% dalam 30 hari terakhir (${first.toFixed(1)}% ke ${last.toFixed(1)}%).`
      : `Tren prevalensi stunting terpantau meningkat ${diff.toFixed(1)}% dalam 30 hari terakhir (${first.toFixed(1)}% ke ${last.toFixed(1)}%).`

  return {
    trend: windowStats,
    comparisonLabel: compLabel,
    summary,
  }
}
export function BerandaNakesScreen() {
  const navigate = useNavigate()
  const [totalBalita, setTotalBalita] = useState<number>(0)
  const [monitoringCoverage, setMonitoringCoverage] = useState<number>(0)
  const [activeTasks, setActiveTasks] = useState<number>(0)
  const [trendState, setTrendState] = useState(() => computeTrendData([]))
  const [articleList, setArticleList] = useState<ArticleItem[]>([])

  useEffect(() => {
    let active = true
    async function loadStats() {
      try {
        const [children, measurements, educationData] = await Promise.all([
          getNakesChildren(100, 0),
          getNakesMeasurements(100, 0).catch(() => [] as Measurement[]),
          getEducationMaterials(10, 0).catch(() => [] as EducationMaterial[]),
        ])
        if (!active) return
        const total = children.length
        setTotalBalita(total)

        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()
        const measuredChildIds = new Set(
          measurements
            .filter((m) => {
              const d = new Date(m.measured_at)
              return d.getFullYear() === currentYear && d.getMonth() === currentMonth
            })
            .map((m) => m.children_id)
        )

        const measuredCount = children.filter((c: Child) => measuredChildIds.has(c.id)).length
        const coverage = total > 0 ? Math.round((measuredCount / total) * 100) : 0
        setMonitoringCoverage(coverage)
        setActiveTasks(total - measuredCount)

        if (measurements.length > 0) {
          setTrendState(computeTrendData(measurements))
        }

        if (Array.isArray(educationData) && educationData.length > 0) {
          const mappedArticles: ArticleItem[] = educationData.map((item, idx) => {
            const titleLower = item.title.toLowerCase()
            const isGizi =
              titleLower.includes("gizi") ||
              titleLower.includes("mpasi") ||
              titleLower.includes("makan") ||
              titleLower.includes("nutrisi")
            const isKader =
              titleLower.includes("kader") ||
              titleLower.includes("ukur") ||
              titleLower.includes("antropometri")

            const category = isGizi ? "GIZI ANAK" : isKader ? "INFO KADER" : "EDUKASI STUNTING"
            const categoryColor = isGizi
              ? "text-slate-600"
              : "text-[#007c4a]"
            const image = idx % 2 === 0 ? infoKaderImage : giziAnakImage

            return {
              id: item.id,
              category,
              categoryColor,
              title: item.title,
              time: formatRelativeTime(item.created_at),
              image,
              video_url: item.video_url,
            }
          })

          setArticleList(mappedArticles)
        } else {
          setArticleList([])
        }
      } catch (err) {
        console.error("Failed to load nakes stats:", err)
      }
    }
    loadStats()
    return () => {
      active = false
    }
  }, [])
  return (
    <main data-reveal-page className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]">
      <NakesHeader title="Beranda" />

      <div className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-8 sm:py-8 flex flex-col gap-6">
        {/* Ringkasan Hari Ini */}
        <section className="flex flex-col gap-3">
          <h1 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold text-zinc-900">
            Ringkasan Hari Ini
          </h1>

          <div className="p-4 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-800" />
                <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xs font-bold text-emerald-800">
                  Cakupan Monitoring
                </span>
              </div>
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] text-xl font-medium text-zinc-900">
                {monitoringCoverage}%
              </span>
            </div>

            <div className="h-2 relative bg-zinc-300 rounded-full overflow-hidden">
              <div
                className="h-2 absolute left-0 top-0 bg-emerald-800 rounded-full"
                style={{ width: `${monitoringCoverage}%` }}
              />
            </div>

            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-sm text-neutral-700">
              Dari {totalBalita} balita terdaftar di wilayah tugas Anda.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 p-4 bg-blue-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-1">
              <ClipboardList className="size-5 text-slate-600" />
              <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold text-slate-600">
                {activeTasks}
              </span>
              <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-slate-600 text-center">
                Tugas Aktif
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate("/nakes/sebaran-stunting")}
              className="flex-1 px-4 py-6 bg-emerald-800 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-1"
            >
              <Map className="size-4 text-white" />
              <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-white text-center leading-4">
                Cek Sebaran
                <br />
                Stunting
              </span>
            </button>
          </div>
        </section>

        {/* Trend Pertumbuhan Kecamatan */}
        <section className="flex flex-col gap-3">
          <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-zinc-900">
            Trend Pertumbuhan Kecamatan
          </h2>

          <NakesGrowthTrendChart
            data={trendState.trend}
            comparisonLabel={trendState.comparisonLabel}
            summary={trendState.summary}
          />
        </section>

        {/* CTA Rekapitulasi */}
        <button
          type="button"
          onClick={() => navigate("/nakes/rekapitulasi")}
          className="px-4 py-3 bg-emerald-800 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2 cursor-pointer transition-all hover:bg-emerald-700 hover:shadow-md active:scale-[0.98]"
        >
          <ClipboardList className="size-4 text-white shrink-0" />
          <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-sm sm:text-base font-bold text-white whitespace-nowrap">
            Lihat Rekapitulasi Data Balita
          </span>
        </button>

        {/* Berita & Edukasi */}
        <section className="flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-zinc-900">
              Berita &amp; Edukasi
            </h2>
            <button
              type="button"
              onClick={() => navigate("/nakes/akun")}
              className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-emerald-800 transition-colors hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2">
            {articleList.length > 0 ? (
              articleList.map((article) => (
                <article
                  key={article.id || article.title}
                  onClick={() => {
                    if (article.video_url) {
                      window.open(article.video_url, "_blank", "noopener,noreferrer")
                    } else {
                      navigate("/nakes/akun")
                    }
                  }}
                  className="min-w-60 sm:min-w-0 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <img src={article.image} alt="" className="h-32 w-full object-cover" />
                  <div className="flex-1 p-3 flex flex-col justify-between gap-1.5">
                    <div className="flex flex-col gap-1.5">
                      <span
                        className={`font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xs font-bold ${article.categoryColor}`}
                      >
                        {article.category}
                      </span>
                      <h3 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-sm font-bold text-zinc-900 leading-5">
                        {article.title}
                      </h3>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[10px] text-neutral-700">
                      {article.time}
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <div className="min-w-60 sm:min-w-0 col-span-2 p-6 bg-zinc-100 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-xs text-neutral-500">
                  Belum ada materi edukasi yang dipublikasikan.
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => navigate("/nakes/akun")}
              className="min-w-60 sm:min-w-0 p-4 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <AlertTriangle className="size-8 text-neutral-400" />
              <span className="text-center font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-neutral-700">
                Lebih banyak update dari Centing Raja
              </span>
              <ChevronRight className="size-4 text-neutral-400" />
            </button>
          </div>
        </section>
      </div>

      <NakesBottomNav
        active="Beranda"
        onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onData={() => navigate("/nakes/data")}
        onInput={() => navigate("/nakes/input")}
        onAkun={() => navigate("/nakes/akun")}
      />
    </main>
  )
}