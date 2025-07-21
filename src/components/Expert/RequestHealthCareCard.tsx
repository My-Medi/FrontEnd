import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import HealthDataModal from './HealthDataModal';

interface RequestHealthCareProps {
  nickname: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  requestMessage: string;
  receivedDate: string;
}

const RequestHealthCareCard: React.FC<RequestHealthCareProps> = ({
  nickname,
  gender,
  age,
  height,
  weight,
  requestMessage,
  receivedDate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='w-[771px] mx-auto mb-10 flex flex-col'>
      {/* 날짜 텍스트 */}
      <p className='text-[#4D5053] items-start text-[14px] font-medium leading-[24px] tracking-[-0.42px] mb-2 font-[Pretendard]'>
        {receivedDate}
      </p>

      {/* 요청 카드 박스 */}
      <div
        className='w-full bg-white rounded-[12px]
        px-[30px] py-[24px] flex flex-col justify-center items-center gap-[16px]'
        style={{ border: '1.2px solid #DBE6FF' }}
      >
        <div className='flex w-[621px] max-h-[491px] flex-col items-center gap-8px'>
          {/* 제목 */}
          <h3 className='w-full font-semibold'>
            <span className='text-[#1D68FF] font-[Pretendard] text-[20px] leading-[36px] tracking-[-0.6px]'>
              {nickname}
            </span>
            <span className='text-[#121218] font-[Pretendard] text-[20px] leading-[36px] tracking-[-0.6px]'>
              회원님의 건강관리요청서
            </span>
          </h3>

          {/* 기본 정보 */}
          <div className='w-full flex flex-col items-start mt-[8px]'>
            <p className='mb-[4px] text-[#25282B] font-semibold font-[Pretendard] text-[16px] leading-[22px] tracking-[-0.48px]'>
              기본 정보
            </p>
            <div className='flex w-[617.4px] max-w-[617.4px] items-start gap-[9.6px] h-[22px]'>
              <span className='text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218] font-[Pretendard]'>
                {gender}
              </span>
              <span className='text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218] font-[Pretendard]'>
                ·
              </span>
              <span className='text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218] font-[Pretendard]'>
                만 {age}세
              </span>
              <span className='text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218] font-[Pretendard]'>
                ·
              </span>
              <span className='text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218] font-[Pretendard]'>
                {height}cm / {weight}kg
              </span>
            </div>
          </div>

          {/* 요청 사항 */}
          <div className='w-full flex flex-col items-start gap-4px mt-[8px]'>
            <p className='mb-[4px] font-semibold font-[Pretendard] text-[#25282B] text-[16px] leading-[22px] tracking-[-0.48px]'>
              요청사항
            </p>
            <div className='max-w-[618px] max-h-[214px] overflow-y-auto'>
              {requestMessage.split('\n').map((line, index) =>
                line.trim() === '' ? (
                  // 엔터 2번으로 생긴 빈 줄일 경우 → 더 넓은 여백
                  <div key={index} className='my-[6px]' />
                ) : (
                  // 일반적인 줄 → 기본 마진과 줄 간격 유지
                  <p
                    key={index}
                    className='text-[14px] text-[#121218] font-light font-[Pretendard] leading-[22px] tracking-[-0.4px]'
                  >
                    {line}
                  </p>
                ),
              )}
            </div>
          </div>
          {/* 건강데이터 보기 버튼 */}
          <div
            className='w-full mt-[8px] whitespace-nowrap text-[#1D68FF] font-semibold flex justify-center items-center cursor-pointer'
            onClick={() => setIsModalOpen(true)}
          >
            <span className='mr-[20px] leading-[22px] tracking-[-0.48px]'>
              건강데이터 자세히 보기
            </span>
            <FiChevronRight size={30} color='#1D68FF' />
          </div>
        </div>
        {/* 하단 버튼 영역 */}
        <div className='w-[615px] flex flex-col items-center border-t-[1.2px] border-[#DBE6FF] pt-8'>
          <div className='flex gap-[105.6px]'>
            {/* 거절하기 버튼 */}
            <button
              className='flex justify-center items-center gap-[6px] w-[180px] h-[42px] rounded-full bg-white text-[#25282B] text-[16px] font-medium border border-[#E3E6EB] font-[Pretendard] leading-[36px] tracking-[-0.48px]'
              style={{
                backgroundColor: '#FFFFFF',

                boxShadow: '0px 0px 5px 5px rgba(29, 104, 255, 0.05)',
              }}
            >
              거절하기
            </button>

            {/* 수락하기 버튼 */}
            <button
              className='flex justify-center items-center gap-[6px] w-[180px] h-[42px] rounded-full text-[#FFF] text-[16px] font-medium font-[Pretendard] leading-[22.4px], tracking-[-0.48px]'
              style={{
                backgroundColor: '#1D68FF',
                boxShadow: '0px 0px 5px 5px rgba(29, 104, 255, 0.08)',
              }}
            >
              수락하기
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <HealthDataModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
export default RequestHealthCareCard;
