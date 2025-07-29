import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(18, 18, 24, 0.40)' }}></div>

      {/* 모달 컨테이너 */}
      <div className="relative bg-white rounded-lg p-6 w-[605px] h-[265px] mx-4">
        {/* 메시지 */}
        <div className="text-center mb-[50px] pt-[60px] pb-[20px]">
          <p className="text-gray-800 text-lg">{message}</p>
        </div>

        {/* 확인 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="w-[216px] h-[47px] py-3 bg-[#1D68FF] rounded-[36px] text-white hover:bg-blue-600 transition-colors font-medium"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 