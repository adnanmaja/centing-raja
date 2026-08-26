import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"

import tasksPaths from "../../assets/icon-tasks"

import taskProfilePaths from "../../assets/icon-profile-badge"

import bottomProfilePaths from "../../assets/icon-bottom-profile"

import bottomMaterialPaths from "../../assets/icon-bottom-material"

import measurementSuccessPaths from "../../assets/icon-measurement-success"

const measurementSuccessIndicator =
  "/images/centang-hijau-besar.png"

const measurementSuccessLogo =
  "/logo/logo-centing-raja.png"

export function DataBerhasilDisimpan({
  onHome,

  onDetails,

  onMaterial,
}: {
  onHome: () => void

  onDetails: () => void

  onMaterial: () => void
}) {
  return (
    <main
      data-reveal-page
      className="flex min-h-svh flex-col bg-[#f8f9fa] pb-20 pt-16 text-[#191c1d]"
      aria-label="Data Berhasil Disimpan"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={measurementSuccessLogo}
              alt="Logo Centing Raja"
              className="size-8 object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
              Beranda
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
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-10 sm:px-8 xl:py-14">
        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="relative size-48 sm:size-52">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#76d69f]/20 blur-xl"
            />
            <img
              src={measurementSuccessIndicator}
              alt="Pengukuran berhasil disimpan"
              className="relative size-full object-contain"
            />
          </div>
          <h1 className="mt-8 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8">
            Data Berhasil Disimpan
          </h1>
          <p className="mt-2 max-w-md font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Laporan antropometri balita telah berhasil dikirimkan ke sistem
            Tenaga Kesehatan (Nakes).
          </p>
          <article className="mt-8 flex w-full max-w-lg items-center gap-4 rounded-2xl bg-[#f3f4f5] p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#76d69f] text-[#005c38]">
              <SvgIcon
                path={measurementSuccessPaths.p1eac3d80}
                viewBox="0 0 18 18"
                className="size-[18px]"
              />
            </span>
            <div>
              <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#3e4941]">
                Data Disimpan Untuk
              </p>
              <h2 className="mt-1 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                Ahmad Raihan
              </h2>
            </div>
          </article>
        </section>
        <section className="mt-10 flex w-full max-w-lg flex-col gap-3 self-center">
          <button
            type="button"
            onClick={onHome}
            className="min-h-12 w-full rounded-full bg-[#007c4a] font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_5px_12px_rgba(0,109,66,0.2)] transition hover:bg-[#006d42]"
          >
            Kembali ke Beranda
          </button>
          <button
            type="button"
            onClick={onDetails}
            className="min-h-12 w-full rounded-full border border-[#007c4a] bg-white font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-[#007c4a] transition hover:bg-[#e9f7ef]"
          >
            Lihat Detail Input
          </button>
        </section>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-[#f8f9fa]/90 shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-4 px-2 sm:max-w-md xl:max-w-3xl xl:px-8">
          <button
            type="button"
            onClick={onHome}
            className="flex flex-col items-center justify-center gap-1 text-[#007c4a]"
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
            onClick={onDetails}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={tasksPaths.p1de35f80}
              viewBox="0 0 18 20"
              className="h-5 w-[18px]"
            />
            <span className="text-[11px] font-semibold">Kuis</span>
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
