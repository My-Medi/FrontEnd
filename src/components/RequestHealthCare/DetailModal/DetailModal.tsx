import React from 'react';
import {
  RequestMessageSkeletonLg,
  ProfileRowSkeletonLg,
  GoalSkeletonLg,
  AbnormalSkeletonLg,
  SummarySkeletonLg,
  RequestMessageSkeletonSm,
  ProfileRowSkeletonSm,
  GoalSkeletonSm,
  AbnormalSkeletonSm,
  SummarySkeletonSm,
} from './Skeletons';
import BackIcon from '/src/assets/back.svg';
import RequestHealthGoal from './HealthGoal';
import RequestMessage from './RequestMessage';
import PatientInfo from './PatientInfo';
import AbnormalPart from './AbnormalPart';
import ReportSummary from './ReportSummary';

interface DetailModalProps {
  nickname: string;
  requestNote?: string;
  profile?: {
    profileImageUrl?: string;
    age: number | string;
    gender: string;
    height: number;
    weight: number;
    testDate?: string | null;
    interests?: string[];
    abnormal?: string[];
    goal?: string | null;
  };
  summary?: any;
  isLoading?: boolean;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
}

// 리포트 요약 더미 데이터 제거 (빈 상태는 ReportSummary에서 처리)

const HealthDataModal: React.FC<DetailModalProps> = ({
  nickname,
  requestNote,
  profile,
  summary,
  onClose,
  onAccept,
  onReject,
  isLoading = false,
}) => {
  return (
    <>
      <div className='fixed inset-0 bg-black/30 z-40' />
      <div className='absolute left-1/2 -translate-x-1/2 z-50 top-[20px]'>
        <div className='hidden lg:flex flex-col items-center gap-6 relative w-[984px] pt-[50px] pl-[50px] pr-[50px] pb-[50px] rounded-[40px] bg-white shadow-md'>
          {/* 상단 헤더 */}
          <div className='flex items-center gap-6  self-start'>
            {/* 뒤로가기 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className='cursor-pointer shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity'
            >
              <img
                src={BackIcon}
                alt='뒤로가기'
                className='w-[17px] h-[35px] pointer-events-none'
              />
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
          <div>{isLoading ? <RequestMessageSkeletonLg /> : <RequestMessage message={requestNote || ''} />}</div>
          <div>
            {isLoading ? (
              <ProfileRowSkeletonLg />
            ) : (
              <PatientInfo
                nickname={nickname}
                profileImageUrl={profile?.profileImageUrl}
                gender={profile?.gender || '-'}
                age={typeof profile?.age === 'number' ? profile!.age : 0}
                height={profile?.height || 0}
                weight={profile?.weight || 0}
                testDate={profile?.testDate || '-'}
                healthInterest={(profile?.interests || []).join(', ')}
              />
            )}
          </div>
          <div className='flex flex-col gap-[32px] w-max-[496px]'>
            {/* 관리 목표/기대 - goal 매핑 */}
            {isLoading ? <GoalSkeletonLg /> : <RequestHealthGoal goal={profile?.goal || ''} />}
            {/* 최근 건강검진 이상수치 항목 */}
            {isLoading ? <AbnormalSkeletonLg /> : <AbnormalPart abnormal={profile?.abnormal || []} />}
            {/* 리포트 요약 (값 없으면 내부 안내 표시) */}
            {isLoading ? <SummarySkeletonLg /> : <ReportSummary nickname={nickname} summary={summary} />}
          </div>
          {/* 하단 버튼 */}
          <div className='flex flex-col items-center border-[#DBE6FF] pt-8 w-[300px] h-[56px] gap-4 mt-4 mb-[50px]'>
            <div className='flex gap-[96px]'>
              {/* 거절하기 버튼 */}
              <button
                onClick={() => {
                  onReject();
                  onClose(); // 모달 닫기
                }}
                className='flex justify-center items-center gap-[6px] w-[300px] h-[56px] rounded-full text-[#25282B] text-[20px] font-medium font-[Pretendard] border border-[#E3E6EB] leading-[36px] tracking-[-0.6px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
              >
                거절하기
              </button>

              {/* 수락하기 버튼 */}
              <button
                onClick={() => {
                  onAccept();
                  onClose(); // 모달 닫기
                }}
                className='flex justify-center items-center gap-[6px] w-[300px] h-[56px] rounded-full text-white text-[20px] font-medium font-[Pretendard] leading-[36px] tracking-[-0.6px] bg-[#1D68FF] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.08)] cursor-pointer'
              >
                수락하기
              </button>
            </div>
          </div>
        </div>
        {/* 모바일 전용 모달 */}
        <div className='lg:hidden flex flex-col w-[90vw] max-w-[500px] px-4 py-6 bg-white rounded-[20px] mx-auto shadow-md'>
          {/* 상단 헤더 */}
          <div className='flex items-center gap-4 mb-4'>
            <button onClick={onClose}>
              <img src={BackIcon} alt='뒤로가기' className='w-[14px] cursor-pointer h-[28px]' />
            </button>
            <div>
              <p className='text-[#4D5053] text-[12px] leading-[18px] tracking-[-0.3px] font-medium'>
                건강 데이터 상세
              </p>
              <p className='text-[#121218] text-[18px] font-semibold leading-[28px] tracking-[-0.5px]'>
                {nickname} 회원님의 건강관리 요청서
              </p>
            </div>
          </div>

          {/* 본문 영역 (모바일) */}
          <div className='flex flex-col gap-4'>
            {isLoading ? <RequestMessageSkeletonSm /> : <RequestMessage message={requestNote || ''} />}
            {isLoading ? (
              <ProfileRowSkeletonSm />
            ) : (
              <PatientInfo
                nickname={nickname}
                profileImageUrl={profile?.profileImageUrl}
                gender={profile?.gender || '-'}
                age={typeof profile?.age === 'number' ? profile!.age : 0}
                height={profile?.height || 0}
                weight={profile?.weight || 0}
                testDate={profile?.testDate || '-'}
                healthInterest={(profile?.interests || []).join(', ')}
              />
            )}
            {isLoading ? <GoalSkeletonSm /> : <RequestHealthGoal goal={profile?.goal || ''} />}
            {isLoading ? <AbnormalSkeletonSm /> : <AbnormalPart abnormal={profile?.abnormal || []} />}
            {/* 리포트 요약 (모바일) */}
            {isLoading ? <SummarySkeletonSm /> : <ReportSummary nickname={nickname} summary={summary} />}
          </div>

          {/* 하단 버튼 */}
          <div className='flex flex-col items-center mt-10 gap-2'>
            <button
              onClick={() => {
                onReject();
                onClose();
              }}
              className='w-full h-[48px] cursor-pointer rounded-full text-[#25282B] text-[16px] font-medium border border-[#E3E6EB] shadow-sm'
            >
              거절하기
            </button>
            <button
              onClick={() => {
                onAccept();
                onClose();
              }}
              className='w-full h-[48px] cursor-pointer rounded-full text-white text-[16px] font-medium bg-[#1D68FF] shadow-md'
            >
              수락하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthDataModal;
