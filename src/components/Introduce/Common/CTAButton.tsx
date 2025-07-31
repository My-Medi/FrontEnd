import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // CTAButton 영역에 마우스 진입 시 블러 효과, 버튼에 마우스 호버 시 폰트 변경
  const shouldShowBlur = isHovered;

  return (
    <>
      <div 
        className="relative w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={bottomImage} 
          alt="Bottom image" 
          className="w-full object-contain"
          loading="lazy"
        />
        {/* BackgroundBlur 효과 - 점선 아래 부분에만 적용 */}
        <div 
          className={`absolute w-full transition-all duration-700 ease-in-out ${
            shouldShowBlur ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: '16.5%', // 점선이 있는 중간 지점부터 시작
            height: '50%', // 하단 50%만 차지
            background: 'linear-gradient(180deg, rgba(29, 104, 255, 0.2) -3.73%, rgba(255, 255, 255, 0.2) 100%)',
            filter: 'blur(10px)',
            zIndex: 1,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pt-6" style={{ zIndex: 2 }}>
            <div className="flex flex-col justify-center items-center py-6 md:py-8 lg:py-12 xl:py-16 px-4 lg:px-0">
              {description && (
                <p 
                  className="mb-8 md:mb-12 lg:mb-16 font-medium text-lg md:text-xl lg:text-2xl xl:text-[32px] text-[#121218] leading-[1.4] md:leading-[1.5] lg:leading-[1.6] xl:leading-[40px] tracking-[-0.03em] text-center whitespace-pre-line not-italic"
                  dangerouslySetInnerHTML={{
                    __html: description
                      .replace(/전문적 조언/g, '<span class="font-bold text-lg md:text-xl lg:text-2xl xl:text-[32px] text-[#121218] leading-[1.4] md:leading-[1.5] lg:leading-[1.6] xl:leading-[40px] tracking-[-0.03em] not-italic">전문적 조언</span>')
                      .replace(/실질적 도움/g, '<span class="font-bold text-lg md:text-xl lg:text-2xl xl:text-[32px] text-[#121218] leading-[1.4] md:leading-[1.5] lg:leading-[1.6] xl:leading-[40px] tracking-[-0.03em] not-italic">실질적 도움</span>')
                      .replace(/나의 건강검진결과를 모아/g, '<span class="font-bold text-lg md:text-xl lg:text-2xl xl:text-[32px] text-[#121218] leading-[1.4] md:leading-[1.5] lg:leading-[1.6] xl:leading-[40px] tracking-[-0.03em] not-italic">나의 건강검진결과를 모아</span>')
                      .replace(/자동분석으로 쉽게 이해/g, '<span class="font-bold text-lg md:text-xl lg:text-2xl xl:text-[32px] text-[#121218] leading-[1.4] md:leading-[1.5] lg:leading-[1.6] xl:leading-[40px] tracking-[-0.03em] not-italic">자동분석으로 쉽게 이해</span>')
                  }}
                />
              )}
              <button
                onClick={onClick}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className={`
                  text-white 
                  px-4 md:px-6 lg:px-[62px] 
                  py-3 md:py-4 lg:py-[25px] 
                  rounded-full lg:rounded-[60px] 
                  text-base md:text-lg lg:text-xl xl:text-2xl
                  ${isButtonHovered ? 'font-bold' : 'font-medium'}
                  transition-all duration-300
                  whitespace-nowrap 
                  bg-[#1D68FF] 
                  flex items-center justify-center 
                  gap-2 md:gap-4 lg:gap-[40px] 
                  shadow-lg lg:shadow-[0px_46px_18px_rgba(29,104,255,0.01),0px_26px_15px_rgba(29,104,255,0.03),0px_11px_11px_rgba(29,104,255,0.06),0px_3px_6px_rgba(29,104,255,0.07)] 
                  leading-[1.4] md:leading-[1.5] lg:leading-[1.6] xl:leading-10
                  tracking-[-0.03em]
                  cursor-pointer
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