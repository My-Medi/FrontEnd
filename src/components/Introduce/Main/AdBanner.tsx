import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg1 from '../../../assets/Introduce/1.png';
import bg2 from '../../../assets/Introduce/2.png';
import bg3 from '../../../assets/Introduce/3.png';
import bg4 from '../../../assets/Introduce/4.png';
import CTAButton from './CTAButton';

interface AdBannerProps {
  variant?: '1' | '2' | '3' | '4';
  onVariantChange?: (variant: '1' | '2' | '3' | '4') => void;
}

const AdBanner: React.FC<AdBannerProps> = ({ variant = '1', onVariantChange }) => {
  const navigate = useNavigate();
  console.log('AdBanner 렌더링 - 현재 variant:', variant);

  const getBackgroundImage = () => {
    switch (variant) {
      case '1': return bg1;
      case '2': return bg2;
      case '3': return bg3;
      case '4': return bg4;
      default: return bg1;
    }
  };

  const getPaginationButtons = () => {
    const buttons = [
      { variant: '1', isActive: variant === '1' },
      { variant: '2', isActive: variant === '2' },
      { variant: '3', isActive: variant === '3' },
      { variant: '4', isActive: variant === '4' }
    ];

    return buttons.map((button, index) => (
      <button 
        key={index}
        onClick={() => {
          console.log('페이지네이션 클릭:', button.variant);
          if (onVariantChange) {
            onVariantChange(button.variant as '1' | '2' | '3' | '4');
          } else {
            console.error('onVariantChange 함수가 없습니다!');
          }
        }}
        className={`rounded-full xl:rounded-full transition-all duration-300 ease-in-out cursor-pointer md:rounded-full sm:rounded-full ${
          button.isActive 
            ? 'w-12 xl:w-12 h-1.5 xl:h-1.5 bg-white md:w-10 md:h-1.25 sm:w-8 sm:h-1' 
            : 'w-6 xl:w-6 h-1.5 xl:h-1.5 bg-[#C5C8CB] hover:bg-gray-300 md:w-5 md:h-1.25 sm:w-4 sm:h-1'
        }`}
      />
    ));
  };

  return (
    <div 
      className="relative w-full h-[32.6rem] xl:h-[32.6rem] rounded-5 xl:rounded-5 overflow-hidden transition-all duration-500 ease-in-out md:h-[25rem] md:rounded-4 sm:h-[18.8rem] sm:rounded-3"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0px 3px 6px 0px #1D68FF12, 0px 11px 11px 0px #1D68FF0F, 0px 26px 15px 0px #1D68FF08, 0px 46px 18px 0px #1D68FF03, 0px 71px 20px 0px #1D68FF00'
      }}
    >
      {/* 두 번째 배너에만 버튼 표시 */}
      {variant === '2' && (
        <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[6.7rem] xl:pb-[6.7rem] pl-[1rem] xl:pl-[7.3rem] md:pb-16 md:pl-5 md:justify-end sm:pb-12 sm:pl-7 sm:justify-end">
          <CTAButton>
            <span className="xl:text-xl md:text-lg sm:text-base">지금 바로 건강 기록하기</span>
            <svg width="8.1" height="16.2" viewBox="0 0 8 16" fill="none" className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3">
              <path d="M1 1L7 8L1 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CTAButton>
        </div>
      )}

      {/* 세 번째 배너에만 버튼 표시 */}
      {variant === '3' && (
        <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[6.7rem] xl:pb-[6.7rem] pl-[7.4rem] xl:pl-[7.4rem] md:pb-16 md:pl-8.5 md:justify-end sm:pb-12 sm:pl-6.5 sm:justify-end">
          <CTAButton onClick={() => navigate('/expert')}>
            <span className="xl:text-xl md:text-lg sm:text-base">전문가 찾기</span>
            <svg width="8.1" height="16.2" viewBox="0 0 8 16" fill="none" className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3">
              <path d="M1 1L7 8L1 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CTAButton>
        </div>
      )}

      {/* 네 번째 배너에만 버튼 표시 */}
      {variant === '4' && (
         <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[9.9rem] xl:pb-[9.9rem] pl-[27.5rem] xl:pl-[27.5rem] md:pb-16 md:pl-8 sm:pb-12 sm:pl-6">
          <div className="text-center">
            <CTAButton onClick={() => navigate('/myhome')}>
              <span className="xl:text-xl md:text-lg sm:text-base">마이홈 캘린더 가기</span>
              <svg width="8.1" height="16.2" viewBox="0 0 8 16" fill="none" className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3">
                <path d="M1 1L7 8L1 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </CTAButton>
          </div>
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="absolute bottom-8 xl:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 xl:gap-2 z-20 md:bottom-6 md:gap-2 sm:bottom-4 sm:gap-1.5">
        {getPaginationButtons()}
      </div>
    </div>
  );
};

export default AdBanner; 