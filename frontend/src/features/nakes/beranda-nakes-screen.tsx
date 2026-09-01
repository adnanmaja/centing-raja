import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, CheckCircle2, ChevronRight, ClipboardList, Map } from "lucide-react"

import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"
import { NakesGrowthTrendChart } from "../../components/nakes/nakes-growth-trend-chart"
import { getNakesChildren, getNakesMeasurements, type Child, type Measurement } from "../../lib/api"

const infoKaderImage = "/images/foto-kader.png"
const giziAnakImage = "/images/piring-mpasi-seimbang.png"

const trendData = [
  { day: "1", value: 4.0 },
  { day: "8", value: 3.7 },
  { day: "15", value: 3.4 },
  { day: "22", value: 3.1 },
  { day: "29", value: 2.8 },
]

const articles = [
  {
    category: "INFO KADER",
    categoryColor: "text-[#007c4a]",
    title: "Panduan Pengukuran Antropometri Terbaru 2024",
    time: "2 Hari yang lalu",
    image: infoKaderImage,
  },
  {
    category: "GIZI ANAK",
    categoryColor: "text-slate-600",
    title: "Resep MPASI Tinggi Protein untuk Kejar Tumbuh",
    time: "5 Hari yang lalu",
    image: giziAnakImage,
  },
]

export function BerandaNakesScreen() {
  const navigate = useNavigate()
  const [totalBalita, setTotalBalita] = useState<number>(0)
  const [monitoringCoverage, setMonitoringCoverage] = useState<number>(0)
  const [activeTasks, setActiveTasks] = useState<number>(0)

  useEffect(() => {
    let active = true
    async function loadStats() {
      try {
        const [children, measurements] = await Promise.all([
          getNakesChildren(100, 0),
          getNakesMeasurements(100, 0).catch(() => [] as Measurement[]),
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
            data={trendData}
            summary="Tren prevalensi stunting menurun sebesar 1.2% dalam 30 hari terakhir (4.0% ke 2.8%)."
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
              className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-emerald-800"
            >
              Lihat Semua
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2">
            {articles.map((article) => (
              <article
                key={article.title}
                className="min-w-60 sm:min-w-0 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col"
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
            ))}

            <button
              type="button"
              className="min-w-60 sm:min-w-0 p-4 bg-zinc-100 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-2"
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