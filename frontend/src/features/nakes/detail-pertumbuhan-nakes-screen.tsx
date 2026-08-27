import { useLocation, useNavigate } from "react-router-dom"
import { AlertTriangle, ArrowLeft, Check, LineChart } from "lucide-react"
const avatarImage = "https://placehold.co/96x96"

type ZScoreLevel = "normal" | "ambang" | "waspada"

const levelStyle: Record<ZScoreLevel, { badge: string; badgeText: string; bar: string }> = {
  normal: { badge: "bg-green-300", badgeText: "text-green-950", bar: "bg-emerald-800" },
  ambang: { badge: "bg-yellow-200", badgeText: "text-yellow-900", bar: "bg-yellow-800" },
  waspada: { badge: "bg-rose-200", badgeText: "text-red-800", bar: "bg-red-700" },
}

function ZScoreBar({ zScore }: { zScore: number }) {
  // Map z-score range [-3, +3] to a 0-100% bar position
  const clamped = Math.max(-3, Math.min(3, zScore))
  const percent = ((clamped + 3) / 6) * 100

  return (
    <div className="flex flex-col gap-1">
      <div className="h-2 relative bg-zinc-200 rounded-full overflow-hidden">
        <div
          className="h-2 absolute left-0 top-0 bg-emerald-800 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between">
        {["-3", "-2", "0", "+2", "+3"].map((label) => (
          <span key={label} className="text-neutral-500 text-[10px] font-normal font-['Manrope:Regular',sans-serif] leading-5">
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function DetailPertumbuhanNakesScreen() {
  const navigate = useNavigate()
  const location = useLocation()

  const state = (location.state ?? {}) as {
    anak?: { nama: string; usiaBulan: string; jenisKelamin: string }
    pengukuran?: { beratBadan: string; tinggiBadan: string }
  }

  const anak = state.anak ?? { nama: "Leo M.", usiaBulan: "12", jenisKelamin: "Laki-laki" }
  const pengukuran = state.pengukuran ?? { beratBadan: "12.5", tinggiBadan: "82" }

  return (
    <main className="min-h-svh bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-30 bg-gray-50/80 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 h-16 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-11 rounded-full flex items-center justify-center text-zinc-900 cursor-pointer transition-colors hover:bg-zinc-100 active:scale-95"
            aria-label="Kembali"
          >
            <ArrowLeft className="size-4" />
          </button>
          <h1 className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
            Detail Pertumbuhan
          </h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-6 flex flex-col gap-6">
        {/* Profil anak */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="relative size-24">
            <div className="absolute -inset-1 rounded-full border-[3px] border-emerald-300 opacity-50" />
            <div className="size-24 bg-blue-100 rounded-full shadow-sm overflow-hidden flex items-center justify-center">
              <img src={avatarImage} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <h2 className="text-zinc-900 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
            {anak.nama}
          </h2>

          <div className="flex items-center gap-2 text-slate-600">
            <span className="text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
              {anak.usiaBulan} Bulan
            </span>
            <span className="text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">•</span>
            <span className="text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
              {anak.jenisKelamin}
            </span>
          </div>

          <span className="px-4 py-3 bg-emerald-300/20 rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center gap-2">
            <Check className="size-5 text-emerald-800" />
            <span className="text-emerald-800 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] uppercase tracking-wide">
              Tumbuh Kembang Sehat
            </span>
          </span>
        </div>

        {/* Indikator Pertumbuhan */}
        <div className="flex flex-col gap-4">
          <h3 className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
            Indikator Pertumbuhan (Z-Score)
          </h3>

          <p className="text-slate-600 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-6">
            Z-Score menunjukkan seberapa jauh pertumbuhan anak dari standar rata-rata WHO sesuai Standar Antropometri
            Anak Kemenkes RI (PMK No. 2 Tahun 2020). Nilai di antara -2 dan +3 SD untuk tinggi badan dianggap normal.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* BB/U */}
            <div className="p-4 bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-slate-600 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] uppercase tracking-wide">
                    Berat Badan Menurut Umur (BB/U)
                  </span>
                  <span className="text-zinc-900 text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-8">
                    {pengukuran.beratBadan} kg
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-sm ${levelStyle.normal.badge} ${levelStyle.normal.badgeText} text-xs font-bold font-['Manrope:Bold',sans-serif] leading-5 shrink-0`}>
                  Normal
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-slate-600 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
                    Z-Score: +0.5 SD
                  </span>
                  <span className="text-slate-600 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
                    Standar WHO
                  </span>
                </div>
                <ZScoreBar zScore={0.5} />
              </div>
            </div>

            {/* TB/U */}
            <div className="p-4 bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-slate-600 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] uppercase tracking-wide">
                    Tinggi Badan Menurut Umur (TB/U)
                  </span>
                  <span className="text-zinc-900 text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-8">
                    {pengukuran.tinggiBadan} cm
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-sm ${levelStyle.normal.badge} ${levelStyle.normal.badgeText} text-xs font-bold font-['Manrope:Bold',sans-serif] leading-5 shrink-0`}>
                  Normal
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-slate-600 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
                    Z-Score: -1.8 SD
                  </span>
                  <span className="text-yellow-800 text-xs font-medium font-['Manrope:Medium',sans-serif] leading-4">
                    Normal (Ambang Batas)
                  </span>
                </div>
                <ZScoreBar zScore={-1.8} />
              </div>
              <div className="p-3 bg-amber-200/30 rounded-lg flex items-start gap-2">
                <AlertTriangle className="size-3.5 text-yellow-900 mt-0.5 shrink-0" />
                <p className="text-yellow-900 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
                  Tinggi badan berada di ambang batas normal (-1.8 SD). Pantau asupan protein hewani dan stimulasi
                  psikososial sesuai standar PMK No. 2/2020.
                </p>
              </div>
            </div>

            {/* BB/TB */}
            <div className="p-4 bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4 sm:col-span-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-slate-600 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] uppercase tracking-wide">
                    Berat Badan Menurut Tinggi (BB/TB)
                  </span>
                  <span className="text-zinc-900 text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-8">
                    Proporsional
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-sm ${levelStyle.normal.badge} ${levelStyle.normal.badgeText} text-xs font-bold font-['Manrope:Bold',sans-serif] leading-5 shrink-0`}>
                  Normal
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:max-w-md">
                <div className="flex justify-between">
                  <span className="text-slate-600 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
                    Z-Score: +1.2 SD
                  </span>
                  <span className="text-slate-600 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
                    Standar WHO
                  </span>
                </div>
                <ZScoreBar zScore={1.2} />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:max-w-md">
          <button
            type="button"
            onClick={() => navigate("/nakes/grafik-pertumbuhan")}
            className="py-3 bg-emerald-800 rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-95"
          >
            <LineChart className="size-4 text-white" />
            <span className="text-center text-white text-sm font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-5">
              Lihat Grafik Pertumbuhan
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/nakes")}
            className="py-3 rounded-full flex justify-center items-center cursor-pointer transition-colors hover:bg-emerald-50"
          >
            <span className="text-center text-emerald-800 text-sm font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-5">
              Kembali ke Beranda
            </span>
          </button>
        </div>
      </div>
    </main>
  )
}