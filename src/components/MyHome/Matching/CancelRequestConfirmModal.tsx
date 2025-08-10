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
      <div className="absolute inset-0 bg-[#121218]/40" onClick={onClose} />
      <div
        className="relative z-10 bg-white rounded-[30px] flex flex-col items-center w-auto h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-[70px] pt-[92px] mb-[64.2px]">
          <h2 className="text-[29px] font-medium text-[#25282B] leading-9">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-4 mb-[32px] px-[40px]">
          <button
            onClick={onClose}
            className="w-[216px] text-[#1D68FF] bg-white border border-[#1D68FF] rounded-[60px] py-3 px-8 text-[19.2px] font-semibold whitespace-nowrap text-center"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-[216px] text-white bg-[#1D68FF] rounded-[60px] py-3 px-8 text-[19.2px] font-semibold whitespace-nowrap text-center"
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


