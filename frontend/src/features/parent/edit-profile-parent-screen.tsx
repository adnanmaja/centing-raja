import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, Pencil, User, CreditCard, Phone, MapPin } from "lucide-react"

import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { useAuth } from "../../context/auth-context"
import { updateUserProfile, uploadAvatar } from "../../lib/api"

const logo = "/logo/logo-centing-raja.png"

export function EditProfileParentScreen() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatar_url || "")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [form, setForm] = useState({
    nama: user?.name || "Ibu Nisa",
    nik: user?.nik || "3201987654321001",
    whatsapp: user?.phone_number || "08123456789",
    alamat: "Note: ntar dulu yak",
    rtRw: "",
    kecamatan: "",
  })

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSave = async () => {
    setErrorMsg(null)
    setSaving(true)
    try {
      const updated = await updateUserProfile({
        name: form.nama,
        nik: form.nik,
        phone_number: form.whatsapp,
      })
      localStorage.setItem("centing_user", JSON.stringify(updated))
      if (setUser) setUser(updated)
      navigate("/orang-tua/profil")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui profil"
      setErrorMsg(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const preview = URL.createObjectURL(file)
    setAvatarUrl(preview)

    setUploadingAvatar(true)
    setErrorMsg(null)
    try {
      const res = await uploadAvatar(file)
      setAvatarUrl(res.avatar_url)
      if (setUser) setUser(res.user)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah foto profil"
      setErrorMsg(msg)
      setAvatarUrl(user?.avatar_url || "")
    } finally {
      setUploadingAvatar(false)
    }
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
              src={avatarUrl || "https://placehold.co/96x96"}
              alt="avatar"
            />
          </div>
          <button
            type="button"
            disabled={uploadingAvatar}
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 size-8 bg-gray-50 rounded-full shadow-sm flex justify-center items-center disabled:opacity-50 cursor-pointer"
            aria-label="Ubah foto"
          >
            <Pencil className="size-3.5 text-emerald-800" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <h1 className="text-white text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
          Edit Profil
        </h1>
        <p className="text-emerald-300 text-sm font-normal font-['Manrope:Regular',sans-serif]">
          Perbarui informasi data diri Anda.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 pt-6 pb-32 flex flex-col gap-4 mx-auto w-full max-w-6xl sm:px-8">
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
        {errorMsg && (
          <div className="mb-3 p-3 rounded-xl bg-red-50 text-red-700 text-sm ring-1 ring-red-200">
            {errorMsg}
          </div>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !form.nama.trim() || !form.whatsapp.trim()}
          className="w-full px-6 py-3 bg-emerald-800 rounded-full shadow-md flex justify-center items-center gap-3 disabled:opacity-60 cursor-pointer"
        >
          <Check className="size-4 text-white" />
          <span className="text-white text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
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
