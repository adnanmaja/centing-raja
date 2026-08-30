import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { ProfileHeader } from "../../components/kader/profile-header"
import { ProfileBottomNav } from "../../components/kader/profile-bottom-nav"

export function DataBerhasilDisimpan({
  onHome,
  onDetails,
  onMaterial,
  onProfile,
}: {
  onHome: () => void
  onDetails: () => void
  onMaterial: () => void
  onProfile: () => void
}) {
  return (
    <main className="flex min-h-svh flex-col bg-[#f8f9fa] pb-20 pt-16 text-[#191c1d]" aria-label="Data Berhasil Disimpan">
      <ProfileHeader title="Beranda" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-10 sm:px-8 xl:py-14"
      >
        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="relative size-48 sm:size-52"
          >
            <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[#76d69f]/20 blur-xl" />
            <div className="absolute inset-6 flex items-center justify-center rounded-full bg-[#007c4a]">
              <Check className="size-16 text-white" strokeWidth={3} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mt-8 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8"
          >
            Data Berhasil Disimpan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="mt-2 max-w-md font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]"
          >
            Laporan antropometri balita telah berhasil dikirimkan ke sistem Tenaga Kesehatan (Nakes).
          </motion.p>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="mt-8 flex w-full max-w-lg items-center gap-4 rounded-2xl bg-[#f3f4f5] p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#76d69f] text-[#005c38]">
              <Check className="size-5" />
            </span>
            <div>
              <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#3e4941]">
                Data Disimpan Untuk
              </p>
              <h2 className="mt-1 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                Ahmad Raihan
              </h2>
            </div>
          </motion.article>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-10 flex w-full max-w-lg flex-col gap-3 self-center"
        >
          <button
            type="button"
            onClick={onHome}
            className="min-h-12 w-full rounded-full bg-[#007c4a] font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_5px_12px_rgba(0,109,66,0.2)] transition hover:bg-[#006d42] active:scale-[0.98]"
          >
            Kembali ke Beranda
          </button>
          <button
            type="button"
            onClick={onDetails}
            className="min-h-12 w-full rounded-full border border-[#007c4a] bg-white font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-[#007c4a] transition hover:bg-[#e9f7ef] active:scale-[0.98]"
          >
            Lihat Detail Input
          </button>
        </motion.section>
      </motion.div>

      <ProfileBottomNav active="Beranda" onHome={onHome} onMaterial={onMaterial} onTasks={onDetails} onProfile={onProfile} />
    </main>
  )
}