import { SvgIcon } from "../ui/svg-icon"

import taskProfilePaths from "../../assets/icon-profile-badge"

const kaderProfileLogo =
  "/logo/logo-centing-raja.png"

export function ProfileHeader({
  logo = kaderProfileLogo,

  onBack,
}: {
  logo?: string

  onBack?: () => void
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-black/[0.03] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 xl:px-10">
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
          <img
            src={logo}
            alt="Logo Centing Raja"
            className="size-8 object-cover"
          />
          <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold text-[#007c4a]">
            Profile
          </span>
        </div>
        <span
          className="grid size-8 place-items-center rounded-full bg-[#007c4a] text-white"
          aria-hidden="true"
        >
          <SvgIcon
            path={taskProfilePaths.p3189a600}
            viewBox="0 0 12 12"
            className="size-4"
          />
        </span>
      </div>
    </header>
  )
}
