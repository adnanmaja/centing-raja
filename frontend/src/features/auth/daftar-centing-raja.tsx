import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"

import registerPaths from "../../assets/icon-register"

const registerLogo =
  "/logo/logo-centing-raja.png"

export function DaftarCentingRaja({
  onBack,

  onReturn,

  onVerify,
}: {
  onBack: () => void

  onReturn: () => void

  onVerify: (phone: string) => void
}) {
  const [role, setRole] = useState<string | null>(null)

  const [name, setName] = useState("")

  const [nik, setNik] = useState("")

  const [phone, setPhone] = useState("")

  const roles = [
    {
      name: "Orang Tua",

      detail: "Orang tua / Wali anak",

      path: registerPaths.p390ecb80,

      viewBox: "0 0 20.5 20",
    },

    {
      name: "Kader Posyandu",

      detail: "Petugas pencatat pengukuran",

      path: registerPaths.p1233cb80,

      viewBox: "0 0 21 20",
    },

    {
      name: "Tenaga Kesehatan",

      detail: "Bidan, Ahli Gizi, atau Dokter",

      path: registerPaths.p17471e90,

      viewBox: "0 0 18 18",
    },
  ]

  const inputClass =
    "min-h-12 w-full rounded-lg bg-[#f3f4f5] py-3 pl-12 pr-4 font-['Manrope:Regular',sans-serif] text-sm text-[#191c1d] outline-none placeholder:text-[#a3aaa7] focus:ring-2 focus:ring-[#006d42]/30"

  return (
    <main
      data-reveal-page
      className="relative flex min-h-svh flex-col items-center justify-center overflow-x-hidden bg-[#f8f9fa] px-5 py-8 lg:grid lg:grid-cols-[minmax(340px,440px)_minmax(400px,500px)] lg:content-center lg:gap-x-8 lg:gap-y-10 lg:px-12"
      aria-label="Daftar Centing Raja"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 size-72 rounded-full bg-[#7adaa2]/20 blur-[32px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-20 size-80 rounded-full bg-[#cfe1f8]/30 blur-[32px]"
      />
      <button
        type="button"
        onClick={onReturn}
        className="absolute left-5 top-5 z-20 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-['Manrope:Regular',sans-serif] text-sm font-semibold text-[#006d42] transition hover:bg-[#eaf4ee] focus:outline-none focus:ring-2 focus:ring-[#006d42]/30 lg:left-12 lg:top-10"
        aria-label="Kembali ke halaman sebelumnya"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          ←
        </span>
        Kembali
      </button>
      <section className="relative z-10 flex flex-col items-center text-center lg:col-span-2 lg:justify-self-center lg:items-center lg:text-center">
        <img
          src={registerLogo}
          alt="Logo Centing Raja"
          className="size-24 rounded-full object-cover shadow-[0_2px_2px_rgba(0,0,0,0.06),0_4px_3px_rgba(0,0,0,0.07)] lg:mx-auto"
        />
        <h1 className="mt-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
          Buat Akun
        </h1>
        <p className="mt-2 max-w-sm font-['Manrope:Regular',sans-serif] text-base leading-6 text-[#3e4941]">
          Mari bersama pantau tumbuh kembang si kecil dengan Centing Raja.
        </p>
        <div className="mt-8 hidden rounded-2xl border border-[#d9eee2] bg-white/65 p-5 lg:block">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold text-[#006d42]">
            Mulai pendampingan yang lebih terarah.
          </p>
          <p className="mt-2 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Lengkapi data diri dan pilih peran Anda untuk bergabung.
          </p>
        </div>
      </section>
      <form
        className="relative z-10 mt-6 w-full max-w-[400px] space-y-5 lg:col-span-2 lg:mt-0 lg:grid lg:max-w-[900px] lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-4 lg:space-y-0"
        onSubmit={(e) => {
          e.preventDefault()

          if (name && nik.length >= 16 && phone && role) onVerify(phone)
        }}
      >
        <section className="rounded-2xl bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.05)] lg:col-start-1 lg:row-span-2">
          <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Informasi Pribadi
          </h2>
          <div className="mt-5 space-y-4">
            <label className="block font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Nama Lengkap
              <div className="relative mt-2">
                <SvgIcon
                  path={registerPaths.p85bff00}
                  viewBox="0 0 16 16"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]/50"
                />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap sesuai KTP"
                  className={inputClass}
                />
              </div>
            </label>
            <label className="block font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Nomor Induk Kependudukan (NIK)
              <div className="relative mt-2">
                <SvgIcon
                  path={registerPaths.p207ea900}
                  viewBox="0 0 20 20"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]/50"
                />
                <input
                  value={nik}
                  onChange={(e) =>
                    setNik(e.target.value.replace(/\D/g, "").slice(0, 16))
                  }
                  inputMode="numeric"
                  placeholder="16 digit angka NIK"
                  className={inputClass}
                />
              </div>
            </label>
            <label className="block font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Nomor Handphone (WhatsApp)
              <div className="relative mt-2">
                <SvgIcon
                  path={registerPaths.p2cc7db00}
                  viewBox="0 0 15 22"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]/50"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  inputMode="tel"
                  placeholder="Contoh: 08123456789"
                  className={inputClass}
                />
              </div>
            </label>
          </div>
        </section>
        <section className="rounded-2xl bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.05)] lg:col-start-2">
          <div className="flex items-center justify-between">
            <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
              Pilih Peran Anda
            </h2>
            <span className="rounded-full bg-[#fbefc8] px-2 py-1 font-['Manrope:Regular',sans-serif] text-[10px] text-[#765b06]">
              Wajib
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {roles.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setRole(item.name)}
                className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition ${
                  role === item.name
                    ? "bg-[#e9f3ff] ring-1 ring-[#006d42]/20"
                    : "bg-[#f3f4f5] hover:bg-[#eef4f1]"
                }`}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dceafe] text-[#4f6073]">
                  <SvgIcon
                    path={item.path}
                    viewBox={item.viewBox}
                    className="size-5"
                  />
                </span>
                <span>
                  <span className="block font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold text-[#191c1d]">
                    {item.name}
                  </span>
                  <span className="mt-1 block font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
                    {item.detail}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
        <button
          type="submit"
          disabled={!name || nik.length < 16 || !phone || !role}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#006d42] lg:col-start-2 font-['Manrope:Regular',sans-serif] text-base text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10)] disabled:opacity-45"
        >
          Daftar Sekarang{" "}
          <SvgIcon
            path={registerPaths.p32510800}
            viewBox="0 0 13.333 13.333"
            className="size-4"
          />
        </button>
        <p className="text-center font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941] lg:col-start-2">
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={onBack}
            className="text-[#006d42] hover:underline"
          >
            Masuk di sini
          </button>
        </p>
      </form>
    </main>
  )
}
