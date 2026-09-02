import React, { useEffect, useRef, useState } from "react"

import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"

import { SvgIcon } from "../../components/ui/svg-icon"

import { type ParentMaterialItem } from "./parent-materials"

const parentMaterialsLogo =
  "/logo/logo-centing-raja.png"

export function DetailMateriEdukasi({
  material,
  onBack,
  onHome,
}: {
  material: ParentMaterialItem
  onBack: () => void
  onHome: () => void
}) {
  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]"
      aria-label={`Materi ${material.title}`}
    >
      <header className="sticky top-0 z-30 border-b border-black/[0.03] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-8">
          <button
            type="button"
            onClick={onBack}
            className="grid size-9 place-items-center rounded-full text-[#006d42] transition hover:bg-[#e9f7ef]"
            aria-label="Kembali"
          >
            <span className="text-2xl leading-none">‹</span>
          </button>
          <img
            src={parentMaterialsLogo}
            alt="Logo Centing Raja"
            className="size-7 object-cover"
          />
          <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold text-[#007c4a]">
            Materi
          </span>
        </div>
      </header>
      <article className="mx-auto w-full max-w-3xl px-4 py-7 sm:px-8 sm:py-12">
        <span
          className={`grid size-14 place-items-center rounded-2xl ${material.iconBox || "bg-[#76d69f] text-[#005c38]"}`}
        >
          {material.icon ? (
            <SvgIcon
              path={material.icon}
              viewBox="0 0 21 25.083"
              className="size-7"
            />
          ) : (
            <span className="text-2xl">📖</span>
          )}
        </span>
        <p className="mt-6 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#007c4a]">
          {material.category}
        </p>
        <h1 className="mt-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-2xl font-semibold leading-8 sm:text-4xl sm:leading-[1.15]">
          {material.title}
        </h1>
        <p className="mt-5 max-w-2xl font-['Manrope:Regular',sans-serif] text-base leading-7 text-[#536478]">
          {material.description}
        </p>
        <section className="mt-8 rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:p-7">
          <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold">
            Ringkasan Materi
          </h2>
          <p className="mt-3 font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#3e4941]">
            Pelajari panduan praktis dari sumber kesehatan tepercaya untuk
            membantu keluarga mengambil langkah kecil yang konsisten bagi tumbuh
            kembang si kecil.
          </p>
          {material.video_url && (
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl bg-black/90">
              {material.video_url.includes("youtube.com") || material.video_url.includes("youtu.be") ? (
                <iframe
                  src={
                    material.video_url.includes("watch?v=")
                      ? material.video_url.replace("watch?v=", "embed/")
                      : material.video_url
                  }
                  title={material.title}
                  className="size-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={material.video_url}
                  controls
                  className="size-full object-cover"
                />
              )}
            </div>
          )}
          {(material.link || material.video_url) ? (
            <a
              href={material.link || material.video_url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#006d42] px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white transition hover:bg-[#005c38]"
            >
              Buka Link Materi <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <p className="mt-4 text-xs text-[#536478]">
              Materi disusun oleh Tim Kesehatan Centing Raja.
            </p>
          )}
        </section>
      </article>
      <ParentBottomNav onHome={onHome} onMaterial={onBack} active="Materi" />
    </main>
  )
}
