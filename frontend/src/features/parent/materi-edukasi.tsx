import { useState } from "react"
import { motion } from "framer-motion"

import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"
import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { SvgIcon } from "../../components/ui/svg-icon"
import { parentMaterialItems } from "./parent-materials"

const parentMaterialsLogo = "/logo/logo-centing-raja.png"

export function MateriEdukasi({
  onHome,
  onInput,
  onOpen,
}: {
  onHome: () => void
  onInput: () => void
  onOpen: (material: typeof parentMaterialItems[number]) => void
}) {
  const [filter, setFilter] = useState("Semua")

  const filters = ["Semua", "Gizi & MPASI", "Pola Asuh", "Sanitasi"]

  const visible =
    filter === "Semua" ? parentMaterialItems : parentMaterialItems.filter((item) => item.category === filter)

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-reveal-page
      className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]"
      aria-label="Materi Edukasi"
    >
      <ParentInputHeader logo={parentMaterialsLogo} title="Materi" />

<div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-8 sm:py-8">
          <section className="rounded-xl bg-[#dbeafd] p-4 sm:p-6">
          <div className="flex gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#006d42]">
              📖
            </span>
            <div>
              <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#536478] sm:text-xl">
                Materi Edukasi Stunting
              </h1>
              <p className="mt-2 max-w-xl font-['Manrope:Regular',sans-serif] text-xs leading-5 text-[#536478] sm:text-sm">
                Kumpulan panduan tepercaya dan tips praktis langsung dari ahli
                gizi Puskesmas untuk mendampingi tumbuh kembang si kecil.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`min-h-9 shrink-0 rounded-full px-4 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold transition ${
                filter === item
                  ? "bg-[#006d42] text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
                  : "bg-[#e7e8e9] text-[#191c1d]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="flex min-h-[145px] flex-col rounded-xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
            >
              <div className="flex gap-3">
                <span className={`grid size-10 shrink-0 place-items-center rounded-full ${item.iconBox}`}>
                  <SvgIcon path={item.icon} viewBox="0 0 21 25.083" className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold leading-5">
                    {item.title}
                  </h2>
                  <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-4 text-[#65736c]">
                    {item.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="mt-auto self-end pt-4 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#007c4a]"
              >
                Buka Materi →
              </button>
            </motion.article>
          ))}
        </section>
      </div>

      <ParentBottomNav onHome={onHome} onMaterial={() => undefined} onInput={onInput} active="Materi" />
    </motion.main>
  )
}