import { useEffect, useState } from "react"

import { motion } from "framer-motion"

import { ProfileHeader } from "../../components/kader/profile-header"

import { SvgIcon } from "../../components/ui/svg-icon"

import {
  getQuizzes,
  getQuizQuestions,
  submitQuiz as submitQuizApi,
  type Quiz,
  type QuizQuestion,
} from "../../lib/api"

import quizPaths from "../../assets/icon-quiz"

export interface QuizResultSummaryItem {
  question: string

  answer: string

  detail?: string

  correct: boolean
}

export interface QuizCompletionData {
  score: number

  totalQuestions: number

  correctCount: number

  summary: QuizResultSummaryItem[]
}

interface LocalQuestion {
  id: string

  question: string

  hint: string

  options: string[]

  correctAnsIndex: number | null
}

function parseOptions(options: string[] | string | undefined): string[] {
  if (Array.isArray(options)) return options

  if (typeof options === "string") {
    try {
      const parsed = JSON.parse(options)

      if (Array.isArray(parsed)) return parsed
    } catch {
      return options.split("\n").filter(Boolean)
    }
  }

  return []
}

export function KuisKader({
  onBack,

  onComplete,
}: {
  onBack: () => void

  onComplete: (data?: QuizCompletionData) => void
}) {
  const quizDurationSeconds = 15 * 60

  const [secondsLeft, setSecondsLeft] = useState(quizDurationSeconds)

  const [questionIndex, setQuestionIndex] = useState(0)

  const [answers, setAnswers] = useState<Record<number, number>>({})

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)

  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)

  const [questions, setQuestions] = useState<LocalQuestion[]>([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [loading, setLoading] = useState(true)

  const [loadError, setLoadError] = useState<string | null>(null)

  const [submissionError, setSubmissionError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getQuizzes(10, 0)

      .then(async (quizList) => {
        if (!active) return

        const quiz = quizList[0]

        if (!quiz) {
          setLoadError("Belum ada kuis yang tersedia.")

          return
        }

        setActiveQuiz(quiz)

        const qData = await getQuizQuestions(quiz.id)

        if (!active) return

        const formatted = qData.map((q, idx): LocalQuestion => {
          const options = parseOptions(q.options)

          let correctIdx: number | null = null

          if (q.correct_ans !== undefined && q.correct_ans !== null) {
            const numericIndex = Number.parseInt(q.correct_ans, 10)

            if (
              !Number.isNaN(numericIndex) &&
              numericIndex >= 0 &&
              numericIndex < options.length
            ) {
              correctIdx = numericIndex
            } else {
              const textIndex = options.findIndex(
                (option) => option.trim() === q.correct_ans?.trim(),
              )

              if (textIndex >= 0) correctIdx = textIndex
            }
          }

          return {
            id: q.id || `question-${idx}`,

            question: q.question_text,

            hint: "Pilih satu jawaban yang paling tepat.",

            options,

            correctAnsIndex: correctIdx,
          }
        })

        if (formatted.length === 0) {
          setLoadError("Kuis ini belum memiliki pertanyaan.")
        } else if (
          formatted.some((question) => question.options.length === 0)
        ) {
          setLoadError(
            "Pertanyaan kuis belum memiliki pilihan jawaban yang valid.",
          )
        } else {
          setQuestions(formatted)
        }
      })

      .catch(() => {
        if (active) setLoadError("Kuis gagal dimuat. Silakan coba lagi.")
      })

      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

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

  const handleSubmitQuiz = async () => {
    if (!activeQuiz || questions.length === 0) return

    setShowSubmitConfirm(false)

    setSubmissionError(null)

    setIsSubmitting(true)

    let correctCount = 0

    const summary: QuizResultSummaryItem[] = []

    const submissionAnswers = questions.map((q, idx) => {
      const chosenIndex = answers[idx]

      const isChosen = chosenIndex !== undefined

      const chosenText = isChosen ? q.options[chosenIndex] : "Tidak dijawab"

      const isCorrect =
        isChosen &&
        q.correctAnsIndex !== null &&
        chosenIndex === q.correctAnsIndex

      const correctText =
        q.correctAnsIndex === null ? "" : q.options[q.correctAnsIndex] || ""

      if (isCorrect) correctCount++

      summary.push({
        question: q.question,

        answer: isCorrect
          ? `Jawaban: ${chosenText}`
          : `Jawaban Anda: ${chosenText}`,

        detail: isCorrect || !correctText ? undefined : `Benar: ${correctText}`,

        correct: isCorrect,
      })

      return {
        question_id: q.id,

        selected_option: chosenText,

        is_correct: isCorrect,
      }
    })

    const score = Math.round((correctCount / questions.length) * 100)

    try {
      await submitQuizApi(activeQuiz.id, {
        score,

        answers: submissionAnswers,
      })

      setIsSubmitting(false)

      onComplete({
        score,

        totalQuestions: questions.length,

        correctCount,

        summary,
      })
    } catch {
      setIsSubmitting(false)

      setSubmissionError(
        "Jawaban gagal disimpan. Periksa koneksi lalu coba lagi.",
      )
    }
  }

  return (
    <main className="min-h-svh bg-[#f8f9fa] px-5 pb-10 pt-20 text-[#191c1d] sm:px-8">
      <ProfileHeader title="Kuis Kader" onBack={onBack} />
      {loading && (
        <p className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-8 text-center text-sm text-[#536478]">
          Memuat kuis...
        </p>
      )}
      {loadError && (
        <p
          role="alert"
          className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-8 text-center text-sm text-[#d84747]"
        >
          {loadError}
        </p>
      )}

      {!loading && !loadError && (
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
              {Math.round(((questionIndex + 1) / questions.length) * 100)}%
              Selesai
            </span>
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
            {question?.question || "Memuat pertanyaan..."}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-5 text-[#3e4941]">
            {question?.hint || ""}
          </p>
          <div className="mt-7 space-y-3">
            {(question?.options || []).map((option, index) => (
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
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#cfd8d3] bg-white px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941] transition hover:border-[#006d42] hover:text-[#006d42] active:scale-[0.98]"
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
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#006d42] px-6 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white transition hover:bg-[#005c38] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isLast ? "Selesai" : "Selanjutnya"}
              <SvgIcon
                path={quizPaths.p32510800}
                viewBox="0 0 13.3333 13.3333"
                className="size-4"
              />
            </button>
          </div>
        </motion.section>
      )}
      {submissionError && (
        <p
          role="alert"
          className="mx-auto mt-4 w-full max-w-6xl rounded-xl bg-[#fff4f3] p-4 text-center text-sm text-[#d84747]"
        >
          {submissionError}
        </p>
      )}

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
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                disabled={isSubmitting}
                className="min-h-11 rounded-full bg-[#f3f4f5] font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941] transition hover:bg-[#e7e9e8]"
              >
                Periksa Lagi
              </button>
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
                className="min-h-11 rounded-full bg-[#007c4a] font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,109,66,0.20)] transition hover:bg-[#006d42]"
              >
                {isSubmitting ? "Mengirim..." : "Ya, Selesaikan"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
