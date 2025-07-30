import React from 'react';
import nextIcon from '../../../assets/Introduce/next.svg';
import bottomImage from '../../../assets/Introduce/Calendar/bottom.png';

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
  hoverColor = '#0F4CCC'
}) => {
  return (
    <>
      <div className="relative">
        <img 
          src={bottomImage} 
          alt="Bottom image" 
          className="w-full object-contain"
          loading="lazy"
        />
          <div className="absolute inset-0 flex items-center justify-center pt-6">
            <div className="flex flex-col justify-center items-center py-8 md:py-12 lg:py-16 px-4 lg:px-0">
              {description && (
                <p 
                  className="mb-16 font-medium text-[32px] text-[#121218] leading-[40px] tracking-[-0.03em] text-center whitespace-pre-line not-italic"
                  dangerouslySetInnerHTML={{
                    __html: description
                      .replace(/전문적 조언/g, '<span class="font-bold text-[32px] text-[#121218] leading-[40px] tracking-[-0.03em] not-italic">전문적 조언</span>')
                      .replace(/실질적 도움/g, '<span class="font-bold text-[32px] text-[#121218] leading-[40px] tracking-[-0.03em] not-italic">실질적 도움</span>')
                  }}
                />
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
          </div>
        </div>
    </>
  );
};

export default CTAButton; 