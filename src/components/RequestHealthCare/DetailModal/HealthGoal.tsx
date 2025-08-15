interface GoalProps {
  goal: string;
}

const RequestHealthGoal: React.FC<GoalProps> = ({ goal }) => {
  return (
    <>
      {/* 데스크탑 뷰 */}
      <div className='hidden lg:flex w-[817px] min-h-[86px] flex-col items-start font-[Pretendard] mt-[20px] mb-[20px]'>
        <div className='flex items-center'>
          <div className='w-[14.25px] h-[14.25px] bg-[#1D68FF] rounded-[4.5px] mr-[16px]' />
          <span className='text-[#121218] text-[16px] leading-[22.4px] tracking-[-0.48px] font-semibold'>
            관리 목표와 기대
          </span>
        </div>
        <div className='flex flex-col w-full pt-[10px] pl-[32px] pr-[10px] pb-[10px] gap-[10px]'>
          <span className='text-[#121218] text-[14px] leading-[22px] tracking-[-0.42px] font-light break-words whitespace-pre-wrap'>
            {goal}
          </span>
        </div>
      </div>

      {/* 모바일 뷰 */}
      <div className='lg:hidden w-[500px] px-[16px] flex flex-col items-start font-[Pretendard] mt-[20px]'>
        <div className='flex items-center'>
          <div className='w-[12px] h-[12px] bg-[#1D68FF] rounded-[3px] mr-[10px]' />
          <span className='text-[#121218] text-[15px] leading-[20px] tracking-[-0.4px] font-semibold'>
            관리 목표와 기대
          </span>
        </div>
        <div className='flex flex-col w-full pt-[10px] pl-[22px] pr-[6px] pb-[8px] gap-[8px]'>
          <span className='text-[#121218] text-[13px] leading-[20px] tracking-[-0.38px] font-light'>
            {goal}
          </span>
        </div>
      </div>
    </>
  );
};

export default RequestHealthGoal;
