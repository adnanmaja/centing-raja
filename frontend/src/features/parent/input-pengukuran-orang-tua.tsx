import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"
import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { SvgIcon } from "../../components/ui/svg-icon"
import {
  createMeasurement,
  formatAge,
  getParentChildren,
  type Child,
  type Measurement,
} from "../../lib/api"

import parentMeasurementCardPaths from "../../assets/icon-measurement-card"
import parentHeightIconPaths from "../../assets/icon-height"
import parentLilaIconPaths from "../../assets/icon-lila"

const measurementInputLogoParent = "/logo/logo-centing-raja.png"
const parentMeasurementCardAvatar = "/images/avatar-andika.png"

export function InputPengukuranOrangTua({
  onBack,
  onSaved,
  onHome,
  onMaterial,
  onInput,
}: {
  onBack: () => void
  onSaved?: (measurement?: Measurement, child?: Child) => void
  onHome: () => void
  onMaterial: () => void
  onInput: () => void
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state ?? {}) as { child?: Child }

  const [children, setChildren] = useState<Child[]>([])
  const [selectedChild, setSelectedChild] = useState<Child | null>(state.child ?? null)
  const [isLoadingChildren, setIsLoadingChildren] = useState(!state.child)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [head, setHead] = useState("")
  const [lila, setLila] = useState("")
  const [position, setPosition] = useState("Berdiri")

  useEffect(() => {
    let active = true
    if (!state.child) {
      getParentChildren()
        .then((data) => {
          if (active && Array.isArray(data)) {
            setChildren(data)
            if (data.length > 0 && !selectedChild) {
              setSelectedChild(data[0])
            }
          }
        })
        .catch((err) => {
          console.warn("[Centing] Failed to fetch parent children:", err)
        })
        .finally(() => {
          if (active) setIsLoadingChildren(false)
        })
    } else {
      setIsLoadingChildren(false)
    }
    return () => {
      active = false
    }
  }, [state.child])
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

  const weightNum = parseFloat(weight)
  const heightNum = parseFloat(height)
  const complete = !isNaN(weightNum) && weightNum > 0 && !isNaN(heightNum) && heightNum > 0 && !!selectedChild

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!complete || !selectedChild || isSubmitting) return

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const headNum = head ? parseFloat(head) : undefined
      const lilaNum = lila ? parseFloat(lila) : undefined

      const measurement = await createMeasurement({
        children_id: selectedChild.id,
        weight: weightNum,
        height: heightNum,
        head_circumference: headNum && !isNaN(headNum) ? headNum : undefined,
        upper_arm_circumference: lilaNum && !isNaN(lilaNum) ? lilaNum : undefined,
      })

      if (onSaved) {
        onSaved(measurement, selectedChild)
      }
      navigate("/orang-tua/input-pengukuran/berhasil", {
        state: {
          child: selectedChild,
          measurement,
        },
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan data pengukuran"
      setErrorMessage(msg)
    } finally {
      setIsSubmitting(false)
    }
  }
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
        {isLoadingChildren ? (
          <div className="mt-5 rounded-xl bg-[#edeeef] p-4 text-center text-xs text-[#536478]">
            Memuat data anak...
          </div>
        ) : selectedChild ? (
          <section className="mt-5 flex items-center gap-3 rounded-xl bg-[#edeeef] p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <img
              src={parentMeasurementCardAvatar}
              alt={selectedChild.full_name}
              className="size-12 rounded-full bg-[#cfe1f8] object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                  {selectedChild.full_name}
                </p>
                {children.length > 1 && (
                  <select
                    value={selectedChild.id}
                    onChange={(e) => {
                      const nextChild = children.find((c) => c.id === e.target.value)
                      if (nextChild) setSelectedChild(nextChild)
                    }}
                    className="rounded-md border border-[#c4d0c7] bg-white px-2 py-0.5 text-xs text-[#3e4941]"
                  >
                    {children.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.full_name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <p className="font-['Manrope:Regular',sans-serif] text-xs text-[#536478]">
                {selectedChild.gender === "P" || selectedChild.gender === "Perempuan" ? "Perempuan" : "Laki-laki"} · {formatAge(selectedChild.birth_date)}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#76d69f]/20 px-3 py-1 font-['Manrope:SemiBold',sans-serif] text-[10px] text-[#007c4a]">
              <SvgIcon
                path={parentMeasurementCardPaths.p3bb7dc80}
                viewBox="0 0 10.5 11.667"
                className="h-3 w-2.5"
              />
              Hari ini
            </span>
          </section>
        ) : (
          <section className="mt-5 rounded-xl border border-dashed border-[#007c4a]/30 bg-[#e9f7ef] p-4 text-center">
            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold text-[#005c38]">
              Belum Ada Data Anak Terdaftar
            </p>
            <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
              Silakan daftarkan data anak terlebih dahulu sebelum mencatat pengukuran pertumbuhan.
            </p>
            <button
              type="button"
              onClick={() => navigate("/orang-tua/input-anak")}
              className="mt-3 rounded-lg bg-[#007c4a] px-4 py-2 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-white"
            >
              + Tambah Data Anak
            </button>
          </section>
        )}

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {errorMessage}
          </div>
        )}
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
            disabled={!complete || isSubmitting}
            onClick={handleSubmit}
            className="min-h-14 w-full rounded-xl bg-[#007c4a] font-['Manrope:SemiBold',sans-serif] text-base text-white shadow-[0_4px_10px_rgba(0,109,66,0.18)] transition-opacity disabled:opacity-45"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan & Lihat Hasil　→"}
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
