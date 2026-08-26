import React, { useEffect, useRef, useState } from "react"

import { ProfileBottomNav } from "../../components/kader/profile-bottom-nav"

import { ProfileHeader } from "../../components/kader/profile-header"

import { SvgIcon } from "../../components/ui/svg-icon"

import helpCenterPaths from "../../assets/icon-help-center"

const helpCenterLogo =
  "/logo/logo-centing-raja.png"

export function PusatBantuanKader({
  onHome,

  onMaterial,

  onTasks,

  onProfile,
}: {
  onHome: () => void

  onMaterial: () => void

  onTasks: () => void

  onProfile: () => void
}) {
  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[linear-gradient(115deg,#f8f9fa_0%,#f8f9fa_42%,#e7f8ef_100%)] pb-24 pt-16 text-[#191c1d]"
      aria-label="Pusat Bantuan"
    >
      <ProfileHeader logo={helpCenterLogo} onBack={onProfile} />
      <section className="mx-auto flex min-h-[calc(100svh-128px)] w-full max-w-5xl items-center justify-center px-5 py-10 sm:px-8 lg:py-14">
        <article className="w-full max-w-[380px] rounded-[24px] bg-white px-8 py-9 text-center shadow-[0_8px_22px_rgba(0,0,0,0.05)] sm:max-w-[540px] sm:px-12 sm:py-12">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#006d42] text-white shadow-[0_0_0_7px_#c6f0d8]">
            <SvgIcon
              path={helpCenterPaths.p2a1e4380}
              viewBox="0 0 36 32"
              className="size-10"
            />
          </div>
          <h1 className="mt-8 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold leading-8 sm:text-3xl">
            Butuh Bantuan?
          </h1>
          <p className="mx-auto mt-3 max-w-sm font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#58655e] sm:text-base">
            Jangan ragu untuk menghubungi Tim IT Support kami jika Anda
            mengalami kendala teknis.
          </p>
          <div className="mt-8 rounded-xl bg-[#f0f0f0] px-4 py-4">
            <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#68736e]">
              WHATSAPP CALL CENTER
            </p>
            <p className="mt-1 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold tracking-wide text-[#007c4a] sm:text-3xl">
              0895397306279
            </p>
          </div>
          <a
            href="https://wa.me/62895397306279"
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#007c4a] px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_5px_12px_rgba(0,109,66,0.18)] transition hover:bg-[#006d42]"
          >
            <SvgIcon
              path={helpCenterPaths.p23a2a080}
              viewBox="0 0 16.667 16.667"
              className="size-4"
            />
            Chat via WhatsApp
          </a>
          <p className="mt-7 font-['Manrope:Regular',sans-serif] text-sm text-[#9ca5a1]">
            Senin - Jumat, 08:00 - 17:00 WIB
          </p>
        </article>
      </section>
      <ProfileBottomNav
        onHome={onHome}
        onMaterial={onMaterial}
        onTasks={onTasks}
        onProfile={onProfile}
      />
    </main>
  )
}
