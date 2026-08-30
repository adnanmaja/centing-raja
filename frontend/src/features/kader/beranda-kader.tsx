import { motion } from "framer-motion"

import { ProfileHeader } from "../../components/kader/profile-header"
import { ProfileBottomNav } from "../../components/kader/profile-bottom-nav"
import { SvgIcon } from "../../components/ui/svg-icon"

import kaderNavPaths from "../../assets/icon-kader-nav"
import kaderActionPaths from "../../assets/icon-kader-action"
import kaderReminderPaths from "../../assets/icon-kader-reminder"
import kaderTaskPaths from "../../assets/icon-kader-task"

const kaderEducationImage = "/images/poster-protein-hewani-cegah-stunting.png"
const kaderNewsImage = "/images/kegiatan-posyandu.png"

export function BerandaKader({
  onMaterial,
  onTasks,
  onProfile,
  onInput,
}: {
  onMaterial: () => void
  onTasks: () => void
  onProfile: () => void
  onInput: () => void
}) {
  const news = [
    {
      image: kaderEducationImage,
      category: "Gizi",
      categoryClass: "bg-[#cfe1f8] text-[#536478]",
      title: "Pentingnya Protein Hewani untuk Mencegah Stunting",
      time: "2 jam yang lalu",
    },
    {
      image: kaderNewsImage,
      category: "Kegiatan",
      categoryClass: "bg-[#e9f7ef] text-[#006d42]",
      title: "Jadwal Kelas Ibu Balita Desa Suka Maju Bulan November",
      time: "1 hari yang lalu",
    },
    {
      image:
        "https://images.unsplash.com/photo-1681378128359-a5c2492a3535?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
      category: "Resep",
      categoryClass: "bg-[#fbefc8] text-[#765b06]",
      title: "Menu Seimbang untuk Mendukung Tumbuh Kembang Anak",
      time: "2 hari yang lalu",
    },
    {
      image:
        "https://images.unsplash.com/photo-1655740005902-2436216b82b8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
      category: "Edukasi",
      categoryClass: "bg-[#e9f7ef] text-[#006d42]",
      title: "Ide Bekal Bergizi yang Disukai Anak",
      time: "3 hari yang lalu",
    },
  ]

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8f9fa] pb-28 pt-16 text-[#191c1d]">
      <ProfileHeader title="Beranda" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl px-5 pb-10 pt-6 sm:px-8"
      >
        <section className="kader-hero rounded-2xl bg-[#e9f7ef] p-5 shadow-[0_8px_26px_rgba(0,109,66,0.06)] xl:flex xl:items-center xl:justify-between xl:gap-10 xl:p-8">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold leading-7 xl:text-2xl">
              Halo, Kader Nur!
            </h1>
            <p className="mt-1 font-['Manrope:Regular',sans-serif] text-sm text-[#3e4941]">
              Senin, 24 Oktober 2023
            </p>
          </div>
          <div className="mt-5 rounded-xl bg-white/70 p-3 xl:mt-0 xl:w-3/5 xl:p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-[#3e4941]">
                Tugas Hari Ini
              </p>
              <span className="rounded-full bg-[#ba1a1a]/10 px-2 py-1 font-['Manrope:Regular',sans-serif] text-[10px] text-[#ba1a1a]">
                3 Belum Selesai
              </span>
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#cfe1f8] text-[#536478]">
                <SvgIcon path={kaderTaskPaths.p411f900} viewBox="0 0 8 20" className="h-5 w-2" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                  Kunjungan Ibu Hamil (Bumil)
                </p>
                <p className="mt-1 text-xs text-[#3e4941]">Posyandu Melati 1</p>
              </div>
              <button
                type="button"
                onClick={onTasks}
                className="grid size-8 shrink-0 place-items-center rounded-full bg-[#006d42] text-white transition hover:bg-[#005c38] active:scale-95"
                aria-label="Buka tugas"
              >
                <SvgIcon path={kaderTaskPaths.p4874b00} viewBox="0 0 5.55 9" className="h-2.5 w-1.5" />
              </button>
            </div>
          </div>
        </section>

        <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] xl:gap-8">
          <div className="space-y-6 xl:space-y-8">
            <section>
              <div className="flex items-end justify-between">
                <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                  Aksi Cepat
                </h2>
                <span className="text-xs text-[#63747a]">Pilih aktivitas</span>
              </div>
              <div className="mt-3 grid w-full max-w-[350px] grid-cols-2 gap-3 lg:max-w-none">
                <button
                  type="button"
                  onClick={onMaterial}
                  className="quick-action group relative min-w-0 overflow-hidden rounded-xl bg-white px-2 py-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-4"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative mx-auto grid size-12 place-items-center rounded-full bg-[#76d69f] text-[#005c38] transition-transform group-hover:scale-110">
                    <SvgIcon path={kaderNavPaths.pd44dd40} viewBox="0 0 18 18" className="size-[18px]" />
                  </span>
                  <span className="relative mt-3 block font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                    Edukasi
                    <br />
                    Kader
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onInput}
                  className="quick-action group min-w-0 rounded-xl bg-white px-2 py-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-4"
                >
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e3bf66] text-[#654000] transition-transform group-hover:scale-110">
                    <SvgIcon path={kaderActionPaths.p1eac3d80} viewBox="0 0 18 18" className="size-[18px]" />
                  </span>
                  <span className="mt-3 block font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                    Input
                    <br />
                    Pengukuran Balita
                  </span>
                </button>
              </div>
            </section>

            <section className="relative w-full max-w-[350px] overflow-hidden rounded-xl bg-[#f3f4f5] p-4 pl-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] lg:max-w-none">
              <div className="absolute inset-y-0 left-0 w-2 bg-[#ba1a1a]" />
              <div className="flex min-w-0 gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a]">
                  <SvgIcon path={kaderReminderPaths.p3f50100} viewBox="0 0 20 20.05" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-['Manrope:SemiBold',sans-serif] text-sm font-semibold">
                    Pengingat Penting
                  </h2>
                  <p className="mt-1 break-words text-sm leading-5 text-[#3e4941]">
                    Ada 5 balita di wilayah Anda yang belum melakukan pengukuran bulan ini.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="min-w-0 max-w-full xl:row-span-2">
            <div className="flex items-end justify-between">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold">
                Berita &amp; Edukasi
              </h2>
              <button type="button" className="font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#006d42]">
                Lihat Semua
              </button>
            </div>
            <div className="news-scroll mt-3 flex w-full max-w-full snap-x snap-mandatory gap-3 overflow-x-scroll overscroll-x-contain pb-3 pr-5 touch-pan-x xl:pr-10">
              {news.map((item) => (
                <article
                  key={item.title}
                  className="news-card w-[78vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] xl:w-[360px]"
                >
                  <img src={item.image} alt="" className="h-36 w-full object-cover" />
                  <div className="p-3">
                    <span className={`inline-flex rounded px-2 py-0.5 font-['Manrope:Regular',sans-serif] text-[10px] ${item.categoryClass}`}>
                      {item.category}
                    </span>
                    <h3 className="mt-2 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold leading-5">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#63747a]">{item.time}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </motion.div>

      <ProfileBottomNav
        active="Beranda"
        onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMaterial={onMaterial}
        onTasks={onTasks}
        onProfile={onProfile}
      />
    </main>
  )
}