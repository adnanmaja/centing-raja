import { useNavigate } from "react-router-dom"
import { ArrowLeft, Download } from "lucide-react"

type BalitaRow = {
  kecamatan: string
  rt: string
  rw: string
  nama: string
  umurBulan: number
  jenisKelamin: "L" | "P"
  tinggiBadan: number
  lingkarKepala: number
}

const rows: BalitaRow[] = [
  {
    kecamatan: "Kebayoran Baru",
    rt: "01",
    rw: "04",
    nama: "Budi Santoso",
    umurBulan: 24,
    jenisKelamin: "L",
    tinggiBadan: 86.5,
    lingkarKepala: 48.2,
  },
  {
    kecamatan: "Cilandak",
    rt: "05",
    rw: "02",
    nama: "Siti Aminah",
    umurBulan: 18,
    jenisKelamin: "P",
    tinggiBadan: 81.0,
    lingkarKepala: 46.5,
  },
  {
    kecamatan: "Tebet",
    rt: "12",
    rw: "01",
    nama: "Ahmad Reza",
    umurBulan: 36,
    jenisKelamin: "L",
    tinggiBadan: 95.2,
    lingkarKepala: 50.1,
  },
  {
    kecamatan: "Pasar Minggu",
    rt: "03",
    rw: "07",
    nama: "Nia Ramadhani",
    umurBulan: 12,
    jenisKelamin: "P",
    tinggiBadan: 74.5,
    lingkarKepala: 44.8,
  },
  {
    kecamatan: "Pancoran",
    rt: "08",
    rw: "03",
    nama: "Kevin Sanjaya",
    umurBulan: 48,
    jenisKelamin: "L",
    tinggiBadan: 102.3,
    lingkarKepala: 51.5,
  },
]

export function RekapitulasiDataBalitaScreen() {
  const navigate = useNavigate()

  const handleExport = () => {
    // TODO: sambungkan ke endpoint ekspor Excel yang sebenarnya
    window.alert("Fitur ekspor ke Excel akan segera tersedia.")
  }

  return (
    <div className="min-h-svh bg-gray-50 flex flex-col">
      <div className="px-5 py-6 bg-gray-50 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="shrink-0 size-10 rounded-full bg-white shadow-sm flex items-center justify-center text-zinc-900 transition-all hover:bg-zinc-100 hover:-translate-x-0.5 active:scale-95 cursor-pointer"
          aria-label="Kembali"
        >
          <ArrowLeft className="size-5" />
        </button>

       <h1 className="flex-1 text-zinc-900 text-xl sm:text-2xl font-semibold font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-7 sm:leading-8">
        Rekapitulasi Data
        <br />
        Balita
        </h1>

        <button
          type="button"
          onClick={handleExport}
          className="shrink-0 pl-4 pr-6 py-2 bg-emerald-800 rounded-lg shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] flex items-center gap-3.5 transition-transform hover:scale-[1.03] hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <Download className="size-3.5 text-white" />
          <span className="text-center text-white text-xs font-semibold font-['Manrope:SemiBold',sans-serif] leading-4">
            Ekspor ke
            <br />
            Excel
          </span>
        </button>
      </div>

      <div className="px-5 pb-24 flex-1 overflow-x-auto">
        <div className="min-w-[900px] bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden animate-[fadeSlideIn_420ms_cubic-bezier(0.22,1,0.36,1)_both]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-zinc-100">
                <Th align="left">Nama Kecamatan</Th>
                <Th align="left">RT</Th>
                <Th align="left">RW</Th>
                <Th align="left">Nama Balita</Th>
                <Th align="right">Umur (Bln)</Th>
                <Th align="center">Jenis Kelamin</Th>
                <Th align="right">TB/PB (cm)</Th>
                <Th align="right">LK (cm)</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={`${row.nama}-${i}`}
                  className={`border-t border-zinc-200 cursor-pointer transition-colors hover:bg-emerald-50 animate-[fadeSlideIn_360ms_cubic-bezier(0.22,1,0.36,1)_both] ${
                    i % 2 === 1 ? "bg-gray-50" : ""
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Td align="left">{row.kecamatan}</Td>
                  <Td align="left">{row.rt}</Td>
                  <Td align="left">{row.rw}</Td>
                  <Td align="left" className="font-semibold">
                    {row.nama}
                  </Td>
                  <Td align="right">{row.umurBulan}</Td>
                  <Td align="center">{row.jenisKelamin}</Td>
                  <Td align="right">{row.tinggiBadan.toFixed(1)}</Td>
                  <Td align="right">{row.lingkarKepala.toFixed(1)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          tr, .animate-\\[fadeSlideIn_420ms_cubic-bezier\\(0\\.22\\,1\\,0\\.36\\,1\\)_both\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode
  align?: "left" | "right" | "center"
}) {
  const alignClass =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"
  return (
    <th
      className={`p-4 ${alignClass} text-neutral-700 text-xs font-bold font-['Manrope:Bold',sans-serif] uppercase leading-4 tracking-wide whitespace-nowrap`}
    >
      {children}
    </th>
  )
}

function Td({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode
  align?: "left" | "right" | "center"
  className?: string
}) {
  const alignClass =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"
  return (
    <td
      className={`p-4 ${alignClass} text-zinc-900 text-sm font-normal font-['Manrope:Regular',sans-serif] leading-5 whitespace-nowrap ${className}`}
    >
      {children}
    </td>
  )
}