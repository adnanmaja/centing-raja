import svgPaths from "./svg-3iqctxw6mq";
import imgHeheheheee1 from "./9866410edd1287b38f68bf2a41e7bfdecc61f496.png";
import imgAb6AXuCnBGCvmKHgwLdapzGt0FA3HkvEuoSdwX0PXbnFwt4MIdYop0DXj0IT16AjVoRpB4QPdkyAnpZwU2N3P6UYluT9YToRuYfQ2Wk0DZxc7M2VA1WAdHcQPlrRhiCEvXAkvE8Vy73R7UzGBpkZWogX07RmTzArEpiDvbMqyyWvMpWwlhtMifSgS5O6OlUoZj9TF8K2GP4OpILnOljrzsIzHjwDkU9Gm4SOAXmUyDjmbNie from "./beef7bc8f9254a9ef0938c497c7514fb2dca9d20.png";
import imgCentingRajaLogo from "./7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] w-full">
        <p className="leading-[28px]">Halo, Kader Nur!</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] w-full">
        <p className="leading-[20px]">Senin, 24 Oktober 2023</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Tugas Hari Ini</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(186,26,26,0.1)] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#ba1a1a] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">3 Belum Selesai</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Overlay />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[8px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 8 20" width="8">
        <g id="Container">
          <path d={svgPaths.p411f900} fill="#536478" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#cfe1f8] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] w-full">
        <p className="leading-[16px]">Kunjungan Ibu Hamil (Bumil)</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] w-full">
        <p className="leading-[18px]">Posyandu Melati 1</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[9px] relative shrink-0 w-[5.55px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="9" preserveAspectRatio="none" viewBox="0 0 5.55 9" width="5.55">
        <g id="Container">
          <path d={svgPaths.p4874b00} fill="white" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Button">
      <Container10 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Background />
      <Container7 />
      <Button />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#f8f9fa] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
        <Container3 />
        <Container5 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="bg-[rgba(0,109,66,0.1)] relative rounded-[16px] shrink-0 w-full" data-name="Section">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
          <div className="absolute bg-[rgba(0,109,66,0.2)] blur-[20px] right-[-40px] rounded-[9999px] size-[128px] top-[-40px]" data-name="Overlay+Blur" />
          <Container1 />
          <BackgroundShadow />
        </div>
      </div>
    </div>
  );
}

function SectionMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Section:margin">
      <Section />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] w-full">
        <p className="leading-[28px]">Aksi Cepat</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full" data-name="Container">
      <Heading1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="Container">
          <path d={svgPaths.pd44dd40} fill="#005C38" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#76d69f] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px] mb-0">Edukasi</p>
        <p className="leading-[16px]">{`Kader `}</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f8f9fa] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[12px] items-center justify-center pl-[54.63px] pr-[54.64px] py-[16px] relative rounded-[12px] shrink-0" data-name="Button">
      <Background1 />
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="Container">
          <path d={svgPaths.p1eac3d80} fill="#654000" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e3bf66] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container15 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px] mb-0 whitespace-pre">{`Input `}</p>
        <p className="leading-[16px] whitespace-pre">Pengukuran Balita</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f8f9fa] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[12px] items-center justify-center pl-[50.08px] pr-[50.09px] py-[16px] relative rounded-[12px] shrink-0 w-[169px]" data-name="Button">
      <Background2 />
      <Container16 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Section">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[20.05px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="20.05" preserveAspectRatio="none" viewBox="0 0 20 20.05" width="20">
        <g id="Container">
          <path d={svgPaths.p3f50100} fill="#BA1A1A" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(186,26,26,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Overlay">
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] w-full">
        <p className="leading-[16px]">Pengingat Penting</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] w-full">
        <p className="leading-[18px] mb-0">Ada 5 balita di wilayah Anda yang belum</p>
        <p className="leading-[18px]">melakukan pengukuran bulan ini.</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Section2() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Section">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Overlay1 />
          <Container18 />
          <div className="absolute bg-[#ba1a1a] bottom-0 left-0 top-0 w-[8px]" data-name="Background" />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">{`Berita & Edukasi`}</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Lihat Semua</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Link />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[14px] top-[-63.25px]">
      <div className="absolute left-[14px] size-[266px] top-[-63.25px]" data-name="heheheheee 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeheheheee1} />
      </div>
    </div>
  );
}

function IlustrasiEdukasiGiziBalita() {
  return (
    <div className="col-1 h-[140px] ml-0 mt-0 overflow-clip relative row-1 w-full" data-name="Ilustrasi edukasi gizi balita">
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <IlustrasiEdukasiGiziBalita />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#cfe1f8] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#536478] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">Gizi</p>
      </div>
    </div>
  );
}

function BackgroundAlignFlexStart() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Background:align-flex-start">
      <Background3 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] w-full">
        <p className="leading-[16px] mb-0">Pentingnya Protein Hewani untuk Mencegah</p>
        <p className="leading-[16px]">Stunting</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[10px] w-full">
        <p className="leading-[15px]">2 jam yang lalu</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[12px] relative size-full">
        <BackgroundAlignFlexStart />
        <Heading3 />
        <Container24 />
      </div>
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="absolute bg-[#f8f9fa] bottom-[8px] content-stretch flex flex-col items-start left-0 overflow-clip rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] top-0 w-[280px]" data-name="Background+Shadow">
      <Group />
      <Container23 />
    </div>
  );
}

function Ab6AXuCnBGCvmKHgwLdapzGt0FA3HkvEuoSdwX0PXbnFwt4MIdYop0DXj0IT16AjVoRpB4QPdkyAnpZwU2N3P6UYluT9YToRuYfQ2Wk0DZxc7M2VA1WAdHcQPlrRhiCEvXAkvE8Vy73R7UzGBpkZWogX07RmTzArEpiDvbMqyyWvMpWwlhtMifSgS5O6OlUoZj9TF8K2GP4OpILnOljrzsIzHjwDkU9Gm4SOAXmUyDjmbNie() {
  return (
    <div className="h-[140px] relative shrink-0 w-full" data-name="AB6AXuCN-b_G-CvmKHgwLdapzGt0fA3hkv__EuoSdwX0PXbnFwt4mIdYOP0_dXj0iT16ajVORpB4qPdkyAnpZwU2N3p6uYluT9yToRu_YfQ2wk0dZXC7M2vA1WAdHC-QPlrRhiCEvXAkvE8vy73R7uzGBpkZWogX07rmTzArEPIDvbMQYYWvMP_WWLHTMifSgS5O6OlUOZj9tF8K2-gP4OpILnOLJRZSIzHjwDkU9gm4sO-aXmUyDjmbNIE">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[108.98%] left-0 max-w-none top-[-4.49%] w-full" src={imgAb6AXuCnBGCvmKHgwLdapzGt0FA3HkvEuoSdwX0PXbnFwt4MIdYop0DXj0IT16AjVoRpB4QPdkyAnpZwU2N3P6UYluT9YToRuYfQ2Wk0DZxc7M2VA1WAdHcQPlrRhiCEvXAkvE8Vy73R7UzGBpkZWogX07RmTzArEpiDvbMqyyWvMpWwlhtMifSgS5O6OlUoZj9TF8K2GP4OpILnOljrzsIzHjwDkU9Gm4SOAXmUyDjmbNie} />
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(0,109,66,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Overlay">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#006d42] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">Kegiatan</p>
      </div>
    </div>
  );
}

function OverlayAlignFlexStart() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Overlay:align-flex-start">
      <Overlay2 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] w-full">
        <p className="leading-[16px] mb-0">Jadwal Kelas Ibu Balita Desa Suka Maju Bulan</p>
        <p className="leading-[16px]">November</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[10px] w-full">
        <p className="leading-[15px]">1 hari yang lalu</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[12px] relative size-full">
        <OverlayAlignFlexStart />
        <Heading4 />
        <Container26 />
      </div>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="absolute bg-[#f8f9fa] bottom-[8px] content-stretch flex flex-col items-start left-[292px] overflow-clip rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] top-0 w-[280px]" data-name="Background+Shadow">
      <Ab6AXuCnBGCvmKHgwLdapzGt0FA3HkvEuoSdwX0PXbnFwt4MIdYop0DXj0IT16AjVoRpB4QPdkyAnpZwU2N3P6UYluT9YToRuYfQ2Wk0DZxc7M2VA1WAdHcQPlrRhiCEvXAkvE8Vy73R7UzGBpkZWogX07RmTzArEpiDvbMqyyWvMpWwlhtMifSgS5O6OlUoZj9TF8K2GP4OpILnOljrzsIzHjwDkU9Gm4SOAXmUyDjmbNie />
      <Container25 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[246px] overflow-auto relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow1 />
      <BackgroundShadow2 />
    </div>
  );
}

function Section3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Section">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start px-[20px] relative size-full">
        <SectionMargin />
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start pb-[96px] pt-[64px] relative shrink-0 w-full" data-name="Main">
      <Container />
    </div>
  );
}

function CentingRajaLogo() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Centing Raja logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCentingRajaLogo} />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Beranda</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <CentingRajaLogo />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="Container">
          <path d={svgPaths.p3189a600} fill="white" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#006d42] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <Container30 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] relative size-full">
          <Container28 />
          <Background4 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(248,249,250,0.8)] content-stretch flex flex-col items-start left-0 right-0 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] top-0" data-name="Header">
      <Container27 />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 16 18" width="16">
        <g id="Container">
          <path d={svgPaths.p12a32500} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Beranda</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center min-w-[64px] pl-[8.3px] pr-[8.31px] relative shrink-0" data-name="Link">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 22 16" width="22">
        <g id="Container">
          <path d={svgPaths.p378800} fill="#3E4941" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Materi</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center min-w-[64px] px-[13.61px] relative shrink-0" data-name="Link">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 18 20" width="18">
        <g id="Container">
          <path d={svgPaths.p1de35f80} fill="#3E4941" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Tugas</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center min-w-[64px] pl-[14.7px] pr-[14.71px] relative shrink-0" data-name="Link">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Container">
          <path d={svgPaths.p3de21300} fill="#3E4941" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Profil</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center min-w-[64px] px-[16.83px] relative shrink-0" data-name="Link">
      <Container38 />
      <Container39 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[29.5px] items-center px-[22.75px] relative size-full">
          <Link1 />
          <Link2 />
          <Link3 />
          <Link4 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(248,249,250,0.9)] bottom-0 content-stretch flex flex-col items-start left-0 right-0 shadow-[0px_-1px_8px_0px_rgba(0,0,0,0.04)]" data-name="Nav">
      <Container31 />
    </div>
  );
}

export default function BerandaKader() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 250) 0%, rgb(248, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Beranda Kader">
      <Main />
      <Header />
      <Nav />
    </div>
  );
}