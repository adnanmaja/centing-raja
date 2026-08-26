import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"

import editProfilePaths from "../../assets/icon-edit-profile"

import lockedPosyanduPaths from "../../assets/icon-posyandu-locked"

import phoneFieldPaths from "../../assets/icon-phone-field"

import taskProfilePaths from "../../assets/icon-profile-badge"

import inputMeasurementPaths from "../../assets/icon-input-measurement"

const editProfileLogo =
  "/logo/logo-centing-raja.png"

const editProfilePhoto =
  "/images/foto-kader-2.png"

export function EditProfileKader({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("Nurhayati Ningsih")

  const [phone, setPhone] = useState("0812-3456-7890")

  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)

    window.setTimeout(onBack, 650)
  }

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 pt-16 text-[#191c1d]"
      aria-label="Edit Profil"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={editProfileLogo}
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
      <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 xl:py-12">
        <section className="relative -mx-5 bg-[linear-gradient(180deg,#e8f5ee_0%,#f8f9fa_68%)] px-5 pb-10 pt-8 text-center sm:mx-0 sm:rounded-3xl sm:px-8">
          <div className="relative mx-auto size-[104px]">
            <img
              src={editProfilePhoto}
              alt="Foto Nurhayati Ningsih"
              className="size-full rounded-full object-cover shadow-[0_4px_6px_-1px_rgba(0,109,66,0.1)]"
            />
            <button
              type="button"
              onClick={() => window.alert("Pilih foto dari perangkat Anda.")}
              className="absolute bottom-1 right-1 grid size-9 place-items-center rounded-full bg-[#006d42] text-white shadow-[0_4px_8px_rgba(0,109,66,0.2)]"
              aria-label="Ubah foto"
            >
              <SvgIcon
                path={editProfilePaths.p34a16800}
                viewBox="0 0 15 13.5"
                className="h-3.5 w-4"
              />
            </button>
          </div>
          <button
            type="button"
            onClick={() => window.alert("Pilih foto dari perangkat Anda.")}
            className="mt-3 font-['Manrope:Regular',sans-serif] text-sm tracking-[0.05em] text-[#006d42]"
          >
            UBAH FOTO
          </button>
        </section>
        <section className="mt-3 sm:mt-7">
          <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Data Pribadi
          </h1>
          <p className="mt-2 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Pastikan informasi di bawah ini sesuai dengan identitas resmi Anda.
          </p>
          <div className="mt-8 space-y-6">
            <label className="block font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Nama Lengkap
              <div className="relative mt-2">
                <SvgIcon
                  path={editProfilePaths.p85bff00}
                  viewBox="0 0 16 16"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]"
                />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="min-h-14 w-full rounded-xl bg-[#edeeef] py-3 pl-11 pr-4 text-base text-[#191c1d] outline-none ring-[#007c4a] focus:ring-2"
                />
              </div>
            </label>
            <label className="block font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Nomor Telepon (WhatsApp)
              <div className="relative mt-2">
                <SvgIcon
                  path={phoneFieldPaths.p143e1930}
                  viewBox="0 0 18 18"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]"
                />
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  inputMode="tel"
                  className="min-h-14 w-full rounded-xl bg-[#edeeef] py-3 pl-11 pr-4 text-base text-[#191c1d] outline-none ring-[#007c4a] focus:ring-2"
                />
              </div>
            </label>
            <div>
              <p className="font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
                Nama Posyandu
              </p>
              <div className="relative mt-2 flex min-h-14 items-center rounded-xl bg-[#dde0e0] px-4 pl-11 text-base text-[#536478]">
                <SvgIcon
                  path={lockedPosyanduPaths.p7ab5f00}
                  viewBox="0 0 22 18"
                  className="absolute left-4 h-4 w-5 text-[#536478]"
                />
                Mawar Merah 1
                <span className="absolute right-4 grid size-7 place-items-center rounded-full bg-white text-sm">
                  ♙
                </span>
              </div>
              <p className="mt-2 flex gap-1 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#63747a]">
                <span>ⓘ</span>Perubahan nama instansi Posyandu harus divalidasi
                oleh Tenaga Kesehatan.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={save}
            disabled={!name.trim() || !phone.trim() || saved}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#007c4a] font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_4px_8px_rgba(0,109,66,0.2)] disabled:opacity-60"
          >
            <SvgIcon
              path={inputMeasurementPaths.p3e09ad60}
              viewBox="0 0 18 18"
              className="size-4"
            />
            {saved ? "Perubahan Disimpan" : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="font-['Manrope:Regular',sans-serif] text-base text-[#536478] hover:text-[#007c4a]"
          >
            Batal
          </button>
        </section>
      </div>
    </main>
  )
}
