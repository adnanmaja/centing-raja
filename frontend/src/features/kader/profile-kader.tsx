import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"

import logoutPaths from "../../assets/icon-logout"

import tasksPaths from "../../assets/icon-tasks"

import taskProfilePaths from "../../assets/icon-profile-badge"

import bottomProfilePaths from "../../assets/icon-bottom-profile"

import bottomMaterialPaths from "../../assets/icon-bottom-material"

import profilePagePaths from "../../assets/icon-profile-page"

const kaderProfileLogo =
  "/logo/logo-centing-raja.png"

const kaderProfilePhoto =
  "/images/foto-kader.png"

export function ProfileKader({
  onHome,

  onMaterial,

  onEdit,

  onPassword,

  onHelp,

  onPrivacy,

  onLogout,
}: {
  onHome: () => void

  onMaterial: () => void

  onEdit: () => void

  onPassword: () => void

  onHelp: () => void

  onPrivacy: () => void

  onLogout: () => void
}) {
  const actionRows = [
    { label: "Edit Profil", icon: "✥" },

    { label: "Ubah Kata Sandi", icon: "◉" },
  ]

  const infoRows = [
    { label: "Pusat Bantuan", icon: "?" },

    { label: "Kebijakan Privasi", icon: "@" },
  ]

  const action = (label: string) =>
    window.alert(`${label} akan segera tersedia.`)

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 pt-16 text-[#191c1d]"
      aria-label="Profil Kader"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={kaderProfileLogo}
              alt="Logo Centing Raja"
              className="size-8 object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
              Profile
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
      <div className="mx-auto w-full max-w-5xl px-5 py-7 sm:px-8 xl:px-10 xl:py-10">
        <section className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={kaderProfilePhoto}
              alt="Foto Kader Nur"
              className="size-24 rounded-full object-cover shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            />
            <button
              type="button"
              onClick={() => action("Ubah foto profil")}
              className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-full bg-[#006d42] text-sm text-white shadow-[0_3px_8px_rgba(0,0,0,0.16)]"
              aria-label="Ubah foto"
            >
              ✎
            </button>
          </div>
          <h1 className="mt-4 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Kader Nur
          </h1>
          <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#76d69f]/25 px-3 py-1 font-['Manrope:Regular',sans-serif] text-sm text-[#005c38]">
            <SvgIcon
              path={profilePagePaths.p26f9d500}
              viewBox="0 0 12.833 12.25"
              className="size-3"
            />
            Verified Kader Posyandu
          </span>
        </section>
        <div className="mt-7 grid gap-5 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
          <section className="rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
              <SvgIcon
                path={profilePagePaths.p85bff00}
                viewBox="0 0 16 16"
                className="size-4 text-[#007c4a]"
              />
              Informasi Pribadi
            </h2>
            <dl className="mt-5 space-y-5 font-['Manrope:Regular',sans-serif] text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[#63747a]">NIK</dt>
                <dd className="text-right font-semibold">3273102930192039</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#63747a]">Nama Lengkap</dt>
                <dd className="text-right font-semibold">Nurhayati Ningsih</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#63747a]">No. Telepon</dt>
                <dd className="text-right font-semibold">0812-3456-7890</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#63747a]">Nama Posyandu</dt>
                <dd className="text-right font-semibold">
                  Mawar Merah 1<br />
                  <span className="font-normal text-xs text-[#63747a]">
                    Kec. Andir
                  </span>
                </dd>
              </div>
            </dl>
          </section>
          <div className="space-y-5">
            <section className="rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                <span className="text-lg text-[#007c4a]">⚙</span>Pengaturan Akun
              </h2>
              <div className="mt-4 space-y-1">
                {actionRows.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      item.label === "Edit Profil" ? onEdit() : onPassword()
                    }
                    className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-left transition hover:bg-[#f3f4f5]"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-[#e9f3ff] text-[#536478]">
                      {item.icon}
                    </span>
                    <span className="flex-1 font-['Manrope:Regular',sans-serif] text-sm">
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="text-xl text-[#536478]">
                      ›
                    </span>
                  </button>
                ))}
              </div>
            </section>
            <section className="rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                <span className="text-lg text-[#007c4a]">ⓘ</span>Informasi
                Aplikasi
              </h2>
              <div className="mt-4 space-y-1">
                {infoRows.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      item.label === "Pusat Bantuan" ? onHelp() : onPrivacy()
                    }
                    className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-left transition hover:bg-[#f3f4f5]"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-[#f3f4f5] text-[#536478]">
                      {item.icon}
                    </span>
                    <span className="flex-1 font-['Manrope:Regular',sans-serif] text-sm">
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="text-xl text-[#536478]">
                      ›
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ffd9d5] font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-[#c2342d] transition hover:bg-[#ffc9c4]"
        >
          <SvgIcon
            path={logoutPaths.p3e9df400}
            viewBox="0 0 18 18"
            className="size-5"
          />
          Keluar
        </button>
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
            onClick={onHome}
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
            className="flex flex-col items-center justify-center gap-1 text-[#007c4a]"
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
