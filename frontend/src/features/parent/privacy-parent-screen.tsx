import { useNavigate } from "react-router-dom"
import { Check, Shield } from "lucide-react"

import { ParentInputHeader } from "../../components/parent/parent-input-header"
import { ParentBottomNav } from "../../components/parent/parent-bottom-nav"

const logo = "/logo/logo-centing-raja.png"

const SECTIONS = [
  {
    title: "1. Informasi yang Kami Kumpulkan",
    intro:
      "Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk namun tidak terbatas pada:",
    points: [
      "Nama lengkap orang tua/wali dan anak.",
      "Tanggal lahir, jenis kelamin, dan data antropometri anak (berat badan, tinggi badan, lingkar kepala).",
      "Informasi kontak (nomor telepon, alamat email).",
      "Data kesehatan dan gizi anak yang dimasukkan ke dalam aplikasi.",
    ],
  },
  {
    title: "2. Penggunaan Informasi",
    intro: "Informasi yang dikumpulkan digunakan untuk:",
    points: [
      "Memantau pertumbuhan dan perkembangan anak Anda.",
      "Memberikan rekomendasi gizi dan kesehatan yang dipersonalisasi.",
      "Memungkinkan tenaga kesehatan (Nakes/Kader) memantau status gizi anak di wilayah Anda.",
      "Meningkatkan layanan dan fitur aplikasi Centing Raja.",
    ],
  },
  {
    title: "3. Berbagi Informasi",
    intro:
      "Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Informasi Anda mungkin dibagikan dengan:",
    points: [
      "Tenaga kesehatan (Nakes) dan Kader Posyandu yang berwenang di wilayah Anda untuk keperluan pemantauan stunting.",
      "Pihak ketiga yang membantu kami mengoperasikan aplikasi, dengan kewajiban menjaga kerahasiaan data.",
      "Pihak berwenang jika diwajibkan oleh hukum atau untuk melindungi hak dan keselamatan pengguna.",
    ],
  },
  {
    title: "4. Keamanan Data Anak",
    intro:
      "Kami menerapkan langkah-langkah keamanan teknis dan administratif yang ketat untuk melindungi data sensitif anak Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Data disimpan dalam server yang aman dengan enkripsi.",
    points: [],
  },
  {
    title: "5. Hak Anda",
    intro:
      "Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda dan anak Anda kapan saja melalui pengaturan aplikasi. Jika Anda memerlukan bantuan, Anda dapat menghubungi tim dukungan kami.",
    points: [],
  },
]

export function PrivacyParentScreen() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <ParentInputHeader logo={logo} title="Profil" />

      <div className="flex-1 px-5 py-4 pb-32 flex flex-col gap-6 mx-auto w-full max-w-6xl sm:px-8">
          <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/orang-tua/profil")}
            className="size-10 bg-zinc-100 rounded-full flex justify-center items-center"
            aria-label="Kembali"
          >
            <Shield className="size-4 text-black" />
          </button>
          <h1 className="text-black text-2xl font-bold font-['Plus_Jakarta_Sans:Bold',sans-serif]">
            Kebijakan Privasi
          </h1>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif]">
            Terakhir diperbarui: 24 Oktober 2023
          </p>
          <p className="text-black text-sm font-normal font-['Manrope:Regular',sans-serif]">
            Centing Raja berkomitmen untuk melindungi privasi Anda dan anak
            Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan,
            menggunakan, dan melindungi informasi pribadi Anda.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="p-4 bg-zinc-100 rounded-xl flex flex-col gap-2"
            >
              <h2 className="text-black text-xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif]">
                {section.title}
              </h2>
              <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif]">
                {section.intro}
              </p>
              {section.points.length > 0 && (
                <ul className="pl-4 pt-1 flex flex-col gap-1 list-disc marker:text-neutral-400">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif]"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="pt-6">
          <button
            type="button"
            onClick={() => navigate("/orang-tua/profil")}
            className="w-full py-3 bg-emerald-800 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2"
          >
            <Check className="size-5 text-white" />
            <span className="text-white text-base font-normal font-['Manrope:Regular',sans-serif]">
              Saya Mengerti
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
