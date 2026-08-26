import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"

import tasksPaths from "../../assets/icon-tasks"

import measurementDataPaths from "../../assets/icon-measurement-data"

import bottomProfilePaths from "../../assets/icon-bottom-profile"

import bottomMaterialPaths from "../../assets/icon-bottom-material"

export function DataPengukuran({
  onBack,

  onHome,

  onMaterial,
}: {
  onBack: () => void

  onHome: () => void

  onMaterial: () => void
}) {
  const metrics = [
    {
      label: "Tinggi Badan",

      value: "75.5",

      unit: "cm",

      tone: "text-[#007c4a]",
    },

    { label: "Berat Badan", value: "9.2", unit: "kg", tone: "text-[#007c4a]" },

    {
      label: "Lingkar Kepala",

      value: "46",

      unit: "cm",

      tone: "text-[#191c1d]",
    },

    {
      label: "Lingkar Lengan",

      value: "14.5",

      unit: "cm",

      tone: "text-[#191c1d]",
    },
  ]

  const nutrition = [
    {
      label: "Berat / Umur (BB/U)",

      value: "Normal",

      tone: "bg-[#76d69f] text-[#006d42]",
    },

    {
      label: "Tinggi / Umur (TB/U)",

      value: "Stunting",

      tone: "bg-[#ffdcd8] text-[#b3261e]",
    },

    {
      label: "Berat / Tinggi (BB/TB)",

      value: "Berisiko",

      tone: "bg-[#f0cb69] text-[#765b06]",
    },
  ]

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]"
      aria-label="Data Pengukuran Ahmad Raihan"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-3 sm:px-8 xl:px-10">
          <button
            type="button"
            onClick={onBack}
            className="grid size-10 place-items-center rounded-full text-[#191c1d]"
            aria-label="Kembali"
          >
            <SvgIcon
              path={measurementDataPaths.p300a1100}
              viewBox="0 0 16 16"
              className="size-4"
            />
          </button>
          <h1 className="ml-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#006d42]">
            Data Pengukuran
          </h1>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 xl:px-10 xl:py-10">
        <section className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#dceafe] font-['Manrope:SemiBold',sans-serif] text-lg text-[#4f6073]">
              AR
            </span>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold">
                Ahmad Raihan
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#3e4941]">
                <span className="inline-flex items-center gap-1.5">
                  <SvgIcon
                    path={measurementDataPaths.p2d24f5c0}
                    viewBox="0 0 12 13.3333"
                    className="h-4 w-3 text-[#3e4941]"
                  />
                  14 Bulan
                </span>
                <span className="size-1 rounded-full bg-[#becabf]" />
                <span className="inline-flex items-center gap-1.5">
                  <SvgIcon
                    path={measurementDataPaths.p3d204080}
                    viewBox="0 0 10.6667 10.6667"
                    className="size-3 text-[#3e4941]"
                  />
                  Laki-laki
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
                  <article
                    key={metric.label}
                    className="min-h-[108px] rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    <p className="font-['Manrope:Regular',sans-serif] text-sm uppercase tracking-wide text-[#536478]">
                      {metric.label}
                    </p>
                    <p
                      className={`mt-3 font-['Manrope:Regular',sans-serif] text-sm ${metric.tone}`}
                    >
                      <strong className="text-base font-semibold">
                        {metric.value}
                      </strong>
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
                  <div
                    key={item.label}
                    className={`flex min-h-16 items-center justify-between gap-3 px-4 ${
                      index ? "border-t border-[#edf0ee]" : ""
                    }`}
                  >
                    <span className="font-['Manrope:Regular',sans-serif] text-sm text-[#191c1d]">
                      {item.label}
                    </span>
                    <span
                      className={`rounded-full px-3 py-2 font-['Manrope:Regular',sans-serif] text-sm ${item.tone}`}
                    >
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
                    <p className="mt-1 text-sm text-[#191c1d]">
                      Kader Posyandu Melati 1
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <span className="text-lg text-[#63747a]">▣</span>
                  <div>
                    <p className="text-sm text-[#63747a]">Tanggal Pengukuran</p>
                    <p className="mt-1 text-sm text-[#191c1d]">
                      15 Agustus 2023, 09:30 WIB
                    </p>
                  </div>
                </div>
              </article>
            </section>
            <section className="mt-6">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                Catatan Tambahan
              </h2>
              <article className="mt-3 rounded-2xl bg-white p-4 font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#3e4941] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Anak tampak aktif, nafsu makan normal. Disarankan untuk menambah
                asupan protein hewani (telur/ikan) untuk mengejar ketertinggalan
                tinggi badan. Jadwalkan kontrol ulang bulan depan.
              </article>
            </section>
          </div>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-[#f8f9fa]/90 shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-4 px-2 sm:max-w-md xl:max-w-3xl xl:px-8">
          <button
            type="button"
            onClick={onHome}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={tasksPaths.p12a32500}
              viewBox="0 0 16 18"
              className="h-[18px] w-4"
            />
            <span className="text-[11px] font-semibold">Beranda</span>
          </button>
          <button
            type="button"
            onClick={onMaterial}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={bottomMaterialPaths.p378800}
              viewBox="0 0 22 16"
              className="h-4 w-[22px]"
            />
            <span className="text-[11px] font-semibold">Materi</span>
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex flex-col items-center justify-center gap-1 text-[#007c4a]"
          >
            <SvgIcon
              path={tasksPaths.p1de35f80}
              viewBox="0 0 18 20"
              className="h-5 w-[18px]"
            />
            <span className="text-[11px] font-semibold">Tugas</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={bottomProfilePaths.p3de21300}
              viewBox="0 0 20 20"
              className="size-5"
            />
            <span className="text-[11px] font-semibold">Profil</span>
          </button>
        </div>
      </nav>
    </main>
  )
}
