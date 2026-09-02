import { useState } from "react"
import { ArrowLeft, Bell, Leaf, User } from "lucide-react"

const nakesLogo = "/logo/logo-centing-raja.png"

export function NakesHeader({
  title = "Beranda",
  hasUnread = false,
  onNotificationClick,
  onBack,
}: {
  title?: string
  hasUnread?: boolean
  onNotificationClick?: () => void
  onBack?: () => void
}) {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.03] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mr-1 grid size-8 place-items-center rounded-full text-zinc-900 transition hover:bg-zinc-100 cursor-pointer"
              aria-label="Kembali"
            >
              <ArrowLeft className="size-5" />
            </button>
          )}
          {logoFailed ? (
            <span className="grid size-8 place-items-center rounded-full bg-emerald-800 text-white">
              <Leaf className="size-4" />
            </span>
          ) : (
            <img
              src={nakesLogo}
              alt="Logo Centing Raja"
              className="size-8 object-cover"
              onError={() => setLogoFailed(true)}
            />
          )}
          <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNotificationClick}
            className="relative grid size-10 place-items-center rounded-full text-[#3e4941]"
            aria-label="Notifikasi"
          >
            <Bell className="size-5" />
            {hasUnread && (
              <span className="absolute right-2 top-2 size-2 rounded-full bg-[#e24c4b]" />
            )}
          </button>
          <span className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white">
            <User className="size-4" />
          </span>
        </div>
      </div>
    </header>
  )
}