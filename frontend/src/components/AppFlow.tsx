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

import {
  AboutScreen,
  LoadingScreen,
  ParentGuideScreen,
  WelcomeScreen,
} from "../features/onboarding/screens"
import {
  AuthScreen,
  LoginScreen,
  OtpScreen,
  RegisterScreen,
  SuccessScreen,
} from "../features/auth/screens"
import {
  DataBerhasilDisimpanScreen,
  DataPengukuranScreen,
  EditProfileScreen,
  InputPengukuranScreen,
  KaderDashboard,
  KebijakanPrivasiScreen,
  KuisKaderScreen,
  MateriKaderScreen,
  ProfileKaderScreen,
  PusatBantuanScreen,
  QuizResultScreen,
  TugasBulanIniScreen,
  UbahKataSandiScreen,
} from "../features/kader/screens"
import {
  InputDataAnakScreen,
  ParentDashboardScreen,
  ParentGrowthDetailScreen,
  ParentMaterialDetailScreen,
  ParentMaterialsScreen,
  ParentMeasurementInputScreen,
  ParentSuccessScreen,
  parentMaterialItems,
} from "../features/parent/screens"

function SplashGate() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(
      () => navigate("/welcome-pages", { replace: true }),
      5000,
    )

    return () => window.clearTimeout(timer)
  }, [navigate])

  return <LoadingScreen />
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
    <OtpScreen
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
    <ParentMaterialDetailScreen
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
          <WelcomeScreen
            onComplete={() => navigate("/welcome-pages/tentang")}
          />
        }
      />
      <Route
        path="/welcome-pages/tentang"
        element={
          <AboutScreen onComplete={() => navigate("/welcome-pages/panduan")} />
        }
      />
      <Route
        path="/welcome-pages/panduan"
        element={
          <ParentGuideScreen
            guideIndex={0}
            onNext={() => navigate("/welcome-pages/panduan/nakes")}
          />
        }
      />
      <Route
        path="/welcome-pages/panduan/nakes"
        element={
          <ParentGuideScreen
            nakes
            guideIndex={1}
            onNext={() => navigate("/welcome-pages/panduan/kader")}
          />
        }
      />
      <Route
        path="/welcome-pages/panduan/kader"
        element={
          <ParentGuideScreen
            kader
            guideIndex={2}
            onNext={() => navigate("/auth")}
          />
        }
      />
      <Route
        path="/auth"
        element={
          <AuthScreen
            onLogin={() => navigate("/auth/login")}
            onRegister={() => navigate("/auth/register")}
          />
        }
      />
      <Route
        path="/auth/login"
        element={
          <LoginScreen
            onBack={() => navigate("/auth")}
            onLogin={(role) =>
              navigate(
                role === "Kader"
                  ? "/kader"
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
          <RegisterScreen
            onBack={() => navigate("/auth/login")}
            onReturn={() => navigate("/auth")}
            onVerify={(phone) => navigate("/auth/otp", { state: { phone } })}
          />
        }
      />
      <Route path="/auth/otp" element={<OtpRoute />} />
      <Route
        path="/auth/sukses"
        element={<SuccessScreen onContinue={() => navigate("/auth/login")} />}
      />
      <Route
        path="/orang-tua"
        element={
          <ParentDashboardScreen
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
      <Route
        path="/orang-tua/input-anak"
        element={
          <InputDataAnakScreen
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
          <ParentSuccessScreen
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
          <ParentMeasurementInputScreen
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
          <ParentSuccessScreen
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
          <ParentGrowthDetailScreen
            onBack={() => navigate("/orang-tua/input-pengukuran/berhasil")}
            onViewChart={() => navigate("/orang-tua")}
          />
        }
      />
      <Route
        path="/orang-tua/materi"
        element={
          <ParentMaterialsScreen
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
          <KaderDashboard
            onMaterial={() => navigate("/kader/materi")}
            onTasks={() => navigate("/kader/tugas")}
            onProfile={() => navigate("/kader/profil")}
          />
        }
      />
      <Route
        path="/kader/tugas"
        element={
          <TugasBulanIniScreen
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
          <DataPengukuranScreen
            onBack={() => navigate("/kader/tugas")}
            onHome={() => navigate("/kader")}
            onMaterial={() => navigate("/kader/materi")}
          />
        }
      />
      <Route
        path="/kader/tugas/input"
        element={
          <InputPengukuranScreen
            onBack={() => navigate("/kader/tugas")}
            onSaved={() => navigate("/kader/tugas/berhasil")}
          />
        }
      />
      <Route
        path="/kader/tugas/berhasil"
        element={
          <DataBerhasilDisimpanScreen
            onHome={() => navigate("/kader")}
            onDetails={() => navigate("/kader/tugas/data")}
            onMaterial={() => navigate("/kader/materi")}
          />
        }
      />
      <Route
        path="/kader/profil"
        element={
          <ProfileKaderScreen
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
          <PusatBantuanScreen
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
          <KebijakanPrivasiScreen
            onHome={() => navigate("/kader")}
            onMaterial={() => navigate("/kader/materi")}
            onTasks={() => navigate("/kader/tugas")}
            onProfile={() => navigate("/kader/profil")}
          />
        }
      />
      <Route
        path="/kader/profil/edit"
        element={<EditProfileScreen onBack={() => navigate("/kader/profil")} />}
      />
      <Route
        path="/kader/profil/kata-sandi"
        element={
          <UbahKataSandiScreen onBack={() => navigate("/kader/profil")} />
        }
      />
      <Route
        path="/kader/materi"
        element={
          <MateriKaderScreen
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
          <KuisKaderScreen
            onBack={() => navigate("/kader/materi")}
            onComplete={() => navigate("/kader/materi/hasil")}
          />
        }
      />
      <Route
        path="/kader/materi/hasil"
        element={
          <QuizResultScreen
            onBack={() => navigate("/kader/materi")}
            onHome={() => navigate("/kader")}
          />
        }
      />
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
