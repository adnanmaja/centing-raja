import { useState } from "react"
import { Check } from "lucide-react"

import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"
import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { SvgIcon } from "../../components/ui/svg-icon"
import childInputPaths from "../../assets/icon-child-input"

const childInputLogo = "/logo/logo-centing-raja.png"
const childInputIllustration = "/images/ilustrasi-ibu-anak.png"

export function InputDataAnak({
  onSaved,
  onHome,
  onMaterial,
  onInput,
}: {
  onSaved: () => void
  onHome: () => void
  onMaterial: () => void
  onInput: () => void
}) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("Laki-laki")
  const [rt, setRt] = useState("")
  const [rw, setRw] = useState("")
  const [address, setAddress] = useState("")

  const complete = name.trim() && age && rt && rw && address.trim()

  const field =
    "mt-1 min-h-11 w-full rounded-xl bg-[#f3f4f5] px-3 font-['Manrope:Regular',sans-serif] text-sm text-[#191c1d] outline-none placeholder:text-[#b3bdb7] focus:ring-2 focus:ring-[#006d42]/30"

  return (
    <main data-reveal-page className="min-h-svh bg-[#f8f9fa] pb-24 text-[#191c1d]" aria-label="Input Data Anak">
      <ParentInputHeader logo={childInputLogo} title="Input" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-8">
        <section className="-mx-4 h-44 overflow-hidden bg-[#e7e8e9] sm:mx-0 sm:mt-5 sm:rounded-3xl lg:rounded-b-3xl">
          <img
            src={childInputIllustration}
            alt="Ibu dan anak"
            className="size-full object-cover object-center opacity-80"
          />
        </section>

        <section className="relative -mt-4 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:mt-5">
          <h1 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold text-[#006d42]">
            Input Data Anak
          </h1>
          <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Langkah pertama untuk memantau tumbuh kembang si kecil dengan penuh kasih sayang.
          </p>
        </section>

        <div className="mt-5 grid w-full gap-5 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
            <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#006d42]">
              <SvgIcon path={childInputPaths.p2558b1c0} viewBox="0 0 15 15" className="size-4" />
              Identitas Anak
            </h2>
            <label className="mt-4 block font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
              Nama Lengkap
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className={field}
              />
            </label>
            <label className="mt-4 block font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
              Usia (Bulan)
              <div className="relative">
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  inputMode="numeric"
                  placeholder="0"
                  className={field}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-['Manrope:Regular',sans-serif] text-xs text-[#536478]">
                  Bulan
                </span>
              </div>
            </label>
            <p className="mt-4 font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">Jenis Kelamin</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {["Laki-laki", "Perempuan"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGender(item)}
                  className={`min-h-9 rounded-xl font-['Manrope:SemiBold',sans-serif] text-xs transition ${
                    gender === item ? "bg-[#e9f7ef] text-[#006d42] ring-1 ring-[#76d69f]" : "bg-[#f3f4f5] text-[#191c1d]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
            <h2 className="flex items-center gap-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-[#536478]">
              Tempat Tinggal
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
                RT
                <input
                  value={rt}
                  onChange={(e) => setRt(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="001"
                  className={field}
                />
              </label>
              <label className="font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
                RW
                <input
                  value={rw}
                  onChange={(e) => setRw(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="002"
                  className={field}
                />
              </label>
            </div>
            <label className="mt-4 block font-['Manrope:Regular',sans-serif] text-xs text-[#3e4941]">
              Alamat Lengkap
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nama jalan, nomor rumah, kelurahan..."
                className={`${field} min-h-20 py-3`}
              />
            </label>
          </section>
        </div>

        <div className="mt-7 w-full">
          <button
            type="button"
            disabled={!complete}
            onClick={onSaved}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#007c4a] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_4px_8px_rgba(0,109,66,0.18)] disabled:opacity-45"
          >
            <Check className="size-4" />
            Simpan Data
          </button>
        </div>
      </div>

      <ParentBottomNav onHome={onHome} onMaterial={onMaterial} onInput={onInput} active="Input" />
    </main>
  )
}