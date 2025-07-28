import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/Introduce/HeroSection';
import AdBanner from '../../components/Introduce/AdBanner';
import ServiceSection from '../../components/Introduce/ServiceSection';
import ProblemCards from '../../components/Introduce/ProblemCards';

const IntroducePage: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState<'1' | '2' | '3' | '4'>('1');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleBannerChange = (newBanner: '1' | '2' | '3' | '4') => {
    console.log('배너 변경:', newBanner);
    setCurrentBanner(newBanner);
    // 사용자가 수동으로 클릭했을 때 자동 재생 일시 중단
    setIsAutoPlaying(false);
    // 3초 후 자동 재생 재개
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return; // 자동 재생이 비활성화되어 있으면 실행하지 않음
    
    const banners = ['1', '2', '3', '4'] as const;
    
    const interval = setInterval(() => {
      setCurrentBanner(prevBanner => {
        const currentIndex = banners.indexOf(prevBanner);
        const nextIndex = (currentIndex + 1) % banners.length;
        return banners[nextIndex];
      });
    }, 5000); // 5초마다 배너 변경

    return () => clearInterval(interval);
  }, []); // 의존성 배열을 비워서 한 번만 실행

  return (
    <div>
      {/* 광고 배너 섹션 */}
      <div className="w-full max-w-[1300px] mx-auto px-4 pt-[22px] pb-9">
        <div className="relative">
          <AdBanner variant={currentBanner} onVariantChange={handleBannerChange} />
        </div>
      </div>

      {/* 문제 상황 카드들 */}
      <div className="w-full max-w-[1920px] mx-auto pt-9">
        <ProblemCards />
      </div>

      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 서비스 소개 섹션 */}
      <div className="w-full mx-auto">
        <ServiceSection />
      </div>
    </div>
  );
};

export default IntroducePage;