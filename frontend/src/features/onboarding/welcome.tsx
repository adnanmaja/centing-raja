import { useEffect, useState } from "react"

const welcomeIllustration =
  "/images/ilustrasi-panduan-singkat.png"

const centingRajaLogo =
  "/logo/logo-centing-raja.png"

const slides = [
  {
    title: "Selamat Datang di Centing Raja",
    description:
      "Bersama kita pantau tumbuh kembang anak untuk masa depan yang lebih cerah dan sehat.",
    visual: "illustration",
  },

  { title: "Apa itu Centing Raja ?", description: "", visual: "logo" },
]

export function Welcome({ onComplete }: { onComplete: () => void }) {
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

function Pagination({
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
