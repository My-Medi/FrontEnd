import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import bg1Png from '../../../assets/Introduce/1.png';
import bg2Png from '../../../assets/Introduce/2.png';
import bg3Png from '../../../assets/Introduce/3.png';
import bg4Png from '../../../assets/Introduce/4.png';
import bg1Webp from '../../../assets/Introduce/1.webp';
import bg2Webp from '../../../assets/Introduce/2.webp';
import bg3Webp from '../../../assets/Introduce/3.webp';
import bg4Webp from '../../../assets/Introduce/4.webp';
import CTAButton from './CTAButton';

interface AdBannerProps {
  variant?: '1' | '2' | '3' | '4';
  onVariantChange?: (variant: '1' | '2' | '3' | '4') => void;
}

// WebP 지원 확인 함수
const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// 배경 이미지 매핑 객체 (WebP 우선, PNG fallback)
const BACKGROUND_IMAGES = {
  '1': { webp: bg1Webp, png: bg1Png },
  '2': { webp: bg2Webp, png: bg2Png },
  '3': { webp: bg3Webp, png: bg3Png },
  '4': { webp: bg4Webp, png: bg4Png },
} as const;

// 화살표 아이콘 컴포넌트
const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="8.1" height="16.2" viewBox="0 0 8 16" fill="none" className={className}>
    <path d="M1 1L7 8L1 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AdBanner: React.FC<AdBannerProps> = ({ variant = '1', onVariantChange }) => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const isExpert = userType === 'expert';

  // WebP 지원 여부 확인
  const [webpSupported, setWebpSupported] = useState<boolean | null>(null);

  // 부드러운 전환을 위한 크로스페이드 레이어 상태
  const [displayedSrc, setDisplayedSrc] = useState<string>('');
  const [incomingSrc, setIncomingSrc] = useState<string | null>(null);
  const [incomingLoaded, setIncomingLoaded] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);
  const [currentImageLoaded, setCurrentImageLoaded] = useState<boolean>(false);

  // WebP 지원 확인 및 초기 이미지 설정
  useEffect(() => {
    const isWebPSupported = supportsWebP();
    setWebpSupported(isWebPSupported);
    
    // 초기 이미지 즉시 설정
    const initialImageUrl = isWebPSupported ? BACKGROUND_IMAGES[variant].webp : BACKGROUND_IMAGES[variant].png;
    setDisplayedSrc(initialImageUrl);
    
    // 초기 로딩 상태 즉시 설정 (이미지가 이미 캐시되어 있을 가능성)
    if (initialImageUrl) {
      setInitialLoaded(true);
      setCurrentImageLoaded(true);
    }
  }, [variant]);

  // 현재 배경 이미지 URL을 가져오는 함수
  const getImageUrl = useCallback((variantKey: '1' | '2' | '3' | '4') => {
    const images = BACKGROUND_IMAGES[variantKey];
    return webpSupported ? images.webp : images.png;
  }, [webpSupported]);

  // 배경 이미지를 메모이제이션
  const backgroundImage = useMemo(() => getImageUrl(variant), [variant, getImageUrl]);

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
    Object.entries(BACKGROUND_IMAGES).forEach(([, images]) => {
      const imageUrl = webpSupported ? images.webp : images.png;
      if (imageUrl === backgroundImage) return;
      const l = document.createElement('link');
      l.rel = 'prefetch';
      l.as = 'image';
      l.href = imageUrl;
      document.head.appendChild(l);
      links.push(l);
    });
    return () => {
      links.forEach((l) => document.head.removeChild(l));
    };
  }, [backgroundImage, webpSupported]);

  // displayedSrc 업데이트 (초기 설정 후)
  useEffect(() => {
    if (webpSupported !== null && displayedSrc) {
      const newSrc = getImageUrl(variant);
      if (newSrc !== displayedSrc) {
        setDisplayedSrc(newSrc);
      }
    }
  }, [variant, webpSupported, getImageUrl, displayedSrc]);

  // 이미지 로딩 상태 설정
  useEffect(() => {
    if (!displayedSrc) return;
    
    // 이미 로드된 상태라면 스킵
    if (currentImageLoaded && initialLoaded) return;
    
    const img = new Image();
    img.onload = () => {
      setInitialLoaded(true);
      setCurrentImageLoaded(true);
    };
    img.onerror = () => {
      // 에러가 발생해도 UI는 표시
      setInitialLoaded(true);
      setCurrentImageLoaded(true);
    };
    img.src = displayedSrc;
  }, [displayedSrc, currentImageLoaded, initialLoaded]);

  // variant 변경 시 부드러운 전환을 위한 incoming 레이어 준비 및 페이드 인
  useEffect(() => {
    const nextSrc = getImageUrl(variant);
    if (!nextSrc || nextSrc === displayedSrc) {
      // 같은 이미지인 경우 incoming 레이어 정리
      setIncomingSrc(null);
      setIncomingLoaded(false);
      setIsFading(false);
      return;
    }
    
    setIncomingSrc(nextSrc);
    setIncomingLoaded(false);

    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      setIncomingLoaded(true);
      // 다음 프레임에 페이드 시작하여 레이아웃 적용 이후 트랜지션되도록 함
      requestAnimationFrame(() => setIsFading(true));
    };
    img.onerror = () => {
      // 에러여도 즉시 전환 처리
      setIncomingLoaded(true);
      requestAnimationFrame(() => setIsFading(true));
    };
    img.src = nextSrc;
  }, [variant, displayedSrc, getImageUrl]);

  // 모든 배경 이미지 프리로드 (UI는 블록하지 않음)
  useEffect(() => {
    if (webpSupported === null) return;
    
    let isMounted = true;
    let count = 0;
    const imgs: HTMLImageElement[] = [];

    const handleDone = () => {
      count += 1;
      if (!isMounted) return;
      // no-op: 프리로드 진행도는 UI에 표시하지 않음
    };

    Object.values(BACKGROUND_IMAGES).forEach((images) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = handleDone;
      img.onerror = handleDone; // 에러여도 진행
      img.src = webpSupported ? images.webp : images.png;
      imgs.push(img);
    });

    return () => {
      isMounted = false;
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [webpSupported]);

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
        className={`rounded-full transition-all duration-500 ease-out cursor-pointer ${
          button.isActive 
            ? 'w-12 xl:w-12 h-1.5 xl:h-1.5 bg-white md:w-10 md:h-1.25 sm:w-8 sm:h-1' 
            : 'w-6 xl:w-6 h-1.5 xl:h-1.5 bg-[#C5C8CB] hover:bg-gray-300 md:w-5 md:h-1.25 sm:w-4 sm:h-1'
        }`}
        aria-label={`배너 ${button.variant}로 이동`}
      />
    ));
  }, [variant, handlePaginationClick]);

  // 다음 배너 이미지를 높은 우선순위로 사전 로드하여 전환 체감 속도 개선
  useEffect(() => {
    const order: Array<'1' | '2' | '3' | '4'> = ['1', '2', '3', '4'];
    const idx = order.indexOf(variant);
    const nextVariant = order[(idx + 1) % order.length];
    const nextImages = BACKGROUND_IMAGES[nextVariant];
    const nextSrc = webpSupported ? nextImages.webp : nextImages.png;
    if (!nextSrc) return;

    // preload hint
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    // @ts-expect-error: fetchpriority는 일부 브라우저에서만 지원
    link.fetchpriority = 'high';
    link.href = nextSrc;
    document.head.appendChild(link);

    // 실제 다운로드 트리거 (background 이미지 우선순위 보조)
    const img = new Image();
    img.decoding = 'async';
    img.src = nextSrc;

    return () => {
      document.head.removeChild(link);
      img.onload = null;
      img.onerror = null;
    };
  }, [variant, webpSupported]);

  return (
    <div
      className="relative w-full h-[32.6rem] xl:h-[32.6rem] rounded-5 xl:rounded-5 overflow-hidden md:h-[25rem] md:rounded-4 sm:h-[18.8rem] sm:rounded-3"
    >


      {/* Base layer (현재 표시 중인 배경) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${displayedSrc})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: displayedSrc ? 'transparent' : '#f8f9fa',
        }}
      />

      {/* Incoming layer (다음 배경, 크로스페이드) */}
      {incomingSrc && incomingLoaded && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${isFading ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${incomingSrc})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          onTransitionEnd={() => {
            if (isFading && incomingSrc) {
              setDisplayedSrc(incomingSrc);
              setIncomingSrc(null);
              setIsFading(false);
            }
          }}
        />
      )}
      {/* 두 번째 배너에만 버튼 표시 */}
      {currentImageLoaded && variant === '2' && (
        <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[6.7rem] xl:pb-[6.7rem] pl-[310px] xl:pl-[310px] md:pb-16 md:pl-5 md:justify-end sm:pb-12 sm:pl-7 sm:justify-end animate-fade-in-up">
          <CTAButton onClick={() => { if (!isExpert) navigate('/health-result-input'); }}>
            <span className="xl:text-xl md:text-lg sm:text-base">지금 바로 건강 기록하기</span>
            <ArrowIcon className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3" />
          </CTAButton>
        </div>
      )}

      {/* 세 번째 배너에만 버튼 표시 */}
      {currentImageLoaded && variant === '3' && (
        <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[6.7rem] xl:pb-[6.7rem] pl-[310px] xl:pl-[310px] md:pb-16 md:pl-8.5 md:justify-end sm:pb-12 sm:pl-6.5 sm:justify-end animate-fade-in-up">
          <CTAButton onClick={() => (!isExpert ? navigate('/expert') : undefined)}>
            <span className="xl:text-xl md:text-lg sm:text-base">전문가 찾기</span>
            <ArrowIcon className="xl:w-[0.5rem] xl:h-[1rem] md:w-2 md:h-4 sm:w-1.5 sm:h-3" />
          </CTAButton>
        </div>
      )}

      {/* 네 번째 배너에만 버튼 표시 */}
      {currentImageLoaded && variant === '4' && (
         <div className="relative z-10 flex flex-col justify-end items-start h-full pb-[9.9rem] xl:pb-[9.9rem] pl-[310px] xl:pl-[310px] md:pb-16 md:pl-8 sm:pb-12 sm:pl-6 animate-fade-in-up">
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