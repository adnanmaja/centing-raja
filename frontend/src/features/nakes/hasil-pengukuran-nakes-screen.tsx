import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Check, Ruler, Scale } from "lucide-react"
import { formatStuntingStatus, type Child, type Measurement } from "../../lib/api"

import { NakesHeader } from "../../components/nakes/nakes-header"

export function HasilPengukuranNakesScreen() {
  const navigate = useNavigate()
  const location = useLocation()

  const state = (location.state ?? {}) as {
    anak?: { id?: string; nama: string; usiaBulan: string; jenisKelamin: string }
    child?: Child
    measurement?: Measurement
    pengukuran?: {
      beratBadan: string
      tinggiBadan: string
      posisiUkur: string
      lingkarKepala: string
      lila: string
    }
  }

  const anak = state.anak
  const child = state.child
  const measurement = state.measurement
  const pengukuran = state.pengukuran
  const statusInfo = formatStuntingStatus(measurement?.stunting_status)

  return (
    <main className="min-h-svh bg-gray-50 flex flex-col">
      <NakesHeader title="Beranda" />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-8 sm:py-12 flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative size-32 flex items-center justify-center shrink-0"
        >
          <div className="absolute inset-0 bg-emerald-300/20 rounded-full" />
          <div className="absolute inset-2 bg-emerald-800 rounded-full flex items-center justify-center">
            <Check className="size-14 text-white" strokeWidth={3} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col items-center gap-2 max-w-2xl"
        >
          <h1 className="text-center text-zinc-900 text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-8">
            Data Berhasil Disimpan!
          </h1>
          <p className="text-center text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
            Terima kasih telah melakukan pengukuran. Data ini sangat berharga untuk memantau status tumbuh kembang si kecil.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="w-full max-w-2xl p-4 bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4"
        >
          <span className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] uppercase leading-4 tracking-wide">
            Ringkasan Data
          </span>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-8 bg-zinc-100 rounded-full flex items-center justify-center">
                  <Scale className="size-3.5 text-slate-600" />
                </span>
                <span className="text-zinc-900 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
                  Berat Badan
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
                  {pengukuran?.beratBadan || "-"}
                </span>
                <span className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
                  kg
                </span>
              </div>
            </div>

            <div className="h-px bg-zinc-200" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-8 bg-zinc-100 rounded-full flex items-center justify-center">
                  <Ruler className="size-3.5 text-slate-600" />
                </span>
                <span className="text-zinc-900 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
                  Tinggi Badan
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
                  {pengukuran?.tinggiBadan || "-"}
                </span>
                <span className="text-neutral-700 text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
                  cm
                </span>
              </div>
            </div>

            <div className="h-px bg-zinc-200" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-8 bg-zinc-100 rounded-full flex items-center justify-center">
                  <Check className="size-3.5 text-slate-600" />
                </span>
                <span className="text-zinc-900 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
                  Status
                </span>
              </div>
              <span className={`px-3 py-1 ${statusInfo.badgeBg} rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center gap-1`}>
                <Check className={`size-3 ${statusInfo.badgeText}`} />
                <span className={`${statusInfo.badgeText} text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4`}>
                  {statusInfo.shortLabel}
                </span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="w-full max-w-2xl flex flex-col gap-3"
        >
          <button
            type="button"
            onClick={() => navigate("/nakes/pertumbuhan", { state: { anak, child, measurement, pengukuran } })}
            className="px-4 py-3 bg-emerald-800 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="text-center text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
              Lihat Detail Pertumbuhan
            </span>
            <ArrowRight className="size-3 text-white" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/nakes")}
            className="px-4 py-3 rounded-lg flex justify-center items-center cursor-pointer transition-colors hover:bg-emerald-50"
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