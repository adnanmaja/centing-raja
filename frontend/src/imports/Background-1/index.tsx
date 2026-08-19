import imgCentingRajaLogo from "./0007128175a75209c8c698fe2b734b37ba9ba267.png";

function CentingRajaLogo() {
  return (
    <div className="flex-[1_0_0] min-h-px relative shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)] w-full" data-name="Centing Raja Logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCentingRajaLogo} />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[192px]" data-name="Container">
      <div className="absolute flex inset-[-9.6px] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[100cqh] w-[100cqw]">
          <div className="bg-[rgba(0,109,66,0.05)] relative rounded-[9999px] size-full" data-name="Overlay" />
        </div>
      </div>
      <CentingRajaLogo />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e1e3e4] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-[128px] z-[2]" data-name="Background">
      <div className="absolute bg-[#006d42] bottom-0 left-0 right-1/2 rounded-[9999px] top-0" data-name="Background" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(62,73,65,0.8)] text-center whitespace-nowrap">
        <p className="leading-[24px]">Memuat centing raja....</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 z-[1]" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col isolate items-center relative shrink-0" data-name="Container">
      <Background1 />
      <Margin1 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0" data-name="Margin">
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[384px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Margin />
    </div>
  );
}

export default function Background() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-center justify-center px-[16px] py-[307px] relative size-full" data-name="Background">
      <Container />
    </div>
  );
}