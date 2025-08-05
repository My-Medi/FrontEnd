import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SuccessReservationModalProps {
  onClose: () => void;
}

const SuccessReservationModal: React.FC<SuccessReservationModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='fixed inset-0 bg-black/30 z-50' />
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='bg-white rounded-[30px] shadow-lg w-[889px] h-[224px] pl-[80px] pt-[50px] pr-[80px] pb-[50px] flex flex-col items-center justify-center gap-6'>
          <p className=' w-full justify-center text-[#4D5053] items-center flex flex-col font-[Pretendard] text-[24px] leading-[36px] tracking-[-0.72px] font-semibold'>
            상담 예약일이 등록되었습니다!
          </p>
          <div className='flex gap-[32px] mt-[10px]'>
            <button
              className='flex text-[18px] font-[Pretendard] leading-[36px] tracking-[-0.54px] text-[#121218] justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#FFF] border border-[#E3E6EB] text-[#25282B] text-[18px] font-semibold font-[Pretendard] leading-[27px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
              onClick={() => {
                navigate('/myhome');
              }}
            >
              캘린더 보러가기
            </button>
            <button
              className='flex text-[18px] font-[Pretendard] leading-[36px] tracking-[-0.54px] text-[#FFF] justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#1D68FF] border border-[#E3E6EB] text-[#FFF] text-[18px] font-semibold font-[Pretendard] leading-[27px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessReservationModal;
