import svgPaths from "./svg-4tbfbzfpwz";
import imgCentingRajaLogo from "./0007128175a75209c8c698fe2b734b37ba9ba267.png";

function CentingRajaLogo() {
  return (
    <div className="relative rounded-[100px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)] shrink-0 size-[96px]" data-name="Centing Raja Logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[100px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCentingRajaLogo} />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Buat Akun</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0" data-name="Heading 1:margin">
      <Heading />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[280px] px-[19.45px] relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px] mb-0">Mari bersama pantau tumbuh</p>
        <p className="leading-[24px] mb-0">kembang si kecil dengan Centing</p>
        <p className="leading-[24px]">Raja.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[24px] pt-[32px] px-[20px] relative size-full">
          <CentingRajaLogo />
          <Heading1Margin />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-full">
        <p className="leading-[24px]">Informasi Pribadi</p>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 2:margin">
      <Heading1 />
    </div>
  );
}

function Label() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="content-stretch flex flex-col items-start pl-[8px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
          <p className="leading-[24px]">Nama Lengkap</p>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-[rgba(62,73,65,0.5)] w-full">
        <p className="leading-[normal]">Masukkan nama lengkap sesuai KTP</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8f9fa] h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[44px] pr-[12px] py-[13px] relative size-full">
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bottom-1/4 content-stretch flex flex-col items-start left-[12px] top-1/4" data-name="Container">
      <div className="relative shrink-0 size-[16px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
          <path d={svgPaths.p85bff00} fill="#3E4941" fillOpacity="0.5" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container7 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Container5 />
    </div>
  );
}

function Label1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="content-stretch flex flex-col items-start pl-[8px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
          <p className="leading-[24px]">Nomor Induk Kependudukan (NIK)</p>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[44px] overflow-clip right-[27px] top-[13px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(62,73,65,0.5)] whitespace-nowrap">
        <p className="leading-[normal]">16 digit angka NIK</p>
      </div>
    </div>
  );
}

function Container12() {
  return <div className="flex-[1_0_0] h-[22px] min-w-px relative" data-name="Container" />;
}

function RectangleAlignStretch() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
        <div className="h-full min-w-[15px] opacity-0 relative shrink-0 w-[15px]" data-name="Rectangle" />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex items-center left-[44px] right-[12px] top-[13px]" data-name="Container">
      <Container12 />
      <RectangleAlignStretch />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f8f9fa] h-[48px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bottom-1/4 content-stretch flex flex-col items-start left-[12px] top-1/4" data-name="Container">
      <div className="relative shrink-0 size-[20px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
          <path d={svgPaths.p207ea900} fill="#3E4941" fillOpacity="0.5" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container13 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container9 />
    </div>
  );
}

function Label2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="content-stretch flex flex-col items-start pl-[8px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
          <p className="leading-[24px]">Nomor Handphone (WhatsApp)</p>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(62,73,65,0.5)] w-full">
        <p className="leading-[normal]">Contoh: 08123456789</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f8f9fa] h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[44px] pr-[12px] py-[13px] relative size-full">
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bottom-1/4 content-stretch flex flex-col items-start left-[12px] top-1/4" data-name="Container">
      <div className="h-[22px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" height="22" preserveAspectRatio="none" viewBox="0 0 15 22" width="15">
          <path d={svgPaths.p2cc7db00} fill="#3E4941" fillOpacity="0.5" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input2 />
      <Container17 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Container15 />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <Heading2Margin />
        <Container4 />
        <Container8 />
        <Container14 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Pilih Peran Anda</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(227,191,102,0.3)] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#765b06] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">Wajib</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Overlay />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20.5 20" width="20.5">
        <g id="Container">
          <path d={svgPaths.p390ecb80} fill="#4F6073" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(207,225,248,0.5)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <Container20 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start pr-[12px] relative shrink-0 w-[60px]" data-name="Margin">
      <Overlay1 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-full">
        <p className="leading-[20px]">Orang Tua</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] w-full">
        <p className="leading-[18px]">Orang tua / Wali anak</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 32 20" width="32">
        <g id="Margin">
          <g id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Margin />
          <Container21 />
          <Margin1 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[21px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 21 20" width="21">
        <g id="Container">
          <path d={svgPaths.p1233cb80} fill="#4F6073" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(207,225,248,0.5)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <Container24 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start pr-[12px] relative shrink-0 w-[60px]" data-name="Margin">
      <Overlay2 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-full">
        <p className="leading-[20px]">Kader Posyandu</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] w-full">
        <p className="leading-[18px]">Petugas pencatat pengukuran</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 32 20" width="32">
        <g id="Margin">
          <g id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Margin2 />
          <Container25 />
          <Margin3 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="Container">
          <path d={svgPaths.p17471e90} fill="#4F6073" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(207,225,248,0.5)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <Container28 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start pr-[12px] relative shrink-0 w-[60px]" data-name="Margin">
      <Overlay3 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-full">
        <p className="leading-[20px]">Tenaga Kesehatan</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] w-full">
        <p className="leading-[18px]">Bidan, Ahli Gizi, atau Dokter</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 32 20" width="32">
        <g id="Margin">
          <g id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Margin4 />
          <Container29 />
          <Margin5 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 size-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.3333" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333" width="13.3333">
        <g id="Container">
          <path d={svgPaths.p32510800} fill="white" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8.01px] items-center justify-center py-[14px] relative rounded-[9999px] shrink-0 w-full" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Daftar Sekarang</p>
      </div>
      <Container33 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-normal items-start justify-center leading-[0] relative shrink-0 text-[14px] text-center w-full whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] justify-center relative shrink-0 text-[#3e4941]">
        <p className="leading-[21px]">{`Sudah punya akun? `}</p>
      </div>
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] justify-center relative shrink-0 text-[#006d42]">
        <p className="leading-[21px]">Masuk di sini</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Button3 />
      <Paragraph />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Margin">
      <Container32 />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start px-[20px] relative size-full">
        <BackgroundShadow />
        <BackgroundShadow1 />
        <Margin6 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-x-clip overflow-y-auto pb-[80px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[rgba(0,109,66,0.05)] blur-[32px] right-[-85.33px] rounded-[9999px] size-[256px] top-[-128px]" data-name="Overlay+Blur" />
      <div className="absolute bg-[rgba(118,91,6,0.05)] blur-[32px] bottom-[16.37%] left-[-144px] rounded-[9999px] top-[57.75%] w-[288px]" data-name="Overlay+Blur" />
      <Container1 />
      <Container3 />
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Main">
      <Container />
    </div>
  );
}

export default function DaftarCentingRaja() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 250) 0%, rgb(248, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Daftar Centing Raja">
      <Main />
    </div>
  );
}