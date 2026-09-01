import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"

import { ProfileHeader } from "../../components/kader/profile-header"
import { ProfileBottomNav } from "../../components/kader/profile-bottom-nav"
import { SvgIcon } from "../../components/ui/svg-icon"
import { formatStuntingStatus, type Measurement } from "../../lib/api"
import type { KaderChildTask } from "./tugas-bulan-ini"

import measurementDataPaths from "../../assets/icon-measurement-data"

export function DataPengukuran({
  onBack,
  onHome,
  onMaterial,
  onProfile,
}: {
  onBack: () => void
  onHome: () => void
  onMaterial: () => void
  onProfile: () => void
}) {
  const location = useLocation()
  const stateData = location.state as
    | { child?: KaderChildTask; measurement?: Measurement }
    | undefined

  const child = stateData?.child || {
    name: "Ahmad Raihan",
    initials: "AR",
    age: "14 Bulan",
    gender: "Laki-laki",
    rt: "RT 01 / RW 03",
  }

  const measurement = stateData?.measurement
  const heightVal = measurement?.height !== undefined ? String(measurement.height) : "75.5"
  const weightVal = measurement?.weight !== undefined ? String(measurement.weight) : "9.2"
  const headVal = measurement?.head_circumference !== undefined ? String(measurement.head_circumference) : "46"
  const armVal = measurement?.upper_arm_circumference !== undefined ? String(measurement.upper_arm_circumference) : "14.5"

  const stunting = formatStuntingStatus(measurement?.stunting_status || "stunted")
  const metrics = [
    { label: "Tinggi Badan", value: heightVal, unit: "cm", tone: "text-[#007c4a]" },
    { label: "Berat Badan", value: weightVal, unit: "kg", tone: "text-[#007c4a]" },
    { label: "Lingkar Kepala", value: headVal, unit: "cm", tone: "text-[#191c1d]" },
    { label: "Lingkar Lengan Atas", value: armVal, unit: "cm", tone: "text-[#191c1d]" },
  ]

  const nutrition = [
    { label: "Tinggi / Umur (TB/U)", value: stunting.shortLabel, tone: `${stunting.badgeBg} ${stunting.badgeText}` },
    {
      label: "Z-Score TB/U",
      value: measurement?.z_score !== undefined ? `${measurement.z_score} SD` : "-2.15 SD",
      tone: "bg-[#edf0ee] text-[#191c1d]",
    },
    { label: "Berat / Umur (BB/U)", value: "Normal", tone: "bg-[#76d69f] text-[#006d42]" },
  ]
  return (
    <main className="min-h-svh bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]" aria-label="Data Pengukuran Ahmad Raihan">
      <ProfileHeader title="Data Pengukuran" onBack={onBack} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 xl:py-10"
      >
        <section className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#dceafe] font-['Manrope:SemiBold',sans-serif] text-lg text-[#4f6073]">
              {child.initials || child.name.charAt(0)}
            </span>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold">
                {child.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#3e4941]">
                <span className="inline-flex items-center gap-1.5">
                  <SvgIcon path={measurementDataPaths.p2d24f5c0} viewBox="0 0 12 13.3333" className="h-4 w-3 text-[#3e4941]" />
                  {child.age}
                </span>
                <span className="size-1 rounded-full bg-[#becabf]" />
                <span className="inline-flex items-center gap-1.5">
                  <SvgIcon path={measurementDataPaths.p3d204080} viewBox="0 0 10.6667 10.6667" className="size-3 text-[#3e4941]" />
                  {child.gender || "Laki-laki"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div>
            <section>
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                Detail Pengukuran
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
                {metrics.map((metric) => (
                  <article key={metric.label} className="min-h-[108px] rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                    <p className="font-['Manrope:Regular',sans-serif] text-sm uppercase tracking-wide text-[#536478]">
                      {metric.label}
                    </p>
                    <p className={`mt-3 font-['Manrope:Regular',sans-serif] text-sm ${metric.tone}`}>
                      <strong className="text-base font-semibold">{metric.value}</strong>
                      <span className="ml-2 text-[#3e4941]">{metric.unit}</span>
                    </p>
                  </article>
                ))}
              </div>
            </section>
            <section className="mt-6">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                Status Gizi (Z-Score)
              </h2>
              <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {nutrition.map((item, index) => (
                  <div key={item.label} className={`flex min-h-16 items-center justify-between gap-3 px-4 ${index ? "border-t border-[#edf0ee]" : ""}`}>
                    <span className="font-['Manrope:Regular',sans-serif] text-sm text-[#191c1d]">{item.label}</span>
                    <span className={`rounded-full px-3 py-2 font-['Manrope:Regular',sans-serif] text-sm ${item.tone}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div>
            <section>
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                Informasi Pencatatan
              </h2>
              <article className="mt-3 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="flex gap-3">
                  <span className="text-lg text-[#63747a]">♙</span>
                  <div>
                    <p className="text-sm text-[#63747a]">Dicatat Oleh</p>
                    <p className="mt-1 text-sm text-[#191c1d]">Kader Posyandu Melati 1</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <span className="text-lg text-[#63747a]">▣</span>
                  <div>
                    <p className="text-sm text-[#63747a]">Tanggal Pengukuran</p>
                    <p className="mt-1 text-sm text-[#191c1d]">15 Agustus 2023, 09:30 WIB</p>
                  </div>
                </div>
              </article>
            </section>
            <section className="mt-6">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                Catatan Tambahan
              </h2>
              <article className="mt-3 rounded-2xl bg-white p-4 font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#3e4941] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Anak tampak aktif, nafsu makan normal. Disarankan untuk menambah asupan protein hewani (telur/ikan) untuk mengejar ketertinggalan tinggi badan. Jadwalkan kontrol ulang bulan depan.
              </article>
            </section>
          </div>
        </div>
      </motion.div>

      <ProfileBottomNav active="Tugas" onHome={onHome} onMaterial={onMaterial} onTasks={onBack} onProfile={onProfile} />
    </main>
  )
}