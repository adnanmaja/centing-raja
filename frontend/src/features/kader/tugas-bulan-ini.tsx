import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"

import tasksPaths from "../../assets/icon-tasks"

import taskProfilePaths from "../../assets/icon-profile-badge"

import taskMeasurementPaths from "../../assets/icon-measurement"

import viewDataPaths from "../../assets/icon-view-data"

import bottomProfilePaths from "../../assets/icon-bottom-profile"

import bottomMaterialPaths from "../../assets/icon-bottom-material"

const tasksLogo =
  "/logo/logo-centing-raja.png"

export function TugasBulanIni({
  onHome,

  onMaterial,

  onViewData,

  onInput,
}: {
  onHome: () => void

  onMaterial: () => void

  onViewData: () => void

  onInput: () => void
}) {
  const [activeRt, setActiveRt] = useState("Semua")

  const children = [
    {
      name: "Ahmad Raihan",

      initials: "AR",

      rt: "RT 01 / RW 03",

      address: "Jl. Manggis No. 12",

      age: "14 Bulan",

      deadline: "Batas Waktu: Hari ini",

      status: "Mendesak",

      tone: "bg-[#dceafe] text-[#4f6073]",

      overdue: true,
    },

    {
      name: "Nabila Putri",

      initials: "NP",

      rt: "RT 01 / RW 03",

      address: "Jl. Manggis No. 4",

      age: "9 Bulan",

      deadline: "Batas Waktu: 2 Hari lagi",

      status: "Belum",

      tone: "bg-[#fcebc8] text-[#765b06]",
    },

    {
      name: "Raka Pratama",

      initials: "RP",

      rt: "RT 01 / RW 03",

      address: "Jl. Mawar No. 7",

      age: "18 Bulan",

      deadline: "Batas Waktu: 3 Hari lagi",

      status: "Belum",

      tone: "bg-[#e7dcff] text-[#604fa3]",
    },

    {
      name: "Alya Safitri",

      initials: "AS",

      rt: "RT 01 / RW 03",

      address: "Jl. Manggis No. 21",

      age: "11 Bulan",

      deadline: "Tercatat: Hari ini, 08:30",

      status: "Selesai",

      tone: "bg-[#e9f7ef] text-[#006d42]",

      done: true,
    },

    {
      name: "Dimas Bagaskara",

      initials: "DB",

      rt: "RT 01 / RW 03",

      address: "Jl. Kenanga No. 5",

      age: "20 Bulan",

      deadline: "Tercatat: Kemarin, 09:15",

      status: "Selesai",

      tone: "bg-[#e9f7ef] text-[#006d42]",

      done: true,
    },

    {
      name: "Siti Putri",

      initials: "SP",

      rt: "RT 02 / RW 03",

      address: "Jl. Durian No. 5",

      age: "8 Bulan",

      deadline: "Batas Waktu: 3 Hari lagi",

      status: "Belum",

      tone: "bg-[#f3d36b] text-[#765b06]",
    },

    {
      name: "Fahri Ramadhan",

      initials: "FR",

      rt: "RT 02 / RW 03",

      address: "Jl. Durian No. 9",

      age: "16 Bulan",

      deadline: "Batas Waktu: 4 Hari lagi",

      status: "Belum",

      tone: "bg-[#dceafe] text-[#4f6073]",
    },

    {
      name: "Bima Nugraha",

      initials: "BN",

      rt: "RT 02 / RW 03",

      address: "Jl. Nangka No. 2",

      age: "10 Bulan",

      deadline: "Tercatat: Hari ini, 09:30",

      status: "Selesai",

      tone: "bg-[#edf0f2] text-[#63747a]",

      done: true,
    },

    {
      name: "Citra Lestari",

      initials: "CL",

      rt: "RT 03 / RW 03",

      address: "Jl. Melati No. 8",

      age: "13 Bulan",

      deadline: "Batas Waktu: 5 Hari lagi",

      status: "Belum",

      tone: "bg-[#fde2da] text-[#a64b39]",
    },

    {
      name: "Gilang Prakoso",

      initials: "GP",

      rt: "RT 03 / RW 03",

      address: "Jl. Melati No. 14",

      age: "22 Bulan",

      deadline: "Batas Waktu: 6 Hari lagi",

      status: "Belum",

      tone: "bg-[#dff3eb] text-[#006d42]",
    },
  ]

  const filters = ["Semua", "RT 01", "RT 02", "RT 03"]

  const visibleChildren =
    activeRt === "Semua"
      ? children
      : children.filter((child) => child.rt.startsWith(activeRt))

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]"
      aria-label="Tugas Bulan Ini"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={tasksLogo}
              alt="Logo Centing Raja"
              className="size-7 rounded-full object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#006d42]">
              Tugas
            </span>
          </div>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white"
            aria-label="Profil"
          >
            <SvgIcon
              path={taskProfilePaths.p3189a600}
              viewBox="0 0 12 12"
              className="size-4"
            />
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-5 py-7 sm:px-8 xl:px-10 xl:py-10">
        <section className="relative overflow-hidden rounded-2xl bg-[#007c4a] p-4 text-white shadow-[0_8px_24px_rgba(0,109,66,0.14)] sm:p-6 xl:p-8">
          <span
            aria-hidden="true"
            className="absolute -right-12 -top-12 size-44 rounded-full bg-[#76d69f]/20 blur-2xl"
          />
          <div className="relative">
            <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
              Tugas Bulan Ini
            </h1>
            <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-white/80">
              Posyandu Mawar 03 - Agustus 2023
            </p>
            <div className="mt-6 flex divide-x divide-white/20">
              <div className="min-w-[105px] pr-5">
                <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] leading-7">
                  12
                </strong>
                <span className="font-['Manrope:Regular',sans-serif] text-xs tracking-[0.06em] text-white/70">
                  TOTAL TUGAS
                </span>
              </div>
              <div className="min-w-[90px] px-5">
                <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] leading-7 text-[#7adaa2]">
                  4
                </strong>
                <span className="font-['Manrope:Regular',sans-serif] text-xs tracking-[0.06em] text-white/70">
                  SELESAI
                </span>
              </div>
              <div className="min-w-[80px] pl-5">
                <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] leading-7 text-[#e7c269]">
                  8
                </strong>
                <span className="font-['Manrope:Regular',sans-serif] text-xs tracking-[0.06em] text-white/70">
                  BELUM
                </span>
              </div>
            </div>
          </div>
        </section>
        <nav
          className="mt-7 -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0"
          aria-label="Filter RT"
        >
          {filters.map((filter) => {
            const total =
              filter === "Semua"
                ? children.length
                : children.filter((child) => child.rt.startsWith(filter)).length

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveRt(filter)}
                className={`shrink-0 rounded-full px-4 py-2 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold transition ${
                  activeRt === filter
                    ? "bg-[#007c4a] text-white"
                    : "bg-[#f1f3f2] text-[#536478] hover:bg-[#e4ebe7]"
                }`}
              >
                {filter} ({total})
              </button>
            )
          })}
        </nav>
        <section className="mt-7 grid gap-3 xl:grid-cols-2 xl:gap-5">
          {visibleChildren.map((child) => (
            <article
              key={child.name}
              className={`relative rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                child.overdue ? "border-l-4 border-[#d30b18] pl-3" : ""
              }`}
            >
              <button
                type="button"
                className="absolute right-3 top-3 grid size-7 place-items-center text-lg leading-none text-[#3e4941]"
                aria-label={`Pilihan ${child.name}`}
              >
                ⋮
              </button>
              <div className="pr-7">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 font-['Manrope:SemiBold',sans-serif] text-[10px] font-semibold ${
                      child.overdue
                        ? "bg-[#ffe7e5] text-[#b3261e]"
                        : child.done
                          ? "bg-[#edf0f2] text-[#63747a]"
                          : "text-[#63747a]"
                    }`}
                  >
                    {child.overdue
                      ? "⚠ MENDESAK"
                      : child.done
                        ? "✓ SELESAI"
                        : child.deadline}
                  </span>
                  {!child.overdue && !child.done && (
                    <span className="text-[10px] text-[#63747a]">
                      {child.deadline}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex gap-3">
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-full font-['Manrope:Regular',sans-serif] text-sm ${child.tone}`}
                  >
                    {child.initials}
                  </span>
                  <div className="min-w-0">
                    <h2
                      className={`font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold ${
                        child.done
                          ? "text-[#63747a] line-through"
                          : "text-[#191c1d]"
                      }`}
                    >
                      {child.name}
                    </h2>
                    <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
                      ⌖ {child.rt}, {child.address}
                    </p>
                    <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
                      ♙ {child.age}
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={child.done ? onViewData : onInput}
                className={`mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl font-['Manrope:SemiBold',sans-serif] text-sm font-semibold ${
                  child.done
                    ? "bg-[#f3f4f5] text-[#63747a]"
                    : "bg-[#007c4a] text-white"
                }`}
              >
                {child.done ? (
                  <>
                    <SvgIcon
                      path={viewDataPaths.p110cf380}
                      viewBox="0 0 16.5 11.25"
                      className="h-3 w-4"
                    />
                    <span>Lihat Data</span>
                  </>
                ) : (
                  <>
                    <SvgIcon
                      path={taskMeasurementPaths.p1f830000}
                      viewBox="0 0 14.25 15"
                      className="size-4"
                    />
                    <span>Input Pengukuran</span>
                  </>
                )}
              </button>
            </article>
          ))}
        </section>
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
