import React, { useState, useEffect } from 'react';
import backSvg from '../../../assets/Expert/back.svg';
import closeSvg from '../../../assets/Expert/close.svg';
import SuccessModal from './SuccessModal';
import RequestLimitModal from './RequestLimitModal';
import useModalScrollLock from '../../../hooks/useModalScrollLock';
import { useRequestConsultationMutation, getRequestCount } from '../../../hooks/experts/mutations/useRequestConsultationMutation';

interface ConfirmRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  onConfirm: () => void;
  expertId: number;
  expertName: string;
  expertPosition: string;
  expertRealName: string;
  comment: string;
}

const ConfirmRequestModal: React.FC<ConfirmRequestModalProps> = ({
  isOpen, 
  onClose, 
  onBack,
  expertId,
  expertName, 
  expertPosition,
  // expertRealName,
  comment
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  
  // 상담 요청 mutation
  // 모달이 떠있는 동안에는 쿼리 무효화 지연
  const requestConsultationMutation = useRequestConsultationMutation({ skipQueryInvalidation: true });

  useModalScrollLock(isOpen && !showSuccessModal && !showLimitModal);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    // 현재 요청 횟수 확인
    const currentCount = getRequestCount();
    
    if (currentCount >= 5) {
      // 5번째 요청인 경우 경고 모달 표시
      setShowLimitModal(true);
      return;
    }
    
    // 상담 요청 API 호출
    requestConsultationMutation.mutate(
      { expertId, comment },
      {
        onSuccess: () => {
          // 성공 시 성공 모달 표시
          setShowSuccessModal(true);
        },
        onError: (error) => {
          console.error('상담 요청 실패:', error);
          // 에러 처리 (필요시 에러 모달 표시)
        }
      }
    );
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleLimitModalClose = () => {
    setShowLimitModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="bg-white rounded-[24px] w-[520px] max-w-full p-8" onClick={(e) => e.stopPropagation()}>
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="flex items-center gap-2">
              <img src={backSvg} alt="뒤로가기" className="w-6 h-6" />
              <span className="text-[#121218] text-[16px] font-medium">뒤로가기</span>
            </button>
            <button onClick={onClose} className="flex items-center justify-center w-8 h-8">
              <img src={closeSvg} alt="닫기" className="w-6 h-6" />
            </button>
          </div>

          {/* 제목 */}
          <div className="text-center mb-8">
            <h2 className="text-[#121218] text-[24px] font-semibold leading-[36px] mb-2">
              상담 요청 확인
            </h2>
            <p className="text-[#75787B] text-[16px] leading-[24px]">
              {expertName} {expertPosition}에게 상담을 요청하시겠습니까?
            </p>
          </div>

          {/* 요청 내용 미리보기 */}
          <div className="mb-8">
            <h3 className="text-[#121218] text-[18px] font-medium leading-[28px] mb-4">
              요청 내용
            </h3>
            <div className="bg-[#F8F9FA] rounded-lg p-4">
              <p className="text-[#121218] text-[16px] leading-[24px] whitespace-pre-wrap">
                {comment}
              </p>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onBack}
              className="w-[180px] h-[44px] rounded-full bg-white text-[#25282B] border border-[#E3E6EB] font-medium"
            >
              수정하기
            </button>
            <button
              onClick={handleConfirm}
              disabled={requestConsultationMutation.isPending}
              className="w-[180px] h-[44px] rounded-full bg-[#1D68FF] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {requestConsultationMutation.isPending ? '요청 중...' : '요청하기'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
      />

      {/* Request Limit Modal */}
      <RequestLimitModal
        isOpen={showLimitModal}
        onClose={handleLimitModalClose}
        onConfirm={handleLimitModalClose}
      />
    </>
  );
};

export default ConfirmRequestModal; 