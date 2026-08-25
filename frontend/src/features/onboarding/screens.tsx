import { useEffect, useState } from "react"

import { SectionTitle } from "../../components/ui/SectionTitle"

import { SvgIcon } from "../../components/ui/SvgIcon"

const welcomeIllustration =
  "/assets/imports/Welcome/df8f0f74361ebe8780c034ba043a73cc413163f6.png"

const centingRajaLogo =
  "/assets/imports/Welcome-2/0007128175a75209c8c698fe2b734b37ba9ba267.png"

const aboutLogo =
  "/assets/imports/TentangCentingRaja-1/0007128175a75209c8c698fe2b734b37ba9ba267.png"

import aboutIconPaths from "../../assets/icon-about-section"

const parentGuideHero =
  "/assets/imports/Group92/a43a2eb4bfc773402438273ec15acf241a525467.png"

const parentGuideLogo =
  "/assets/imports/Container/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import parentGuidePaths from "../../assets/icon-guide-parent"

const parentGuideMascot = "/assets/imports/image.png"

const nakesGuideHero =
  "/assets/imports/PanduanUntukNakesDesktop/aa67e5671e5aef4ce81ab557b31e820613b8f113.png"

const nakesGuideLogo =
  "/assets/imports/PanduanUntukNakesDesktop/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import nakesGuidePaths from "../../assets/icon-guide-nakes"

const kaderGuideHero =
  "/assets/imports/PanduanUntukKaderDesktop/813a628706e3f273ba2ad2e5b150cecf19a13ef3.png"

const kaderGuideLogo =
  "/assets/imports/PanduanUntukKaderDesktop/7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png"

import kaderGuidePaths from "../../assets/icon-guide-kader"

const loadingLogo =
  "/assets/imports/Background-1/0007128175a75209c8c698fe2b734b37ba9ba267.png"

const slides = [
  {
    title: "Selamat Datang di Centing Raja",
    description:
      "Bersama kita pantau tumbuh kembang anak untuk masa depan yang lebih cerah dan sehat.",
    visual: "illustration",
  },

  { title: "Apa itu Centing Raja ?", description: "", visual: "logo" },
]

export function CentingRajaLogo() {
  return (
    <div className="relative isolate flex size-48 shrink-0 items-center justify-center">
      <div className="relative size-48 overflow-hidden shadow-[0px_2px_2px_rgba(0,0,0,0.06),0px_4px_3px_rgba(0,0,0,0.07)]">
        <img
          src={loadingLogo}
          alt="Logo Centing Raja"
          className="size-full object-cover select-none"
          draggable={false}
        />
      </div>
    </div>
  )
}

export function LoadingScreen() {
  return (
    <main
      className="flex min-h-svh w-full items-center justify-center bg-[#f8f9fa] px-4 py-12"
      aria-label="Memuat aplikasi"
    >
      <div className="flex w-full max-w-96 flex-col items-center">
        <CentingRajaLogo />
        <div className="pt-8">
          <div className="flex flex-col items-center" aria-live="polite">
            <div
              className="h-1.5 w-32 overflow-hidden rounded-full bg-[#e1e3e4]"
              role="progressbar"
              aria-label="Memuat Centing Raja"
            >
              <div className="loading-progress h-full rounded-full bg-[#006d42] motion-reduce:animate-none" />
            </div>
            <p className="mt-4 text-center text-base leading-6 text-[rgba(62,73,65,0.8)]">
              Memuat centing raja....
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export function Pagination({
  activeSlide,

  onSelect,
}: {
  activeSlide: number

  onSelect: (index: number) => void
}) {
  return (
    <div
      className="flex h-3 items-center justify-center gap-1.5"
      role="tablist"
      aria-label="Halaman pengenalan"
    >
      {slides.map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={activeSlide === index}
          aria-label={`Halaman ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`pagination-dot h-1.5 rounded-full transition-[width,background-color,transform] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006d42] ${
            activeSlide === index
              ? "w-4 bg-[#006d42]"
              : "w-1.5 bg-[#dfe2e1] hover:bg-[#aab4ae]"
          }`}
        />
      ))}
    </div>
  )
}

export function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0)

  const slide = slides[activeSlide]

  const isLastSlide = activeSlide === slides.length - 1

  const advance = () =>
    isLastSlide ? onComplete() : setActiveSlide((current) => current + 1)

  return (
    <main
      className="flex min-h-svh w-full flex-col overflow-hidden bg-[#f8f9fa]"
      aria-label="Pengenalan Centing Raja"
    >
      <section className="flex flex-1 items-center justify-center px-4 pb-8 pt-10 sm:px-8 sm:pb-12 sm:pt-12">
        <div className="flex w-full max-w-[512px] flex-col items-center">
          <div
            key={`visual-${activeSlide}`}
            className={`welcome-visual relative overflow-hidden ${
              slide.visual === "logo"
                ? "w-64 max-w-[72vw] shadow-[0_2px_2px_rgba(0,0,0,0.06),0_4px_3px_rgba(0,0,0,0.07)]"
                : "w-full rounded-[1px] bg-[#e8f1eb]"
            }`}
          >
            <img
              src={
                slide.visual === "logo" ? centingRajaLogo : welcomeIllustration
              }
              alt={
                slide.visual === "logo"
                  ? "Logo Centing Raja"
                  : "Ibu dan tenaga kesehatan mendampingi bayi"
              }
              className={
                slide.visual === "logo"
                  ? "aspect-square w-full object-cover"
                  : "aspect-[512/279] w-full object-cover"
              }
            />
          </div>
          <div
            key={`copy-${activeSlide}`}
            className="welcome-copy mt-6 flex min-h-28 flex-col items-center text-center sm:mt-7"
          >
            <h1
              className={`font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-6 text-[#191c1d] ${
                slide.visual === "logo" ? "text-xl" : "text-base"
              }`}
            >
              {slide.title}
            </h1>
            {slide.description && (
              <p className="mt-1 max-w-[26rem] font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941] sm:text-base sm:leading-6">
                {slide.description}
              </p>
            )}
          </div>
        </div>
      </section>
      <nav
        className="flex min-h-[136px] shrink-0 flex-col justify-between bg-[#f8f9fa] px-6 pb-5 pt-5 shadow-[0_-4px_6px_rgba(0,0,0,0.05)] sm:px-10 sm:pb-6 sm:pt-6"
        aria-label="Kontrol pengenalan"
      >
        <Pagination activeSlide={activeSlide} onSelect={setActiveSlide} />
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onComplete}
            className="min-h-11 px-1 font-['Manrope:Regular',sans-serif] text-sm text-[#63747a] transition-colors hover:text-[#006d42]"
          >
            Lewati
          </button>
          <button
            type="button"
            onClick={advance}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#006d42] px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_3px_7px_rgba(0,109,66,0.22)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isLastSlide ? "Mulai" : "Lanjut"}
            <span aria-hidden="true" className="text-lg leading-none">
              →
            </span>
          </button>
        </div>
      </nav>
    </main>
  )
}

export function AboutScreen({ onComplete }: { onComplete: () => void }) {
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

export function ParentGuideScreen({
  nakes = false,

  kader = false,

  guideIndex = 0,

  onNext = () => {},
}: {
  nakes?: boolean

  kader?: boolean

  guideIndex?: number

  onNext?: () => void
}) {
  const [active, setActive] = useState(guideIndex)

  useEffect(() => {
    setActive(guideIndex)
  }, [guideIndex])

  const guideIconPaths = kader
    ? kaderGuidePaths
    : nakes
      ? nakesGuidePaths
      : parentGuidePaths

  const heroAsset = kader
    ? kaderGuideHero
    : nakes
      ? nakesGuideHero
      : parentGuideHero

  const logoAsset = kader
    ? kaderGuideLogo
    : nakes
      ? nakesGuideLogo
      : parentGuideLogo

  const guideItems = kader
    ? [
        {
          title: "Pantau Daftar Balita",

          text: "Lihat daftar lengkap balita di wilayah tugas Anda. Identifikasi balita yang belum diukur bulan ini untuk dilakukan kunjungan atau pemantauan.",

          path: guideIconPaths.p2233f880,

          viewBox: "0 0 16.667 13.333",

          detail: "Target Bulan Ini   24/30 Diukur",
        },

        {
          title: "Input Data Antropometri",

          text: "Catat hasil pengukuran Berat Badan (BB), Tinggi Badan (TB), dan Lingkar Kepala dengan teliti menggunakan alat standar (antropometri kit).",

          path: guideIconPaths.p15066600,

          viewBox: "0 0 16.667 16.688",

          detail: "Berat Badan  12.5 kg     Tinggi Badan  85.0 cm",
        },

        {
          title: "Edukasi & Kuis",

          text: "Tingkatkan kapasitas Anda dengan materi edukasi terbaru. Selesaikan kuis 5 pertanyaan wajib untuk memahami standar pengukuran tetap terjaga.",

          path: guideIconPaths.p617b400,

          viewBox: "0 0 16.667 10.833",

          detail: "Kuis Teknik Pengukuran   Wajib",
        },

        {
          title: "Pelaporan Berkala",

          text: "Kirimkan log pengukuran secara berkala kepada Tenaga Kesehatan (Nakes) desa untuk proses verifikasi dan analisa stunting lebih lanjut.",

          path: guideIconPaths.p1f853380,

          viewBox: "0 0 15 16.667",
        },
      ]
    : nakes
      ? [
          {
            title: "Kelola Akun Kader & Ortu",

            text: "Daftarkan dan verifikasi akun Kader serta Orang Tua menggunakan NIK dan nomor HP aktif. Anda memegang kendali penuh atas hak akses pengguna di wilayah Anda.",

            path: guideIconPaths.p2233f880,

            viewBox: "0 0 16.667 13.333",
          },

          {
            title: "Input & Validasi Data",

            text: "Masukkan data antropometri rujukan dan lakukan validasi atas laporan pengukuran rutin yang dikirimkan oleh Kader dari Posyandu.",

            path: guideIconPaths.p15066600,

            viewBox: "0 0 16.667 16.688",
          },

          {
            title: "Pantau Z-Score & Grafik",

            text: "Gunakan mesin kalkulasi Z-Score otomatis untuk memantau status stunting, gizi buruk, dan tren pertumbuhan anak di seluruh kecamatan Anda secara real-time.",

            path: guideIconPaths.p617b400,

            viewBox: "0 0 16.667 10.833",
          },

          {
            title: "Posting Materi & Kuis",

            text: "Tingkatkan kapasitas Kader dengan mengunggah materi edukasi terbaru dan buat kuis kompetensi interaktif untuk menguji pemahaman mereka.",

            path: guideIconPaths.p1f853380,

            viewBox: "0 0 15 16.667",
          },
        ]
      : [
          {
            title: "Pantau Status Tumbuh Kembang",

            text: "Ketahui status pertumbuhan anak secara real-time dan deteksi dini risiko stunting berdasarkan standar WHO.",

            path: parentGuidePaths.p2233f880,

            viewBox: "0 0 16.667 13.333",
          },

          {
            title: "Input Antropometri Mandiri",

            text: "Catat berat badan (BB), tinggi badan (TB), dan lingkar kepala si kecil langsung dari rumah setiap bulan.",

            path: parentGuidePaths.p15066600,

            viewBox: "0 0 16.667 16.688",
          },

          {
            title: "KMS Digital",

            text: "Lihat grafik pertumbuhan interaktif yang memvisualisasikan perkembangan anak dibandingkan dengan kurva ideal WHO.",

            path: parentGuidePaths.p617b400,

            viewBox: "0 0 16.667 10.833",
          },

          {
            title: "Jadwal Posyandu & Edukasi",

            text: "Dapatkan pengingat jadwal pengukuran posyandu terdekat dan akses materi edukasi kesehatan anak terkini.",

            path: parentGuidePaths.p1f853380,

            viewBox: "0 0 15 16.667",
          },
        ]

  return (
    <main
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-28 text-[#191c1d] lg:pb-32"
      aria-label="Panduan Detail Orang Tua"
    >
      <header className="sticky top-0 z-20 flex h-16 items-center border-b border-black/[0.03] bg-white/80 px-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl lg:px-5">
        <div className="flex items-center gap-3">
          <img
            src={logoAsset}
            alt="Logo Centing Raja"
            className="size-8 object-cover"
          />
          <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#006d42] lg:text-xl">
            Centing Raja
          </span>
        </div>
      </header>
      <div className="mx-auto w-full px-0 pt-0 lg:w-[82%] lg:max-w-[1180px] lg:pt-2">
        <section
          className="relative h-64 overflow-hidden rounded-b-[32px] bg-[#006d42] shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:h-72 lg:mx-0 lg:h-56 lg:rounded-[20px]"
          style={{
            backgroundImage: `url(${heroAsset})`,

            backgroundPosition: "center",

            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,109,66,0.94)] via-[rgba(0,109,66,0.52)] to-[rgba(0,109,66,0.14)]" />
          <div
            className="absolute inset-0 hidden bg-repeat-x opacity-40 lg:block"
            style={{
              backgroundImage: `url(${heroAsset})`,

              backgroundSize: "512px 279px",
            }}
          />
          <div className="relative z-10 flex h-full flex-col justify-end p-5 lg:p-8">
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8 text-black lg:text-[26px]">
              {kader
                ? "Panduan Detail Kader"
                : nakes
                  ? "Panduan Tenaga Kesehatan"
                  : "Panduan Detail Orang Tua"}
            </p>
            <p className="mt-1 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold text-white">
              {kader
                ? "Selamat datang, Kader Hebat!"
                : nakes
                  ? "Selamat datang, Pahlawan Kesehatan!"
                  : "Selamat Datang di Centing Raja"}
            </p>
            <p className="mt-1 max-w-xl font-['Manrope:Regular',sans-serif] text-sm leading-5 text-white/90">
              {kader
                ? "Langkah demi langkah dalam memantau dan mencatat pertumbuhan balita di posyandu Anda."
                : nakes
                  ? "Panduan ini akan membantu Anda mengelola data kesehatan masyarakat dan memantau tumbuh kembang anak dengan efektif."
                  : "Bersama kita pantau tumbuh kembang si kecil dengan mudah dan akurat dari rumah."}
            </p>
          </div>
        </section>
        <section className="relative z-10 mx-5 -mt-4 rounded-xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.1)] lg:mx-0 lg:mt-6">
          <div className="flex items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#76d69f] text-[#005c38]">
              <SvgIcon
                path={parentGuidePaths.p279a9400}
                viewBox="0 0 20 18.35"
                className="size-5"
              />
            </span>
            <div>
              <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold leading-5">
                {kader
                  ? "Panduan Kader"
                  : nakes
                    ? "Panduan Tenaga Kesehatan"
                    : "Panduan Orang Tua"}
              </h1>
              <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-5 text-[#3e4941] lg:text-sm">
                {kader
                  ? "Langkah demi langkah dalam memantau dan mencatat pertumbuhan balita di posyandu Anda."
                  : nakes
                    ? "Kelola data dan layanan kesehatan masyarakat secara terintegrasi melalui panduan ini."
                    : "Ikuti langkah-langkah sederhana ini untuk memaksimalkan penggunaan aplikasi dalam menjaga kesehatan anak Anda."}
              </p>
            </div>
          </div>
        </section>
        <section className="relative mx-5 mt-6 lg:mx-0 lg:mt-8">
          <div className="pointer-events-none absolute -right-64 bottom-[-64px] z-20 hidden h-[525px] w-[525px] lg:block xl:-right-72">
            <div className="raja-speech absolute right-64 top-2 z-10 w-[229px] rounded-[20px] border-[3px] border-[#76d69f] bg-white px-[11.5px] py-[14.5px] text-center text-[#191c1d] shadow-[0_3px_10px_rgba(0,109,66,0.10)] after:absolute after:bottom-[-12px] after:left-[42px] after:size-5 after:rotate-45 after:border-b-[3px] after:border-r-[3px] after:border-[#76d69f] after:bg-white">
              <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold leading-4">
                Haloo, Aku Raja!
              </p>
              <p className="mt-1 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-[10px] font-semibold leading-4">
                Maskot Centing Raja
              </p>
            </div>
            <img
              src={parentGuideMascot}
              alt="Raja, maskot Centing Raja"
              className="raja-mascot absolute bottom-0 left-1/2 h-[470px] w-[470px] -translate-x-1/2 object-contain"
            />
          </div>
          <div className="relative z-10 grid max-w-[520px] gap-4 md:grid-cols-2 md:gap-x-20 md:gap-y-12">
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-3 top-4 w-px bg-[#d8dddc] md:hidden"
            />
            {guideItems.map((item, index) => (
              <article key={item.title} className="relative z-10 flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#00804f] font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <div className="flex-1 rounded-xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                  <div className="flex gap-2 text-[#006d42]">
                    <SvgIcon
                      path={item.path}
                      viewBox={item.viewBox}
                      className="mt-0.5 size-4 shrink-0"
                    />
                    <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold leading-5 text-[#191c1d]">
                      {item.title}
                    </h2>
                  </div>
                  <p className="mt-2 font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#3e4941] lg:text-sm lg:leading-5">
                    {item.text}
                  </p>
                  {item.detail && (
                    <div className="mt-3 rounded-lg bg-[#f3f4f5] px-3 py-2 font-['Manrope:Regular',sans-serif] text-[11px] leading-4 text-[#3e4941]">
                      {item.detail}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 bg-[#f8f9fa] px-6 pb-5 pt-4 shadow-[0_-4px_6px_rgba(0,0,0,0.05)] lg:px-12 lg:pb-4">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3">
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Halaman ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  active === i ? "w-4 bg-[#006d42]" : "w-1.5 bg-[#dfe2e1]"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-2 py-2 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941] transition-colors hover:text-[#006d42]"
            >
              Lewati
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-full bg-[#006d42] px-6 py-3 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
            >
              Lanjut{" "}
              <SvgIcon
                path={parentGuidePaths.p32510800}
                viewBox="0 0 13.333 13.333"
                className="size-3.5"
              />
            </button>
          </div>
        </div>
      </nav>
    </main>
  )
}
