import { useRef, useState } from "react"

import { SvgIcon } from "../../components/ui/svg-icon"
import { ProfileHeader } from "../../components/kader/profile-header"
import { useAuth } from "../../context/auth-context"
import { updateUserProfile, uploadAvatar } from "../../lib/api"
import editProfilePaths from "../../assets/icon-edit-profile"
import lockedPosyanduPaths from "../../assets/icon-posyandu-locked"
import phoneFieldPaths from "../../assets/icon-phone-field"
import inputMeasurementPaths from "../../assets/icon-input-measurement"

const defaultPhoto = "/images/foto-kader-2.png"

export function EditProfileKader({ onBack }: { onBack: () => void }) {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user?.name || "Nurhayati Ningsih")
  const [phone, setPhone] = useState(user?.phone_number || "0812-3456-7890")
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [photo, setPhoto] = useState<string>(() => user?.avatar_url || defaultPhoto)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const save = async () => {
    setErrorMsg(null)
    setSaving(true)
    try {
      const updatedUser = await updateUserProfile({
        name,
        phone_number: phone,
      })
      localStorage.setItem("centing_user", JSON.stringify(updatedUser))
      if (setUser) setUser(updatedUser)
      setSaved(true)
      window.setTimeout(onBack, 650)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui profil"
      setErrorMsg(msg)
    } finally {
      setSaving(false)
    }
  }
  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Immediate local preview
    const previewUrl = URL.createObjectURL(file)
    setPhoto(previewUrl)

    setUploadingPhoto(true)
    setErrorMsg(null)
    try {
      const res = await uploadAvatar(file)
      setPhoto(res.avatar_url)
      if (setUser) setUser(res.user)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah foto profil"
      setErrorMsg(msg)
      setPhoto(user?.avatar_url || defaultPhoto)
    } finally {
      setUploadingPhoto(false)
    }
  }

  return (
    <main className="min-h-svh bg-[#f8f9fa] pb-24 pt-16 text-[#191c1d]" aria-label="Edit Profil">
      <ProfileHeader title="Profile" onBack={onBack} />

      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 xl:py-12">
        <section className="relative -mx-5 bg-[linear-gradient(180deg,#e8f5ee_0%,#f8f9fa_68%)] px-5 pb-10 pt-8 text-center sm:mx-0 sm:rounded-3xl sm:px-8">
          <div className="relative mx-auto size-[104px]">
            <img src={photo} alt="Foto profil" className="size-full rounded-full object-cover shadow-[0_4px_6px_-1px_rgba(0,109,66,0.1)]" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 grid size-9 place-items-center rounded-full bg-[#006d42] text-white shadow-[0_4px_8px_rgba(0,109,66,0.2)] transition hover:bg-[#005c38]"
              aria-label="Ubah foto"
            >
              <SvgIcon path={editProfilePaths.p34a16800} viewBox="0 0 15 13.5" className="h-3.5 w-4" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </div>
          <button
            type="button"
            disabled={uploadingPhoto}
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 font-['Manrope:Regular',sans-serif] text-sm tracking-[0.05em] text-[#006d42] disabled:opacity-50"
          >
            {uploadingPhoto ? "MENGUNGGAH..." : "UBAH FOTO"}
          </button>
        </section>

        <section className="mt-3 sm:mt-7">
          <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold">
            Data Pribadi
          </h1>
          <p className="mt-2 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#3e4941]">
            Pastikan informasi di bawah ini sesuai dengan identitas resmi Anda.
          </p>
          <div className="mt-8 space-y-6">
            <label className="block font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Nama Lengkap
              <div className="relative mt-2">
                <SvgIcon path={editProfilePaths.p85bff00} viewBox="0 0 16 16" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]" />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="min-h-14 w-full rounded-xl bg-[#edeeef] py-3 pl-11 pr-4 text-base text-[#191c1d] outline-none ring-[#007c4a] focus:ring-2"
                />
              </div>
            </label>
            <label className="block font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Nomor Telepon (WhatsApp)
              <div className="relative mt-2">
                <SvgIcon path={phoneFieldPaths.p143e1930} viewBox="0 0 18 18" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#3e4941]" />
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  inputMode="tel"
                  className="min-h-14 w-full rounded-xl bg-[#edeeef] py-3 pl-11 pr-4 text-base text-[#191c1d] outline-none ring-[#007c4a] focus:ring-2"
                />
              </div>
            </label>
            <div>
              <p className="font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">Nama Posyandu</p>
              {/* <div className="relative mt-2 flex min-h-14 items-center rounded-xl bg-[#dde0e0] px-4 pl-11 text-base text-[#536478]">
                <SvgIcon path={lockedPosyanduPaths.p7ab5f00} viewBox="0 0 22 18" className="absolute left-4 h-4 w-5 text-[#536478]" />
                Mawar Merah 1
              </div> */}
              <p className="mt-2 flex gap-1 font-['Manrope:Regular',sans-serif] text-sm leading-5 text-[#63747a]">
                <span>ⓘ</span>Perubahan nama instansi Posyandu harus divalidasi oleh Tenaga Kesehatan.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 flex flex-col items-center gap-4">
          {errorMsg && (
            <div className="w-full rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
              {errorMsg}
            </div>
          )}
          <button
            type="button"
            onClick={save}
            disabled={!name.trim() || !phone.trim() || saved || saving}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#007c4a] font-['Manrope:SemiBold',sans-serif] text-base font-semibold text-white shadow-[0_4px_8px_rgba(0,109,66,0.2)] disabled:opacity-60"
          >
            <SvgIcon path={inputMeasurementPaths.p3e09ad60} viewBox="0 0 18 18" className="size-4" />
            {saved ? "Perubahan Disimpan" : saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button type="button" onClick={onBack} className="font-['Manrope:Regular',sans-serif] text-base text-[#536478] hover:text-[#007c4a]">
            Batal
          </button>
        </section>
      </div>
    </main>
  )
}