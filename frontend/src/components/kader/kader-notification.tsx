import { SvgIcon } from "../ui/svg-icon"
import parentNotificationPaths from "../../assets/icon-parent-notification"

export function KaderNotification({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Notifikasi Kader"
    >
      <article className="w-full max-w-[420px] rounded-[24px] bg-white p-5 shadow-[0_20px_55px_rgba(0,0,0,0.24)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-11 place-items-center rounded-full bg-[#ffe2df] text-[#d84747]">
            <SvgIcon path={parentNotificationPaths.p164b49c0} viewBox="0 0 16 20" className="size-5" />
          </span>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-xl leading-none text-[#63747a] transition hover:bg-[#f3f4f5]"
            aria-label="Tutup notifikasi"
          >
            ×
          </button>
        </div>
        <p className="mt-5 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold uppercase tracking-[0.09em] text-[#d84747]">
          Pengingat Tugas
        </p>
        <h2 className="mt-2 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold leading-7 text-[#191c1d]">
          Ada balita yang belum diukur lebih dari 1 minggu
        </h2>
        <p className="mt-3 font-['Manrope:Regular',sans-serif] text-sm leading-6 text-[#3e4941]">
          Beberapa balita di wilayah Anda sudah melewati batas satu minggu tanpa
          pengukuran. Segera lakukan kunjungan agar data pertumbuhan tetap
          terpantau.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 min-h-11 w-full rounded-xl bg-[#006d42] px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_4px_10px_rgba(0,109,66,0.18)] transition hover:bg-[#005c38]"
        >
          Mengerti
        </button>
      </article>
    </div>
  )
}