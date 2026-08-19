function Frame() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[11px] items-center left-[calc(50%-0.5px)] top-[292px]">
      <div className="border border-[#ff9ae8] border-solid h-[47px] relative rounded-[10px] shrink-0 w-[41px]" />
      <div className="border border-[#ff9ae8] border-solid h-[47px] relative rounded-[10px] shrink-0 w-[41px]" />
      <div className="border border-[#ff9ae8] border-solid h-[47px] relative rounded-[10px] shrink-0 w-[41px]" />
      <div className="border border-[#ff9ae8] border-solid h-[47px] relative rounded-[10px] shrink-0 w-[41px]" />
      <div className="border border-[#ff9ae8] border-solid h-[47px] relative rounded-[10px] shrink-0 w-[41px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[387px]">
      <div className="-translate-x-1/2 absolute bg-[#ff8601] h-[37px] left-1/2 rounded-[10px] top-[387px] w-[114px]" />
      <div className="-translate-x-1/2 absolute bg-[#ffbb02] h-[34.886px] left-1/2 rounded-[10px] top-[387px] w-[114px]" />
    </div>
  );
}

export default function Otp() {
  return (
    <div className="bg-[#006d42] relative size-full" data-name="OTP">
      <p className="[word-break:break-word] absolute font-['SF_Pro_Rounded:Semibold',sans-serif] leading-[normal] left-[calc(50%-72px)] not-italic text-[24px] text-white top-[189px] whitespace-nowrap">Cek SMS mu!</p>
      <p className="[word-break:break-word] absolute font-['SF_Pro:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[calc(50%-144px)] text-[16px] text-white top-[226px] w-[287px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Kami baru saja mengirim kode OTP ke
      </p>
      <p className="[word-break:break-word] absolute font-['Manrope:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[calc(50%-101px)] text-[16px] text-white top-[252px] w-[219px]">0812345678908123456789</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal h-[18px] leading-[0] left-[calc(50%-97px)] not-italic text-[13px] text-white top-[442px] w-[194px]">
        <span className="leading-[normal]">{`Tidak melihat kode? `}</span>
        <span className="leading-[normal] text-[#ffbb02]">kirim ulang</span>
      </p>
      <Frame />
      <Group />
      <p className="[word-break:break-word] absolute font-['SF_Compact_Rounded:Bold',sans-serif] h-[19px] leading-[normal] left-[calc(50%-36px)] not-italic text-[16px] text-white top-[395px] w-[71px]">Verifikasi</p>
      <div className="absolute h-0 left-[227px] top-[463px] w-[65px]">
        <div className="absolute inset-[-1px_-1.54%]">
          <svg className="block size-full" fill="none" height="2" preserveAspectRatio="none" viewBox="0 0 67 2" width="67">
            <path d="M1 1H66" id="Vector 3" stroke="#FFBB02" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}