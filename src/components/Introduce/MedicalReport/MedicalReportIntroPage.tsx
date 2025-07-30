import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceIntroPage from '../Common/ServiceIntroPage';
import BackgroundBlur from '../Common/BackgroundBlur';
import backIcon from '../../../assets/back2.svg';
import reportIcon from '../../../assets/Introduce/MedicalReport/mymedical.svg';
import mdImage from '../../../assets/Introduce/MedicalReport/md.png';

const MedicalReportIntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 페이지 진입 시 스크롤을 최상단으로
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 이미지 로딩 상태 관리
  useEffect(() => {
    const images = [reportIcon, mdImage];
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

  const handleBackClick = () => {
    window.history.back();
  };

  const medicalReportData = {
    features: [
      { text: '검사 결과를 분석·시각화하여 이해하기 쉽게 제시' },
      { text: '질환별 수치를 색상으로 구분하고 종합 건강 지수를 함께 제공' },
      { text: '현재 건강 상태를 같은 연령대 평균과 비교해 객관적으로 평가' },
      { text: '2년마다 받은 검진 결과를 한 곳에서 통합 관리해 추세를 파악' }
    ],
    ctaDescription: '마이메디로 나의 건강검진결과를 모아보고 자동분석으로 쉽게 이해하고\n나의 몸을 더 건강하게 장기적으로 관리해보세요!',
    onCTAClick: () => navigate('/health-result-input'),
    combinedImageSrc: mdImage,
    combinedImageAlt: 'Medical Report Features',
    combinedImageWidth: '100%',
    combinedImageHeight: '1894px'
  };

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
    <div className="mx-auto">
      {/* 마이메디컬리포트 인트로 섹션 */}
      <BackgroundBlur>
        {/* 콘텐츠 - 중앙 정렬 */}
        <div className="px-4 lg:px-8 xl:px-16">
          <div className="mx-auto flex justify-center">
            {/* 이미지와 텍스트를 묶은 컨테이너 */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-8">
              {/* 이미지 - 왼쪽 */}
              <div className="mt-8 relative flex justify-center">
                {/* Back 아이콘 */}
                <div className="absolute -left-8 md:-left-10 lg:-left-14 top-2 md:top-3 lg:top-4 cursor-pointer hidden md:block" onClick={handleBackClick}>
                  <img 
                    src={backIcon} 
                    alt="Back" 
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14"
                  />
                </div>
                <div className="relative">
                  <img 
                    src={reportIcon} 
                    alt="Medical Report" 
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
                  마이메디컬리포트
                </h2>
                <p className="text-[#4D5053] font-semibold text-xl leading-[36px] tracking-[-0.03em] mb-4 md:mb-6 lg:mb-8">
                  건강검진 결과 자동 분석 서비스
                </p>
                <div>
                  <p className="text-[#4D5053] font-medium text-lg leading-[36px] tracking-[-0.03em]">
                    용어도 어렵고 해석도 복잡한 건강검진결과지!<br />
                    MyMedi가 자동 분석하여 위험 수치와 주요 질환 가능성, 생활습관 개선 포인트까지 한눈에 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundBlur>
      
      {/* 나머지 섹션들 */}
      <ServiceIntroPage {...medicalReportData} />
    </div>
  );
};

export default MedicalReportIntroPage; 