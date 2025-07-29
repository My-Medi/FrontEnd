import React from 'react';
import nextIcon from '../../../assets/Introduce/next.svg';

interface CTAButtonProps {
  description?: string;
  onClick: () => void;
  className?: string;
  buttonColor?: string;
  textColor?: string;
  hoverColor?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  description,
  onClick,
  className = '',
  buttonColor = '#1D68FF',
  textColor = 'white',
  hoverColor = '#0F4CCC'
}) => {
  return (
    <div className="flex flex-col justify-center items-center py-8 md:py-12 lg:py-16 px-4 lg:px-0">
      {description && (
        <p 
          className="mb-16 text-[32px] font-medium text-[#121218] leading-[1.25em] tracking-[-0.03em] text-center whitespace-pre-line font-pretendard"
        >
          {description}
        </p>
      )}
      <button
        onClick={onClick}
        className={`
          text-white 
          px-4 md:px-6 lg:px-[62px] 
          py-3 md:py-4 lg:py-[25px] 
          rounded-full lg:rounded-[60px] 
          text-base md:text-lg lg:text-2xl 
          font-medium 
          transition-colors 
          whitespace-nowrap 
          bg-[#1D68FF] 
          hover:bg-[${hoverColor}] 
          flex items-center justify-center 
          gap-2 md:gap-4 lg:gap-[40px] 
          shadow-lg lg:shadow-[0px_46px_18px_rgba(29,104,255,0.01),0px_26px_15px_rgba(29,104,255,0.03),0px_11px_11px_rgba(29,104,255,0.06),0px_3px_6px_rgba(29,104,255,0.07)] 
          ${className}
        `}
              >
          마이메디로 건강관리 시작하기
          <img src={nextIcon} alt="next" className="w-2 h-4" />
        </button>
    </div>
  );
};

export default CTAButton; 