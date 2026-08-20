import svgPaths from "./svg-wvollzyoyf";

function Container() {
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

export default function BackgroundShadow() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[9999px] size-full" data-name="Background+Shadow">
      <Container />
    </div>
  );
}