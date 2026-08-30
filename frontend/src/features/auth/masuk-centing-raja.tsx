import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"

import loginPaths from "../../assets/icon-login"

const loginLogo =
  "/logo/logo-centing-raja.png"

export function MasukCentingRaja({
  onBack,

  onLogin,
}: {
  onBack: () => void

  onLogin: (role: string) => void
}) {
  const [role, setRole] = useState<string | null>(null)

  const [name, setName] = useState("")

  const [nik, setNik] = useState("")

  const roles = ["Orang Tua", "Kader", "Nakes"]

  return (
    <main
      data-reveal-page
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#f8f9fa] px-5 py-12 lg:grid lg:grid-cols-[minmax(340px,440px)_minmax(380px,480px)] lg:gap-24 lg:px-12"
      aria-label="Masuk Centing Raja"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 size-72 rounded-full bg-[#7adaA2]/20 blur-[32px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-20 size-80 rounded-full bg-[#cfe1f8]/30 blur-[32px]"
      />
      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-5 z-20 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-['Manrope:Regular',sans-serif] text-sm font-semibold text-[#006d42] transition hover:bg-[#eaf4ee] focus:outline-none focus:ring-2 focus:ring-[#006d42]/30 lg:left-12 lg:top-10"
        aria-label="Kembali ke halaman sebelumnya"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          ←
        </span>
        Kembali
      </button>
      <section className="relative z-10 flex flex-col items-center text-center lg:items-center lg:text-center">
        <img
          src={loginLogo}
          alt="Logo Centing Raja"
          className="size-24 rounded-full object-cover shadow-[0_2px_2px_rgba(0,0,0,0.06),0_4px_3px_rgba(0,0,0,0.07)] lg:mx-auto"
        />
        <h1 className="mt-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold leading-6">
          Selamat Datang
        </h1>
        <p className="mt-2 max-w-sm font-['Manrope:Regular',sans-serif] text-base leading-6 text-[#3e4941]">
          Masuk untuk memantau tumbuh kembang si kecil.
        </p>
        <div className="mt-8 hidden max-w-sm rounded-2xl border border-[#d9eee2] bg-white/65 p-5 lg:block">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold text-[#006d42]">
            Satu langkah untuk tumbuh lebih sehat.
          </p>
          <p className="mt-2 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Pilih peran Anda untuk melihat informasi yang paling relevan.
          </p>
        </div>
      </section>
      <section className="relative z-10 mt-7 w-full max-w-[400px] rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.06)] sm:p-5 lg:mt-0">
        <label className="font-['Manrope:Regular',sans-serif] text-base leading-6 text-[#3e4941]">
          Masuk Sebagai
        </label>
        <div className="mt-2 grid grid-cols-3 rounded-xl bg-[#edeeef] p-2">
          {roles.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRole(item)}
              className={`min-h-12 rounded-lg px-2 font-['Manrope:Regular',sans-serif] text-sm transition-all sm:text-base ${
                role === item
                  ? "bg-white text-[#006d42] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                  : "text-[#3e4941] hover:text-[#006d42]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <label
            htmlFor="full-name"
            className="font-['Manrope:Regular',sans-serif] text-base leading-6 text-[#3e4941]"
          >
            Nama Lengkap
          </label>
          <div className="relative mt-2">
            <SvgIcon
              path={loginPaths.p85bff00}
              viewBox="0 0 16 16"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]"
            />
            <input
              id="full-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="min-h-12 w-full rounded-xl bg-[#f3f4f5] py-3 pl-12 pr-4 font-['Manrope:Regular',sans-serif] text-base text-[#191c1d] outline-none placeholder:text-[#9aa4a0] focus:ring-2 focus:ring-[#006d42]/30"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="nik"
            className="font-['Manrope:Regular',sans-serif] text-base leading-6 text-[#3e4941]"
          >
            NIK (Nomor Induk Kependudukan)
          </label>
          <div className="relative mt-2">
            <SvgIcon
              path={loginPaths.p207ea900}
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]"
            />
            <input
              id="nik"
              value={nik}
              onChange={(e) =>
                setNik(e.target.value.replace(/\D/g, "").slice(0, 16))
              }
              inputMode="numeric"
              placeholder="16 digit NIK"
              className="min-h-12 w-full rounded-xl bg-[#f3f4f5] py-3 pl-12 pr-4 font-['Manrope:Regular',sans-serif] text-base text-[#191c1d] outline-none placeholder:text-[#9aa4a0] focus:ring-2 focus:ring-[#006d42]/30"
            />
          </div>
          <p className="mt-1 text-right font-['Manrope:Regular',sans-serif] text-xs text-[#63747a]">
            {nik.length}/16
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (role) onLogin(role)
          }}
          disabled={!name || nik.length < 16 || !role}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#006d42] font-['Manrope:Regular',sans-serif] text-base text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Masuk{" "}
          <SvgIcon
            path={loginPaths.pce77c00}
            viewBox="0 0 9.333 9.333"
            className="size-4"
          />
        </button>
      </section>
      <p className="absolute bottom-8 left-1/2 z-10 w-full -translate-x-1/2 text-center font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
  Kendala masuk?{" "}
  <button
    type="button"
    onClick={() => window.open("https://wa.me/62895397306279", "_blank")}
    className="text-[#006d42] hover:underline"
  >
    Hubungi Tim IT Posyandu
  </button>
</p>
    </main>
  )
}
