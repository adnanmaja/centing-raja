import { SvgIcon } from "../ui/svg-icon"

import tasksPaths from "../../assets/icon-tasks"

import bottomMaterialPaths from "../../assets/icon-bottom-material"

import bottomProfilePaths from "../../assets/icon-bottom-profile"

export function ProfileBottomNav({
  onHome,

  onMaterial,

  onTasks,

  onProfile,
}: {
  onHome: () => void

  onMaterial: () => void

  onTasks: () => void

  onProfile: () => void
}) {
  const items = [
    {
      label: "Beranda",

      icon: tasksPaths.p12a32500,

      viewBox: "0 0 16 18",

      onClick: onHome,
    },

    {
      label: "Materi",

      icon: bottomMaterialPaths.p378800,

      viewBox: "0 0 22 16",

      onClick: onMaterial,
    },

    {
      label: "Tugas",

      icon: tasksPaths.p1de35f80,

      viewBox: "0 0 18 20",

      onClick: onTasks,
    },
  ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-white/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl"
      aria-label="Navigasi utama"
    >
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-4 items-center px-2 sm:px-8">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className="flex min-w-0 flex-col items-center gap-1 text-[#3e4941]"
          >
            <SvgIcon
              path={item.icon}
              viewBox={item.viewBox}
              className="size-5"
            />
            <span className="font-['Manrope:Regular',sans-serif] text-[10px]">
              {item.label}
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={onProfile}
          className="flex min-w-0 flex-col items-center gap-1 text-[#007c4a]"
        >
          <span className="grid size-8 place-items-center rounded-[10px] bg-[#006d42]/10">
            <SvgIcon
              path={bottomProfilePaths.p3de21300}
              viewBox="0 0 20 20"
              className="size-5"
            />
          </span>
          <span className="font-['Manrope:Regular',sans-serif] text-[10px]">
            Profil
          </span>
        </button>
      </div>
    </nav>
  )
}
