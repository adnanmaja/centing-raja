import svgPaths from "./svg-z7e843vbjt";
import imgCentingRajaLogo from "./0007128175a75209c8c698fe2b734b37ba9ba267.png";

function Svg() {
  return <div className="absolute inset-0 opacity-20" data-name="SVG" />;
}

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
    <div className="content-stretch flex flex-col items-center pt-[8px] relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Selamat Datang</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px] mb-0">Masuk untuk memantau tumbuh kembang si</p>
        <p className="leading-[24px]">kecil.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <CentingRajaLogo />
      <Heading />
      <Container3 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
        <p className="leading-[24px]">Masuk Sebagai</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[8.7px] pr-[8.73px] py-[12px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#006d42] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Orang Tua</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[24.84px] pr-[24.85px] py-[12px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Kader</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[23.64px] py-[12px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Nakes</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#edeeef] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex gap-[12px] items-start p-[8px] relative size-full">
        <div className="absolute bg-white bottom-[8px] left-[8px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] top-[8px] w-[97.98px]" data-name="Background+Shadow" />
        <Button />
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Background1 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
        <p className="leading-[24px]">Nama Lengkap</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(62,73,65,0.5)] w-full">
        <p className="leading-[normal]">Masukkan nama lengkap</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8f9fa] flex-[1_0_0] h-[48px] min-w-px relative rounded-[8px]" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[40px] pr-[12px] py-[13px] relative size-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Input />
      <div className="absolute left-[16px] size-[16px] top-[16px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
          <path d={svgPaths.p85bff00} fill="#3E4941" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container7 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
        <p className="leading-[24px]">NIK (Nomor Induk Kependudukan)</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40px] overflow-clip right-[27px] top-[13px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(62,73,65,0.5)] whitespace-nowrap">
        <p className="leading-[normal]">16 digit NIK</p>
      </div>
    </div>
  );
}

function Container13() {
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

function Container12() {
  return (
    <div className="absolute content-stretch flex items-center left-[40px] right-[12px] top-[13px]" data-name="Container">
      <Container13 />
      <RectangleAlignStretch />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f8f9fa] flex-[1_0_0] h-[48px] min-w-px overflow-clip relative rounded-[8px]" data-name="Input">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <div className="absolute left-[14px] size-[20px] top-[14px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
          <path d={svgPaths.p207ea900} fill="#3E4941" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[10px] text-right whitespace-nowrap">
        <p className="leading-[15px]">0/16</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container14 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Container10 />
      <Margin />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container9 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="9.33333" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333" width="9.33333">
        <g id="Container">
          <path d={svgPaths.pce77c00} fill="white" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Masuk</p>
      </div>
      <Container16 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#006d42] content-stretch flex h-[48px] items-center justify-center overflow-clip relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Button">
      <Container15 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start pt-[12px] relative shrink-0 w-full" data-name="Button:margin">
      <Button3 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Form">
      <Container4 />
      <Container5 />
      <ButtonMargin />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_6px_rgba(0,0,0,0.05)] relative rounded-[16px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col items-start pb-[32px] pt-[24px] px-[16px] relative size-full">
        <Form />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] text-center whitespace-nowrap">
        <p>
          <span className="leading-[24px]">{`Kendala masuk? `}</span>
          <span className="[word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[24px] text-[#006d42]">Hubungi Kader Posyandu</span>
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[400px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <BackgroundShadow />
      <Container17 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[20px] py-[102.5px] relative size-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Background">
      <Svg />
      <div className="absolute bg-[rgba(122,218,162,0.2)] blur-[32px] right-[-85.33px] rounded-[9999px] size-[256px] top-[-128px]" data-name="Overlay+Blur" />
      <div className="absolute bg-[rgba(210,228,251,0.3)] blur-[32px] bottom-[-106.67px] left-[-80px] rounded-[9999px] size-[320px]" data-name="Overlay+Blur" />
      <Container />
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Main">
      <Background />
    </div>
  );
}

export default function MasukCentingRaja() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 250) 0%, rgb(248, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Masuk Centing Raja">
      <Main />
    </div>
  );
}