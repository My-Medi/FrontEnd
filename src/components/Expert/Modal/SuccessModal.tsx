import React, { useState, useEffect } from 'react';
import useModalScrollLock from '../../../hooks/useModalScrollLock';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useModalScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    console.log('SuccessModal handleConfirm 호출됨');
    setIsVisible(false);
    // 약간의 지연 후 onClose 호출하여 애니메이션이 완료된 후 모달이 닫히도록 함
    setTimeout(() => {
      console.log('SuccessModal onClose 호출됨');
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-[#121218]/40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleConfirm}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative w-[744px] bg-white rounded-[18px] transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <SuccessModalContent onClose={handleConfirm} />
      </div>
    </div>
  );
};

// 성공 메시지 컴포넌트
const SuccessMessage: React.FC = () => (
  <div className="text-center flex flex-col">
    <div className="text-[24px] font-semibold text-[#25282B] leading-[36px] tracking-[-3%]">
      건강관리 요청서가 성공적으로 전송되었습니다!
    </div>
    <div className="text-[20px] font-normal text-[#25282B] leading-[36px] tracking-[-3%]">
      매칭 여부는 마이홈&gt; 매칭전문가에서 확인하세요!
    </div>
  </div>
);

// 확인 버튼 컴포넌트
const ConfirmButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={(e) => {
      console.log('SuccessModal 확인 버튼 클릭됨');
      e.stopPropagation();
      onClick();
    }}
    className="w-[300px] h-14 rounded-[36px] bg-[#1D68FF] text-white text-[20px] font-semibold leading-[1.8] tracking-[-3%] transition cursor-pointer flex justify-center items-center px-12 py-3"
    style={{ 
      boxShadow: '0px 0px 4px 8px rgba(29, 104, 255, 0.04), 0px 0px 2px 4px rgba(29, 104, 255, 0.06)'
    }}
  >
    확인
  </button>
);

// 모달 내용 컴포넌트
const SuccessModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="px-[64px] py-[50px] flex flex-col items-center gap-[40px]">
    <SuccessMessage />
    <ConfirmButton onClick={onClose} />
  </div>
);

export default SuccessModal; 