import React, { useState } from 'react';
import BackIcon from '/src/assets/back.svg';
import TimeIcon from '/src/assets/Calendar/time.svg';
import LocationIcon from '/src/assets/Calendar/location.svg';
import MemoIcon from '/src/assets/Calendar/memo.svg';
import type dayjs from 'dayjs';
import { createExpertScheduleForUser } from '../../../apis/expertApi/schedule';
import { useState as useReactState } from 'react';
import SuccessReservationModal from './SuccessReservationModal';

interface ConsultDateModalProps {
  onClose: (isFromSuccess?: boolean) => void;
  selectedDate: dayjs.Dayjs;
  userId?: number;
}

const ConsultDateModal: React.FC<ConsultDateModalProps> = ({ onClose, selectedDate, userId }) => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [meridiem, setMeridiem] = useState<'오전' | '오후'>('오전');
  const [location, setLocation] = useState('');
  const [memo, setMemo] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useReactState(false);

  const handleRegister = async () => {
    if (!userId) return;
    const title = '상담';
    const meetingDate = selectedDate.format('YYYY-MM-DD');
    const numHour = parseInt(hour || '0', 10);
    const numMinute = parseInt(minute || '0', 10);
    const am = meridiem === '오전';

    try {
      setIsSubmitting(true);
      await createExpertScheduleForUser(userId, {
        title,
        memo,
        location,
        meetingDate,
        hour: numHour,
        minute: numMinute,
        am,
      });
      setIsSuccessModalOpen(true);
    } catch (_e) {
      // TODO: 에러 토스트가 있다면 연결 가능
    } finally {
      setIsSubmitting(false);
    }
  };


  const toggleMeridiem = () => {
    setMeridiem((prev) => (prev === '오전' ? '오후' : '오전'));
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력 가능
    if (!/^\d*$/.test(value)) return;
    
    const numValue = parseInt(value);
    // 0-23 범위만 허용
    if (numValue >= 0 && numValue <= 23) {
      setHour(value);
    } else if (value === '') {
      setHour('');
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력 가능
    if (!/^\d*$/.test(value)) return;
    
    const numValue = parseInt(value);
    // 0-59 범위만 허용
    if (numValue >= 0 && numValue <= 59) {
      setMinute(value);
    } else if (value === '') {
      setMinute('');
    }
  };

  return (
    <>
      {!isSuccessModalOpen && (
        <>
          <div className='fixed inset-0 bg-black/30 z-80' />
          <div className='absolute left-1/2 -translate-x-1/2 z-90 top-[20px]'>
        <div className='hidden lg:flex flex-col items-center gap-[40px] relative w-[889px] pt-[50px] pl-[50px] pr-[80px] pb-[50px] rounded-[40px] bg-white shadow-md'>
          {/* 상단 헤더 */}
          <div className='flex mt-[-10px] items-center gap-6 w-full justify-center'>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // 뒤로가기 버튼을 누르면 Date 모달만 닫고 Calendar 모달로 돌아감
                setIsSuccessModalOpen(false); // 성공 모달이 열려있다면 닫기
                onClose(false); // Date 모달 닫기 (isFromSuccess = false)
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

          {/* 입력 영역 */}
          <div className='w-[402px] h-[165px] mx-auto flex flex-col justify-center gap-6'>
            {/* 시간 입력 */}
            <div className='flex items-center gap-4'>
              <img src={TimeIcon} alt='시간' className='w-[16px] h-[16px]' />
              <span className='text-[#4D5053] text-[14px] font-medium leading-[24px] tracking-[-0.42px]'>
                시간
              </span>

              <div className='flex items-center gap-[16px] w-[176px] h-[39px] px-[16px] rounded-[8px] border border-[#EDF0F3] bg-white'>
                <input
                  type='text'
                  value={hour}
                  onChange={handleHourChange}
                  placeholder='00'
                  className='w-[24px] ml-[30px] text-center text-[#121218] text-[16px] font-light outline-none'
                />
                <span className='text-[#4D5053] text-[16px] font-light'>:</span>
                <input
                  type='text'
                  value={minute}
                  onChange={handleMinuteChange}
                  placeholder='00'
                  className='w-[24px] text-center text-[#121218] text-[16px] font-light outline-none'
                />
              </div>

              <button
                className='w-[48px] h-[39px] ml-[8px] rounded-[8px] bg-white shadow border border-[#EDF0F3] text-[#4D5053] text-[16px] font-light'
                onClick={toggleMeridiem}
              >
                {meridiem}
              </button>
            </div>

            {/* 장소 입력 */}
            <div className='flex items-center gap-4'>
              <img src={LocationIcon} alt='장소' className='w-[16px] h-[16px]' />
              <span className='text-[#4D5053] text-[14px] font-medium leading-[24px] tracking-[-0.42px]'>
                장소
              </span>
              <input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='장소'
                className='w-[300px] px-[16px] py-[10px] rounded-[8px] border border-[#EDF0F3] bg-white text-[#121218] text-[16px] font-light outline-none'
              />
            </div>

            {/* 메모 입력 */}
            <div className='flex items-center gap-4'>
              <img src={MemoIcon} alt='메모' className='w-[16px] h-[16px]' />
              <span className='text-[#4D5053] text-[14px] font-medium leading-[24px] tracking-[-0.42px]'>
                메모
              </span>
              <input
                type='text'
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder='메모'
                className='w-[300px] px-[16px] py-[10px] rounded-[8px] border border-[#EDF0F3] bg-white text-[#121218] text-[16px] font-light outline-none'
              />
            </div>
          </div>
          {/* 등록 버튼 */}
          <div className='flex flex-col justify-center items-center border-[#1D68FF] w-[274px] h-[48px]'>
            <button
              className='flex justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#1D68FF] border border-[#E3E6EB] text-[#FFF] text-[18px] font-semibold font-[Pretendard] leading-[27px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
              onClick={handleRegister}
              disabled={isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '등록'}
            </button>
          </div>
        </div>
      </div>
        </>
      )}
      {isSuccessModalOpen && (
        <SuccessReservationModal onClose={() => {
          // 확인 버튼 클릭 시 즉시 상위 모달까지 완전 종료
          onClose(true); // isFromSuccess = true
        }} />
      )}
    </>
  );
};

export default ConsultDateModal;
