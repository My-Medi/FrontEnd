import React, { useState } from 'react';
import unionSvg from '../../../assets/Expert/Union.svg';
import backSvg from '../../../assets/Expert/back.svg';
import RequestModal from './RequestModal';
import ReRequestConfirmModal from './ReRequestConfirmModal';
import useModalScrollLock from '../../../hooks/useModalScrollLock';

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

  useModalScrollLock(!showRequestModal && !showReRequestModal);

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
          expertPosition={expert.position}
          expertRealName={expert.realName}
        />
      )}

      {/* 요청사항 작성 모달 */}
      {showRequestModal && (
        <RequestModal
          isOpen={showRequestModal}
          onClose={() => {
            setShowRequestModal(false);
            onClose(); // 모든 모달 닫기 (ExpertDetailModal도 함께 닫기)
          }}
          onBack={() => {
            setShowRequestModal(false);
            // RequestModal만 닫고 ExpertDetailModal은 유지
          }}
          expertName={expert.name}
          expertPosition={expert.position}
          expertRealName={expert.realName}
        />
      )}
    </>
  );
};

export default ExpertDetailModal;
