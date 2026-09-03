import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { ProfileHeader } from "../../components/kader/profile-header"
import { ProfileBottomNav } from "../../components/kader/profile-bottom-nav"
import { SvgIcon } from "../../components/ui/svg-icon"
import {
  getEducationMaterials,
  getKaderChildren,
  getKaderMeasurements,
  type Child,
  type EducationMaterial,
} from "../../lib/api"
import { useAuth } from "../../context/auth-context"
import kaderNavPaths from "../../assets/icon-kader-nav"
import kaderActionPaths from "../../assets/icon-kader-action"
import kaderReminderPaths from "../../assets/icon-kader-reminder"
import kaderTaskPaths from "../../assets/icon-kader-task"

const kaderEducationImage = "/images/poster-protein-hewani-cegah-stunting.png"
const kaderNewsImage = "/images/kegiatan-posyandu.png"
interface KaderNewsItem {
  id?: string
  image: string
  category: string
  categoryClass: string
  title: string
  time: string
  video_url?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}


function formatNewsTime(dateStr?: string): string {
  if (!dateStr) return "Baru saja"
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffHours < 1) return "Baru saja"
  if (diffHours < 24) return `${diffHours} jam yang lalu`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return "1 hari yang lalu"
  if (diffDays < 30) return `${diffDays} hari yang lalu`
  return `${Math.floor(diffDays / 30)} bulan yang lalu`
}

export function BerandaKader({
  onMaterial,
  onTasks,
  onProfile,
  onInput,
}: {
  onMaterial: () => void
  onTasks: () => void
  onProfile: () => void
  onInput: () => void
}) {
  const { user } = useAuth()
  const [unmeasuredCount, setUnmeasuredCount] = useState<number | null>(null)
  const [totalChildrenCount, setTotalChildrenCount] = useState<number | null>(null)
  const [nextChild, setNextChild] = useState<Child | null>(null)
  const [isLoadingTask, setIsLoadingTask] = useState(true)
  const [newsList, setNewsList] = useState<KaderNewsItem[]>([])

  useEffect(() => {
    let mounted = true
    async function loadStats() {
      try {
        const [children, measurements, educationData] = await Promise.all([
          getKaderChildren(100, 0).catch(() => [] as Child[]),
          getKaderMeasurements().catch(() => []),
          getEducationMaterials(10, 0).catch(() => [] as EducationMaterial[]),
        ])
        if (!mounted) return
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()
        const measuredIds = new Set(
          measurements
            .filter((m) => {
              const d = new Date(m.measured_at)
              return d.getFullYear() === currentYear && d.getMonth() === currentMonth
            })
            .map((m) => m.children_id)
        )
        const pending = children.filter((c) => !measuredIds.has(c.id))
        setTotalChildrenCount(children.length)
        setUnmeasuredCount(pending.length)
        setNextChild(pending.length > 0 ? pending[0] : null)
        setIsLoadingTask(false)

        if (Array.isArray(educationData) && educationData.length > 0) {
          const fallbackImages = [
            kaderEducationImage,
            kaderNewsImage,
            "https://images.unsplash.com/photo-1681378128359-a5c2492a3535?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
            "https://images.unsplash.com/photo-1655740005902-2436216b82b8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
          ]
          const mappedNews: KaderNewsItem[] = educationData.map((item, idx) => {
            const titleLower = item.title.toLowerCase()
            const isGizi = titleLower.includes("gizi") || titleLower.includes("mpasi") || titleLower.includes("nutrisi")
            const isKegiatan = titleLower.includes("kegiatan") || titleLower.includes("posyandu") || titleLower.includes("jadwal")
            const isResep = titleLower.includes("resep") || titleLower.includes("menu") || titleLower.includes("makan")

            const category = isGizi ? "Gizi" : isKegiatan ? "Kegiatan" : isResep ? "Resep" : "Edukasi"
            const categoryClass = isGizi
              ? "bg-[#cfe1f8] text-[#536478]"
              : isKegiatan
              ? "bg-[#e9f7ef] text-[#006d42]"
              : isResep
              ? "bg-[#fbefc8] text-[#765b06]"
              : "bg-[#e9f7ef] text-[#006d42]"

            return {
              id: item.id,
              image: fallbackImages[idx % fallbackImages.length],
              category,
              categoryClass,
              title: item.title,
              time: formatNewsTime(item.created_at),
              video_url: item.video_url,
            }
          })
          setNewsList(mappedNews)
        } else {
          setNewsList([])
        }
      } catch (err) {
        console.error("Failed to load kader stats:", err)
      }
    }
    loadStats()
    return () => {
      mounted = false
    }
  }, [])
  const todayFormatted = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]">
      <ProfileHeader title="Beranda" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl px-5 pb-10 pt-6 sm:px-8"
      >
        <section className="kader-hero rounded-2xl bg-[#e9f7ef] p-5 shadow-[0_8px_26px_rgba(0,109,66,0.06)] xl:flex xl:items-center xl:justify-between xl:gap-10 xl:p-8">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold leading-7 xl:text-2xl">
              Halo, {user?.name || "Kader"}!
            </h1>
            <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              {todayFormatted}
            </p>
          </div>
          <div className="mt-5 rounded-xl bg-white/70 p-3 xl:mt-0 xl:w-3/5 xl:p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941]">
                Tugas Hari Ini
              </p>
              {isLoadingTask ? (
                <span className="rounded-full bg-gray-100 px-2 py-1 font-['Manrope:Regular',sans-serif] text-[10px] text-gray-500">
                  Memuat tugas...
                </span>
              ) : (unmeasuredCount ?? 0) > 0 ? (
                <span className="rounded-full bg-[#ba1a1a]/10 px-2 py-1 font-['Manrope:Regular',sans-serif] text-[10px] text-[#ba1a1a]">
                  {unmeasuredCount} Belum Selesai
                </span>
              ) : (totalChildrenCount ?? 0) > 0 ? (
                <span className="rounded-full bg-[#e9f7ef] px-2 py-1 font-['Manrope:Regular',sans-serif] text-[10px] text-[#006d42]">
                  Semua Selesai
                </span>
              ) : (
                <span className="rounded-full bg-gray-100 px-2 py-1 font-['Manrope:Regular',sans-serif] text-[10px] text-gray-500">
                  0 Tugas
                </span>
              )}
            </div>
            <div className="flex min-w-0 items-center gap-3">
              {isLoadingTask ? (
                <>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#cfe1f8] text-[#536478] animate-pulse">
                    <SvgIcon path={kaderTaskPaths.p411f900} viewBox="0 0 8 20" className="h-5 w-2" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#536478]">
                      Memuat tugas...
                    </p>
                    <p className="mt-1 text-xs text-[#3e4941]">Mengambil data dari server</p>
                  </div>
                </>
              ) : nextChild ? (
                <>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#cfe1f8] font-['Plus_Jakarta_Sans:Bold',sans-serif] text-sm font-bold text-[#536478]">
                    {getInitials(nextChild.full_name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                      Pengukuran {nextChild.full_name}
                    </p>
                    <p className="mt-1 truncate text-xs text-[#3e4941]">
                      {nextChild.home_address || "Posyandu Balita"}
                    </p>
                  </div>
                </>
              ) : (totalChildrenCount ?? 0) > 0 ? (
                <>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e9f7ef] font-['Plus_Jakarta_Sans:Bold',sans-serif] text-sm font-bold text-[#006d42]">
                    ✓
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#006d42]">
                      Semua tugas selesai
                    </p>
                    <p className="mt-1 text-xs text-[#3e4941]">
                      Semua balita sudah diukur bulan ini
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-500">
                    <SvgIcon path={kaderTaskPaths.p411f900} viewBox="0 0 8 20" className="h-5 w-2" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                      Belum ada tugas
                    </p>
                    <p className="mt-1 text-xs text-[#3e4941]">Data balita belum tersedia</p>
                  </div>
                </>
              )}
              <button
                type="button"
                onClick={onTasks}
                className="grid size-8 shrink-0 place-items-center rounded-full bg-[#006d42] text-white transition hover:bg-[#005c38] active:scale-95 cursor-pointer"
                aria-label="Buka tugas"
              >
                <SvgIcon path={kaderTaskPaths.p4874b00} viewBox="0 0 5.55 9" className="h-2.5 w-1.5" />
              </button>
            </div>
          </div>
        </section>

        <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] xl:gap-8">
          <div className="space-y-6 xl:space-y-8">
            <section>
              <div className="flex items-end justify-between">
                <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                  Aksi Cepat
                </h2>
                <span className="text-xs text-[#63747a]">Pilih aktivitas</span>
              </div>
              <div className="mt-3 grid w-full max-w-[350px] grid-cols-2 gap-3 lg:max-w-none">
                <button
                  type="button"
                  onClick={onMaterial}
                  className="quick-action group relative min-w-0 overflow-hidden rounded-xl bg-white px-2 py-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-4"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative mx-auto grid size-12 place-items-center rounded-full bg-[#76d69f] text-[#005c38] transition-transform group-hover:scale-110">
                    <SvgIcon path={kaderNavPaths.pd44dd40} viewBox="0 0 18 18" className="size-[18px]" />
                  </span>
                  <span className="relative mt-3 block font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                    Edukasi
                    <br />
                    Kader
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onInput}
                  className="quick-action group min-w-0 rounded-xl bg-white px-2 py-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-4"
                >
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e3bf66] text-[#654000] transition-transform group-hover:scale-110">
                    <SvgIcon path={kaderActionPaths.p1eac3d80} viewBox="0 0 18 18" className="size-[18px]" />
                  </span>
                  <span className="mt-3 block font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                    Input
                    <br />
                    Pengukuran Balita
                  </span>
                </button>
              </div>
            </section>

            <section className="relative w-full max-w-[350px] overflow-hidden rounded-xl bg-[#f3f4f5] p-4 pl-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] lg:max-w-none">
              <div className="absolute inset-y-0 left-0 w-2 bg-[#ba1a1a]" />
              <div className="flex min-w-0 gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a]">
                  <SvgIcon path={kaderReminderPaths.p3f50100} viewBox="0 0 20 20.05" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                    Pengingat Penting
                  </h2>
                  <p className="mt-1 break-words text-sm leading-5 text-[#3e4941]">
                    Ada 5 balita di wilayah Anda yang belum melakukan pengukuran bulan ini.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="min-w-0 max-w-full xl:row-span-2">
            <div className="flex items-end justify-between">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                Berita &amp; Edukasi
              </h2>
              <button
                type="button"
                onClick={onMaterial}
                className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#006d42] transition-colors hover:underline cursor-pointer"
              >
                Lihat Semua
              </button>
            </div>
            <div className="news-scroll mt-3 flex w-full max-w-full snap-x snap-mandatory gap-3 overflow-x-scroll overscroll-x-contain pb-3 pr-5 touch-pan-x xl:pr-10">
              {newsList.length > 0 ? (
                newsList.map((item) => (
                  <article
                    key={item.id || item.title}
                    onClick={onMaterial}
                    className="news-card w-[78vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] xl:w-[360px] cursor-pointer"
                  >
                    <img src={item.image} alt="" className="h-36 w-full object-cover" />
                    <div className="p-3">
                      <span className={`inline-flex rounded px-2 py-0.5 font-['Manrope:Regular',sans-serif] text-[10px] ${item.categoryClass}`}>
                        {item.category}
                      </span>
                      <h3 className="mt-2 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold leading-5">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-[#63747a]">{item.time}</p>
                    </div>
                  </article>
                ))
              ) : (
                <div className="w-full p-6 bg-white rounded-xl text-center text-xs text-[#63747a] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                  Belum ada artikel atau berita edukasi terbaru.
                </div>
              )}
            </div>
          </section>
        </div>
      </motion.div>

      <ProfileBottomNav
        active="Beranda"
        onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMaterial={onMaterial}
        onTasks={onTasks}
        onProfile={onProfile}
      />
    </main>
  )
}