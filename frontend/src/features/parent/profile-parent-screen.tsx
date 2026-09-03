import React, { useEffect, useState } from "react"
import { ArrowLeft, ChevronRight, Key, HelpCircle, Shield, LogOut, User, Pencil, Ruler, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"
import { useAuth } from "../../context/auth-context"
import { getParentChildren } from "../../lib/api"
const logo = "/logo/logo-centing-raja.png"
export function ProfileParentScreen() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [childrenCount, setChildrenCount] = useState<number>(0)

  useEffect(() => {
    let active = true
    getParentChildren()
      .then((data) => {
        if (active && Array.isArray(data)) {
          setChildrenCount(data.length)
        }
      })
      .catch((err) => {
        console.warn("[Centing] Failed to fetch parent children:", err)
      })
    return () => {
      active = false
    }
  }, [])
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <ParentInputHeader logo={logo} title="Profil" />

      {/* Hero */}
      <div className="w-full px-5 pt-6 pb-8 flex flex-col items-center mx-auto max-w-6xl sm:px-8">
        <div className="relative">
          <div className="absolute -inset-1 bg-emerald-800/20 rounded-full blur-md" />
          <div className="size-24 bg-zinc-100 rounded-full shadow-sm overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={user?.avatar_url || "https://placehold.co/96x96"}
              alt={user?.name || "avatar"}
            />
          </div>
          <button
            type="button"
            onClick={() => navigate("/orang-tua/profil/edit")}
            className="absolute bottom-0 right-0 size-8 bg-emerald-800 rounded-full outline outline-2 outline-offset-[-2px] outline-white flex justify-center items-center cursor-pointer"
            aria-label="Edit profil"
          >
            <Pencil className="size-3 text-white" />
          </button>
        </div>

        <h1 className="mt-4 text-black text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
          {user?.name || "Orang Tua"}
        </h1>

        <div className="mt-3 px-3 py-2 bg-emerald-300 rounded-full flex items-center gap-1">
          <User className="size-3.5 text-emerald-800" />
          <span className="text-emerald-800 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
            Orang Tua Balita
          </span>
        </div>

        <div className="mt-5 w-full max-w-sm flex gap-3">
          <div className="flex-1 p-3 bg-white rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col items-center">
            <span className="text-emerald-800 text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
              {childrenCount}
            </span>
            <span className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif]">
              Anak Terdaftar
            </span>
          </div>
          <div className="flex-1 p-3 bg-white rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center">
            <Ruler className="size-6 text-slate-600 mb-1" />
            <span className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif]">
              Riwayat Ukur
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
     <div className="flex-1 px-5 pb-32 flex flex-col gap-6 mx-auto w-full max-w-6xl sm:px-8">
          <section className="flex flex-col gap-3">
          <span className="pl-2 text-neutral-500 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] uppercase tracking-wide">
            Akun
          </span>
          <div className="bg-white rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <MenuItem
              icon={<Pencil className="size-4 text-slate-600" />}
              iconBg="bg-blue-100"
              label="Edit Profil"
              onClick={() => navigate("/orang-tua/profil/edit")}
            />
            <Divider />
            <MenuItem
              icon={<Lock className="size-4 text-slate-600" />}
              iconBg="bg-blue-100"
              label="Ubah Kata Sandi"
              onClick={() => navigate("/orang-tua/profil/kata-sandi")}
            />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <span className="pl-2 text-neutral-500 text-xs font-semibold font-['Manrope:SemiBold',sans-serif] uppercase tracking-wide">
            Informasi
          </span>
          <div className="bg-white rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <MenuItem
              icon={<HelpCircle className="size-5 text-black" />}
              iconBg="bg-orange-300"
              label="Pusat Bantuan"
              onClick={() => navigate("/orang-tua/bantuan")}
            />
            <Divider />
            <MenuItem
              icon={<Shield className="size-4 text-black" />}
              iconBg="bg-orange-300"
              label="Kebijakan Privasi"
              onClick={() => navigate("/orang-tua/privasi")}
            />
          </div>
        </section>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              logout()
              navigate("/auth")
            }}
            className="w-full p-4 bg-rose-200 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-3"
          >
            <LogOut className="size-4 text-red-800" />
            <span className="text-red-800 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
              Keluar
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

function Divider() {
  return (
    <div className="pl-16">
      <div className="h-px bg-zinc-200" />
    </div>
  )
}

function MenuItem({
  icon,
  iconBg,
  label,
  onClick,
}: {
  icon: React.ReactNode
  iconBg: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div
          className={`size-10 ${iconBg} rounded-full flex justify-center items-center`}
        >
          {icon}
        </div>
        <span className="text-black text-base font-normal font-['Manrope:Regular',sans-serif]">
          {label}
        </span>
      </div>
      <ChevronRight className="size-4 text-stone-300" />
    </button>
  )
}
