import React, { useState } from 'react';
import BackIcon from '/src/assets/back.svg';
import Calendar from './Calendar';
import type dayjs from 'dayjs';
import ConsultDateModal from './Date';

interface ConsultReservationModalProps {
  onClose: (isFromSuccess?: boolean) => void;
  userId?: number;
}

const ConsultReservationModal: React.FC<ConsultReservationModalProps> = ({ onClose, userId }) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const handleNext = () => {
    if (selectedDate) {
      setIsDateModalOpen(true);
    }
  };

  return (
    <>
      {!isDateModalOpen && (
        <>
          <div className='fixed inset-0 bg-black/30 z-60' />
          <div className='absolute left-1/2 -translate-x-1/2 z-70 top-[20px]'>
        <div className='hidden lg:flex flex-col items-center gap-[40px] relative w-[889px] pt-[50px] pl-[50px] pr-[80px] pb-[50px] rounded-[40px] bg-white shadow-md'>
          {/* 상단 헤더 */}
          <div className='flex mt-[-10px] items-center gap-6 w-full justify-center'>
                                        <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClose(false); // isFromSuccess = false
                              }}
              className='cursor-pointer shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity'
              style={{ position: 'relative', zIndex: 100, minWidth: '40px', minHeight: '40px' }}
            >
              <img src={BackIcon} alt='뒤로가기' className='w-[17px] h-[35px] pointer-events-none' />
            </button>

            <div className='flex flex-col ml-[-80px] w-[837px] items-center justify-between h-[60px]'>
              <p className='text-[#121218] mt-[15px] text-[24px] font-semibold font-[Pretendard] leading-[36px] tracking-[-0.72px]'>
                상담 예약일 지정
              </p>
            </div>
          </div>

          {/* 내부 달력 컴포넌트 */}
          <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

          <div className='flex flex-col mt-[-40px] justify-center items-center border-[#1D68FF] w-[274px] h-[48px]'>
            <button
              className='flex justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#1D68FF] border border-[#E3E6EB] text-[#FFF] text-[18px] font-semibold font-[Pretendard] leading-[27px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
              onClick={handleNext}
            >
              다음
            </button>
          </div>
        </div>
      </div>
        </>
      )}

      {/* 날짜 상세 입력 모달 */}
      {isDateModalOpen && selectedDate && (
        <ConsultDateModal 
          onClose={(isFromSuccess = false) => {
            setIsDateModalOpen(false);
            // 성공 모달에서 확인 버튼을 누르면 모든 모달을 닫기
            if (isFromSuccess) {
              onClose(true); // isFromSuccess = true
            }
            // 뒤로가기 버튼을 누르면 Calendar 모달은 유지하고 memberCardModal로 돌아감
          }} 
          selectedDate={selectedDate}
          userId={userId}
        />
      )}
    </>
  );
};

export default ConsultReservationModal;
