import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AlertTriangle, ChevronDown, Loader2, MapPin, Plus, Search, Settings2 } from "lucide-react"
import {
  getNakesChildren,
  getNakesMeasurements,
  getNakesWilayah,
  type Child,
  type Measurement,
  type Wilayah,
} from "../../lib/api"
import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"

type StatusAnak = "stunting" | "berisiko" | "aman"

type AnakData = {
  id?: string
  nama: string
  umurBulan: number
  jenisKelamin: "L" | "P"
  status: StatusAnak
  zScore: number
  childObj?: Child
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

type RwSummary = { rw: string; totalAnak: number; stuntingRate: number }
type RtSummary = { rt: string; totalAnak: number; stuntingRate: number }

function parseAddressWilayah(address?: string): { rt: string; rw: string; kecamatan: string } {
  let rt = "01"
  let rw = "03"
  let kecamatan = "Kebayoran Baru"
  if (!address) return { rt, rw, kecamatan }

  const rtMatch = address.match(/RT\s*0?(\d+)/i)
  const rwMatch = address.match(/RW\s*0?(\d+)/i)
  if (rtMatch) rt = rtMatch[1].padStart(2, "0")
  if (rwMatch) rw = rwMatch[1].padStart(2, "0")

  const parts = address.split(",")
  if (parts.length > 0 && parts[0].trim().length > 2) {
    kecamatan = parts[0].trim()
  }
  return { rt, rw, kecamatan }
}
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

  const [liveChildren, setLiveChildren] = useState<Child[]>([])
  const [liveMeasurements, setLiveMeasurements] = useState<Measurement[]>([])
  const [wilayahConfig, setWilayahConfig] = useState<Wilayah | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const inferredKecamatan = useMemo(() => {
    if (state.kecamatan) return state.kecamatan
    if (wilayahConfig?.kecamatan) return wilayahConfig.kecamatan
    for (const c of liveChildren) {
      if (c.home_address) {
        const { kecamatan: k } = parseAddressWilayah(c.home_address)
        if (k) return k
      }
    }
    return "Kebayoran Baru"
  }, [state.kecamatan, wilayahConfig, liveChildren])

  const kecamatan = inferredKecamatan
  const [view, setView] = useState<ViewLevel>("rt")
  const [selectedRw, setSelectedRw] = useState(state.rw ?? "01")
  const [selectedRt, setSelectedRt] = useState(state.rt ?? "01")

  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<FilterOption>("semua")
  const [visibleCount, setVisibleCount] = useState(10)

  useEffect(() => {
    let active = true
    Promise.all([
      getNakesChildren(100, 0),
      getNakesMeasurements(100, 0).catch(() => [] as Measurement[]),
      getNakesWilayah().catch(() => null),
    ])
      .then(([childrenData, measurementsData, wilayahData]) => {
        if (active) {
          if (Array.isArray(childrenData)) {
            setLiveChildren(childrenData)
          }
          if (Array.isArray(measurementsData)) {
            setLiveMeasurements(measurementsData)
          }
          if (wilayahData) {
            setWilayahConfig(wilayahData)
          }
        }
      })
      .catch((err) => {
        console.warn("[Centing] Failed to fetch nakes data:", err)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [])
  const { displayAnakList, rwList, rtList } = useMemo(() => {
    const latestMap = new Map<string, Measurement>()
    for (const m of liveMeasurements) {
      const existing = latestMap.get(m.children_id)
      if (!existing || new Date(m.measured_at) > new Date(existing.measured_at)) {
        latestMap.set(m.children_id, m)
      }
    }

    const childrenWithWilayah = liveChildren.map((c) => {
      const m = latestMap.get(c.id)
      let status: StatusAnak = "aman"
      let zScore = 0.0
      if (m) {
        zScore = Number(m.z_score) || 0.0
        if (m.stunting_status === "severely_stunted" || m.stunting_status === "stunted" || zScore <= -2) {
          status = "stunting"
        } else if (zScore < -1) {
          status = "berisiko"
        } else {
          status = "aman"
        }
      }
      const { rt, rw } = parseAddressWilayah(c.home_address)
      return {
        id: c.id,
        nama: c.full_name,
        umurBulan: getAgeMonths(c.birth_date),
        jenisKelamin: (c.gender === "P" || c.gender === "Perempuan" ? "P" : "L") as "L" | "P",
        status,
        zScore,
        childObj: c,
        rt,
        rw,
      }
    })

    // Compute RW summary
    const rwMap = new Map<string, { total: number; stunting: number }>()
    const configuredRwCount = wilayahConfig?.jumlah_rw ?? (state.rw ? parseInt(state.rw, 10) : 4)
    for (let i = 1; i <= Math.max(1, configuredRwCount); i++) {
      rwMap.set(String(i).padStart(2, "0"), { total: 0, stunting: 0 })
    }
    for (const c of childrenWithWilayah) {
      const current = rwMap.get(c.rw) || { total: 0, stunting: 0 }
      current.total += 1
      if (c.status === "stunting") current.stunting += 1
      rwMap.set(c.rw, current)
    }

    const dynamicRwList: RwSummary[] = Array.from(rwMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([rw, val]) => ({
        rw,
        totalAnak: val.total,
        stuntingRate: val.total > 0 ? Number(((val.stunting / val.total) * 100).toFixed(1)) : 0,
      }))

    // Compute RT summary for selectedRw
    const rtMap = new Map<string, { total: number; stunting: number }>()
    const configuredRtCount = wilayahConfig?.jumlah_rt ?? (state.rt ? parseInt(state.rt, 10) : 3)
    for (let i = 1; i <= Math.max(1, configuredRtCount); i++) {
      rtMap.set(String(i).padStart(2, "0"), { total: 0, stunting: 0 })
    }
    for (const c of childrenWithWilayah.filter((c) => c.rw === selectedRw)) {
      const current = rtMap.get(c.rt) || { total: 0, stunting: 0 }
      current.total += 1
      if (c.status === "stunting") current.stunting += 1
      rtMap.set(c.rt, current)
    }

    const dynamicRtList: RtSummary[] = Array.from(rtMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([rt, val]) => ({
        rt,
        totalAnak: val.total,
        stuntingRate: val.total > 0 ? Number(((val.stunting / val.total) * 100).toFixed(1)) : 0,
      }))

    return {
      displayAnakList: childrenWithWilayah,
      rwList: dynamicRwList,
      rtList: dynamicRtList,
    }
  }, [liveChildren, liveMeasurements, wilayahConfig, selectedRw, state.rw, state.rt])

  useEffect(() => {
    if (rwList.length > 0 && !rwList.some((r) => r.rw === selectedRw)) {
      setSelectedRw(rwList[0].rw)
    }
  }, [rwList, selectedRw])

  useEffect(() => {
    if (rtList.length > 0 && !rtList.some((r) => r.rt === selectedRt)) {
      setSelectedRt(rtList[0].rt)
    }
  }, [rtList, selectedRt])

  const counts = useMemo(() => {
    const scopeChildren = displayAnakList.filter((anak) => {
      return (!selectedRw || anak.rw === selectedRw) && (!selectedRt || anak.rt === selectedRt)
    })
    return {
      stunting: scopeChildren.filter((a) => a.status === "stunting").length,
      berisiko: scopeChildren.filter((a) => a.status === "berisiko").length,
      aman: scopeChildren.filter((a) => a.status === "aman").length,
    }
  }, [displayAnakList, selectedRw, selectedRt])

  const filteredList = useMemo(() => {
    return displayAnakList.filter((anak) => {
      const matchesRw = !selectedRw || anak.rw === selectedRw
      const matchesRt = !selectedRt || anak.rt === selectedRt
      const matchesFilter = filter === "semua" || anak.status === filter
      const matchesSearch =
        !searchQuery || anak.nama.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesRw && matchesRt && matchesFilter && matchesSearch
    })
  }, [displayAnakList, selectedRw, selectedRt, filter, searchQuery])

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
      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold text-neutral-600">Pilih RW:</label>
        <div className="relative">
          <select
            value={selectedRw}
            aria-label="Pilih RW"
            onChange={(e) => setSelectedRw(e.target.value)}
            className="h-10 pl-3 pr-8 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-300 text-zinc-900 text-sm font-semibold cursor-pointer appearance-none"
          >
            {rwList.map((item) => (
              <option key={item.rw} value={item.rw}>
                RW {item.rw}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-600" />
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <select
            value={selectedRw}
            aria-label="Pilih RW"
            onChange={(e) => setSelectedRw(e.target.value)}
            className="h-10 pl-3 pr-8 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-300 text-zinc-900 text-sm font-semibold cursor-pointer appearance-none"
          >
            {rwList.map((item) => (
              <option key={item.rw} value={item.rw}>
                RW {item.rw}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-600" />
        </div>
        <div className="relative">
          <select
            value={selectedRt}
            aria-label="Pilih RT"
            onChange={(e) => setSelectedRt(e.target.value)}
            className="h-10 pl-3 pr-8 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-300 text-zinc-900 text-sm font-bold cursor-pointer appearance-none"
          >
            {rtList.map((item) => (
              <option key={item.rt} value={item.rt}>
                RT {item.rt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-600" />
        </div>
      </div>
    )

  return (
    <main className="min-h-svh bg-gray-50 pb-24 flex flex-col">
      <NakesHeader title="Data" />

      <div className="mx-auto w-full max-w-6xl flex flex-col gap-6 pt-4">
        {/* Header wilayah */}
        <div className="px-5 sm:px-8 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-zinc-900 text-xl sm:text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7 sm:leading-8">
              Kecamatan: {kecamatan}
            </h1>
            {wilayahConfig?.posyandu && (
              <span className="text-xs text-neutral-600 font-medium font-['Manrope:Regular',sans-serif]">
                Posyandu: {wilayahConfig.posyandu}
              </span>
            )}
            {headerSubtitle && <div className="pt-2">{headerSubtitle}</div>}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate("/nakes/data")}
              className="h-9 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Atur Data Wilayah Administratif"
            >
              <Settings2 className="size-3.5" />
              <span className="hidden sm:inline">Ubah Wilayah</span>
            </button>
            <span className="h-9 px-3 py-1 rounded-full flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-emerald-800 animate-pulse" />
              <span className="text-emerald-800 text-[10px] font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wide">
                LIVE
              </span>
            </span>
          </div>
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
        {isLoading && (
          <div className="py-16 px-5 flex flex-col items-center justify-center gap-3 text-neutral-500">
            <Loader2 className="size-8 text-emerald-800 animate-spin" />
            <span className="text-sm font-medium">Memuat data anak & wilayah...</span>
          </div>
        )}

        {/* KECAMATAN VIEW — list semua RW */}
        {!isLoading && view === "kecamatan" && (
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
        {!isLoading && view === "rw" && (
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
        {!isLoading && view === "rt" && (
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
                searchQuery || filter !== "semua" ? (
                  <div className="py-10 flex flex-col items-center gap-2 text-center">
                    <AlertTriangle className="size-6 text-neutral-400" />
                    <span className="text-sm text-neutral-500 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                      Tidak ada data yang cocok dengan pencarian atau filter.
                    </span>
                  </div>
                ) : (
                  <div className="py-12 px-4 bg-white rounded-2xl border border-dashed border-stone-200 flex flex-col items-center gap-3 text-center">
                    <div className="size-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                      <MapPin className="size-6" />
                    </div>
                    <div className="flex flex-col gap-1 max-w-sm">
                      <span className="text-zinc-900 font-semibold text-base">
                        Belum Ada Data Anak di RT {selectedRt} RW {selectedRw}
                      </span>
                      <span className="text-xs text-neutral-500 font-normal">
                        Tambahkan anak baru di wilayah ini atau pilih RT / RW lainnya.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate("/nakes/input")}
                      className="mt-2 h-10 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Plus className="size-3.5" />
                      Input Data Anak
                    </button>
                  </div>
                )
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
                          onClick={() =>
                            navigate("/nakes/pertumbuhan", {
                              state: {
                                child: anak.childObj || {
                                  id: anak.id,
                                  full_name: anak.nama,
                                  gender: anak.jenisKelamin,
                                },
                                anak: {
                                  id: anak.id,
                                  nama: anak.nama,
                                  usiaBulan: `${anak.umurBulan} Bulan`,
                                  jenisKelamin: anak.jenisKelamin === "L" ? "Laki-laki" : "Perempuan",
                                },
                              },
                            })
                          }
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
                              onClick={() =>
                                navigate("/nakes/pertumbuhan", {
                                  state: {
                                    child: anak.childObj || {
                                      id: anak.id,
                                      full_name: anak.nama,
                                      gender: anak.jenisKelamin,
                                    },
                                    anak: {
                                      id: anak.id,
                                      nama: anak.nama,
                                      usiaBulan: `${anak.umurBulan} Bulan`,
                                      jenisKelamin: anak.jenisKelamin === "L" ? "Laki-laki" : "Perempuan",
                                    },
                                  },
                                })
                              }
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