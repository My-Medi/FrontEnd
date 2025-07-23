interface RequestHealthHeaderProps {
  expertNickname: string;
  expertName: string;
}

const RequsetHealthHeader: React.FC<RequestHealthHeaderProps> = ({
  expertNickname,
  expertName,
}) => {
  return (
    <div className='w-[245px] h-[74.4px] flex flex-col justify-center items-center gap-[14.4px] font-[Pretendard]'>
      {/* 제목 */}
      <div className='text-center font-semibold text-[24px] leading-[36px] tracking-[-0.72px] text-[#121218]'>
        받은 건강관리요청서
      </div>

      {/* 전문가 이름 */}
      <div className='text-[14px] font-medium leading-[24px] tracking-[-0.42px]'>
        <span className='text-[#1D68FF]'>{expertNickname}</span>
        <span className='text-[#121218]'> / {expertName}</span>
      </div>
    </div>
  );
};

export default RequsetHealthHeader;
