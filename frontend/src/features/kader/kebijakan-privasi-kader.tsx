import React, { useEffect, useRef, useState } from "react"

import { ProfileBottomNav } from "../../components/kader/profile-bottom-nav"

import { ProfileHeader } from "../../components/kader/profile-header"

import { SvgIcon } from "../../components/ui/svg-icon"

import privacyPaths from "../../assets/icon-privacy"

const privacyLogo =
  "/logo/logo-centing-raja.png"

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

export function KebijakanPrivasiKader({
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
