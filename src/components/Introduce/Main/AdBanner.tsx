import React, { useMemo, useCallback, useEffect, useState } from 'react';
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

  // 현재 표시될 배경 이미지 로딩 상태 (초기/변경 시 빠른 표시)
  const [isCurrentImageLoaded, setIsCurrentImageLoaded] = useState<boolean>(false);

  // 배경 이미지를 메모이제이션
  const backgroundImage = useMemo(() => BACKGROUND_IMAGES[variant] || bg1, [variant]);

  // 현재 배경 이미지를 우선 다운로드하도록 preload 힌트
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    // @ts-expect-error: fetchpriority는 일부 브라우저에만 존재
    link.fetchpriority = 'high';
    link.href = backgroundImage;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [backgroundImage]);

  // 나머지 배너 이미지는 미리 받아두도록 prefetch 힌트 (UI 블록 없음)
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    Object.values(BACKGROUND_IMAGES).forEach((src) => {
      if (src === backgroundImage) return;
      const l = document.createElement('link');
      l.rel = 'prefetch';
      l.as = 'image';
      l.href = src;
      document.head.appendChild(l);
      links.push(l);
    });
    return () => {
      links.forEach((l) => document.head.removeChild(l));
    };
  }, [backgroundImage]);

  // 현재 배경 이미지가 준비되면 바로 표시
  useEffect(() => {
    let isMounted = true;
    setIsCurrentImageLoaded(false);
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => { if (isMounted) setIsCurrentImageLoaded(true); };
    img.onerror = () => { if (isMounted) setIsCurrentImageLoaded(true); };
    img.src = backgroundImage;

    return () => { isMounted = false; };
  }, [backgroundImage]);

  // 모든 배경 이미지 프리로드 (UI는 블록하지 않음)
  useEffect(() => {
    let isMounted = true;
    let count = 0;
    const imgs: HTMLImageElement[] = [];

    const handleDone = () => {
      count += 1;
      if (!isMounted) return;
      // no-op: 프리로드 진행도는 UI에 표시하지 않음
    };

    Object.values(BACKGROUND_IMAGES).forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = handleDone;
      img.onerror = handleDone; // 에러여도 진행
      img.src = src;
      imgs.push(img);
    });

    return () => {
      isMounted = false;
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

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
      style={
        isCurrentImageLoaded
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow:
                '0px 3px 6px 0px #1D68FF12, 0px 11px 11px 0px #1D68FF0F, 0px 26px 15px 0px #1D68FF08, 0px 46px 18px 0px #1D68FF03, 0px 71px 20px 0px #1D68FF00',
            }
          : undefined
      }
    >
      {!isCurrentImageLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
          <div className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin" aria-hidden="true" />
          <div className="mt-3 text-gray-500 text-sm" aria-live="polite">
            로딩 중...
          </div>
        </div>
      )}
      {/* 두 번째 배너에만 버튼 표시 */}
      {isCurrentImageLoaded && variant === '2' && (
        <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[6.7rem] xl:pb-[6.7rem] pl-[1rem] xl:pl-[7.3rem] md:pb-16 md:pl-5 md:justify-end sm:pb-12 sm:pl-7 sm:justify-end">
          <CTAButton>
            <span className="xl:text-xl md:text-lg sm:text-base">지금 바로 건강 기록하기</span>
            <ArrowIcon className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3" />
          </CTAButton>
        </div>
      )}

      {/* 세 번째 배너에만 버튼 표시 */}
      {isCurrentImageLoaded && variant === '3' && (
        <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[6.7rem] xl:pb-[6.7rem] pl-[7.4rem] xl:pl-[7.4rem] md:pb-16 md:pl-8.5 md:justify-end sm:pb-12 sm:pl-6.5 sm:justify-end">
          <CTAButton onClick={() => navigate('/expert')}>
            <span className="xl:text-xl md:text-lg sm:text-base">전문가 찾기</span>
            <ArrowIcon className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3" />
          </CTAButton>
        </div>
      )}

      {/* 네 번째 배너에만 버튼 표시 */}
      {isCurrentImageLoaded && variant === '4' && (
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
      {isCurrentImageLoaded && (
        <div className="absolute bottom-8 xl:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 xl:gap-2 z-20 md:bottom-6 md:gap-2 sm:bottom-4 sm:gap-1.5">
          {paginationButtons}
        </div>
      )}
    </div>
  );
};

export default AdBanner; 