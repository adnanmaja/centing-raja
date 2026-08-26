import { useEffect, useState } from "react"

import { SectionTitle } from "../../components/ui/section-title"

import { SvgIcon } from "../../components/ui/svg-icon"

import aboutIconPaths from "../../assets/icon-about-section"

const aboutLogo =
  "/logo/logo-centing-raja.png"

export function TentangCentingRaja({ onComplete }: { onComplete: () => void }) {
  const manualIcon = (
    <SvgIcon
      path={aboutIconPaths.p1c278300}
      viewBox="0 0 10.667 13.333"
      className="h-4 w-[13px]"
    />
  )

  const digitalIcon = (
    <SvgIcon
      path={aboutIconPaths.p3a614400}
      viewBox="0 0 13.1 13.18"
      className="size-4"
    />
  )

  return (
    <main
      data-reveal-page
      className="min-h-svh overflow-x-hidden bg-[#f8f9fa] pb-6 text-[#191c1d]"
      aria-label="Tentang Centing Raja"
    >
      <header className="relative overflow-hidden rounded-b-[32px] bg-[#f3f4f5] px-5 pb-4 pt-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:px-8 sm:pb-8 lg:pb-10">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 size-48 rounded-full bg-[rgba(0,109,66,0.05)] blur-[20px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-8 -left-8 size-32 rounded-full bg-[rgba(118,91,6,0.10)] blur-[12px]"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <img
            src={aboutLogo}
            alt="Logo Centing Raja"
            className="size-20 rounded-full object-cover shadow-[0_2px_2px_rgba(0,0,0,0.06),0_4px_3px_rgba(0,0,0,0.07)] sm:size-24"
          />
          <h1 className="mt-4 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8">
            Mengenal Centing Raja
          </h1>
          <p className="mt-1 font-['Manrope:Regular',sans-serif] text-base leading-6 text-[#006d42]">
            Cegah Stunting Remaja Berdaya
          </p>
          <p className="mt-3 max-w-[280px] font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941] sm:max-w-xl">
            Inovasi digital Puskesmas Srandakan untuk memantau pertumbuhan
            remaja secara akurat dan kolaboratif.
          </p>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 pt-6 sm:px-8 sm:pt-10 lg:gap-12 lg:pt-14">
        <section>
          <SectionTitle
            icon={
              <SvgIcon
                path={aboutIconPaths.p29002e00}
                viewBox="0 0 19.5 16"
                className="h-4 w-5"
              />
            }
          >
            Transformasi Digital
          </SectionTitle>
          <div className="relative mt-5 grid gap-4 md:grid-cols-2 md:gap-6">
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-4 top-8 w-px bg-[#d8dddc] md:hidden"
            />
            <article className="relative z-10 flex gap-3 rounded-xl bg-[#edeeef] p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f8f9fa] text-[#4f6073] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                {manualIcon}
              </span>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold leading-4">
                  Era Manual
                </h3>
                <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#3e4941] sm:text-sm sm:leading-5">
                  Pencatatan menggunakan kertas dan Excel yang memakan waktu dan
                  rawan tercecer.
                </p>
              </div>
            </article>
            <article className="relative z-10 flex gap-3 rounded-xl bg-[rgba(0,109,66,0.05)] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#006d42] text-white shadow-[0_1px_1px_rgba(0,0,0,0.10)]">
                {digitalIcon}
              </span>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold leading-4 text-[#006d42]">
                  Era Digital Centing Raja
                </h3>
                <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#3e4941] sm:text-sm sm:leading-5">
                  Data terintegrasi, perhitungan otomatis sesuai standar
                  Kemenkes, dan akses real-time.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section>
          <SectionTitle
            icon={
              <SvgIcon
                path={aboutIconPaths.p5df3d80}
                viewBox="0 0 24 12"
                className="h-3 w-6"
              />
            }
            iconBox="text-[#765b06]"
          >
            Kolaborasi 3 Pilar
          </SectionTitle>
          <div className="mt-5 grid gap-3 md:grid-cols-3 md:gap-5">
            {[
              {
                title: "Kader Remaja",

                text: "Tulang punggung sistem. Ujung tombak pengukuran dan pencatatan di lapangan dengan akurasi tinggi.",

                path: aboutIconPaths.p2628ad80,

                viewBox: "0 0 20 18.35",

                tone: "bg-[#e9f7ef] text-[#006d42]",
              },

              {
                title: "Tenaga Kesehatan",

                text: "Memantau data agregat, memberikan intervensi klinis, dan validasi status gizi.",

                path: aboutIconPaths.p20a2f200,

                viewBox: "0 0 20 20",

                tone: "bg-[#dceafe] text-[#536478]",
              },

              {
                title: "Orang Tua & Remaja",

                text: "Akses transparan terhadap grafik pertumbuhan dan edukasi pencegahan stunting.",

                path: aboutIconPaths.p390ecb80,

                viewBox: "0 0 20 20",

                tone: "bg-[#fbefc8] text-[#765b06]",
              },
            ].map((pillar) => (
              <article
                key={pillar.title}
                className="flex gap-3 rounded-xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)] md:flex-col md:p-5"
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full ${pillar.tone}`}
                >
                  <SvgIcon
                    path={pillar.path}
                    viewBox={pillar.viewBox}
                    className="size-5"
                  />
                </span>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold leading-4">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#3e4941] sm:text-sm sm:leading-5">
                    {pillar.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl bg-[#006d42] px-6 py-6 text-center text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] sm:rounded-[24px] sm:px-10 sm:py-9">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 size-32 rounded-full bg-white/10 blur-[20px]"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <SvgIcon
              path={aboutIconPaths.p20285b60}
              viewBox="0 0 36 36"
              className="size-9 opacity-90"
            />
            <h2 className="mt-3 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold leading-7">
              Perhitungan Otomatis
            </h2>
            <p className="mt-2 max-w-md font-['Manrope:Regular',sans-serif] text-sm leading-5 text-white/90">
              Menggunakan standar antropometri Kementerian Kesehatan RI untuk
              deteksi dini risiko stunting.
            </p>
          </div>
        </section>

        <button
          type="button"
          onClick={onComplete}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#006d42] py-3 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Mulai Sekarang</span>
          <SvgIcon
            path={aboutIconPaths.p1a406200}
            viewBox="0 0 16 16"
            className="size-4"
          />
        </button>
      </div>
    </main>
  )
}
