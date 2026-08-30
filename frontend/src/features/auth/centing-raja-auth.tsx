import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import { SvgIcon } from "../../components/ui/svg-icon"
import authPaths from "../../assets/icon-auth"

const authLogo = "/logo/logo-centing-raja.png"
const authStoryImage = "/images/ilustrasi-pengukuran-tinggi.png"

export function CentingRajaAuth({
  onLogin,
  onRegister,
  onTutorial,
}: {
  onLogin: () => void
  onRegister: () => void
  onTutorial?: () => void
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
      text: "Visualisasi pertumbuhan berstandar Kemenkes RI Indonesia.",
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
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#006d42] px-6 font-['Manrope:Regular',sans-serif] text-base text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Masuk{" "}
              <SvgIcon path={authPaths.pad382c0} viewBox="0 0 13.5 13.5" className="size-4" />
            </button>
            <button
              type="button"
              onClick={onRegister}
              className="min-h-12 rounded-full border border-[#006d42] bg-transparent px-6 font-['Manrope:Regular',sans-serif] text-base text-[#006d42] transition-colors hover:bg-[#006d42]/5"
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
            <motion.article
              key={feature.title}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`cursor-pointer rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-md ${feature.tone}`}
            >
              <span className="grid size-10 place-items-center rounded-full bg-white/85">
                <SvgIcon path={feature.icon} viewBox={feature.viewBox} className="size-5" />
              </span>
              <h3 className="mt-4 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                {feature.title}
              </h3>
              <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-4">
                {feature.text}
              </p>
            </motion.article>
          ))}

          <motion.article
            role="button"
            tabIndex={0}
            onClick={onTutorial}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onTutorial?.()
            }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative cursor-pointer overflow-hidden rounded-xl bg-[#ffd7d3] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-md sm:col-span-2"
          >
            <span className="grid size-10 place-items-center rounded-full bg-white text-[#ba1a1a]">
              <SvgIcon path={authPaths.pa80bf00} viewBox="0 0 20 20" className="size-5" />
            </span>
            <h3 className="mt-3 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#93000a]">
              Tutorial Penggunaan Aplikasi
            </h3>
            <p className="mt-1 max-w-sm font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#ba1a1a]">
              Pelajari cara memakai Centing Raja langkah demi langkah sebelum
              mulai memantau tumbuh kembang anak.
            </p>
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -right-4 size-24 rounded-full border-[10px] border-[#efb7b1]/60"
            />
          </motion.article>
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