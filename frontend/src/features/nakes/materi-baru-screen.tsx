import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check } from "lucide-react"

import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"
import { NakesToast, type ToastData } from "../../components/nakes/nakes-toast"

const kategoriOptions = ["Nutrisi", "Stimulasi", "Kesehatan", "Info Kader", "Gizi Anak"]

export function MateriBaruScreen() {
  const navigate = useNavigate()

  const [judul, setJudul] = useState("")
  const [kategori, setKategori] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [link, setLink] = useState("")
  const [toast, setToast] = useState<ToastData | null>(null)

  const isValid = judul.trim().length > 0 && kategori.length > 0 && deskripsi.trim().length > 0

  const handlePublish = () => {
    if (!isValid) {
      setToast({
        type: "error",
        message: "Lengkapi Judul Materi, Kategori, dan Deskripsi Singkat terlebih dahulu.",
      })
      return
    }

    // TODO: kirim ke POST /api/materi
    setToast({
      type: "success",
      message: `Materi "${judul}" berhasil dipublikasikan dan sudah bisa dilihat oleh Kader dan Orang Tua.`,
    })

    window.setTimeout(() => navigate("/nakes/akun"), 1200)
  }

  return (
    <main className="min-h-svh bg-gray-50 pb-24 flex flex-col">
      <NakesHeader title="Akun" />

      <NakesToast toast={toast} onClose={() => setToast(null)} />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-6 flex flex-col gap-6">
        <h1 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
          Post Materi Edukasi
        </h1>

        <div className="flex flex-col gap-6  w-full">
          <div className="flex flex-col gap-1">
            <label className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
              Judul Materi
            </label>
            <input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Pentingnya MPASI 6 Bulan"
              className="w-full h-12 px-4 py-3 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] text-base font-normal font-['Manrope:Regular',sans-serif] placeholder:text-slate-300 focus:outline focus:outline-2 focus:outline-emerald-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
              Kategori Materi
            </label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className={`w-full h-12 px-4 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] text-base font-normal font-['Manrope:Regular',sans-serif] cursor-pointer focus:outline focus:outline-2 focus:outline-emerald-800 ${
                kategori ? "text-zinc-900" : "text-slate-300"
              }`}
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              {kategoriOptions.map((opt) => (
                <option key={opt} value={opt} className="text-zinc-900">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
              Deskripsi Singkat
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tuliskan ringkasan materi di sini..."
              rows={5}
              className="w-full px-4 py-4 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] text-base font-normal font-['Manrope:Regular',sans-serif] placeholder:text-slate-300 resize-none focus:outline focus:outline-2 focus:outline-emerald-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
              Link Materi/Video (Opsional)
            </label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full h-12 px-4 py-3 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] text-base font-normal font-['Manrope:Regular',sans-serif] placeholder:text-slate-300 focus:outline focus:outline-2 focus:outline-emerald-800"
            />
          </div>

          <button
            type="button"
            onClick={handlePublish}
            className="h-14 py-3.5 bg-emerald-800 rounded-full shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] flex justify-center items-center gap-3 cursor-pointer transition-transform hover:scale-[1.01] active:scale-95"
          >
            <Check className="size-3.5 text-white" />
            <span className="text-center text-white text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
              Publikasikan Materi
            </span>
          </button>
        </div>
      </div>

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