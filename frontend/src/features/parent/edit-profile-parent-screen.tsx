import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, Pencil, User, CreditCard, Phone, MapPin } from "lucide-react"

import { ParentInputHeader } from "../../components/parent/parent-input-header"

const logo = "/logo/logo-centing-raja.png"

export function EditProfileParentScreen() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nama: "Ibu Nisa",
    nik: "3201987654321001",
    whatsapp: "08123456789",
    alamat: "Jl. Mawar Merah No. 12",
    rtRw: "03/05",
    kecamatan: "Cibiru",
  })

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSave = () => {
    // TODO: kirim form ke API
    navigate("/orang-tua/profil")
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <ParentInputHeader
        logo={logo}
        title="Edit Profile"
        onBack={() => navigate("/orang-tua/profil")}
      />

      {/* Hero */}
      <div className="px-5 pt-9 pb-8 bg-emerald-800 rounded-bl-[32px] rounded-br-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col items-center gap-3">
        <div className="relative">
          <div className="size-24 bg-emerald-300 rounded-full shadow-md outline outline-4 outline-offset-[-4px] outline-gray-50 flex justify-center items-center overflow-hidden">
            <img
              className="size-24 object-cover"
              src="https://placehold.co/96x96"
              alt="avatar"
            />
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 size-8 bg-gray-50 rounded-full shadow-sm flex justify-center items-center"
          >
            <Pencil className="size-3.5 text-emerald-800" />
          </button>
        </div>

        <h1 className="text-white text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
          Edit Profil
        </h1>
        <p className="text-emerald-300 text-sm font-normal font-['Manrope:Regular',sans-serif]">
          Perbarui informasi data diri Anda.
        </p>
      </div>

      {/* Form */}
+      <div className="flex-1 px-5 pt-6 pb-32 flex flex-col gap-4 mx-auto w-full max-w-6xl sm:px-8">
          <div className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <User className="size-3.5 text-emerald-800" />
            <span className="text-black text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
              Data Pribadi
            </span>
          </div>

          <Field
            label="Nama Lengkap"
            icon={<User className="size-3.5 text-neutral-700/50" />}
            value={form.nama}
            onChange={handleChange("nama")}
          />

          <Field
            label="Nomor Induk Kependudukan (NIK)"
            icon={<CreditCard className="size-3.5 text-neutral-700/50" />}
            value={form.nik}
            onChange={handleChange("nik")}
          />
        </div>

        <div className="p-4 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-emerald-800" />
            <span className="text-black text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
              Kontak & Alamat
            </span>
          </div>

          <Field
            label="Nomor WhatsApp / HP"
            icon={<Phone className="size-3.5 text-neutral-700/50" />}
            value={form.whatsapp}
            onChange={handleChange("whatsapp")}
          />

          <div className="flex flex-col gap-1">
            <label className="pl-1 text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
              Alamat Lengkap
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 size-3.5 text-neutral-700/50" />
              <textarea
                value={form.alamat}
                onChange={handleChange("alamat")}
                rows={2}
                className="w-full pl-10 pr-3 pt-3 pb-3 bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-zinc-100 text-black text-sm font-normal font-['Manrope:Regular',sans-serif] resize-none focus:outline-emerald-800"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <label className="pl-1 text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
                RT / RW
              </label>
              <input
                value={form.rtRw}
                onChange={handleChange("rtRw")}
                className="w-full p-3 bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-zinc-100 text-center text-black text-sm font-normal font-['Manrope:Regular',sans-serif] focus:outline-emerald-800"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="pl-1 text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
                Kecamatan
              </label>
              <input
                value={form.kecamatan}
                onChange={handleChange("kecamatan")}
                className="w-full p-3 bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-zinc-100 text-black text-sm font-normal font-['Manrope:Regular',sans-serif] focus:outline-emerald-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed save button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={handleSave}
          className="w-full px-6 py-3 bg-emerald-800 rounded-full shadow-md flex justify-center items-center gap-3"
        >
          <Check className="size-4 text-white" />
          <span className="text-white text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
            Simpan Perubahan
          </span>
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  icon,
  value,
  onChange,
}: {
  label: string
  icon: React.ReactNode
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="pl-1 text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-3 py-3 bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-zinc-100 text-black text-sm font-normal font-['Manrope:Regular',sans-serif] focus:outline-emerald-800"
        />
      </div>
    </div>
  )
}
