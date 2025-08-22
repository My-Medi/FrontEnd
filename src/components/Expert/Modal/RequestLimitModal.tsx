import React, { useState, useEffect } from 'react';
import useModalScrollLock from '../../../hooks/useModalScrollLock';

interface RequestLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RequestLimitModal: React.FC<RequestLimitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useModalScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-[#121218]/40 transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        
        {/* Modal */}
        <div 
          className={`relative w-[744px] bg-white rounded-[18px] transition-all duration-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{ 
            boxShadow: '0px 2px 20px rgba(144, 181, 255, 0.5), inset 0px -4px 6px rgba(255, 255, 255, 0.25), inset 0px 4px 8px #FFFFFF'
          }}
        >
          {/* Content */}
          <div className="px-[62.4px] py-[27px] flex flex-col items-center">
            {/* Text Section */}
            <div className="text-center py-[60px]">
              <p 
                className="text-[24px] font-medium text-[#121218] leading-[1.193] tracking-[-3%] text-center"
                style={{ fontFamily: 'Pretendard', fontWeight: 500, fontStyle: 'normal' }}
              >
                해당 전문가에게 이미 5번 요청하셨습니다.<br />
                <span className="pt-7 block">더 이상 요청할 수 없습니다.</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row items-center gap-[30px]">
              <button
                onClick={() => {
                  onClose();
                  onConfirm();
                }}
                className="w-full sm:w-[300px] h-14 rounded-full border border-[#FFFFFF] text-[#121218] hover:bg-[#EDF0F3] text-[20px] font-medium leading-[24px] tracking-[-0.03em] transition cursor-pointer"
                style={{ boxShadow: '0px 0px 2px 4px rgba(29, 104, 255, 0.03), 0px 0px 4px 12px rgba(29, 104, 255, 0.02), 0px 0px 6px 8px rgba(29, 104, 255, 0.01), 0px 0px 8px 0px rgba(29, 104, 255, 0)' }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestLimitModal;
