import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, Ruler, Scale } from "lucide-react"
import {
  createMeasurement,
  formatAge,
  getNakesChildren,
  type Child,
  type Measurement,
} from "../../lib/api"

const avatarPlaceholder = "https://placehold.co/48x48"

type PosisiUkur = "Berdiri" | "Telentang"

export function InputPengukuranNakesScreen() {
  const navigate = useNavigate()
  const location = useLocation()

  const state = (location.state ?? {}) as {
    anak?: { id?: string; nama: string; usiaBulan: string; jenisKelamin: string }
    child?: Child
  }

  const [children, setChildren] = useState<Child[]>([])
  const [selectedChild, setSelectedChild] = useState<Child | null>(state.child ?? null)
  const [selectedAnak, setSelectedAnak] = useState(
    state.anak ?? {
      id: state.child?.id,
      nama: state.child?.full_name ?? "Leo M.",
      usiaBulan: state.child?.birth_date ? String(formatAge(state.child.birth_date)) : "12",
      jenisKelamin: state.child?.gender === "P" || state.child?.gender === "Perempuan" ? "Perempuan" : "Laki-laki",
    }
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    getNakesChildren(50, 0)
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          setChildren(data)
          if (!selectedChild && !state.anak?.id) {
            setSelectedChild(data[0])
            setSelectedAnak({
              id: data[0].id,
              nama: data[0].full_name,
              usiaBulan: String(formatAge(data[0].birth_date)),
              jenisKelamin: data[0].gender === "P" || data[0].gender === "Perempuan" ? "Perempuan" : "Laki-laki",
            })
          }
        }
      })
      .catch((err) => {
        console.warn("[Centing] Failed to fetch nakes children:", err)
      })
    return () => {
      active = false
    }
  }, [selectedChild, state.anak])

  const [beratBadan, setBeratBadan] = useState("")
  const [posisiUkur, setPosisiUkur] = useState<PosisiUkur>("Berdiri")
  const [tinggiBadan, setTinggiBadan] = useState("")
  const [lingkarKepala, setLingkarKepala] = useState("")
  const [lingkarLenganAtas, setLingkarLenganAtas] = useState("")
  const [catatan, setCatatan] = useState("")

  const weightNum = parseFloat(beratBadan)
  const heightNum = parseFloat(tinggiBadan)
  const isValid = !isNaN(weightNum) && weightNum > 0 && !isNaN(heightNum) && heightNum > 0

  const handleSave = async () => {
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const childId = selectedChild?.id || selectedAnak.id
      let createdMeasurement: Measurement | undefined

      if (childId) {
        const headNum = lingkarKepala ? parseFloat(lingkarKepala) : undefined
        const lilaNum = lingkarLenganAtas ? parseFloat(lingkarLenganAtas) : undefined

        createdMeasurement = await createMeasurement({
          children_id: childId,
          weight: weightNum,
          height: heightNum,
          head_circumference: headNum && !isNaN(headNum) ? headNum : undefined,
          upper_arm_circumference: lilaNum && !isNaN(lilaNum) ? lilaNum : undefined,
        })
      }

      navigate("/nakes/pengukuran/berhasil", {
        state: {
          anak: selectedAnak,
          child: selectedChild,
          measurement: createdMeasurement,
          pengukuran: {
            beratBadan,
            tinggiBadan,
            posisiUkur,
            lingkarKepala,
            lila: lingkarLenganAtas,
            catatan,
          },
        },
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan data pengukuran"
      setErrorMessage(msg)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <main className="min-h-svh bg-gray-50 pb-32 flex flex-col">
      <header className="sticky top-0 z-30 bg-gray-50/90 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] backdrop-blur-[6px]">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 h-16 flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 cursor-pointer transition-colors hover:bg-zinc-200 active:scale-95"
            aria-label="Kembali"
          >
            <ArrowLeft className="size-4" />
          </button>
          <h1 className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7">
            Input Pengukuran
          </h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-4 flex flex-col gap-6">
        {children.length > 1 && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-neutral-600">Pilih Anak:</label>
            <select
              value={selectedChild?.id || ""}
              onChange={(e) => {
                const c = children.find((ch) => ch.id === e.target.value)
                if (c) {
                  setSelectedChild(c)
                  setSelectedAnak({
                    id: c.id,
                    nama: c.full_name,
                    usiaBulan: String(formatAge(c.birth_date)),
                    jenisKelamin: c.gender === "P" || c.gender === "Perempuan" ? "Perempuan" : "Laki-laki",
                  })
                }
              }}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-800"
            >
              {children.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name} ({formatAge(c.birth_date)})
                </option>
              ))}
            </select>
          </div>
        )}

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="p-4 bg-zinc-100 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden shrink-0">
              <img src={avatarPlaceholder} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-900 text-base font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-6">
                {selectedAnak.nama}
              </span>
              <span className="text-neutral-700 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-5">
                {selectedAnak.jenisKelamin} • {selectedAnak.usiaBulan}
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-emerald-300/20 rounded-full flex items-center gap-1 shrink-0">
            <Check className="size-3 text-emerald-800" />
            <span className="text-emerald-800 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
              Hari ini
            </span>
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="size-8 bg-emerald-800/10 rounded-full flex items-center justify-center shrink-0">
                <Scale className="size-3.5 text-emerald-800" />
              </span>
              <h2 className="text-zinc-900 text-base font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-6">
                Berat Badan
              </h2>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-neutral-700 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
                Berat (Akurasi 2 desimal)
              </label>
              <div className="relative flex items-center bg-gray-50 rounded-lg">
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  value={beratBadan}
                  onChange={(e) => setBeratBadan(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 min-w-0 h-14 px-4 bg-transparent text-xl font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] placeholder:text-stone-300 focus:outline focus:outline-2 focus:outline-emerald-800 rounded-lg"
                />
                <span className="pr-4 text-neutral-700 text-base font-normal font-['Manrope:Regular',sans-serif] shrink-0">
                  kg
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="size-8 bg-emerald-800/10 rounded-full flex items-center justify-center shrink-0">
                <Ruler className="size-3.5 text-emerald-800" />
              </span>
              <h2 className="text-zinc-900 text-base font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] leading-6">
                Tinggi / Panjang
              </h2>
            </div>

            <div className="p-1 bg-zinc-100 rounded-lg flex">
              {(["Berdiri", "Telentang"] as PosisiUkur[]).map((posisi) => (
                <button
                  key={posisi}
                  type="button"
                  onClick={() => setPosisiUkur(posisi)}
                  className={`flex-1 py-2 rounded-md text-center text-base font-normal font-['Manrope:Regular',sans-serif] leading-6 cursor-pointer transition-colors ${
                    posisiUkur === posisi
                      ? "bg-white text-zinc-900 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                      : "text-neutral-700"
                  }`}
                >
                  {posisi}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-neutral-700 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-4">
                Tinggi (Akurasi 1 desimal)
              </label>
              <div className="relative flex items-center bg-gray-50 rounded-lg">
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  value={tinggiBadan}
                  onChange={(e) => setTinggiBadan(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 min-w-0 h-14 px-4 bg-transparent text-xl font-normal font-['Plus_Jakarta_Sans:Regular',sans-serif] placeholder:text-stone-300 focus:outline focus:outline-2 focus:outline-emerald-800 rounded-lg"
                />
                <span className="pr-4 text-neutral-700 text-base font-normal font-['Manrope:Regular',sans-serif] shrink-0">
                  cm
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-zinc-900 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-5">
                Lingkar Kepala
              </span>
            </div>
            <div className="relative flex items-center bg-gray-50 rounded-lg">
              <input
                type="number"
                step="0.1"
                min={0}
                value={lingkarKepala}
                onChange={(e) => setLingkarKepala(e.target.value)}
                placeholder="0.0"
                className="flex-1 min-w-0 h-11 px-3 bg-transparent text-base font-normal font-['Manrope:Regular',sans-serif] placeholder:text-stone-300 focus:outline focus:outline-2 focus:outline-emerald-800 rounded-lg"
              />
              <span className="pr-3 text-neutral-700 text-xs font-normal font-['Manrope:Regular',sans-serif] shrink-0">
                cm
              </span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-zinc-900 text-xs font-normal font-['Manrope:Regular',sans-serif] leading-5">
                Lingkar Lengan Atas
              </span>
            </div>
            <div className="relative flex items-center bg-gray-50 rounded-lg">
              <input
                type="number"
                step="0.1"
                min={0}
                value={lingkarLenganAtas}
                onChange={(e) => setLingkarLenganAtas(e.target.value)}
                placeholder="0.0"
                className="flex-1 min-w-0 h-11 px-3 bg-transparent text-base font-normal font-['Manrope:Regular',sans-serif] placeholder:text-stone-300 focus:outline focus:outline-2 focus:outline-emerald-800 rounded-lg"
              />
              <span className="pr-3 text-neutral-700 text-xs font-normal font-['Manrope:Regular',sans-serif] shrink-0">
                cm
              </span>
            </div>
          </div>
        </div>

        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          placeholder="Tambahkan catatan khusus... (opsional)"
          rows={3}
          className="w-full px-4 py-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] text-sm font-normal font-['Manrope:Regular',sans-serif] placeholder:text-stone-300 resize-none focus:outline focus:outline-2 focus:outline-emerald-800"
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gray-50/90 border-t border-zinc-200 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-3 flex justify-end">
          <button
            type="button"
            disabled={!isValid || isSubmitting}
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-800 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="text-center text-white text-sm font-semibold font-['Manrope:SemiBold',sans-serif] leading-5">
              {isSubmitting ? "Menyimpan..." : "Simpan & Lihat Hasil"}
            </span>
            <ArrowRight className="size-4 text-white" />
          </button>
        </div>
      </div>
    </main>
  )
}