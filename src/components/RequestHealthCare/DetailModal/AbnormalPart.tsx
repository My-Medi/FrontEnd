interface AbnormalProps {
  abnormal: string[];
}

const AbnormalPart: React.FC<AbnormalProps> = ({ abnormal }) => {
  return (
    <div className='w-[817px] h-[86px] flex flex-col items-start font-[Pretendard]'>
      {/* 제목 + 파란 네모 아이콘 */}
      <div className='flex items-center'>
        <div className='w-[14.25px] h-[14.25px] bg-[#1D68FF] rounded-[4.5px] mr-[16px]' />
        <span className='text-[#121218] text-[16px] leading-[22.4px] tracking-[-0.48px] font-semibold'>
          최근 건강검진의 이상수치 항목
        </span>
      </div>

      {/* 최근 건강검진의 이상수치 항목 내용 */}
      <ul className='list-disc pl-[48px] pt-[10px] pr-[10px] pb-[10px] max-w-[480px] text-[#121218] text-[14px] leading-[22px] tracking-[-0.42px] font-light space-y-[2px]'>
        {abnormal.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AbnormalPart;
