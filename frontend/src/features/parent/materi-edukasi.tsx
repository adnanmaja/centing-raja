import React, { useEffect, useRef, useState } from "react"

import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"

import { SvgIcon } from "../../components/ui/svg-icon"

import { parentMaterialItems } from "./parent-materials"

import parentMaterialsPaths from "../../assets/icon-materials"

const parentMaterialsLogo =
  "/logo/logo-centing-raja.png"

export function MateriEdukasi({
  onHome,

  onInput,

  onOpen,
}: {
  onHome: () => void

  onInput: () => void

  onOpen: (material: typeof parentMaterialItems[number]) => void
}) {
  const [filter, setFilter] = useState("Semua")

  const filters = ["Semua", "Gizi & MPASI", "Pola Asuh", "Sanitasi"]

  const visible =
    filter === "Semua"
      ? parentMaterialItems
      : parentMaterialItems.filter((item) => item.category === filter)

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]"
      aria-label="Materi Edukasi"
    >
      <header className="sticky top-0 z-30 border-b border-black/[0.03] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={parentMaterialsLogo}
              alt="Logo Centing Raja"
              className="size-7 object-cover sm:size-8"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#007c4a] sm:text-lg">
              Materi
            </span>
          </div>
          <div className="flex items-center gap-4">
            <SvgIcon
              path={parentMaterialsPaths.p164b49c0}
              viewBox="0 0 16 20"
              className="size-5 text-[#3e4941]"
            />
            <span className="grid size-7 place-items-center rounded-full bg-[#007c4a] text-white">
              <SvgIcon
                path={parentMaterialsPaths.p3189a600}
                viewBox="0 0 12 12"
                className="size-4"
              />
            </span>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-8 sm:py-8 xl:px-10">
        <section className="rounded-xl bg-[#dbeafd] p-4 sm:p-6">
          <div className="flex gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#006d42]">
              <SvgIcon
                path={parentMaterialsPaths.p31e6b500}
                viewBox="0 0 21 25.083"
                className="h-6 w-5"
              />
            </span>
            <div>
              <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#536478] sm:text-xl">
                Materi Edukasi Stunting
              </h1>
              <p className="mt-2 max-w-xl font-['Manrope:Regular',sans-serif] text-xs leading-5 text-[#536478] sm:text-sm">
                Kumpulan panduan tepercaya dan tips praktis langsung dari ahli
                gizi Puskesmas untuk mendampingi tumbuh kembang si kecil.
              </p>
            </div>
          </div>
        </section>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`min-h-9 shrink-0 rounded-full px-4 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold transition ${
                filter === item
                  ? "bg-[#006d42] text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
                  : "bg-[#e7e8e9] text-[#191c1d]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <article
              key={item.id}
              className="flex min-h-[145px] flex-col rounded-xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
            >
              <div className="flex gap-3">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full ${item.iconBox}`}
                >
                  <SvgIcon
                    path={item.icon}
                    viewBox="0 0 21 25.083"
                    className="size-5"
                  />
                </span>
                <div className="min-w-0">
                  <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold leading-5">
                    {item.title}
                  </h2>
                  <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#65736c]">
                    {item.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="mt-auto self-end pt-4 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#007c4a]"
              >
                Buka Materi →
              </button>
            </article>
          ))}
        </section>
      </div>
      <ParentBottomNav
        onHome={onHome}
        onMaterial={() => undefined}
        onInput={onInput}
        active="Materi"
      />
    </main>
  )
}
