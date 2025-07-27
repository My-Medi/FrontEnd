interface GoalProps {
  goal: string;
}

const RequsetHealthGoal: React.FC<GoalProps> = ({ goal }) => {
  return (
    <div className='w-[817px] h-[86px] flex flex-col items-startfont-[Pretendard]'>
      {/* 제목 */}
      <div className='font-semibold text-[16px] leading-[22.4px] tracking-[-0.48px] text-[#121218]'>
        관리 목표와 기대
      </div>

      {/* 관리 목표와 기대에 관한 메세지 내용 */}
      <div className='flex flex-col w-[464px] pt-[10px] pl-[32px] pr-[10px] pb-[10px] gap-[10px]'>
        <span className='text-[#121218] font-[Pretendard] text-[14px] leading-[22px] tracking-[-0.42px] font-light'>
          {goal}
        </span>
      </div>
    </div>
  );
};

export default RequsetHealthGoal;
