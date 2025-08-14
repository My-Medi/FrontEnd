import React from 'react';
import useModalScrollLock from '../../hooks/useModalScrollLock';

interface ConfirmModalBaseProps {
  isOpen: boolean;
  title?: string; // 상단 타이틀이 필요한 경우
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

// 기존 모달 UI/스타일을 1:1로 보존한 베이스 컴포넌트
const ConfirmModalBase: React.FC<ConfirmModalBaseProps> = ({
  isOpen,
  title,
  message,
  confirmText = '확인',
  cancelText,
  onConfirm,
  onCancel,
}) => {
  useModalScrollLock(isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(18, 18, 24, 0.40)' }}></div>

      {/* 모달 컨테이너 - 원본 스타일 */}
      <div className="relative bg-white rounded-[18px] p-6 w-[605px] h-[265px] mx-4">
        {/* 메시지 */}
        <div className="text-center mb-[50px] pt-[60px] pb-[20px]">
          {title && (
            <p className="text-[#25282B] font-semibold text-[20px] leading-[100%] tracking-[-0.03em] mb-2">{title}</p>
          )}
          <p className="text-[#25282B] font-medium text-[24px] leading-[100%] tracking-[-0.03em]">{message}</p>
        </div>

        {/* 버튼들 */}
        <div className="flex justify-center gap-4">
          {cancelText && onCancel && (
            <button
              onClick={onCancel}
              className="w-[216px] h-[47px] text-[#121218] rounded-[36px] shadow-[0_0_6px_4px_rgba(29,104,255,0.10)] transition-colors font-semibold text-[20px] leading-[36px] tracking-[-0.03em] text-center"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="w-[216px] h-[47px] bg-[#1D68FF] text-white rounded-[36px] hover:bg-blue-600 transition-colors font-semibold text-[20px] leading-[36px] tracking-[-0.03em] text-center"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModalBase;


