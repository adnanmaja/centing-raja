import React, { useEffect, useRef, useState } from "react"

import { ProfileBottomNav } from "../../components/kader/ProfileBottomNav"

import { ProfileHeader } from "../../components/kader/ProfileHeader"

import { SvgIcon } from "../../components/ui/SvgIcon"

const kaderLogo =
  "/assets/imports/BerandaKader/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

const kaderEducationImage =
  "/assets/imports/BerandaKader/9866410edd1287b38f68bf2a41e7bfdecc61f496.png"

const kaderNewsImage =
  "/assets/imports/BerandaKader/beef7bc8f9254a9ef0938c497c7514fb2dca9d20.png"

import kaderNavPaths from "../../assets/icon-kader-nav"

import kaderActionPaths from "../../assets/icon-kader-action"

import kaderReminderPaths from "../../assets/icon-kader-reminder"

import kaderProfilePaths from "../../assets/icon-kader-profile"

const editProfileLogo =
  "/assets/imports/EditProfile/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

const editProfilePhoto =
  "/assets/imports/EditProfile/b36d08ef1929f51b4b587549714bc45e8a51e641.png"

import editProfilePaths from "../../assets/icon-edit-profile"

import logoutPaths from "../../assets/icon-logout"

import lockedPosyanduPaths from "../../assets/icon-posyandu-locked"

import phoneFieldPaths from "../../assets/icon-phone-field"

const changePasswordLogo =
  "/assets/imports/UbahKataSandi/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import changePasswordPaths from "../../assets/icon-change-password"

import kaderTaskPaths from "../../assets/icon-kader-task"

const materiLogo =
  "/assets/imports/MateriKader/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import materiPaths from "../../assets/icon-materi"

import materiTrophyPaths from "../../assets/icon-materi-trophy"

import materiQuizPaths from "../../assets/icon-materi-quiz"

const quizLogo =
  "/assets/imports/KuisKader/7aea73f8459bccf9208903ee653d8f177774bf50.png"

import quizPaths from "../../assets/icon-quiz"

const resultMascot =
  "/assets/imports/ResultKader/293f6f317864702e3f4231c0e89993e6a5a91924.png"

const resultLogo =
  "/assets/imports/ResultKader/7aea73f8459bccf9208903ee653d8f177774bf50.png"

import resultPaths from "../../assets/icon-result"

const tasksLogo =
  "/assets/imports/TugasBulanIni/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import tasksPaths from "../../assets/icon-tasks"

import taskProfilePaths from "../../assets/icon-profile-badge"

import taskMeasurementPaths from "../../assets/icon-measurement"

import measurementDataPaths from "../../assets/icon-measurement-data"

import viewDataPaths from "../../assets/icon-view-data"

import bottomProfilePaths from "../../assets/icon-bottom-profile"

import bottomMaterialPaths from "../../assets/icon-bottom-material"

const inputMeasurementLogo =
  "/assets/imports/InputDataPengukuran/7aea73f8459bccf9208903ee653d8f177774bf50.png"

import inputMeasurementPaths from "../../assets/icon-input-measurement"

const measurementSuccessIndicator =
  "/assets/imports/DataBerhasilDisimpan/6faf1ce95c7dfdb18980ef5a4a7e49bbd8094314.png"

const measurementSuccessLogo =
  "/assets/imports/DataBerhasilDisimpan/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import measurementSuccessPaths from "../../assets/icon-measurement-success"

const kaderProfileLogo =
  "/assets/imports/ProfileKader/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

const kaderProfilePhoto =
  "/assets/imports/ProfileKader/cc59a217e18ceda2ec23c317966ab8e6dad3ace4.png"

import profilePagePaths from "../../assets/icon-profile-page"

const helpCenterLogo =
  "/assets/imports/PusatBantuan/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import helpCenterPaths from "../../assets/icon-help-center"

const privacyLogo =
  "/assets/imports/KebijakanPrivasi/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import privacyPaths from "../../assets/icon-privacy"

export function KaderDashboard({
  onMaterial,

  onTasks,

  onProfile,
}: {
  onMaterial: () => void

  onTasks: () => void

  onProfile: () => void
}) {
  const news = [
    {
      image: kaderEducationImage,

      category: "Gizi",

      categoryClass: "bg-[#cfe1f8] text-[#536478]",

      title: "Pentingnya Protein Hewani untuk Mencegah Stunting",

      time: "2 jam yang lalu",
    },

    {
      image: kaderNewsImage,

      category: "Kegiatan",

      categoryClass: "bg-[#e9f7ef] text-[#006d42]",

      title: "Jadwal Kelas Ibu Balita Desa Suka Maju Bulan November",

      time: "1 hari yang lalu",
    },

    {
      image:
        "https://images.unsplash.com/photo-1681378128359-a5c2492a3535?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",

      category: "Resep",

      categoryClass: "bg-[#fbefc8] text-[#765b06]",

      title: "Menu Seimbang untuk Mendukung Tumbuh Kembang Anak",

      time: "2 hari yang lalu",
    },

    {
      image:
        "https://images.unsplash.com/photo-1655740005902-2436216b82b8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",

      category: "Edukasi",

      categoryClass: "bg-[#e9f7ef] text-[#006d42]",

      title: "Ide Bekal Bergizi yang Disukai Anak",

      time: "3 hari yang lalu",
    },
  ]

  return (
    <main
      data-reveal-page
      className="min-h-svh overflow-x-hidden bg-[#f8f9fa] pb-28 text-[#191c1d]"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={kaderLogo}
              alt="Centing Raja"
              className="size-8 rounded-full object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#006d42]">
              Beranda
            </span>
          </div>
          <button
            type="button"
            onClick={onProfile}
            aria-label="Profil Kader"
            className="grid size-8 place-items-center rounded-full bg-[#006d42] text-white shadow-[0_2px_5px_rgba(0,109,66,0.24)]"
          >
            <SvgIcon
              path={kaderProfilePaths.p3189a600}
              viewBox="0 0 12 12"
              className="size-3"
            />
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-[88px] sm:px-8 xl:px-10 xl:pt-24">
        <section className="kader-hero rounded-2xl bg-[#e9f7ef] p-5 shadow-[0_8px_26px_rgba(0,109,66,0.06)] xl:flex xl:items-center xl:justify-between xl:gap-10 xl:p-8">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold leading-7 xl:text-2xl">
              Halo, Kader Nur!
            </h1>
            <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Senin, 24 Oktober 2023
            </p>
          </div>
          <div className="mt-5 rounded-xl bg-white/70 p-3 xl:mt-0 xl:w-3/5 xl:p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941]">
                Tugas Hari Ini
              </p>
              <span className="rounded-full bg-[#ba1a1a]/10 px-2 py-1 font-['Manrope:Regular',sans-serif] text-[10px] text-[#ba1a1a]">
                3 Belum Selesai
              </span>
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#cfe1f8] text-[#536478]">
                <SvgIcon
                  path={kaderTaskPaths.p411f900}
                  viewBox="0 0 8 20"
                  className="h-5 w-2"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                  Kunjungan Ibu Hamil (Bumil)
                </p>
                <p className="mt-1 text-xs text-[#3e4941]">Posyandu Melati 1</p>
              </div>
              <button
                type="button"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-[#006d42] text-white"
                aria-label="Buka tugas"
              >
                <SvgIcon
                  path={kaderTaskPaths.p4874b00}
                  viewBox="0 0 5.55 9"
                  className="h-2.5 w-1.5"
                />
              </button>
            </div>
          </div>
        </section>
        <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] xl:gap-8">
          <div className="space-y-6 xl:space-y-8">
            <section>
              <div className="flex items-end justify-between">
                <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                  Aksi Cepat
                </h2>
                <span className="text-xs text-[#63747a]">Pilih aktivitas</span>
              </div>
              <div className="mt-3 grid w-full max-w-[350px] grid-cols-2 gap-3 lg:max-w-none">
                <button
                  type="button"
                  className="quick-action group min-w-0 rounded-xl bg-white px-2 py-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-4"
                >
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#76d69f] text-[#005c38] transition-transform group-hover:scale-110">
                    <SvgIcon
                      path={kaderNavPaths.pd44dd40}
                      viewBox="0 0 18 18"
                      className="size-[18px]"
                    />
                  </span>
                  <span className="mt-3 block font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                    Edukasi
                    <br />
                    Kader
                  </span>
                </button>
                <button
                  type="button"
                  className="quick-action group min-w-0 rounded-xl bg-white px-2 py-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-4"
                >
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e3bf66] text-[#654000] transition-transform group-hover:scale-110">
                    <SvgIcon
                      path={kaderActionPaths.p1eac3d80}
                      viewBox="0 0 18 18"
                      className="size-[18px]"
                    />
                  </span>
                  <span className="mt-3 block font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                    Input
                    <br />
                    Pengukuran Balita
                  </span>
                </button>
              </div>
            </section>
            <section className="relative w-full max-w-[350px] overflow-hidden rounded-xl bg-[#f3f4f5] p-4 pl-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] lg:max-w-none">
              <div className="absolute inset-y-0 left-0 w-2 bg-[#ba1a1a]" />
              <div className="flex min-w-0 gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a]">
                  <SvgIcon
                    path={kaderReminderPaths.p3f50100}
                    viewBox="0 0 20 20.05"
                    className="h-5 w-5"
                  />
                </span>
                <div className="min-w-0">
                  <h2 className="font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                    Pengingat Penting
                  </h2>
                  <p className="mt-1 break-words text-sm leading-5 text-[#3e4941]">
                    Ada 5 balita di wilayah Anda yang belum melakukan pengukuran
                    bulan ini.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <section className="min-w-0 max-w-full xl:row-span-2">
            <div className="flex items-end justify-between">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                Berita &amp; Edukasi
              </h2>
              <button
                type="button"
                className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#006d42]"
              >
                Lihat Semua
              </button>
            </div>
            <div className="news-scroll mt-3 flex w-full max-w-full snap-x snap-mandatory gap-3 overflow-x-scroll overscroll-x-contain pb-3 pr-5 touch-pan-x xl:pr-10">
              {news.map((item) => (
                <article
                  key={item.title}
                  className="news-card w-[78vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] xl:w-[360px]"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-36 w-full object-cover"
                  />
                  <div className="p-3">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 font-['Manrope:Regular',sans-serif] text-[10px] ${item.categoryClass}`}
                    >
                      {item.category}
                    </span>
                    <h3 className="mt-2 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold leading-5">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#63747a]">{item.time}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-[#f8f9fa]/90 shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-4 px-2 sm:max-w-md xl:max-w-3xl xl:px-8">
          <button
            type="button"
            className="flex min-w-0 flex-col items-center justify-center gap-1 text-[#006d42]"
          >
            <SvgIcon
              path={kaderNavPaths.p12a32500}
              viewBox="0 0 16 18"
              className="h-[18px] w-4"
            />
            <span className="font-['Manrope:SemiBold',sans-serif] text-[11px] font-semibold">
              Beranda
            </span>
          </button>
          <button
            type="button"
            onClick={onMaterial}
            className="flex min-w-0 flex-col items-center justify-center gap-1 text-[#3e4941] transition hover:text-[#006d42]"
          >
            <SvgIcon
              path={kaderNavPaths.p378800}
              viewBox="0 0 22 16"
              className="h-4 w-[22px]"
            />
            <span className="font-['Manrope:SemiBold',sans-serif] text-[11px] font-semibold">
              Materi
            </span>
          </button>
          <button
            type="button"
            onClick={onTasks}
            className="flex min-w-0 flex-col items-center justify-center gap-1 text-[#3e4941] transition hover:text-[#006d42]"
          >
            <SvgIcon
              path={kaderNavPaths.p1de35f80}
              viewBox="0 0 18 20"
              className="h-5 w-[18px]"
            />
            <span className="font-['Manrope:SemiBold',sans-serif] text-[11px] font-semibold">
              Tugas
            </span>
          </button>
          <button
            type="button"
            onClick={onProfile}
            className="flex min-w-0 flex-col items-center justify-center gap-1 text-[#3e4941] transition hover:text-[#006d42]"
          >
            <SvgIcon
              path={bottomProfilePaths.p3de21300}
              viewBox="0 0 20 20"
              className="size-5"
            />
            <span className="font-['Manrope:SemiBold',sans-serif] text-[11px] font-semibold">
              Profil
            </span>
          </button>
        </div>
      </nav>
    </main>
  )
}

export function DataBerhasilDisimpanScreen({
  onHome,

  onDetails,

  onMaterial,
}: {
  onHome: () => void

  onDetails: () => void

  onMaterial: () => void
}) {
  return (
    <main
      data-reveal-page
      className="flex min-h-svh flex-col bg-[#f8f9fa] pb-20 pt-16 text-[#191c1d]"
      aria-label="Data Berhasil Disimpan"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={measurementSuccessLogo}
              alt="Logo Centing Raja"
              className="size-8 object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
              Beranda
            </span>
          </div>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white"
            aria-label="Profil"
          >
            <SvgIcon
              path={taskProfilePaths.p3189a600}
              viewBox="0 0 12 12"
              className="size-4"
            />
          </button>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-10 sm:px-8 xl:py-14">
        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="relative size-48 sm:size-52">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#76d69f]/20 blur-xl"
            />
            <img
              src={measurementSuccessIndicator}
              alt="Pengukuran berhasil disimpan"
              className="relative size-full object-contain"
            />
          </div>
          <h1 className="mt-8 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8">
            Data Berhasil Disimpan
          </h1>
          <p className="mt-2 max-w-md font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Laporan antropometri balita telah berhasil dikirimkan ke sistem
            Tenaga Kesehatan (Nakes).
          </p>
          <article className="mt-8 flex w-full max-w-lg items-center gap-4 rounded-2xl bg-[#f3f4f5] p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#76d69f] text-[#005c38]">
              <SvgIcon
                path={measurementSuccessPaths.p1eac3d80}
                viewBox="0 0 18 18"
                className="size-[18px]"
              />
            </span>
            <div>
              <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#3e4941]">
                Data Disimpan Untuk
              </p>
              <h2 className="mt-1 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                Ahmad Raihan
              </h2>
            </div>
          </article>
        </section>
        <section className="mt-10 flex w-full max-w-lg flex-col gap-3 self-center">
          <button
            type="button"
            onClick={onHome}
            className="min-h-12 w-full rounded-full bg-[#007c4a] font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_5px_12px_rgba(0,109,66,0.2)] transition hover:bg-[#006d42]"
          >
            Kembali ke Beranda
          </button>
          <button
            type="button"
            onClick={onDetails}
            className="min-h-12 w-full rounded-full border border-[#007c4a] bg-white font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-[#007c4a] transition hover:bg-[#e9f7ef]"
          >
            Lihat Detail Input
          </button>
        </section>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-[#f8f9fa]/90 shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-4 px-2 sm:max-w-md xl:max-w-3xl xl:px-8">
          <button
            type="button"
            onClick={onHome}
            className="flex flex-col items-center justify-center gap-1 text-[#007c4a]"
          >
            <SvgIcon
              path={tasksPaths.p12a32500}
              viewBox="0 0 16 18"
              className="h-[18px] w-4"
            />
            <span className="text-[11px] font-semibold">Beranda</span>
          </button>
          <button
            type="button"
            onClick={onMaterial}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={bottomMaterialPaths.p378800}
              viewBox="0 0 22 16"
              className="h-4 w-[22px]"
            />
            <span className="text-[11px] font-semibold">Materi</span>
          </button>
          <button
            type="button"
            onClick={onDetails}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={tasksPaths.p1de35f80}
              viewBox="0 0 18 20"
              className="h-5 w-[18px]"
            />
            <span className="text-[11px] font-semibold">Kuis</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
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

export function EditProfileScreen({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("Nurhayati Ningsih")

  const [phone, setPhone] = useState("0812-3456-7890")

  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)

    window.setTimeout(onBack, 650)
  }

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 pt-16 text-[#191c1d]"
      aria-label="Edit Profil"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={editProfileLogo}
              alt="Logo Centing Raja"
              className="size-8 object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
              Profile
            </span>
          </div>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white"
            aria-label="Profil"
          >
            <SvgIcon
              path={taskProfilePaths.p3189a600}
              viewBox="0 0 12 12"
              className="size-4"
            />
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 xl:py-12">
        <section className="relative -mx-5 bg-[linear-gradient(180deg,#e8f5ee_0%,#f8f9fa_68%)] px-5 pb-10 pt-8 text-center sm:mx-0 sm:rounded-3xl sm:px-8">
          <div className="relative mx-auto size-[104px]">
            <img
              src={editProfilePhoto}
              alt="Foto Nurhayati Ningsih"
              className="size-full rounded-full object-cover shadow-[0_4px_6px_-1px_rgba(0,109,66,0.1)]"
            />
            <button
              type="button"
              onClick={() => window.alert("Pilih foto dari perangkat Anda.")}
              className="absolute bottom-1 right-1 grid size-9 place-items-center rounded-full bg-[#006d42] text-white shadow-[0_4px_8px_rgba(0,109,66,0.2)]"
              aria-label="Ubah foto"
            >
              <SvgIcon
                path={editProfilePaths.p34a16800}
                viewBox="0 0 15 13.5"
                className="h-3.5 w-4"
              />
            </button>
          </div>
          <button
            type="button"
            onClick={() => window.alert("Pilih foto dari perangkat Anda.")}
            className="mt-3 font-['Manrope:Regular',sans-serif] text-sm tracking-[0.05em] text-[#006d42]"
          >
            UBAH FOTO
          </button>
        </section>
        <section className="mt-3 sm:mt-7">
          <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Data Pribadi
          </h1>
          <p className="mt-2 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Pastikan informasi di bawah ini sesuai dengan identitas resmi Anda.
          </p>
          <div className="mt-8 space-y-6">
            <label className="block font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Nama Lengkap
              <div className="relative mt-2">
                <SvgIcon
                  path={editProfilePaths.p85bff00}
                  viewBox="0 0 16 16"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]"
                />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="min-h-14 w-full rounded-xl bg-[#edeeef] py-3 pl-11 pr-4 text-base text-[#191c1d] outline-none ring-[#007c4a] focus:ring-2"
                />
              </div>
            </label>
            <label className="block font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Nomor Telepon (WhatsApp)
              <div className="relative mt-2">
                <SvgIcon
                  path={phoneFieldPaths.p143e1930}
                  viewBox="0 0 18 18"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]"
                />
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  inputMode="tel"
                  className="min-h-14 w-full rounded-xl bg-[#edeeef] py-3 pl-11 pr-4 text-base text-[#191c1d] outline-none ring-[#007c4a] focus:ring-2"
                />
              </div>
            </label>
            <div>
              <p className="font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
                Nama Posyandu
              </p>
              <div className="relative mt-2 flex min-h-14 items-center rounded-xl bg-[#dde0e0] px-4 pl-11 text-base text-[#536478]">
                <SvgIcon
                  path={lockedPosyanduPaths.p7ab5f00}
                  viewBox="0 0 22 18"
                  className="absolute left-4 h-4 w-5 text-[#536478]"
                />
                Mawar Merah 1
                <span className="absolute right-4 grid size-7 place-items-center rounded-full bg-white text-sm">
                  ♙
                </span>
              </div>
              <p className="mt-2 flex gap-1 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#63747a]">
                <span>ⓘ</span>Perubahan nama instansi Posyandu harus divalidasi
                oleh Tenaga Kesehatan.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={save}
            disabled={!name.trim() || !phone.trim() || saved}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#007c4a] font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_4px_8px_rgba(0,109,66,0.2)] disabled:opacity-60"
          >
            <SvgIcon
              path={inputMeasurementPaths.p3e09ad60}
              viewBox="0 0 18 18"
              className="size-4"
            />
            {saved ? "Perubahan Disimpan" : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="font-['Manrope:Regular',sans-serif] text-base text-[#536478] hover:text-[#007c4a]"
          >
            Batal
          </button>
        </section>
      </div>
    </main>
  )
}

export function UbahKataSandiScreen({ onBack }: { onBack: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("")

  const [newPassword, setNewPassword] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("")

  const [visible, setVisible] = useState<Record<string, boolean>>({})

  const [saved, setSaved] = useState(false)

  const score = [
    newPassword.length >= 8,

    /[A-Z]/.test(newPassword),

    /[0-9]/.test(newPassword),
  ].filter(Boolean).length

  const strength =
    score === 0
      ? "Belum diisi"
      : score === 1
        ? "Lemah"
        : score === 2
          ? "Sedang"
          : "Kuat"

  const valid =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword === confirmPassword

  const Field = ({
    id,

    label,

    value,

    setValue,

    placeholder,
  }: {
    id: string

    label: string

    value: string

    setValue: (value: string) => void

    placeholder: string
  }) => (
    <label className="block">
      <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold text-[#3e4941]">
        {label}
      </span>
      <div className="relative mt-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value.slice(0, 8))}
          maxLength={8}
          type={visible[id] ? "text" : "password"}
          placeholder={placeholder}
          className="min-h-12 w-full rounded-lg border border-[#becabf] bg-[#f8f9fa] px-3 pr-12 text-sm text-[#191c1d] outline-none transition placeholder:text-[#becabf] focus:border-[#007c4a] focus:ring-1 focus:ring-[#007c4a]"
        />
        <button
          type="button"
          onClick={() =>
            setVisible((current) => ({ ...current, [id]: !current[id] }))
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#63747a]"
          aria-label={
            visible[id] ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
          }
        >
          <SvgIcon
            path={changePasswordPaths.pf0742c0}
            viewBox="0 0 19 16.5"
            className="h-4 w-5"
          />
        </button>
      </div>
    </label>
  )

  const save = () => {
    if (!valid) return

    setSaved(true)

    window.setTimeout(onBack, 700)
  }

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 pt-16 text-[#191c1d]"
      aria-label="Ubah Kata Sandi"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-3 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="grid size-10 place-items-center rounded-full text-[#191c1d] transition hover:bg-[#eef4f1]"
              aria-label="Kembali"
            >
              <SvgIcon
                path={inputMeasurementPaths.p225a8cc0}
                viewBox="0 0 11.775 20"
                className="h-5 w-3"
              />
            </button>
            <img
              src={changePasswordLogo}
              alt="Logo Centing Raja"
              className="size-8 object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
              Profile
            </span>
          </div>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white"
            aria-label="Profil"
          >
            <SvgIcon
              path={taskProfilePaths.p3189a600}
              viewBox="0 0 12 12"
              className="size-4"
            />
          </button>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-xl flex-col px-5 py-8 sm:px-8 xl:py-12">
        <section className="text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#76d69f] text-[#005c38]">
            <SvgIcon
              path={changePasswordPaths.p2d47e8c0}
              viewBox="0 0 26.6667 26.6667"
              className="size-8"
            />
          </span>
          <h1 className="mt-4 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold">
            Ubah Kata Sandi
          </h1>
          <p className="mt-2 font-['Plus_Jakarta_Sans:Regular',sans-serif] text-xs text-[#63747a]">
            Pastikan kata sandi baru Anda kuat dan tidak mudah ditebak.
          </p>
        </section>
        <section className="mt-10 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:p-5">
          <div className="space-y-6">
            <Field
              id="current"
              label="Kata Sandi Saat Ini"
              value={currentPassword}
              setValue={setCurrentPassword}
              placeholder="Masukkan kata sandi saat ini"
            />
            <div>
              <Field
                id="new"
                label="Kata Sandi Baru"
                value={newPassword}
                setValue={setNewPassword}
                placeholder="Minimal 8 karakter"
              />
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((part) => (
                  <span
                    key={part}
                    className={`h-1 rounded-full ${
                      part <= score ? "bg-[#007c4a]" : "bg-[#e1e3e4]"
                    }`}
                  />
                ))}
              </div>
              <p
                className={`mt-3 font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[10px] ${
                  score === 3
                    ? "text-[#007c4a]"
                    : score === 1
                      ? "text-[#b3261e]"
                      : "text-[#63747a]"
                }`}
              >
                Kekuatan: {strength}
              </p>
            </div>
            <Field
              id="confirm"
              label="Konfirmasi Kata Sandi Baru"
              value={confirmPassword}
              setValue={setConfirmPassword}
              placeholder="Ketik ulang kata sandi baru"
            />
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="-mt-3 text-xs text-[#b3261e]">
                Konfirmasi kata sandi belum sama.
              </p>
            )}
          </div>
        </section>
        <section className="mt-12 flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={save}
            disabled={!valid || saved}
            className="min-h-12 w-full rounded-lg bg-[#007c4a] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold text-white shadow-[0_4px_8px_rgba(0,109,66,0.18)] disabled:cursor-not-allowed disabled:bg-[#becabf]"
          >
            {saved ? "Perubahan Disimpan" : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-base text-[#63747a] hover:text-[#007c4a]"
          >
            Batal
          </button>
        </section>
      </div>
    </main>
  )
}

export function PusatBantuanScreen({
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

const privacySections = [
  {
    title: "Pengumpulan Data",

    icon: privacyPaths.p31289500,

    viewBox: "0 0 18 18",

    body: (
      <>
        Centing Raja mengumpulkan informasi pribadi yang Anda berikan secara
        langsung saat menggunakan aplikasi, termasuk namun tidak terbatas pada:
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Nama lengkap anak dan orang tua</li>
          <li>Tanggal lahir dan jenis kelamin anak</li>
          <li>Data pertumbuhan fisik (tinggi dan berat badan)</li>
          <li>Riwayat kesehatan dan imunisasi</li>
        </ul>
        <p className="mt-3">
          Kami juga dapat mengumpulkan data penggunaan secara otomatis untuk
          meningkatkan kinerja aplikasi.
        </p>
      </>
    ),
  },

  {
    title: "Penggunaan Data",

    icon: privacyPaths.p1b2fa180,

    viewBox: "0 0 18 18",

    body: (
      <>
        Data yang kami kumpulkan digunakan secara eksklusif untuk tujuan
        berikut:
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Memantau dan menganalisis status pertumbuhan dan risiko stunting
            anak.
          </li>
          <li>
            Menyediakan rekomendasi gizi dan kesehatan yang dipersonalisasi.
          </li>
          <li>
            Membantu tenaga kesehatan (Nakes) dan Kader dalam memberikan
            intervensi yang tepat sasaran.
          </li>
          <li>
            Mengirimkan notifikasi terkait jadwal pengukuran atau imunisasi.
          </li>
        </ul>
        <p className="mt-4 rounded-md bg-[#dbeafe] px-3 py-2 text-[#475569]">
          <strong>Catatan Penting:</strong> Kami tidak akan pernah menjual data
          pribadi Anda kepada pihak ketiga. Data kesehatan Anda diproses secara
          rahasia sesuai standar medis.
        </p>
      </>
    ),
  },

  {
    title: "Hak Pengguna",

    icon: privacyPaths.p1ddd3340,

    viewBox: "0 0 18 18",

    body: (
      <>
        Sebagai pengguna Centing Raja, Anda memiliki hak-hak berikut terkait
        data pribadi Anda:
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Mengakses dan meninjau data yang telah Anda masukkan.</li>
          <li>Meminta koreksi jika terdapat kesalahan pada data kesehatan.</li>
          <li>
            Meminta penghapusan akun dan seluruh data terkait dari sistem kami.
          </li>
          <li>
            Menarik persetujuan penggunaan data kapan saja melalui pengaturan
            aplikasi.
          </li>
        </ul>
      </>
    ),
  },

  {
    title: "Hubungi Kami",

    icon: privacyPaths.p30545b00,

    viewBox: "0 0 18 18",

    body: (
      <>
        Jika Anda memiliki pertanyaan atau kekhawatiran mengenai Kebijakan
        Privasi ini, silakan hubungi kami melalui:
        <a
          href="mailto:privacy@centingraja.id"
          className="mt-3 flex w-fit items-center gap-2 font-semibold text-[#007c4a] hover:underline"
        >
          ✉ privacy@centingraja.id
        </a>
      </>
    ),
  },
]

export function KebijakanPrivasiScreen({
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
      className="min-h-svh bg-[#f8f9fa] pb-24 pt-16 text-[#191c1d]"
      aria-label="Kebijakan Privasi"
    >
      <ProfileHeader logo={privacyLogo} onBack={onProfile} />
      <section className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-8 sm:py-8 lg:max-w-6xl">
        <header>
          <h1 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold leading-8 sm:text-3xl">
            Kebijakan Privasi
          </h1>
          <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs text-[#65736c]">
            Terakhir diperbarui: 15 Oktober 2023
          </p>
        </header>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {privacySections.map((section) => (
            <article
              key={section.title}
              className="rounded-xl bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.05)] sm:p-5"
            >
              <h2 className="flex items-center gap-3 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#006d42] sm:text-lg">
                <SvgIcon
                  path={section.icon}
                  viewBox={section.viewBox}
                  className="size-[18px] shrink-0"
                />
                {section.title}
              </h2>
              <div className="mt-4 font-['Manrope:Regular',sans-serif] text-xs leading-[1.45] text-[#3e4941] sm:text-sm sm:leading-5">
                {section.body}
              </div>
            </article>
          ))}
        </div>
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

export function ProfileKaderScreen({
  onHome,

  onMaterial,

  onEdit,

  onPassword,

  onHelp,

  onPrivacy,

  onLogout,
}: {
  onHome: () => void

  onMaterial: () => void

  onEdit: () => void

  onPassword: () => void

  onHelp: () => void

  onPrivacy: () => void

  onLogout: () => void
}) {
  const actionRows = [
    { label: "Edit Profil", icon: "✥" },

    { label: "Ubah Kata Sandi", icon: "◉" },
  ]

  const infoRows = [
    { label: "Pusat Bantuan", icon: "?" },

    { label: "Kebijakan Privasi", icon: "@" },
  ]

  const action = (label: string) =>
    window.alert(`${label} akan segera tersedia.`)

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 pt-16 text-[#191c1d]"
      aria-label="Profil Kader"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={kaderProfileLogo}
              alt="Logo Centing Raja"
              className="size-8 object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
              Profile
            </span>
          </div>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white"
            aria-label="Profil"
          >
            <SvgIcon
              path={taskProfilePaths.p3189a600}
              viewBox="0 0 12 12"
              className="size-4"
            />
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl px-5 py-7 sm:px-8 xl:px-10 xl:py-10">
        <section className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={kaderProfilePhoto}
              alt="Foto Kader Nur"
              className="size-24 rounded-full object-cover shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            />
            <button
              type="button"
              onClick={() => action("Ubah foto profil")}
              className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-full bg-[#006d42] text-sm text-white shadow-[0_3px_8px_rgba(0,0,0,0.16)]"
              aria-label="Ubah foto"
            >
              ✎
            </button>
          </div>
          <h1 className="mt-4 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Kader Nur
          </h1>
          <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#76d69f]/25 px-3 py-1 font-['Manrope:Regular',sans-serif] text-sm text-[#005c38]">
            <SvgIcon
              path={profilePagePaths.p26f9d500}
              viewBox="0 0 12.833 12.25"
              className="size-3"
            />
            Verified Kader Posyandu
          </span>
        </section>
        <div className="mt-7 grid gap-5 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
          <section className="rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
              <SvgIcon
                path={profilePagePaths.p85bff00}
                viewBox="0 0 16 16"
                className="size-4 text-[#007c4a]"
              />
              Informasi Pribadi
            </h2>
            <dl className="mt-5 space-y-5 font-['Manrope:Regular',sans-serif] text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[#63747a]">NIK</dt>
                <dd className="text-right font-semibold">3273102930192039</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#63747a]">Nama Lengkap</dt>
                <dd className="text-right font-semibold">Nurhayati Ningsih</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#63747a]">No. Telepon</dt>
                <dd className="text-right font-semibold">0812-3456-7890</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#63747a]">Nama Posyandu</dt>
                <dd className="text-right font-semibold">
                  Mawar Merah 1<br />
                  <span className="font-normal text-xs text-[#63747a]">
                    Kec. Andir
                  </span>
                </dd>
              </div>
            </dl>
          </section>
          <div className="space-y-5">
            <section className="rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                <span className="text-lg text-[#007c4a]">⚙</span>Pengaturan Akun
              </h2>
              <div className="mt-4 space-y-1">
                {actionRows.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      item.label === "Edit Profil" ? onEdit() : onPassword()
                    }
                    className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-left transition hover:bg-[#f3f4f5]"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-[#e9f3ff] text-[#536478]">
                      {item.icon}
                    </span>
                    <span className="flex-1 font-['Manrope:Regular',sans-serif] text-sm">
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="text-xl text-[#536478]">
                      ›
                    </span>
                  </button>
                ))}
              </div>
            </section>
            <section className="rounded-2xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                <span className="text-lg text-[#007c4a]">ⓘ</span>Informasi
                Aplikasi
              </h2>
              <div className="mt-4 space-y-1">
                {infoRows.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      item.label === "Pusat Bantuan" ? onHelp() : onPrivacy()
                    }
                    className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-left transition hover:bg-[#f3f4f5]"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-[#f3f4f5] text-[#536478]">
                      {item.icon}
                    </span>
                    <span className="flex-1 font-['Manrope:Regular',sans-serif] text-sm">
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="text-xl text-[#536478]">
                      ›
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ffd9d5] font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-[#c2342d] transition hover:bg-[#ffc9c4]"
        >
          <SvgIcon
            path={logoutPaths.p3e9df400}
            viewBox="0 0 18 18"
            className="size-5"
          />
          Keluar
        </button>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-[#f8f9fa]/90 shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-4 px-2 sm:max-w-md xl:max-w-3xl xl:px-8">
          <button
            type="button"
            onClick={onHome}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={tasksPaths.p12a32500}
              viewBox="0 0 16 18"
              className="h-[18px] w-4"
            />
            <span className="text-[11px] font-semibold">Beranda</span>
          </button>
          <button
            type="button"
            onClick={onMaterial}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={bottomMaterialPaths.p378800}
              viewBox="0 0 22 16"
              className="h-4 w-[22px]"
            />
            <span className="text-[11px] font-semibold">Materi</span>
          </button>
          <button
            type="button"
            onClick={onHome}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={tasksPaths.p1de35f80}
              viewBox="0 0 18 20"
              className="h-5 w-[18px]"
            />
            <span className="text-[11px] font-semibold">Kuis</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1 text-[#007c4a]"
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

export function InputPengukuranScreen({
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

export function DataPengukuranScreen({
  onBack,

  onHome,

  onMaterial,
}: {
  onBack: () => void

  onHome: () => void

  onMaterial: () => void
}) {
  const metrics = [
    {
      label: "Tinggi Badan",

      value: "75.5",

      unit: "cm",

      tone: "text-[#007c4a]",
    },

    { label: "Berat Badan", value: "9.2", unit: "kg", tone: "text-[#007c4a]" },

    {
      label: "Lingkar Kepala",

      value: "46",

      unit: "cm",

      tone: "text-[#191c1d]",
    },

    {
      label: "Lingkar Lengan",

      value: "14.5",

      unit: "cm",

      tone: "text-[#191c1d]",
    },
  ]

  const nutrition = [
    {
      label: "Berat / Umur (BB/U)",

      value: "Normal",

      tone: "bg-[#76d69f] text-[#006d42]",
    },

    {
      label: "Tinggi / Umur (TB/U)",

      value: "Stunting",

      tone: "bg-[#ffdcd8] text-[#b3261e]",
    },

    {
      label: "Berat / Tinggi (BB/TB)",

      value: "Berisiko",

      tone: "bg-[#f0cb69] text-[#765b06]",
    },
  ]

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]"
      aria-label="Data Pengukuran Ahmad Raihan"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-3 sm:px-8 xl:px-10">
          <button
            type="button"
            onClick={onBack}
            className="grid size-10 place-items-center rounded-full text-[#191c1d]"
            aria-label="Kembali"
          >
            <SvgIcon
              path={measurementDataPaths.p300a1100}
              viewBox="0 0 16 16"
              className="size-4"
            />
          </button>
          <h1 className="ml-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#006d42]">
            Data Pengukuran
          </h1>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 xl:px-10 xl:py-10">
        <section className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#dceafe] font-['Manrope:SemiBold',sans-serif] text-lg text-[#4f6073]">
              AR
            </span>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold">
                Ahmad Raihan
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#3e4941]">
                <span className="inline-flex items-center gap-1.5">
                  <SvgIcon
                    path={measurementDataPaths.p2d24f5c0}
                    viewBox="0 0 12 13.3333"
                    className="h-4 w-3 text-[#3e4941]"
                  />
                  14 Bulan
                </span>
                <span className="size-1 rounded-full bg-[#becabf]" />
                <span className="inline-flex items-center gap-1.5">
                  <SvgIcon
                    path={measurementDataPaths.p3d204080}
                    viewBox="0 0 10.6667 10.6667"
                    className="size-3 text-[#3e4941]"
                  />
                  Laki-laki
                </span>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div>
            <section>
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                Detail Pengukuran
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
                {metrics.map((metric) => (
                  <article
                    key={metric.label}
                    className="min-h-[108px] rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    <p className="font-['Manrope:Regular',sans-serif] text-sm uppercase tracking-wide text-[#536478]">
                      {metric.label}
                    </p>
                    <p
                      className={`mt-3 font-['Manrope:Regular',sans-serif] text-sm ${metric.tone}`}
                    >
                      <strong className="text-base font-semibold">
                        {metric.value}
                      </strong>
                      <span className="ml-2 text-[#3e4941]">{metric.unit}</span>
                    </p>
                  </article>
                ))}
              </div>
            </section>
            <section className="mt-6">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                Status Gizi (Z-Score)
              </h2>
              <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {nutrition.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex min-h-16 items-center justify-between gap-3 px-4 ${
                      index ? "border-t border-[#edf0ee]" : ""
                    }`}
                  >
                    <span className="font-['Manrope:Regular',sans-serif] text-sm text-[#191c1d]">
                      {item.label}
                    </span>
                    <span
                      className={`rounded-full px-3 py-2 font-['Manrope:Regular',sans-serif] text-sm ${item.tone}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div>
            <section>
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                Informasi Pencatatan
              </h2>
              <article className="mt-3 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="flex gap-3">
                  <span className="text-lg text-[#63747a]">♙</span>
                  <div>
                    <p className="text-sm text-[#63747a]">Dicatat Oleh</p>
                    <p className="mt-1 text-sm text-[#191c1d]">
                      Kader Posyandu Melati 1
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <span className="text-lg text-[#63747a]">▣</span>
                  <div>
                    <p className="text-sm text-[#63747a]">Tanggal Pengukuran</p>
                    <p className="mt-1 text-sm text-[#191c1d]">
                      15 Agustus 2023, 09:30 WIB
                    </p>
                  </div>
                </div>
              </article>
            </section>
            <section className="mt-6">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
                Catatan Tambahan
              </h2>
              <article className="mt-3 rounded-2xl bg-white p-4 font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#3e4941] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Anak tampak aktif, nafsu makan normal. Disarankan untuk menambah
                asupan protein hewani (telur/ikan) untuk mengejar ketertinggalan
                tinggi badan. Jadwalkan kontrol ulang bulan depan.
              </article>
            </section>
          </div>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-[#f8f9fa]/90 shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-4 px-2 sm:max-w-md xl:max-w-3xl xl:px-8">
          <button
            type="button"
            onClick={onHome}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={tasksPaths.p12a32500}
              viewBox="0 0 16 18"
              className="h-[18px] w-4"
            />
            <span className="text-[11px] font-semibold">Beranda</span>
          </button>
          <button
            type="button"
            onClick={onMaterial}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={bottomMaterialPaths.p378800}
              viewBox="0 0 22 16"
              className="h-4 w-[22px]"
            />
            <span className="text-[11px] font-semibold">Materi</span>
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex flex-col items-center justify-center gap-1 text-[#007c4a]"
          >
            <SvgIcon
              path={tasksPaths.p1de35f80}
              viewBox="0 0 18 20"
              className="h-5 w-[18px]"
            />
            <span className="text-[11px] font-semibold">Tugas</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
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

export function TugasBulanIniScreen({
  onHome,

  onMaterial,

  onViewData,

  onInput,
}: {
  onHome: () => void

  onMaterial: () => void

  onViewData: () => void

  onInput: () => void
}) {
  const [activeRt, setActiveRt] = useState("Semua")

  const children = [
    {
      name: "Ahmad Raihan",

      initials: "AR",

      rt: "RT 01 / RW 03",

      address: "Jl. Manggis No. 12",

      age: "14 Bulan",

      deadline: "Batas Waktu: Hari ini",

      status: "Mendesak",

      tone: "bg-[#dceafe] text-[#4f6073]",

      overdue: true,
    },

    {
      name: "Nabila Putri",

      initials: "NP",

      rt: "RT 01 / RW 03",

      address: "Jl. Manggis No. 4",

      age: "9 Bulan",

      deadline: "Batas Waktu: 2 Hari lagi",

      status: "Belum",

      tone: "bg-[#fcebc8] text-[#765b06]",
    },

    {
      name: "Raka Pratama",

      initials: "RP",

      rt: "RT 01 / RW 03",

      address: "Jl. Mawar No. 7",

      age: "18 Bulan",

      deadline: "Batas Waktu: 3 Hari lagi",

      status: "Belum",

      tone: "bg-[#e7dcff] text-[#604fa3]",
    },

    {
      name: "Alya Safitri",

      initials: "AS",

      rt: "RT 01 / RW 03",

      address: "Jl. Manggis No. 21",

      age: "11 Bulan",

      deadline: "Tercatat: Hari ini, 08:30",

      status: "Selesai",

      tone: "bg-[#e9f7ef] text-[#006d42]",

      done: true,
    },

    {
      name: "Dimas Bagaskara",

      initials: "DB",

      rt: "RT 01 / RW 03",

      address: "Jl. Kenanga No. 5",

      age: "20 Bulan",

      deadline: "Tercatat: Kemarin, 09:15",

      status: "Selesai",

      tone: "bg-[#e9f7ef] text-[#006d42]",

      done: true,
    },

    {
      name: "Siti Putri",

      initials: "SP",

      rt: "RT 02 / RW 03",

      address: "Jl. Durian No. 5",

      age: "8 Bulan",

      deadline: "Batas Waktu: 3 Hari lagi",

      status: "Belum",

      tone: "bg-[#f3d36b] text-[#765b06]",
    },

    {
      name: "Fahri Ramadhan",

      initials: "FR",

      rt: "RT 02 / RW 03",

      address: "Jl. Durian No. 9",

      age: "16 Bulan",

      deadline: "Batas Waktu: 4 Hari lagi",

      status: "Belum",

      tone: "bg-[#dceafe] text-[#4f6073]",
    },

    {
      name: "Bima Nugraha",

      initials: "BN",

      rt: "RT 02 / RW 03",

      address: "Jl. Nangka No. 2",

      age: "10 Bulan",

      deadline: "Tercatat: Hari ini, 09:30",

      status: "Selesai",

      tone: "bg-[#edf0f2] text-[#63747a]",

      done: true,
    },

    {
      name: "Citra Lestari",

      initials: "CL",

      rt: "RT 03 / RW 03",

      address: "Jl. Melati No. 8",

      age: "13 Bulan",

      deadline: "Batas Waktu: 5 Hari lagi",

      status: "Belum",

      tone: "bg-[#fde2da] text-[#a64b39]",
    },

    {
      name: "Gilang Prakoso",

      initials: "GP",

      rt: "RT 03 / RW 03",

      address: "Jl. Melati No. 14",

      age: "22 Bulan",

      deadline: "Batas Waktu: 6 Hari lagi",

      status: "Belum",

      tone: "bg-[#dff3eb] text-[#006d42]",
    },
  ]

  const filters = ["Semua", "RT 01", "RT 02", "RT 03"]

  const visibleChildren =
    activeRt === "Semua"
      ? children
      : children.filter((child) => child.rt.startsWith(activeRt))

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]"
      aria-label="Tugas Bulan Ini"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <img
              src={tasksLogo}
              alt="Logo Centing Raja"
              className="size-7 rounded-full object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#006d42]">
              Tugas
            </span>
          </div>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white"
            aria-label="Profil"
          >
            <SvgIcon
              path={taskProfilePaths.p3189a600}
              viewBox="0 0 12 12"
              className="size-4"
            />
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-5 py-7 sm:px-8 xl:px-10 xl:py-10">
        <section className="relative overflow-hidden rounded-2xl bg-[#007c4a] p-4 text-white shadow-[0_8px_24px_rgba(0,109,66,0.14)] sm:p-6 xl:p-8">
          <span
            aria-hidden="true"
            className="absolute -right-12 -top-12 size-44 rounded-full bg-[#76d69f]/20 blur-2xl"
          />
          <div className="relative">
            <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
              Tugas Bulan Ini
            </h1>
            <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-white/80">
              Posyandu Mawar 03 - Agustus 2023
            </p>
            <div className="mt-6 flex divide-x divide-white/20">
              <div className="min-w-[105px] pr-5">
                <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] leading-7">
                  12
                </strong>
                <span className="font-['Manrope:Regular',sans-serif] text-xs tracking-[0.06em] text-white/70">
                  TOTAL TUGAS
                </span>
              </div>
              <div className="min-w-[90px] px-5">
                <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] leading-7 text-[#7adaa2]">
                  4
                </strong>
                <span className="font-['Manrope:Regular',sans-serif] text-xs tracking-[0.06em] text-white/70">
                  SELESAI
                </span>
              </div>
              <div className="min-w-[80px] pl-5">
                <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] leading-7 text-[#e7c269]">
                  8
                </strong>
                <span className="font-['Manrope:Regular',sans-serif] text-xs tracking-[0.06em] text-white/70">
                  BELUM
                </span>
              </div>
            </div>
          </div>
        </section>
        <nav
          className="mt-7 -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0"
          aria-label="Filter RT"
        >
          {filters.map((filter) => {
            const total =
              filter === "Semua"
                ? children.length
                : children.filter((child) => child.rt.startsWith(filter)).length

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveRt(filter)}
                className={`shrink-0 rounded-full px-4 py-2 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold transition ${
                  activeRt === filter
                    ? "bg-[#007c4a] text-white"
                    : "bg-[#f1f3f2] text-[#536478] hover:bg-[#e4ebe7]"
                }`}
              >
                {filter} ({total})
              </button>
            )
          })}
        </nav>
        <section className="mt-7 grid gap-3 xl:grid-cols-2 xl:gap-5">
          {visibleChildren.map((child) => (
            <article
              key={child.name}
              className={`relative rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                child.overdue ? "border-l-4 border-[#d30b18] pl-3" : ""
              }`}
            >
              <button
                type="button"
                className="absolute right-3 top-3 grid size-7 place-items-center text-lg leading-none text-[#3e4941]"
                aria-label={`Pilihan ${child.name}`}
              >
                ⋮
              </button>
              <div className="pr-7">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 font-['Manrope:SemiBold',sans-serif] text-[10px] font-semibold ${
                      child.overdue
                        ? "bg-[#ffe7e5] text-[#b3261e]"
                        : child.done
                          ? "bg-[#edf0f2] text-[#63747a]"
                          : "text-[#63747a]"
                    }`}
                  >
                    {child.overdue
                      ? "⚠ MENDESAK"
                      : child.done
                        ? "✓ SELESAI"
                        : child.deadline}
                  </span>
                  {!child.overdue && !child.done && (
                    <span className="text-[10px] text-[#63747a]">
                      {child.deadline}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex gap-3">
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-full font-['Manrope:Regular',sans-serif] text-sm ${child.tone}`}
                  >
                    {child.initials}
                  </span>
                  <div className="min-w-0">
                    <h2
                      className={`font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-lg font-semibold ${
                        child.done
                          ? "text-[#63747a] line-through"
                          : "text-[#191c1d]"
                      }`}
                    >
                      {child.name}
                    </h2>
                    <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
                      ⌖ {child.rt}, {child.address}
                    </p>
                    <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
                      ♙ {child.age}
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={child.done ? onViewData : onInput}
                className={`mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl font-['Manrope:SemiBold',sans-serif] text-sm font-semibold ${
                  child.done
                    ? "bg-[#f3f4f5] text-[#63747a]"
                    : "bg-[#007c4a] text-white"
                }`}
              >
                {child.done ? (
                  <>
                    <SvgIcon
                      path={viewDataPaths.p110cf380}
                      viewBox="0 0 16.5 11.25"
                      className="h-3 w-4"
                    />
                    <span>Lihat Data</span>
                  </>
                ) : (
                  <>
                    <SvgIcon
                      path={taskMeasurementPaths.p1f830000}
                      viewBox="0 0 14.25 15"
                      className="size-4"
                    />
                    <span>Input Pengukuran</span>
                  </>
                )}
              </button>
            </article>
          ))}
        </section>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-[#f8f9fa]/90 shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-4 px-2 sm:max-w-md xl:max-w-3xl xl:px-8">
          <button
            type="button"
            onClick={onHome}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={tasksPaths.p12a32500}
              viewBox="0 0 16 18"
              className="h-[18px] w-4"
            />
            <span className="text-[11px] font-semibold">Beranda</span>
          </button>
          <button
            type="button"
            onClick={onMaterial}
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={bottomMaterialPaths.p378800}
              viewBox="0 0 22 16"
              className="h-4 w-[22px]"
            />
            <span className="text-[11px] font-semibold">Materi</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1 text-[#007c4a]"
          >
            <SvgIcon
              path={tasksPaths.p1de35f80}
              viewBox="0 0 18 20"
              className="h-5 w-[18px]"
            />
            <span className="text-[11px] font-semibold">Tugas</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1 text-[#3e4941]"
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

export function MateriKaderScreen({
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

export function KuisKaderScreen({
  onBack,

  onComplete,
}: {
  onBack: () => void

  onComplete: () => void
}) {
  const quizDurationSeconds = 15 * 60

  const [secondsLeft, setSecondsLeft] = useState(quizDurationSeconds)

  const [questionIndex, setQuestionIndex] = useState(0)

  const [answers, setAnswers] = useState<Record<number, number>>({})

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)

  const questions = [
    {
      question: "Apa definisi stunting yang paling tepat menurut WHO?",

      hint: "Pilih satu jawaban yang paling tepat berdasarkan materi Mengenal Stunting yang telah Anda pelajari.",

      options: [
        "Anak yang berat badannya kurang dari standar usianya.",

        "Gangguan pertumbuhan dan perkembangan akibat kekurangan gizi kronis dan infeksi berulang.",

        "Anak yang lahir dengan kondisi prematur.",

        "Kondisi anak yang mengalami demam tinggi dan diare.",
      ],

      answer: 1,
    },

    {
      question: "Kapan periode 1000 Hari Pertama Kehidupan dimulai?",

      hint: "Pilih jawaban yang paling tepat.",

      options: [
        "Saat anak mulai sekolah.",

        "Sejak masa kehamilan hingga anak berusia dua tahun.",

        "Saat bayi lahir hingga usia satu tahun.",

        "Setelah anak berusia dua tahun.",
      ],

      answer: 1,
    },

    {
      question: "Salah satu langkah penting mencegah stunting adalah?",

      hint: "Ingat kembali materi gizi ibu dan anak.",

      options: [
        "Menunda imunisasi anak.",

        "Memberikan makanan bergizi seimbang dan memantau pertumbuhan.",

        "Mengurangi kunjungan ke Posyandu.",

        "Memberikan minuman manis setiap hari.",
      ],

      answer: 1,
    },

    {
      question: "Pengukuran panjang badan balita dilakukan dengan?",

      hint: "Pilih alat dan posisi yang tepat.",

      options: [
        "Timbangan dewasa.",

        "Pita ukur kain biasa.",

        "Alat ukur panjang badan sesuai usia anak.",

        "Menggunakan perkiraan orang tua.",
      ],

      answer: 2,
    },

    {
      question: "Peran kader dalam pencegahan stunting adalah?",

      hint: "Pilih peran yang paling sesuai.",

      options: [
        "Mencatat, mengedukasi, dan merujuk bila ditemukan risiko.",

        "Memberikan diagnosis medis sendiri.",

        "Menggantikan seluruh peran tenaga kesehatan.",

        "Hanya hadir saat kegiatan besar.",
      ],

      answer: 0,
    },
  ]

  useEffect(() => {
    const timer = window.setInterval(
      () => setSecondsLeft((value) => Math.max(0, value - 1)),

      1000,
    )

    return () => window.clearInterval(timer)
  }, [])

  const question = questions[questionIndex]

  const selected = answers[questionIndex]

  const isLast = questionIndex === questions.length - 1

  const formatTime = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`

  const next = () => {
    if (isLast) setShowSubmitConfirm(true)
    else setQuestionIndex((value) => value + 1)
  }

  const backQuestion = () => {
    if (questionIndex === 0) onBack()
    else setQuestionIndex((value) => value - 1)
  }

  const submitQuiz = () => {
    setShowSubmitConfirm(false)

    onComplete()
  }

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] px-5 pb-10 pt-20 text-[#191c1d] sm:px-8 xl:px-10"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-2 sm:px-8 xl:px-10">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="grid size-12 place-items-center rounded-full text-[#191c1d]"
              aria-label="Kembali"
            >
              <SvgIcon
                path={quizPaths.p225a8cc0}
                viewBox="0 0 11.775 20"
                className="h-5 w-3"
              />
            </button>
            <img
              src={quizLogo}
              alt="Centing Raja"
              className="size-6 rounded-full object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#006d42]">
              Kuis Kader
            </span>
          </div>
        </div>
      </header>
      <section className="relative mx-auto w-full max-w-3xl rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] sm:p-7 xl:max-w-4xl xl:p-10">
        <div className="flex items-center justify-between gap-4">
          <span className="font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941]">
            Pertanyaan {questionIndex + 1} dari {questions.length}
          </span>
          <span className="text-sm font-semibold text-[#006d42]">
            {Math.round(((questionIndex + 1) / questions.length) * 100)}%
            Selesai
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e1e3e4]">
          <div
            className="h-full rounded-full bg-[#006d42] transition-[width] duration-300"
            style={{
              width: `${((questionIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-full bg-[#e9f7ef] text-[#005c38]">
            <SvgIcon
              path={quizPaths.p1a168100}
              viewBox="0 0 15.8125 16.6667"
              className="size-6"
            />
          </span>
          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#e9f7ef] px-3 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#006d42] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            aria-label="Durasi kuis"
          >
            <span className="size-2 rounded-full bg-[#006d42]" />
            {formatTime(secondsLeft)}
          </button>
        </div>
        <h1 className="mt-5 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold leading-7 sm:text-2xl">
          {question.question}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-5 text-[#3e4941]">
          {question.hint}
        </p>
        <div className="mt-7 space-y-3">
          {question.options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setAnswers((value) => ({ ...value, [questionIndex]: index }))
              }
              className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left text-sm leading-5 transition ${
                selected === index
                  ? "border-[#006d42] bg-[#e9f7ef]"
                  : "border-[#d8dddc] bg-white hover:border-[#006d42]/50"
              }`}
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full border font-['Manrope:SemiBold',sans-serif] text-xs ${
                  selected === index
                    ? "border-[#006d42] bg-[#006d42] text-white"
                    : "border-[#b8c1bd] text-[#536478]"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>
        <div
          className={`mt-8 flex items-center gap-3 ${
            questionIndex === 0 ? "justify-end" : "justify-between"
          }`}
        >
          {questionIndex > 0 && (
            <button
              type="button"
              onClick={backQuestion}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#cfd8d3] bg-white px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941] transition hover:border-[#006d42] hover:text-[#006d42]"
            >
              <SvgIcon
                path={quizPaths.p225a8cc0}
                viewBox="0 0 11.775 20"
                className="h-4 w-2.5"
              />
              Kembali
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={selected === undefined}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#006d42] px-6 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isLast ? "Selesai" : "Selanjutnya"}
            <SvgIcon
              path={quizPaths.p32510800}
              viewBox="0 0 13.3333 13.3333"
              className="size-4"
            />
          </button>
        </div>
      </section>
      {showSubmitConfirm && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-quiz-title"
        >
          <section className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#e9f7ef] text-xl font-bold text-[#006d42]">
              ?
            </span>
            <h2
              id="submit-quiz-title"
              className="mt-5 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#191c1d]"
            >
              Kirim jawaban?
            </h2>
            <p className="mt-2 font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#3e4941]">
              Apakah Anda yakin ingin mengirim jawaban?
            </p>
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="min-h-12 flex-1 rounded-full border border-[#cfd8d3] font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={submitQuiz}
                className="min-h-12 flex-1 rounded-full bg-[#006d42] font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white"
              >
                Iya, Kirim
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export function QuizResultScreen({
  onHome,

  onBack,
}: {
  onHome: () => void

  onBack: () => void
}) {
  const answerSummary = [
    {
      question: "Ciri-ciri balita stunting yang paling mudah dikenali?",

      answer: "Jawaban: Tinggi badan lebih pendek dari standar usianya.",

      correct: true,
    },

    {
      question:
        "Usia Emas (Golden Age) pencegahan stunting berada pada rentang?",

      answer: "Jawaban: 1000 Hari Pertama Kehidupan (HPK).",

      correct: true,
    },

    {
      question: "Pemberian ASI Eksklusif dilakukan sampai bayi berusia?",

      answer: "Jawaban Anda: 4 Bulan",

      detail: "Benar: 6 Bulan. Setelah 6 bulan, baru diberikan MPASI.",

      correct: false,
    },

    {
      question: "Makanan Pendamping ASI (MPASI) yang baik harus mengandung?",

      answer: "Jawaban: Protein hewani, karbohidrat, dan lemak.",

      correct: true,
    },
  ]

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]"
      aria-label="Hasil kuis kader"
    >
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-[#f8f9fa]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-2 sm:px-8 xl:px-10">
          <button
            type="button"
            onClick={onBack}
            className="grid size-12 place-items-center rounded-full text-[#191c1d]"
            aria-label="Kembali"
          >
            <SvgIcon
              path={resultPaths.p225a8cc0}
              viewBox="0 0 11.775 20"
              className="h-5 w-3"
            />
          </button>
          <div className="flex items-center gap-2">
            <img
              src={resultLogo}
              alt="Logo Centing Raja"
              className="size-6 rounded-full object-cover"
            />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#006d42]">
              Hasil Kuis
            </span>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl xl:px-10">
        <section className="relative overflow-hidden rounded-b-[32px] bg-[#76d69f] px-5 pb-24 pt-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:px-10 sm:pb-28 xl:rounded-[0_0_44px_44px] xl:pb-32 xl:pt-9">
          <span
            aria-hidden="true"
            className="absolute -right-12 -top-12 size-48 rounded-full bg-[#006d42]/10 blur-[20px]"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-10 -left-12 size-36 rounded-full bg-[#d7f0dd]/45 blur-xl"
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <div className="relative mb-1 w-32 sm:w-36">
              <img
                src={resultMascot}
                alt="Maskot Centing Raja merayakan hasil kuis"
                className="w-full object-contain drop-shadow-[0_8px_0_rgba(0,92,56,0.09)]"
              />
              <span className="absolute -right-1 top-0 text-xl text-[#e3bf66]">
                ★
              </span>
              <span className="absolute -left-2 bottom-4 text-xl text-[#e3bf66]">
                ★
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8 text-[#005c38] sm:text-3xl">
              Luar Biasa, Kader Hebat!
            </h1>
            <p className="mt-2 max-w-[300px] font-['Manrope:Regular',sans-serif] text-base leading-6 text-[#005c38]/90">
              Kamu berhasil menyelesaikan kuis.
              <br />
              Terus semangat belajar demi anak bangsa!
            </p>
          </div>
        </section>
        <div className="relative -mt-12 px-4 sm:-mt-14 sm:px-8 xl:-mt-16 xl:px-12">
          <section className="mx-auto grid max-w-[920px] gap-7 rounded-2xl bg-white p-6 text-center shadow-[0_4px_18px_rgba(0,0,0,0.08)] sm:p-8 xl:grid-cols-[260px_1fr] xl:items-center xl:gap-12 xl:p-10 xl:text-left">
            <div className="flex flex-col items-center">
              <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold uppercase tracking-wide text-[#63747a]">
                Skor Akhir
              </p>
              <div className="relative mt-4 grid size-32 place-items-center rounded-full border-[8px] border-[#006d42] sm:size-36">
                <div>
                  <strong className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-none text-[#006d42]">
                    80
                  </strong>
                  <span className="mt-1 block font-['Manrope:SemiBold',sans-serif] text-xs text-[#536478]">
                    / 100
                  </span>
                </div>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e9f7ef] px-3 py-1.5 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#006d42]">
                <span className="grid size-4 place-items-center rounded-full bg-white">
                  <SvgIcon
                    path={resultPaths.p127da640}
                    viewBox="0 0 13.5833 10.0208"
                    className="h-2.5 w-3 text-[#006d42]"
                  />
                </span>
                4 dari 5 Jawaban Benar
              </span>
            </div>
            <div className="rounded-2xl bg-[#f4fbf6] p-5 text-left xl:p-6">
              <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold uppercase tracking-[0.12em] text-[#006d42]">
                Pencapaian Kader
              </p>
              <h2 className="mt-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#005c38]">
                Pemahaman Anda sudah sangat baik.
              </h2>
              <p className="mt-2 font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#3e4941]">
                Terus tingkatkan wawasan tentang pencegahan stunting agar
                pendampingan keluarga di Posyandu semakin optimal.
              </p>
            </div>
          </section>
        </div>
        <section className="mx-auto max-w-[920px] px-4 pt-7 sm:px-8 xl:px-12 xl:pt-10">
          <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
            Ringkasan Jawaban
          </h2>
          <div className="mt-3 space-y-3">
            {answerSummary.map((item) => (
              <article
                key={item.question}
                className={`flex gap-3 rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
                  item.correct ? "bg-white" : "bg-[#fff4f3]"
                }`}
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full ${
                    item.correct
                      ? "bg-[#e9f7ef] text-[#006d42]"
                      : "bg-[#ffe2df] text-[#d84747]"
                  }`}
                >
                  <SvgIcon
                    path={
                      item.correct
                        ? resultPaths.p127da640
                        : resultPaths.p34536fc0
                    }
                    viewBox={
                      item.correct
                        ? "0 0 13.5833 10.0208"
                        : "0 0 11.6667 11.6667"
                    }
                    className="size-3"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
                    {item.question}
                  </p>
                  <p
                    className={`mt-1 font-['Manrope:SemiBold',sans-serif] text-xs leading-4 ${
                      item.correct ? "text-[#006d42]" : "text-[#d84747]"
                    }`}
                  >
                    {item.answer}
                  </p>
                  {item.detail && (
                    <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#63747a]">
                      {item.detail}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="mx-auto max-w-[920px] px-4 pt-10 sm:px-8 xl:px-12">
          <button
            type="button"
            onClick={onHome}
            className="min-h-12 w-full rounded-full bg-[#007c4a] px-6 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_5px_12px_rgba(0,109,66,0.20)] transition hover:bg-[#006d42]"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </main>
  )
}
