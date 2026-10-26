import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Info,
  MapPin,
  Plus,
  Search,
  Trash2,
  User,
  X,
  XCircle,
} from "lucide-react"
import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"
import { KaderNotification } from "../../components/kader/kader-notification"
import { ConfirmDeleteModal } from "../../components/ui/confirm-delete-modal"
import { useAuth } from "../../context/auth-context"
import {
  createNotification,
  getNakesChildren,
  getNakesMeasurements,
  getNakesUsers,
  getNotifications,
  type Child,
  type Measurement,
  type UserProfile,
} from "../../lib/api"
import { getUserIdFromToken } from "../../lib/auth-utils"

export type StatusTugas = "belum-diukur" | "selesai"

type AnakTugas = {
  id: string
  nama: string
  rt: string
  rw: string
  status: StatusTugas
  kader: string
  batasWaktu: string
  ditugaskan: boolean
}

type FilterTab = "Semua" | "Selesai Diukur" | "Belum Diukur"

type AlertType = "success" | "info" | "warning" | "error"

type AlertState = {
  type: AlertType
  title: string
  message: string
  details?: { label: string; value: string }[]
}

type TaskFormValues = {
  nama: string
  rt: string
  rw: string
  kader: string
  batasWaktu: string
}

/* ------------------------------ Helpers ------------------------------ */

function formatTanggal(value: string): string {
  if (!value) return ""
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return value
  return new Date(y, m - 1, d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function todayString(): string {
  const now = new Date()
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  const dd = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${mm}-${dd}`
}
function isInCurrentWeek(dateValue: string, reference = new Date()): boolean {
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return false

  const startOfWeek = new Date(reference)
  const day = startOfWeek.getDay()
  const daysSinceMonday = day === 0 ? 6 : day - 1
  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 7)

  return date >= startOfWeek && date < endOfWeek
}


function parseRtRw(address?: string | null) {
  const rtMatch = address?.match(/RT\s*(\d+)/i)
  const rwMatch = address?.match(/RW\s*(\d+)/i)
  return {
    rt: rtMatch ? rtMatch[1] : "01",
    rw: rwMatch ? rwMatch[1] : "03",
  }
}

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase()
}

/* ---------------------------- Alert Modal ---------------------------- */

const alertStyles: Record<
  AlertType,
  { ring: string; iconBg: string; iconColor: string; button: string; Icon: typeof CheckCircle2 }
> = {
  success: {
    ring: "ring-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-800",
    button: "bg-emerald-800 hover:bg-emerald-900",
    Icon: CheckCircle2,
  },
  info: {
    ring: "ring-sky-100",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
    button: "bg-emerald-800 hover:bg-emerald-900",
    Icon: Info,
  },
  warning: {
    ring: "ring-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    button: "bg-emerald-800 hover:bg-emerald-900",
    Icon: AlertTriangle,
  },
  error: {
    ring: "ring-rose-100",
    iconBg: "bg-rose-100",
    iconColor: "text-red-700",
    button: "bg-red-700 hover:bg-red-800",
    Icon: XCircle,
  },
}

function AlertModal({ alert, onClose }: { alert: AlertState; onClose: () => void }) {
  const style = alertStyles[alert.type]
  const Icon = style.Icon

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl flex flex-col items-center gap-4 text-center"
      >
        <div className={`size-16 rounded-full ${style.iconBg} ring-8 ${style.ring} flex items-center justify-center`}>
          <Icon className={`size-8 ${style.iconColor}`} />
        </div>

        <div className="flex flex-col gap-1.5">
          <h2
            id="alert-title"
            className="text-zinc-900 text-lg font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7"
          >
            {alert.title}
          </h2>
          <p className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
            {alert.message}
          </p>
        </div>

        {alert.details && alert.details.length > 0 && (
          <div className="w-full rounded-xl bg-zinc-100 p-3 flex flex-col gap-2 text-left">
            {alert.details.map((d) => (
              <div key={d.label} className="flex items-start justify-between gap-3">
                <span className="text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                  {d.label}
                </span>
                <span className="text-zinc-900 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4 text-right">
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className={`w-full px-4 py-2.5 rounded-lg text-white text-sm font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] cursor-pointer transition-colors ${style.button}`}
        >
          Mengerti
        </button>
      </div>
    </div>
  )
}

/* ------------------------- Create Task Modal ------------------------- */

function CreateTaskModal({
  anakList,
  kaderOptions,
  isSubmitting,
  onClose,
  onSubmit,
}: {
  anakList: AnakTugas[]
  kaderOptions: string[]
  isSubmitting: boolean
  onClose: () => void
  onSubmit: (values: TaskFormValues) => void
}) {
  const [form, setForm] = useState<TaskFormValues>({
    nama: "",
    rt: "",
    rw: "",
    kader: "",
    batasWaktu: "",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, isSubmitting])

  const existing = useMemo(
    () => anakList.find((a) => normalizeName(a.nama) === normalizeName(form.nama)),
    [anakList, form.nama]
  )

  const handleNamaChange = (nama: string) => {
    const match = anakList.find((a) => normalizeName(a.nama) === normalizeName(nama))
    setForm((prev) => ({
      ...prev,
      nama,
      // Jika nama cocok dengan balita terdaftar, isi RT/RW otomatis
      rt: match ? match.rt : prev.rt,
      rw: match ? match.rw : prev.rw,
    }))
    setError("")
  }

  const handleSubmit = () => {
    if (!form.nama.trim()) return setError("Nama balita wajib diisi.")
    if (!form.rt.trim() || !form.rw.trim()) return setError("RT dan RW wajib diisi.")
    if (!form.kader) return setError("Pilih kader terlebih dahulu.")
    if (!form.batasWaktu) return setError("Tentukan batas waktu (deadline) terlebih dahulu.")
    setError("")
    onSubmit({ ...form, nama: form.nama.trim().replace(/\s+/g, " ") })
  }

  const inputClass =
    "w-full px-3 py-2.5 bg-zinc-100 rounded-lg text-zinc-900 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5 focus:outline focus:outline-2 focus:outline-emerald-800"
  const labelClass =
    "text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={() => !isSubmitting && onClose()}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[90svh] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl flex flex-col gap-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2
              id="create-task-title"
              className="text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-7"
            >
              Buat Tugas Baru
            </h2>
            <p className="text-neutral-700 text-xs font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-4">
              Tugaskan kader untuk mengukur balita sebelum batas waktu yang ditentukan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="size-8 shrink-0 rounded-full flex items-center justify-center cursor-pointer text-zinc-900 transition-colors hover:bg-zinc-100 disabled:opacity-50"
            aria-label="Tutup"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="task-nama">
            Nama Balita
          </label>
          <input
            id="task-nama"
            list="task-nama-options"
            value={form.nama}
            onChange={(e) => handleNamaChange(e.target.value)}
            placeholder="Ketik nama balita..."
            autoComplete="off"
            className={inputClass}
          />
          <datalist id="task-nama-options">
            {anakList.map((a) => (
              <option key={a.id} value={a.nama} />
            ))}
          </datalist>
          {form.nama.trim() && (
            <span className="text-neutral-700 text-[11px] font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-4">
              {existing
                ? "Balita sudah terdaftar. Tugas akan diterapkan ke balita ini."
                : "Nama baru. Balita akan ditambahkan ke daftar."}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="task-rt">
              RT
            </label>
            <input
              id="task-rt"
              value={form.rt}
              onChange={(e) => setForm((p) => ({ ...p, rt: e.target.value }))}
              placeholder="01"
              inputMode="numeric"
              className={inputClass}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="task-rw">
              RW
            </label>
            <input
              id="task-rw"
              value={form.rw}
              onChange={(e) => setForm((p) => ({ ...p, rw: e.target.value }))}
              placeholder="03"
              inputMode="numeric"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="task-kader">
            Kader
          </label>
          <select
            id="task-kader"
            value={form.kader}
            onChange={(e) => setForm((p) => ({ ...p, kader: e.target.value }))}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">
              {kaderOptions.length === 0 ? "Belum ada kader terdaftar" : "Pilih kader..."}
            </option>
            {kaderOptions.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="task-deadline">
            Batas Waktu (Deadline)
          </label>
          <input
            id="task-deadline"
            type="date"
            min={todayString()}
            value={form.batasWaktu}
            onChange={(e) => setForm((p) => ({ ...p, batasWaktu: e.target.value }))}
            className={`${inputClass} cursor-pointer`}
          />
        </div>

        {error && (
          <div className="px-3 py-2 rounded-lg bg-rose-100 flex items-center gap-2">
            <AlertTriangle className="size-4 text-red-800 shrink-0" />
            <span className="text-red-800 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
              {error}
            </span>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 bg-zinc-100 rounded-lg text-zinc-900 text-sm font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] cursor-pointer transition-colors hover:bg-zinc-200 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 bg-emerald-800 rounded-lg text-white text-sm font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] cursor-pointer transition-colors hover:bg-emerald-900 disabled:opacity-60"
          >
            {isSubmitting ? "Menugaskan..." : "Buat Tugas"}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------- Screen ------------------------------- */

export function TugasBaruScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [anakList, setAnakList] = useState<AnakTugas[]>([])
  const [kaderOptions, setKaderOptions] = useState<string[]>([])
  const [kaderUsers, setKaderUsers] = useState<UserProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTab, setFilterTab] = useState<FilterTab>("Semua")
  const [anakToDelete, setAnakToDelete] = useState<AnakTugas | null>(null)
  const [alertState, setAlertState] = useState<AlertState | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [assigningId, setAssigningId] = useState<string | null>(null)
  const [checkingId, setCheckingId] = useState<string | null>(null)
  const [hasUnread, setHasUnread] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const checkUnread = useCallback(() => {
    getNotifications()
      .then((items) => {
        setHasUnread(Array.isArray(items) && items.some((item) => !item.is_read))
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    checkUnread()
  }, [checkUnread])

  useEffect(() => {
    let active = true
    setIsLoading(true)

    Promise.all([
      getNakesChildren(100, 0).catch(() => [] as Child[]),
      getNakesMeasurements(500, 0).catch(() => [] as Measurement[]),
      getNakesUsers(100, 0).catch(() => [] as UserProfile[]),
    ])
      .then(([childrenData, measurementsData, usersData]) => {
        if (!active) return

        const validChildren = Array.isArray(childrenData) ? childrenData : []
        const validMeasurements = Array.isArray(measurementsData)
          ? measurementsData
          : []
        const validUsers = Array.isArray(usersData) ? usersData : []
        const measuredThisWeek = new Set(
          validMeasurements
            .filter((measurement) => isInCurrentWeek(measurement.measured_at))
            .map((measurement) => measurement.children_id),
        )

        const mapped: AnakTugas[] = validChildren.map((child: Child) => {
          const { rt, rw } = parseRtRw(child.home_address)
          const isDone = measuredThisWeek.has(child.id)
          return {
            id: child.id,
            nama: child.full_name,
            rt,
            rw,
            status: isDone ? "selesai" : "belum-diukur",
            kader: "",
            batasWaktu: "",
            ditugaskan: false,
          }
        })
        setAnakList(mapped)

        const kaders = validUsers.filter((user) => user.role === "kader")
        setKaderUsers(kaders)
        setKaderOptions(kaders.map((user) => user.name).filter(Boolean))
      })
      .catch((err) => {
        console.warn("[Centing] Failed to fetch task assignment data:", err)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const filteredList = useMemo(() => {
    return anakList.filter((anak) => {
      const matchesSearch = anak.nama
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesTab =
        filterTab === "Semua" ||
        (filterTab === "Belum Diukur" && anak.status === "belum-diukur") ||
        (filterTab === "Selesai Diukur" && anak.status === "selesai")
    })
  }, [anakList, searchQuery, filterTab])

  const handleKaderChange = (id: string, kader: string) => {
    setAnakList((prev) => prev.map((a) => (a.id === id ? { ...a, kader } : a)))
  }

  const handleBatasWaktuChange = (id: string, batasWaktu: string) => {
    setAnakList((prev) => prev.map((a) => (a.id === id ? { ...a, batasWaktu } : a)))
  }

  // Kirim notifikasi penugasan ke kader
  const sendAssignmentNotification = async (info: {
    nama: string
    rt: string
    rw: string
    kader: string
    batasWaktu: string
  }) => {
    try {
      const targetKader = kaderUsers.find((u) => u.name === info.kader)
      let targetUserId = targetKader?.id

      if (!targetUserId) {
        const token = localStorage.getItem("centing_token")
        targetUserId = getUserIdFromToken(token) ?? undefined
      }

      if (targetUserId) {
        await createNotification({
          user_id: targetUserId,
          title: `Tugas Pengukuran: ${info.nama}`,
          message: `Kader ${info.kader} ditugaskan untuk melakukan pengukuran balita ${info.nama} (RT ${info.rt} / RW ${info.rw}) dengan batas waktu ${formatTanggal(info.batasWaktu)}.`,
        })
      }
    } catch {
      // ignore network errors so assignment still updates
    }
  }

  const showAssignSuccess = (info: {
    nama: string
    rt: string
    rw: string
    kader: string
    batasWaktu: string
  }) => {
    setAlertState({
      type: "success",
      title: "Tugas Berhasil Ditugaskan",
      message: `Penugasan pengukuran untuk ${info.nama} telah dikirim ke kader. Tekan "Perbarui" untuk mengecek status pengukuran.`,
      details: [
        { label: "Balita", value: info.nama },
        { label: "RT / RW", value: `RT ${info.rt} / RW ${info.rw}` },
        { label: "Kader", value: info.kader },
        { label: "Batas Waktu", value: formatTanggal(info.batasWaktu) },
      ],
    })
  }

  // Tombol "Tugaskan" di kartu
  const handleAssign = async (anak: AnakTugas) => {
    if (!anak.kader) {
      setAlertState({
        type: "warning",
        title: "Kader Belum Dipilih",
        message: "Pilih kader terlebih dahulu sebelum menugaskan.",
      })
      return
    }
    if (!anak.batasWaktu) {
      setAlertState({
        type: "warning",
        title: "Batas Waktu Belum Ditentukan",
        message: "Tentukan batas waktu (deadline) terlebih dahulu sebelum menugaskan.",
      })
      return
    }

    setAssigningId(anak.id)
    await sendAssignmentNotification(anak)

    // Status tetap "belum-diukur" sampai nakes menekan "Perbarui" dan datanya terverifikasi
    setAnakList((prev) =>
      prev.map((a) => (a.id === anak.id ? { ...a, ditugaskan: true, status: "belum-diukur" } : a))
    )
    setAssigningId(null)
    showAssignSuccess(anak)
  }

  // Submit dari modal "Buat Tugas" (nama bebas, bisa nama baru)
  const handleCreateSubmit = async (values: TaskFormValues) => {
    setIsCreating(true)
    const info = {
      nama: values.nama,
      rt: values.rt.trim(),
      rw: values.rw.trim(),
      kader: values.kader,
      batasWaktu: values.batasWaktu,
    }
    await sendAssignmentNotification(info)

    const existing = anakList.find(
      (anak) => normalizeName(anak.nama) === normalizeName(values.nama),
    )

    if (existing) {
      setAnakList((prev) =>
        prev.map((anak) =>
          anak.id === existing.id
            ? {
                ...anak,
                rt: info.rt,
                rw: info.rw,
                kader: info.kader,
                batasWaktu: info.batasWaktu,
                ditugaskan: true,
                status: "belum-diukur",
              }
            : anak,
        ),
      )
    } else {
      const baru: AnakTugas = {
        id: `baru-${Date.now()}`,
        nama: info.nama,
        rt: info.rt,
        rw: info.rw,
        status: "belum-diukur",
        kader: info.kader,
        batasWaktu: info.batasWaktu,
        ditugaskan: true,
      }
      setAnakList((prev) => [baru, ...prev])
    }

    setIsCreating(false)
    setShowCreateModal(false)
    showAssignSuccess(info)
  }

  // Tombol "Perbarui": cek apakah balita sudah diukur minggu ini
  const handleRefreshStatus = async (anak: AnakTugas) => {
    setCheckingId(anak.id)
    try {
      const measurements = await getNakesMeasurements(500, 0)
      const list: Measurement[] = Array.isArray(measurements) ? measurements : []
      const isMeasured = list.some(
        (measurement) =>
          measurement.children_id === anak.id &&
          isInCurrentWeek(measurement.measured_at),
      )

      if (isMeasured) {
        setAnakList((prev) =>
          prev.map((item) =>
            item.id === anak.id ? { ...item, status: "selesai" } : item,
          ),
        )

        // Kirim notifikasi penyelesaian tugas ke Nakes
        try {
          const token = localStorage.getItem("centing_token")
          const nakesUserId = user?.id || (token ? getUserIdFromToken(token) : null)
          if (nakesUserId) {
            await createNotification({
              user_id: nakesUserId,
              title: `Pengukuran Selesai: ${anak.nama}`,
              message: `Balita ${anak.nama} (RT ${anak.rt} / RW ${anak.rw}) sudah selesai diukur oleh kader.`,
            })
            checkUnread()
          }
        } catch {
          // ignore network errors so status update still succeeds
        }

        setAlertState({
          type: "success",
          title: "Pengukuran Selesai",
          message: `${anak.nama} sudah selesai diukur minggu ini. Status diperbarui ke "Selesai Diukur".`,
        })
        setAlertState({
          type: "info",
          title: "Belum Diukur",
          message: `Data pengukuran ${anak.nama} minggu ini belum masuk.`,
        })
      }
    } catch {
      setAlertState({
        type: "error",
        title: "Gagal Memperbarui Status",
        message:
          "Terjadi masalah saat mengambil data pengukuran. Periksa koneksi lalu coba lagi.",
      })
    } finally {
      setCheckingId(null)
    }
  }

  const filterTabs: FilterTab[] = ["Semua", "Belum Diukur", "Selesai Diukur"]
  return (
    <main className="min-h-svh bg-gray-50 pb-24 flex flex-col">
      <NakesHeader
        title="Akun"
        onBack={() => navigate("/nakes/akun")}
        hasUnread={hasUnread}
        onNotificationClick={() => setShowNotification(true)}
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
              Penugasan Tugas
            </h1>
            <p className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
              Pilih Kader untuk mengunjungi dan mengukur anak-anak yang melewatkan jadwal pertemuan mereka.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="shrink-0 self-start px-4 py-2.5 bg-emerald-800 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Plus className="size-4 text-white" />
            <span className="text-white text-sm font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-5">
              Buat Tugas
            </span>
          </button>
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

        {isLoading ? (
          <div className="py-10 flex flex-col items-center gap-2 text-center">
            <span className="text-sm text-neutral-500 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
              Memuat data penugasan balita...
            </span>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-10 flex flex-col items-center gap-2 text-center">
            <AlertTriangle className="size-6 text-neutral-400" />
            <span className="text-sm text-neutral-500 font-['Plus_Jakarta_Sans:Regular',sans-serif]">
              {anakList.length === 0
                ? "Belum ada data balita terdaftar di database."
                : "Tidak ada data yang cocok dengan filter atau pencarian."}
            </span>
          </div>
        ) : null}

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
                      <span className="px-2 py-1 bg-emerald-100 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="size-3 text-emerald-800" />
                        <span className="text-emerald-800 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                          Selesai Diukur
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
                        Batas: {formatTanggal(anak.batasWaktu)}
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

                {anak.status === "selesai" ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                      Status Pengukuran:
                    </span>
                    <div className="px-3 py-2 bg-emerald-50 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-800 shrink-0" />
                      <span className="text-emerald-800 text-sm font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-5 truncate">
                        Sudah Diukur Minggu Ini
                      </span>
                    </div>
                    {anak.kader && (
                      <span className="text-neutral-600 text-xs font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif]">
                        Kader: {anak.kader}
                      </span>
                    )}
                  </div>
                ) : anak.ditugaskan ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                      Ditugaskan ke Kader:
                    </span>
                    <div className="px-3 py-2 bg-zinc-100 rounded-lg flex items-center gap-2">
                      <User className="size-4 text-emerald-800 shrink-0" />
                      <span className="text-zinc-900 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5 truncate">
                        {anak.kader}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRefreshStatus(anak)}
                      disabled={checkingId === anak.id}
                      className="px-4 py-2 bg-emerald-800 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
                    >
                      <span className="text-center text-white text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                        {checkingId === anak.id ? "Memeriksa..." : "Perbarui"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <span className="text-neutral-700 text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                      Tugaskan ke Kader & Tentukan Batas:
                    </span>

                    <div className="flex gap-2">
                      <select
                        value={anak.kader}
                        onChange={(e) => handleKaderChange(anak.id, e.target.value)}
                        className="flex-1 min-w-0 px-2 py-2 bg-zinc-100 rounded-lg text-zinc-900 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5 cursor-pointer focus:outline focus:outline-2 focus:outline-emerald-800"
                      >
                        <option value="">
                          {kaderOptions.length === 0 ? "Pilih Kader (Belum ada kader terdaftar)" : "Pilih Kader..."}
                        </option>
                        {kaderOptions.map((kader) => (
                          <option key={kader} value={kader}>
                            {kader}
                          </option>
                        ))}
                      </select>

                      <input
                        type="date"
                        value={anak.batasWaktu}
                        min={todayString()}
                        onChange={(e) => handleBatasWaktuChange(anak.id, e.target.value)}
                        className="flex-1 min-w-0 p-2 bg-zinc-100 rounded-lg text-zinc-900 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5 cursor-pointer focus:outline focus:outline-2 focus:outline-emerald-800"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAssign(anak)}
                      disabled={assigningId === anak.id}
                      className="px-4 py-2 bg-emerald-800 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
                    >
                      <span className="text-center text-white text-xs font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-4">
                        {assigningId === anak.id ? "Menugaskan..." : "Tugaskan"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateTaskModal
          anakList={anakList}
          kaderOptions={kaderOptions}
          isSubmitting={isCreating}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateSubmit}
        />
      )}

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

      {alertState && <AlertModal alert={alertState} onClose={() => setAlertState(null)} />}
      {showNotification && (
        <KaderNotification
          onClose={() => {
            setShowNotification(false)
            checkUnread()
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