import { useLocation, useNavigate } from "react-router-dom"
import { Check, Ruler } from "lucide-react"

const avatarImage = "https://placehold.co/128x128"

export function InputDataAnakBerhasilScreen() {
  const navigate = useNavigate()
  const location = useLocation()

  const state = (location.state ?? {}) as {
    anak?: {
      nama: string
      usiaBulan: string
      jenisKelamin: string
    }
  }

  const anak = state.anak

  return (
    <main className="min-h-svh bg-gray-50 flex flex-col items-center justify-center px-5 py-6 gap-8">
      <div className="relative size-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-300/20 rounded-full" />
        <div className="absolute inset-2 bg-green-300/40 rounded-full" />
        <img
          src={avatarImage}
          alt=""
          className="relative size-28 rounded-full object-cover shadow-md"
        />
        <span className="absolute size-2 bg-orange-300 rounded-full" style={{ left: "20%", top: "10%" }} />
        <span className="absolute size-2 bg-emerald-800 rounded-full" style={{ right: "10%", top: "30%" }} />
        <span className="absolute size-2 bg-yellow-800 rounded-full" style={{ left: "30%", bottom: "10%" }} />
        <span className="absolute size-2 bg-green-300 rounded-full" style={{ right: "20%", bottom: "20%" }} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center text-emerald-800 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif] leading-8">
          Pendaftaran Data
          <br />
          Anak Berhasil!
        </h1>
        <p className="max-w-72 text-center text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
          Data si kecil telah aman tersimpan. Sekarang Anda dapat mulai memantau tumbuh kembangnya secara rutin.
        </p>
      </div>

      <div className="w-full p-4 relative bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3 overflow-hidden">
        <div className="absolute left-0 top-0 w-1 h-full bg-emerald-800" />

        <div className="pb-3 border-b border-zinc-200/50 flex items-center justify-between">
          <span className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
            Ringkasan Data
          </span>
          <Check className="size-4 text-emerald-800" />
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <SummaryRow label="Nama Anak" value={anak?.nama || "-"} />
          <SummaryRow label="Jenis Kelamin" value={anak?.jenisKelamin || "-"} />
          <SummaryRow label="Usia Saat Ini" value={anak ? `${anak.usiaBulan} Bulan` : "-"} />
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          type="button"
          onClick={() => navigate("/nakes/input")}
          className="h-12 bg-emerald-800 rounded-full shadow-[0px_4px_6px_-1px_rgba(0,109,66,0.20)] flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
        >
          <Ruler className="size-3.5 text-white" />
          <span className="text-center text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
            Lakukan Pengukuran
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/nakes")}
          className="h-12 rounded-full flex justify-center items-center cursor-pointer transition-colors hover:bg-emerald-50"
        >
          <span className="text-center text-emerald-800 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
            Kembali ke Beranda
          </span>
        </button>
      </div>
    </main>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-neutral-700 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
        {label}
      </span>
      <span className="text-right text-zinc-900 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
        {value}
      </span>
    </div>
  )
}