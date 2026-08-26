import { useEffect, useState } from "react"

const loadingLogo =
  "/logo/logo-centing-raja.png"

export function Loading() {
  return (
    <main
      className="flex min-h-svh w-full items-center justify-center bg-[#f8f9fa] px-4 py-12"
      aria-label="Memuat aplikasi"
    >
      <div className="flex w-full max-w-96 flex-col items-center">
        <CentingRajaLogo />
        <div className="pt-8">
          <div className="flex flex-col items-center" aria-live="polite">
            <div
              className="h-1.5 w-32 overflow-hidden rounded-full bg-[#e1e3e4]"
              role="progressbar"
              aria-label="Memuat Centing Raja"
            >
              <div className="loading-progress h-full rounded-full bg-[#006d42] motion-reduce:animate-none" />
            </div>
            <p className="mt-4 text-center text-base leading-6 text-[rgba(62,73,65,0.8)]">
              Memuat centing raja....
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

function CentingRajaLogo() {
  return (
    <div className="relative isolate flex size-48 shrink-0 items-center justify-center">
      <div className="relative size-48 overflow-hidden shadow-[0px_2px_2px_rgba(0,0,0,0.06),0px_4px_3px_rgba(0,0,0,0.07)]">
        <img
          src={loadingLogo}
          alt="Logo Centing Raja"
          className="size-full object-cover select-none"
          draggable={false}
        />
      </div>
    </div>
  )
}
