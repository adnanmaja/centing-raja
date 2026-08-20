import imgLogoCentingRaja from "./7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png";

function LogoCentingRaja() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Logo Centing Raja">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLogoCentingRaja} />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Centing Raja</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <LogoCentingRaja />
      <Container2 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex items-center justify-between px-[20px] relative size-full" data-name="Container">
      <Container1 />
    </div>
  );
}