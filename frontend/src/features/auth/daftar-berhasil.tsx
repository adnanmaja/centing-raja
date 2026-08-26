import React, { useEffect, useRef, useState } from "react"

import SuccessGradient from "../../assets/success-gradient"

export function DaftarBerhasil({ onContinue }: { onContinue: () => void }) {
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
