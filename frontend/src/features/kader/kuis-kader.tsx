import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { ProfileHeader } from "../../components/kader/profile-header"
import { SvgIcon } from "../../components/ui/svg-icon"

import quizPaths from "../../assets/icon-quiz"

export function KuisKader({
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
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000)
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
    <main className="min-h-svh bg-[#f8f9fa] px-5 pb-10 pt-20 text-[#191c1d] sm:px-8">
      <ProfileHeader title="Kuis Kader" onBack={onBack} />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-6xl rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] sm:p-7 xl:p-10"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941]">
            Pertanyaan {questionIndex + 1} dari {questions.length}
          </span>
          <span className="text-sm font-semibold text-[#006d42]">
            {Math.round(((questionIndex + 1) / questions.length) * 100)}% Selesai
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e1e3e4]">
          <div
            className="h-full rounded-full bg-[#006d42] transition-[width] duration-300"
            style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-full bg-[#e9f7ef] text-[#005c38]">
            <SvgIcon path={quizPaths.p1a168100} viewBox="0 0 15.8125 16.6667" className="size-6" />
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
        <p className="mt-3 max-w-2xl text-sm leading-5 text-[#3e4941]">{question.hint}</p>
        <div className="mt-7 space-y-3">
          {question.options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => setAnswers((value) => ({ ...value, [questionIndex]: index }))}
              className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left text-sm leading-5 transition ${
                selected === index ? "border-[#006d42] bg-[#e9f7ef]" : "border-[#d8dddc] bg-white hover:border-[#006d42]/50"
              }`}
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full border font-['Manrope:SemiBold',sans-serif] text-xs ${
                  selected === index ? "border-[#006d42] bg-[#006d42] text-white" : "border-[#b8c1bd] text-[#536478]"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>
        <div className={`mt-8 flex items-center gap-3 ${questionIndex === 0 ? "justify-end" : "justify-between"}`}>
          {questionIndex > 0 && (
            <button
              type="button"
              onClick={backQuestion}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#cfd8d3] bg-white px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941] transition hover:border-[#006d42] hover:text-[#006d42] active:scale-[0.98]"
            >
              <SvgIcon path={quizPaths.p225a8cc0} viewBox="0 0 11.775 20" className="h-4 w-2.5" />
              Kembali
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={selected === undefined}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#006d42] px-6 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white transition hover:bg-[#005c38] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isLast ? "Selesai" : "Selanjutnya"}
            <SvgIcon path={quizPaths.p32510800} viewBox="0 0 13.3333 13.3333" className="size-4" />
          </button>
        </div>
      </motion.section>

      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="submit-quiz-title">
          <section className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#e9f7ef] text-xl font-bold text-[#006d42]">?</span>
            <h2 id="submit-quiz-title" className="mt-5 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#191c1d]">
              Kirim jawaban?
            </h2>
            <p className="mt-2 font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#3e4941]">
              Apakah Anda yakin ingin mengirim jawaban?
            </p>
            <div className="mt-7 flex gap-3">
              <button type="button" onClick={() => setShowSubmitConfirm(false)} className="min-h-12 flex-1 rounded-full border border-[#cfd8d3] font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941]">
                Batal
              </button>
              <button type="button" onClick={submitQuiz} className="min-h-12 flex-1 rounded-full bg-[#006d42] font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white">
                Iya, Kirim
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}