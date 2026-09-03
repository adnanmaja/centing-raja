import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MoreVertical, Pin, RotateCcw, Trash2 } from "lucide-react"

import { ProfileHeader } from "../../components/kader/profile-header"
import { ProfileBottomNav } from "../../components/kader/profile-bottom-nav"
import { ConfirmDeleteModal } from "../../components/ui/confirm-delete-modal"
import { SvgIcon } from "../../components/ui/svg-icon"
import { formatAge, getKaderChildren, getKaderMeasurements, type Child, type Measurement } from "../../lib/api"

import taskMeasurementPaths from "../../assets/icon-measurement"
import viewDataPaths from "../../assets/icon-view-data"
export type KaderChildTask = {
  id?: string
  name: string
  initials: string
  rt: string
  address: string
  age: string
  gender?: string
  deadline: string
  status: string
  tone: string
  overdue?: boolean
  done?: boolean
  pinned?: boolean
}

const tonePalette = [
  "bg-[#dceafe] text-[#4f6073]",
  "bg-[#fcebc8] text-[#765b06]",
  "bg-[#e7dcff] text-[#604fa3]",
  "bg-[#dff3eb] text-[#006d42]",
  "bg-[#ffd9d5] text-[#b3261e]",
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function parseRt(address?: string): { rt: string; street: string } {
  if (!address) return { rt: "RT 01 / RW 03", street: "Alamat belum diatur" }
  const rtMatch = address.match(/RT\s*\d+(\s*\/\s*RW\s*\d+)?/i)
  const rt = rtMatch ? rtMatch[0].toUpperCase() : "RT 01 / RW 03"
  return { rt, street: address }
}

export function TugasBulanIni({
  onHome,
  onMaterial,
  onViewData,
  onInput,
  onProfile,
}: {
  onHome: () => void
  onMaterial: () => void
  onViewData: (child?: KaderChildTask) => void
  onInput: (child?: KaderChildTask) => void
  onProfile: () => void
}) {
  const [activeRt, setActiveRt] = useState("Semua")
  const [children, setChildren] = useState<KaderChildTask[]>([])
  const [loading, setLoading] = useState(true)
  const [openMenuFor, setOpenMenuFor] = useState<string | null>(null)
  const [childToDelete, setChildToDelete] = useState<KaderChildTask | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadData() {
      try {
        const [childrenData, measurementsData] = await Promise.all([
          getKaderChildren(100, 0),
          getKaderMeasurements().catch(() => [] as Measurement[]),
        ])
        if (!mounted) return

        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()
        const measuredChildIds = new Set(
          measurementsData
            .filter((m) => {
              const d = new Date(m.measured_at)
              return d.getFullYear() === currentYear && d.getMonth() === currentMonth
            })
            .map((m) => m.children_id)
        )

        const mapped: KaderChildTask[] = childrenData.map((c: Child, idx: number) => {
          const isDone = measuredChildIds.has(c.id)
          const { rt, street } = parseRt(c.home_address)
          return {
            id: c.id,
            name: c.full_name,
            initials: getInitials(c.full_name),
            rt,
            address: street,
            age: formatAge(c.birth_date),
            gender: c.gender === "L" || c.gender === "Laki-laki" ? "Laki-laki" : "Perempuan",
            deadline: isDone ? "Tercatat: Bulan ini" : "Batas Waktu: Akhir Bulan",
            status: isDone ? "Selesai" : "Belum",
            tone: tonePalette[idx % tonePalette.length],
            done: isDone,
            overdue: false,
          }
        })
        setChildren(mapped)
      } catch (err) {
        console.error("Failed to load kader children:", err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadData()
    return () => {
      mounted = false
    }
  }, [])

  const currentPeriod = new Date().toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  })
  const totalCount = children.length
  const doneCount = children.filter((c) => c.done).length
  const pendingCount = totalCount - doneCount

  const uniqueRts = Array.from(
    new Set(
      children.map((c) => {
        const m = c.rt.match(/RT\s*\d+/i)
        return m ? m[0].toUpperCase() : "RT 01"
      })
    )
  ).sort()
  const filters = ["Semua", ...(uniqueRts.length > 0 ? uniqueRts : ["RT 01", "RT 02", "RT 03"])]

  const visibleChildren =
    activeRt === "Semua" ? children : children.filter((child) => child.rt.toUpperCase().includes(activeRt.toUpperCase()))

  const sortedChildren = [...visibleChildren].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  const togglePin = (name: string) => {
    setChildren((prev) => prev.map((c) => (c.name === name ? { ...c, pinned: !c.pinned } : c)))
    setOpenMenuFor(null)
  }

  return (
    <main className="min-h-svh bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]" aria-label="Tugas Bulan Ini">
      <ProfileHeader title="Tugas" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8"
      >
        <section className="relative overflow-hidden rounded-2xl bg-[#007c4a] p-4 text-white shadow-[0_8px_24px_rgba(0,109,66,0.14)] sm:p-6 xl:p-8">
          <span aria-hidden="true" className="absolute -right-12 -top-12 size-44 rounded-full bg-[#76d69f]/20 blur-2xl" />
          <div className="relative">
            <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
              Tugas Bulan Ini
            </h1>
            <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-white/80">
              Posyandu Mawar 03 - {currentPeriod}
            </p>
            <div className="mt-6 flex divide-x divide-white/20">
              <div className="min-w-[105px] pr-5">
                <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] leading-7">{totalCount}</strong>
                <span className="font-['Manrope:Regular',sans-serif] text-xs tracking-[0.06em] text-white/70">TOTAL TUGAS</span>
              </div>
              <div className="min-w-[90px] px-5">
                <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] leading-7 text-[#7adaa2]">{doneCount}</strong>
                <span className="font-['Manrope:Regular',sans-serif] text-xs tracking-[0.06em] text-white/70">SELESAI</span>
              </div>
              <div className="min-w-[80px] pl-5">
                <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] leading-7 text-[#e7c269]">{pendingCount}</strong>
                <span className="font-['Manrope:Regular',sans-serif] text-xs tracking-[0.06em] text-white/70">BELUM</span>
              </div>
            </div>
          </div>
        </section>

        <nav className="mt-7 -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0" aria-label="Filter RT">
          {filters.map((filter) => {
            const total =
              filter === "Semua" ? children.length : children.filter((child) => child.rt.startsWith(filter)).length
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveRt(filter)}
                className={`shrink-0 rounded-full px-4 py-2 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold transition ${
                  activeRt === filter ? "bg-[#007c4a] text-white" : "bg-[#f1f3f2] text-[#536478] hover:bg-[#e4ebe7]"
                }`}
              >
                {filter} ({total})
              </button>
            )
          })}
        </nav>

        <section className="mt-7 grid gap-3 xl:grid-cols-2 xl:gap-5">
          {sortedChildren.map((child) => (
            <article
              key={child.name}
              className={`relative rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                child.overdue ? "border-l-4 border-[#d30b18] pl-3" : ""
              } ${child.pinned ? "ring-2 ring-[#007c4a]/30" : ""}`}
            >
              <div className="absolute right-3 top-3">
                <button
                  type="button"
                  onClick={() => setOpenMenuFor(openMenuFor === child.name ? null : child.name)}
                  className="grid size-7 place-items-center rounded-full text-[#3e4941] transition hover:bg-[#f3f4f5]"
                  aria-label={`Pilihan ${child.name}`}
                >
                  <MoreVertical className="size-4" />
                </button>

                {openMenuFor === child.name && (
                  <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-black/5">
                    <button
                      type="button"
                      onClick={() => togglePin(child.name)}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-['Manrope:Regular',sans-serif] text-sm text-[#191c1d] transition hover:bg-[#f3f4f5]"
                    >
                      <Pin className="size-3.5" />
                      {child.pinned ? "Lepas Pin" : "Pin"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onInput(child)
                        setOpenMenuFor(null)
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-['Manrope:Regular',sans-serif] text-sm text-[#191c1d] transition hover:bg-[#f3f4f5]"
                    >
                      <RotateCcw className="size-3.5" />
                      {child.done ? "Ukur Ulang" : "Input Pengukuran"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setChildToDelete(child)
                        setOpenMenuFor(null)
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-['Manrope:Regular',sans-serif] text-sm text-[#d30b18] transition hover:bg-[#fff1f0]"
                    >
                      <Trash2 className="size-3.5" />
                      Hapus
                    </button>
                  </div>
                )}
              </div>

              <div className="pr-7">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 font-['Manrope:SemiBold',sans-serif] text-[10px] font-semibold ${
                      child.overdue
                        ? "bg-[#ffe7e5] text-[#b3261e]"
                        : child.done
                          ? "bg-[#edf0f2] text-[#63747a]"
                          : "text-[#63747a]"
                    }`}
                  >
                    {child.overdue ? "⚠ MENDESAK" : child.done ? "✓ SELESAI" : child.deadline}
                  </span>
                  {!child.overdue && !child.done && (
                    <span className="text-[10px] text-[#63747a]">{child.deadline}</span>
                  )}
                </div>
                <div className="mt-4 flex gap-3">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full font-['Manrope:Regular',sans-serif] text-sm ${child.tone}`}>
                    {child.initials}
                  </span>
                  <div className="min-w-0">
                    <h2 className={`font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold ${child.done ? "text-[#63747a] line-through" : "text-[#191c1d]"}`}>
                      {child.name}
                    </h2>
                    <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
                      ⌖ {child.rt}, {child.address}
                    </p>
                    <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">♙ {child.age}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => (child.done ? onViewData(child) : onInput(child))}
                className={`mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl font-['Manrope:SemiBold',sans-serif] text-sm font-semibold transition active:scale-[0.98] ${
                  child.done ? "bg-[#f3f4f5] text-[#63747a] hover:bg-[#e7e9e8]" : "bg-[#007c4a] text-white hover:bg-[#006d42]"
                }`}
              >
                {child.done ? (
                  <>
                    <SvgIcon path={viewDataPaths.p110cf380} viewBox="0 0 16.5 11.25" className="h-3 w-4" />
                    <span>Lihat Data</span>
                  </>
                ) : (
                  <>
                    <SvgIcon path={taskMeasurementPaths.p1f830000} viewBox="0 0 14.25 15" className="size-4" />
                    <span>Input Pengukuran</span>
                  </>
                )}
              </button>
            </article>
          ))}
        </section>
      </motion.div>

      {childToDelete && (
        <ConfirmDeleteModal
          title="Hapus Balita?"
          description={`Apakah Anda yakin ingin menghapus balita "${childToDelete.name}" dari daftar tugas ini?`}
          onCancel={() => setChildToDelete(null)}
          onConfirm={() => {
            setChildren((prev) => prev.filter((c) => c.name !== childToDelete.name))
            setChildToDelete(null)
          }}
        />
      )}

      <ProfileBottomNav active="Tugas" onHome={onHome} onMaterial={onMaterial} onTasks={() => undefined} onProfile={onProfile} />
    </main>
  )
}