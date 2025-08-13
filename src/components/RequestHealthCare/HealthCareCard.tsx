import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import HealthDataModal from './DetailModal/DetailModal';

interface RequestHealthCareProps {
  nickName: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  requestMessage: string;
  receivedDate?: string;
  onAccept: () => void;
  onReject: () => void;
}

const RequestHealthCareCard: React.FC<RequestHealthCareProps> = ({
  nickName,
  gender,
  age,
  height,
  weight,
  requestMessage,
  receivedDate,
  onAccept,
  onReject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccept = () => {
    setIsModalOpen(false);
    onAccept();
  };

  const handleReject = () => {
    setIsModalOpen(false);
    onReject();
  };

  return (
    <>
      {/* 데스크탑 전용 UI */}
      <div className='hidden lg:block'>
        {/* 날짜 텍스트 */}
        {receivedDate && (
          <p className='text-[#4D5053] ml-[34px] items-start text-[14px] font-medium leading-[24px] tracking-[-0.42px] mb-2 font-[Pretendard]'>
            {receivedDate}
          </p>
        )}

        {/* 요청 카드 박스 */}
        <div
          className='w-[771px] bg-white rounded-[12px] px-[30px] py-[24px] flex flex-col justify-center items-center gap-[16px] mx-auto mb-10'
          style={{ border: '1.2px solid #DBE6FF' }}
        >
          <div className='flex w-[621px] max-h-[491px] flex-col items-center gap-8px'>
            <h3 className='w-full font-semibold'>
              <span className='text-[#1D68FF] font-[Pretendard] text-[20px] leading-[36px] tracking-[-0.6px]'>
                {nickName}
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
              <div className='flex items-start gap-[9.6px] h-[22px]'>
                <span className='text-[14px] font-light text-[#121218]'>{gender}</span>
                <span className='text-[14px] font-light text-[#121218]'>·</span>
                <span className='text-[14px] font-light text-[#121218]'>만 {age}세</span>
                <span className='text-[14px] font-light text-[#121218]'>·</span>
                <span className='text-[14px] font-light text-[#121218]'>
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
                    <div key={index} className='my-[6px]' />
                  ) : (
                    <p
                      key={index}
                      className='text-[14px] text-[#121218] font-light leading-[22px] tracking-[-0.4px]'
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

          {/* 액션 버튼 */}
          <div className='flex gap-[12px] w-full justify-center'>
            <button
              onClick={handleReject}
              className='w-[120px] h-[40px] rounded-[8px] border border-[#DBE6FF] bg-white text-[#1D68FF] font-semibold text-[14px] leading-[20px] tracking-[-0.42px]'
            >
              거절하기
            </button>
            <button
              onClick={handleAccept}
              className='w-[120px] h-[40px] rounded-[8px] bg-[#1D68FF] text-white font-semibold text-[14px] leading-[20px] tracking-[-0.42px]'
            >
              수락하기
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <HealthDataModal
          nickname={nickName}
          onClose={() => setIsModalOpen(false)}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </>
  );
};

export default RequestHealthCareCard;
