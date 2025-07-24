import React, { useState, useEffect } from 'react';
import backSvg from '../../../assets/Expert/back.svg';
import closeSvg from '../../../assets/Expert/close.svg';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: string) => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [requestText, setRequestText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const maxLength = 200;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (requestText.trim()) {
      onSubmit(requestText);
      setRequestText('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-[#121218]/40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-[744px] h-[568px] bg-white/96 rounded-[40px] transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          boxShadow: '0px 2px 20px rgba(144, 181, 255, 0.5), inset 0px -4px 6px rgba(255, 255, 255, 0.25), inset 0px 4px 8px #FFFFFF'
        }}
      >
        {/* Content */}
        <div className="px-15 py-12.5 h-full flex flex-col">
          {/* Header */}
          <div className="flex flex-col items-center">
            {/* Step indicator */}
            <div className="text-center mb-6">
              <div className="text-base font-semibold text-[#1D68FF] leading-[1.375] tracking-[-3%]">
                1/2
              </div>
              <div className="text-lg font-medium text-[#4D5053] leading-[2] tracking-[-3%]">
                요청사항 작성
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-[#121218] leading-[1.5] tracking-[-3%]">
                전문가에게 전달할 요청사항을 적어주세요!
              </h2>
              <p className="text-sm font-medium text-[#9DA0A3] leading-[1.714] tracking-[-3%]">
                (200자 이내)
              </p>
            </div>
          </div>

          {/* Textarea */}
          <div className="flex flex-col">
            <div className="w-[600px] h-[211px] border border-[#C5C8CB] rounded-lg p-3">
              <textarea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="ex) 야근이 많은 직장인, 교대 근무, 하루 10시간 앉아 있음, 어떤 관리를 받고 싶어요!"
                className="w-full h-full resize-none outline-none text-lg font-medium text-balck leading-[1] tracking-[-3%] placeholder-[#9DA0A3] placeholder:text-lg"
                maxLength={maxLength}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSubmit}
              disabled={!requestText.trim()}
              className="w-[300px] h-14 rounded-full bg-[#1D68FF] text-white text-xl font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: '0px 0px 2px 6px rgba(29, 104, 255, 0.06), 0px 0px 4px 6px rgba(29, 104, 255, 0.04), 0px 0px 6px 6px rgba(29, 104, 255, 0.02), 0px 0px 8px 0px rgba(29, 104, 255, 0)' }}
            >
              다음
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-12 left-12 w-[17px] h-[35px] flex items-center justify-center"
        >
          <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
        </button>

        <button
          onClick={onClose}
          className="absolute top-12 right-12 w-4 h-4 flex items-center justify-center"
        >
          <img src={closeSvg} alt="닫기" className="w-full h-full object-contain" />
        </button>
      </div>
    </div>
  );
};

export default RequestModal; 