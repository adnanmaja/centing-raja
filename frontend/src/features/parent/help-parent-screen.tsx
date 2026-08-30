import { useNavigate } from "react-router-dom"
import { Mail, MessageCircle } from "lucide-react"

import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"

const logo = "/logo/logo-centing-raja.png"

export function HelpParentScreen() {
  const navigate = useNavigate()

  const handleWhatsApp = () => {
    window.open("https://wa.me/6281234567890", "_blank")
  }

  const handleEmail = () => {
    window.location.href = "mailto:gauzamf22@gmail.com"
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <ParentInputHeader logo={logo} title="Profile" onBack={() => navigate("/orang-tua/profil")} />

      <div className="flex-1 px-5 py-6 pb-32 mx-auto w-full max-w-6xl sm:px-8">
        <div className="relative p-6 bg-emerald-300 rounded-3xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center gap-2 sm:max-w-2xl sm:mx-auto">
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div className="w-full h-44 absolute left-0 top-[60px] bg-emerald-800" />
          </div>

          <h1 className="relative text-center text-emerald-800 text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
            Masih butuh bantuan?
          </h1>
          <p className="relative text-center text-emerald-800/80 text-sm font-normal font-['Manrope:Regular',sans-serif]">
            Tim kami siap membantu menjawab pertanyaan Bunda kapan saja.
          </p>

          <div className="relative w-full pt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2"
            >
              <MessageCircle className="size-4 text-emerald-800" />
              <span className="text-emerald-800 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
                Chat via WhatsApp
              </span>
            </button>

            <button
              type="button"
              onClick={handleEmail}
              className="w-full px-4 py-3 rounded-xl outline outline-1 outline-offset-[-1px] outline-emerald-800/20 flex justify-center items-center gap-2"
            >
              <Mail className="size-4 text-emerald-800" />
              <span className="text-emerald-800 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">
                Kirim Email
              </span>
            </button>
          </div>
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