import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import HealthDataModal from './DetailModal/DetailModal';
import { useExpertUserInfo } from '../../hooks/consultation/expert/queries/useExpertUserInfo';

export interface RequestHealthCareCardProps {
  nickname: string;
  gender: string;
  age: number | string;
  height: number;
  weight: number;
  requestMessage: string;
  receivedDate?: string;
  onAccept?: () => void;
  onReject?: () => void;
  userId?: number; // modal 상세 조회용 (선택)
}

const RequestHealthCareCard: React.FC<RequestHealthCareCardProps> = ({
  nickname,
  gender,
  age,
  height,
  weight,
  requestMessage,
  receivedDate,
  onAccept,
  onReject,
  userId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 상세 API는 모달 열릴 때만 트리거
  const userInfoQuery = useExpertUserInfo(isModalOpen ? userId ?? null : null, 'REQUESTED');
  const ageDisplay = typeof age === 'number' ? `만 ${age}세` : age;
  const toKoreanGender = (g?: string) => {
    const norm = (g ?? '').toString().toUpperCase();
    if (norm === 'MALE' || norm === 'MAEL') return '남성';
    if (norm === 'FEMALE' || norm === 'FAMALE') return '여성';
    return g ?? '-';
  };
  const genderDisplay = toKoreanGender(gender);

  return (
    <>
      {/* 데스크탑 전용 UI */}
      <div className='hidden lg:block'>
        {receivedDate && (
          <p className='text-[#4D5053] ml-[34px] items-start text-[14px] font-medium leading-[24px] tracking-[-0.42px] mb-2 font-[Pretendard]'>
            {receivedDate}
          </p>
        )}

        <div
          className='w-[771px] bg-white rounded-[12px] px-[30px] py-[24px] flex flex-col justify-center items-center gap-[16px] mx-auto mb-10'
          style={{ border: '1.2px solid #DBE6FF' }}
        >
          <div className='flex w-[621px] max-h-[491px] flex-col items-center gap-2'>
            <h3 className='w-full font-semibold'>
              <span className='text-[#1D68FF] font-[Pretendard] text-[20px] leading-[36px] tracking-[-0.6px]'>
                {nickname}
              </span>
              <span className='text-[#121218] font-[Pretendard] text-[20px] leading-[36px] tracking-[-0.6px]'>
                회원님의 건강관리요청서
              </span>
            </h3>

            <div className='w-full flex flex-col items-start mt-[8px]'>
              <p className='mb-[4px] text-[#25282B] font-semibold font-[Pretendard] text-[16px] leading-[22px] tracking-[-0.48px]'>
                기본 정보
              </p>
              <div className='flex items-start gap-[9.6px] h-[22px]'>
                <span className='text-[14px] font-light text-[#121218]'>{genderDisplay}</span>
                <span className='text-[14px] font-light text-[#121218]'>·</span>
                <span className='text-[14px] font-light text-[#121218]'>{ageDisplay}</span>
                <span className='text-[14px] font-light text-[#121218]'>·</span>
                <span className='text-[14px] font-light text-[#121218]'>
                  {height}cm / {weight}kg
                </span>
              </div>
            </div>

            <div className='w-full flex flex-col items-start gap-1 mt-[8px]'>
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

            <div
            className='flex items-center justify-center text-[#1D68FF] font-semibold cursor-pointer'
            onClick={() => setIsModalOpen(true)}
          >
            <span className='mr-2 text-sm'>건강데이터 자세히 보기</span>
            <FiChevronRight size={24} color='#1D68FF' />
          </div>

            <div className='w-full mt-[8px] whitespace-nowrap text-[#1D68FF] font-semibold flex justify-center items-center gap-4'>
              <button
                className='w-[180px] h-[42px] rounded-full bg-white text-[#25282B] text-[16px] font-medium border border-[#E3E6EB] font-[Pretendard] tracking-[-0.48px]'
                onClick={onReject}
              >
                거절하기
              </button>
              <button
                className='w-[180px] h-[42px] rounded-full text-white text-[16px] font-medium font-[Pretendard] tracking-[-0.48px]'
                style={{ backgroundColor: '#1D68FF' }}
                onClick={onAccept}
              >
                수락하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 전용 UI */}
      <div className='lg:hidden px-4 mb-10 font-[Pretendard]'>
        {receivedDate && (
          <p className='text-[#4D5053] text-sm font-medium leading-6 tracking-tight mb-2'>
            {receivedDate}
          </p>
        )}
        <div className='w-full font-[Pretendard] bg-white rounded-xl px-4 py-5 flex flex-col gap-4 border border-[#DBE6FF]'>
          <h3 className='text-lg font-semibold'>
            <span className='text-[#1D68FF]'>{nickname}</span>
            <span className='text-[#121218]'> 회원님의 건강관리요청서</span>
          </h3>
          <div>
            <p className='text-[#25282B] font-semibold text-sm mb-1'>기본 정보</p>
            <div className='text-sm text-[#121218] font-light flex gap-2'>
              <span>{genderDisplay}</span>
              <span>·</span>
              <span>{ageDisplay}</span>
              <span>·</span>
              <span>
                {height}cm / {weight}kg
              </span>
            </div>
          </div>
          <div>
            <p className='text-[#25282B] font-semibold text-sm mb-1'>요청사항</p>
            <div className='max-h-[160px] overflow-y-auto text-sm text-[#121218] font-light leading-6'>
              {requestMessage
                .split('\n')
                .map((line, index) =>
                  line.trim() === '' ? (
                    <div key={index} className='my-2' />
                  ) : (
                    <p key={index}>{line}</p>
                  ),
                )}
            </div>
          </div>
          <div className='flex items-center justify-center text-[#1D68FF] font-semibold'>
            <button type='button' onClick={() => setIsModalOpen(true)}>건강데이터 자세히 보기</button>
          </div>
          <div className='flex justify-between pt-4 border-t border-[#DBE6FF]'>
            <button
              onClick={onReject}
              className='w-[45%] h-[38px] rounded-full text-sm font-medium text-[#25282B] bg-white border border-[#E3E6EB] shadow-sm cursor-pointer'
            >
              거절하기
            </button>
            <button
              onClick={onAccept}
              className='w-[45%] h-[38px] rounded-full text-sm font-medium text-white cursor-pointer'
              style={{ backgroundColor: '#1D68FF' }}
            >
              수락하기
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
          <HealthDataModal
          nickname={nickname}
          requestNote={(userInfoQuery.data?.requestNote) || requestMessage}
          profile={{
            age: userInfoQuery.data?.age ?? (typeof age === 'number' ? age : 0),
            gender: toKoreanGender(userInfoQuery.data?.gender ?? gender),
            height: userInfoQuery.data?.height ?? height,
            weight: userInfoQuery.data?.weight ?? weight,
            testDate: userInfoQuery.data?.reportRegisterDate ?? null,
            interests: userInfoQuery.data?.healthInterests ?? [],
            goal: userInfoQuery.data?.goal ?? null,
            abnormal: userInfoQuery.data?.abnormalCheckItems ?? [],
          }}
          onClose={() => setIsModalOpen(false)}
          onAccept={() => {
            onAccept?.();
            setIsModalOpen(false);
          }}
          onReject={() => {
            onReject?.();
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default RequestHealthCareCard;
