import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, Check, Plus, Trash2 } from "lucide-react"

import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"
import { NakesToast, type ToastData } from "../../components/nakes/nakes-toast"

const MAX_PERTANYAAN = 5
const OPSI_LABEL = ["A", "B", "C", "D"] as const

type Pertanyaan = {
  id: string
  teks: string
  pilihan: [string, string, string, string]
  jawabanBenar: number
}

function createEmptyPertanyaan(): Pertanyaan {
  return {
    id: crypto.randomUUID(),
    teks: "",
    pilihan: ["", "", "", ""],
    jawabanBenar: 0,
  }
}

export function KuisBaruScreen() {
  const navigate = useNavigate()

  const [judulKuis, setJudulKuis] = useState("")
  const [durasi, setDurasi] = useState("")
  const [pertanyaanList, setPertanyaanList] = useState<Pertanyaan[]>([createEmptyPertanyaan()])
  const [toast, setToast] = useState<ToastData | null>(null)

  // State untuk alert interaktif "Kirim ke Kader"
  const [showKirimAlert, setShowKirimAlert] = useState(false)

  // State untuk alert interaktif konfirmasi hapus pertanyaan (id pertanyaan yang mau dihapus)
  const [pertanyaanToDelete, setPertanyaanToDelete] = useState<string | null>(null)

  const handleAddPertanyaan = () => {
    if (pertanyaanList.length >= MAX_PERTANYAAN) {
      setToast({ type: "error", message: `Maksimal ${MAX_PERTANYAAN} pertanyaan per kuis.` })
      return
    }
    setPertanyaanList((prev) => [...prev, createEmptyPertanyaan()])
  }

  const handleRemovePertanyaan = (id: string) => {
    if (pertanyaanList.length === 1) {
      setToast({ type: "error", message: "Kuis harus memiliki minimal 1 pertanyaan." })
      return
    }
    setPertanyaanToDelete(id)
  }

  const handleConfirmRemovePertanyaan = () => {
    if (!pertanyaanToDelete) return
    setPertanyaanList((prev) => prev.filter((p) => p.id !== pertanyaanToDelete))
    setPertanyaanToDelete(null)
  }

  const handlePertanyaanTextChange = (id: string, teks: string) => {
    setPertanyaanList((prev) => prev.map((p) => (p.id === id ? { ...p, teks } : p)))
  }

  const handlePilihanChange = (id: string, index: number, value: string) => {
    setPertanyaanList((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const pilihan = [...p.pilihan] as [string, string, string, string]
        pilihan[index] = value
        return { ...p, pilihan }
      }),
    )
  }

  const handleJawabanBenarChange = (id: string, index: number) => {
    setPertanyaanList((prev) => prev.map((p) => (p.id === id ? { ...p, jawabanBenar: index } : p)))
  }

  const validate = (): string | null => {
    if (judulKuis.trim().length === 0) return "Judul Kuis wajib diisi."

    for (let i = 0; i < pertanyaanList.length; i++) {
      const p = pertanyaanList[i]
      if (p.teks.trim().length === 0) return `Pertanyaan ${i + 1} belum diisi.`
      const kosong = p.pilihan.some((opsi) => opsi.trim().length === 0)
      if (kosong) return `Semua pilihan jawaban pada Pertanyaan ${i + 1} wajib diisi.`
    }

    return null
  }

  const handleSubmit = () => {
    const error = validate()
    if (error) {
      setToast({ type: "error", message: error })
      return
    }

    // TODO: kirim ke POST /api/kuis
    setToast({
      type: "success",
      message: `Kuis "${judulKuis}" berhasil dikirimkan dan siap diikuti oleh Kader.`,
    })

    window.setTimeout(() => navigate("/nakes/akun"), 1200)
  }

  // Membuka alert interaktif "Kirim ke Kader" (validasi dulu sebelum tampil)
  const handleOpenKirimAlert = () => {
    const error = validate()
    if (error) {
      setToast({ type: "error", message: error })
      return
    }
    setShowKirimAlert(true)
  }

  // Konfirmasi dari dalam alert interaktif
  const handleConfirmKirimKader = () => {
    // TODO: kirim ke POST /api/kuis/kirim-kader
    setShowKirimAlert(false)
    setToast({
      type: "success",
      message: `Kuis "${judulKuis}" berhasil dikirim ke Kader!`,
    })
  }

  return (
    <main className="min-h-svh bg-gray-50 pb-32 flex flex-col">
      <NakesHeader title="Akun" />

      <NakesToast toast={toast} onClose={() => setToast(null)} />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
            Buat Kuis Kader
          </h1>
          <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
            Buat modul evaluasi singkat untuk mengukur pemahaman Kader mengenai stunting.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 w-full">
          {/* Informasi Dasar Kuis */}
          <div className="p-4 bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3 h-fit">
            <h2 className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
              Informasi Dasar Kuis
            </h2>

            <div className="flex flex-col gap-1">
              <label className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                Judul Kuis
              </label>
              <input
                value={judulKuis}
                onChange={(e) => setJudulKuis(e.target.value)}
                placeholder="Contoh: Deteksi Dini Stunting Balita"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm font-normal font-['Manrope:Regular',sans-serif] placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-emerald-800"
              />
            </div>

            <div className="pt-2 flex flex-col gap-1">
              <label className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                Durasi Maksimal (Opsional)
              </label>
              <div className="relative flex items-center bg-gray-50 rounded-lg">
                <input
                  type="number"
                  min={0}
                  value={durasi}
                  onChange={(e) => setDurasi(e.target.value)}
                  placeholder="Contoh: 15"
                  className="flex-1 min-w-0 h-11 px-4 bg-transparent text-sm font-normal font-['Manrope:Regular',sans-serif] placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-emerald-800 rounded-lg"
                />
                <span className="pr-4 text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] shrink-0">
                  Menit
                </span>
              </div>
            </div>
          </div>

          {/* Daftar Pertanyaan */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
                Daftar Pertanyaan
              </h2>
              <span className="px-3 py-1 bg-emerald-300 rounded-full flex items-center gap-1 shrink-0">
                <Check className="size-3.5 text-emerald-800" />
                <span className="text-emerald-800 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                  {pertanyaanList.length} dari {MAX_PERTANYAAN}
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {pertanyaanList.map((pertanyaan, index) => (
                <div
                  key={pertanyaan.id}
                  className="p-4 relative bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3 overflow-hidden"
                >
                  <div className="absolute left-0 top-0 w-1 h-full bg-emerald-800" />

                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-emerald-800/10 rounded-md text-emerald-800 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                      Pertanyaan {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePertanyaan(pertanyaan.id)}
                      className="p-1 rounded-full cursor-pointer transition-colors hover:bg-red-50"
                      aria-label={`Hapus pertanyaan ${index + 1}`}
                    >
                      <Trash2 className="size-3.5 text-red-700" />
                    </button>
                  </div>

                  <textarea
                    value={pertanyaan.teks}
                    onChange={(e) => handlePertanyaanTextChange(pertanyaan.id, e.target.value)}
                    placeholder="Tuliskan pertanyaan di sini..."
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm font-normal font-['Manrope:Regular',sans-serif] placeholder:text-neutral-500 resize-none focus:outline focus:outline-2 focus:outline-emerald-800"
                  />

                  <div className="flex flex-col gap-2">
                    {pertanyaan.pilihan.map((opsi, opsiIndex) => {
                      const isCorrect = pertanyaan.jawabanBenar === opsiIndex
                      return (
                        <div key={opsiIndex} className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleJawabanBenarChange(pertanyaan.id, opsiIndex)}
                            className={`size-6 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                              isCorrect
                                ? "bg-emerald-800 outline outline-2 outline-offset-[-2px] outline-emerald-800"
                                : "outline outline-2 outline-offset-[-2px] outline-neutral-400 hover:outline-emerald-800"
                            }`}
                            aria-label={`Tandai pilihan ${OPSI_LABEL[opsiIndex]} sebagai jawaban benar`}
                          >
                            {isCorrect && <span className="size-2.5 bg-white rounded-full" />}
                          </button>
                          <div className="relative flex-1 min-w-0">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-700 text-base font-normal font-['Manrope:Regular',sans-serif]">
                              {OPSI_LABEL[opsiIndex]}
                            </span>
                            <input
                              value={opsi}
                              onChange={(e) => handlePilihanChange(pertanyaan.id, opsiIndex, e.target.value)}
                              placeholder={`Pilihan jawaban ${OPSI_LABEL[opsiIndex]}`}
                              className="w-full min-w-0 pl-8 pr-4 py-2 bg-gray-50 rounded-lg text-sm font-normal font-['Manrope:Regular',sans-serif] placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-emerald-800"
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <p className="text-neutral-700 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
                    *Pilih radio button untuk menandai jawaban yang benar.
                  </p>
                </div>
              ))}
            </div>

            {/* Tombol Kirim Kader - tampil setelah pertanyaan terakhir */}
            <button
              type="button"
              onClick={handleOpenKirimAlert}
              className="py-3 bg-emerald-800 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Check className="size-3.5 text-white" />
              <span className="text-center text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                Kirim ke Kader
              </span>
            </button>

            <button
              type="button"
              onClick={handleAddPertanyaan}
              disabled={pertanyaanList.length >= MAX_PERTANYAAN}
              className={`pt-4 pb-3 bg-emerald-800/5 rounded-xl outline outline-2 outline-offset-[-2px] outline-emerald-800 flex justify-center items-center gap-2 transition-colors ${
                pertanyaanList.length >= MAX_PERTANYAAN
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-emerald-800/10"
              }`}
            >
              <Plus className="size-4 text-emerald-800" />
              <span className="text-center text-emerald-800 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                Tambah Pertanyaan
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed submit bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gray-50/90 shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.05)] backdrop-blur-[6px]">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto sm:ml-auto sm:flex py-3.5 sm:px-8 bg-emerald-800 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Check className="size-3.5 text-white" />
            <span className="text-center text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
              Simpan &amp; Publikasikan Kuis
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

      {/* Alert interaktif konfirmasi Kirim ke Kader */}
      {showKirimAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowKirimAlert(false)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="size-12 rounded-full bg-emerald-800/10 flex items-center justify-center">
                <Check className="size-6 text-emerald-800" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-zinc-900 text-base font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-6">
                  Kirim Kuis ke Kader?
                </h3>
                <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
                  Kuis <span className="font-semibold text-zinc-900">"{judulKuis}"</span> dengan{" "}
                  {pertanyaanList.length} pertanyaan akan langsung dikirim dan bisa diakses oleh
                  Kader.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowKirimAlert(false)}
                className="flex-1 py-3 bg-gray-50 rounded-xl flex justify-center items-center cursor-pointer transition-colors hover:bg-gray-100"
              >
                <span className="text-center text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                  Batal
                </span>
              </button>
              <button
                type="button"
                onClick={handleConfirmKirimKader}
                className="flex-1 py-3 bg-emerald-800 rounded-xl flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
              >
                <Check className="size-3.5 text-white" />
                <span className="text-center text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                  Ya, Kirim
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert interaktif konfirmasi hapus pertanyaan */}
      {pertanyaanToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setPertanyaanToDelete(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="size-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="size-6 text-red-700" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-zinc-900 text-base font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-6">
                  Hapus Pertanyaan?
                </h3>
                <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
                  Apakah Anda yakin ingin menghapus pertanyaan ini? Tindakan ini tidak dapat
                  dibatalkan.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPertanyaanToDelete(null)}
                className="flex-1 py-3 bg-gray-50 rounded-xl flex justify-center items-center cursor-pointer transition-colors hover:bg-gray-100"
              >
                <span className="text-center text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                  Batal
                </span>
              </button>
              <button
                type="button"
                onClick={handleConfirmRemovePertanyaan}
                className="flex-1 py-3 bg-red-700 rounded-xl flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
              >
                <Trash2 className="size-3.5 text-white" />
                <span className="text-center text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
                  Ya, Hapus
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}