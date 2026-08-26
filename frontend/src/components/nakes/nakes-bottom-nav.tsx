import { Database, Home, PlusCircle, User } from "lucide-react"

type NakesTab = "Beranda" | "Data" | "Input" | "Akun"

export function NakesBottomNav({
  onHome,
  onData,
  onInput,
  onAkun,
  active = "Beranda",
}: {
  onHome: () => void
  onData: () => void
  onInput: () => void
  onAkun: () => void
  active?: NakesTab
}) {
  const items: { label: NakesTab; icon: typeof Home; onClick: () => void }[] = [
    { label: "Beranda", icon: Home, onClick: onHome },
    { label: "Data", icon: Database, onClick: onData },
    { label: "Input", icon: PlusCircle, onClick: onInput },
    { label: "Akun", icon: User, onClick: onAkun },
  ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl"
      aria-label="Navigasi Nakes"
    >
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-4 items-center px-2 sm:px-8">
        {items.map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className={`flex flex-col items-center gap-1 ${
              active === label ? "text-[#007c4a]" : "text-[#536478]"
            }`}
          >
            <Icon className="size-5" strokeWidth={active === label ? 2.5 : 2} />
            <span
              className={`font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[10px] ${
                active === label ? "font-bold" : "font-semibold"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}