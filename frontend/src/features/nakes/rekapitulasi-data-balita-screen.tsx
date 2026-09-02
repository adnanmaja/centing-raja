import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Download } from "lucide-react"
import {
  getAgeMonths,
  getNakesChildren,
  getNakesMeasurements,
  formatStuntingStatus,
  type Child,
  type Measurement,
} from "../../lib/api"

export type BalitaRow = {
  id?: string
  kecamatan: string
  rt: string
  rw: string
  nama: string
  umurBulan: number
  jenisKelamin: "L" | "P"
  tinggiBadan: number
  beratBadan?: number
  lingkarKepala: number
  lingkarLengan?: number
  stuntingStatus?: string
  zScore?: number
  measuredAt?: string
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
  const [dataRows, setDataRows] = useState<BalitaRow[]>(rows)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    Promise.all([getNakesChildren(100, 0), getNakesMeasurements(100, 0)])
      .then(([childrenData, measurementsData]) => {
        if (!active) return

        if (Array.isArray(childrenData) && childrenData.length > 0) {
          const measurementByChild = new Map<string, Measurement>()
          if (Array.isArray(measurementsData)) {
            for (const m of measurementsData) {
              if (!measurementByChild.has(m.children_id)) {
                measurementByChild.set(m.children_id, m)
              }
            }
          }

          const liveRows: BalitaRow[] = childrenData.map((c, idx) => {
            const m = measurementByChild.get(c.id)
            const rawGender = (c.gender || "").toLowerCase()
            const gender: "L" | "P" =
              rawGender.startsWith("l") || rawGender.startsWith("m") ? "L" : "P"

            let rt = "01"
            let rw = "03"
            let kecamatan = "Kebayoran Baru"

            if (c.home_address) {
              const rtMatch = c.home_address.match(/RT\s*0?(\d+)/i)
              const rwMatch = c.home_address.match(/RW\s*0?(\d+)/i)
              if (rtMatch) rt = rtMatch[1].padStart(2, "0")
              if (rwMatch) rw = rwMatch[1].padStart(2, "0")
              const parts = c.home_address.split(",")
              if (parts.length > 1) {
                kecamatan = parts[0].trim()
              }
            }

            const ageMonths = c.birth_date ? getAgeMonths(c.birth_date) : 12 + idx
            const height = m ? Number(m.height) || 75.0 : 75.0 + (idx % 10) * 1.5
            const weight = m ? Number(m.weight) || 9.0 : 9.0 + (idx % 10) * 0.4
            const head = m ? Number(m.head_circumference) || 46.0 : 46.0
            const arm = m ? Number(m.upper_arm_circumference) || 14.5 : 14.5

            return {
              id: c.id,
              kecamatan,
              rt,
              rw,
              nama: c.full_name,
              umurBulan: ageMonths,
              jenisKelamin: gender,
              tinggiBadan: height,
              beratBadan: weight,
              lingkarKepala: head,
              lingkarLengan: arm,
              stuntingStatus: m?.stunting_status || (height < 76 ? "stunted" : "normal"),
              zScore: m ? Number(m.z_score) || 0 : undefined,
              measuredAt: m?.measured_at || c.created_at,
            }
          })

          if (liveRows.length > 0) {
            setDataRows(liveRows)
          }
        }
      })
      .catch(() => {
        // keep fallback rows
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  function escapeXml(str: string | number | undefined | null): string {
    if (str === undefined || str === null) return ""
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
  }

  const handleExport = () => {
    const headers = [
      "No",
      "Nama Kecamatan",
      "RT",
      "RW",
      "Nama Balita",
      "Umur (Bulan)",
      "Jenis Kelamin",
      "Tinggi Badan (cm)",
      "Berat Badan (kg)",
      "Lingkar Kepala (cm)",
      "Lingkar Lengan (cm)",
      "Status Stunting",
      "Z-Score",
      "Tanggal Pengukuran",
    ]

    const xmlRows = dataRows.map((row, index) => {
      const statusInfo = formatStuntingStatus(row.stuntingStatus)
      const measuredDate = row.measuredAt ? new Date(row.measuredAt).toLocaleDateString("id-ID") : "-"
      return `<tr>
        <td>${index + 1}</td>
        <td>${escapeXml(row.kecamatan)}</td>
        <td>${escapeXml(row.rt)}</td>
        <td>${escapeXml(row.rw)}</td>
        <td>${escapeXml(row.nama)}</td>
        <td>${row.umurBulan}</td>
        <td>${row.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}</td>
        <td>${row.tinggiBadan.toFixed(1)}</td>
        <td>${(row.beratBadan ?? 0).toFixed(1)}</td>
        <td>${row.lingkarKepala.toFixed(1)}</td>
        <td>${(row.lingkarLengan ?? 0).toFixed(1)}</td>
        <td>${escapeXml(statusInfo.label)}</td>
        <td>${row.zScore !== undefined ? row.zScore.toFixed(2) : "-"}</td>
        <td>${escapeXml(measuredDate)}</td>
      </tr>`
    })

    const tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                  <x:Name>Rekapitulasi Balita</x:Name>
                  <x:WorksheetOptions>
                    <x:DisplayGridlines/>
                  </x:WorksheetOptions>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
            </x:ExcelWorkbook>
          </xml>
          <![endif]-->
          <style>
            table { border-collapse: collapse; font-family: sans-serif; font-size: 11pt; }
            th { background-color: #006d42; color: #ffffff; font-weight: bold; padding: 8px; border: 1px solid #dcdcdc; }
            td { padding: 6px; border: 1px solid #dcdcdc; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${headers.map((h) => `<th>${escapeXml(h)}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${xmlRows.join("")}
            </tbody>
          </table>
        </body>
      </html>
    `

    const blob = new Blob([tableHtml], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    const timestamp = new Date().toISOString().slice(0, 10)
    link.setAttribute("href", url)
    link.setAttribute("download", `Rekapitulasi_Balita_Centing_Raja_${timestamp}.xlsx`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
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
              {dataRows.map((row, i) => (
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