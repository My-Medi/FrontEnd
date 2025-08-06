import React, { useState, useEffect } from 'react';
import backSvg from '../../../assets/Expert/back.svg';
import closeSvg from '../../../assets/Expert/close.svg';
import SuccessModal from './SuccessModal';
import useModalScrollLock from '../../../hooks/useModalScrollLock';

interface ConfirmRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  onConfirm: () => void;
  expertName: string;
  expertPosition: string;
  expertRealName: string;
}

const ConfirmRequestModal: React.FC<ConfirmRequestModalProps> = ({ 
  isOpen, 
  onClose, 
  onBack,
  // onConfirm, 
  expertName, 
  expertPosition,
  expertRealName
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useModalScrollLock(isOpen && !showSuccessModal);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    // 성공 모달만 표시 (상위 모달들은 닫지 않음)
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose(); // 모든 상위 모달들 닫기 (RequestModal, ExpertDetailModal)
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-[#121218]/40 transition-opacity duration-300 ${
            isVisible && !showSuccessModal ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        
        {/* Modal */}
        <div 
          className={`relative w-full max-w-[744px] h-auto bg-white/96 rounded-[40px] transition-all duration-300 ${
            isVisible && !showSuccessModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{ 
            boxShadow: '0px 2px 20px rgba(144, 181, 255, 0.5), inset 0px -4px 6px rgba(255, 255, 255, 0.25), inset 0px 4px 8px #FFFFFF'
          }}
        >
          {/* Content */}
          <div className="px-4 sm:px-8 lg:px-15 py-8 sm:py-10 lg:py-12.5 flex flex-col">
            {/* Header */}
            <div className="flex flex-col items-center">
              {/* Step indicator */}
              <div className="text-center mb-6">
                <div className="text-[16px] font-semibold text-[#1D68FF] leading-[22px] tracking-[-0.03em]">
                  2/2
                </div>
                <div className="text-[18px] font-medium text-[#4D5053] leading-[36px] tracking-[-0.03em]">
                  요청서 전송
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-[24px] font-semibold text-[#121218] leading-[36px] tracking-[-0.03em]">
                  <span className="text-[#1D68FF]">{expertName}</span> / <span className="text-[#121218]">{expertRealName}</span> <span className="text-[#121218]">{expertPosition}</span>에게 건강관리 요청서를 보내시겠습니까?
                </h2>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-4">
              <button
                onClick={() => {
                  // 모든 모달 닫기 (RequestModal, ExpertDetailModal)
                  // RequestModal의 onClose를 호출하여 모든 모달 닫기
                  onClose();
                }}
                className="w-full sm:w-[300px] h-14 rounded-full border border-[#FFFFFF] text-[#121218] hover:bg-[#EDF0F3] text-[20px] font-medium leading-[24px] tracking-[-0.03em] transition cursor-pointer bg-white shadow-[0px_0px_2px_3px_rgba(29,104,255,0.02),0px_0px_4px_6px_rgba(29,104,255,0.01),0px_0px_6px_0px_rgba(29,104,255,0)]"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                className="w-full sm:w-[300px] h-14 rounded-full bg-[#1D68FF] text-white text-[20px] font-semibold leading-[36px] tracking-[-0.03em] transition cursor-pointer shadow-[0px_0px_2px_4px_rgba(29,104,255,0.04),0px_0px_4px_4px_rgba(29,104,255,0.02),0px_0px_6px_0px_rgba(29,104,255,0)]"
              >
                요청서 보내기
              </button>
            </div>
          </div>

          {/* Back button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // ConfirmRequestModal만 닫고 RequestModal은 유지
              if (onBack) {
                onBack();
              }
            }}
            className="absolute top-12 left-12 w-[17px] h-[35px] flex items-center justify-center"
          >
            <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-12 right-12 w-4 h-4 flex items-center justify-center"
          >
            <img src={closeSvg} alt="닫기" className="w-full h-full object-contain" />
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default ConfirmRequestModal; 