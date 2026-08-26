import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Baby, Check, MapPin } from "lucide-react"

import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"

const heroImage = "https://placehold.co/390x192"

type JenisKelamin = "Laki-laki" | "Perempuan"

export function InputDataAnakNakesScreen() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nama: "",
    usiaBulan: "",
    jenisKelamin: "" as JenisKelamin | "",
    rt: "",
    rw: "",
    alamat: "",
  })

  const handleChange =
    (field: "nama" | "usiaBulan" | "rt" | "rw" | "alamat") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const isValid =
    form.nama.trim().length > 0 &&
    form.usiaBulan.trim().length > 0 &&
    form.jenisKelamin.length > 0 &&
    form.rt.trim().length > 0 &&
    form.rw.trim().length > 0 &&
    form.alamat.trim().length > 0

  const handleSave = () => {
    if (!isValid) return
    // TODO: kirim ke POST /api/anak
    navigate("/nakes/input/berhasil", { state: { anak: form } })
  }

  return (
    <main className="min-h-svh bg-gray-50 pb-32 flex flex-col">
      <NakesHeader title="Input" />

      <div className="relative">
        <div className="h-48 relative bg-gray-200 rounded-bl-3xl rounded-br-3xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-white/80 to-white/0" />
        </div>

        <div className="px-5 -mt-6 flex flex-col gap-6">
          <div className="p-4 bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-2">
            <h1 className="text-emerald-800 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
              Input Data Anak
            </h1>
            <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
              Langkah pertama untuk memantau tumbuh kembang si kecil dengan penuh kasih sayang.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Identitas Anak */}
            <div className="p-4 bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Baby className="size-4 text-emerald-800" />
                <h2 className="text-emerald-800 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
                  Identitas Anak
                </h2>
              </div>

              <FieldText
                label="Nama Lengkap"
                placeholder="Contoh: Budi Santoso"
                value={form.nama}
                onChange={handleChange("nama")}
              />

              <div className="flex flex-col gap-2">
                <label className="px-1 text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                  Usia (Bulan)
                </label>
                <div className="relative flex items-center bg-zinc-100 rounded-xl">
                  <input
                    type="number"
                    min={0}
                    value={form.usiaBulan}
                    onChange={handleChange("usiaBulan")}
                    placeholder="0"
                    className="flex-1 h-12 px-4 bg-transparent text-base font-normal font-['Manrope:Regular',sans-serif] placeholder:text-stone-300 focus:outline focus:outline-2 focus:outline-emerald-800 rounded-xl"
                  />
                  <span className="pr-4 text-neutral-500 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
                    Bulan
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="px-1 text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                  Jenis Kelamin
                </label>
                <div className="flex gap-3">
                  {(["Laki-laki", "Perempuan"] as JenisKelamin[]).map((jk) => (
                    <button
                      key={jk}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, jenisKelamin: jk }))}
                      className={`flex-1 px-2 py-3 rounded-xl flex justify-center items-center gap-2 cursor-pointer transition-colors ${
                        form.jenisKelamin === jk
                          ? "bg-emerald-800 text-white"
                          : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                      }`}
                    >
                      <span className="text-center text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                        {jk}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tempat Tinggal */}
            <div className="p-4 bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-slate-600" />
                <h2 className="text-slate-600 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
                  Tempat Tinggal
                </h2>
              </div>

              <div className="flex gap-4">
                <FieldText
                  label="RT"
                  placeholder="001"
                  value={form.rt}
                  onChange={handleChange("rt")}
                />
                <FieldText
                  label="RW"
                  placeholder="002"
                  value={form.rw}
                  onChange={handleChange("rw")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="px-1 text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                  Alamat Lengkap
                </label>
                <textarea
                  value={form.alamat}
                  onChange={handleChange("alamat")}
                  placeholder="Nama jalan, nomor rumah, kelurahan..."
                  rows={3}
                  className="px-4 py-3 bg-zinc-100 rounded-xl text-base font-normal font-['Manrope:Regular',sans-serif] placeholder:text-stone-300 resize-none focus:outline focus:outline-2 focus:outline-emerald-800"
                />
              </div>
            </div>

            <button
              type="button"
              disabled={!isValid}
              onClick={handleSave}
              className={`py-4 rounded-full shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] flex justify-center items-center gap-2 transition-opacity cursor-pointer ${
                isValid ? "bg-emerald-800 opacity-100" : "bg-emerald-800 opacity-50 cursor-not-allowed"
              }`}
            >
              <Check className="size-4 text-white" />
              <span className="text-center text-white text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-8">
                Simpan Data
              </span>
            </button>
          </div>
        </div>
      </div>

      <NakesBottomNav
        active="Input"
        onHome={() => navigate("/nakes")}
        onData={() => navigate("/nakes/data")}
        onInput={() => navigate("/nakes/input")}
        onAkun={() => navigate("/nakes/akun")}
      />
    </main>
  )
}

function FieldText({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <label className="px-1 text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 px-4 bg-zinc-100 rounded-xl text-base font-normal font-['Manrope:Regular',sans-serif] placeholder:text-stone-300 focus:outline focus:outline-2 focus:outline-emerald-800"
      />
    </div>
  )
}