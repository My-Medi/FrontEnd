import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/Introduce/Main/HeroSection';
import AdBanner from '../../components/Introduce/Main/AdBanner';
import ServiceSection from '../../components/Introduce/Main/ServiceSection';
import ProblemCards from '../../components/Introduce/Main/ProblemCards';
import bg1 from '../../assets/Introduce/1.png';
import bg2 from '../../assets/Introduce/2.png';
import bg3 from '../../assets/Introduce/3.png';
import bg4 from '../../assets/Introduce/4.png';
import problemImage from '../../assets/Introduce/problem.svg';

const IntroducePage: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState<'1' | '2' | '3' | '4'>('1');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 이미지 로딩 상태 관리
  useEffect(() => {
    const images = [bg1, bg2, bg3, bg4, problemImage];
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach(src => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.src = src;
    });
  }, []);

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
  }, [isAutoPlaying]); // isAutoPlaying을 의존성 배열에 추가

  if (!imagesLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1D68FF] mx-auto mb-4"></div>
          <p className="text-[#4D5053] text-lg">이미지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 광고 배너 섹션 */}
      <div className="w-full flex justify-center px-4 pt-6 pb-9 xl:px-4 md:px-6 sm:px-4">
        <div className="w-full max-w-7xl xl:max-w-7xl md:max-w-7xl">
          <div className="relative">
            <AdBanner variant={currentBanner} onVariantChange={handleBannerChange} />
          </div>
        </div>
      </div>

      {/* 문제 상황 카드들 */}
      <div className="w-full mx-auto max-w-[120rem]">
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