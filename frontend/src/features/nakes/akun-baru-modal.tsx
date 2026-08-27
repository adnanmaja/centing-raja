import { useState } from "react"
import { X } from "lucide-react"

export type Role = "Kader" | "Orang Tua"

export type AkunBaruData = {
  nama: string
  nik: string
  role: Role
}

export function AkunBaruModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: (data: AkunBaruData) => void
}) {
  const [nama, setNama] = useState("")
  const [nik, setNik] = useState("")
  const [role, setRole] = useState<Role>("Kader")

  const isValid = nama.trim().length > 0 && nik.trim().length >= 10

  const handleSubmit = () => {
    if (!isValid) {
      window.alert("Lengkapi nama dan NIK (minimal 10 digit) terlebih dahulu.")
      return
    }
    onSubmit({ nama: nama.trim(), nik: nik.trim(), role })
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col gap-5 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-zinc-900 text-xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
            Tambah Akun Baru
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-zinc-100"
            aria-label="Tutup"
          >
            <X className="size-4 text-neutral-700" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
              Nama Lengkap
            </label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Dewi Anggraini"
              className="h-11 px-3 bg-zinc-100 rounded-lg text-sm font-normal font-['Manrope:Regular',sans-serif] placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-emerald-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
              NIK
            </label>
            <input
              value={nik}
              onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
              placeholder="Masukkan 16 digit NIK"
              maxLength={16}
              className="h-11 px-3 bg-zinc-100 rounded-lg text-sm font-normal font-['Manrope:Regular',sans-serif] placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-emerald-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
              Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["Kader", "Orang Tua"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2.5 rounded-lg text-sm font-semibold font-['Manrope:SemiBold',sans-serif] cursor-pointer transition-colors ${
                    role === r
                      ? "bg-emerald-800 text-white"
                      : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-full text-slate-600 text-sm font-semibold font-['Manrope:SemiBold',sans-serif] cursor-pointer transition-colors hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 bg-emerald-800 rounded-full text-white text-sm font-semibold font-['Manrope:SemiBold',sans-serif] cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}