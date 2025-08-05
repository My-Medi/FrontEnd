import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import bg1 from '../../../assets/Introduce/1.svg';
import bg2 from '../../../assets/Introduce/2.png';
import bg3 from '../../../assets/Introduce/3.png';
import bg4 from '../../../assets/Introduce/4.png';
import CTAButton from './CTAButton';

interface AdBannerProps {
  variant?: '1' | '2' | '3' | '4';
  onVariantChange?: (variant: '1' | '2' | '3' | '4') => void;
}

// 배경 이미지 매핑 객체
const BACKGROUND_IMAGES = {
  '1': bg1,
  '2': bg2,
  '3': bg3,
  '4': bg4,
} as const;

// 화살표 아이콘 컴포넌트
const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="8.1" height="16.2" viewBox="0 0 8 16" fill="none" className={className}>
    <path d="M1 1L7 8L1 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AdBanner: React.FC<AdBannerProps> = ({ variant = '1', onVariantChange }) => {
  const navigate = useNavigate();

  // 배경 이미지를 메모이제이션
  const backgroundImage = useMemo(() => BACKGROUND_IMAGES[variant] || bg1, [variant]);

  // 페이지네이션 버튼 클릭 핸들러를 useCallback으로 최적화
  const handlePaginationClick = useCallback((buttonVariant: '1' | '2' | '3' | '4') => {
    onVariantChange?.(buttonVariant);
  }, [onVariantChange]);

  // 페이지네이션 버튼들을 메모이제이션
  const paginationButtons = useMemo(() => {
    const buttons = [
      { variant: '1' as const, isActive: variant === '1' },
      { variant: '2' as const, isActive: variant === '2' },
      { variant: '3' as const, isActive: variant === '3' },
      { variant: '4' as const, isActive: variant === '4' }
    ];

    return buttons.map((button) => (
      <button 
        key={button.variant}
        onClick={() => handlePaginationClick(button.variant)}
        className={`rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
          button.isActive 
            ? 'w-12 xl:w-12 h-1.5 xl:h-1.5 bg-white md:w-10 md:h-1.25 sm:w-8 sm:h-1' 
            : 'w-6 xl:w-6 h-1.5 xl:h-1.5 bg-[#C5C8CB] hover:bg-gray-300 md:w-5 md:h-1.25 sm:w-4 sm:h-1'
        }`}
        aria-label={`배너 ${button.variant}로 이동`}
      />
    ));
  }, [variant, handlePaginationClick]);

  return (
    <div 
      className="relative w-full h-[32.6rem] xl:h-[32.6rem] rounded-5 xl:rounded-5 overflow-hidden transition-all duration-500 ease-in-out md:h-[25rem] md:rounded-4 sm:h-[18.8rem] sm:rounded-3"
      style={{
        backgroundImage: `url(${backgroundImage})`,
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
            <ArrowIcon className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3" />
          </CTAButton>
        </div>
      )}

      {/* 세 번째 배너에만 버튼 표시 */}
      {variant === '3' && (
        <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[6.7rem] xl:pb-[6.7rem] pl-[7.4rem] xl:pl-[7.4rem] md:pb-16 md:pl-8.5 md:justify-end sm:pb-12 sm:pl-6.5 sm:justify-end">
          <CTAButton onClick={() => navigate('/expert')}>
            <span className="xl:text-xl md:text-lg sm:text-base">전문가 찾기</span>
            <ArrowIcon className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3" />
          </CTAButton>
        </div>
      )}

      {/* 네 번째 배너에만 버튼 표시 */}
      {variant === '4' && (
         <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[9.9rem] xl:pb-[9.9rem] pl-[27.5rem] xl:pl-[27.5rem] md:pb-16 md:pl-8 sm:pb-12 sm:pl-6">
          <div className="text-center">
            <CTAButton onClick={() => navigate('/myhome')}>
              <span className="xl:text-xl md:text-lg sm:text-base">마이홈 캘린더 가기</span>
              <ArrowIcon className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3" />
            </CTAButton>
          </div>
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="absolute bottom-8 xl:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 xl:gap-2 z-20 md:bottom-6 md:gap-2 sm:bottom-4 sm:gap-1.5">
        {paginationButtons}
      </div>
    </div>
  );
};

export default AdBanner; 