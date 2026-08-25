import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/SvgIcon"

const authLogo =
  "/assets/imports/CentingRajaAuth/0007128175a75209c8c698fe2b734b37ba9ba267.png"

const authStoryImage =
  "/assets/imports/CentingRajaAuth/26c27d2576e6620212c91423165f936790bbcb63.png"

import authPaths from "../../assets/icon-auth"

const loginLogo =
  "/assets/imports/MasukCentingRaja-2/0007128175a75209c8c698fe2b734b37ba9ba267.png"

import loginPaths from "../../assets/icon-login"

const registerLogo =
  "/assets/imports/DaftarCentingRaja/0007128175a75209c8c698fe2b734b37ba9ba267.png"

import registerPaths from "../../assets/icon-register"

import SuccessGradient from "../../assets/success-gradient"

export function AuthScreen({
  onLogin,

  onRegister,
}: {
  onLogin: () => void

  onRegister: () => void
}) {
  const features = [
    {
      title: "Pantau Berat",

      text: "Catat berat dan tinggi badan secara rutin.",

      icon: authPaths.p8d38a40,

      viewBox: "0 0 18 18",

      tone: "bg-[#cfe1f8] text-[#4f6073]",
    },

    {
      title: "Grafik KMS",

      text: "Visualisasi pertumbuhan berstandar WHO.",

      icon: authPaths.pa9e6b00,

      viewBox: "0 0 20 13",

      tone: "bg-[#eac55f] text-[#765b06]",
    },
  ]

  return (
    <main
      data-reveal-page
      className="min-h-svh overflow-x-hidden bg-[#f8f9fa] px-5 py-8 text-[#191c1d] sm:px-8 lg:grid lg:grid-cols-[minmax(0,520px)_minmax(360px,1fr)] lg:items-start lg:content-center lg:gap-20 lg:px-[10vw]"
      aria-label="Autentikasi Centing Raja"
    >
      <section className="relative overflow-hidden rounded-2xl bg-[#f3f4f5] px-6 py-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:px-10 sm:py-9 lg:order-2 lg:mt-5 lg:min-h-[530px] lg:flex lg:flex-col lg:justify-center">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-12 size-56 rounded-full bg-[#d9f0e5] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-12 -left-12 size-44 rounded-full bg-[#ffdf96]/30 blur-2xl"
        />
        <div className="relative mx-auto max-w-sm">
          <img
            src={authLogo}
            alt="Logo Centing Raja"
            className="mx-auto size-24 rounded-full object-cover shadow-[0_2px_2px_rgba(0,0,0,0.06),0_4px_3px_rgba(0,0,0,0.07)]"
          />
          <h1 className="mt-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold leading-6">
            Centing Raja
          </h1>
          <p className="mt-4 font-['Manrope:Regular',sans-serif] text-base leading-6 text-[#3e4941]">
            Bersama wujudkan generasi emas bebas stunting. Pantau tumbuh kembang
            anak dengan mudah dan akurat.
          </p>
          <div className="mt-8 grid gap-3">
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#006d42] px-6 font-['Manrope:Regular',sans-serif] text-base text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10)]"
            >
              Masuk{" "}
              <SvgIcon
                path={authPaths.pad382c0}
                viewBox="0 0 13.5 13.5"
                className="size-4"
              />
            </button>
            <button
              type="button"
              onClick={onRegister}
              className="min-h-12 rounded-full border border-[#006d42] bg-transparent px-6 font-['Manrope:Regular',sans-serif] text-base text-[#006d42]"
            >
              Daftar Akun Baru
            </button>
          </div>
        </div>
      </section>
      <section className="mt-7 lg:order-1 lg:mt-0">
        <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold leading-6">
          Fitur Utama
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className={`rounded-xl p-4 ${feature.tone}`}
            >
              <span className="grid size-10 place-items-center rounded-full bg-white/85">
                <SvgIcon
                  path={feature.icon}
                  viewBox={feature.viewBox}
                  className="size-5"
                />
              </span>
              <h3 className="mt-4 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                {feature.title}
              </h3>
              <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-4">
                {feature.text}
              </p>
            </article>
          ))}
          <article className="relative overflow-hidden rounded-xl bg-[#ffd7d3] p-4 sm:col-span-2">
            <span className="grid size-10 place-items-center rounded-full bg-white text-[#ba1a1a]">
              <SvgIcon
                path={authPaths.pa80bf00}
                viewBox="0 0 20 20"
                className="size-5"
              />
            </span>
            <h3 className="mt-3 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#93000a]">
              Jadwal Posyandu & Imunisasi
            </h3>
            <p className="mt-1 max-w-sm font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#ba1a1a]">
              Pengingat otomatis agar tidak terlewat jadwal kunjungan rutin.
            </p>
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -right-4 size-24 rounded-full border-[10px] border-[#efb7b1]/60"
            />
          </article>
        </div>
        <article className="relative mt-5 min-h-48 overflow-hidden rounded-xl bg-[#3e4941] p-4 text-white shadow-[0_1px_2px_rgba(0,0,0,0.10)]">
          <img
            src={authStoryImage}
            alt="Ibu dan anak dalam ruang pemeriksaan"
            className="absolute inset-0 size-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <div className="relative flex min-h-40 flex-col justify-end">
            <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
              1000 Hari Pertama
            </h3>
            <p className="mt-2 max-w-sm font-['Manrope:Regular',sans-serif] text-sm leading-5 text-white/90">
              Masa emas pencegahan stunting. Mari kawal bersama.
            </p>
          </div>
        </article>
      </section>
    </main>
  )
}

export function LoginScreen({
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
        <a href="tel:0895397306279" className="text-[#006d42] hover:underline">
          Hubungi Tim IT Posyandu
        </a>
      </p>
    </main>
  )
}

export function RegisterScreen({
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

export function OtpScreen({
  phone,

  onBack,

  onVerified,
}: {
  phone: string

  onBack: () => void

  onVerified: () => void
}) {
  const [code, setCode] = useState(["", "", "", "", ""])

  const [resendNote, setResendNote] = useState("")

  const inputs = useRef<Array<HTMLInputElement | null>>([])

  const displayPhone = phone || "081234567890"

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)

    setCode((previous) =>
      previous.map((item, itemIndex) => (itemIndex === index ? digit : item)),
    )

    if (digit && index < 4) inputs.current[index + 1]?.focus()
  }

  const onKeyDown = (
    index: number,

    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !code[index] && index > 0)
      inputs.current[index - 1]?.focus()
  }

  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const digits = event.clipboardData

      .getData("text")

      .replace(/\D/g, "")

      .slice(0, 5)

      .split("")

    setCode(Array.from({ length: 5 }, (_, index) => digits[index] ?? ""))

    inputs.current[Math.min(digits.length, 4)]?.focus()
  }

  const completed = code.every(Boolean)

  return (
    <main
      data-reveal-page
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#006d42] px-5 py-12 text-white"
      aria-label="Verifikasi SMS OTP"
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 top-12 size-64 rounded-full bg-[#51a877]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-20 size-72 rounded-full bg-[#024e31]/40 blur-3xl"
      />
      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-5 z-20 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-['Manrope:Regular',sans-serif] text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffbb02] lg:left-10 lg:top-10"
        aria-label="Kembali ke pendaftaran"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          ←
        </span>
        Kembali
      </button>
      <section className="relative z-10 w-full max-w-[390px] text-center lg:max-w-[580px] lg:rounded-[28px] lg:bg-white/5 lg:px-16 lg:py-16 lg:shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
        <div className="mx-auto grid size-16 place-items-center rounded-[22px] bg-white/10 text-3xl shadow-inner shadow-white/10">
          ✉
        </div>
        <h1 className="mt-8 font-['SF_Pro_Rounded:Semibold',sans-serif] text-2xl font-semibold tracking-tight lg:text-[28px]">
          Cek SMS mu!
        </h1>
        <p className="mt-3 font-['SF_Pro:Regular',sans-serif] text-base leading-6 text-white/90">
          Kami baru saja mengirim kode OTP ke
        </p>
        <p className="mt-1 break-all font-['Manrope:Regular',sans-serif] text-base font-semibold text-[#ffdf7f]">
          {displayPhone}
        </p>
        <div
          className="mt-8 flex justify-center gap-2.5 sm:gap-3"
          onPaste={onPaste}
        >
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputs.current[index] = element
              }}
              value={digit}
              onChange={(event) => updateDigit(index, event.target.value)}
              onKeyDown={(event) => onKeyDown(index, event)}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              aria-label={`Digit OTP ke-${index + 1}`}
              maxLength={1}
              className="size-11 rounded-[10px] border border-[#ff9ae8] bg-white/5 text-center font-['Inter:Regular',sans-serif] text-xl text-white outline-none transition focus:border-[#ffbb02] focus:bg-white/10 focus:ring-2 focus:ring-[#ffbb02]/35 sm:size-12"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onVerified}
          disabled={!completed}
          className="mt-11 inline-flex min-h-11 min-w-32 items-center justify-center rounded-[10px] bg-[#ffbb02] px-6 font-['SF_Compact_Rounded:Bold',sans-serif] text-base font-bold text-white shadow-[0_4px_0_#ff8601] transition hover:brightness-105 active:translate-y-px active:shadow-[0_2px_0_#ff8601] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Verifikasi
        </button>
        <p className="mt-10 font-['Inter:Regular',sans-serif] text-[13px] text-white/90">
          Tidak melihat kode?{" "}
          <button
            type="button"
            onClick={() => setResendNote("Kode OTP baru telah dikirim.")}
            className="font-semibold text-[#ffbb02] underline decoration-2 underline-offset-4"
          >
            kirim ulang
          </button>
        </p>
        {resendNote && (
          <p className="mt-3 text-xs text-[#ffdf7f]" role="status">
            {resendNote}
          </p>
        )}
      </section>
    </main>
  )
}

export function SuccessScreen({ onContinue }: { onContinue: () => void }) {
  const confetti = [
    "left-[12%] top-[19%]",

    "left-[24%] top-[12%]",

    "right-[20%] top-[17%]",

    "right-[11%] top-[30%]",

    "left-[18%] bottom-[23%]",

    "right-[18%] bottom-[20%]",
  ]

  return (
    <main
      data-reveal-page
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#f8f9fa] px-5 py-12"
      aria-label="Pendaftaran berhasil"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <SuccessGradient />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(118,214,159,0.22),transparent_33%)]"
      />
      {confetti.map((position, index) => (
        <span
          key={position}
          aria-hidden="true"
          className={`success-confetti absolute z-10 size-2 rounded-sm ${position} ${
            index % 2 ? "bg-[#ffbb02]" : "bg-[#006d42]"
          }`}
          style={{ animationDelay: `${index * 110}ms` }}
        />
      ))}
      <section className="relative z-20 flex w-full max-w-[390px] flex-col items-center text-center lg:max-w-[610px] lg:rounded-[30px] lg:bg-white/70 lg:px-20 lg:py-16 lg:shadow-[0_24px_80px_rgba(0,80,48,0.12)]">
        <div className="success-burst relative grid size-32 place-items-center rounded-full bg-[#e9f7ef] shadow-[0_0_0_18px_rgba(0,109,66,0.05)] lg:size-36">
          <div className="success-check grid size-20 place-items-center rounded-full bg-[#006d42] text-[42px] font-bold text-white shadow-[0_12px_24px_rgba(0,109,66,0.24)]">
            ✓
          </div>
        </div>
        <p className="success-label mt-10 rounded-full bg-[#e9f7ef] px-3 py-1 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold uppercase tracking-[0.14em] text-[#006d42]">
          Akun siap digunakan
        </p>
        <h1 className="success-copy mt-4 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-2xl font-semibold leading-8 text-[#191c1d] lg:text-3xl lg:leading-10">
          Pendaftaran Berhasil!
        </h1>
        <p className="success-copy mt-3 max-w-md font-['Manrope:Regular',sans-serif] text-base leading-6 text-[#3e4941]">
          Terima kasih sudah bergabung dengan Centing Raja. Akun Anda berhasil
          dibuat dan siap menemani tumbuh kembang si kecil.
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="success-copy mt-10 inline-flex min-h-12 w-full max-w-[320px] items-center justify-center rounded-full bg-[#006d42] px-6 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_6px_16px_rgba(0,109,66,0.22)] transition hover:-translate-y-0.5 hover:bg-[#005b37] active:translate-y-0"
        >
          Kembali Masuk
        </button>
      </section>
    </main>
  )
}
