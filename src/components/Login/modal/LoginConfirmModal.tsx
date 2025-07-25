import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface LoginConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const LoginConfirmModal: React.FC<LoginConfirmModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#121218]/40"
        onClick={onClose}
      />
      <div
        className="relative z-10 bg-white rounded-[30px] flex flex-col items-center w-auto h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-[70px] pt-[92px] mb-[64.2px]">
          <h2 className="text-[29px] font-medium text-[#25282B] leading-9">
            {title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-[216px] text-white bg-[#1D68FF] rounded-[60px] py-3 px-[91px] text-[19.2px] font-semibold mb-[32px]"
        >
          확인
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default LoginConfirmModal; 