/**
 * One-shot asset path migration:
 *   /assets/imports/<Folder>/<hash>.png  ->  /images/<name>.png | /logo/<name>.png
 *   /assets/logo/centing-logo.png        ->  /logo/logo-centing-raja.png
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = "D:/Centing Raja/frontend"
const SRC = path.join(ROOT, "src")

const L = "7de6f99be5b1285d73c8291a2717fd5004f4c8f2"
const M = "0007128175a75209c8c698fe2b734b37ba9ba267"
const S = "7aea73f8459bccf9208903ee653d8f177774bf50"

const LOGO = "/logo/logo-centing-raja.png"
const LOGO_48 = "/logo/logo-centing-raja-48.png"

const map = new Map()

const logoFolders = [
  "MateriEdukasi",
  "DataAnakBerhasilDisimpan",
  "DataBerhasilDiSimpan",
  "BerandaBeratBadan",
  "InputDataAnak",
  "InputDataPengukuran-1",
  "BerandaKader",
  "DataBerhasilDisimpan",
  "Container",
  "KebijakanPrivasi",
  "EditProfile",
  "ProfileKader",
  "MateriKader",
  "PusatBantuan",
  "TugasBulanIni",
  "UbahKataSandi",
]
for (const f of logoFolders) {
  map.set(`/assets/imports/${f}/${L}.png`, LOGO)
}

const bigLogoFolders = [
  "Background-1",
  "Welcome-2",
  "CentingRajaAuth",
  "TentangCentingRaja-1",
  "DaftarCentingRaja",
  "MasukCentingRaja-2",
  "PanduanUntukNakesDesktop",
  "PanduanUntukKaderDesktop",
]
for (const f of bigLogoFolders) {
  map.set(`/assets/imports/${f}/${M}.png`, LOGO)
}

// small-logo hash also appears in these two guide folders
map.set(`/assets/imports/PanduanUntukNakesDesktop/${L}.png`, LOGO)
map.set(`/assets/imports/PanduanUntukKaderDesktop/${L}.png`, LOGO)

// small checkmark also lives under DataBerhasilDiSimpan
map.set(
  "/assets/imports/DataBerhasilDiSimpan/0620f96888a3d3a67b32e2c721591f3037fcc80d.png",
  "/images/centang-hijau.png",
)

for (const f of ["InputDataPengukuran", "KuisKader", "ResultKader"]) {
  map.set(`/assets/imports/${f}/${S}.png`, LOGO_48)
}

const singles = {
  "/assets/imports/PanduanUntukNakesDesktop/aa67e5671e5aef4ce81ab557b31e820613b8f113.png":
    "/images/hero-panduan-nakes.png",
  "/assets/imports/PanduanUntukKaderDesktop/813a628706e3f273ba2ad2e5b150cecf19a13ef3.png":
    "/images/hero-panduan-kader.png",
  "/assets/imports/Group92/a43a2eb4bfc773402438273ec15acf241a525467.png":
    "/images/hero-panduan-orang-tua.png",
  "/assets/imports/CentingRajaAuth/26c27d2576e6620212c91423165f936790bbcb63.png":
    "/images/ilustrasi-pengukuran-tinggi.png",
  "/assets/imports/Welcome/df8f0f74361ebe8780c034ba043a73cc413163f6.png":
    "/images/ilustrasi-panduan-singkat.png",
  "/assets/imports/ResultKader/293f6f317864702e3f4231c0e89993e6a5a91924.png":
    "/images/ilustrasi-berhasil.png",
  "/assets/imports/BerandaKader/9866410edd1287b38f68bf2a41e7bfdecc61f496.png":
    "/images/poster-protein-hewani-cegah-stunting.png",
  "/assets/imports/BerandaKader/beef7bc8f9254a9ef0938c497c7514fb2dca9d20.png":
    "/images/kegiatan-posyandu.png",
  "/assets/imports/BerandaBeratBadan/772856280e82d4032786178e8a2c5f692c1f1298.png":
    "/images/piring-mpasi-seimbang.png",
  "/assets/imports/BerandaBeratBadan/17522099519bbaf0abc464bed579f6e1b74e99ae.png":
    "/images/ibu-dan-anak-bermain.png",
  "/assets/imports/InputDataAnak/df5bbaa3a0eb641587cf83ef3aa1aba2f2ff8ce1.png":
    "/images/ilustrasi-ibu-anak.png",
  "/assets/imports/ProfileKader/cc59a217e18ceda2ec23c317966ab8e6dad3ace4.png":
    "/images/foto-kader.png",
  "/assets/imports/EditProfile/b36d08ef1929f51b4b587549714bc45e8a51e641.png":
    "/images/foto-kader-2.png",
  "/assets/imports/DetailPertumbuhan/fefd319f86f8085c09bfbbf29379c050da512cd2.png":
    "/images/avatar-anak.png",
  "/assets/imports/BackgroundShadow-3/ad9fb8b53daa8a1a90b67cfff9975e938a55588b.png":
    "/images/avatar-andika.png",
  "/assets/imports/DataAnakBerhasilDisimpan/0620f96888a3d3a67b32e2c721591f3037fcc80d.png":
    "/images/centang-hijau.png",
  "/assets/imports/DataBerhasilDisimpan/6faf1ce95c7dfdb18980ef5a4a7e49bbd8094314.png":
    "/images/centang-hijau-besar.png",
  "/assets/imports/image.png": "/images/maskot-rusa.png",
  "/assets/logo/centing-logo.png": LOGO,
}
for (const [k, v] of Object.entries(singles)) map.set(k, v)

console.log(`Map entries: ${map.size}`)

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else if (/\.(ts|tsx)$/.test(e.name)) yield p
  }
}

let changedFiles = 0
let changedTotal = 0
for (const file of walk(SRC)) {
  const text = fs.readFileSync(file, "utf8")
  let out = text
  let n = 0
  for (const [k, v] of map) {
    while (out.includes(k)) {
      out = out.replace(k, v)
      n++
    }
  }
  if (n > 0) {
    fs.writeFileSync(file, out, "utf8")
    changedFiles++
    changedTotal += n
    console.log(
      `  ${path.relative(ROOT, file)}: ${n} replaced`,
    )
  }
}
console.log(`Replaced ${changedTotal} occurrences in ${changedFiles} files.`)

// safety: nothing left behind
const leftovers = []
for (const file of walk(SRC)) {
  const text = fs.readFileSync(file, "utf8")
  if (text.includes("/assets/imports/") || text.includes("/assets/logo/")) {
    leftovers.push(path.relative(ROOT, file))
  }
}
console.log(
  leftovers.length === 0
    ? "OK: no /assets/ references remain in src."
    : `LEFTOVERS in: ${leftovers.join(", ")}`,
)
