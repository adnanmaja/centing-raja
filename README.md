# Centing Raja

**Centing Raja** adalah platform pemantauan dan pencegahan stunting. Sistem ini membantu tenaga kesehatan, kader, dan orang tua dalam mencatat pertumbuhan anak, memantau status stunting, mengakses materi edukasi, serta mengikuti kuis edukatif.

> Status proyek: backend REST API sudah dikembangkan. Frontend saat ini masih berupa prototype dan integrasi API masih dalam proses.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Arsitektur Sistem](#arsitektur-sistem)
- [Tech Stack](#tech-stack)
- [Peran Pengguna](#peran-pengguna)
- [Struktur Proyek](#struktur-proyek)
- [Arsitektur Backend](#arsitektur-backend)
- [Database](#database)
- [API](#api)
- [Frontend](#frontend)
- [Halaman Aplikasi](#halaman-aplikasi)
- [Menjalankan Proyek](#menjalankan-proyek)
- [Environment Variables](#environment-variables)

## Fitur Utama

- Registrasi pengguna berdasarkan peran.
- Login tanpa password menggunakan OTP melalui nomor telepon.
- Autentikasi dan otorisasi menggunakan JWT.
- Role-based access control untuk tenaga kesehatan, kader, dan orang tua.
- Pengelolaan data anak.
- Pencatatan pengukuran pertumbuhan anak.
- Perhitungan usia, Z-score tinggi badan menurut usia, dan status stunting secara otomatis.
- Pengelolaan materi edukasi.
- Pengelolaan kuis, pertanyaan, dan hasil pengerjaan kuis.
- Notifikasi untuk pengguna.
- Dokumentasi API interaktif menggunakan Swagger.

## Arsitektur Sistem

```text
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│            React + TypeScript + Vite + Tailwind CSS         │
│             Prototype UI dan integrasi API bertahap         │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTP / JSON
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                             │
│                         Go + Gin                            │
│                                                             │
│  Handler → Middleware → Service → sqlc Queries → PostgreSQL │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        PostgreSQL                           │
│ Users, Children, Measurements, Quiz, Materials, Notifications│
└─────────────────────────────────────────────────────────────┘
```

Alur utama request backend:

```text
Client → Gin Router → JWT/RBAC Middleware → Handler → Service → Database
```

- **Router** menerima dan mengarahkan request ke endpoint terkait.
- **Middleware** memvalidasi JWT dan mengecek peran pengguna.
- **Handler** menangani HTTP request, validasi input, dan HTTP response.
- **Service** menyimpan aturan bisnis aplikasi.
- **sqlc** menyediakan query PostgreSQL yang sudah digenerate menjadi kode Go bertipe kuat.
- **PostgreSQL** menyimpan seluruh data utama aplikasi.

## Tech Stack

### Backend

| Teknologi | Kegunaan |
| --- | --- |
| Go | Bahasa utama backend |
| Gin | HTTP framework dan routing REST API |
| PostgreSQL | Database relasional |
| pgx/v5 | PostgreSQL driver dan connection pool |
| sqlc | Generator kode Go type-safe dari SQL |
| golang-jwt/jwt | Pembuatan dan validasi JSON Web Token |
| godotenv | Pembacaan environment variable dari `.env` |
| Swaggo / Swagger | Dokumentasi API interaktif |
| Docker Compose | Menjalankan PostgreSQL secara lokal |

### Frontend

| Teknologi | Kegunaan |
| --- | --- |
| React 19 | Library antarmuka pengguna |
| TypeScript | JavaScript dengan type safety |
| Vite | Development server dan build tool |
| Tailwind CSS 4 | Styling antarmuka |

## Peran Pengguna

| Peran | Kode | Akses Utama |
| --- | --- | --- |
| Tenaga Kesehatan | `tenaga_kesehatan` | Mengelola anak, pengukuran, materi, kuis, dan notifikasi |
| Kader | `kader` | Mengakses materi dan kuis, mengirim hasil kuis, melihat riwayat pengerjaan |
| Orang Tua | `orang_tua` | Melihat data anak dan riwayat pengukuran anak |
| Admin | `admin` | Sudah tersedia pada enum database untuk kebutuhan pengembangan berikutnya |

## Struktur Proyek

```text
Centing Raja/
├── backend/                      # REST API Go
│   ├── db/                       # Kode database hasil generate sqlc
│   ├── docs/                     # Dokumentasi API dan Swagger generated files
│   ├── handler/                  # HTTP handler, router, dan middleware
│   ├── schema/                   # DDL PostgreSQL dan SQL query
│   ├── service/                  # Business logic aplikasi
│   │   └── helpers/              # Kalkulasi Z-score dan data referensi WHO
│   ├── main.go                   # Entry point backend
│   ├── docker-compose.yml        # Konfigurasi PostgreSQL lokal
│   └── sqlc.yaml                 # Konfigurasi sqlc
├── frontend/                     # React frontend / prototype UI
│   ├── src/
│   │   ├── App.tsx               # Aplikasi dan navigasi prototype saat ini
│   │   ├── main.tsx              # Entry point React
│   │   ├── index.css             # Global style dan Tailwind
│   │   └── imports/
│   └── package.json
└── README.md
```

## Arsitektur Backend

Backend mengikuti pemisahan tanggung jawab berbasis layer.

```text
handler/       HTTP layer: endpoint, request binding, response, middleware
service/       Business layer: autentikasi, perhitungan pertumbuhan, aturan bisnis
schema/        Data layer source of truth: schema PostgreSQL dan raw SQL queries
db/            Data layer generated: model dan query Go dari sqlc
docs/          Dokumentasi endpoint dan Swagger specification
```

### Modul Backend

| Modul | Tanggung Jawab |
| --- | --- |
| Auth | Registrasi, pembuatan OTP, verifikasi OTP, dan JWT |
| Children | CRUD profil anak dan data anak berdasarkan orang tua |
| Measurement | CRUD pengukuran serta kalkulasi usia, Z-score, dan status stunting |
| Education Material | CRUD materi edukasi |
| Quiz | CRUD kuis, pertanyaan, pengiriman jawaban, dan hasil kuis |
| Notification | Membuat, membaca, menandai telah dibaca, dan menghapus notifikasi |
| Middleware | Validasi JWT dan pembatasan akses berdasarkan peran |

### Autentikasi dan Otorisasi

1. Pengguna mendaftar melalui endpoint registrasi.
2. Pengguna meminta OTP menggunakan nomor telepon.
3. Backend membuat OTP enam digit dengan masa berlaku lima menit.
4. Pengguna memverifikasi OTP.
5. Backend mengembalikan JWT dengan masa berlaku 24 jam.
6. Client mengirim JWT pada header berikut untuk endpoint terproteksi:

```http
Authorization: Bearer <token>
```

Endpoint khusus peran dicek melalui middleware RBAC sebelum handler dijalankan.

### Perhitungan Status Stunting

Saat data pengukuran dibuat atau diperbarui, backend:

1. Mengambil tanggal lahir anak.
2. Menghitung usia anak dalam bulan.
3. Menggunakan referensi pertumbuhan WHO berdasarkan jenis kelamin dan usia.
4. Menghitung Z-score tinggi badan menurut usia.
5. Menetapkan status: `severely_stunted`, `stunted`, `normal`, atau `tall`.

## Database

Database menggunakan PostgreSQL dengan enum dan relasi foreign key.

| Tabel | Deskripsi |
| --- | --- |
| `users` | Akun pengguna, peran, nomor telepon, OTP, dan preferensi notifikasi |
| `children` | Profil anak dan relasi ke orang tua |
| `measurement` | Riwayat pengukuran pertumbuhan dan hasil analisis stunting |
| `education_material` | Materi edukasi yang dibuat tenaga kesehatan |
| `quiz` | Data kuis |
| `quiz_questions` | Pertanyaan dalam kuis |
| `quiz_submissions` | Jawaban dan nilai pengerjaan kuis oleh kader |
| `notifications` | Notifikasi per pengguna |

Relasi utama:

```text
users ──< children ──< measurement
users ──< measurement
users ──< education_material
users ──< quiz ──< quiz_questions
users ──< quiz_submissions >── quiz
users ──< notifications
```

## API

Base URL lokal:

```text
http://localhost:8080
```

Swagger UI tersedia saat backend berjalan di:

```text
/swagger/index.html
```

### Endpoint Publik

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| GET | `/` | Health check backend |
| POST | `/register` | Registrasi pengguna |
| POST | `/login/request-otp` | Meminta OTP login |
| POST | `/login/verify-otp` | Memverifikasi OTP dan mendapatkan JWT |

### Endpoint Terproteksi

| Area | Endpoint Utama | Akses |
| --- | --- | --- |
| Materi Edukasi | `/education-materials` | Semua pengguna yang terautentikasi dapat membaca |
| Kuis | `/quizzes`, `/quizzes/:id/questions`, `/quizzes/:id/submissions` | Semua pengguna yang terautentikasi sesuai endpoint |
| Notifikasi | `/notifications` | Pengguna terautentikasi |
| Nakes | `/nakes/children`, `/nakes/measurements`, `/nakes/education-materials`, `/nakes/quizzes` | `tenaga_kesehatan` |
| Kader | `/kader/submissions` | `kader` |
| Orang Tua | `/ortu/child`, `/ortu/children/:id/measurements` | `orang_tua` |

Dokumentasi endpoint, payload, dan response yang lebih lengkap tersedia pada `backend/docs/` dan Swagger UI.

## Frontend

Frontend menggunakan **React component-based architecture**. Setiap bagian antarmuka dibentuk sebagai React functional component yang menghasilkan JSX, lalu React melakukan render dan pembaruan UI berdasarkan perubahan state.

Saat ini frontend adalah **Single-Page Application (SPA) prototype**. Seluruh aplikasi dimuat sekali pada browser, kemudian tampilan berubah tanpa melakukan reload halaman penuh.

### Arsitektur Frontend Saat Ini

```text
main.tsx
   │
   ▼
ReactDOM.createRoot(...)
   │
   ▼
<App />
   ├── State navigasi layar
   ├── Komponen halaman / screen
   ├── Komponen reusable kecil
   ├── State form dan interaksi UI
   
```

| Bagian | Implementasi Saat Ini | Tanggung Jawab |
| --- | --- | --- |
| Entry point | `frontend/src/main.tsx` | Membuat React root, mengaktifkan `StrictMode`, merender `App`, dan memuat CSS global |
| Root component | `frontend/src/App.tsx` | Menampung screen, navigasi, data tampilan, dan state UI prototype |
| Global style | `frontend/src/index.css` | Memuat Tailwind CSS, font, responsive style, dan animasi |
| Design asset | `frontend/src/imports/`
| Build tooling | Vite | Development server, HMR, dan production build |

### Konsep React yang Digunakan

| Konsep | Penerapan |
| --- | --- |
| Functional components | Halaman dibuat sebagai function component, misalnya loading, onboarding, auth, login, register, OTP, dashboard kader, materi, kuis, dan hasil kuis |
| Component composition | `App` merangkai komponen-komponen layar; komponen kecil seperti `SvgIcon`, `Pagination`, dan `SectionTitle` digunakan ulang |
| Props | Callback navigasi dan konfigurasi tampilan dikirim dari parent ke child melalui props |
| Local state | `useState` menyimpan state layar aktif, pilihan peran, nilai input form, slide onboarding, OTP, dan interaksi kuis |
| Side effects | `useEffect` dipakai untuk perilaku UI seperti perpindahan loading screen dan scroll-reveal animation |
| DOM reference | `useRef` dipakai untuk memindahkan fokus antar input OTP |
| Conditional rendering | `App` memilih komponen screen yang dirender berdasarkan nilai state layar |
| List rendering | Data lokal seperti berita, panduan, pertanyaan, dan materi dirender menggunakan `.map()` |

### Pola Navigasi Saat Ini

Frontend belum menggunakan React Router. Navigasi memakai satu state lokal di root component untuk menentukan halaman aktif.

```text
screen state di App
   │
   ├── "loading"          → Loading screen
   ├── "welcome"          → Onboarding
   ├── "about"            → Tentang aplikasi
   ├── "auth"             → Pilihan masuk/daftar
   ├── "login"            → Form login
   ├── "register"         → Form registrasi
   ├── "otp"              → Verifikasi OTP
   ├── "kader-dashboard" → Dashboard kader
   ├── "materi"           → Materi edukasi
   ├── "tasks"            → Tugas kader
   ├── "quiz"             → Kuis
   └── "result"           → Hasil kuis
```

Konsekuensinya, URL browser belum berubah saat pindah halaman, halaman tidak dapat diakses langsung melalui URL tertentu, dan state navigasi kembali ke awal ketika browser direfresh.

### Data dan Integrasi API

Saat ini frontend **belum memanggil backend**. Tidak ada API client atau request HTTP ke endpoint Go. Data untuk dashboard, berita, tugas, materi, kuis, hasil kuis, login, registrasi, dan OTP masih berupa data lokal/hardcoded untuk kebutuhan prototype UI.

Arsitektur frontend yang direncanakan setelah integrasi:

```text
React Page Component
        │
        ▼
Feature Component / Form
        │
        ▼
API Service Layer
        │  fetch HTTP + Bearer JWT
        ▼
Go REST API
        │
        ▼
PostgreSQL
```

Struktur yang disarankan saat mulai integrasi:

```text
frontend/src/
├── pages/          # Halaman berdasarkan URL dan peran pengguna
├── components/     # Komponen UI reusable
├── features/       # Fitur per domain: auth, children, measurements, quiz
├── services/       # API client dan endpoint backend
├── hooks/          # Custom React hooks
├── types/          # TypeScript type/interface dari payload API
├── lib/            # Utility dan konfigurasi
├── assets/         # Asset statis
├── App.tsx         # Root route/layout
└── main.tsx        # React entry point
```

### Styling dan Aksesibilitas

- UI menggunakan **Tailwind CSS utility classes** langsung pada JSX.
- `index.css` menyimpan font-face, animasi, dan style global.
- Komponen prototype telah memakai elemen semantik, `aria-label`, `aria-live`, `aria-selected`, serta dukungan `prefers-reduced-motion` untuk mengurangi animasi sesuai preferensi pengguna.

Fokus frontend saat ini:

- Onboarding dan halaman informasi aplikasi.
- Alur login, registrasi, dan OTP dalam bentuk UI.
- Dashboard kader.
- Tampilan materi edukasi, tugas, kuis, dan hasil kuis.

## Halaman Aplikasi

### Halaman Umum

| Halaman | Status | Keterangan |
| --- | --- | --- |
| Loading | Tersedia di prototype | Splash screen aplikasi |
| Welcome / Onboarding | Tersedia di prototype | Pengenalan aplikasi |
| Tentang Centing Raja | Tersedia di prototype | Informasi tujuan aplikasi |
| Panduan | Tersedia di prototype | Informasi penggunaan berdasarkan peran |
| Login | Tersedia di prototype | UI login, belum terintegrasi API |
| Registrasi | Tersedia di prototype | UI pendaftaran, belum terintegrasi API |
| Verifikasi OTP | Tersedia di prototype | UI OTP, belum terintegrasi API |

### Halaman Kader

| Halaman | Status | Keterangan |
| --- | --- | --- |
| Dashboard Kader | Tersedia di prototype | Ringkasan aktivitas dan akses cepat |
| Materi Edukasi | Tersedia di prototype | Daftar materi pembelajaran |
| Tugas Bulanan | Tersedia di prototype | Daftar tugas kader |
| Kuis | Tersedia di prototype | Pengerjaan kuis edukasi |
| Hasil Kuis | Tersedia di prototype | Ringkasan hasil pengerjaan |

### Halaman Tenaga Kesehatan

Halaman khusus tenaga kesehatan direncanakan untuk dikembangkan. Backend sudah menyediakan fondasi API untuk:

- Dashboard ringkasan data anak dan pengukuran.
- Manajemen data anak.
- Input dan riwayat pengukuran anak.
- Pemantauan status stunting dan Z-score.
- Pengelolaan materi edukasi.
- Pengelolaan kuis dan pertanyaan.
- Pembuatan notifikasi untuk pengguna.

### Halaman Orang Tua

Halaman khusus orang tua direncanakan untuk dikembangkan. Backend sudah menyediakan fondasi API untuk:

- Dashboard perkembangan anak.
- Profil anak.
- Riwayat pengukuran berat, tinggi, dan parameter lain.
- Tampilan status pertumbuhan dan stunting.
- Materi edukasi.
- Notifikasi terkait anak.

## Menjalankan Proyek

### Backend

Prasyarat:

- Go
- Docker dan Docker Compose
- PostgreSQL melalui Docker Compose

```bash
cd backend
docker compose up -d
```

Buat file `backend/.env`:

```env
PORT=8080
DB_CONN_STRING=postgresql://prabowo:prabowo@127.0.0.1:5432/centing_dev
JWT_SECRET=ganti_dengan_secret_yang_aman
```

Terapkan schema database dari `backend/schema/schema.sql`, lalu jalankan backend:

```bash
go run main.go
```

Menjalankan test backend:

```bash
go test ./...
```

Jika file di `schema/schema.sql` atau `schema/query.sql` diubah, generate ulang kode database:

```bash
sqlc generate
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Build production frontend:

```bash
pnpm build
```

## Environment Variables

| Variable | Deskripsi | Contoh |
| --- | --- | --- |
| `PORT` | Port HTTP backend | `8080` |
| `DB_CONN_STRING` | Connection string PostgreSQL | `postgresql://user:password@localhost:5432/centing_dev` |
| `JWT_SECRET` | Secret untuk menandatangani JWT | Gunakan nilai acak yang aman |

