import { useCallback, useEffect, useState } from "react"

import { SvgIcon } from "../ui/svg-icon"
import parentNotificationPaths from "../../assets/icon-parent-notification"
import { KaderNotification } from "./kader-notification"
import { useAuth } from "../../context/auth-context"
import { avatarPlaceholder } from "../../lib/avatar-placeholder"
import { getNotifications } from "../../lib/api"
const kaderProfileLogo = "/logo/logo-centing-raja.png"

export function ProfileHeader({
  logo = kaderProfileLogo,
  title = "Profile",
  onBack,
}: {
  logo?: string
  title?: string
  onBack?: () => void
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { user } = useAuth()
  const profilePic = !imgError && user?.avatar_url ? user.avatar_url : avatarPlaceholder

  const checkUnread = useCallback(() => {
    getNotifications()
      .then((items) => {
        setHasUnread(Array.isArray(items) && items.some((item) => !item.is_read))
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    checkUnread()
  }, [checkUnread])
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="grid size-9 place-items-center rounded-full text-[#006d42] transition hover:bg-[#e9f7ef]"
                aria-label="Kembali"
              >
                <span className="text-2xl leading-none">‹</span>
              </button>
            )}
            <img src={logo} alt="Logo Centing Raja" className="size-8 object-cover" />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsNotifOpen(true)}
              className="relative grid size-8 place-items-center text-[#3e4941]"
              aria-label="Notifikasi"
            >
              <SvgIcon path={parentNotificationPaths.p164b49c0} viewBox="0 0 16 20" className="size-5" />
{hasUnread && (
  <span className="absolute right-0 top-0 size-2 rounded-full bg-[#e24c4b]" />
)}
            </button>
            <img
              src={profilePic}
              alt={user?.name || "Profil"}
              className="size-8 rounded-full object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        </div>
      </header>

{isNotifOpen && (
  <KaderNotification
    onClose={() => {
      setIsNotifOpen(false)
      checkUnread()
    }}
  />
)}
    </>
  )
}