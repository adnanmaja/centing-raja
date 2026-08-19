import svgPaths from "./svg-r69fjkw9x5";
import imgCentingRajaLogo from "./0007128175a75209c8c698fe2b734b37ba9ba267.png";

function CentingRajaLogo() {
  return (
    <div className="h-[82px] relative rounded-[100px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)] shrink-0 w-full" data-name="Centing Raja Logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[100px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCentingRajaLogo} />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[92px] items-start pb-[12px] relative shrink-0 w-[80px]" data-name="Margin">
      <CentingRajaLogo />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[26px] text-center whitespace-nowrap">
        <p className="leading-[32px]">Mengenal Centing Raja</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#006d42] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Cegah Stunting Remaja Berdaya</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading />
      <Container3 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0" data-name="Margin">
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[280px] px-[2.44px] relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px] mb-0">Inovasi digital Puskesmas Srandakan untuk</p>
        <p className="leading-[20px] mb-0">memantau pertumbuhan remaja secara</p>
        <p className="leading-[20px]">akurat dan kolaboratif.</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[280px] pt-[16px] relative shrink-0" data-name="Margin">
      <Container4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <Margin />
      <Margin1 />
      <Margin2 />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-bl-[32px] rounded-br-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Background+Shadow">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[20px] py-[24px] relative size-full">
          <div className="absolute bg-[rgba(0,109,66,0.05)] blur-[20px] right-[-48px] rounded-[9999px] size-[192px] top-[-48px]" data-name="Overlay+Blur" />
          <div className="absolute bg-[rgba(118,91,6,0.1)] blur-[12px] bottom-0 left-[-48px] rounded-[9999px] size-[128px]" data-name="Overlay+Blur" />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 19.5 16" width="19.5">
        <g id="Container">
          <path d={svgPaths.p29002e00} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Transformasi Digital</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Heading1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] w-full">
        <p className="leading-[16px]">Era Manual</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Pencatatan menggunakan kertas dan Excel</p>
        <p className="leading-[20px]">yang memakan waktu dan rawan tercecer.</p>
      </div>
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-[#edeeef] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <Heading2 />
        <Container10 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.3333" preserveAspectRatio="none" viewBox="0 0 10.6667 13.3333" width="10.6667">
        <g id="Container">
          <path d={svgPaths.p1c278300} fill="#4F6073" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="absolute bg-[#f8f9fa] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center left-0 rounded-[9999px] size-[32px] top-[4px]" data-name="Background+Shadow">
      <Container11 />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[24px] pl-[24px] relative size-full">
        <BackgroundShadow1 />
        <BackgroundShadow2 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[12px] w-full">
        <p className="leading-[16px]">Era Digital Centing Raja</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Data terintegrasi, perhitungan otomatis</p>
        <p className="leading-[20px] mb-0">sesuai standar Kemenkes, dan akses real-</p>
        <p className="leading-[20px]">time.</p>
      </div>
    </div>
  );
}

function OverlayShadow() {
  return (
    <div className="bg-[rgba(0,109,66,0.05)] relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Overlay+Shadow">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <Heading3 />
        <Container13 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 size-[13.18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.1796" preserveAspectRatio="none" viewBox="0 0 13.1803 13.1796" width="13.1803">
        <g id="Container">
          <path d={svgPaths.p3a614400} fill="white" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow3() {
  return (
    <div className="absolute bg-[#006d42] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center left-0 rounded-[9999px] size-[32px] top-[4px]" data-name="Background+Shadow">
      <Container14 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[24px] relative size-full">
        <OverlayShadow />
        <BackgroundShadow3 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[8px] relative size-full">
        <div className="absolute bg-[#e1e3e4] bottom-[16px] left-[15px] top-[16px] w-[2px]" data-name="Vertical Divider" />
        <Container9 />
        <Container12 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section">
      <Container6 />
      <Container8 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[12px] relative shrink-0 w-[24px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 24 12" width="24">
        <g id="Container">
          <path d={svgPaths.p5df3d80} fill="#765B06" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Kolaborasi 3 Pilar</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Heading4 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[18.35px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="18.35" preserveAspectRatio="none" viewBox="0 0 20 18.35" width="20">
        <g id="Container">
          <path d={svgPaths.p2628ad80} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(0,109,66,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <Container18 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Kader Remaja</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Tulang punggung sistem. Ujung</p>
        <p className="leading-[20px] mb-0">tombak pengukuran dan pencatatan di</p>
        <p className="leading-[20px]">lapangan dengan akurasi tinggi.</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading5 />
      <Container20 />
    </div>
  );
}

function BackgroundShadow4() {
  return (
    <div className="bg-white relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Background+Shadow">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-start p-[16px] relative size-full">
          <Overlay />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Container">
          <path d={svgPaths.p20a2f200} fill="#536478" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#cfe1f8] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container21 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Tenaga Kesehatan</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Memantau data agregat, memberikan</p>
        <p className="leading-[20px]">intervensi klinis, dan validasi status gizi.</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading6 />
      <Container23 />
    </div>
  );
}

function BackgroundShadow5() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative size-full">
        <Background />
        <Container22 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20.5 20" width="20.5">
        <g id="Container">
          <path d={svgPaths.p390ecb80} fill="#654D00" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e3bf66] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container24 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">{`Orang Tua & Remaja`}</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[14px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Akses transparan terhadap grafik</p>
        <p className="leading-[20px] mb-0">pertumbuhan dan edukasi pencegahan</p>
        <p className="leading-[20px]">stunting.</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading7 />
      <Container26 />
    </div>
  );
}

function BackgroundShadow6() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative size-full">
        <Background1 />
        <Container25 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow4 />
      <BackgroundShadow5 />
      <BackgroundShadow6 />
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section">
      <Container15 />
      <Container17 />
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="36" preserveAspectRatio="none" viewBox="0 0 36 36" width="36">
        <g id="Container" opacity="0.9">
          <path d={svgPaths.p20285b60} fill="white" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[4px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[20px] text-center text-white whitespace-nowrap">
        <p className="leading-[28px]">Perhitungan Otomatis</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-90 relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[20px] mb-0">Menggunakan standar antropometri</p>
        <p className="leading-[20px] mb-0">Kementerian Kesehatan RI untuk deteksi dini</p>
        <p className="leading-[20px]">risiko stunting.</p>
      </div>
    </div>
  );
}

function BackgroundShadow7() {
  return (
    <div className="bg-[#006d42] relative rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Background+Shadow">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center p-[24px] relative size-full">
          <div className="absolute bg-[rgba(255,255,255,0.1)] blur-[20px] right-[-64px] rounded-[9999px] size-[128px] top-[-64px]" data-name="Overlay+Blur" />
          <Container27 />
          <Heading8 />
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[20px] relative size-full">
        <Section />
        <Section1 />
        <BackgroundShadow7 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container5 />
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Container">
          <path d={svgPaths.p1a406200} fill="white" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#006d42] content-stretch flex gap-[8px] items-center justify-center py-[12px] relative rounded-[9999px] shrink-0 w-full" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Mulai Sekarang</p>
      </div>
      <Container29 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="h-[174px] relative shrink-0 w-full" data-name="Margin">
      <div className="content-stretch flex flex-col items-start pb-[24px] pt-[32px] px-[20px] relative size-full">
        <Button />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[1364px] items-start pb-[32px] relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow />
      <Margin3 />
      <Margin4 />
    </div>
  );
}

export default function TentangCentingRaja() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 250) 0%, rgb(248, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Tentang Centing Raja">
      <Container />
    </div>
  );
}