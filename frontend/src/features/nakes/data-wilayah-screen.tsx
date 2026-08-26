import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertCircle, Building2, Check, MapPin } from "lucide-react"

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

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSave = () => {
  // TODO: kirim ke POST /api/wilayah dulu, baru navigate setelah sukses
  navigate("/nakes/data/rt", {
    state: {
      kecamatan: form.kecamatan,
      rw: form.jumlahRw,
      rt: form.jumlahRt,
    },
  })
}

  const isValid =
    form.kecamatan.trim().length > 0 &&
    form.posyandu.trim().length > 0 &&
    form.jumlahRw.trim().length > 0 &&
    form.jumlahRt.trim().length > 0

  return (
    <main className="min-h-svh bg-gray-50 pb-24 flex flex-col">
      <NakesHeader title="Data" />

      <div className="flex-1 px-5 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
            Data Wilayah Administratif
          </h1>
          <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
            Lengkapi informasi kecamatan, nama posyandu, RW, dan RT untuk memastikan pemetaan data stunting yang akurat di wilayah Anda.
          </p>
        </div>

        <div className="flex flex-col gap-6">
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

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="button"
              disabled={!isValid}
              onClick={handleSave}
              className={`h-12 py-3 rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2 transition-opacity cursor-pointer ${
                isValid ? "bg-emerald-800 opacity-100" : "bg-emerald-800 opacity-50 cursor-not-allowed"
              }`}
            >
              <Check className="size-3.5 text-white" />
              <span className="text-white text-base font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-6">
                Simpan Data Wilayah
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