import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  Filter,
  HelpCircle,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"
import { ConfirmDeleteModal } from "../../components/ui/confirm-delete-modal"
import { AkunBaruModal, type AkunBaruData, type Role } from "./akun-baru-modal"
import { deleteEducationMaterial, getEducationMaterials } from "../../lib/api"
type Akun = {
  nama: string
  nik: string
  role: Role
  initial: string
  avatarBg: string
  avatarText: string
}

const initialAkunList: Akun[] = [
  {
    nama: "Siti Rahmawati",
    nik: "3201234567890001",
    role: "Kader",
    initial: "S",
    avatarBg: "bg-transparent",
    avatarText: "text-emerald-800",
  },
  {
    nama: "Budi Santoso",
    nik: "3201987654320002",
    role: "Orang Tua",
    initial: "B",
    avatarBg: "bg-orange-300",
    avatarText: "text-yellow-900",
  },
  {
    nama: "Ayu Lestari",
    nik: "3201456789120003",
    role: "Kader",
    initial: "A",
    avatarBg: "bg-rose-200",
    avatarText: "text-red-800",
  },
]

const roleBadgeStyle: Record<Role, string> = {
  Kader: "bg-blue-100 text-slate-600",
  "Orang Tua": "bg-zinc-200 text-neutral-700",
}

const avatarPalette = [
  { bg: "bg-transparent", text: "text-emerald-800" },
  { bg: "bg-orange-300", text: "text-yellow-900" },
  { bg: "bg-rose-200", text: "text-red-800" },
  { bg: "bg-blue-100", text: "text-slate-600" },
]

type RoleFilter = "Semua" | Role

type MateriHistoryItem = {
  id: string
  judul: string
  kategori: string
  tanggal: string
}

type KuisHistoryItem = {
  id: string
  judul: string
  durasi: string
  jumlahSoal: number
}

const initialMateriHistory: MateriHistoryItem[] = [
  { id: "1", judul: "Pentingnya MPASI 6 Bulan", kategori: "Nutrisi", tanggal: "12 Agu 2026" },
  { id: "2", judul: "Deteksi Dini Stunting", kategori: "Kesehatan", tanggal: "5 Agu 2026" },
]

const initialKuisHistory: KuisHistoryItem[] = [
  { id: "1", judul: "Deteksi Dini Stunting Balita", durasi: "15 Menit", jumlahSoal: 5 },
]

export function AkunNakesScreen() {
  const navigate = useNavigate()
  const [akunList, setAkunList] = useState<Akun[]>(initialAkunList)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("Semua")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [materiHistory, setMateriHistory] = useState<MateriHistoryItem[]>(initialMateriHistory)
  const [kuisHistory] = useState<KuisHistoryItem[]>(initialKuisHistory)
  const [materiToDelete, setMateriToDelete] = useState<MateriHistoryItem | null>(null)

  useEffect(() => {
    let active = true
    getEducationMaterials(50, 0)
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          const apiItems: MateriHistoryItem[] = data.map((item) => {
            const dateStr = item.created_at
              ? new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
              : "Hari ini"

            let kategori = "Edukasi"
            let judul = item.title
            const match = item.title.match(/^\[(.*?)\]\s*(.*)$/)
            if (match) {
              kategori = match[1]
              judul = match[2]
            }

            return {
              id: item.id,
              judul,
              kategori,
              tanggal: dateStr,
            }
          })
          setMateriHistory(apiItems)
        }
      })
      .catch((err) => {
        console.warn("[Centing] Failed to fetch education materials for nakes:", err)
      })
    return () => {
      active = false
    }
  }, [])
  const filteredAkun = useMemo(() => {
    return akunList.filter((akun) => {
      const matchesSearch =
        akun.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        akun.nik.includes(searchQuery)
      const matchesRole = roleFilter === "Semua" || akun.role === roleFilter
      return matchesSearch && matchesRole
    })
  }, [akunList, searchQuery, roleFilter])

  const handleDelete = (akun: Akun) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus akun "${akun.nama}"? Tindakan ini tidak dapat dibatalkan.`,
    )
    if (!confirmed) return

    setAkunList((prev) => prev.filter((item) => item.nik !== akun.nik))
    window.alert(`Akun "${akun.nama}" berhasil dihapus.`)
  }

  const handleCreateAkun = (data: AkunBaruData) => {
    const isDuplicate = akunList.some((akun) => akun.nik === data.nik)
    if (isDuplicate) {
      window.alert("NIK ini sudah terdaftar. Gunakan NIK lain.")
      return
    }

    const palette = avatarPalette[akunList.length % avatarPalette.length]
    const newAkun: Akun = {
      nama: data.nama,
      nik: data.nik,
      role: data.role,
      initial: data.nama.charAt(0).toUpperCase(),
      avatarBg: palette.bg,
      avatarText: palette.text,
    }

    setAkunList((prev) => [newAkun, ...prev])
    setIsModalOpen(false)
    window.alert(`Akun "${data.nama}" berhasil ditambahkan sebagai ${data.role}.`)
  }

  const roleFilterOptions: RoleFilter[] = ["Semua", "Kader", "Orang Tua"]

  return (
    <main className="min-h-svh bg-gray-50 pb-24 flex flex-col">
      <NakesHeader title="Akun" />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
            Manajemen Akun &amp; Edukasi
          </h1>
          <p className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
            Kelola akun Kader dan Orang Tua, serta publikasikan konten edukasi.
          </p>
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
              Kelola Akun
            </h2>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-emerald-800 rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Plus className="size-2.5 text-white" />
              <span className="text-white text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                Akun Baru
              </span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-4 border-b border-zinc-200 flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-700" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari NIK atau Nama..."
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 rounded-lg text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-emerald-800"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                  className={`p-2 rounded-lg flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                    isFilterOpen ? "bg-emerald-800 text-white" : "bg-zinc-100 text-neutral-700 hover:bg-zinc-200"
                  }`}
                  aria-label="Filter"
                >
                  <Filter className="size-4" />
                </button>
              </div>

              {isFilterOpen && (
                <div className="flex gap-2">
                  {roleFilterOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRoleFilter(option)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] cursor-pointer transition-colors ${
                        roleFilter === option
                          ? "bg-emerald-800 text-white"
                          : "bg-zinc-100 text-neutral-700 hover:bg-zinc-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {filteredAkun.length === 0 && (
              <div className="py-10 flex flex-col items-center gap-2 text-center">
                <span className="text-sm text-neutral-500 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                  Tidak ada akun yang cocok.
                </span>
              </div>
            )}

            {filteredAkun.length > 0 && (
              <>
                <div className="sm:hidden">
                  {filteredAkun.map((akun, i) => (
                    <div
                      key={akun.nik}
                      className={`p-4 flex items-center justify-between gap-3 ${
                        i < filteredAkun.length - 1 ? "border-b border-zinc-200" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`size-12 ${akun.avatarBg} rounded-full flex items-center justify-center shrink-0`}>
                          <span className={`text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7 ${akun.avatarText}`}>
                            {akun.initial}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-zinc-900 text-lg font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7 truncate">
                            {akun.nama}
                          </span>
                          <span className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5 truncate">
                            NIK: {akun.nik}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] uppercase leading-4 tracking-wide ${roleBadgeStyle[akun.role]}`}>
                          {akun.role}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(akun)}
                          className="p-1 rounded-full cursor-pointer transition-colors hover:bg-red-50"
                          aria-label={`Hapus akun ${akun.nama}`}
                        >
                          <Trash2 className="size-3.5 text-red-700" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <table className="hidden sm:table w-full border-collapse">
                  <thead>
                    <tr className="bg-zinc-100">
                      <th className="p-4 text-left text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wide">Nama</th>
                      <th className="p-4 text-left text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wide">NIK</th>
                      <th className="p-4 text-left text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] uppercase tracking-wide">Role</th>
                      <th className="p-4 w-16" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAkun.map((akun, i) => (
                      <tr key={akun.nik} className={`border-t border-zinc-200 transition-colors hover:bg-emerald-50 ${i % 2 === 1 ? "bg-gray-50" : ""}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`size-10 ${akun.avatarBg} rounded-full flex items-center justify-center shrink-0`}>
                              <span className={`text-base font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] ${akun.avatarText}`}>
                                {akun.initial}
                              </span>
                            </div>
                            <span className="text-zinc-900 text-base font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                              {akun.nama}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                          {akun.nik}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] uppercase leading-4 tracking-wide ${roleBadgeStyle[akun.role]}`}>
                            {akun.role}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(akun)}
                            className="p-1 rounded-full cursor-pointer transition-colors hover:bg-red-50 ml-auto flex"
                            aria-label={`Hapus akun ${akun.nama}`}
                          >
                            <Trash2 className="size-4 text-red-700" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            <button
              type="button"
              onClick={() => navigate("/nakes/akun/semua")}
              className="w-full px-3 pt-4 pb-3.5 bg-zinc-100 flex justify-center cursor-pointer transition-colors hover:bg-zinc-200"
            >
              <span className="text-emerald-800 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                Lihat Semua Akun
              </span>
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
            Konten Edukasi
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <EduCard
              icon={<BookOpen className="size-4 text-emerald-800" />}
              iconBg="bg-emerald-800/10"
              glowColor="bg-emerald-800/10"
              title="Buat Materi Baru"
              description="Publikasikan tips kesehatan dan panduan nutrisi untuk Kader dan Orang Tua."
              actionLabel="Buat Artikel"
              actionColor="text-emerald-800"
              onClick={() => navigate("/nakes/edukasi/materi/baru")}
            />
            <EduCard
              icon={<HelpCircle className="size-5 text-yellow-800" />}
              iconBg="bg-yellow-800/10"
              glowColor="bg-yellow-800/10"
              title="Buat Kuis Kader"
              description="Uji pengetahuan Kader tentang protokol pencegahan stunting."
              actionLabel="Buat Kuis"
              actionColor="text-yellow-800"
              onClick={() => navigate("/nakes/edukasi/kuis/baru")}
            />
            <EduCard
              icon={<ClipboardList className="size-5 text-red-900" />}
              iconBg="bg-red-900/10"
              glowColor="bg-red-900/10"
              title="Buat Tugas untuk Kader"
              description="Berikan tugas kepada kader untuk melakukan pemeriksaan terhadap balita."
              actionLabel="Buat Tugas"
              actionColor="text-red-900"
              onClick={() => navigate("/nakes/tugas/baru")}
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
            Riwayat Materi Dipublikasikan
          </h2>

          {materiHistory.length === 0 ? (
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] p-6 text-center">
              <span className="text-sm text-neutral-500 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                Belum ada materi yang dipublikasikan.
              </span>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] overflow-hidden">
              {materiHistory.map((item, i) => (
                <div
                  key={item.id}
                  className={`p-4 flex items-center justify-between gap-3 ${i > 0 ? "border-t border-zinc-200" : ""}`}
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-zinc-900 text-base font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] truncate">
                      {item.judul}
                    </span>
                    <span className="text-neutral-700 text-xs font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                      {item.kategori} • {item.tanggal}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMateriToDelete(item)}
                    className="p-1 rounded-full cursor-pointer transition-colors hover:bg-red-50 shrink-0"
                    aria-label={`Hapus materi ${item.judul}`}
                  >
                    <Trash2 className="size-4 text-red-700" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
            Kuis yang Sudah Dibuat
          </h2>

          {kuisHistory.length === 0 ? (
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] p-6 text-center">
              <span className="text-sm text-neutral-500 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                Belum ada kuis yang dibuat.
              </span>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {kuisHistory.map((kuis) => (
                <div key={kuis.id} className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col gap-2">
                  <span className="text-zinc-900 text-lg font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
                    {kuis.judul}
                  </span>
                  <span className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                    {kuis.jumlahSoal} pertanyaan • {kuis.durasi}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {isModalOpen && (
        <AkunBaruModal onClose={() => setIsModalOpen(false)} onSubmit={handleCreateAkun} />
      )}

      {materiToDelete && (
        <ConfirmDeleteModal
          title="Hapus Materi?"
          description={`Yakin ingin menghapus materi "${materiToDelete.judul}"?`}
          onCancel={() => setMateriToDelete(null)}
          onConfirm={async () => {
            if (!materiToDelete) return
            try {
              if (materiToDelete.id.length > 5) {
                await deleteEducationMaterial(materiToDelete.id)
              }
            } catch (err) {
              console.warn("[Centing] Failed to delete education material:", err)
            }
            setMateriHistory((prev) => prev.filter((m) => m.id !== materiToDelete.id))
            setMateriToDelete(null)
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

function EduCard({
  icon,
  iconBg,
  glowColor,
  title,
  description,
  actionLabel,
  actionColor,
  onClick,
}: {
  icon: React.ReactNode
  iconBg: string
  glowColor: string
  title: string
  description: string
  actionLabel: string
  actionColor: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-5 relative bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col text-left overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99]"
    >
      <div className={`absolute -right-6 -top-4 size-24 rounded-full blur-md ${glowColor}`} />
      <div className="relative flex items-start gap-4">
        <div className={`size-12 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-zinc-900 text-lg font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7">
            {title}
          </span>
          <span className="text-neutral-700 text-xs font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
            {description}
          </span>
          <span className={`pt-2 flex items-center gap-1 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4 ${actionColor}`}>
            {actionLabel}
            <ChevronRight className="size-2.5" />
          </span>
        </div>
      </div>
    </button>
  )
}