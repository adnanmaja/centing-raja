import { useEffect, useState } from "react"
import { SvgIcon } from "../ui/svg-icon"
import { getNotifications, markNotificationAsRead, type NotificationItem } from "../../lib/api"
import parentNotificationPaths from "../../assets/icon-parent-notification"

function formatNotificationTime(dateStr?: string): string {
  if (!dateStr) return "Baru saja"
  const diffMs = Date.now() - new Date(dateStr).getTime()
  if (isNaN(diffMs) || diffMs < 0) return "Baru saja"
  const diffMins = Math.floor(diffMs / (1000 * 60))
  if (diffMins < 1) return "Baru saja"
  if (diffMins < 60) return `${diffMins} menit lalu`
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffHours < 24) return `${diffHours} jam lalu`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return "1 hari lalu"
  if (diffDays < 30) return `${diffDays} hari lalu`
  return `${Math.floor(diffDays / 30)} bulan lalu`
}

export function ParentNotification({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState<NotificationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    getNotifications()
      .then((data) => {
        if (active && Array.isArray(data)) {
          setItems(data)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleMarkItemAsRead = (item: NotificationItem) => {
    if (!item.is_read) {
      markNotificationAsRead(item.id).catch(() => {})
      setItems((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, is_read: true } : n))
      )
    }
  }

  const handleDismiss = () => {
    const unreadItems = items.filter((n) => !n.is_read)
    if (unreadItems.length > 0) {
      Promise.all(unreadItems.map((n) => markNotificationAsRead(n.id).catch(() => {}))).finally(() => {
        onClose()
      })
    } else {
      onClose()
    }
  }

  const unreadCount = items.filter((n) => !n.is_read).length

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Notifikasi Pengukuran"
    >
      <article className="flex max-h-[85vh] w-full max-w-[420px] flex-col rounded-[24px] bg-white p-5 shadow-[0_20px_55px_rgba(0,0,0,0.24)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-11 place-items-center rounded-full bg-[#e9f7ef] text-[#006d42]">
            <SvgIcon
              path={parentNotificationPaths.p164b49c0}
              viewBox="0 0 16 20"
              className="size-5"
            />
          </span>
          <button
            type="button"
            onClick={handleDismiss}
            className="grid size-8 place-items-center rounded-full text-xl leading-none text-[#63747a] transition hover:bg-[#f3f4f5]"
            aria-label="Tutup notifikasi"
          >
            ×
          </button>
        </div>

        <p className="mt-5 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold uppercase tracking-[0.09em] text-[#007c4a]">
          Pengingat Posyandu
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <h2 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xl font-bold leading-7 text-[#191c1d]">
            Notifikasi
          </h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-[#e9f7ef] px-2.5 py-0.5 font-['Manrope:SemiBold',sans-serif] text-xs font-semibold text-[#006d42]">
              {unreadCount} baru
            </span>
          )}
        </div>

        <div className="-mr-1 mt-4 max-h-[340px] flex-1 space-y-3 overflow-y-auto pr-1">
          {isLoading ? (
            <div className="space-y-3 py-2">
              <div className="h-20 animate-pulse rounded-2xl bg-[#f3f4f5]" />
              <div className="h-20 animate-pulse rounded-2xl bg-[#f3f4f5]" />
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#e5e7eb] p-6 text-center">
              <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-sm font-bold text-[#191c1d]">
                Belum ada notifikasi
              </p>
              <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-5 text-[#63747a]">
                Semua pengingat pertumbuhan anak Anda sudah selesai dibaca.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMarkItemAsRead(item)}
                className={`cursor-pointer rounded-2xl border p-3.5 transition ${
                  !item.is_read
                    ? "border-[#d6f2e2] bg-[#f8fdfa] hover:bg-[#eef9f2]"
                    : "border-black/[0.05] bg-white opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-['Manrope:SemiBold',sans-serif] text-[11px] text-[#63747a]">
                    {formatNotificationTime(item.created_at)}
                  </span>
                  {!item.is_read && (
                    <span className="inline-flex items-center gap-1 font-['Manrope:SemiBold',sans-serif] text-[10px] text-[#006d42]">
                      <span className="size-1.5 rounded-full bg-[#006d42]" />
                      Baru
                    </span>
                  )}
                </div>
                <h3 className="mt-1 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-sm font-bold leading-5 text-[#191c1d]">
                  {item.title}
                </h3>
                <p className="mt-1 font-['Manrope:Regular',sans-serif] text-xs leading-5 text-[#3e4941]">
                  {item.message}
                </p>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="mt-6 min-h-11 w-full rounded-xl bg-[#006d42] px-5 font-['Manrope:SemiBold',sans-serif] text-sm font-semibold text-white shadow-[0_4px_10px_rgba(0,109,66,0.18)] transition hover:bg-[#005c38]"
        >
          Mengerti
        </button>
      </article>
    </div>
  )
}