import React, { useEffect, useRef, useState } from "react"

import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"

import { ParentInputHeader } from "../../components/parent/parent-input-header"

const childSuccessMark =
  "/images/centang-hijau.png"

const childSuccessLogo =
  "/logo/logo-centing-raja.png"

const measurementSuccessMarkParent =
  "/images/centang-hijau.png"

const measurementSuccessLogoParent =
  "/logo/logo-centing-raja.png"

export function DataAnakBerhasilDisimpan({
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
