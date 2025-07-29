import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(18, 18, 24, 0.40)' }}></div>

      {/* 모달 컨테이너 */}
      <div className="relative bg-white rounded-lg p-6 w-[605px] h-[265px] mx-4">
        {/* 메시지 */}
        <div className="text-center mb-[50px] pt-[60px] pb-[20px]">
          <p className="text-gray-800 text-lg">변경된 사항을 저장하시겠습니까?</p>
        </div>

        {/* 버튼들 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="w-[216px] h-[47px] bg-white text-gray-700 rounded-[36px] shadow-[0_0_6px_4px_rgba(29,104,255,0.10)] transition-colors font-medium"
          >
            아니오
          </button>
          <button
            onClick={onConfirm}
            className="w-[216px] h-[47px] bg-[#1D68FF] text-white rounded-[36px] hover:bg-blue-600 transition-colors font-medium"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 