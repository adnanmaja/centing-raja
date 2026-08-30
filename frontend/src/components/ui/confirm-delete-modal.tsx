import { AlertTriangle, Trash2 } from "lucide-react"

export function ConfirmDeleteModal({
  title,
  description,
  onCancel,
  onConfirm,
}: {
  title: string
  description: string
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="size-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="size-6 text-red-700" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="text-zinc-900 text-base font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-6">
              {title}
            </h3>
            <p className="text-neutral-700 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 bg-gray-50 rounded-xl flex justify-center items-center cursor-pointer transition-colors hover:bg-gray-100"
          >
            <span className="text-neutral-700 text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">Batal</span>
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-700 rounded-xl flex justify-center items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Trash2 className="size-3.5 text-white" />
            <span className="text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif]">Ya, Hapus</span>
          </button>
        </div>
      </div>
    </div>
  )
}