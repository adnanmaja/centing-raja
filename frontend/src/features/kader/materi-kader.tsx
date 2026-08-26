import React, { useEffect, useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"

import materiPaths from "../../assets/icon-materi"

import materiTrophyPaths from "../../assets/icon-materi-trophy"

import materiQuizPaths from "../../assets/icon-materi-quiz"

import bottomProfilePaths from "../../assets/icon-bottom-profile"

const materiLogo =
  "/logo/logo-centing-raja.png"

export function MateriKader({
  onHome,

  onTasks,

  onProfile,

  onStartQuiz,
}: {
  onHome: () => void

  onTasks: () => void

  onProfile: () => void

  onStartQuiz: () => void
}) {
  const [showQuizConfirm, setShowQuizConfirm] = useState(false)

  const [filter, setFilter] = useState("Semua")

  const modules = [
    {
      module: "MODUL 1 • DASAR",

      title: "Mengenal Apa Itu Stunting",

      description:
        "Definisi, penyebab utama, dan dampak jangka panjang stunting pada anak.",

      duration: "10 mnt",

      status: "Selesai",

      category: "Dasar",

      tone: "bg-[#e9f7ef] text-[#006d42]",

      action: "Lihat Ulang",

      icon: materiPaths.p3cf2be00,

      viewBox: "0 0 11.6667 11.6667",
    },

    {
      module: "MODUL 2 • GIZI",

      title: "Pentingnya 1000 Hari Pertama",

      description:
        "Panduan nutrisi ibu hamil dan menyusui untuk mencegah stunting sejak dini.",

      duration: "15 mnt",

      status: "Sedang Berjalan",

      category: "Gizi",

      tone: "bg-[#fbefc8] text-[#765b06]",

      action: "Lanjutkan",

      icon: materiPaths.p3808c500,

      viewBox: "0 0 18 18",
    },

    {
      module: "MODUL 3 • PENGUKURAN",

      title: "Cara Mengukur dengan Benar",

      description:
        "Teknik pengukuran panjang badan dan berat badan balita yang akurat di Posyandu.",

      duration: "12 mnt",

      status: "Belum Mulai",

      category: "Dasar",

      tone: "bg-[#edf0f2] text-[#536478]",

      action: "Mulai Belajar",

      icon: materiPaths.p23220f80,

      viewBox: "0 0 18 18",
    },
  ]

  const filters = ["Semua", "Dasar", "Gizi", "Pola Asuh"]

  const visibleModules =
    filter === "Semua"
      ? modules
      : modules.filter((item) => item.category === filter)

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={materiLogo}
              alt="Centing Raja"
              className="size-8 rounded-full object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#006d42]">
              Materi
            </span>
          </div>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full bg-[#006d42] text-white"
            aria-label="Profil"
          >
            <SvgIcon
              path={materiPaths.p3189a600}
              viewBox="0 0 12 12"
              className="size-3"
            />
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-5 py-7 sm:px-8 xl:px-10 xl:py-10">
        <header>
          <h1 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold leading-8 xl:text-3xl">
            Materi Edukasi
          </h1>
          <p className="mt-2 max-w-xl font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Tingkatkan pemahaman Anda tentang stunting untuk mendampingi
            keluarga dengan lebih baik.
          </p>
        </header>
        <section className="relative mt-6 overflow-hidden rounded-2xl bg-[#e9f7ef] p-5 pr-20 shadow-[0_4px_14px_rgba(0,109,66,0.06)] xl:flex xl:items-center xl:justify-between xl:p-7 xl:pr-24">
          <div>
            <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold tracking-[0.08em] text-[#006d42]">
              PROGRES BELAJAR
            </p>
            <div className="mt-2 flex items-center gap-2">
              <strong className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-3xl font-bold text-[#006d42]">
                3/5
              </strong>
              <span className="text-sm text-[#3e4941]">Materi Selesai</span>
            </div>
          </div>
          <span
            className="absolute right-5 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#006d42] shadow-[0_1px_2px_rgba(0,0,0,0.05)] xl:right-7"
            aria-label="Lencana materi selesai"
          >
            <SvgIcon
              path={materiTrophyPaths.p3a3ede80}
              viewBox="0 0 24 24"
              className="size-6"
            />
          </span>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/70 xl:mt-0 xl:w-[52%]">
            <div className="h-full w-3/5 rounded-full bg-[#006d42]" />
          </div>
        </section>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 xl:gap-3">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-full px-4 py-2 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold transition ${
                filter === item
                  ? "bg-[#006d42] text-white"
                  : "bg-white text-[#3e4941] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <section className="mt-6 grid gap-4 xl:grid-cols-3 xl:gap-6">
          {visibleModules.map((item) => (
            <article
              key={item.title}
              className="flex min-w-0 flex-col rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold tracking-[0.06em] text-[#63747a]">
                  {item.module}
                </span>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full ${item.tone}`}
                >
                  <SvgIcon
                    path={item.icon}
                    viewBox={item.viewBox}
                    className="size-4"
                  />
                </span>
              </div>
              <h2 className="mt-4 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold leading-7">
                {item.title}
              </h2>
              <p className="mt-2 flex-1 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
                {item.description}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-[#536478]">
                  <SvgIcon
                    path={materiPaths.p8e10ae0}
                    viewBox="0 0 13.3333 13.3333"
                    className="size-3.5"
                  />
                  {item.duration}
                </span>
                <span
                  className={`rounded-full px-2 py-1 font-['Manrope:SemiBold',sans-serif] text-[10px] ${item.tone}`}
                >
                  {item.status}
                </span>
              </div>
              <button
                type="button"
                className="mt-5 min-h-11 rounded-full bg-[#006d42] px-4 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white transition hover:bg-[#005c38]"
              >
                {item.action}
              </button>
            </article>
          ))}
        </section>
        <section className="relative mt-6 flex flex-col items-center overflow-hidden rounded-2xl bg-[#cfe1f8] p-6 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] xl:p-8">
          <span
            aria-hidden="true"
            className="absolute -bottom-6 -left-6 size-24 rounded-full bg-[#006d42]/5 blur-lg"
          />
          <span
            aria-hidden="true"
            className="absolute -right-4 -top-4 size-16 rounded-full bg-white/20"
          />
          <span className="grid size-12 place-items-center rounded-full bg-white text-[#536478] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <SvgIcon
              path={materiQuizPaths.p242e3280}
              viewBox="0 0 20 20"
              className="size-6"
            />
          </span>
          <h2 className="relative mt-3 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
            Sudah siap menguji pengetahuan?
          </h2>
          <p className="relative mt-2 max-w-md text-sm leading-5 text-[#3e4941]">
            Kerjakan kuis singkat untuk memantapkan pemahaman Anda dan dapatkan
            lencana kader tanggap stunting.
          </p>
          <button
            type="button"
            onClick={() => setShowQuizConfirm(true)}
            className="relative mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#006d42] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
          >
            Ayo Latihan{" "}
            <SvgIcon
              path={materiQuizPaths.p304eaa0}
              viewBox="0 0 12 12"
              className="size-3"
            />
          </button>
        </section>
        {showQuizConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-confirm-title"
            className="fixed inset-0 z-50 grid place-items-center bg-[#002111]/35 p-5 backdrop-blur-sm"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-[0_24px_56px_rgba(0,0,0,0.20)]">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e9f7ef] text-[#006d42]">
                <SvgIcon
                  path={materiQuizPaths.p242e3280}
                  viewBox="0 0 20 20"
                  className="size-6"
                />
              </span>
              <h2
                id="quiz-confirm-title"
                className="mt-4 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold"
              >
                Siap mengerjakan kuis?
              </h2>
              <p className="mt-2 text-sm leading-5 text-[#3e4941]">
                Kuis terdiri dari 5 pertanyaan. Pastikan Anda sudah siap sebelum
                memulai.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowQuizConfirm(false)}
                  className="min-h-11 rounded-full bg-[#f3f4f5] font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941]"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={onStartQuiz}
                  className="min-h-11 rounded-full bg-[#006d42] font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white"
                >
                  Iya, Mulai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-[#f8f9fa]/90 shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-4 px-2 sm:max-w-md xl:max-w-3xl xl:px-8">
          <button
            type="button"
            onClick={onHome}
            className="flex min-w-0 flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={materiPaths.p12a32500}
              viewBox="0 0 16 18"
              className="h-[18px] w-4"
            />
            <span className="text-[11px] font-semibold">Beranda</span>
          </button>
          <button
            type="button"
            className="flex min-w-0 flex-col items-center justify-center gap-1 text-[#006d42]"
          >
            <SvgIcon
              path={materiPaths.p378800}
              viewBox="0 0 22 16"
              className="h-4 w-[22px]"
            />
            <span className="text-[11px] font-semibold">Materi</span>
          </button>
          <button
            type="button"
            onClick={onTasks}
            className="flex min-w-0 flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={materiPaths.p1de35f80}
              viewBox="0 0 18 20"
              className="h-5 w-[18px]"
            />
            <span className="text-[11px] font-semibold">Tugas</span>
          </button>
          <button
            type="button"
            onClick={onProfile}
            className="flex min-w-0 flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={bottomProfilePaths.p3de21300}
              viewBox="0 0 20 20"
              className="size-5"
            />
            <span className="text-[11px] font-semibold">Profil</span>
          </button>
        </div>
      </nav>
    </main>
  )
}
