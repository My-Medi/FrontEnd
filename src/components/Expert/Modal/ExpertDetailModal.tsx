import React, { useState } from 'react';
import unionSvg from '../../../assets/Expert/Union.svg';
import backSvg from '../../../assets/Expert/back.svg';
import RequestModal from './RequestModal';
import ExpertDetailSkeleton from './ExpertDetailSkeleton';
import ReRequestConfirmModal from './ReRequestConfirmModal';
import useModalScrollLock from '../../../hooks/useModalScrollLock';
import { useRequestConsultationMutation } from '../../../hooks/experts/mutations/useRequestConsultationMutation';
import SuccessModal from './SuccessModal';
import { useExpertDetailQuery } from '../../../hooks/experts/queries/useExpertDetailQuery';
import { getSpecialtyKoreanName } from '../../../types/expert/common';
import { formatPhoneNumber } from '../../../utils/phoneUtils';

interface ExpertDetailModalProps {
  expertId: number;
  expertStatus?: 'matched' | 'request' | 'rejected';
  requestDate?: string;
  matchedAt?: string;
  onClose: () => void;
}

const ExpertDetailModal: React.FC<ExpertDetailModalProps> = ({ expertId, expertStatus, requestDate, matchedAt, onClose }) => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReRequestModal, setShowReRequestModal] = useState(false);
  const [showDetailSuccess, setShowDetailSuccess] = useState(false);

  // 전문가 상세 정보 조회
  const { data: expert, isLoading, error } = useExpertDetailQuery(expertId, expertStatus);

  useModalScrollLock(!showRequestModal && !showReRequestModal && !showDetailSuccess);

  // 요청 날짜 포맷팅 함수
  const formatRequestDate = (dateString: string) => {
    if (!dateString) return '';
    // 우선 ISO (YYYY-MM-DD) 수동 파싱 (Safari 호환)
    const isoMatch = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (isoMatch) {
      const year = Number(isoMatch[1]);
      const month = Number(isoMatch[2]);
      const day = Number(isoMatch[3]);
      if (Number.isFinite(year) && Number.isFinite(month) && Number.isFinite(day)) {
        return `${year}. ${month}. ${day}.`;
      }
    }
    // Date 파싱으로 폴백
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}. ${month}. ${day}.`;
    }
    // 최종 폴백: 원본 문자열 반환
    return dateString;
  };

  const handleRequestClick = () => {
    if (expertStatus === 'request') {
      // 요청 상태일 때는 재요청 확인 모달 먼저 표시
      setShowReRequestModal(true);
    } else {
      // 거절 상태일 때는 바로 요청 모달 표시
      setShowRequestModal(true);
    }
  };

  const requestMutation = useRequestConsultationMutation();
  const handleReRequestConfirm = () => {
    // 재요청 확인 후, 즉시 API 호출하여 성공 모달 표시
    setShowReRequestModal(false);
    requestMutation.mutate(
      { expertId, comment: '' },
      {
        onSuccess: () => {
          setShowDetailSuccess(true);
        },
        // 실패 시에는 폴백 없이 그대로 유지
      }
    );
  };

  const getKoreanOrdinalWord = (n: number): string => {
    const mapping: Record<number, string> = {
      1: '첫',
      2: '두',
      3: '세',
      4: '넷',
      5: '다섯',
      6: '여섯',
    };
    return mapping[n] || String(n);
  };

  // 경력 기간 계산 유틸 (YYYY-MM-DD 기준)
  const parseIsoDate = (d?: string) => {
    if (!d) return null;
    const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return null;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  };

  const diffMonths = (start?: string, end?: string): number | null => {
    const s = parseIsoDate(start);
    const e = parseIsoDate(end);
    if (!s || !e) return null;
    return (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  };

  const formatDuration = (months: number | null): string => {
    if (months === null) return '';
    const safe = Math.max(months, 0);
    if (safe < 12) return `${Math.max(safe, 1)}개월`;
    const years = Math.floor(safe / 12);
    const remain = safe % 12;
    return remain > 0 ? `${years}년 ${remain}개월` : `${years}년`;
  };




  // 로딩 상태: 스켈레톤 UI 표시
  if (isLoading) {
    return <ExpertDetailSkeleton onClose={onClose} />;
  }

  // 에러 상태
  if (error || !expert) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121218]/40">
        <div className="bg-white rounded-[40px] p-8">
          <div className="text-lg text-red-600">전문가 정보를 불러오는데 실패했습니다.</div>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ExpertDetailModal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          showRequestModal || showReRequestModal ? 'hidden' : 'opacity-100'
        }`}
      >
        {/* 모달 배경 */}
        <div className='absolute inset-0 bg-[#121218]/40' onClick={onClose} />
        <div
          className='relative bg-white/96 rounded-[40px] w-[744px] min-h-[500px] max-h-[90vh] flex flex-col overflow-hidden'
          onClick={(e) => e.stopPropagation()}
          style={{
            opacity: 1,
            boxShadow:
              '0px 2px 20px rgba(144, 181, 255, 0.5), inset 0px -4px 6px rgba(255, 255, 255, 0.25), inset 0px 4px 8px #FFFFFF',
          }}
        >
          {/* 상단: 닫기버튼 + 타이틀/이름/직함 한 줄 배치 */}
          <div className='w-full flex flex-row items-center pl-[46px] pr-6 pt-10 pb-6 flex-shrink-0'>
            <button
              className='w-5 h-9 flex rounded-full transition hover:opacity-80'
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label='닫기'
            >
              <img src={backSvg} alt='닫기' className='w-full h-full object-contain pointer-events-none' />
            </button>
            <div className='flex-1 flex flex-col items-center'>
              {/* 매칭된 전문가일 때는 날짜 표시, 요청중인 경우는 첫번째 요청 표시, 그 외에는 전문가 상세 표시 */}
              {expertStatus === 'matched' ? (
                <div className='text-[14px] font-medium text-[#9DA0A3] leading-[24px] tracking-[-3%] text-center mb-1'>
                  {(matchedAt || expert?.matchedAt) ? `${formatRequestDate(String(matchedAt || expert.matchedAt))}` : ''} 부터 함께하고 있어요!
                </div>
              ) : expertStatus === 'request' ? (
                <div className='text-[14px] font-medium text-[#1D68FF] leading-[24px] tracking-[-3%] text-center mb-1 font-[Pretendard]'>
                  {typeof expert.requestCount === 'number' && expert.requestCount > 0 ? ` ${getKoreanOrdinalWord(expert.requestCount)}번째 요청` : ''}
                </div>
              ) : (
                <div className='text-[#4D5053] text-sm font-medium leading-[1.71] mb-1'>
                  전문가 상세
                </div>
              )}
              <div className='text-[#121218] text-2xl font-semibold leading-[1.5]'>
                {expert.nickname || expert.name} / {expert.name} {getSpecialtyKoreanName(expert.specialty)}
              </div>
            </div>
            <div className='w-9 h-9' />
          </div>
          <div className='w-full flex flex-col items-center px-6 pb-0 flex-1 overflow-y-auto min-h-0'>
            {/* 프로필 */}
            <div className='flex justify-center mb-6'>
              <div className='w-[203px] h-[203px] rounded-full border-[6px] border-[#1D68FF] flex items-center justify-center bg-[#EDF0F3] overflow-hidden shadow-lg'>
                {expert.profileImgUrl && expert.profileImgUrl.trim() !== '' ? (
                  <img
                    src={expert.profileImgUrl}
                    alt={expert.name}
                    className='w-[190px] h-[190px] rounded-full object-cover'
                  />
                ) : (
                  <img src={unionSvg} alt='기본 프로필' className='w-24 h-24' />
                )}
              </div>
            </div>
            <div className='w-full flex flex-col px-6'>
              {/* 슬로건 */}
              <div className='w-full flex mb-6'>
                <div className='text-center text-xl font-medium text-[#121218] leading-[1.19]'>
                  {expert.introSentence}
                </div>
              </div>
              {/* 전화번호 - 매칭된 전문가일 때만 표시 */}
              {expertStatus === 'matched' && expert.phoneNumber && (
                <div className='w-full flex mb-6'>
                  <div className='text-center text-[20px] font-medium text-[#121218] leading-[100%] tracking-[-3%]'>
                    {formatPhoneNumber(expert.phoneNumber)}
                  </div>
                </div>
              )}
              {/* 요청중인 경우 요청서 전송 문구 표시 */}
              {expertStatus === 'request' && requestDate && (
                <div className='w-full flex mb-6'>
                  <div className='text-center text-[20px] font-medium text-[#9DA0A3] leading-[100%] tracking-[-3%] font-[Pretendard]'>
                    {formatRequestDate(requestDate)} 건강관리요청서 전송
                  </div>
                </div>
              )}
              {/* 전문가 소개 */}
              <div className='w-full flex flex-col mb-6'>
                <div className='flex items-center gap-6'>
                  <div className='w-5 h-5 bg-[#1D68FF] rounded-md' />
                  <div className='text-xl font-medium text-[#121218]'>전문가 소개</div>
                </div>
                <div className='text-base text-[#121218] whitespace-pre-line leading-[1.375] pl-11 font-normal'>
                  {expert.introduction}
                </div>
              </div>
              {/* 소속/전문분야 */}
              <div className='w-full flex flex-row gap-16 mb-6'>
                <div className='flex-1 flex flex-col'>
                  <div className='flex items-center gap-6'>
                    <div className='w-5 h-5 bg-[#1D68FF] rounded-md' />
                    <div className='text-xl font-medium text-[#121218]'>소속</div>
                  </div>
                  <div className='text-base text-[#121218] whitespace-pre-line leading-[1.375] pl-11 font-normal'>
                    {expert.organizationName}
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-6'>
                    <div className='w-5 h-5 bg-[#1D68FF] rounded-md' />
                    <div className='text-xl font-medium text-[#121218]'>전문분야</div>
                  </div>
                  <div className='text-base text-[#121218] whitespace-pre-line leading-[1.375] pl-11 font-normal'>
                    {getSpecialtyKoreanName(expert.specialty)}
                  </div>
                </div>
              </div>
              {/* 경력사항 */}
              <div className='w-full flex flex-col mb-6'>
                <div className='flex items-center gap-6'>
                  <div className='w-5 h-5 bg-[#1D68FF] rounded-md' />
                  <div className='text-xl font-medium text-[#121218]'>경력사항</div>
                </div>
                <div className='text-base text-[#121218] leading-[1.7] pl-11 font-normal'>
                  {expert.careers && expert.careers.length > 0 ? (
                    expert.careers.map((career) => (
                      <div key={career.careerId} className='mb-3'>
                        {(() => {
                          const months = diffMonths(career.startDate, career.endDate);
                          const duration = formatDuration(months);
                          const tail = duration ? ` ${duration}` : '';
                          return <div className='font-medium'>- {career.companyName}{tail}</div>;
                        })()}
                      </div>
                    ))
                  ) : (
                    '경력사항 정보가 없습니다.'
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* 하단 버튼 */}
          <div className='w-full flex flex-row justify-center gap-12 px-6 pb-12 flex-shrink-0'>
            {/* 연결된 전문가일 때는 목록으로 버튼만 */}
            {expertStatus === 'matched' ? (
                 <button
                 onClick={onClose}
                 className='w-[300px] h-14 rounded-full border border-[#FFFFFF] text-[#25282B] hover:bg-[#EDF0F3] text-xl font-medium transition cursor-pointer bg-white shadow-[0px_0px_1px_2px_rgba(29,104,255,0.015),0px_0px_2px_6px_rgba(29,104,255,0.01),0px_0px_3px_4px_rgba(29,104,255,0.005),0px_0px_4px_0px_rgba(29,104,255,0)]'
               >
                 목록으로
               </button>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className='w-[300px] h-14 rounded-full border border-[#FFFFFF] text-[#25282B] hover:bg-[#EDF0F3] text-xl font-medium transition cursor-pointer bg-white shadow-[0px_0px_1px_2px_rgba(29,104,255,0.015),0px_0px_2px_6px_rgba(29,104,255,0.01),0px_0px_3px_4px_rgba(29,104,255,0.005),0px_0px_4px_0px_rgba(29,104,255,0)]'
                >
                  목록으로
                </button>
                <button
                  onClick={handleRequestClick}
                  className='w-[300px] h-14 rounded-full bg-[#1D68FF] text-white text-xl font-semibold transition cursor-pointer shadow-[0px_0px_1px_3px_rgba(29,104,255,0.03),0px_0px_2px_3px_rgba(29,104,255,0.02),0px_0px_3px_3px_rgba(29,104,255,0.01),0px_0px_4px_0px_rgba(29,104,255,0)]'
                >
                  {expertStatus === 'request' ? '다시 요청서 보내기' : '건강관리요청서 보내기'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

            {/* 재요청 확인 모달 */}
      {showReRequestModal && (
        <ReRequestConfirmModal
          isOpen={showReRequestModal}
          onClose={() => {
            setShowReRequestModal(false);
            onClose(); // 모든 모달 닫기 (ExpertDetailModal도 함께 닫기)
          }}
          onConfirm={handleReRequestConfirm}
          expertName={expert.name}
          expertPosition={getSpecialtyKoreanName(expert.specialty)}
          expertRealName={expert.nickname || expert.name}
        />
      )}

      {/* 요청사항 작성 모달 */}
      {showRequestModal && (
        <RequestModal
          isOpen={showRequestModal}
          onClose={() => {
            // 요청 플로우 종료 시(성공 모달 확인 포함) 모든 모달 닫기
            setShowRequestModal(false);
            onClose();
          }}
          onBack={() => {
            setShowRequestModal(false);
            // RequestModal만 닫고 ExpertDetailModal은 유지
          }}
          expertId={expert.expertId}
          expertName={expert.name}
          expertPosition={getSpecialtyKoreanName(expert.specialty)}
          expertRealName={expert.nickname || expert.name}
        />
      )}

      {/* 디테일 내 성공 모달 (재요청-즉시 전송 케이스) */}
      <SuccessModal
        isOpen={showDetailSuccess}
        onClose={() => {
          setShowDetailSuccess(false);
          onClose();
        }}
      />
    </>
  );
};

export default ExpertDetailModal;
