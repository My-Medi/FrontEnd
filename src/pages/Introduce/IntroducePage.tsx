import React, { useState, useEffect, useCallback, useMemo } from 'react';
import HeroSection from '../../components/Introduce/Main/HeroSection';
import AdBanner from '../../components/Introduce/Main/AdBanner';
import ServiceSection from '../../components/Introduce/Main/ServiceSection';
import ProblemCards from '../../components/Introduce/Main/ProblemCards';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import problemImage from '../../assets/Introduce/problem.svg';

const BANNER_INTERVAL = 5000; // 5초
const AUTO_PLAY_RESUME_DELAY = 2000; // 3초

const IntroducePage: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState<'1' | '2' | '3' | '4'>('1');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 배너 배열을 메모이제이션
  const banners = useMemo(() => ['1', '2', '3', '4'] as const, []);

  // 이미지 로딩 상태 관리
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImagesLoaded(true);
    img.src = problemImage;
  }, []);

  // 배너 변경 핸들러를 useCallback으로 최적화
  const handleBannerChange = useCallback((newBanner: '1' | '2' | '3' | '4') => {
    setCurrentBanner(newBanner);
    setIsAutoPlaying(false);
    
    // 3초 후 자동 재생 재개
    const timer = setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // 자동 재생 로직
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentBanner(prevBanner => {
        const currentIndex = banners.indexOf(prevBanner);
        const nextIndex = (currentIndex + 1) % banners.length;
        return banners[nextIndex];
      });
    }, BANNER_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners]);

  if (!imagesLoaded) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <main className="min-h-screen">
      {/* 광고 배너 섹션 */}
      <section className="w-full flex justify-center px-4 pt-6 pb-9 xl:px-4 md:px-6 sm:px-4">
        <div className="w-full max-w-7xl xl:max-w-7xl md:max-w-7xl">
          <div className="relative overflow-hidden rounded-5 xl:rounded-5 md:rounded-4 sm:rounded-3">
            <AdBanner variant={currentBanner} onVariantChange={handleBannerChange} />
          </div>
        </div>
      </section>

      {/* 문제 상황 카드들 */}
      <section className="w-full mx-auto max-w-[120rem]">
        <ProblemCards />
      </section>

      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 서비스 소개 섹션 */}
      <section className="w-full mx-auto">
        <ServiceSection />
      </section>
    </main>
  );
};

export default IntroducePage;