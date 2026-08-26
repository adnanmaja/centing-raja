import parentMaterialsPaths from "../../assets/icon-materials"

export const parentMaterialItems = [
  {
    id: "hpk",

    category: "Gizi & MPASI",

    title: "Pentingnya 1000 Hari Pertama Kehidupan (HPK)",

    description:
      "Memahami mengapa masa kehamilan hingga anak berusia 2 tahun adalah periode emas yang menentukan.",

    icon: parentMaterialsPaths.p31e6b500,

    iconBox: "bg-[#f8df8d] text-[#765b06]",

    link: "https://ayosehat.kemkes.go.id/1000-hari-pertama-kehidupan",
  },

  {
    id: "mpasi",

    category: "Gizi & MPASI",

    title: "Resep MPASI Kaya Protein Hewani",

    description:
      "Kumpulan resep mudah dan murah menggunakan telur dan ikan lokal untuk mendukung tumbuh kembang.",

    icon: parentMaterialsPaths.p304eaa0,

    iconBox: "bg-[#76d69f] text-[#005c38]",

    link: "https://ayosehat.kemkes.go.id/topik-pilihan/1000-hari-pertama-kehidupan/mpasi",
  },

  {
    id: "kms",

    category: "Pola Asuh",

    title: "Cara Tepat Membaca Kurva KMS",

    description:
      "Video panduan 3 menit agar ibu bisa memantau tren pertumbuhan berat dan tinggi anak.",

    icon: parentMaterialsPaths.pb01c000,

    iconBox: "bg-[#ffd9d5] text-[#b5302c]",

    link: "https://kemkes.go.id",
  },

  {
    id: "imunisasi",

    category: "Sanitasi",

    title: "Jadwal Imunisasi Dasar Lengkap",

    description:
      "Daftar pemeriksaan imunisasi wajib dari IDAI untuk melindungi anak dari penyakit.",

    icon: parentMaterialsPaths.p23cfd7c0,

    iconBox: "bg-[#e0edff] text-[#536478]",

    link: "https://www.idai.or.id/artikel/klinik/imunisasi/jadwal-imunisasi-anak",
  },
]

export type ParentMaterial = typeof parentMaterialItems[number]
