import React, { useState } from 'react';
import { useEffect } from 'react';
import unionSvg from '../../../assets/Expert/Union.svg';
import backSvg from '../../../assets/Expert/back.svg';
import RequestModal from './RequestModal';
import ReRequestConfirmModal from './ReRequestConfirmModal';

interface ExpertDetailModalProps {
  expert: {
    name: string;
    position: string;
    realName: string;
    profileImage?: string;
    slogan: string;
    introduction: string;
    affiliation: string;
    specialty: string;
    career: string;
  };
  expertStatus?: 'matched' | 'request' | 'rejected';
  onClose: () => void;
}

const ExpertDetailModal: React.FC<ExpertDetailModalProps> = ({ expert, expertStatus, onClose }) => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReRequestModal, setShowReRequestModal] = useState(false);

  // 모달 오픈 시 body 스크롤 방지
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleRequestClick = () => {
    if (expertStatus === 'request') {
      // 요청 상태일 때는 재요청 확인 모달 먼저 표시
      setShowReRequestModal(true);
    } else {
      // 거절 상태일 때는 바로 요청 모달 표시
      setShowRequestModal(true);
    }
  };

  const handleReRequestConfirm = () => {
    setShowReRequestModal(false);
    onClose(); // 모든 모달 종료
  };

  // const handleRequestSubmit = (request: string) => {
  //   console.log('요청사항:', request);
  //   // 여기에 실제 요청사항 제출 로직을 추가할 수 있습니다
  //   // 예: API 호출, 상태 업데이트 등

  //   // 성공 처리 후 모달들 닫기
  //   setShowRequestModal(false);
  //   onClose();
  // };

  const handleRequestClose = () => {
    console.log('ExpertDetailModal handleRequestClose 호출됨');
    setShowRequestModal(false);
    onClose(); // ExpertDetailModal도 함께 닫기
  };

  return (
    <>
      {/* ExpertDetailModal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          showRequestModal || showReRequestModal ? 'opacity-0 pointer-events-none' : 'opacity-100'
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
              className='w-5 h-9 flex rounded-full transition'
              onClick={onClose}
              aria-label='닫기'
            >
              <img src={backSvg} alt='닫기' className='w-full h-full object-contain' />
            </button>
            <div className='flex-1 flex flex-col items-center'>
              <div className='text-[#4D5053] text-sm font-medium leading-[1.71] mb-1'>
                전문가 상세
              </div>
              <div className='text-[#121218] text-2xl font-semibold leading-[1.5]'>
                {expert.name} / {expert.position}
              </div>
            </div>
            <div className='w-9 h-9' />
          </div>
          <div className='w-full flex flex-col items-center px-6 pb-0 flex-1 overflow-y-auto min-h-0'>
            {/* 프로필 */}
            <div className='flex justify-center mb-6'>
              <div className='w-[203px] h-[203px] rounded-full border-[6px] border-[#1D68FF] flex items-center justify-center bg-[#EDF0F3] overflow-hidden shadow-lg'>
                {expert.profileImage && expert.profileImage.trim() !== '' ? (
                  <img
                    src={expert.profileImage}
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
                  {expert.slogan}
                </div>
              </div>
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
                    {expert.affiliation}
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-6'>
                    <div className='w-5 h-5 bg-[#1D68FF] rounded-md' />
                    <div className='text-xl font-medium text-[#121218]'>전문분야</div>
                  </div>
                  <div className='text-base text-[#121218] whitespace-pre-line leading-[1.375] pl-11 font-normal'>
                    {expert.specialty}
                  </div>
                </div>
              </div>
              {/* 경력사항 */}
              <div className='w-full flex flex-col mb-6'>
                <div className='flex items-center gap-6'>
                  <div className='w-5 h-5 bg-[#1D68FF] rounded-md' />
                  <div className='text-xl font-medium text-[#121218]'>경력사항</div>
                </div>
                <div className='text-base text-[#121218] whitespace-pre-line leading-[1.375] pl-11 font-normal'>
                  {expert.career}
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
                 className='w-[300px] h-14 rounded-full border border-[#FFFFFF] text-[#25282B] hover:bg-[#EDF0F3] text-xl font-medium transition cursor-pointer'
                 style={{
                   boxShadow:
                     '0px 0px 2px 4px rgba(29, 104, 255, 0.03), 0px 0px 4px 12px rgba(29, 104, 255, 0.02), 0px 0px 6px 8px rgba(29, 104, 255, 0.01), 0px 0px 8px 0px rgba(29, 104, 255, 0)',
                 }}
               >
                 목록으로
               </button>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className='w-[300px] h-14 rounded-full border border-[#FFFFFF] text-[#25282B] hover:bg-[#EDF0F3] text-xl font-medium transition cursor-pointer'
                  style={{
                    boxShadow:
                      '0px 0px 2px 4px rgba(29, 104, 255, 0.03), 0px 0px 4px 12px rgba(29, 104, 255, 0.02), 0px 0px 6px 8px rgba(29, 104, 255, 0.01), 0px 0px 8px 0px rgba(29, 104, 255, 0)',
                  }}
                >
                  목록으로
                </button>
                <button
                  onClick={handleRequestClick}
                  className='w-[300px] h-14 rounded-full bg-[#1D68FF] text-white text-xl font-semibold transition cursor-pointer'
                  style={{
                    boxShadow:
                      '0px 0px 2px 6px rgba(29, 104, 255, 0.06), 0px 0px 4px 6px rgba(29, 104, 255, 0.04), 0px 0px 6px 6px rgba(29, 104, 255, 0.02), 0px 0px 8px 0px rgba(29, 104, 255, 0)',
                  }}
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
          onClose={() => setShowReRequestModal(false)}
          onConfirm={handleReRequestConfirm}
          expertName={expert.name}
          expertPosition={expert.position}
          expertRealName={expert.realName}
        />
      )}

      {/* 요청사항 작성 모달 */}
      {showRequestModal && (
        <RequestModal
          isOpen={showRequestModal}
          onClose={handleRequestClose}
          expertName={expert.name}
          expertPosition={expert.position}
          expertRealName={expert.realName}
        />
      )}
    </>
  );
};

export default ExpertDetailModal;
