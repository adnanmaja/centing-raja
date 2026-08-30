import { useState } from "react"

import { SvgIcon } from "../ui/svg-icon"
import parentDashboardPaths from "../../assets/icon-parent-dashboard"
import parentNotificationPaths from "../../assets/icon-parent-notification"
import { ParentNotification } from "./parent-notification"

export function ParentInputHeader({
  logo,
  title,
  onBack,
}: {
  logo: string
  title: string
  onBack?: () => void
}) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  return (
    <>
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
          <img src={logo} alt="Logo Centing Raja" className="size-8 object-cover" />
          <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
            {title}
          </span>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsNotificationOpen(true)}
              className="relative grid size-8 place-items-center text-[#3e4941]"
              aria-label="Notifikasi"
            >
              <SvgIcon
                path={parentNotificationPaths.p164b49c0}
                viewBox="0 0 16 20"
                className="size-5"
              />
              <span className="absolute right-0 top-0 size-2 rounded-full bg-[#e24c4b]" />
            </button>
            <span className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white">
              <SvgIcon path={parentDashboardPaths.p3189a600} viewBox="0 0 12 12" className="size-4" />
            </span>
          </div>
        </div>
      </header>

      {isNotificationOpen && (
        <ParentNotification onClose={() => setIsNotificationOpen(false)} />
      )}
    </>
  )
}