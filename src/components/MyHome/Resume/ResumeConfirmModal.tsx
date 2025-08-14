import React from 'react';
import useModalScrollLock from '../../../hooks/useModalScrollLock';

interface ResumeConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const ResumeConfirmModal: React.FC<ResumeConfirmModalProps> = ({ isOpen, onConfirm }) => {
  useModalScrollLock(isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(18, 18, 24, 0.40)' }}></div>

      {/* 모달 컨테이너 */}
      <div className="relative bg-white rounded-[18px] p-6 w-[605px] h-[265px] mx-4">
        {/* 메시지 */}
        <div className="text-center mb-[50px] pt-[60px] pb-[20px]">
          <p className="text-[#25282B] font-medium text-[24px] leading-[100%] tracking-[-0.03em]">
            이력서를 저장되었습니다.
          </p>
        </div>

        {/* 버튼들 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="w-[216px] h-[47px] bg-[#1D68FF] text-white rounded-[36px] hover:bg-blue-600 transition-colors font-semibold text-[20px] leading-[36px] tracking-[-0.03em] text-center"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeConfirmModal;

