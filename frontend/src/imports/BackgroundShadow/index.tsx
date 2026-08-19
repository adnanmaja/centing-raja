import svgPaths from "./svg-do8emjhc2l";

function Container1() {
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

function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Overlay />
    </div>
  );
}

function Container3() {
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
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] w-full">
        <p className="leading-[16px]">Kunjungan Ibu Hamil (Bumil)</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[12px] w-full">
        <p className="leading-[18px]">Posyandu Melati 1</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container7() {
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
      <Container7 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Background />
      <Container4 />
      <Button />
    </div>
  );
}

export default function BackgroundShadow() {
  return (
    <div className="bg-[#f8f9fa] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] size-full" data-name="Background+Shadow">
      <Container />
      <Container2 />
    </div>
  );
}