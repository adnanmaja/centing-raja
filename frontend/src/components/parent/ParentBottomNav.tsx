import { SvgIcon } from "../ui/SvgIcon"

import parentDashboardPaths from "../../assets/icon-parent-dashboard"

import parentInputPaths from "../../assets/icon-parent-input"

export function ParentBottomNav({
  onHome,

  onMaterial,

  onInput,

  active = "Beranda",
}: {
  onHome: () => void

  onMaterial: () => void

  onInput?: () => void

  active?: "Beranda" | "Materi" | "Input"
}) {
  const passive = (label: string, icon: string, viewBox: string) => (
    <button
      type="button"
      onClick={() => window.alert(`${label} akan segera tersedia.`)}
      className="flex flex-col items-center gap-1 text-[#536478]"
    >
      <SvgIcon path={icon} viewBox={viewBox} className="size-5" />
      <span className="font-['Manrope:Regular',sans-serif] text-[10px]">
        {label}
      </span>
    </button>
  )

  const navButton = (
    label: "Beranda" | "Materi" | "Input",

    icon: string,

    viewBox: string,

    onClick: () => void,
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${
        active === label ? "text-[#007c4a]" : "text-[#536478]"
      }`}
    >
      <SvgIcon path={icon} viewBox={viewBox} className="size-5" />
      <span className="font-['Manrope:SemiBold',sans-serif] text-[10px]">
        {label}
      </span>
    </button>
  )

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl"
      aria-label="Navigasi Orang Tua"
    >
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-4 items-center px-2 sm:px-8">
        {navButton(
          "Beranda",

          parentDashboardPaths.p12a32500,

          "0 0 16 18",

          onHome,
        )}
        {navButton(
          "Materi",

          parentDashboardPaths.p378800,

          "0 0 22 16",

          onMaterial,
        )}
        {navButton(
          "Input",

          parentInputPaths.p2d8e4cc0,

          "0 0 20 20",

          onInput ?? (() => window.alert("Input data akan segera tersedia.")),
        )}
        {passive("Profil", parentDashboardPaths.p3189a600, "0 0 12 12")}
      </div>
    </nav>
  )
}
