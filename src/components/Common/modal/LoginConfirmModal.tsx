import React from "react";
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
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#1212184D]"
        onClick={onClose}
      />
      <div
        className="relative z-10 bg-white rounded-[30px] py-[45px] px-[104px] flex flex-col items-center gap-7 w-auto h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-[100px]">
          <h2 className="text-5xl font-medium text-[#25282B] leading-9">
            {title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-[360px] text-white bg-[#1D68FF] rounded-[60px] py-5 px-20 text-3xl font-semibold shadow-[0px_0px_6px_10px_rgba(29,104,255,0.1),_0px_0px_11px_30px_rgba(29,104,255,0.06),_0px_0px_15px_20px_rgba(29,104,255,0.03),_0px_0px_18px_20px_rgba(29,104,255,0.01),_0px_0px_20px_0px_rgba(29,104,255,0)]"
        >
          확인
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default LoginConfirmModal; 