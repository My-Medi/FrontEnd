interface AbnormalProps {
  abnormal: string[];
}

const AbnormalPart: React.FC<AbnormalProps> = ({ abnormal }) => {
  return (
    <>
      <div className='hidden lg:flex w-[817px] flex flex-col items-start'>
        {/* 제목 + 파란 네모 아이콘 */}
        <div className='flex items-center'>
          <div className='w-[14.25px] h-[14.25px] bg-[#1D68FF] rounded-[4.5px] mr-[16px]' />
          <span className='text-[#121218] text-[16px] leading-[22.4px] tracking-[-0.48px] font-semibold'>
            최근 건강검진의 이상수치 항목
          </span>
        </div>

        {/* 최근 건강검진의 이상수치 항목 내용 (작은 도트) */}
        <div className='pl-[48px] pt-[10px] pr-[10px] pb-[10px] max-w-[480px] text-[#121218] text-[14px] leading-[22px] tracking-[-0.42px] font-light space-y-[4px]'>
          {abnormal.map((item, idx) => (
            <div key={idx} className='flex items-start gap-2'>
              <span className='mt-[10px] w-[4px] h-[4px] rounded-full bg-[#121218] inline-block' />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 모바일 뷰 */}
      <div className='lg:hidden w-full px-[16px] flex flex-col items-start font-[Pretendard] mt-[20px]'>
        <div className='flex items-center'>
          <div className='w-[12px] h-[12px] bg-[#1D68FF] rounded-[3px] mr-[10px]' />
          <span className='text-[#121218] text-[15px] leading-[20px] tracking-[-0.4px] font-semibold'>
            최근 건강검진의 이상수치 항목
          </span>
        </div>
        <div className='pl-[22px] pt-[10px] pr-[10px] pb-[8px] text-[#121218] text-[13px] leading-[20px] tracking-[-0.38px] font-light space-y-[4px]'>
          {abnormal.map((item, idx) => (
            <div key={idx} className='flex items-start gap-2'>
              <span className='mt-[8px] w-[3px] h-[3px] rounded-full bg-[#121218] inline-block' />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AbnormalPart;
