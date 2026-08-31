import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"

import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"
import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { formatAge, formatStuntingStatus, type Child, type Measurement } from "../../lib/api"

const childSuccessMark = "/images/centang-hijau.png"
const childSuccessLogo = "/logo/logo-centing-raja.png"
const measurementSuccessMarkParent = "/images/centang-hijau.png"
const measurementSuccessLogoParent = "/logo/logo-centing-raja.png"

export function DataAnakBerhasilDisimpan({
  child,
  onContinue,
  onHome,
  onMaterial,
  onInput,
}: {
  child?: boolean
  onContinue: () => void
  onHome: () => void
  onMaterial: () => void
  onInput: () => void
}) {
  const title = child ? "Pendaftaran Data Anak Berhasil!" : "Data Berhasil Disimpan!"
  const description = child
    ? "Data si kecil telah aman tersimpan. Sekarang Anda dapat mulai memantau tumbuh kembangnya secara rutin."
    : "Terima kasih telah melakukan pengukuran. Data ini sangat berharga untuk memantau status tumbuh kembang si kecil."
  const logo = child ? childSuccessLogo : measurementSuccessLogoParent
  const mark = child ? childSuccessMark : measurementSuccessMarkParent
  const location = useLocation()
  const state = (location.state ?? {}) as {
    child?: Child
    measurement?: Measurement
  }
  const liveChild = state.child
  const liveMeasurement = state.measurement
  const statusInfo = formatStuntingStatus(liveMeasurement?.stunting_status)

  return (
    <main data-reveal-page className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]" aria-label={title}>
      <ParentInputHeader logo={logo} title={child ? "Input" : "Beranda"} />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-xl flex-col items-center px-5 py-10 text-center sm:py-14"
      >
        <motion.img
          src={mark}
          alt="Berhasil"
          initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
          className="size-32 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.10)]"
        />

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 max-w-md font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold leading-8 text-[#007c4a] sm:text-3xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-3 max-w-md font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]"
        >
          {description}
        </motion.p>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-8 w-full rounded-xl border-l-4 border-[#007c4a] bg-white p-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
        >
          <p className="font-['Manrope:SemiBold',sans-serif] text-xs uppercase text-[#3e4941]">Ringkasan Data</p>
          <div className="mt-3 grid grid-cols-2 gap-y-4 border-t border-[#e7e8e9] pt-4 font-['Manrope:Regular',sans-serif] text-xs text-[#536478]">
            {child ? (
              <>
                <div>
                  Nama Anak
                  <strong className="mt-1 block text-sm text-[#191c1d]">
                    {liveChild?.full_name || "Leo M."}
                  </strong>
                </div>
                <div>
                  Tanggal Lahir
                  <strong className="mt-1 block text-sm text-[#191c1d]">
                    {liveChild?.birth_date ? new Date(liveChild.birth_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "15 Okt 2022"}
                  </strong>
                </div>
                <div>
                  Jenis Kelamin
                  <strong className="mt-1 block text-sm text-[#191c1d]">
                    {liveChild?.gender === "P" || liveChild?.gender === "Perempuan" ? "Perempuan" : "Laki-laki"}
                  </strong>
                </div>
                <div>
                  Usia Saat Ini
                  <strong className="mt-1 block text-sm text-[#191c1d]">
                    {liveChild?.birth_date ? formatAge(liveChild.birth_date) : "12 Bulan"}
                  </strong>
                </div>
              </>
            ) : (
              <>
                <div className="col-span-2 flex items-center justify-between">
                  Berat Badan
                  <strong className="text-xl text-[#191c1d]">
                    {liveMeasurement ? liveMeasurement.weight : "12.5"}{" "}
                    <span className="text-sm font-normal">kg</span>
                  </strong>
                </div>
                <div className="col-span-2 flex items-center justify-between border-t border-[#e7e8e9] pt-3">
                  Tinggi Badan
                  <strong className="text-xl text-[#191c1d]">
                    {liveMeasurement ? liveMeasurement.height : "82"}{" "}
                    <span className="text-sm font-normal">cm</span>
                  </strong>
                </div>
                <div className="col-span-2 flex items-center justify-between border-t border-[#e7e8e9] pt-3">
                  Status
                  <span className={`rounded-full ${statusInfo.badgeBg} ${statusInfo.badgeText} px-3 py-1 font-semibold`}>
                    ◎ {statusInfo.shortLabel}
                  </span>
                </div>
              </>
            )}
          </div>
        </motion.section>

        <motion.button
          type="button"
          onClick={onContinue}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-8 min-h-12 w-full rounded-xl bg-[#007c4a] px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_4px_8px_rgba(0,109,66,0.18)]"
        >
          {child ? "Lakukan Pengukuran Pertama" : "Lihat Detail Pertumbuhan →"}
        </motion.button>

        <motion.button
          type="button"
          onClick={onHome}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#007c4a]"
        >
          Kembali ke Beranda
        </motion.button>
      </motion.section>

      <ParentBottomNav onHome={onHome} onMaterial={onMaterial} onInput={onInput} active="Input" />
    </main>
  )
}