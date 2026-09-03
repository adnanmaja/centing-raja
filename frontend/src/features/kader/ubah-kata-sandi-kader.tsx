import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "../../context/auth-context"

import { SvgIcon } from "../../components/ui/svg-icon"

import changePasswordPaths from "../../assets/icon-change-password"

import taskProfilePaths from "../../assets/icon-profile-badge"

import inputMeasurementPaths from "../../assets/icon-input-measurement"

const changePasswordLogo =
  "/logo/logo-centing-raja.png"

export function UbahKataSandiKader({ onBack }: { onBack: () => void }) {
  const { user } = useAuth()
  const [imgError, setImgError] = useState(false)
  const profilePic = !imgError ? (user?.avatar_url || "/images/foto-kader.png") : null
  const [currentPassword, setCurrentPassword] = useState("")

  const [newPassword, setNewPassword] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("")

  const [visible, setVisible] = useState<Record<string, boolean>>({})

  const [saved, setSaved] = useState(false)

  const score = [
    newPassword.length >= 8,

    /[A-Z]/.test(newPassword),

    /[0-9]/.test(newPassword),
  ].filter(Boolean).length

  const strength =
    score === 0
      ? "Belum diisi"
      : score === 1
        ? "Lemah"
        : score === 2
          ? "Sedang"
          : "Kuat"

  const valid =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword === confirmPassword

  const Field = ({
    id,

    label,

    value,

    setValue,

    placeholder,
  }: {
    id: string

    label: string

    value: string

    setValue: (value: string) => void

    placeholder: string
  }) => (
    <label className="block">
      <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-[#3e4941]">
        {label}
      </span>
      <div className="relative mt-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          type={visible[id] ? "text" : "password"}
          placeholder={placeholder}
          className="min-h-12 w-full rounded-lg border border-[#becabf] bg-[#f8f9fa] px-3 pr-12 text-sm text-[#191c1d] outline-none transition placeholder:text-[#becabf] focus:border-[#007c4a] focus:ring-1 focus:ring-[#007c4a]"
        />
        <button
          type="button"
          onClick={() =>
            setVisible((current) => ({ ...current, [id]: !current[id] }))
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#63747a]"
          aria-label={
            visible[id] ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
          }
        >
          <SvgIcon
            path={changePasswordPaths.pf0742c0}
            viewBox="0 0 19 16.5"
            className="h-4 w-5"
          />
        </button>
      </div>
    </label>
  )

  const save = () => {
    if (!valid) return

    setSaved(true)

    window.setTimeout(onBack, 700)
  }

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 pt-16 text-[#191c1d]"
      aria-label="Ubah Kata Sandi"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-3 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="grid size-10 place-items-center rounded-full text-[#191c1d] transition hover:bg-[#eef4f1]"
              aria-label="Kembali"
            >
              <SvgIcon
                path={inputMeasurementPaths.p225a8cc0}
                viewBox="0 0 11.775 20"
                className="h-5 w-3"
              />
            </button>
            <img
              src={changePasswordLogo}
              alt="Logo Centing Raja"
              className="size-8 object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
              Profile
            </span>
          </div>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white overflow-hidden"
            aria-label="Profil"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt={user?.name || "Profil"}
                className="size-8 rounded-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <SvgIcon
                path={taskProfilePaths.p3189a600}
                viewBox="0 0 12 12"
                className="size-4"
              />
            )}
          </button>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-xl flex-col px-5 py-8 sm:px-8 xl:py-12">
        <section className="text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#76d69f] text-[#005c38]">
            <SvgIcon
              path={changePasswordPaths.p2d47e8c0}
              viewBox="0 0 26.6667 26.6667"
              className="size-8"
            />
          </span>
          <h1 className="mt-4 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold">
            Ubah Kata Sandi
          </h1>
          <p className="mt-2 font-['Plus_Jakarta_Sans:Regular',sans-serif] text-xs text-[#63747a]">
            Pastikan kata sandi baru Anda kuat dan tidak mudah ditebak.
          </p>
        </section>
        <section className="mt-10 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:p-5">
          <div className="space-y-6">
            <Field
              id="current"
              label="Kata Sandi Saat Ini"
              value={currentPassword}
              setValue={setCurrentPassword}
              placeholder="Masukkan kata sandi saat ini"
            />
            <div>
              <Field
                id="new"
                label="Kata Sandi Baru"
                value={newPassword}
                setValue={setNewPassword}
                placeholder="Minimal 8 karakter"
              />
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((part) => (
                  <span
                    key={part}
                    className={`h-1 rounded-full ${
                      part <= score ? "bg-[#007c4a]" : "bg-[#e1e3e4]"
                    }`}
                  />
                ))}
              </div>
              <p
                className={`mt-3 font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[10px] ${
                  score === 3
                    ? "text-[#007c4a]"
                    : score === 1
                      ? "text-[#b3261e]"
                      : "text-[#63747a]"
                }`}
              >
                Kekuatan: {strength}
              </p>
            </div>
            <Field
              id="confirm"
              label="Konfirmasi Kata Sandi Baru"
              value={confirmPassword}
              setValue={setConfirmPassword}
              placeholder="Ketik ulang kata sandi baru"
            />
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="-mt-3 text-xs text-[#b3261e]">
                Konfirmasi kata sandi belum sama.
              </p>
            )}
          </div>
        </section>
        <section className="mt-12 flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={save}
            disabled={!valid || saved}
            className="min-h-12 w-full rounded-lg bg-[#007c4a] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold text-white shadow-[0_4px_8px_rgba(0,109,66,0.18)] disabled:cursor-not-allowed disabled:bg-[#becabf]"
          >
            {saved ? "Perubahan Disimpan" : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-base text-[#63747a] hover:text-[#007c4a]"
          >
            Batal
          </button>
        </section>
      </div>
    </main>
  )
}
