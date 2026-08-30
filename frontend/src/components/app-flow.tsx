import { useEffect, useRef, useState } from "react"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom"

import { Loading } from "../features/onboarding/loading"
import { Welcome } from "../features/onboarding/welcome"
import { TentangCentingRaja } from "../features/onboarding/tentang-centing-raja"
import { Panduan } from "../features/onboarding/panduan"

import { CentingRajaAuth } from "../features/auth/centing-raja-auth"
import { MasukCentingRaja } from "../features/auth/masuk-centing-raja"
import { DaftarCentingRaja } from "../features/auth/daftar-centing-raja"
import { VerifikasiOtp } from "../features/auth/verifikasi-otp"
import { DaftarBerhasil } from "../features/auth/daftar-berhasil"

import { BerandaKader } from "../features/kader/beranda-kader"
import { TugasBulanIni } from "../features/kader/tugas-bulan-ini"
import { DataPengukuran } from "../features/kader/data-pengukuran"
import { InputDataPengukuran } from "../features/kader/input-data-pengukuran"
import { DataBerhasilDisimpan } from "../features/kader/data-berhasil-disimpan"
import { MateriKader } from "../features/kader/materi-kader"
import { KuisKader } from "../features/kader/kuis-kader"
import { ResultKader } from "../features/kader/result-kader"
import { ProfileKader } from "../features/kader/profile-kader"
import { EditProfileKader } from "../features/kader/edit-profile-kader"
import { UbahKataSandiKader } from "../features/kader/ubah-kata-sandi-kader"
import { PusatBantuanKader } from "../features/kader/pusat-bantuan-kader"
import { KebijakanPrivasiKader } from "../features/kader/kebijakan-privasi-kader"

import { BerandaOrangTua } from "../features/parent/beranda-orang-tua"
import { InputDataAnak } from "../features/parent/input-data-anak"
import { DataAnakBerhasilDisimpan } from "../features/parent/data-anak-berhasil-disimpan"
import { InputPengukuranOrangTua } from "../features/parent/input-pengukuran-orang-tua"
import { DetailPertumbuhan } from "../features/parent/detail-pertumbuhan"
import { MateriEdukasi } from "../features/parent/materi-edukasi"
import { DetailMateriEdukasi } from "../features/parent/detail-materi-edukasi"
import { parentMaterialItems } from "../features/parent/parent-materials"
import { ProfileParentScreen } from "../features/parent/profile-parent-screen"
import { EditProfileParentScreen } from "../features/parent/edit-profile-parent-screen"
import { ChangePasswordParentScreen } from "../features/parent/change-password-parent-screen"
import { HelpParentScreen } from "../features/parent/help-parent-screen"
import { PrivacyParentScreen } from "../features/parent/privacy-parent-screen"

import { BerandaNakesScreen } from "../features/nakes/beranda-nakes-screen"
import { RekapitulasiDataBalitaScreen } from "../features/nakes/rekapitulasi-data-balita-screen"
import { AnalisisSebaranStuntingScreen } from "../features/nakes/analisis-sebaran-stunting-screen"
import { DataWilayahScreen } from "../features/nakes/data-wilayah-screen"
import { DataAnakRtScreen } from "../features/nakes/data-anak-rt-screen"
import { InputDataAnakNakesScreen } from "../features/nakes/input-data-anak-nakes-screen"
import { InputDataAnakBerhasilScreen } from "../features/nakes/input-data-anak-berhasil-screen"
import { AkunNakesScreen } from "../features/nakes/akun-nakes-screen"
import { InputPengukuranNakesScreen } from "../features/nakes/input-pengukuran-nakes-screen"
import { HasilPengukuranNakesScreen } from "../features/nakes/hasil-pengukuran-nakes-screen"
import { DetailPertumbuhanNakesScreen } from "../features/nakes/detail-pertumbuhan-nakes-screen"
import { GrafikPertumbuhanNakesScreen } from "../features/nakes/grafik-pertumbuhan-nakes-screen"
import { TugasBaruScreen } from "../features/nakes/tugas-baru-screen"
import { MateriBaruScreen } from "../features/nakes/materi-baru-screen"
import { KuisBaruScreen } from "../features/nakes/kuis-baru-screen"

function SplashGate() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(
      () => navigate("/welcome-pages", { replace: true }),
      5000,
    )

    return () => window.clearTimeout(timer)
  }, [navigate])

  return <Loading />
}

function AppReveal() {
  const { pathname } = useLocation()
  const revealObserver = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    revealObserver.current?.disconnect()

    if (
      pathname === "/" ||
      pathname === "/welcome-pages" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal-page] header, [data-reveal-page] section, [data-reveal-page] article, [data-reveal-page] nav",
      ),
    )

    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal")

      element.style.setProperty(
        "--reveal-delay",

        `${Math.min(index * 70, 280)}ms`,
      )
    })

    revealObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed")

            revealObserver.current?.unobserve(entry.target)
          }
        })
      },

      { threshold: 0.12, rootMargin: "0px 0px -32px" },
    )

    elements.forEach((element) => revealObserver.current?.observe(element))

    return () => revealObserver.current?.disconnect()
  }, [pathname])

  return null
}

function OtpRoute() {
  const location = useLocation()

  const navigate = useNavigate()

  const state = (location.state ?? {}) as { phone?: string }

  return (
    <VerifikasiOtp
      phone={state.phone ?? ""}
      onBack={() => navigate("/auth/register")}
      onVerified={() => navigate("/auth/sukses")}
    />
  )
}

function MaterialDetailRoute() {
  const { id } = useParams()

  const navigate = useNavigate()

  const material = parentMaterialItems.find((item) => item.id === id)

  if (!material) return <Navigate to="/orang-tua/materi" replace />

  return (
    <DetailMateriEdukasi
      material={material}
      onBack={() => navigate("/orang-tua/materi")}
      onHome={() => navigate("/orang-tua")}
    />
  )
}

function Flow() {
  const navigate = useNavigate()

  const [parentChildRegistered, setParentChildRegistered] = useState(false)

  return (
    <Routes>
      <Route path="/" element={<SplashGate />} />
      <Route
        path="/welcome-pages"
        element={
          <Welcome
            onComplete={() => navigate("/welcome-pages/tentang")}
            onSkip={() => navigate("/auth")}
          />
        }
      />
      <Route
        path="/welcome-pages/tentang"
        element={
          <TentangCentingRaja onComplete={() => navigate("/welcome-pages/panduan")} />
        }
      />
      <Route
        path="/welcome-pages/panduan"
        element={
          <Panduan
            guideIndex={0}
            onNext={() => navigate("/welcome-pages/panduan/nakes")}
            onSkip={() => navigate("/auth")}
          onBack={() => navigate("/welcome-pages/tentang")}
          />
        }
      />
      <Route
        path="/welcome-pages/panduan/nakes"
        element={
          <Panduan
            nakes
            guideIndex={1}
            onNext={() => navigate("/welcome-pages/panduan/kader")}
             onSkip={() => navigate("/auth")}
        onBack={() => navigate("/welcome-pages/panduan")}
          />
        }
      />
      <Route
        path="/welcome-pages/panduan/kader"
        element={
          <Panduan
            kader
            guideIndex={2}
            onNext={() => navigate("/auth")}
             onSkip={() => navigate("/auth")}
          onBack={() => navigate("/welcome-pages/panduan/nakes")}
          />
        }
      />
      <Route
        path="/auth"
        element={
          <CentingRajaAuth
            onLogin={() => navigate("/auth/login")}
            onRegister={() => navigate("/auth/register")}
            onTutorial={() => navigate("/welcome-pages/panduan")}
          />
        }
      />
      <Route
        path="/auth/login"
        element={
          <MasukCentingRaja
            onBack={() => navigate("/auth")}
            onLogin={(role) =>
              navigate(
                role === "Kader"
                  ? "/kader"
                  : role === "Nakes"
                    ? "/nakes"
                    : role === "Orang Tua"
                      ? "/orang-tua"
                      : "/auth",
              )
            }
          />
        }
      />
      <Route
        path="/auth/register"
        element={
          <DaftarCentingRaja
            onBack={() => navigate("/auth/login")}
            onReturn={() => navigate("/auth")}
            onVerify={(phone) => navigate("/auth/otp", { state: { phone } })}
          />
        }
      />
      <Route path="/auth/otp" element={<OtpRoute />} />
      <Route
        path="/auth/sukses"
        element={<DaftarBerhasil onContinue={() => navigate("/auth/login")} />}
      />
      <Route
        path="/orang-tua"
        element={
          <BerandaOrangTua
            onMaterial={() => navigate("/orang-tua/materi")}
            onInput={() =>
              navigate(
                parentChildRegistered
                  ? "/orang-tua/input-pengukuran"
                  : "/orang-tua/input-anak",
              )
            }
          />
        }
      />
      <Route path="/orang-tua/profil" element={<ProfileParentScreen />} />
      <Route
        path="/orang-tua/profil/edit"
        element={<EditProfileParentScreen />}
      />
      <Route
        path="/orang-tua/profil/kata-sandi"
        element={<ChangePasswordParentScreen />}
      />
      <Route path="/orang-tua/bantuan" element={<HelpParentScreen />} />
      <Route path="/orang-tua/privasi" element={<PrivacyParentScreen />} />
      <Route
        path="/orang-tua/input-anak"
        element={
          <InputDataAnak
            onSaved={() => {
              setParentChildRegistered(true)

              navigate("/orang-tua/input-anak/berhasil")
            }}
            onHome={() => navigate("/orang-tua")}
            onMaterial={() => navigate("/orang-tua/materi")}
            onInput={() => undefined}
          />
        }
      />
      <Route
        path="/orang-tua/input-anak/berhasil"
        element={
          <DataAnakBerhasilDisimpan
            child
            onContinue={() => navigate("/orang-tua/input-pengukuran")}
            onHome={() => navigate("/orang-tua")}
            onMaterial={() => navigate("/orang-tua/materi")}
            onInput={() => navigate("/orang-tua/input-pengukuran")}
          />
        }
      />
      <Route
        path="/orang-tua/input-pengukuran"
        element={
          <InputPengukuranOrangTua
            onBack={() => navigate("/orang-tua")}
            onSaved={() => navigate("/orang-tua/input-pengukuran/berhasil")}
            onHome={() => navigate("/orang-tua")}
            onMaterial={() => navigate("/orang-tua/materi")}
            onInput={() => undefined}
          />
        }
      />
      <Route
        path="/orang-tua/input-pengukuran/berhasil"
        element={
          <DataAnakBerhasilDisimpan
            onContinue={() => navigate("/orang-tua/detail-pertumbuhan")}
            onHome={() => navigate("/orang-tua")}
            onMaterial={() => navigate("/orang-tua/materi")}
            onInput={() => navigate("/orang-tua/input-pengukuran")}
          />
        }
      />
      <Route
        path="/orang-tua/detail-pertumbuhan"
        element={
          <DetailPertumbuhan
            onBack={() => navigate("/orang-tua/input-pengukuran/berhasil")}
            onViewChart={() => navigate("/orang-tua")}
          />
        }
      />
      <Route
        path="/orang-tua/materi"
        element={
          <MateriEdukasi
            onHome={() => navigate("/orang-tua")}
            onInput={() =>
              navigate(
                parentChildRegistered
                  ? "/orang-tua/input-pengukuran"
                  : "/orang-tua/input-anak",
              )
            }
            onOpen={(material) => navigate(`/orang-tua/materi/${material.id}`)}
          />
        }
      />
      <Route path="/orang-tua/materi/:id" element={<MaterialDetailRoute />} />
      <Route
        path="/kader"
        element={
          <BerandaKader
            onMaterial={() => navigate("/kader/materi")}
            onTasks={() => navigate("/kader/tugas")}
            onProfile={() => navigate("/kader/profil")}
          />
        }
      />
      <Route
        path="/kader/tugas"
        element={
          <TugasBulanIni
            onHome={() => navigate("/kader")}
            onMaterial={() => navigate("/kader/materi")}
            onViewData={() => navigate("/kader/tugas/data")}
            onInput={() => navigate("/kader/tugas/input")}
          />
        }
      />
      <Route
        path="/kader/tugas/data"
        element={
          <DataPengukuran
            onBack={() => navigate("/kader/tugas")}
            onHome={() => navigate("/kader")}
            onMaterial={() => navigate("/kader/materi")}
          />
        }
      />
      <Route
        path="/kader/tugas/input"
        element={
          <InputDataPengukuran
            onBack={() => navigate("/kader/tugas")}
            onSaved={() => navigate("/kader/tugas/berhasil")}
          />
        }
      />
      <Route
        path="/kader/tugas/berhasil"
        element={
          <DataBerhasilDisimpan
            onHome={() => navigate("/kader")}
            onDetails={() => navigate("/kader/tugas/data")}
            onMaterial={() => navigate("/kader/materi")}
          />
        }
      />
      <Route
        path="/kader/profil"
        element={
          <ProfileKader
            onHome={() => navigate("/kader")}
            onMaterial={() => navigate("/kader/materi")}
            onEdit={() => navigate("/kader/profil/edit")}
            onPassword={() => navigate("/kader/profil/kata-sandi")}
            onHelp={() => navigate("/kader/bantuan")}
            onPrivacy={() => navigate("/kader/privasi")}
            onLogout={() => navigate("/auth")}
          />
        }
      />
      <Route
        path="/kader/bantuan"
        element={
          <PusatBantuanKader
            onHome={() => navigate("/kader")}
            onMaterial={() => navigate("/kader/materi")}
            onTasks={() => navigate("/kader/tugas")}
            onProfile={() => navigate("/kader/profil")}
          />
        }
      />
      <Route
        path="/kader/privasi"
        element={
          <KebijakanPrivasiKader
            onHome={() => navigate("/kader")}
            onMaterial={() => navigate("/kader/materi")}
            onTasks={() => navigate("/kader/tugas")}
            onProfile={() => navigate("/kader/profil")}
          />
        }
      />
      <Route
        path="/kader/profil/edit"
        element={<EditProfileKader onBack={() => navigate("/kader/profil")} />}
      />
      <Route
        path="/kader/profil/kata-sandi"
        element={
          <UbahKataSandiKader onBack={() => navigate("/kader/profil")} />
        }
      />
      <Route
        path="/kader/materi"
        element={
          <MateriKader
            onHome={() => navigate("/kader")}
            onTasks={() => navigate("/kader/tugas")}
            onProfile={() => navigate("/kader/profil")}
            onStartQuiz={() => navigate("/kader/materi/kuis")}
          />
        }
      />
      <Route
        path="/kader/materi/kuis"
        element={
          <KuisKader
            onBack={() => navigate("/kader/materi")}
            onComplete={() => navigate("/kader/materi/hasil")}
          />
        }
      />
      <Route
        path="/kader/materi/hasil"
        element={
          <ResultKader
            onBack={() => navigate("/kader/materi")}
            onHome={() => navigate("/kader")}
          />
        }
      />
      <Route path="/nakes" element={<BerandaNakesScreen />} />
      <Route path="/nakes/data" element={<DataWilayahScreen />} />
      <Route
        path="/nakes/rekapitulasi"
        element={<RekapitulasiDataBalitaScreen />}
      />
      <Route
        path="/nakes/sebaran-stunting"
        element={<AnalisisSebaranStuntingScreen />}
      />
      <Route path="/nakes/data/rt" element={<DataAnakRtScreen />} />
      <Route path="/nakes/input" element={<InputDataAnakNakesScreen />} />
      <Route
        path="/nakes/input/berhasil"
        element={<InputDataAnakBerhasilScreen />}
      />
      <Route path="/nakes/pengukuran" element={<InputPengukuranNakesScreen />} />
      <Route path="/nakes/pengukuran/berhasil" element={<HasilPengukuranNakesScreen />} />
      <Route path="/nakes/pertumbuhan" element={<DetailPertumbuhanNakesScreen />} />
      <Route path="/nakes/grafik-pertumbuhan" element={<GrafikPertumbuhanNakesScreen />} />
      <Route path="/nakes/akun" element={<AkunNakesScreen />} />
      <Route path="/nakes/tugas/baru" element={<TugasBaruScreen />} />
      <Route path="/nakes/edukasi/materi/baru" element={<MateriBaruScreen />} />
      <Route path="/nakes/edukasi/kuis/baru" element={<KuisBaruScreen />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppReveal />
      <Flow />
    </BrowserRouter>
  )
}