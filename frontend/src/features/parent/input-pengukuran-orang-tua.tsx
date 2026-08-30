import React, { useEffect, useRef, useState } from "react"

import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"

import { ParentInputHeader } from "../../components/parent/parent-input-header"

import { SvgIcon } from "../../components/ui/svg-icon"

import parentMeasurementCardPaths from "../../assets/icon-measurement-card"

import parentHeightIconPaths from "../../assets/icon-height"

import parentLilaIconPaths from "../../assets/icon-lila"

const measurementInputLogoParent =
  "/logo/logo-centing-raja.png"

const parentMeasurementCardAvatar =
  "/images/avatar-andika.png"

export function InputPengukuranOrangTua({
  onBack,

  onSaved,

  onHome,

  onMaterial,

  onInput,
}: {
  onBack: () => void

  onSaved: () => void

  onHome: () => void

  onMaterial: () => void

  onInput: () => void
}) {
  const [weight, setWeight] = useState("")

  const [height, setHeight] = useState("")

  const [head, setHead] = useState("")

  const [lila, setLila] = useState("")

  const [position, setPosition] = useState("Berdiri")

  const decimal =
    (value: string, set: (next: string) => void, precision: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value.replace(/[^0-9.]/g, "")

      const [whole, fraction = ""] = next.split(".")

      set(
        `${whole}${
          next.includes(".") ? `.${fraction.slice(0, precision)}` : ""
        }`,
      )
    }

  const numberField = (
    label: string,

    value: string,

    set: (n: string) => void,

    unit: string,

    precision: number,
  ) => (
    <label className="mt-4 block font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
      {label}
      <div className="relative mt-2">
        <input
          value={value}
          onChange={decimal(value, set, precision)}
          inputMode="decimal"
          placeholder={precision === 2 ? "0.00" : "0.0"}
          className="min-h-14 w-full rounded-lg bg-[#f6f7f7] px-4 pr-12 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl text-[#191c1d] outline-none placeholder:text-[#c4d0c7] focus:ring-2 focus:ring-[#006d42]/30"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#3e4941]">
          {unit}
        </span>
      </div>
    </label>
  )

  const complete = weight && height

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-28 text-[#191c1d]"
      aria-label="Input Pengukuran"
    >
      <ParentInputHeader logo={measurementInputLogoParent} title="Input" />
      <div className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-8 sm:py-9">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-3 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold"
        >
          ‹ <span>Input Pengukuran</span>
        </button>
        <section className="mt-5 flex items-center gap-3 rounded-xl bg-[#edeeef] p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <img
            src={parentMeasurementCardAvatar}
            alt="Leo M."
            className="size-12 rounded-full bg-[#cfe1f8] object-cover"
          />
          <div className="flex-1">
            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
              Leo M.
            </p>
            <p className="font-['Manrope:Regular',sans-serif] text-xs text-[#536478]">
              Laki-laki · 12 Bulan
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#76d69f]/20 px-3 py-1 font-['Manrope:SemiBold',sans-serif] text-[10px] text-[#007c4a]">
            <SvgIcon
              path={parentMeasurementCardPaths.p3bb7dc80}
              viewBox="0 0 10.5 11.667"
              className="h-3 w-2.5"
            />
            Hari ini
          </span>
        </section>
        <section className="mt-5 rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold">
            <span className="grid size-8 place-items-center rounded-full bg-[#006d42]/10 text-[#006d42]">
              <SvgIcon
                path={parentLilaIconPaths.p1bf58fe0}
                viewBox="0 0 15 15"
                className="size-4"
              />
            </span>
            Berat Badan
          </h2>
          {numberField("Berat (Akurasi 2 desimal)", weight, setWeight, "kg", 2)}
        </section>
        <section className="mt-5 rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold">
            <span className="grid size-8 place-items-center rounded-full bg-[#006d42]/10 text-[#006d42]">
              <SvgIcon
                path={parentHeightIconPaths.p26347380}
                viewBox="0 0 6 13.5"
                className="h-4 w-2"
              />
            </span>
            Tinggi / Panjang
          </h2>
          <div className="mt-4 grid grid-cols-2 rounded-lg bg-[#f0f1f1] p-1">
            {["Berdiri", "Telentang"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPosition(item)}
                className={`min-h-10 rounded-md font-['Manrope:Regular',sans-serif] text-sm ${
                  position === item
                    ? "bg-white text-[#191c1d] shadow-sm"
                    : "text-[#536478]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          {numberField(
            "Tinggi (Akurasi 1 desimal)",

            height,

            setHeight,

            "cm",

            1,
          )}
        </section>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <section className="rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <h2 className="flex items-center gap-1.5 font-['Manrope:SemiBold',sans-serif] text-sm">
              <span className="grid size-6 place-items-center rounded-full bg-[#006d42]/10 text-[#006d42]">
                ◉
              </span>
              Lingkar Kepala
            </h2>
            {numberField("", head, setHead, "cm", 1)}
          </section>
          <section className="rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <h2 className="flex items-center gap-1.5 font-['Manrope:SemiBold',sans-serif] text-sm">
              <span className="grid size-6 place-items-center rounded-full bg-[#006d42]/10 text-[#006d42]">
                <SvgIcon
                  path={parentLilaIconPaths.p1bf58fe0}
                  viewBox="0 0 15 15"
                  className="size-3.5"
                />
              </span>
              LiLA
            </h2>
            {numberField("", lila, setLila, "cm", 1)}
          </section>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-16 z-20 border-t border-[#e7e8e9] bg-white/95 p-4 backdrop-blur-xl">
       <div className="mx-auto max-w-6xl">
          <button
            type="button"
            disabled={!complete}
            onClick={onSaved}
            className="min-h-14 w-full rounded-xl bg-[#007c4a] font-['Manrope:SemiBold',sans-serif] text-base text-white shadow-[0_4px_10px_rgba(0,109,66,0.18)] disabled:opacity-45"
          >
            Simpan & Lihat Hasil　→
          </button>
        </div>
      </div>
      <ParentBottomNav
        onHome={onHome}
        onMaterial={onMaterial}
        onInput={onInput}
        active="Input"
      />
    </main>
  )
}
