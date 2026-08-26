import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Hash, Lock, ShieldCheck } from "lucide-react"

import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"

const logo = "/logo/logo-centing-raja.png"

export function ChangePasswordParentScreen() {
  const navigate = useNavigate()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const hasMinLength = newPassword.length >= 8
  const hasNumber = /\d/.test(newPassword)
  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword

  const isValid = useMemo(
    () => oldPassword.length > 0 && hasMinLength && hasNumber && passwordsMatch,
    [oldPassword, hasMinLength, hasNumber, passwordsMatch],
  )

  const handleSubmit = () => {
    if (!isValid) return
    // TODO: kirim ke API ubah kata sandi
    navigate("/orang-tua/profil")
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <ParentInputHeader logo={logo} title="Profile" />

      <div className="flex-1 px-5 pt-6 pb-32 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-black text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
            Ubah Kata Sandi
          </h1>
          <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif]">
            Pastikan akun Anda tetap aman dengan menggunakan kata sandi yang
            kuat dan unik.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <PasswordField
            label="Kata Sandi Lama"
            placeholder="Masukkan kata sandi saat ini"
            value={oldPassword}
            onChange={setOldPassword}
            show={showOld}
            onToggleShow={() => setShowOld((v) => !v)}
          />

          <div className="flex flex-col gap-1">
            <PasswordField
              label="Kata Sandi Baru"
              placeholder="Minimal 8 karakter"
              value={newPassword}
              onChange={setNewPassword}
              show={showNew}
              onToggleShow={() => setShowNew((v) => !v)}
            />
            <div className="pt-2 flex gap-2">
              <Badge active={hasMinLength} label="8+ Karakter" />
              <Badge active={hasNumber} label="Angka" />
            </div>
          </div>

          <PasswordField
            label="Konfirmasi Kata Sandi Baru"
            placeholder="Ulangi kata sandi baru"
            value={confirmPassword}
            onChange={setConfirmPassword}
            show={showConfirm}
            onToggleShow={() => setShowConfirm((v) => !v)}
          />

          <div className="p-4 bg-zinc-100 rounded-xl flex items-start gap-3">
            <ShieldCheck className="size-4 text-emerald-800 mt-1 shrink-0" />
            <div className="flex flex-col gap-1">
              <span className="text-black text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
                Keamanan Terjamin
              </span>
              <span className="text-neutral-700 text-xs font-normal font-['Manrope:Regular',sans-serif]">
                Data Anda dienkripsi secara end-to-end. Kami tidak pernah
                menyimpan kata sandi Anda dalam bentuk teks biasa.
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={!isValid}
            onClick={handleSubmit}
            className={`py-3 rounded-full shadow-[0px_4px_12px_0px_rgba(0,109,66,0.20)] flex justify-center items-center transition-opacity ${
              isValid
                ? "bg-emerald-800 opacity-100"
                : "bg-emerald-800 opacity-50 cursor-not-allowed"
            }`}
          >
            <span className="text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
              Ubah Kata Sandi
            </span>
          </button>
        </div>
      </div>

      <ParentBottomNav
        active="Profil"
        onHome={() => navigate("/orang-tua")}
        onMaterial={() => navigate("/orang-tua/materi")}
        onInput={() => navigate("/orang-tua/input-anak")}
        onProfile={() => navigate("/orang-tua/profil")}
      />
    </div>
  )
}

function PasswordField({
  label,
  placeholder,
  value,
  onChange,
  show,
  onToggleShow,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggleShow: () => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-black text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white rounded-lg shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] text-black text-sm font-normal font-['Manrope:Regular',sans-serif] placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-emerald-800"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-700"
          aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  )
}

function Badge({ active, label }: { active: boolean; label: string }) {
  return (
    <div
      className={`px-2 py-1 rounded-full flex items-center gap-2 transition-colors ${
        active ? "bg-emerald-100" : "bg-gray-200"
      }`}
    >
      {label === "Angka" ? (
        <Hash
          className={`size-3 ${
            active ? "text-emerald-800" : "text-neutral-700"
          }`}
        />
      ) : (
        <Lock
          className={`size-3 ${
            active ? "text-emerald-800" : "text-neutral-700"
          }`}
        />
      )}
      <span
        className={`text-[10px] font-normal font-['Manrope:Regular',sans-serif] ${
          active ? "text-emerald-800" : "text-neutral-700"
        }`}
      >
        {label}
      </span>
    </div>
  )
}
