interface GoalProps {
  goal: string;
}

const RequestHealthGoal: React.FC<GoalProps> = ({ goal }) => {
  return (
    <div className='w-[817px] h-[86px] flex flex-col items-start font-[Pretendard] mt-[20px]'>
      {/* 제목 + 파란 네모 아이콘 */}
      <div className='flex items-center'>
        <div className='w-[14.25px] h-[14.25px] bg-[#1D68FF] rounded-[4.5px] mr-[16px]' />
        <span className='text-[#121218] text-[16px] leading-[22.4px] tracking-[-0.48px] font-semibold'>
          관리 목표와 기대
        </span>
      </div>

      {/* 관리 목표와 기대에 관한 메세지 내용 */}
      <div className='flex flex-col max-w-[480px] pt-[10px] pl-[32px] pr-[10px] pb-[10px] gap-[10px] font-[Pretendard]'>
        <span className='text-[#121218] font-[Pretendard] text-[14px] leading-[22px] tracking-[-0.42px] font-light'>
          {goal}
        </span>
      </div>
    </div>
  );
};

export default RequestHealthGoal;
