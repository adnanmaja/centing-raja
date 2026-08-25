import React, { useEffect, useRef, useState } from "react"

import { ParentBottomNav } from "../../components/parent/ParentBottomNav"

import { ParentGrowthChart } from "../../components/parent/ParentGrowthChart"

import { ParentInputHeader } from "../../components/parent/ParentInputHeader"

import { ParentNotification } from "../../components/parent/ParentNotification"

import { ZScoreCard } from "../../components/parent/ZScoreCard"

import { SvgIcon } from "../../components/ui/SvgIcon"

const parentDashboardLogo =
  "/assets/imports/BerandaBeratBadan/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import parentDashboardPaths from "../../assets/icon-parent-dashboard"

const parentEducationFood =
  "/assets/imports/BerandaBeratBadan/772856280e82d4032786178e8a2c5f692c1f1298.png"

const parentEducationPlay =
  "/assets/imports/BerandaBeratBadan/17522099519bbaf0abc464bed579f6e1b74e99ae.png"

import parentNotificationPaths from "../../assets/icon-parent-notification"

import parentReminderPaths from "../../assets/icon-parent-reminder"

import parentInfoPaths from "../../assets/icon-parent-info"

import parentChildSelectPaths from "../../assets/icon-child-select"

const parentMaterialsLogo =
  "/assets/imports/MateriEdukasi/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import parentMaterialsPaths from "../../assets/icon-materials"

const childInputLogo =
  "/assets/imports/InputDataAnak/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

const childInputIllustration =
  "/assets/imports/InputDataAnak/df5bbaa3a0eb641587cf83ef3aa1aba2f2ff8ce1.png"

import childInputPaths from "../../assets/icon-child-input"

const childSuccessMark =
  "/assets/imports/DataAnakBerhasilDisimpan/0620f96888a3d3a67b32e2c721591f3037fcc80d.png"

const childSuccessLogo =
  "/assets/imports/DataAnakBerhasilDisimpan/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

const measurementInputLogoParent =
  "/assets/imports/InputDataPengukuran-1/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

const measurementSuccessMarkParent =
  "/assets/imports/DataBerhasilDiSimpan/0620f96888a3d3a67b32e2c721591f3037fcc80d.png"

const measurementSuccessLogoParent =
  "/assets/imports/DataBerhasilDiSimpan/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

const parentMeasurementCardAvatar =
  "/assets/imports/BackgroundShadow-3/ad9fb8b53daa8a1a90b67cfff9975e938a55588b.png"

import parentMeasurementCardPaths from "../../assets/icon-measurement-card"

import parentHeightIconPaths from "../../assets/icon-height"

import parentLilaIconPaths from "../../assets/icon-lila"

const growthDetailAvatar =
  "/assets/imports/DetailPertumbuhan/fefd319f86f8085c09bfbbf29379c050da512cd2.png"

import growthDetailPaths from "../../assets/icon-growth-detail"

import growthDetailActionPaths from "../../assets/icon-growth-action"

export function ParentDashboardScreen({
  onMaterial,

  onInput,
}: {
  onMaterial: () => void

  onInput: () => void
}) {
  const [metric, setMetric] = useState<"Tinggi Badan" | "Berat Badan">(
    "Tinggi Badan",
  )

  const [notice, setNotice] = useState(true)

  const [hasUnreadNotice, setHasUnreadNotice] = useState(true)

  const metrics = [
    {
      label: "Tinggi Badan Saat Ini",

      value: "92",

      unit: "cm",

      range: "Normal (75th %ile)",
    },

    {
      label: "Berat Badan Saat Ini",

      value: "14.2",

      unit: "kg",

      range: "Normal (60th %ile)",
    },
  ]

  const articles = [
    {
      type: "Nutrisi",

      title: "Ide MPASI Padat Gizi untuk Kejar Berat Badan",

      copy: "Resep mudah dengan bahan lokal yang terbukti efektif meningkatkan berat badan...",

      image: parentEducationFood,
    },

    {
      type: "Stimulasi",

      title: "Pentingnya Stimulasi untuk Tumbuh Kembang Emas",

      copy: "Tinggi badan dipengaruhi nutrisi serta perkembangan anak sehari-hari...",

      image: parentEducationPlay,
    },
  ]

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]"
      aria-label="Beranda Orang Tua"
    >
      <header className="sticky top-0 z-30 border-b border-black/[0.03] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={parentDashboardLogo}
              alt="Logo Centing Raja"
              className="size-7 object-cover sm:size-8"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#007c4a] sm:text-lg">
              Beranda
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setNotice(true)

                setHasUnreadNotice(false)
              }}
              className="relative grid size-8 place-items-center text-[#3e4941]"
              aria-label="Notifikasi"
            >
              <SvgIcon
                path={parentNotificationPaths.p164b49c0}
                viewBox="0 0 16 20"
                className="size-5"
              />
              {hasUnreadNotice && (
                <span className="absolute right-0 top-0 size-2 rounded-full bg-[#e24c4b]" />
              )}
            </button>
            <span className="grid size-7 place-items-center rounded-full bg-[#007c4a] text-white">
              <SvgIcon
                path={parentDashboardPaths.p3189a600}
                viewBox="0 0 12 12"
                className="size-4"
              />
            </span>
          </div>
        </div>
      </header>
      {notice && (
        <ParentNotification
          onClose={() => {
            setNotice(false)

            setHasUnreadNotice(false)
          }}
        />
      )}
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-8 sm:py-8 xl:px-10">
        <section className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-['Manrope:Regular',sans-serif] text-sm text-[#4e5d55]">
              Selamat pagi,
            </p>
            <h1 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8">
              Ibu Nisa
            </h1>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-[#edeeef] px-3 py-2 font-['Manrope:SemiBold',sans-serif] text-xs text-[#191c1d] shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
          >
            <span className="grid size-6 place-items-center rounded-full bg-[#76d69f] text-[9px] text-[#005c38]">
              LM
            </span>
            Leo M. (2.5 thn)
            <SvgIcon
              path={parentChildSelectPaths.p4ab6c80}
              viewBox="0 0 9 5.55"
              className="h-1.5 w-2.5 text-[#3e4941]"
            />
          </button>
        </section>
        <section className="relative mt-4 overflow-hidden rounded-xl bg-[#76d69f] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-5">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-4 size-24 opacity-10"
            viewBox="0 0 96 96"
          >
            <path d={parentReminderPaths.p33085800} fill="#006d42" />
          </svg>
          <div className="relative flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/55 text-[#005c38]">
                <SvgIcon
                  path={parentReminderPaths.p28cfa800}
                  viewBox="0 0 20 12"
                  className="h-3 w-5"
                />
              </span>
              <div className="min-w-0">
                <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#005c38] sm:text-lg">
                  Waktunya Pengukuran!
                </h2>
                <p className="mt-1 max-w-md font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#286148] sm:text-sm sm:leading-5">
                  Leo belum diukur bulan ini oleh Kader. Yuk, catat
                  perkembangannya secara mandiri.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onInput}
                className="inline-flex min-h-8 items-center gap-1 rounded-full bg-[#007c4a] px-4 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
              >
                <SvgIcon
                  path={parentReminderPaths.p38ac19c0}
                  viewBox="0 0 10.5 10.5"
                  className="size-3"
                />
                Input Data
              </button>
            </div>
          </div>
        </section>
        <section className="mt-5 grid grid-cols-2 gap-3">
          <>
            {metrics.map((item) => (
              <article
                key={item.label}
                className="rounded-xl bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)] sm:p-5"
              >
                <p className="font-['Manrope:Regular',sans-serif] text-[10px] text-[#536478] sm:text-xs">
                  {item.label}
                </p>
                <p className="mt-1 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold text-[#007c4a] sm:text-3xl">
                  {item.value}
                  <span className="ml-1 font-['Manrope:Regular',sans-serif] text-sm font-normal text-[#3e4941]">
                    {item.unit}
                  </span>
                </p>
                <span className="mt-2 inline-flex rounded bg-[#f0f1f1] px-2 py-1 font-['Manrope:Regular',sans-serif] text-[9px] text-[#56645d]">
                  ◎ {item.range}
                </span>
              </article>
            ))}
          </>
        </section>
        <section className="mt-5 rounded-xl bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)] sm:mt-7 sm:p-5 xl:p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold sm:text-xl">
              Grafik Tumbuh Kembang
            </h2>
            <span className="grid size-6 place-items-center rounded-full bg-[#f3f4f5] text-[#3e4941]">
              <SvgIcon
                path={parentInfoPaths.p1c6d5490}
                viewBox="0 0 15 15"
                className="size-[15px]"
              />
            </span>
          </div>
          <div className="mt-3 flex rounded-full bg-[#f7f8f8] p-1 text-xs">
            <button
              type="button"
              onClick={() => setMetric("Tinggi Badan")}
              className={`min-h-7 flex-1 rounded-full px-3 transition ${
                metric === "Tinggi Badan"
                  ? "bg-[#76d69f] font-semibold text-[#005c38]"
                  : "text-[#3e4941]"
              }`}
            >
              Tinggi Badan
            </button>
            <button
              type="button"
              onClick={() => setMetric("Berat Badan")}
              className={`min-h-7 flex-1 rounded-full px-3 transition ${
                metric === "Berat Badan"
                  ? "bg-[#76d69f] font-semibold text-[#005c38]"
                  : "text-[#3e4941]"
              }`}
            >
              Berat Badan
            </button>
          </div>
          <ParentGrowthChart key={metric} metric={metric} />
        </section>
        <section className="mt-5 sm:mt-7">
          <div className="flex items-center justify-between">
            <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold sm:text-xl">
              Pojok Edukasi
            </h2>
            <button
              type="button"
              className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#007c4a]"
            >
              Lihat Semua
            </button>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.title}
                className="min-w-[190px] overflow-hidden rounded-xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] sm:min-w-0"
              >
                <img
                  src={article.image}
                  alt=""
                  className="aspect-[1.65/1] w-full object-cover"
                />
                <div className="p-2.5">
                  <span className="rounded bg-[#eaf3ff] px-2 py-1 font-['Manrope:Regular',sans-serif] text-[9px] text-[#58718e]">
                    {article.type}
                  </span>
                  <h3 className="mt-2 font-['Manrope:SemiBold',sans-serif] text-[11px] leading-4 text-[#191c1d]">
                    {article.title}
                  </h3>
                  <p className="mt-2 font-['Manrope:Regular',sans-serif] text-[10px] leading-4 text-[#65736c]">
                    {article.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <ParentBottomNav
        onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMaterial={onMaterial}
        onInput={onInput}
      />
    </main>
  )
}

export function InputDataAnakScreen({
  onSaved,

  onHome,

  onMaterial,

  onInput,
}: {
  onSaved: () => void

  onHome: () => void

  onMaterial: () => void

  onInput: () => void
}) {
  const [name, setName] = useState("")

  const [age, setAge] = useState("")

  const [gender, setGender] = useState("Laki-laki")

  const [rt, setRt] = useState("")

  const [rw, setRw] = useState("")

  const [address, setAddress] = useState("")

  const complete = name.trim() && age && rt && rw && address.trim()

  const field =
    "mt-1 min-h-11 w-full rounded-xl bg-[#f3f4f5] px-3 font-['Manrope:Regular',sans-serif] text-sm text-[#191c1d] outline-none placeholder:text-[#b3bdb7] focus:ring-2 focus:ring-[#006d42]/30"

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]"
      aria-label="Input Data Anak"
    >
      <ParentInputHeader logo={childInputLogo} title="Input" />
      <div className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-8">
        <section className="-mx-4 h-44 overflow-hidden rounded-b-3xl bg-[#e7e8e9] sm:mx-0 sm:mt-5 sm:rounded-3xl">
          <img
            src={childInputIllustration}
            alt="Ibu dan anak"
            className="size-full object-cover object-center opacity-80"
          />
        </section>
        <section className="relative -mt-4 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:mx-auto sm:mt-5 sm:max-w-3xl">
          <h1 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold text-[#006d42]">
            Input Data Anak
          </h1>
          <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Langkah pertama untuk memantau tumbuh kembang si kecil dengan penuh
            kasih sayang.
          </p>
        </section>
        <div className="mx-auto mt-5 grid max-w-3xl gap-5 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
            <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#006d42]">
              <SvgIcon
                path={childInputPaths.p2558b1c0}
                viewBox="0 0 15 15"
                className="size-4"
              />
              Identitas Anak
            </h2>
            <label className="mt-4 block font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
              Nama Lengkap
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className={field}
              />
            </label>
            <label className="mt-4 block font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
              Usia (Bulan)
              <div className="relative">
                <input
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value.replace(/\D/g, "").slice(0, 2))
                  }
                  inputMode="numeric"
                  placeholder="0"
                  className={field}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-['Manrope:Regular',sans-serif] text-xs text-[#536478]">
                  Bulan
                </span>
              </div>
            </label>
            <p className="mt-4 font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
              Jenis Kelamin
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {["Laki-laki", "Perempuan"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGender(item)}
                  className={`min-h-9 rounded-xl font-['Manrope:SemiBold',sans-serif] text-xs transition ${
                    gender === item
                      ? "bg-[#e9f7ef] text-[#006d42] ring-1 ring-[#76d69f]"
                      : "bg-[#f3f4f5] text-[#191c1d]"
                  }`}
                >
                  {item === "Laki-laki" ? "♟" : "♟"} {item}
                </button>
              ))}
            </div>
          </section>
          <section className="rounded-2xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
            <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#536478]">
              <span>♧</span>Tempat Tinggal
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
                RT
                <input
                  value={rt}
                  onChange={(e) =>
                    setRt(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                  placeholder="001"
                  className={field}
                />
              </label>
              <label className="font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
                RW
                <input
                  value={rw}
                  onChange={(e) =>
                    setRw(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                  placeholder="002"
                  className={field}
                />
              </label>
            </div>
            <label className="mt-4 block font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
              Alamat Lengkap
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nama jalan, nomor rumah, kelurahan..."
                className={`${field} min-h-20 py-3`}
              />
            </label>
          </section>
        </div>
        <div className="mx-auto mt-7 max-w-3xl">
          <button
            type="button"
            disabled={!complete}
            onClick={onSaved}
            className="min-h-12 w-full rounded-full bg-[#007c4a] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_4px_8px_rgba(0,109,66,0.18)] disabled:opacity-45"
          >
            ▣ Simpan Data
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

export function ParentSuccessScreen({
  child,

  onContinue,

  onHome,

  onMaterial,

  onInput,
}: {
  child?: boolean

  onContinue: () => void

  onHome: () => void

  onMaterial: () => void

  onInput: () => void
}) {
  const title = child
    ? "Pendaftaran Data Anak Berhasil!"
    : "Data Berhasil Disimpan!"

  const description = child
    ? "Data si kecil telah aman tersimpan. Sekarang Anda dapat mulai memantau tumbuh kembangnya secara rutin."
    : "Terima kasih telah melakukan pengukuran. Data ini sangat berharga untuk memantau status tumbuh kembang si kecil."

  const logo = child ? childSuccessLogo : measurementSuccessLogoParent

  const mark = child ? childSuccessMark : measurementSuccessMarkParent

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]"
      aria-label={title}
    >
      <ParentInputHeader logo={logo} title={child ? "Input" : "Beranda"} />
      <section className="mx-auto flex w-full max-w-xl flex-col items-center px-5 py-10 text-center sm:py-14">
        <img
          src={mark}
          alt="Berhasil"
          className="size-32 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.10)]"
        />
        <h1 className="mt-8 max-w-md font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold leading-8 text-[#007c4a] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 max-w-md font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
          {description}
        </p>
        <section className="mt-8 w-full rounded-xl border-l-4 border-[#007c4a] bg-white p-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <p className="font-['Manrope:SemiBold',sans-serif] text-xs uppercase text-[#3e4941]">
            Ringkasan Data
          </p>
          <div className="mt-3 grid grid-cols-2 gap-y-4 border-t border-[#e7e8e9] pt-4 font-['Manrope:Regular',sans-serif] text-xs text-[#536478]">
            {child ? (
              <>
                <div>
                  Nama Anak
                  <strong className="mt-1 block text-sm text-[#191c1d]">
                    Leo M.
                  </strong>
                </div>
                <div>
                  Tanggal Lahir
                  <strong className="mt-1 block text-sm text-[#191c1d]">
                    15 Okt 2022
                  </strong>
                </div>
                <div>
                  Jenis Kelamin
                  <strong className="mt-1 block text-sm text-[#191c1d]">
                    Laki-laki
                  </strong>
                </div>
                <div>
                  Usia Saat Ini
                  <strong className="mt-1 block text-sm text-[#191c1d]">
                    12 Bulan
                  </strong>
                </div>
              </>
            ) : (
              <>
                <div className="col-span-2 flex items-center justify-between">
                  Berat Badan
                  <strong className="text-xl text-[#191c1d]">
                    12.5 <span className="text-sm font-normal">kg</span>
                  </strong>
                </div>
                <div className="col-span-2 flex items-center justify-between border-t border-[#e7e8e9] pt-3">
                  Tinggi Badan
                  <strong className="text-xl text-[#191c1d]">
                    82 <span className="text-sm font-normal">cm</span>
                  </strong>
                </div>
                <div className="col-span-2 flex items-center justify-between border-t border-[#e7e8e9] pt-3">
                  Status
                  <span className="rounded-full bg-[#76d69f] px-3 py-1 font-semibold text-[#005c38]">
                    ◎ Gizi Baik
                  </span>
                </div>
              </>
            )}
          </div>
        </section>
        <button
          type="button"
          onClick={onContinue}
          className="mt-8 min-h-12 w-full rounded-xl bg-[#007c4a] px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_4px_8px_rgba(0,109,66,0.18)]"
        >
          {child
            ? "▰ Lakukan Pengukuran Pertama"
            : "Lihat Detail Pertumbuhan →"}
        </button>
        <button
          type="button"
          onClick={onHome}
          className="mt-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#007c4a]"
        >
          Kembali ke Beranda
        </button>
      </section>
      <ParentBottomNav
        onHome={onHome}
        onMaterial={onMaterial}
        onInput={onInput}
        active="Input"
      />
    </main>
  )
}

export function ParentMeasurementInputScreen({
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
      <div className="mx-auto w-full max-w-3xl px-5 py-5 sm:px-8 sm:py-9">
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
        <div className="mx-auto max-w-3xl">
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

export function ParentGrowthDetailScreen({
  onBack,

  onViewChart,
}: {
  onBack: () => void

  onViewChart: () => void
}) {
  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] text-[#191c1d]"
      aria-label="Detail Pertumbuhan Leo"
    >
      <header className="sticky top-0 z-30 border-b border-black/[0.03] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-12 w-full max-w-3xl items-center gap-4 px-5">
          <button
            type="button"
            onClick={onBack}
            className="text-xl leading-none"
            aria-label="Kembali"
          >
            ‹
          </button>
          <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Detail Pertumbuhan
          </h1>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-4 sm:px-8 sm:pt-8">
        <section className="flex flex-col items-center text-center">
          <div className="grid size-[76px] place-items-center overflow-hidden rounded-full bg-[#cfe1f8] ring-2 ring-[#76d69f]/60 ring-offset-4 ring-offset-[#f8f9fa]">
            <img
              src={growthDetailAvatar}
              alt="Leo M."
              className="size-full object-cover"
            />
          </div>
          <h2 className="mt-4 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold">
            Leo M.
          </h2>
          <div className="mt-2 flex items-center gap-2 font-['Manrope:Regular',sans-serif] text-xs text-[#4f6073]">
            <SvgIcon
              path={growthDetailPaths.p3b95cda0}
              viewBox="0 0 13.5 15"
              className="h-3 w-3"
            />
            12 Bulan<span>•</span>
            <SvgIcon
              path={growthDetailPaths.p3cc2a800}
              viewBox="0 0 4.5 12"
              className="h-3 w-1.5"
            />
            Laki-laki
          </div>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#76d69f]/20 px-3 py-2 font-['Manrope:SemiBold',sans-serif] text-[10px] font-semibold tracking-[0.04em] text-[#005c38]">
            <SvgIcon
              path={growthDetailPaths.p7b061c0}
              viewBox="0 0 20 20"
              className="size-4"
            />
            TUMBUH KEMBANG SEHAT
          </span>
        </section>
        <section className="mt-7">
          <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Indikator Pertumbuhan (Z-Score)
          </h2>
          <p className="mt-4 font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#5f7184]">
            Z-Score menunjukkan seberapa jauh pertumbuhan anak dari standar
            rata-rata WHO sesuai Standar Antropometri Anak Kemenkes RI (PMK No.
            2 Tahun 2020). Nilai di antara -2 dan +3 SD untuk tinggi badan
            dianggap normal.
          </p>
          <div className="mt-5 space-y-3">
            <ZScoreCard
              title="BERAT BADAN MENURUT UMUR (BB/U)"
              value="12.5"
              unit="kg"
              score="+0.5 SD"
              status="Normal"
            />
            <ZScoreCard
              title="TINGGI BADAN MENURUT UMUR (TB/U)"
              value="82"
              unit="cm"
              score="-1.8 SD"
              status="Normal"
              warning
            >
              <div className="mt-3 rounded-lg bg-[#fff4da] p-3 font-['Manrope:Regular',sans-serif] text-[10px] leading-4 text-[#775600]">
                💡 Tinggi badan berada di ambang batas normal (-1.8 SD). Pantau
                asupan protein hewani dan stimulasi psikososial sesuai standar
                PMK No. 2/2020.
              </div>
            </ZScoreCard>
            <ZScoreCard
              title="BERAT BADAN MENURUT TINGGI (BB/TB)"
              value="Proporsional"
              unit=""
              score="+1.2 SD"
              status="Normal"
            />
          </div>
        </section>
        <section className="mt-8 space-y-3">
          <button
            type="button"
            onClick={onViewChart}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#006d42] px-5 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_2px_5px_rgba(0,109,66,0.18)]"
          >
            <SvgIcon
              path={growthDetailActionPaths.p2f1f99d8}
              viewBox="0 0 18 18"
              className="size-4"
            />
            Lihat Grafik Pertumbuhan
          </button>
          <button
            type="button"
            onClick={onBack}
            className="min-h-10 w-full font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-[#4f6073]"
          >
            Tutup
          </button>
        </section>
      </div>
    </main>
  )
}

export const parentMaterialItems = [
  {
    id: "hpk",

    category: "Gizi & MPASI",

    title: "Pentingnya 1000 Hari Pertama Kehidupan (HPK)",

    description:
      "Memahami mengapa masa kehamilan hingga anak berusia 2 tahun adalah periode emas yang menentukan.",

    icon: parentMaterialsPaths.p31e6b500,

    iconBox: "bg-[#f8df8d] text-[#765b06]",

    link: "https://ayosehat.kemkes.go.id/1000-hari-pertama-kehidupan",
  },

  {
    id: "mpasi",

    category: "Gizi & MPASI",

    title: "Resep MPASI Kaya Protein Hewani",

    description:
      "Kumpulan resep mudah dan murah menggunakan telur dan ikan lokal untuk mendukung tumbuh kembang.",

    icon: parentMaterialsPaths.p304eaa0,

    iconBox: "bg-[#76d69f] text-[#005c38]",

    link: "https://ayosehat.kemkes.go.id/topik-pilihan/1000-hari-pertama-kehidupan/mpasi",
  },

  {
    id: "kms",

    category: "Pola Asuh",

    title: "Cara Tepat Membaca Kurva KMS",

    description:
      "Video panduan 3 menit agar ibu bisa memantau tren pertumbuhan berat dan tinggi anak.",

    icon: parentMaterialsPaths.pb01c000,

    iconBox: "bg-[#ffd9d5] text-[#b5302c]",

    link: "https://kemkes.go.id",
  },

  {
    id: "imunisasi",

    category: "Sanitasi",

    title: "Jadwal Imunisasi Dasar Lengkap",

    description:
      "Daftar pemeriksaan imunisasi wajib dari IDAI untuk melindungi anak dari penyakit.",

    icon: parentMaterialsPaths.p23cfd7c0,

    iconBox: "bg-[#e0edff] text-[#536478]",

    link: "https://www.idai.or.id/artikel/klinik/imunisasi/jadwal-imunisasi-anak",
  },
]

export type ParentMaterial = typeof parentMaterialItems[number]

export function ParentMaterialDetailScreen({
  material,

  onBack,

  onHome,
}: {
  material: typeof parentMaterialItems[number]

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
          className={`grid size-14 place-items-center rounded-2xl ${material.iconBox}`}
        >
          <SvgIcon
            path={material.icon}
            viewBox="0 0 21 25.083"
            className="size-7"
          />
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
          <a
            href={material.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#006d42] px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white transition hover:bg-[#005c38]"
          >
            Buka Link Materi <span aria-hidden="true">↗</span>
          </a>
        </section>
      </article>
      <ParentBottomNav onHome={onHome} onMaterial={onBack} active="Materi" />
    </main>
  )
}

export function ParentMaterialsScreen({
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
