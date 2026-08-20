import svgPaths from "./svg-86qbbarey2";
import imgCentingRajaLogo from "./7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[26px] w-full">
        <p className="leading-[32px]">Materi Edukasi</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Tingkatkan pemahaman Anda tentang stunting untuk</p>
        <p className="leading-[20px]">mendampingi keluarga dengan lebih baik.</p>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header Section">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[20px] relative size-full">
        <Heading />
        <Container1 />
      </div>
    </div>
  );
}

function HeaderSectionMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Header Section:margin">
      <HeaderSection />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#005c38] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">PROGRES BELAJAR</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[8px] items-baseline leading-[0] relative shrink-0 text-[#005c38] w-full whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[26px]">
        <p className="leading-[32px]">3/5</p>
      </div>
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center opacity-80 relative shrink-0 text-[14px]">
        <p className="leading-[20px]">Materi Selesai</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(248,249,250,0.3)] h-[8px] relative rounded-[9999px] shrink-0 w-full" data-name="Overlay">
      <div className="absolute bg-[#006d42] h-[8px] left-0 right-[40%] rounded-[9999px] top-0" data-name="Background" />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Overlay />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container3 />
      <Paragraph />
      <Margin />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="Container">
          <path d={svgPaths.p3a3ede80} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[9999px] shrink-0 size-[64px]" data-name="Background+Shadow">
      <Container4 />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#76d69f] relative rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Background+Shadow">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <div className="absolute bg-[rgba(0,109,66,0.1)] blur-[12px] right-[-32px] rounded-[9999px] size-[128px] top-[-32px]" data-name="Decorative blob" />
          <Container2 />
          <BackgroundShadow1 />
        </div>
      </div>
    </div>
  );
}

function ProgressOverviewCard() {
  return (
    <div className="relative shrink-0 w-full" data-name="Progress Overview Card">
      <div className="content-stretch flex flex-col items-start px-[20px] relative size-full">
        <BackgroundShadow />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_2px_4px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
        <p className="leading-[16px]">Semua</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#e7e8e9] content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Dasar</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#e7e8e9] content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Gizi</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#e7e8e9] content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Pola Asuh</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[12px] items-start pb-[8px] relative shrink-0" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function FilterTabs() {
  return (
    <div className="relative shrink-0 w-full" data-name="Filter/Tabs">
      <div className="overflow-auto rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[20px] relative size-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="11.6667" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667" width="11.6667">
        <g id="Container">
          <path d={svgPaths.p3cf2be00} fill="#002111" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#002111] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Selesai</p>
      </div>
    </div>
  );
}

function OverlayShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(149,246,189,0.9)] relative rounded-[9999px] self-stretch shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Overlay+Shadow+OverlayBlur">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[3.99px] items-center px-[12px] py-[4px] relative size-full">
          <Container7 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <OverlayShadowOverlayBlur />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container6 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4f6073] text-[12px] w-full">
        <p className="leading-[16px]">MODUL 1 • DASAR</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] w-full">
        <p className="leading-[28px]">Mengenal Apa Itu Stunting</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Definisi, penyebab utama, dan dampak jangka</p>
        <p className="leading-[20px]">panjang stunting pada anak.</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Heading1 />
      <Container11 />
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 size-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.3333" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333" width="13.3333">
        <g id="Container">
          <path d={svgPaths.p8e10ae0} fill="#4F6073" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4f6073] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">10 mnt</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#edeeef] content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Lihat Ulang</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Button4 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container12 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
        <Margin1 />
        <Container9 />
        <Margin2 />
      </div>
    </div>
  );
}

function Card1Completed() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Card 1: Completed">
      <Background />
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="11.6667" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667" width="11.6667">
        <g id="Container">
          <path d={svgPaths.p3808c500} fill="#251A00" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#251a00] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Sedang Berjalan</p>
      </div>
    </div>
  );
}

function OverlayShadowOverlayBlur1() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(255,223,150,0.9)] relative rounded-[9999px] self-stretch shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Overlay+Shadow+OverlayBlur">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[4px] relative size-full">
          <Container17 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <OverlayShadowOverlayBlur1 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container16 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4f6073] text-[12px] w-full">
        <p className="leading-[16px]">MODUL 2 • GIZI</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] w-full">
        <p className="leading-[28px]">Pentingnya 1000 Hari Pertama</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Panduan nutrisi ibu hamil dan menyusui untuk</p>
        <p className="leading-[20px]">mencegah stunting sejak dini.</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Heading2 />
      <Container21 />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 size-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.3333" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333" width="13.3333">
        <g id="Container">
          <path d={svgPaths.p8e10ae0} fill="#4F6073" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4f6073] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">15 mnt</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_2px_4px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
        <p className="leading-[16px]">Lanjutkan</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Button5 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container22 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
        <Margin3 />
        <Container19 />
        <Margin4 />
      </div>
    </div>
  );
}

function ProgressBarAtBottomOfCard() {
  return (
    <div className="absolute bg-[#e1e3e4] bottom-0 h-[4px] left-0 right-0" data-name="Progress bar at bottom of card">
      <div className="absolute bg-[#765b06] inset-[0_55%_0_0]" data-name="Background" />
    </div>
  );
}

function Card2InProgress() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Card 2: In Progress">
      <Background1 />
      <ProgressBarAtBottomOfCard />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="12.25" preserveAspectRatio="none" viewBox="0 0 9.33333 12.25" width="9.33333">
        <g id="Container">
          <path d={svgPaths.p23220f80} fill="#3E4941" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Belum Mulai</p>
      </div>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-[#e7e8e9] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[9999px] self-stretch shrink-0" data-name="Background+Shadow">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[3.99px] items-center px-[12px] py-[4px] relative size-full">
          <Container27 />
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow2 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container26 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4f6073] text-[12px] w-full">
        <p className="leading-[16px]">MODUL 3 • PENGUKURAN</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] w-full">
        <p className="leading-[28px]">Cara Mengukur dengan Benar</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Teknik pengukuran panjang badan dan berat</p>
        <p className="leading-[20px]">badan balita yang akurat di Posyandu.</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Heading3 />
      <Container31 />
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 size-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.3333" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333" width="13.3333">
        <g id="Container">
          <path d={svgPaths.p8e10ae0} fill="#4F6073" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4f6073] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">12 mnt</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_2px_4px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
        <p className="leading-[16px]">Mulai Belajar</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Button6 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container32 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
        <Margin5 />
        <Container29 />
        <Margin6 />
      </div>
    </div>
  );
}

function Card3NotStarted() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Card 3: Not Started">
      <Background2 />
    </div>
  );
}

function CourseList() {
  return (
    <div className="relative shrink-0 w-full" data-name="Course List">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[20px] relative size-full">
        <Card1Completed />
        <Card2InProgress />
        <Card3NotStarted />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Container">
          <path d={svgPaths.p242e3280} fill="#4F6073" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow3() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background+Shadow">
      <Container36 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start pb-[8px] relative shrink-0 w-[48px]" data-name="Margin">
      <BackgroundShadow3 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#536478] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[28px] mb-0">Sudah siap menguji</p>
        <p className="leading-[28px]">pengetahuan?</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[280px] relative shrink-0 w-[280px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(83,100,120,0.8)] text-center whitespace-nowrap">
        <p className="leading-[20px] mb-0">Kerjakan kuis singkat untuk memantapkan</p>
        <p className="leading-[20px] mb-0">pemahaman Anda dan dapatkan lencana</p>
        <p className="leading-[20px]">kader tanggap stunting.</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading4 />
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="Container">
          <path d={svgPaths.p304eaa0} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[24px] py-[10px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Ayo Latihan</p>
      </div>
      <Container39 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0" data-name="Button:margin">
      <Button7 />
    </div>
  );
}

function CallToActionQuiz() {
  return (
    <div className="bg-[#cfe1f8] relative rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Call to Action: Quiz">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center p-[24px] relative size-full">
          <div className="absolute bg-[rgba(0,109,66,0.05)] blur-[8px] bottom-[-24px] left-[-24px] rounded-[9999px] size-[96px]" data-name="Decorative elements" />
          <div className="absolute bg-[rgba(248,249,250,0.2)] right-[-16px] rounded-[9999px] size-[64px] top-[-16px]" data-name="Overlay" />
          <Margin7 />
          <Container37 />
          <ButtonMargin />
        </div>
      </div>
    </div>
  );
}

function CallToActionQuizMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Call to Action: Quiz:margin">
      <div className="content-stretch flex flex-col items-start pt-[12px] px-[20px] relative size-full">
        <CallToActionQuiz />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <HeaderSectionMargin />
      <ProgressOverviewCard />
      <FilterTabs />
      <CourseList />
      <CallToActionQuizMargin />
      <div className="h-[16px] relative shrink-0 w-full" data-name="Bottom Spacer for Navigation" />
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

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Materi</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <CentingRajaLogo />
      <Container42 />
    </div>
  );
}

function Container43() {
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

function Background3() {
  return (
    <div className="bg-[#006d42] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <Container43 />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] relative size-full">
          <Container41 />
          <Background3 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(248,249,250,0.8)] content-stretch flex flex-col items-start left-0 right-0 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] top-0" data-name="Header">
      <Container40 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 16 18" width="16">
        <g id="Container">
          <path d={svgPaths.p12a32500} fill="#3E4941" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Beranda</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center min-w-[64px] pl-[8.3px] pr-[8.31px] relative shrink-0" data-name="Link">
      <Container45 />
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 22 16" width="22">
        <g id="Container">
          <path d={svgPaths.p378800} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Materi</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center min-w-[64px] px-[13.61px] relative shrink-0" data-name="Link">
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container49() {
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

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Tugas</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center min-w-[64px] pl-[14.7px] pr-[14.71px] relative shrink-0" data-name="Link">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container51() {
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

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Profil</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center min-w-[64px] px-[16.83px] relative shrink-0" data-name="Link">
      <Container51 />
      <Container52 />
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[29.5px] items-center px-[22.75px] relative size-full">
          <Link />
          <Link1 />
          <Link2 />
          <Link3 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(248,249,250,0.9)] bottom-0 content-stretch flex flex-col items-start left-0 right-0 shadow-[0px_-1px_8px_0px_rgba(0,0,0,0.04)]" data-name="Nav">
      <Container44 />
    </div>
  );
}

export default function MateriKader() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 250) 0%, rgb(248, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Materi Kader">
      <Main />
      <Header />
      <Nav />
    </div>
  );
}