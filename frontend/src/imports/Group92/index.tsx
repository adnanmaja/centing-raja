import svgPaths from "./svg-827q949dff";
import imgHeroSection from "./a43a2eb4bfc773402438273ec15acf241a525467.png";
import imgLogoCentingRaja from "./7de6f99be5b1285d73c8291a2717fd5004f4c8f2.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px]">Selamat Datang di Centing Raja</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 1:margin">
      <Heading />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-gradient-to-t flex-[1_0_0] from-[rgba(0,109,66,0.9)] min-h-px relative to-[rgba(0,109,66,0.2)] w-full" data-name="Background">
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end p-[20px] relative size-full">
          <Heading1Margin />
          <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] w-[336px]">
            <p className="leading-[24px] mb-0">Bersama kita pantau tumbuh</p>
            <p className="leading-[24px] mb-0">kembang si kecil dengan mudah dan</p>
            <p className="leading-[24px]">akurat dari rumah.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="bg-size-[512px_279px] bg-top-left content-stretch flex flex-col h-[320px] items-start justify-center overflow-clip relative rounded-bl-[32px] rounded-br-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" style={{ backgroundImage: `url("${imgHeroSection}")` }} data-name="Hero Section">
      <Background />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px]">Selamat Datang di Centing Raja</p>
      </div>
    </div>
  );
}

function Heading1Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 1:margin">
      <Heading1 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-gradient-to-t flex-[1_0_0] from-[rgba(0,109,66,0.9)] min-h-px relative to-[rgba(0,109,66,0.2)] w-full" data-name="Background">
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end p-[20px] relative size-full">
          <Heading1Margin1 />
          <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[72px] justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.9)] w-full">
            <p className="leading-[24px] mb-0">Bersama kita pantau tumbuh</p>
            <p className="leading-[24px] mb-0">kembang si kecil dengan mudah dan</p>
            <p className="leading-[24px]">akurat dari rumah.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container1() {
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

function Background2() {
  return (
    <div className="bg-[#76d69f] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Panduan Orang Tua</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">Ikuti langkah-langkah sederhana</p>
        <p className="leading-[24px] mb-0">ini untuk memaksimalkan</p>
        <p className="leading-[24px] mb-0">penggunaan aplikasi dalam</p>
        <p className="leading-[24px]">menjaga kesehatan anak Anda.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <Heading2 />
      <Container3 />
    </div>
  );
}

function WelcomeCard() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Welcome Card">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" data-name="Welcome Card:shadow" />
        <Background2 />
        <Container2 />
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

function Container4() {
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

function Heading3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 3">
      <Container4 />
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">Pantau Status Tumbuh</p>
        <p className="leading-[24px]">Kembang</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4941] text-[16px] w-full">
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
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
        <Heading3 />
        <Container5 />
      </div>
    </div>
  );
}

function Step() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Step 1">
      <Margin />
      <BackgroundShadow1 />
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-[#006d42] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center pb-[4.5px] pt-[3.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background+Shadow">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">2</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <BackgroundShadow2 />
    </div>
  );
}

function Container6() {
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

function Heading4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 3">
      <Container6 />
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Input Antropometri Mandiri</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
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
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
        <Heading4 />
        <Container7 />
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Step 2">
      <Margin1 />
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

function Container8() {
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

function Heading5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 3">
      <Container8 />
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">KMS Digital</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
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
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
        <Heading5 />
        <Container9 />
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Step 3">
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

function Container10() {
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

function Heading6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 3">
      <Container10 />
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">{`Jadwal Posyandu & Edukasi`}</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
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
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
        <Heading6 />
        <Container11 />
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Step 4">
      <Margin3 />
      <BackgroundShadow7 />
    </div>
  );
}

function TutorialStepsTimeline() {
  return (
    <div className="relative shrink-0 w-full" data-name="Tutorial Steps Timeline">
      <div className="content-stretch flex flex-col gap-[24px] items-start pl-[8px] relative size-full">
        <div className="absolute bg-[#e7e8e9] bottom-[124px] left-[24px] rounded-[9999px] top-[24px] w-[2px]" data-name="Vertical Line" />
        <Step />
        <Step1 />
        <Step2 />
        <Step3 />
      </div>
    </div>
  );
}

function MainContentContainer() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-0 px-[20px] right-0 top-[-24px]" data-name="Main Content Container">
      <WelcomeCard />
      <TutorialStepsTimeline />
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col h-[8px] items-start pl-[8px] relative shrink-0 w-[28px]" data-name="Margin">
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
      <Margin4 />
      <div className="bg-[#006d42] h-[8px] relative rounded-[9999px] shrink-0 w-[24px]" data-name="Background" />
      <Margin5 />
      <Margin6 />
    </div>
  );
}

function DotsIndicatorMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-[84px]" data-name="Dots Indicator:margin">
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

function Container12() {
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
      <Container12 />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex items-center justify-between max-w-[400px] relative shrink-0 w-full" data-name="Buttons">
      <Button />
      <Button1 />
    </div>
  );
}

function BottomNavigationControls() {
  return (
    <div className="absolute bg-[#f8f9fa] bottom-0 content-stretch drop-shadow-[0px_-4px_6px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between left-0 p-[24px] right-0" data-name="Bottom Navigation / Controls">
      <DotsIndicatorMargin />
      <Buttons />
    </div>
  );
}

function MainContentContainerMargin() {
  return (
    <div className="h-[1049px] relative shrink-0 w-full" data-name="Main Content Container:margin">
      <MainContentContainer />
      <BottomNavigationControls />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[1369px] items-start relative shrink-0 w-full" data-name="Container">
      <HeroSection />
      <Background1 />
      <MainContentContainerMargin />
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col h-[1433px] items-start min-h-[780px] pb-[96px] pt-[64px] relative shrink-0 w-full" data-name="Main">
      <Container />
    </div>
  );
}

function LogoCentingRaja() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Logo Centing Raja">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLogoCentingRaja} />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006d42] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Centing Raja</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <LogoCentingRaja />
      <Container15 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] relative size-full">
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start left-0 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] top-0 w-[390px]" data-name="Header">
      <Container13 />
    </div>
  );
}

function PanduanOrangTuaMobile() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1433px] items-start left-0 top-0 w-[390px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 250) 0%, rgb(248, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Panduan Orang Tua Mobile">
      <Main />
      <Header />
    </div>
  );
}

export default function Group() {
  return (
    <div className="contents relative size-full">
      <PanduanOrangTuaMobile />
    </div>
  );
}