import { useEffect, useState } from "react"

import { useLocation } from "react-router-dom"

import { motion } from "framer-motion"

import { ProfileHeader } from "../../components/kader/profile-header"

import { SvgIcon } from "../../components/ui/svg-icon"

import {
  getKaderQuizSubmissions,
  getQuizQuestions,
  type QuizQuestion,
  type QuizSubmission,
} from "../../lib/api"

import type { QuizCompletionData, QuizResultSummaryItem } from "./kuis-kader"

import resultPaths from "../../assets/icon-result"

const resultMascot = "/images/ilustrasi-berhasil.png"

type SubmissionAnswer = {
  question_id: string

  selected_option: string

  is_correct?: boolean
}

function parseOptions(options: QuizQuestion["options"]): string[] {
  if (Array.isArray(options)) return options

  try {
    const parsed = JSON.parse(options)

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return typeof options === "string"
      ? options.split("\n").filter(Boolean)
      : []
  }
}

function parseSubmissionAnswers(
  submission: QuizSubmission,
): SubmissionAnswer[] {
  if (Array.isArray(submission.answers)) return submission.answers

  try {
    const parsed = JSON.parse(submission.answers)

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function buildSummary(
  questions: QuizQuestion[],
  answers: SubmissionAnswer[],
): QuizResultSummaryItem[] {
  return questions.map((question) => {
    const answer = answers.find((item) => item.question_id === question.id)

    const options = parseOptions(question.options)

    const correctAnswer = question.correct_ans ?? ""

    const correctIndex = Number.parseInt(correctAnswer, 10)

    const correctText =
      !Number.isNaN(correctIndex) &&
      correctIndex >= 0 &&
      correctIndex < options.length
        ? options[correctIndex]
        : correctAnswer

    const selected = answer?.selected_option || "Tidak dijawab"

    const correct =
      typeof answer?.is_correct === "boolean"
        ? answer.is_correct
        : selected === correctText

    return {
      question: question.question_text,

      answer: correct ? `Jawaban: ${selected}` : `Jawaban Anda: ${selected}`,

      detail: correct || !correctText ? undefined : `Benar: ${correctText}`,

      correct,
    }
  })
}

export function ResultKader({
  onHome,

  onBack,
}: {
  onHome: () => void

  onBack: () => void
}) {
  const location = useLocation()

  const stateData = location.state as QuizCompletionData | undefined

  const [score, setScore] = useState<number>(stateData?.score ?? 0)

  const [correctCount, setCorrectCount] = useState<number>(
    stateData?.correctCount ?? 0,
  )

  const [totalQuestions, setTotalQuestions] = useState<number>(
    stateData?.totalQuestions ?? 0,
  )

  const [answerSummary, setAnswerSummary] = useState<QuizResultSummaryItem[]>(
    stateData?.summary ?? [],
  )

  const [loading, setLoading] = useState(!stateData)

  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (stateData) return

    let active = true

    getKaderQuizSubmissions()

      .then(async (submissions) => {
        const latest = [...submissions].sort((a, b) => {
          return (
            new Date(b.submitted_at || 0).getTime() -
            new Date(a.submitted_at || 0).getTime()
          )
        })[0]

        if (!latest) {
          throw new Error("Belum ada hasil kuis.")
        }

        const questions = await getQuizQuestions(latest.quiz_id)

        const answers = parseSubmissionAnswers(latest)

        const summary = buildSummary(questions, answers)

        const resolvedCorrectCount = summary.filter(
          (item) => item.correct,
        ).length

        if (!active) return

        setScore(Math.round(latest.score))

        setCorrectCount(resolvedCorrectCount)

        setTotalQuestions(questions.length || answers.length)

        setAnswerSummary(summary)
      })

      .catch(() => {
        if (active)
          setLoadError(
            "Hasil kuis gagal dimuat. Silakan kembali dan coba lagi.",
          )
      })

      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [stateData])

  const headline =
    score >= 80
      ? "Luar Biasa, Kader Hebat!"
      : score >= 60
        ? "Bagus, Tetap Semangat!"
        : "Jangan Menyerah, Pelajari Lagi!"

  const achievementTitle =
    score >= 80
      ? "Pemahaman Anda sudah sangat baik."
      : score >= 60
        ? "Pemahaman Anda cukup baik."
        : "Perlu pendalaman materi kembali."

  const achievementDesc =
    score >= 80
      ? "Terus tingkatkan wawasan tentang pencegahan stunting agar pendampingan keluarga di Posyandu semakin optimal."
      : score >= 60
        ? "Pelajari kembali materi edukasi untuk meningkatkan pemahaman Anda seputar pencegahan stunting."
        : "Silakan baca kembali materi edukasi dan ulangi kuis untuk memperkuat pemahaman Anda."

  return (
    <main
      className="min-h-svh bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]"
      aria-label="Hasil kuis kader"
    >
      <ProfileHeader title="Hasil Kuis" onBack={onBack} />
      {loading && (
        <p className="mx-auto max-w-6xl px-5 py-6 text-center text-sm text-[#536478]">
          Memuat hasil kuis...
        </p>
      )}
      {loadError && (
        <p
          role="alert"
          className="mx-auto max-w-6xl px-5 py-6 text-center text-sm text-[#d84747]"
        >
          {loadError}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl"
      >
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
              {headline}
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
                    {score}
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
                {correctCount} dari {totalQuestions} Jawaban Benar
              </span>
            </div>
            <div className="rounded-2xl bg-[#f4fbf6] p-5 text-left xl:p-6">
              <p className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold uppercase tracking-[0.12em] text-[#006d42]">
                Pencapaian Kader
              </p>
              <h2 className="mt-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#005c38]">
                {achievementTitle}
              </h2>
              <p className="mt-2 font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#3e4941]">
                {achievementDesc}
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
            className="min-h-12 w-full rounded-full bg-[#007c4a] px-6 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_5px_12px_rgba(0,109,66,0.20)] transition hover:bg-[#006d42] active:scale-[0.98]"
          >
            Kembali ke Beranda
          </button>
        </div>
      </motion.div>
    </main>
  )
}
