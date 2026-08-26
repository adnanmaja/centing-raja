import React, { useEffect, useRef, useState } from "react"

export function VerifikasiOtp({
  phone,

  onBack,

  onVerified,
}: {
  phone: string

  onBack: () => void

  onVerified: () => void
}) {
  const [code, setCode] = useState(["", "", "", "", ""])

  const [resendNote, setResendNote] = useState("")

  const inputs = useRef<Array<HTMLInputElement | null>>([])

  const displayPhone = phone || "081234567890"

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)

    setCode((previous) =>
      previous.map((item, itemIndex) => (itemIndex === index ? digit : item)),
    )

    if (digit && index < 4) inputs.current[index + 1]?.focus()
  }

  const onKeyDown = (
    index: number,

    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !code[index] && index > 0)
      inputs.current[index - 1]?.focus()
  }

  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const digits = event.clipboardData

      .getData("text")

      .replace(/\D/g, "")

      .slice(0, 5)

      .split("")

    setCode(Array.from({ length: 5 }, (_, index) => digits[index] ?? ""))

    inputs.current[Math.min(digits.length, 4)]?.focus()
  }

  const completed = code.every(Boolean)

  return (
    <main
      data-reveal-page
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#006d42] px-5 py-12 text-white"
      aria-label="Verifikasi SMS OTP"
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 top-12 size-64 rounded-full bg-[#51a877]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-20 size-72 rounded-full bg-[#024e31]/40 blur-3xl"
      />
      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-5 z-20 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-['Manrope:Regular',sans-serif] text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffbb02] lg:left-10 lg:top-10"
        aria-label="Kembali ke pendaftaran"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          ←
        </span>
        Kembali
      </button>
      <section className="relative z-10 w-full max-w-[390px] text-center lg:max-w-[580px] lg:rounded-[28px] lg:bg-white/5 lg:px-16 lg:py-16 lg:shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
        <div className="mx-auto grid size-16 place-items-center rounded-[22px] bg-white/10 text-3xl shadow-inner shadow-white/10">
          ✉
        </div>
        <h1 className="mt-8 font-['SF_Pro_Rounded:Semibold',sans-serif] text-2xl font-semibold tracking-tight lg:text-[28px]">
          Cek SMS mu!
        </h1>
        <p className="mt-3 font-['SF_Pro:Regular',sans-serif] text-base leading-6 text-white/90">
          Kami baru saja mengirim kode OTP ke
        </p>
        <p className="mt-1 break-all font-['Manrope:Regular',sans-serif] text-base font-semibold text-[#ffdf7f]">
          {displayPhone}
        </p>
        <div
          className="mt-8 flex justify-center gap-2.5 sm:gap-3"
          onPaste={onPaste}
        >
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputs.current[index] = element
              }}
              value={digit}
              onChange={(event) => updateDigit(index, event.target.value)}
              onKeyDown={(event) => onKeyDown(index, event)}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              aria-label={`Digit OTP ke-${index + 1}`}
              maxLength={1}
              className="size-11 rounded-[10px] border border-[#ff9ae8] bg-white/5 text-center font-['Inter:Regular',sans-serif] text-xl text-white outline-none transition focus:border-[#ffbb02] focus:bg-white/10 focus:ring-2 focus:ring-[#ffbb02]/35 sm:size-12"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onVerified}
          disabled={!completed}
          className="mt-11 inline-flex min-h-11 min-w-32 items-center justify-center rounded-[10px] bg-[#ffbb02] px-6 font-['SF_Compact_Rounded:Bold',sans-serif] text-base font-bold text-white shadow-[0_4px_0_#ff8601] transition hover:brightness-105 active:translate-y-px active:shadow-[0_2px_0_#ff8601] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Verifikasi
        </button>
        <p className="mt-10 font-['Inter:Regular',sans-serif] text-[13px] text-white/90">
          Tidak melihat kode?{" "}
          <button
            type="button"
            onClick={() => setResendNote("Kode OTP baru telah dikirim.")}
            className="font-semibold text-[#ffbb02] underline decoration-2 underline-offset-4"
          >
            kirim ulang
          </button>
        </p>
        {resendNote && (
          <p className="mt-3 text-xs text-[#ffdf7f]" role="status">
            {resendNote}
          </p>
        )}
      </section>
    </main>
  )
}
