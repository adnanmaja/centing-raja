import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, Calendar, CheckCircle2, MapPin, Search, Trash2 } from "lucide-react"
import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"
import { ConfirmDeleteModal } from "../../components/ui/confirm-delete-modal"
import { createNotification, getNakesChildren, getNakesUsers, type Child, type UserProfile } from "../../lib/api"

export type StatusTugas = "belum-diukur" | "selesai"

type AnakTugas = {
  id: string
  nama: string
  rt: string
  rw: string
  status: StatusTugas
  kader: string
  batasWaktu: string
}

const initialAnakList: AnakTugas[] = [
  { id: "1", nama: "Budi Santoso", rt: "02", rw: "05", status: "belum-diukur", kader: "", batasWaktu: "" },
  { id: "2", nama: "Aisyah Putri", rt: "04", rw: "01", status: "selesai", kader: "Ibu Rahmawati", batasWaktu: "28 Okt 2023" },
]

const defaultKaderOptions = ["Ibu Rahmawati", "Ibu Siti", "Ibu Ayu", "Ibu Dewi"]
type FilterTab = "Semua" | "Selesai" | "Belum Diukur"

export function TugasBaruScreen() {
  const navigate = useNavigate()
  const [anakList, setAnakList] = useState<AnakTugas[]>(initialAnakList)
  const [kaderOptions, setKaderOptions] = useState<string[]>(defaultKaderOptions)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTab, setFilterTab] = useState<FilterTab>("Semua")
  const [anakToDelete, setAnakToDelete] = useState<AnakTugas | null>(null)

  useEffect(() => {
    let active = true
    Promise.all([
      getNakesChildren(100, 0),
      getNakesUsers(100, 0).catch(() => [] as UserProfile[]),
    ])
      .then(([childrenData, usersData]) => {
        if (!active) return
        if (Array.isArray(childrenData) && childrenData.length > 0) {
          const mapped: AnakTugas[] = childrenData.map((c: Child) => {
            const rtMatch = c.home_address?.match(/RT\s*(\d+)/i)
            const rwMatch = c.home_address?.match(/RW\s*(\d+)/i)
            return {
              id: c.id,
              nama: c.full_name,
              rt: rtMatch ? rtMatch[1] : "01",
              rw: rwMatch ? rwMatch[1] : "03",
              status: "belum-diukur",
              kader: "",
              batasWaktu: "",
            }
          })
          setAnakList(mapped)
        }
        if (Array.isArray(usersData) && usersData.length > 0) {
          const kaders = usersData
            .filter((u) => u.role === "kader")
            .map((u) => u.name)
          if (kaders.length > 0) {
            setKaderOptions(kaders)
          }
        }
      })
      .catch((err) => {
        console.warn("[Centing] Failed to fetch task assignment data:", err)
      })
    return () => {
      active = false
    }
  }, [])
  const filteredList = useMemo(() => {
    return anakList.filter((anak) => {
      const matchesSearch = anak.nama.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTab =
        filterTab === "Semua" ||
        (filterTab === "Selesai" && anak.status === "selesai") ||
        (filterTab === "Belum Diukur" && anak.status === "belum-diukur")
      return matchesSearch && matchesTab
    })
  }, [anakList, searchQuery, filterTab])

  const handleKaderChange = (id: string, kader: string) => {
    setAnakList((prev) => prev.map((a) => (a.id === id ? { ...a, kader } : a)))
  }

  const handleBatasWaktuChange = (id: string, batasWaktu: string) => {
    setAnakList((prev) => prev.map((a) => (a.id === id ? { ...a, batasWaktu } : a)))
  }

  const handleAssign = async (anak: AnakTugas) => {
    if (!anak.kader) {
      window.alert("Pilih Kader terlebih dahulu.")
      return
    }
    if (!anak.batasWaktu) {
      window.alert("Tentukan batas waktu terlebih dahulu.")
      return
    }

    try {
      // Dispatch live notification broadcast
      const userJson = localStorage.getItem("centing_user")
      let userId = "00000000-0000-0000-0000-000000000001"
      if (userJson) {
        try {
          const user = JSON.parse(userJson)
          userId = user.id || userId
        } catch {
          // fallback
        }
      }

      await createNotification({
        user_id: userId,
        title: `Tugas Pengukuran: ${anak.nama}`,
        message: `Kader ${anak.kader} ditugaskan untuk melakukan pengukuran balita ${anak.nama} (RT ${anak.rt} / RW ${anak.rw}) dengan batas waktu ${anak.batasWaktu}.`,
      })
    } catch {
      // ignore network errors so assignment still updates
    }

    setAnakList((prev) => prev.map((a) => (a.id === anak.id ? { ...a, status: "selesai" } : a)))
    window.alert(`Tugas untuk ${anak.nama} berhasil ditugaskan ke ${anak.kader}.`)
  }
  const filterTabs: FilterTab[] = ["Semua", "Selesai", "Belum Diukur"]

  return (
    <main className="min-h-svh bg-gray-50 pb-24 flex flex-col">
      <NakesHeader title="Akun" />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
            Penugasan Tugas
          </h1>
          <p className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
            Pilih Kader untuk mengunjungi dan mengukur anak-anak yang melewatkan jadwal pertemuan mereka.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-700" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama anak..."
              className="w-full pl-10 pr-4 py-3.5 bg-zinc-100 rounded-lg text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-emerald-800"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterTab(tab)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4 cursor-pointer transition-colors ${
                  filterTab === tab ? "bg-emerald-800 text-white" : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filteredList.length === 0 && (
          <div className="py-10 flex flex-col items-center gap-2 text-center">
            <AlertTriangle className="size-6 text-neutral-400" />
            <span className="text-sm text-neutral-500 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
              Tidak ada data yang cocok.
            </span>
          </div>
        )}

        {filteredList.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredList.map((anak) => (
              <div
                key={anak.id}
                className="p-4 bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7 truncate">
                      {anak.nama}
                    </span>
                    <div className="flex items-center gap-1">
                      <MapPin className="size-2.5 text-neutral-700 shrink-0" />
                      <span className="text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                        RT {anak.rt} / RW {anak.rw}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {anak.status === "belum-diukur" ? (
                      <span className="px-2 py-1 bg-rose-200 rounded-md flex items-center gap-1">
                        <AlertTriangle className="size-3 text-red-800" />
                        <span className="text-red-800 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                          Belum Diukur
                        </span>
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="size-3 text-emerald-800" />
                        <span className="text-emerald-800 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                          Selesai
                        </span>
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setAnakToDelete(anak)}
                      className="p-1 rounded-full cursor-pointer transition-colors hover:bg-red-50"
                      aria-label={`Hapus ${anak.nama}`}
                    >
                      <Trash2 className="size-3.5 text-red-700" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {anak.batasWaktu ? (
                    <>
                      <Calendar className="size-2.5 text-neutral-700" />
                      <span className="text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                        Batas: {anak.batasWaktu}
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="size-2.5 text-red-700" />
                      <span className="text-red-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                        Belum Ditentukan
                      </span>
                    </>
                  )}
                </div>

                <div className="h-px bg-zinc-100" />

                <div className="flex flex-col gap-2">
                  <span className="text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                    {anak.status === "selesai" ? "Update Penugasan & Batas:" : "Tugaskan ke Kader & Tentukan Batas:"}
                  </span>

                  <div className="flex gap-2">
                    <select
                      value={anak.kader}
                      onChange={(e) => handleKaderChange(anak.id, e.target.value)}
                      className="flex-1 min-w-0 px-2 py-2 bg-zinc-100 rounded-lg text-zinc-900 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5 cursor-pointer focus:outline focus:outline-2 focus:outline-emerald-800"
                    >
                      <option value="">Pilih Kader...</option>
                      {kaderOptions.map((kader) => (
                        <option key={kader} value={kader}>
                          {kader}
                        </option>
                      ))}
                    </select>

                    <input
                      type="date"
                      onChange={(e) => handleBatasWaktuChange(anak.id, e.target.value)}
                      className="flex-1 min-w-0 p-2 bg-zinc-100 rounded-lg text-zinc-900 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5 cursor-pointer focus:outline focus:outline-2 focus:outline-emerald-800"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAssign(anak)}
                    className="px-4 py-2 bg-emerald-800 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <span className="text-center text-white text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                      {anak.status === "selesai" ? "Perbarui" : "Tugaskan"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {anakToDelete && (
        <ConfirmDeleteModal
          title="Hapus Balita?"
          description={`Apakah Anda yakin ingin menghapus balita "${anakToDelete.nama}" dari daftar ini?`}
          onCancel={() => setAnakToDelete(null)}
          onConfirm={() => {
            setAnakList((prev) => prev.filter((a) => a.id !== anakToDelete.id))
            setAnakToDelete(null)
          }}
        />
      )}

      <NakesBottomNav
        active="Akun"
        onHome={() => navigate("/nakes")}
        onData={() => navigate("/nakes/data")}
        onInput={() => navigate("/nakes/input")}
        onAkun={() => navigate("/nakes/akun")}
      />
    </main>
  )
}