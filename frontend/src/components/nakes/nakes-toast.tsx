import { useEffect } from "react"
import { AlertCircle, CheckCircle2, X } from "lucide-react"

export type ToastType = "success" | "error"

export type ToastData = {
  type: ToastType
  message: string
}

export function NakesToast({
  toast,
  onClose,
}: {
  toast: ToastData | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(onClose, 3500)
    return () => window.clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const isSuccess = toast.type === "success"

  return (
    <div className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto w-full max-w-md rounded-xl shadow-lg p-4 flex items-start gap-3 animate-[toastIn_320ms_cubic-bezier(0.22,1,0.36,1)_both] ${
          isSuccess ? "bg-emerald-800 text-white" : "bg-red-700 text-white"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
        )}
        <p className="flex-1 text-sm font-medium font-['Manrope:Medium',sans-serif] leading-5">
          {toast.message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Tutup notifikasi"
        >
          <X className="size-4" />
        </button>
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}