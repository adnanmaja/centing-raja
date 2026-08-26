import { useNavigate } from "react-router-dom"

import { NakesHeader } from "../../components/nakes/nakes-header"
import { NakesBottomNav } from "../../components/nakes/nakes-bottom-nav"

export function AkunNakesScreen() {
  const navigate = useNavigate()

  return (
    <main className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]">
      <NakesHeader title="Akun" />

      <div className="mx-auto flex min-h-[60svh] w-full max-w-6xl flex-col items-center justify-center gap-2 px-5 py-5 text-center sm:px-8">
        <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold text-zinc-900">
          Halaman Akun Nakes
        </p>
        <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-sm text-slate-600">
          Segera hadir.
        </p>
      </div>

      <NakesBottomNav
        active="Akun"
        onHome={() => navigate("/nakes")}
        onData={() => navigate("/nakes/data")}
        onInput={() => navigate("/nakes/input")}
        onAkun={() => navigate("/nakes/akun")}
      />
    </main>
  )
}
