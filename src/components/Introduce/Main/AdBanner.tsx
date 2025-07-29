import React, { useState, useEffect } from 'react';
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
        className={`rounded-[20px] transition-all duration-300 ease-in-out cursor-pointer lg:rounded-[20px] md:rounded-[16px] sm:rounded-[12px] ${
          button.isActive 
            ? 'w-[48px] h-[6px] bg-white lg:w-[48px] lg:h-[6px] md:w-[40px] md:h-[5px] sm:w-[32px] sm:h-[4px]' 
            : 'w-[23px] h-[6px] bg-[#C5C8CB] hover:bg-gray-300 lg:w-[23px] lg:h-[6px] md:w-[20px] md:h-[5px] sm:w-[16px] sm:h-[4px]'
        }`}
      />
    ));
  };

  return (
    <div 
      className="relative w-full h-[521px] rounded-[20px] overflow-hidden transition-all duration-500 ease-in-out lg:h-[521px] lg:rounded-[20px] md:h-[400px] md:rounded-[16px] sm:h-[300px] sm:rounded-[12px]"
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
        <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[107px] pl-[0 px] lg:pb-[107px] lg:pl-[100px] md:pb-16 md:pl-1 md:justify-end sm:pb-12 sm:pl-6 sm:justify-end">
          <CTAButton>
            지금 바로 건강 기록하기
            <svg width="8.1" height="16.2" viewBox="0 0 8 16" fill="none" className="lg:w-[8.1px] lg:h-[16.2px] md:w-2 md:h-4 sm:w-1.5 sm:h-3">
              <path d="M1 1L7 8L1 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CTAButton>
        </div>
      )}

      {/* 세 번째 배너에만 버튼 표시 */}
      {variant === '3' && (
        <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[107px] pl-[110px] lg:pb-[107px] lg:pl-[110px] md:pb-16 md:pl-8 md:justify-end sm:pb-12 sm:pl-6 sm:justify-end">
          <CTAButton onClick={() => navigate('/expert')}>
            전문가 찾기
            <svg width="8.1" height="16.2" viewBox="0 0 8 16" fill="none" className="lg:w-[8.1px] lg:h-[16.2px] md:w-2 md:h-4 sm:w-1.5 sm:h-3">
              <path d="M1 1L7 8L1 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CTAButton>
        </div>
      )}

      {/* 네 번째 배너에만 버튼 표시 */}
      {variant === '4' && (
         <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[158px] pl-[440px] lg:pb-[158px] lg:pl-[440px] md:pb-16 md:pl-8 sm:pb-12 sm:pl-6">
          <div className="text-center">
            <CTAButton onClick={() => navigate('/myhome')}>
              마이홈 캘린더 가기
              <svg width="8.1" height="16.2" viewBox="0 0 8 16" fill="none" className="lg:w-[8.1px] lg:h-[16.2px] md:w-2 md:h-4 sm:w-1.5 sm:h-3">
                <path d="M1 1L7 8L1 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </CTAButton>
          </div>
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-[9px] z-20 lg:bottom-8 lg:gap-[9px] md:bottom-6 md:gap-2 sm:bottom-4 sm:gap-1.5">
        {getPaginationButtons()}
      </div>
    </div>
  );
};

export default AdBanner; 