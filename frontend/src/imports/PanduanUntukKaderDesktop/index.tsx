import svgPaths from "./svg-qjl1ofq0l1";
import imgLogoCentingRaja from "./7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png";
import imgImageShadow from "./813a628706e3f273ba2ad2e5b150cecf19a13ef3.png";

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

function Container() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] relative size-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start left-0 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] top-0 w-[1441px]" data-name="Header">
      <Container />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[18.35px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="18.35" preserveAspectRatio="none" viewBox="0 0 20 18.35" width="20">
        <g id="Container">
          <path d={svgPaths.p279a9400} fill="#005C38" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#76d69f] content-stretch flex items-center justify-center left-[16px] rounded-[9999px] size-[48px] top-[16px]" data-name="Background">
      <Container3 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] left-0 text-[#191c1d] text-[16px] top-[12px] whitespace-nowrap">
        <p className="leading-[24px]">Panduan Orang Tua</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[16px] w-[559px]" data-name="Container">
      <Heading />
    </div>
  );
}

function WelcomeCard() {
  return (
    <div className="absolute bg-white h-[96px] left-[130px] rounded-[12px] top-[438px] w-[1181px]" data-name="Welcome Card">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" data-name="Welcome Card:shadow" />
      <Background />
      <Container4 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] left-[80px] text-[#3e4941] text-[16px] top-[58px] w-[1072px]">
        <p className="leading-[24px]">Ikuti langkah-langkah sederhana ini untuk memaksimalkan penggunaan aplikasi dalam menjaga kesehatan anak Anda.</p>
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center pb-[4.5px] pt-[3.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background+Shadow">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">1</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <BackgroundShadow />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.3333" preserveAspectRatio="none" viewBox="0 0 16.6667 13.3333" width="16.6667">
        <g id="Container">
          <path d={svgPaths.p2233f880} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[48px] items-center left-[16px] right-[16px] top-[16px]" data-name="Heading 3">
      <Container5 />
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">Pantau Status Tumbuh</p>
        <p className="leading-[24px]">Kembang</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[96px] left-[16px] right-[16px] top-[72px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] left-0 right-0 text-[#3e4941] text-[16px] top-[48px]">
        <p className="leading-[24px] mb-0">Ketahui status pertumbuhan anak</p>
        <p className="leading-[24px] mb-0">secara real-time dan deteksi dini</p>
        <p className="leading-[24px] mb-0">risiko stunting berdasarkan standar</p>
        <p className="leading-[24px]">WHO.</p>
      </div>
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.54)] flex-[1_0_0] h-[184px] min-w-px relative rounded-[12px]" data-name="Background+Shadow">
      <Heading1 />
      <Container6 />
    </div>
  );
}

function Step() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[130px] right-[968px] top-[565px]" data-name="Step 1">
      <Margin />
      <BackgroundShadow1 />
    </div>
  );
}

function Margin1() {
  return <div className="absolute h-[36px] left-[458px] top-[568px] w-[32px]" data-name="Margin" />;
}

function BackgroundShadow2() {
  return (
    <div className="absolute bg-[#006d42] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center left-[549px] pb-[4.5px] pt-[3.5px] rounded-[9999px] size-[32px] top-[568px]" data-name="Background+Shadow">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">2</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[16.688px] relative shrink-0 w-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="16.6875" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6875" width="16.6667">
        <g id="Container">
          <path d={svgPaths.p15066600} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-[16px] right-[16px] top-[16px]" data-name="Heading 3">
      <Container7 />
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Input Antropometri Mandiri</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[48px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Catat berat badan (BB), tinggi</p>
        <p className="leading-[24px] mb-0">badan (TB), dan lingkar kepala si</p>
        <p className="leading-[24px] mb-0">kecil langsung dari rumah setiap</p>
        <p className="leading-[24px]">bulan.</p>
      </div>
    </div>
  );
}

function BackgroundShadow3() {
  return (
    <div className="absolute bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.54)] h-[184px] left-[597px] right-[549px] rounded-[12px] top-[565px]" data-name="Background+Shadow">
      <Heading2 />
      <Container8 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[458px] top-[565px]">
      <Margin1 />
      <BackgroundShadow2 />
      <BackgroundShadow3 />
    </div>
  );
}

function BackgroundShadow4() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center pb-[4.5px] pt-[3.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background+Shadow">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">3</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <BackgroundShadow4 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[10.833px] relative shrink-0 w-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="10.8333" preserveAspectRatio="none" viewBox="0 0 16.6667 10.8333" width="16.6667">
        <g id="Container">
          <path d={svgPaths.p617b400} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-[16px] right-[16px] top-[16px]" data-name="Heading 3">
      <Container9 />
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">KMS Digital</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[48px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Lihat grafik pertumbuhan interaktif</p>
        <p className="leading-[24px] mb-0">yang memvisualisasikan</p>
        <p className="leading-[24px] mb-0">perkembangan anak dibandingkan</p>
        <p className="leading-[24px]">dengan kurva ideal WHO.</p>
      </div>
    </div>
  );
}

function BackgroundShadow5() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.54)] flex-[1_0_0] h-[184px] min-w-px relative rounded-[12px]" data-name="Background+Shadow">
      <Heading3 />
      <Container10 />
    </div>
  );
}

function Step1() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[130px] right-[968px] top-[821px]" data-name="Step 3">
      <Margin2 />
      <BackgroundShadow5 />
    </div>
  );
}

function BackgroundShadow6() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center pb-[4.5px] pt-[3.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background+Shadow">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">4</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <BackgroundShadow6 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" height="16.6667" preserveAspectRatio="none" viewBox="0 0 15 16.6667" width="15">
        <g id="Container">
          <path d={svgPaths.p1f853380} fill="#006D42" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-[16px] right-[16px] top-[16px]" data-name="Heading 3">
      <Container11 />
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">{`Jadwal Posyandu & Edukasi`}</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[48px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Dapatkan pengingat jadwal</p>
        <p className="leading-[24px] mb-0">pengukuran posyandu terdekat dan</p>
        <p className="leading-[24px] mb-0">akses materi edukasi kesehatan</p>
        <p className="leading-[24px]">anak terkini.</p>
      </div>
    </div>
  );
}

function BackgroundShadow7() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.54)] flex-[1_0_0] h-[184px] min-w-px relative rounded-[12px]" data-name="Background+Shadow">
      <Heading4 />
      <Container12 />
    </div>
  );
}

function Step2() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[549px] right-[549px] top-[821px]" data-name="Step 4">
      <Margin3 />
      <BackgroundShadow7 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[130px] top-[565px]">
      <Step />
      <Group />
      <Step1 />
      <Step2 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col h-[8px] items-start pl-[8px] relative shrink-0 w-[16px]" data-name="Margin">
      <div className="bg-[#e1e3e4] relative rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col h-[8px] items-start pl-[8px] relative shrink-0 w-[16px]" data-name="Margin">
      <div className="bg-[#e1e3e4] relative rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col h-[8px] items-start pl-[8px] relative shrink-0 w-[16px]" data-name="Margin">
      <div className="bg-[#e1e3e4] relative rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
    </div>
  );
}

function DotsIndicator() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Dots Indicator">
      <div className="bg-[#006d42] h-[8px] relative rounded-[9999px] shrink-0 w-[24px]" data-name="Background" />
      <Margin4 />
      <Margin5 />
      <Margin6 />
    </div>
  );
}

function DotsIndicatorMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0" data-name="Dots Indicator:margin">
      <DotsIndicator />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#4f6073] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Lewati</p>
      </div>
    </div>
  );
}

function Container13() {
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

function Button1() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_4px_6px_rgba(0,0,0,0.15)] flex gap-[7.99px] items-center px-[32px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:SemiBold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Lanjut</p>
      </div>
      <Container13 />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[670px]" data-name="Buttons">
      <Button />
      <Button1 />
    </div>
  );
}

function BottomNavigationControls() {
  return (
    <div className="absolute bg-[#f8f9fa] bottom-0 content-stretch drop-shadow-[0px_-4px_6px_rgba(0,0,0,0.05)] flex flex-col h-[136px] items-center justify-between left-0 p-[24px] right-0" data-name="Bottom Navigation / Controls">
      <DotsIndicatorMargin />
      <Buttons />
    </div>
  );
}

function ImageShadow() {
  return <div className="absolute bg-size-[512px_286px] bg-top-left h-[320px] left-[130px] right-[156px] rounded-[12px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[91px]" style={{ backgroundImage: `url("${imgImageShadow}")` }} data-name="Image+Shadow" />;
}

function Group3() {
  return (
    <div className="absolute contents left-[130px] right-[156px] top-[91px]">
      <ImageShadow />
    </div>
  );
}

function Group2() {
  return (
    <div className="[word-break:break-word] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center ml-0 mt-0 relative row-1 text-[32px] text-black text-center tracking-[-0.64px] whitespace-nowrap">
        <p className="leading-[40px]">Panduan Detail Kader</p>
      </div>
      <div className="col-1 flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center ml-0 mt-[40px] relative row-1 text-[16px] text-white w-[624px]">
        <p className="leading-[24px] mb-0">Selamat Datang di Centing Raja</p>
        <p className="leading-[24px]">{`Bersama kita pantau tumbuh kembang si kecil dengan mudah dan akurat `}</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-gradient-to-t content-stretch flex flex-col from-[rgba(0,109,66,0.9)] h-[320px] items-start justify-end left-[130px] p-[20px] rounded-[20px] to-[rgba(0,109,66,0.2)] top-[91px] w-[1176px]" data-name="Background">
      <Group2 />
    </div>
  );
}

export default function PanduanUntukKaderDesktop() {
  return (
    <div className="bg-white relative size-full" data-name="Panduan Untuk Kader Desktop">
      <Header />
      <WelcomeCard />
      <Group1 />
      <BottomNavigationControls />
      <Group3 />
      <Background1 />
    </div>
  );
}