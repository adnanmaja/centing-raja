import { SvgIcon } from "../ui/svg-icon"
import tasksPaths from "../../assets/icon-tasks"
import bottomMaterialPaths from "../../assets/icon-bottom-material"
import bottomProfilePaths from "../../assets/icon-bottom-profile"

export function ProfileBottomNav({
  onHome,
  onMaterial,
  onTasks,
  onProfile,
  active = "Beranda",
}: {
  onHome: () => void
  onMaterial: () => void
  onTasks: () => void
  onProfile: () => void
  active?: "Beranda" | "Materi" | "Tugas" | "Profil"
}) {
  const items = [
    { label: "Beranda" as const, icon: tasksPaths.p12a32500, viewBox: "0 0 16 18", onClick: onHome },
    { label: "Materi" as const, icon: bottomMaterialPaths.p378800, viewBox: "0 0 22 16", onClick: onMaterial },
    { label: "Tugas" as const, icon: tasksPaths.p1de35f80, viewBox: "0 0 18 20", onClick: onTasks },
    { label: "Profil" as const, icon: bottomProfilePaths.p3de21300, viewBox: "0 0 20 20", onClick: onProfile },
  ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-white/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl"
      aria-label="Navigasi Kader"
    >
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-4 items-center px-2 sm:px-8">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={`flex flex-col items-center gap-1 ${
              active === item.label ? "text-[#007c4a]" : "text-[#536478]"
            }`}
          >
            <SvgIcon path={item.icon} viewBox={item.viewBox} className="size-5" />
            <span className="font-['Manrope:SemiBold',sans-serif] text-[10px]">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}