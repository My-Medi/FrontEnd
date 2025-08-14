import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import ServiceIntroPage from '../Common/ServiceIntroPage';
import BackgroundBlur from '../Common/BackgroundBlur';
import LoadingSpinner from '../../Common/LoadingSpinner';
import backIcon from '../../../assets/back2.svg';
import aiHealthCareIcon from '../../../assets/Introduce/AIHealthCare/l.svg';
import aiHealthCareImage from '../../../assets/Introduce/AIHealthCare/llm.svg';

const AIHealthCareIntroPage: React.FC = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const isExpert = userType === 'expert';
  const [imagesLoaded, setImagesLoaded] = useState(false);



  // 이미지 로딩 상태 관리
  useEffect(() => {
    const images = [backIcon, aiHealthCareIcon, aiHealthCareImage]; // aiHealthCareImage는 지연 로딩
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      console.log(`이미지 로딩 완료: ${loadedCount}/${images.length}`);
      if (loadedCount === images.length) {
        console.log('기본 이미지 로딩 완료!');
        setImagesLoaded(true);
      }
    };

    const handleImageError = (src: string) => {
      console.error(`이미지 로딩 실패: ${src}`);
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach(src => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = () => handleImageError(src);
      img.src = src;
    });
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  const aiHealthCareData = {
    features: [
      { text: 'MyMedi AI가 건강검진결과를 기반으로 사용자의 건강을 객관적으로 분석' },
      { text: '현재 건강 상태의 주요 이상 수치 요약 제공' },
      { text: '발병 위험 질환 TOP3 제공' },
      { text: '생활 속 건강관리의 주요 포인트를 안내하여 효과적인 건강관리 방향성 제시' }
    ],
    ctaDescription: '마이메디로 나의 건강검진결과를 모아보고 자동분석으로 쉽게 이해하고\n나의 몸을 더 건강하게 장기적으로 관리해보세요!',
    onCTAClick: () => { if (!isExpert) navigate('/health-terms'); },
    combinedImageSrc: aiHealthCareImage,
    combinedImageAlt: 'AI Health Care Features',
    combinedImageWidth: '100%',
    combinedImageHeight: '2526px'
  };

  if (!imagesLoaded) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="mx-auto">
      {/* AI추천건강관리법 인트로 섹션 */}
      <BackgroundBlur>
        {/* 콘텐츠 - 중앙 정렬 */}
        <div className="px-4 lg:px-8 xl:px-16">
          <div className="mx-auto flex justify-center">
            {/* 이미지와 텍스트를 묶은 컨테이너 */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-8">
              {/* 이미지 - 왼쪽 */}
              <div className="mt-8 relative flex justify-center">
                {/* Back 아이콘 */}
                <div className="absolute -left-25 top-2 md:top-3 lg:top-4 cursor-pointer hidden md:block" onClick={handleBackClick}>
                  <img 
                    src={backIcon} 
                    alt="Back" 
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14"
                  />
                </div>
                <div className="relative">
                  <img 
                    src={aiHealthCareIcon} 
                    alt="AI Health Care" 
                    className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                  />
                  {/* 이미지 하단 그라데이션 효과 */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-30"
                    style={{
                      background: 'linear-gradient(360deg, #FFFFFF -30.56%, rgba(255, 255, 255, 0) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>
              
              {/* 텍스트 설명 */}
              <div className="flex-1 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mb-14 px-4 lg:px-0">
                <h2 className="text-[#1D68FF] font-semibold text-3xl leading-[36px] tracking-[-0.03em] mb-2">
                  AI 기반 건강검진 분석
                </h2>
                <p className="text-[#4D5053] font-semibold text-xl leading-[36px] tracking-[-0.03em] mb-4 md:mb-6 lg:mb-8">
                  건강검진결과기반, 객관적 분석과 건강관리 방향성 제안 서비스
                </p>
                <div>
                  <p className="text-[#4D5053] font-medium text-lg leading-[36px] tracking-[-0.03em]">
                    MyMedi AI로 건강검진결과지만으로 알 수 없는<br />
                    주요 이상 수치, 발병 위험 질환 순위, 생활습관 분석 및 개선 포인트까지 한눈에 확인하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundBlur>
      
      {/* 나머지 섹션들 */}
      <ServiceIntroPage {...aiHealthCareData} />
    </div>
  );
};

export default AIHealthCareIntroPage; 