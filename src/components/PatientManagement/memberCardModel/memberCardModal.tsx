import React, { useMemo, useState } from 'react';
import SkeletonBlock from '../../Common/SkeletonBlock';
import BackIcon from '/src/assets/back.svg';
import PatientInfo from '../../RequestHealthCare/DetailModal/PatientInfo';
import RequestHealthGoal from '../../RequestHealthCare/DetailModal/HealthGoal';
import AbnormalPart from '../../RequestHealthCare/DetailModal/AbnormalPart';
import ReportSummary from '../../RequestHealthCare/DetailModal/ReportSummary';
import MemberReauestMessage from './memberRequestMessage';
import AdvicePart from './advicePart';
import AdviceRegisterModal from './adviceRegisterModel';
import ConsultReservationModal from '../consultReservationModal/CalendarModal';
import { useExpertUserInfo } from '../../../hooks/consultation/expert/queries/useExpertUserInfo';
import { useExpertReportSummary } from '../../../hooks/consultation/expert/queries/useExpertReportSummary';
import { useExpertUserLatestHealthStatusQuery } from '../../../hooks/expert/report/useExpertUserLatestHealthStatusQuery';
import { mapApiResultToHealthStatus } from '../../../utils/mappers/healthStatusMapper';
import { useNavigate } from 'react-router-dom';

interface Member {
  userId: number;
  nickname: string;
  age: string;
  gender: string;
  height: number;
  weight: number;
  testDate: string;
  healthInterest: string[];
  healthStatus: '위험' | '주의' | '관심' | '안심' | '정상';
  signupDate?: string;
}

interface MemberCardModalProps {
  member: Member;
  onClose: () => void;
  openAdviceRegister: () => void;
  openConsultReservation: () => void;
}

// 리포트 요약은 별도의 API가 없으므로, 값 미제공 시 빈 상태 안내 처리됨

const MemberCardModal: React.FC<MemberCardModalProps> = ({
  member,
  onClose,
  openAdviceRegister,
  openConsultReservation,
}) => {
  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const navigate = useNavigate();
  const { data: info, isLoading: isInfoLoading } = useExpertUserInfo(member.userId, 'ACCEPTED');
  const { data: summary, isLoading: isSummaryLoading } = useExpertReportSummary(member.userId);
  const { data: latestHealthStatus, isLoading: healthStatusLoading } = useExpertUserLatestHealthStatusQuery();
  
  // API 데이터가 있으면 사용, 없으면 기본값 사용
  const healthStatus = latestHealthStatus?.healthStatus 
    ? mapApiResultToHealthStatus(latestHealthStatus.healthStatus as any)
    : member.healthStatus;
  
  // 요약 API의 round 값을 사용해 바로 이동할 회차를 결정
  const selectedRound = useMemo(() => summary?.round ?? 1, [summary?.round]);

  const toKoreanGender = (g?: string) => {
    const norm = (g ?? '').toUpperCase();
    if (norm === 'MALE' || norm === 'MAEL') return '남성';
    if (norm === 'FEMALE' || norm === 'FAMALE') return '여성';
    return g ?? '-';
  };

  const ageDisplay = useMemo(() => {
    const a = info?.age ?? member.age;
    return typeof a === 'number' ? a : parseInt(a as any, 10) || 0;
  }, [info?.age, member.age]);
  const handleClick = () => {
    if (!summary) return;
    navigate(
      `/expert-report?userId=${member.userId}&round=${selectedRound || 1}&nickname=${encodeURIComponent(info?.nickname ?? member.nickname)}`,
    );
  };
  const isLoading = isInfoLoading || isSummaryLoading || healthStatusLoading;

  return (
    <>
      {!showAdviceModal && !showConsultModal && (
        <>
          <div className='fixed inset-0 bg-black/30 z-40' />
          <div className='absolute left-1/2 -translate-x-1/2 z-50 top-[20px]'>
            <div className='hidden lg:flex flex-col items-center gap-6 relative w-[984px] pt-[50px] pl-[50px] pr-[80px] pb-[50px] rounded-[40px] bg-white shadow-md'>
              {/* 상단 헤더 */}
              <div className='flex items-center gap-6 w-full justify-center'>
                {/* 뒤로가기 버튼 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  }}
                  className='cursor-pointer shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity z-10'
                  style={{ position: 'relative', zIndex: 10 }}
                >
                  <img
                    src={BackIcon}
                    alt='뒤로가기'
                    className='w-[17px] h-[35px] pointer-events-none'
                  />
                </button>

                {/* 텍스트 블럭 */}
                <div className='flex flex-col w-[837px] items-center justify-between h-[60px]'>
                  <p className='text-[#75787B] text-[16px] font-semibold font-[Pretendard] leading-[22px] tracking-[-0.48px]'>
                    {info?.accountRegisterDate ?? member.signupDate ?? '-'} 부터 함께하고 있는
                    회원이에요!
                  </p>
                  <p className='text-[#121218] text-[24px] font-semibold font-[Pretendard] leading-[36px] tracking-[-0.72px]'>
                    {info?.nickname ?? member.nickname} 회원님의 건강데이터
                  </p>
                </div>
              </div>
              <div>
                {isLoading ? (
                  <div className='hidden lg:flex flex items-center w-[824px] h-[154px] px-[56px] gap-[40px] rounded-[20px] border border-[#DBE6FF] bg-white'>
                    <div className='w-[124px] h-[124px] rounded-full bg-gray-200 animate-pulse' />
                    <div className='flex-1 flex flex-col gap-2'>
                      <SkeletonBlock className='w-40 h-6' />
                      <SkeletonBlock className='w-80 h-4' />
                      <SkeletonBlock className='w-72 h-4' />
                      <SkeletonBlock className='w-64 h-4' />
                    </div>
                  </div>
                ) : (
                  <PatientInfo
                    profileImageUrl={info?.profileImg}
                    nickname={info?.nickname ?? member.nickname}
                    gender={toKoreanGender(info?.gender ?? member.gender)}
                    age={ageDisplay}
                    height={info?.height ?? member.height}
                    weight={info?.weight ?? member.weight}
                    testDate={info?.reportRegisterDate ?? member.testDate}
                    healthInterest={(info?.healthInterests ?? member.healthInterest).join(', ')}
                  />
                )}
              </div>
              <div className='flex flex-col gap-[34px] w-max-[496px] whitespace-pre-line'>
                {/* 여기에 한줄 조언 등록 버튼이랑 상담예약일 지정 버튼 */}
                <div className='flex flex-col ml-[90px] justify-center items-center border-[#DBE6FF] w-[645px] h-[56px]'>
                  <div className='flex gap-[96px]'>
                    {/* 한줄 조언 등록 버튼 */}
                    <button
                      onClick={openAdviceRegister}
                      className='flex justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#FFF] border border-[#E3E6EB] text-[#25282B] text-[18px] font-semibold font-[Pretendard] leading-[27px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
                    >
                      한줄 조언 등록
                    </button>

                    {/* 상담예약일 지정 버튼 */}
                    <button
                      onClick={openConsultReservation}
                      className='flex justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#1D68FF] border border-[#E3E6EB] text-[#FFF] text-[18px] font-semibold font-[Pretendard] leading-[27px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
                    >
                      상담예약일 지정
                    </button>
                  </div>
                </div>
                {isLoading ? (
                  <>
                    <SkeletonBlock className='w-[400px] h-6' />
                    <SkeletonBlock className='w-[600px] h-24' />
                  </>
                ) : (
                  <>
                    <RequestHealthGoal goal={info?.goal ?? ''} />
                    <MemberReauestMessage message={info?.requestNote ?? ''} />
                  </>
                )}
                {/* 여기가 등록한 한줄 조언 */}
                {isLoading ? (
                  <>
                    <SkeletonBlock className='w-[600px] h-10' />
                    <SkeletonBlock className='w-[600px] h-20' />
                    <SkeletonBlock className='w-[600px] h-32' />
                  </>
                ) : (
                  <>
                    <AdvicePart userId={member.userId} />
                    <AbnormalPart abnormal={info?.abnormalCheckItems ?? []} />
                    <ReportSummary 
                      nickname={info?.nickname ?? member.nickname} 
                      healthStatus={healthStatus}
                      summary={summary} 
                    />
                  </>
                )}
              </div>
              {/* 하단 버튼 */}
              <div className='flex flex-col ml-[12px] items-center border-[#DBE6FF] w-[300px] h-[56px] gap-4 '>
                <div className='flex gap-[96px]'>
                  {/* 페이지 이동 버튼 */}
                  <button
                    onClick={handleClick}
                    disabled={!summary}
                    className='flex justify-center items-center gap-[10px] w-[280px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#FFF] border border-[#E3E6EB] text-[#25282B] text-[18px] font-medium font-[Pretendard] leading-[36px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    리포트 전체 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* AdviceRegisterModal 열기 */}

      {showAdviceModal && (
        <AdviceRegisterModal userId={member.userId} onClose={() => setShowAdviceModal(false)} />
      )}
      {showConsultModal && <ConsultReservationModal onClose={() => setShowConsultModal(false)} />}
    </>
  );
};
export default MemberCardModal;
