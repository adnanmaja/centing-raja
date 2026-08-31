import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AlertTriangle, ChevronDown, Search } from "lucide-react"
import { getNakesChildren, type Child } from "../../lib/api"
import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"

type StatusAnak = "stunting" | "berisiko" | "aman"

type AnakData = {
  nama: string
  umurBulan: number
  jenisKelamin: "L" | "P"
  status: StatusAnak
  zScore: number
}

type StatusConfigEntry = {
  label: string
  badgeBg: string
  badgeText: string
  dot: string
}

const statusConfig: Record<StatusAnak, StatusConfigEntry> = {
  stunting: {
    label: "Stunting",
    badgeBg: "bg-rose-200",
    badgeText: "text-red-700",
    dot: "bg-red-700",
  },
  berisiko: {
    label: "Berisiko",
    badgeBg: "bg-orange-300",
    badgeText: "text-yellow-800",
    dot: "bg-yellow-800",
  },
  aman: {
    label: "Aman",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    dot: "bg-emerald-800",
  },
}

function getAgeMonths(birthDateStr: string): number {
  const birth = new Date(birthDateStr)
  const now = new Date()
  return Math.max(0, (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth()))
}

const defaultMockAnak: AnakData[] = [
  { nama: "Budi Santoso", umurBulan: 24, jenisKelamin: "L", status: "stunting", zScore: -2.5 },
  { nama: "Siti Aminah", umurBulan: 18, jenisKelamin: "P", status: "berisiko", zScore: -1.8 },
  { nama: "Ahmad Fauzi", umurBulan: 36, jenisKelamin: "L", status: "aman", zScore: -0.5 },
  { nama: "Rina Melati", umurBulan: 12, jenisKelamin: "P", status: "aman", zScore: 0.2 },
]
// TODO: ganti dengan fetch agregat per RW dari GET /api/wilayah/{kecamatan}/rw
type RwSummary = { rw: string; totalAnak: number; stuntingRate: number }
const rwList: RwSummary[] = [
  { rw: "01", totalAnak: 42, stuntingRate: 9.5 },
  { rw: "02", totalAnak: 38, stuntingRate: 15.8 },
  { rw: "03", totalAnak: 55, stuntingRate: 12.7 },
  { rw: "04", totalAnak: 30, stuntingRate: 6.7 },
]

// TODO: ganti dengan fetch agregat per RT dari GET /api/wilayah/{kecamatan}/{rw}/rt
type RtSummary = { rt: string; totalAnak: number; stuntingRate: number }
const rtList: RtSummary[] = [
  { rt: "01", totalAnak: 12, stuntingRate: 16.7 },
  { rt: "02", totalAnak: 10, stuntingRate: 10.0 },
  { rt: "03", totalAnak: 15, stuntingRate: 6.7 },
]

type FilterOption = "semua" | StatusAnak
type ViewLevel = "kecamatan" | "rw" | "rt"

export function DataAnakRtScreen() {
  const navigate = useNavigate()
  const location = useLocation()

  const state = (location.state ?? {}) as {
    kecamatan?: string
    rw?: string
    rt?: string
  }

  const kecamatan = state.kecamatan ?? "Kebayoran Baru"

  const [view, setView] = useState<ViewLevel>("rt")
  const [selectedRw, setSelectedRw] = useState(state.rw ?? "03")
  const [selectedRt, setSelectedRt] = useState(state.rt ?? "01")

  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<FilterOption>("semua")
  const [visibleCount, setVisibleCount] = useState(10)
  const [liveChildren, setLiveChildren] = useState<Child[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    getNakesChildren(100, 0)
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          setLiveChildren(data)
        }
      })
      .catch((err) => {
        console.warn("[Centing] Failed to fetch nakes children:", err)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const displayAnakList: AnakData[] = useMemo(() => {
    if (liveChildren.length > 0) {
      return liveChildren.map((c) => ({
        nama: c.full_name,
        umurBulan: getAgeMonths(c.birth_date),
        jenisKelamin: (c.gender === "P" ? "P" : "L") as "L" | "P",
        status: "aman" as StatusAnak,
        zScore: 0.0,
      }))
    }
    return defaultMockAnak
  }, [liveChildren])

  const counts = useMemo(
    () => ({
      stunting: displayAnakList.filter((a) => a.status === "stunting").length,
      berisiko: displayAnakList.filter((a) => a.status === "berisiko").length,
      aman: displayAnakList.filter((a) => a.status === "aman").length,
    }),
    [displayAnakList],
  )

  const filteredList = useMemo(() => {
    return displayAnakList.filter((anak) => {
      const matchesFilter = filter === "semua" || anak.status === filter
      const matchesSearch = anak.nama.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [displayAnakList, filter, searchQuery])

  const visibleList = filteredList.slice(0, visibleCount)
  const hasMore = visibleCount < filteredList.length

  const filterChips: { key: FilterOption; label: string }[] = [
    { key: "semua", label: "Semua" },
    { key: "stunting", label: `Terindikasi (${counts.stunting})` },
    { key: "berisiko", label: `Berisiko (${counts.berisiko})` },
    { key: "aman", label: `Aman (${counts.aman})` },
  ]

  const chipStyle = (key: FilterOption) => {
    const isActive = filter === key
    if (isActive) {
      if (key === "stunting") return "bg-rose-200 text-red-800"
      if (key === "berisiko") return "bg-orange-300 text-yellow-900"
      if (key === "aman") return "bg-gray-200 text-zinc-900"
      return "bg-emerald-800 text-white"
    }
    return "bg-zinc-100 text-neutral-700"
  }

  const tabs: { key: ViewLevel; label: string }[] = [
    { key: "kecamatan", label: "Kecamatan" },
    { key: "rw", label: "RW" },
    { key: "rt", label: "RT View" },
  ]

  const headerSubtitle =
    view === "kecamatan" ? null : view === "rw" ? (
      <span className="h-10 px-3 flex items-center gap-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-300 text-zinc-900 text-sm font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
        RW {selectedRw}
        <ChevronDown className="size-3 text-neutral-700" />
      </span>
    ) : (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setView("rw")}
          className="h-10 px-3 flex items-center gap-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-300 text-zinc-900 text-sm font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] cursor-pointer"
        >
          RW {selectedRw}
          <ChevronDown className="size-3 text-neutral-700" />
        </button>
        <span className="h-10 px-3 flex items-center gap-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-300 text-zinc-900 text-sm font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
          RT {selectedRt}
          <ChevronDown className="size-3 text-neutral-700" />
        </span>
      </div>
    )

  return (
    <main className="min-h-svh bg-gray-50 pb-24 flex flex-col">
      <NakesHeader title="Data" />

      <div className="mx-auto w-full max-w-6xl flex flex-col gap-6 pt-4">
        {/* Header wilayah */}
        <div className="px-5 sm:px-8 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-zinc-900 text-xl sm:text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7 sm:leading-8">
              Kecamatan: {kecamatan}
            </h1>
            {headerSubtitle && <div className="pt-2">{headerSubtitle}</div>}
          </div>

          <span className="h-9 px-3 py-1 rounded-full flex items-center gap-2 shrink-0">
            <span className="size-2.5 rounded-full bg-emerald-800 animate-pulse" />
            <span className="text-emerald-800 text-[10px] font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wide">
              LIVE
            </span>
          </span>
        </div>

        {/* Tab level wilayah — switchable */}
        <div className="px-5 sm:px-8">
          <div className="p-1 bg-zinc-100 rounded-xl flex max-w-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setView(tab.key)}
                className={`flex-1 py-2 flex justify-center cursor-pointer rounded-lg transition-colors ${
                  view === tab.key ? "bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" : ""
                }`}
              >
                <span
                  className={`text-center text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] ${
                    view === tab.key ? "text-emerald-800" : "text-neutral-700"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* KECAMATAN VIEW — list semua RW */}
        {view === "kecamatan" && (
          <div className="px-5 sm:px-8 flex flex-col gap-3">
            {rwList.map((item) => (
              <button
                key={item.rw}
                type="button"
                onClick={() => {
                  setSelectedRw(item.rw)
                  setView("rw")
                }}
                className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex justify-between items-center text-left cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <span className="text-zinc-900 text-lg font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                  RW {item.rw}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                    {item.totalAnak} anak
                  </span>
                  <span className="text-red-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                    {item.stuntingRate}% stunting
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* RW VIEW — list semua RT dalam RW terpilih */}
        {view === "rw" && (
          <div className="px-5 sm:px-8 flex flex-col gap-3">
            {rtList.map((item) => (
              <button
                key={item.rt}
                type="button"
                onClick={() => {
                  setSelectedRt(item.rt)
                  setView("rt")
                }}
                className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex justify-between items-center text-left cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <span className="text-zinc-900 text-lg font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                  RT {item.rt}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                    {item.totalAnak} anak
                  </span>
                  <span className="text-yellow-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                    {item.stuntingRate}% stunting
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* RT VIEW — list anak (search, filter, table/cards) */}
        {view === "rt" && (
          <>
            <div className="px-5 sm:px-8 flex flex-col gap-3">
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-700" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari data anak (Real-time)..."
                  className="w-full h-12 pl-10 pr-3 bg-zinc-100 rounded-xl text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-emerald-800"
                />
              </div>

              <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
                {filterChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => setFilter(chip.key)}
                    className={`shrink-0 px-4 py-2 rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer transition-colors ${chipStyle(chip.key)}`}
                  >
                    <span className="text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4 whitespace-nowrap">
                      {chip.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 sm:px-8">
              {visibleList.length === 0 && (
                <div className="py-10 flex flex-col items-center gap-2 text-center">
                  <AlertTriangle className="size-6 text-neutral-400" />
                  <span className="text-sm text-neutral-500 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                    Tidak ada data yang cocok.
                  </span>
                </div>
              )}

              {visibleList.length > 0 && (
                <>
                  {/* Mobile: stacked cards */}
                  <div className="flex flex-col gap-3 sm:hidden">
                    {visibleList.map((anak) => {
                      const status = statusConfig[anak.status]
                      return (
                        <button
                          key={anak.nama}
                          type="button"
                          className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex justify-between items-center text-left cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative size-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                              <span
                                className={`absolute -top-1 right-0 size-4 rounded-full border-2 border-white ${status.dot}`}
                              />
                              <span className="text-zinc-900 text-lg font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                                {anak.nama.charAt(0)}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
                                {anak.nama}
                              </span>
                              <span className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
                                {anak.umurBulan} Bulan • {anak.jenisKelamin}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-0.5 shrink-0">
                            <span
                              className={`text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4 ${status.badgeText}`}
                            >
                              {status.label}
                            </span>
                            <span className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
                              Z-Score: {anak.zScore.toFixed(1)}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Desktop/tablet: table */}
                  <div className="hidden sm:block bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-zinc-100">
                          <th className="p-4 text-left text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wide">
                            Nama
                          </th>
                          <th className="p-4 text-left text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wide">
                            Usia / JK
                          </th>
                          <th className="p-4 text-left text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wide">
                            Status
                          </th>
                          <th className="p-4 text-right text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wide">
                            Z-Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleList.map((anak, i) => {
                          const status = statusConfig[anak.status]
                          return (
                            <tr
                              key={anak.nama}
                              className={`border-t border-zinc-200 cursor-pointer transition-colors hover:bg-emerald-50 ${
                                i % 2 === 1 ? "bg-gray-50" : ""
                              }`}
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative size-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                    <span
                                      className={`absolute -top-1 right-0 size-3.5 rounded-full border-2 border-white ${status.dot}`}
                                    />
                                    <span className="text-zinc-900 text-sm font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                                      {anak.nama.charAt(0)}
                                    </span>
                                  </div>
                                  <span className="text-zinc-900 text-base font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                                    {anak.nama}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4 text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                                {anak.umurBulan} Bulan • {anak.jenisKelamin}
                              </td>
                              <td className="p-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] ${status.badgeBg} ${status.badgeText}`}
                                >
                                  {status.label}
                                </span>
                              </td>
                              <td className="p-4 text-right text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                                {anak.zScore.toFixed(1)}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {hasMore && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="w-full mt-3 py-4 rounded-xl flex justify-center items-center gap-2 cursor-pointer transition-colors hover:bg-zinc-100"
                >
                  <span className="text-center text-emerald-800 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                    Muat Lebih Banyak
                  </span>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <NakesBottomNav
        active="Data"
        onHome={() => navigate("/nakes")}
        onData={() => navigate("/nakes/data")}
        onInput={() => navigate("/nakes/input")}
        onAkun={() => navigate("/nakes/akun")}
      />
    </main>
  )
}