import { SvgIcon } from "../ui/svg-icon"

import parentDashboardPaths from "../../assets/icon-parent-dashboard"

export function ParentInputHeader({
  logo,

  title,

  onBack,
}: {
  logo: string

  title: string

  onBack?: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.03] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-8">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="grid size-9 place-items-center rounded-full bg-[#f3f4f5] text-2xl leading-none text-[#191c1d]"
            aria-label="Kembali"
          >
            ‹
          </button>
        )}
        <img
          src={logo}
          alt="Logo Centing Raja"
          className="size-8 object-cover"
        />
        <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
          {title}
        </span>
        <span className="ml-auto grid size-8 place-items-center rounded-full bg-[#007c4a] text-white">
          <SvgIcon
            path={parentDashboardPaths.p3189a600}
            viewBox="0 0 12 12"
            className="size-4"
          />
        </span>
      </div>
    </header>
  )
}
