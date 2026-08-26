import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"

import inputMeasurementPaths from "../../assets/icon-input-measurement"

const inputMeasurementLogo =
  "/logo/logo-centing-raja-48.png"

export function InputDataPengukuran({
  onBack,

  onSaved,
}: {
  onBack: () => void

  onSaved: () => void
}) {
  const [weight, setWeight] = useState(0)

  const [height, setHeight] = useState(0)

  const [headCircumference, setHeadCircumference] = useState("")

  const [armCircumference, setArmCircumference] = useState("")

  const [touched, setTouched] = useState({
    weight: false,

    height: false,

    head: false,

    arm: false,
  })

  const [position, setPosition] = useState<"Berdiri" | "Terlentang">("Berdiri")

  const [note, setNote] = useState("")

  const isComplete =
    weight > 0 &&
    height > 0 &&
    Number(headCircumference) > 0 &&
    Number(armCircumference) > 0

  const adjust = (
    setter: React.Dispatch<React.SetStateAction<number>>,

    delta: number,

    field: "weight" | "height",
  ) => {
    setter((value) => Math.max(0, Math.round((value + delta) * 10) / 10))

    setTouched((current) => ({ ...current, [field]: true }))
  }

  const format = (value: number) => value.toFixed(1)

  const numberInput = (
    value: string,

    setter: (value: string) => void,

    field: "head" | "arm",
  ) => (
    <input
      value={value}
      onChange={(event) => {
        setter(event.target.value.replace(/[^0-9.,]/g, "").replace(",", "."))

        setTouched((current) => ({ ...current, [field]: true }))
      }}
      inputMode="decimal"
      placeholder="0.0"
      className={`mt-3 w-full border-0 bg-transparent p-0 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold outline-none placeholder:text-[#becabf] ${
        touched[field] ? "text-[#191c1d]" : "text-[#becabf]"
      }`}
    />
  )

  const control = (
    label: string,

    value: number,

    setter: React.Dispatch<React.SetStateAction<number>>,

    previous: string,

    field: "weight" | "height",

    accent = "border-l-[#f0cb69]",
  ) => (
    <article
      className={`rounded-2xl border-l-4 ${accent} bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]`}
    >
      <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#536478]">
        {label}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => adjust(setter, -0.1, field)}
          className="grid size-10 place-items-center rounded-full bg-[#edeeef] text-2xl leading-none text-[#191c1d]"
          aria-label={`Kurangi ${label}`}
        >
          −
        </button>
        <output
          className={`font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold ${
            touched[field] ? "text-[#191c1d]" : "text-[#becabf]"
          }`}
        >
          {format(value)}
        </output>
        <button
          type="button"
          onClick={() => adjust(setter, 0.1, field)}
          className="grid size-10 place-items-center rounded-full bg-[#edeeef] text-2xl leading-none text-[#191c1d]"
          aria-label={`Tambah ${label}`}
        >
          +
        </button>
      </div>
      <p className="mt-3 font-['Manrope:Regular',sans-serif] text-[10px] text-[#63747a]">
        Bulan lalu: {previous}
      </p>
    </article>
  )

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-10 pt-16 text-[#191c1d]"
      aria-label="Input Pengukuran"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-3 sm:px-8 xl:px-10">
          <button
            type="button"
            onClick={onBack}
            className="grid size-10 place-items-center rounded-full text-[#191c1d]"
            aria-label="Kembali"
          >
            <SvgIcon
              path={inputMeasurementPaths.p225a8cc0}
              viewBox="0 0 11.775 20"
              className="h-5 w-3"
            />
          </button>
          <div className="ml-2 flex items-center gap-2">
            <img
              src={inputMeasurementLogo}
              alt="Logo Centing Raja"
              className="size-6 rounded-full object-cover"
            />
            <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#006d42]">
              Input Pengukuran
            </h1>
          </div>
        </div>
      </header>
      <div className="border-b-4 border-[#edeeef]">
        <div className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8 xl:px-10">
          <p className="inline-flex items-center gap-2 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#4f6073]">
            <SvgIcon
              path={inputMeasurementPaths.p2cf7a400}
              viewBox="0 0 9.333 10.5"
              className="h-3 w-3"
            />
            Posyandu Mekar Jaya
          </p>
          <h2 className="mt-1 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8">
            Data Antropometri
          </h2>
          <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
            Masukkan hasil pengukuran bulanan anak.
          </p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 xl:px-10 xl:py-9">
        <section className="rounded-2xl bg-[#f3f4f5] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-[#cfe1f8] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-2xl font-semibold text-[#536478]">
              A
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="truncate font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                  Ahmad Raihan
                </h3>
                <span className="rounded-full bg-[#76d69f] px-2 py-1 font-['Manrope:Regular',sans-serif] text-[10px] text-[#005c38]">
                  Laki-laki
                </span>
              </div>
              <p className="mt-1 text-sm text-[#536478]">
                Usia:{" "}
                <strong className="font-['Manrope:SemiBold',sans-serif] text-[#191c1d]">
                  14 Bulan
                </strong>
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#becabf]/30 pt-3 text-sm">
            <div>
              <p className="text-[#536478]">RT/RW</p>
              <p className="mt-1 font-['Manrope:SemiBold',sans-serif]">
                01 / 03
              </p>
            </div>
            <div>
              <p className="text-[#536478]">Alamat</p>
              <p className="mt-1 font-['Manrope:SemiBold',sans-serif]">
                Jl. Manggis No. 12
              </p>
            </div>
          </div>
        </section>
        <section className="mt-6">
          <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
            Hasil Pengukuran
          </h2>
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            {control(
              "Berat Badan (kg)",

              weight,

              setWeight,

              "11.2 kg",

              "weight",
            )}{" "}
            {control(
              "Panjang/Tinggi Badan (cm)",

              height,

              setHeight,

              "84.5 cm",

              "height",

              "border-l-[#cfe1f8]",
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
            <article className="rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <p className="font-['Manrope:Regular',sans-serif] text-xs text-[#536478]">
                Lingkar Kepala (cm)
              </p>
              {numberInput(headCircumference, setHeadCircumference, "head")}
            </article>
            <article className="rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <p className="font-['Manrope:Regular',sans-serif] text-xs text-[#536478]">
                Lingkar Lengan (cm)
              </p>
              {numberInput(armCircumference, setArmCircumference, "arm")}
            </article>
          </div>
        </section>
        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-2xl bg-[#f3f4f5] p-4">
            <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#191c1d]">
              Posisi Pengukuran Tinggi
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPosition("Berdiri")}
                className={`min-h-10 rounded-lg font-['Manrope:SemiBold',sans-serif] text-xs font-semibold ${
                  position === "Berdiri"
                    ? "bg-[#76d69f] text-[#005c38]"
                    : "bg-white text-[#536478]"
                }`}
              >
                Berdiri
              </button>
              <button
                type="button"
                onClick={() => setPosition("Terlentang")}
                className={`min-h-10 rounded-lg font-['Manrope:SemiBold',sans-serif] text-xs font-semibold ${
                  position === "Terlentang"
                    ? "bg-[#76d69f] text-[#005c38]"
                    : "bg-white text-[#536478]"
                }`}
              >
                Terlentang
              </button>
            </div>
          </section>
          <label className="block rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <span className="sr-only">Catatan khusus</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Tambahkan catatan khusus... (opsional)"
              className="min-h-[74px] w-full resize-none border-0 bg-transparent text-sm leading-5 text-[#3e4941] outline-none placeholder:text-[#becabf]"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={onSaved}
          disabled={!isComplete}
          className="mt-8 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#007c4a] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold text-white shadow-[0_6px_16px_rgba(0,109,66,0.2)] disabled:cursor-not-allowed disabled:bg-[#becabf] disabled:shadow-none"
        >
          <SvgIcon
            path={inputMeasurementPaths.p3e09ad60}
            viewBox="0 0 18 18"
            className="size-5"
          />
          Simpan Data
        </button>
      </div>
    </main>
  )
}
