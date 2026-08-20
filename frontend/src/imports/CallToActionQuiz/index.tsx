import svgPaths from "./svg-6h4fvmwjdq";

function Container() {
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

function BackgroundShadow() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background+Shadow">
      <Container />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start pb-[8px] relative shrink-0 w-[48px]" data-name="Margin">
      <BackgroundShadow />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#536478] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[28px] mb-0">Sudah siap menguji</p>
        <p className="leading-[28px]">pengetahuan?</p>
      </div>
    </div>
  );
}

function Container2() {
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

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading />
      <Container2 />
    </div>
  );
}

function Container3() {
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

function Button() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[24px] py-[10px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Ayo Latihan</p>
      </div>
      <Container3 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0" data-name="Button:margin">
      <Button />
    </div>
  );
}

export default function CallToActionQuiz() {
  return (
    <div className="bg-[#cfe1f8] content-stretch flex flex-col gap-[12px] items-center justify-center overflow-clip p-[24px] relative rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] size-full" data-name="Call to Action: Quiz">
      <div className="absolute bg-[rgba(0,109,66,0.05)] blur-[8px] bottom-[-24px] left-[-24px] rounded-[9999px] size-[96px]" data-name="Decorative elements" />
      <div className="absolute bg-[rgba(248,249,250,0.2)] right-[-16px] rounded-[9999px] size-[64px] top-[-16px]" data-name="Overlay" />
      <Margin />
      <Container1 />
      <ButtonMargin />
    </div>
  );
}