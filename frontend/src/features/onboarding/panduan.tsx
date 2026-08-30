import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { SvgIcon } from "../../components/ui/svg-icon"
import parentGuidePaths from "../../assets/icon-guide-parent"
import nakesGuidePaths from "../../assets/icon-guide-nakes"
import kaderGuidePaths from "../../assets/icon-guide-kader"

const parentGuideHero = "/images/ilustrasi-ibu-anak.png"
const parentGuideLogo = "/logo/logo-centing-raja.png"
const nakesGuideHero = "/images/hero-panduan-nakes.png"
const nakesGuideLogo = "/logo/logo-centing-raja.png"
const kaderGuideHero = "/images/hero-panduan-kader.png"
const kaderGuideLogo = "/logo/logo-centing-raja.png"

export function Panduan({
  nakes = false,
  kader = false,
  guideIndex = 0,
  onNext = () => {},
  onSkip,
  onBack,
}: {
  nakes?: boolean
  kader?: boolean
  guideIndex?: number
  onNext?: () => void
  onSkip?: () => void
  onBack?: () => void
}) {
  const [active, setActive] = useState(guideIndex)

  useEffect(() => {
    setActive(guideIndex)
  }, [guideIndex])

  const guideIconPaths = kader ? kaderGuidePaths : nakes ? nakesGuidePaths : parentGuidePaths
  const heroAsset = kader ? kaderGuideHero : nakes ? nakesGuideHero : parentGuideHero
  const logoAsset = kader ? kaderGuideLogo : nakes ? nakesGuideLogo : parentGuideLogo

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
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-28 text-[#191c1d] lg:pb-32"
      aria-label="Panduan Detail Orang Tua"
    >
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-black/[0.03] bg-white/80 px-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:px-8">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f3f4f5] text-lg leading-none text-[#191c1d] transition-colors hover:bg-[#e8eaea]"
            aria-label="Kembali"
          >
            ‹
          </button>
        )}
        <div className="flex items-center gap-3">
          <img src={logoAsset} alt="Logo Centing Raja" className="size-8 object-cover" />
          <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#006d42] lg:text-xl">
            Centing Raja
          </span>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 pt-0 sm:px-8 lg:pt-6">
        <section
          className="relative -mx-5 h-64 overflow-hidden rounded-b-[32px] bg-[#006d42] shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:-mx-8 sm:h-72 lg:mx-0 lg:h-56 lg:rounded-[20px]"
          style={{
            backgroundImage: `url(${heroAsset})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,109,66,0.94)] via-[rgba(0,109,66,0.52)] to-[rgba(0,109,66,0.14)]" />
          <div
            className="absolute inset-0 hidden bg-repeat-x opacity-40 lg:block"
            style={{ backgroundImage: `url(${heroAsset})`, backgroundSize: "512px 279px" }}
          />
          <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6 lg:p-8">
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8 text-black">
              {kader ? "Panduan Detail Kader" : nakes ? "Panduan Tenaga Kesehatan" : "Panduan Detail Orang Tua"}
            </p>
            <p className="mt-1 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold text-white">
              {kader ? "Selamat datang, Kader Hebat!" : nakes ? "Selamat datang, Pahlawan Kesehatan!" : "Selamat Datang di Centing Raja"}
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

        <section className="relative z-10 -mt-4 rounded-xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.1)] lg:mt-6">
          <div className="flex items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#76d69f] text-[#005c38]">
              <SvgIcon path={parentGuidePaths.p279a9400} viewBox="0 0 20 18.35" className="size-5" />
            </span>
            <div>
              <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-sm font-semibold leading-5">
                {kader ? "Panduan Kader" : nakes ? "Panduan Tenaga Kesehatan" : "Panduan Orang Tua"}
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

        <section className="relative mt-6 lg:mt-8">
          <div className="relative z-10 grid gap-4 md:grid-cols-2 md:gap-x-8 md:gap-y-8 lg:gap-x-10">
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-3 top-4 w-px bg-[#d8dddc] md:hidden"
            />
            {guideItems.map((item, index) => (
              <article key={item.title} className="relative z-10 flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#00804f] font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <div className="flex-1 rounded-xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)] lg:p-6">
                  <div className="flex gap-2 text-[#006d42]">
                    <SvgIcon path={item.path} viewBox={item.viewBox} className="mt-0.5 size-4 shrink-0" />
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

      <nav className="fixed inset-x-0 bottom-0 z-30 bg-[#f8f9fa] px-5 pb-5 pt-4 shadow-[0_-4px_6px_rgba(0,0,0,0.05)] sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3">
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
              onClick={onSkip}
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
              <SvgIcon path={parentGuidePaths.p32510800} viewBox="0 0 13.333 13.333" className="size-3.5" />
            </button>
          </div>
        </div>
      </nav>
    </motion.main>
  )
}