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
import { AuthProvider, useAuth } from "../context/auth-context"
import { getRoleDashboardPath } from "../lib/auth-utils"
import type { UserProfile } from "../lib/api"
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
  const state = (location.state ?? {}) as { phone?: string; isRegistration?: boolean }

  return (
    <VerifikasiOtp
      phone={state.phone ?? ""}
      onBack={() => navigate(state.isRegistration ? "/auth/register" : "/auth/login")}
      onVerified={(user: UserProfile) => {
        if (state.isRegistration) {
          navigate("/auth/sukses")
        } else {
          navigate(getRoleDashboardPath(user.role))
        }
      }}
    />
  )
}

function ProtectedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: Array<"tenaga_kesehatan" | "kader" | "orang_tua">
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getRoleDashboardPath(user.role)} replace />
  }

  return <>{children}</>
}
function KaderProfileRoute() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <ProfileKader
      onHome={() => navigate("/kader")}
      onMaterial={() => navigate("/kader/materi")}
      onEdit={() => navigate("/kader/profil/edit")}
      onPassword={() => navigate("/kader/profil/kata-sandi")}
      onHelp={() => navigate("/kader/bantuan")}
      onPrivacy={() => navigate("/kader/privasi")}
      onLogout={() => {
        logout()
        navigate("/auth")
      }}
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
  const location = useLocation()

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
            onLogin={(phone) => navigate("/auth/otp", { state: { phone, isRegistration: false } })}
          />
        }
      />
      <Route
        path="/auth/register"
        element={
          <DaftarCentingRaja
            onBack={() => navigate("/auth/login")}
            onReturn={() => navigate("/auth")}
            onVerify={(phone) => navigate("/auth/otp", { state: { phone, isRegistration: true } })}
          />
        }
      />
      <Route path="/auth/otp" element={<OtpRoute />} />
      <Route
        path="/auth/sukses"
        element={<DaftarBerhasil onContinue={() => navigate("/auth/login")} />}
      />
      {/* Orang Tua Routes */}
      <Route
        path="/orang-tua"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
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
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/profil"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <ProfileParentScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/profil/edit"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <EditProfileParentScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/profil/kata-sandi"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <ChangePasswordParentScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/bantuan"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <HelpParentScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/privasi"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <PrivacyParentScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/input-anak"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <InputDataAnak
              onSaved={() => {
                setParentChildRegistered(true)
                navigate("/orang-tua/input-anak/berhasil")
              }}
              onHome={() => navigate("/orang-tua")}
              onMaterial={() => navigate("/orang-tua/materi")}
              onInput={() => undefined}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/input-anak/berhasil"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <DataAnakBerhasilDisimpan
              child
              onContinue={() => navigate("/orang-tua/input-pengukuran")}
              onHome={() => navigate("/orang-tua")}
              onMaterial={() => navigate("/orang-tua/materi")}
              onInput={() => navigate("/orang-tua/input-pengukuran")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/input-pengukuran"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <InputPengukuranOrangTua
              onBack={() => navigate("/orang-tua")}
              onSaved={() => navigate("/orang-tua/input-pengukuran/berhasil")}
              onHome={() => navigate("/orang-tua")}
              onMaterial={() => navigate("/orang-tua/materi")}
              onInput={() => undefined}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/input-pengukuran/berhasil"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <DataAnakBerhasilDisimpan
              child={false}
              onContinue={() => navigate("/orang-tua/detail-pertumbuhan", { state: location.state })}
              onHome={() => navigate("/orang-tua")}
              onMaterial={() => navigate("/orang-tua/materi")}
              onInput={() => navigate("/orang-tua/input-pengukuran")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/detail-pertumbuhan"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <DetailPertumbuhan
              onBack={() => navigate("/orang-tua/input-pengukuran/berhasil")}
              onViewChart={() => navigate("/orang-tua")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/materi"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
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
          </ProtectedRoute>
        }
      />
      <Route
        path="/orang-tua/materi/:id"
        element={
          <ProtectedRoute allowedRoles={["orang_tua"]}>
            <MaterialDetailRoute />
          </ProtectedRoute>
        }
      />

      {/* Kader Routes */}
      <Route
        path="/kader"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <BerandaKader
              onMaterial={() => navigate("/kader/materi")}
              onTasks={() => navigate("/kader/tugas")}
              onProfile={() => navigate("/kader/profil")}
              onInput={() => navigate("/kader/tugas/input")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/tugas"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <TugasBulanIni
              onHome={() => navigate("/kader")}
              onMaterial={() => navigate("/kader/materi")}
              onViewData={() => navigate("/kader/tugas/data")}
              onInput={() => navigate("/kader/tugas/input")}
              onProfile={() => navigate("/kader/profil")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/tugas/data"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <DataPengukuran
              onBack={() => navigate("/kader/tugas")}
              onHome={() => navigate("/kader")}
              onMaterial={() => navigate("/kader/materi")}
              onProfile={() => navigate("/kader/profil")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/tugas/input"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <InputDataPengukuran
              onBack={() => navigate("/kader/tugas")}
              onSaved={() => navigate("/kader/tugas/berhasil")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/tugas/berhasil"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <DataBerhasilDisimpan
              onHome={() => navigate("/kader")}
              onDetails={() => navigate("/kader/tugas/data")}
              onMaterial={() => navigate("/kader/materi")}
              onProfile={() => navigate("/kader/profil")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/profil"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <KaderProfileRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/bantuan"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <PusatBantuanKader
              onHome={() => navigate("/kader")}
              onMaterial={() => navigate("/kader/materi")}
              onTasks={() => navigate("/kader/tugas")}
              onProfile={() => navigate("/kader/profil")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/privasi"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <KebijakanPrivasiKader
              onHome={() => navigate("/kader")}
              onMaterial={() => navigate("/kader/materi")}
              onTasks={() => navigate("/kader/tugas")}
              onProfile={() => navigate("/kader/profil")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/profil/edit"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <EditProfileKader onBack={() => navigate("/kader/profil")} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/profil/kata-sandi"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <UbahKataSandiKader onBack={() => navigate("/kader/profil")} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/materi"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <MateriKader
              onHome={() => navigate("/kader")}
              onTasks={() => navigate("/kader/tugas")}
              onProfile={() => navigate("/kader/profil")}
              onStartQuiz={() => navigate("/kader/materi/kuis")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/materi/kuis"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <KuisKader
              onBack={() => navigate("/kader/materi")}
              onComplete={() => navigate("/kader/materi/hasil")}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kader/materi/hasil"
        element={
          <ProtectedRoute allowedRoles={["kader"]}>
            <ResultKader
              onBack={() => navigate("/kader/materi")}
              onHome={() => navigate("/kader")}
            />
          </ProtectedRoute>
        }
      />

      {/* Nakes Routes */}
      <Route
        path="/nakes"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <BerandaNakesScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/data"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <DataWilayahScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/rekapitulasi"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <RekapitulasiDataBalitaScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/sebaran-stunting"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <AnalisisSebaranStuntingScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/data/rt"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <DataAnakRtScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/input"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <InputDataAnakNakesScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/input/berhasil"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <InputDataAnakBerhasilScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/pengukuran"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <InputPengukuranNakesScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/pengukuran/berhasil"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <HasilPengukuranNakesScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/pertumbuhan"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <DetailPertumbuhanNakesScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/grafik-pertumbuhan"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <GrafikPertumbuhanNakesScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/akun"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <AkunNakesScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/tugas/baru"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <TugasBaruScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/edukasi/materi/baru"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <MateriBaruScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nakes/edukasi/kuis/baru"
        element={
          <ProtectedRoute allowedRoles={["tenaga_kesehatan"]}>
            <KuisBaruScreen />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppReveal />
        <Flow />
      </BrowserRouter>
    </AuthProvider>
  )
}