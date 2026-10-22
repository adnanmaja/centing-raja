import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertCircle, Building2, Check, Loader2, MapPin } from "lucide-react"
import { getNakesWilayah, saveNakesWilayah } from "../../lib/api"

import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"

export function DataWilayahScreen() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    kecamatan: "",
    posyandu: "",
    jumlahRw: "",
    jumlahRt: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    getNakesWilayah()
      .then((data) => {
        if (active && data) {
          setForm({
            kecamatan: data.kecamatan || "",
            posyandu: data.posyandu || "",
            jumlahRw: data.jumlah_rw ? String(data.jumlah_rw) : "",
            jumlahRt: data.jumlah_rt ? String(data.jumlah_rt) : "",
          })
        }
      })
      .catch(() => {
        // Wilayah might not be configured yet, ignore 404
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setErrorMessage(null)
    }

  const handleSave = async () => {
    if (!isValid || isSaving) return
    setIsSaving(true)
    setErrorMessage(null)
    try {
      await saveNakesWilayah({
        kecamatan: form.kecamatan.trim(),
        posyandu: form.posyandu.trim(),
        jumlah_rw: Math.max(1, parseInt(form.jumlahRw, 10) || 1),
        jumlah_rt: Math.max(1, parseInt(form.jumlahRt, 10) || 1),
      })
      navigate("/nakes/data/rt", {
        state: {
          kecamatan: form.kecamatan.trim(),
          rw: form.jumlahRw.trim(),
          rt: form.jumlahRt.trim(),
        },
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan data wilayah"
      setErrorMessage(msg)
    } finally {
      setIsSaving(false)
    }
  }
  const isValid =
    form.kecamatan.trim().length > 0 &&
    form.posyandu.trim().length > 0 &&
    form.jumlahRw.trim().length > 0 &&
    form.jumlahRt.trim().length > 0

  return (
    <main className="min-h-svh bg-gray-50 pb-24 flex flex-col">
      <NakesHeader title="Data" />

      <div className="flex-1 mx-auto w-full max-w-6xl px-5 sm:px-8 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
            Data Wilayah Administratif
          </h1>
          <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
            Lengkapi informasi kecamatan, nama posyandu, RW, dan RT untuk memastikan pemetaan data stunting yang akurat di wilayah Anda.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <Field
            label="Nama Kecamatan"
            placeholder="Masukkan nama kecamatan"
            icon={<MapPin className="size-4 text-slate-600" />}
            value={form.kecamatan}
            onChange={handleChange("kecamatan")}
          />

          <Field
            label="Nama Posyandu"
            placeholder="Masukkan nama posyandu"
            icon={<Building2 className="size-5 text-slate-600" />}
            value={form.posyandu}
            onChange={handleChange("posyandu")}
          />

          <div className="flex gap-4">
            <Field
              label="Jumlah RW"
              placeholder="0"
              type="number"
              icon={<span className="text-slate-600 text-sm font-bold">RW</span>}
              value={form.jumlahRw}
              onChange={handleChange("jumlahRw")}
            />
            <Field
              label="Jumlah RT"
              placeholder="0"
              type="number"
              icon={<span className="text-slate-600 text-sm font-bold">RT</span>}
              value={form.jumlahRt}
              onChange={handleChange("jumlahRt")}
            />
          </div>

          <div className="p-4 bg-emerald-300/20 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-start gap-3">
            <div className="size-10 bg-emerald-300 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle className="size-5 text-emerald-800" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
                Penting
              </span>
              <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
                Pastikan jumlah RW dan RT sesuai dengan SK pembagian wilayah terbaru untuk kelancaran tugas kader posyandu.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-red-700 text-sm">
              {errorMessage}
            </div>
          )}

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="button"
              disabled={!isValid || isSaving || isLoading}
              onClick={handleSave}
              className={`h-12 py-3 rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2 transition-opacity cursor-pointer ${
                isValid && !isSaving && !isLoading
                  ? "bg-emerald-800 opacity-100"
                  : "bg-emerald-800 opacity-50 cursor-not-allowed"
              }`}
            >
              {isSaving ? (
                <Loader2 className="size-4 text-white animate-spin" />
              ) : (
                <Check className="size-3.5 text-white" />
              )}
              <span className="text-white text-base font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-6">
                {isSaving ? "Menyimpan..." : "Simpan Data Wilayah"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-12 py-3 rounded-full flex justify-center items-center cursor-pointer transition-colors hover:bg-gray-100"
            >
              <span className="text-slate-600 text-base font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-6">
                Batal
              </span>
            </button>
          </div>
        </div>
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

function Field({
  label,
  placeholder,
  icon,
  value,
  onChange,
  type = "text",
}: {
  label: string
  placeholder: string
  icon: React.ReactNode
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <label className="text-zinc-900 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-4">{icon}</span>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full h-12 pl-12 pr-3 py-3 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-300 text-zinc-900 text-base font-normal font-['Manrope:Regular',sans-serif] placeholder:text-gray-400 focus:outline-2 focus:outline-emerald-800"
        />
      </div>
    </div>
  )
}