import { useState } from "react"

import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"
import { ParentGrowthChart } from "../../components/parent/parent-growth-chart"
import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { SvgIcon } from "../../components/ui/svg-icon"
import parentReminderPaths from "../../assets/icon-parent-reminder"
import parentChildSelectPaths from "../../assets/icon-child-select"

const parentDashboardLogo = "/logo/logo-centing-raja.png"
const parentEducationFood = "/images/piring-mpasi-seimbang.png"
const parentEducationPlay = "/images/ibu-dan-anak-bermain.png"

const childrenList = [
  { id: "leo", name: "Leo M.", age: "2.5 thn", initials: "LM" },
  { id: "kirana", name: "Kirana A.", age: "1.2 thn", initials: "KA" },
]

export function BerandaOrangTua({
  onMaterial,
  onInput,
}: {
  onMaterial: () => void
  onInput: () => void
}) {
  const [metric, setMetric] = useState<"Tinggi Badan" | "Berat Badan">("Tinggi Badan")
  const [isChildPickerOpen, setIsChildPickerOpen] = useState(false)
  const [selectedChild, setSelectedChild] = useState(childrenList[0])

  const metrics = [
    { label: "Tinggi Badan Saat Ini", value: "92", unit: "cm", range: "Normal (75th %ile)" },
    { label: "Berat Badan Saat Ini", value: "14.2", unit: "kg", range: "Normal (60th %ile)" },
  ]

  const articles = [
    {
      type: "Nutrisi",
      title: "Ide MPASI Padat Gizi untuk Kejar Berat Badan",
      copy: "Resep mudah dengan bahan lokal yang terbukti efektif meningkatkan berat badan...",
      image: parentEducationFood,
    },
    {
      type: "Stimulasi",
      title: "Pentingnya Stimulasi untuk Tumbuh Kembang Emas",
      copy: "Tinggi badan dipengaruhi nutrisi serta perkembangan anak sehari-hari...",
      image: parentEducationPlay,
    },
  ]

  return (
    <main data-reveal-page className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]" aria-label="Beranda Orang Tua">
      <ParentInputHeader logo={parentDashboardLogo} title="Beranda" />

<div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-8 sm:py-8">
          <section className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-['Manrope:Regular',sans-serif] text-sm text-[#4e5d55]">Selamat pagi,</p>
            <h1 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[26px] font-bold leading-8">Ibu Nisa</h1>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsChildPickerOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full bg-[#edeeef] px-3 py-2 font-['Manrope:SemiBold',sans-serif] text-xs text-[#191c1d] shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
            >
              <span className="grid size-6 place-items-center rounded-full bg-[#76d69f] text-[9px] text-[#005c38]">
                {selectedChild.initials}
              </span>
              {selectedChild.name} ({selectedChild.age})
              <SvgIcon
                path={parentChildSelectPaths.p4ab6c80}
                viewBox="0 0 9 5.55"
                className="h-1.5 w-2.5 text-[#3e4941]"
              />
            </button>

            {isChildPickerOpen && (
              <div className="absolute right-0 z-40 mt-2 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5">
                {childrenList.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => {
                      setSelectedChild(child)
                      setIsChildPickerOpen(false)
                    }}
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-['Manrope:Regular',sans-serif] text-sm transition-colors hover:bg-[#f3f4f5] ${
                      selectedChild.id === child.id ? "bg-[#e9f7ef]" : ""
                    }`}
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-[#76d69f] text-[10px] text-[#005c38]">
                      {child.initials}
                    </span>
                    <span>
                      {child.name} <span className="text-[#536478]">({child.age})</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="relative mt-4 overflow-hidden rounded-xl bg-[#76d69f] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-5">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-4 size-24 opacity-10"
            viewBox="0 0 96 96"
          >
            <path d={parentReminderPaths.p33085800} fill="#006d42" />
          </svg>
          <div className="relative flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/55 text-[#005c38]">
                <SvgIcon path={parentReminderPaths.p28cfa800} viewBox="0 0 20 12" className="h-3 w-5" />
              </span>
              <div className="min-w-0">
                <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#005c38] sm:text-lg">
                  Waktunya Pengukuran!
                </h2>
                <p className="mt-1 max-w-md font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#286148] sm:text-sm sm:leading-5">
                  Leo belum diukur bulan ini oleh Kader. Yuk, catat perkembangannya secara mandiri.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onInput}
                className="inline-flex min-h-8 items-center gap-1 rounded-full bg-[#007c4a] px-4 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
              >
                <SvgIcon path={parentReminderPaths.p38ac19c0} viewBox="0 0 10.5 10.5" className="size-3" />
                Input Data
              </button>
            </div>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          {metrics.map((item) => (
            <article key={item.label} className="rounded-xl bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)] sm:p-5">
              <p className="font-['Manrope:Regular',sans-serif] text-[10px] text-[#536478] sm:text-xs">{item.label}</p>
              <p className="mt-1 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-2xl font-bold text-[#007c4a] sm:text-3xl">
                {item.value}
                <span className="ml-1 font-['Manrope:Regular',sans-serif] text-sm font-normal text-[#3e4941]">
                  {item.unit}
                </span>
              </p>
              <span className="mt-2 inline-flex rounded bg-[#f0f1f1] px-2 py-1 font-['Manrope:Regular',sans-serif] text-[9px] text-[#56645d]">
                ◎ {item.range}
              </span>
            </article>
          ))}
        </section>

        {/* Grafik + Pojok Edukasi: side-by-side on desktop only */}
        <div className="lg:grid lg:grid-cols-[380px_1fr] lg:items-start lg:gap-6">
          <section className="mt-5 rounded-xl bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)] sm:mt-7 sm:p-5 lg:mt-7">
            <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold sm:text-xl">
              Grafik Tumbuh Kembang
            </h2>
            <div className="mt-3 flex rounded-full bg-[#f7f8f8] p-1 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setMetric("Tinggi Badan")}
                className={`min-h-7 flex-1 rounded-full px-3 py-2 transition sm:min-h-10 sm:py-2.5 sm:font-semibold ${
                  metric === "Tinggi Badan" ? "bg-[#76d69f] font-semibold text-[#005c38]" : "text-[#3e4941]"
                }`}
              >
                Tinggi Badan
              </button>
              <button
                type="button"
                onClick={() => setMetric("Berat Badan")}
                className={`min-h-7 flex-1 rounded-full px-3 py-2 transition sm:min-h-10 sm:py-2.5 sm:font-semibold ${
                  metric === "Berat Badan" ? "bg-[#76d69f] font-semibold text-[#005c38]" : "text-[#3e4941]"
                }`}
              >
                Berat Badan
              </button>
            </div>
            <ParentGrowthChart key={metric} metric={metric} />
          </section>

          <section className="mt-5 sm:mt-7 lg:mt-7">
            <div className="flex items-center justify-between">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold sm:text-xl">
                Pojok Edukasi
              </h2>
              <button
                type="button"
                className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#007c4a]"
              >
                Lihat Semua
              </button>
            </div>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 lg:grid-cols-2">
              {articles.map((article) => (
                <article
                  key={article.title}
                  className="min-w-[190px] overflow-hidden rounded-xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] sm:min-w-0"
                >
                  <img src={article.image} alt="" className="aspect-[1.65/1] w-full object-cover" />
                  <div className="p-2.5">
                    <span className="rounded bg-[#eaf3ff] px-2 py-1 font-['Manrope:Regular',sans-serif] text-[9px] text-[#58718e]">
                      {article.type}
                    </span>
                    <h3 className="mt-2 font-['Manrope:SemiBold',sans-serif] text-[11px] leading-4 text-[#191c1d]">
                      {article.title}
                    </h3>
                    <p className="mt-2 font-['Manrope:Regular',sans-serif] text-[10px] leading-4 text-[#65736c]">
                      {article.copy}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <ParentBottomNav
        onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMaterial={onMaterial}
        onInput={onInput}
      />
    </main>
  )
}