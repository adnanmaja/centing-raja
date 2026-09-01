import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { ZScoreCard } from "../../components/parent/z-score-card"
import { SvgIcon } from "../../components/ui/svg-icon"
import {
  formatAge,
  formatStuntingStatus,
  getChildMeasurements,
  getParentChildren,
  type Child,
  type Measurement,
} from "../../lib/api"

import growthDetailPaths from "../../assets/icon-growth-detail"
import growthDetailActionPaths from "../../assets/icon-growth-action"

const growthDetailAvatar = "/images/avatar-anak.png"

export function DetailPertumbuhan({
  onBack,
  onViewChart,
}: {
  onBack: () => void
  onViewChart: () => void
}) {
  const location = useLocation()
  const state = (location.state ?? {}) as {
    child?: Child
    measurement?: Measurement
  }

  const [child, setChild] = useState<Child | null>(state.child ?? null)
  const [measurement, setMeasurement] = useState<Measurement | null>(state.measurement ?? null)
  const [isLoading, setIsLoading] = useState(!state.child || !state.measurement)

  useEffect(() => {
    let active = true
    if (!state.child || !state.measurement) {
      getParentChildren()
        .then(async (children) => {
          if (!active) return
          const activeChild = state.child || (children.length > 0 ? children[0] : null)
          if (activeChild) {
            setChild(activeChild)
            if (!state.measurement) {
              const measurements = await getChildMeasurements(activeChild.id)
              if (active && measurements.length > 0) {
                const sorted = [...measurements].sort(
                  (a, b) => new Date(b.measured_at).getTime() - new Date(a.measured_at).getTime()
                )
                setMeasurement(sorted[0])
              }
            }
          }
        })
        .catch((err) => {
          console.warn("[Centing] Failed to load growth details:", err)
        })
        .finally(() => {
          if (active) setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
    return () => {
      active = false
    }
  }, [state.child, state.measurement])

  const childName = child?.full_name || "Leo M."
  const childGender = child?.gender === "P" || child?.gender === "Perempuan" ? "Perempuan" : "Laki-laki"
  const childAge = child?.birth_date ? formatAge(child.birth_date) : "12 Bulan"

  const statusInfo = formatStuntingStatus(measurement?.stunting_status)
  const isWarning = measurement?.stunting_status === "stunted" || measurement?.stunting_status === "severely_stunted"
  const isSeverelyStunted = measurement?.stunting_status === "severely_stunted"
  const isStunted = measurement?.stunting_status === "stunted"

  const statusBannerText = isSeverelyStunted
    ? "PERLU KONSULTASI SEGERA"
    : isStunted
    ? "PERLU PERHATIAN KHUSUS"
    : "TUMBUH KEMBANG SEHAT"

  const statusBannerClass = isSeverelyStunted
    ? "bg-red-100 text-red-700"
    : isStunted
    ? "bg-amber-100 text-amber-800"
    : "bg-[#76d69f]/20 text-[#005c38]"
  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] text-[#191c1d]"
      aria-label="Detail Pertumbuhan Leo"
    >
      <header className="sticky top-0 z-30 border-b border-black/[0.03] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-12 w-full max-w-3xl items-center gap-4 px-5">
          <button
            type="button"
            onClick={onBack}
            className="text-xl leading-none"
            aria-label="Kembali"
          >
            ‹
          </button>
          <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Detail Pertumbuhan
          </h1>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-4 sm:px-8 sm:pt-8">
        <section className="flex flex-col items-center text-center">
          <div className="grid size-[76px] place-items-center overflow-hidden rounded-full bg-[#cfe1f8] ring-2 ring-[#76d69f]/60 ring-offset-4 ring-offset-[#f8f9fa]">
            <img
              src={growthDetailAvatar}
              alt={childName}
              className="size-full object-cover"
            />
          </div>
          <h2 className="mt-4 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold">
            {childName}
          </h2>
          <div className="mt-2 flex items-center gap-2 font-['Manrope:Regular',sans-serif] text-xs text-[#4f6073]">
            <SvgIcon
              path={growthDetailPaths.p3b95cda0}
              viewBox="0 0 13.5 15"
              className="h-3 w-3"
            />
            {childAge}<span>•</span>
            <SvgIcon
              path={growthDetailPaths.p3cc2a800}
              viewBox="0 0 4.5 12"
              className="h-3 w-1.5"
            />
            {childGender}
          </div>
          <span className={`mt-4 inline-flex items-center gap-2 rounded-full ${statusBannerClass} px-3 py-2 font-['Manrope:SemiBold',sans-serif] text-[10px] font-semibold tracking-[0.04em]`}>
            <SvgIcon
              path={growthDetailPaths.p7b061c0}
              viewBox="0 0 20 20"
              className="size-4"
            />
            {statusBannerText}
          </span>
        </section>
        <section className="mt-7">
          <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Indikator Pertumbuhan (Z-Score)
          </h2>
          <p className="mt-4 font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#5f7184]">
            Z-Score menunjukkan seberapa jauh pertumbuhan anak dari standar
            rata-rata WHO sesuai Standar Antropometri Anak Kemenkes RI (PMK No.
            2 Tahun 2020). Nilai di antara -2 dan +3 SD untuk tinggi badan
            dianggap normal.
          </p>
          <div className="mt-5 space-y-3">
            <ZScoreCard
              title="BERAT BADAN MENURUT UMUR (BB/U)"
              value={measurement ? String(measurement.weight) : "12.5"}
              unit="kg"
              score="Tercatat"
              status="Normal"
            />
            <ZScoreCard
              title="TINGGI BADAN MENURUT UMUR (TB/U)"
              value={measurement ? String(measurement.height) : "82"}
              unit="cm"
              score={measurement ? `${Number(measurement.z_score) >= 0 ? "+" : ""}${Number(measurement.z_score).toFixed(1)} SD` : "-1.8 SD"}
              status={statusInfo.shortLabel}
              warning={isWarning}
            >
              <div className={`mt-3 rounded-lg p-3 font-['Manrope:Regular',sans-serif] text-[10px] leading-4 ${
                isWarning ? "bg-[#fff4da] text-[#775600]" : "bg-[#eaf8f0] text-[#005c38]"
              }`}>
                💡 {statusInfo.description}
              </div>
            </ZScoreCard>
            <ZScoreCard
              title="BERAT BADAN MENURUT TINGGI (BB/TB)"
              value={
                measurement?.head_circumference && Number(measurement.head_circumference) > 0
                  ? `LK: ${measurement.head_circumference} cm`
                  : "Proporsional"
              }
              unit={measurement?.upper_arm_circumference && Number(measurement.upper_arm_circumference) > 0 ? `· LiLA: ${measurement.upper_arm_circumference} cm` : ""}
              score={measurement ? `${Number(measurement.z_score) >= 0 ? "+" : ""}${Number(measurement.z_score).toFixed(1)} SD` : "+0.5 SD"}
              status="Normal"
            />
          </div>
        </section>
        <section className="mt-8 space-y-3">
          <button
            type="button"
            onClick={onViewChart}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#006d42] px-5 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_2px_5px_rgba(0,109,66,0.18)]"
          >
            <SvgIcon
              path={growthDetailActionPaths.p2f1f99d8}
              viewBox="0 0 18 18"
              className="size-4"
            />
            Lihat Grafik Pertumbuhan
          </button>
          <button
            type="button"
            onClick={onBack}
            className="min-h-10 w-full font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-[#4f6073]"
          >
            Tutup
          </button>
        </section>
      </div>
    </main>
  )
}
