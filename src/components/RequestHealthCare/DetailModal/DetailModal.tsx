import React from 'react';
import BackIcon from '/src/assets/back.svg'; // SVG 경로

interface DetailModalProps {
  nickname: string;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
}

const HealthDataModal: React.FC<DetailModalProps> = ({ nickname, onClose, onAccept, onReject }) => {
  return (
    <div className='fixed inset-0 z-50 bg-[#121218]/10 flex justify-center items-center'>
      <div className='flex flex-col items-center gap-6 relative w-[984px] px-[50px] py-[50px] rounded-[40px] bg-white'>
        {/* 상단 헤더 */}
        <div className='flex items-center gap-6  self-start'>
          {/* 뒤로가기 버튼 */}
          <button onClick={onClose} className=' shrink-0 flex items-center justify-center'>
            <img src={BackIcon} alt='뒤로가기' className='w-[17px] h-[35px]' />
          </button>

          {/* 텍스트 블럭 */}
          <div className='flex flex-col w-[837px] items-center justify-between h-[60px]'>
            <p className='text-[#4D5053] text-[14px] font-medium font-[Pretendard] leading-[24px] tracking-[-0.42px]'>
              건강 데이터 상세
            </p>
            <p className='text-[#121218] text-[24px] font-semibold font-[Pretendard] leading-[36px] tracking-[-0.72px]'>
              {nickname} 회원님의 건강관리 요청서
            </p>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className='flex flex-col items-center border-t-[1.2px] border-[#DBE6FF] pt-8 w-[300px] h-[56px] gap-4 mt-6'>
          <div className='flex gap-[96px]'>
            {/* 거절하기 버튼 */}
            <button
              onClick={onReject}
              className='flex justify-center items-center gap-[6px] w-[300px] h-[56px] rounded-full text-[#25282B] text-[20px] font-medium font-[Pretendard] border border-[#E3E6EB] leading-[36px] tracking-[-0.6px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)]'
            >
              거절하기
            </button>

            {/* 수락하기 버튼 */}
            <button
              onClick={onAccept}
              className='flex justify-center items-center gap-[6px] w-[300px] h-[56px] rounded-full text-white text-[20px] font-medium font-[Pretendard] leading-[36px] tracking-[-0.6px] bg-[#1D68FF] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.08)]'
            >
              수락하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDataModal;
