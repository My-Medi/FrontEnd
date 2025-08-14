import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface CancelRequestConfirmModalProps {
  isOpen: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

// 로그인 확인 모달과 동일한 레이아웃/스타일을 사용하되, 확인/취소 두 버튼 제공
const CancelRequestConfirmModal: React.FC<CancelRequestConfirmModalProps> = ({
  isOpen,
  title = '상담요청을 취소하시겠습니까?',
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        onConfirm();
      }
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onConfirm, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(18, 18, 24, 0.40)' }} onClick={onClose} />
      <div
        className="relative z-10 bg-white rounded-[18px] w-[587px] h-[312px] px-[62px] py-[27px] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center pt-[60px] pb-[64px] flex-1 flex items-center">
          <h2 className="text-black text-[24px] font-medium leading-[40px] tracking-[-0.72px]">
            {title}
          </h2>
        </div>
        <div className="flex justify-center gap-[30px] mb-[8px]">
          <button
            onClick={onClose}
            className="w-[216px] h-[47px] bg-white text-gray-700 rounded-[36px] shadow-[0_0_6px_4px_rgba(29,104,255,0.10)] transition-colors text-[20px] font-medium font-[Pretendard]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-[216px] h-[47px] bg-[#1D68FF] text-white rounded-[36px] hover:bg-blue-600 transition-colors text-[20px] font-medium font-[Pretendard]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CancelRequestConfirmModal;


