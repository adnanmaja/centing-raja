import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Check, Ruler } from "lucide-react"

export function InputDataAnakBerhasilScreen() {
  const navigate = useNavigate()
  const location = useLocation()

  const state = (location.state ?? {}) as {
    anak?: {
      nama: string
      usiaBulan: string
      jenisKelamin: string
    }
  }

  const anak = state.anak

  return (
    <main className="min-h-svh bg-gray-50 flex flex-col items-center justify-center px-5 py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative size-32 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-emerald-300/20 rounded-full" />
          <div className="absolute inset-2 bg-emerald-800 rounded-full flex items-center justify-center">
            <Check className="size-14 text-white" strokeWidth={3} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <h1 className="text-center text-emerald-800 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8 sm:text-3xl">
            Pendaftaran Data
            <br />
            Anak Berhasil!
          </h1>
          <p className="max-w-md text-center text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5 sm:text-base">
            Data si kecil telah aman tersimpan. Sekarang Anda dapat mulai memantau tumbuh kembangnya secara rutin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="w-full p-4 relative bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3 overflow-hidden sm:max-w-xl"
        >
          <div className="absolute left-0 top-0 w-1 h-full bg-emerald-800" />

          <div className="pb-3 border-b border-zinc-200/50 flex items-center justify-between">
            <span className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
              Ringkasan Data
            </span>
            <Check className="size-4 text-emerald-800" />
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <SummaryRow label="Nama Anak" value={anak?.nama || "-"} />
            <SummaryRow label="Jenis Kelamin" value={anak?.jenisKelamin || "-"} />
            <SummaryRow label="Usia Saat Ini" value={anak ? `${anak.usiaBulan} Bulan` : "-"} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="w-full flex flex-col gap-3 sm:max-w-xl"
        >
          <button
            type="button"
            onClick={() => navigate("/nakes/pengukuran", { state: { anak } })}
            className="h-12 bg-emerald-800 rounded-full shadow-[0px_4px_6px_-1px_rgba(0,109,66,0.20)] flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Ruler className="size-3.5 text-white" />
            <span className="text-center text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
              Lakukan Pengukuran
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/nakes")}
            className="h-12 rounded-full flex justify-center items-center cursor-pointer transition-colors hover:bg-emerald-50"
          >
            <span className="text-center text-emerald-800 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
              Kembali ke Beranda
            </span>
          </button>
        </motion.div>
      </div>
    </main>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-neutral-700 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
        {label}
      </span>
      <span className="text-right text-zinc-900 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
        {value}
      </span>
    </div>
  )
}