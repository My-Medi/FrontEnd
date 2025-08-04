import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceIntroPage from '../Common/ServiceIntroPage';
import BackgroundBlur from '../Common/BackgroundBlur';
import LoadingSpinner from '../../Common/LoadingSpinner';
import calendarImage from '../../../assets/Introduce/Calendar/calendar.svg';
import backIcon from '../../../assets/back2.svg';
import combinedImage from '../../../assets/Introduce/Calendar/c.svg'; // 통합된 이미지

const CalendarIntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 페이지 진입 시 스크롤을 최상단으로
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 이미지 로딩 상태 관리
  useEffect(() => {
    const images = [calendarImage, combinedImage];
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

  const calendarData = {
    features: [
      { text: '매칭된 전문가를 통한 지속적인 맞춤 관리 계획을 제공' },
      { text: '다가오는 상담 예약일 알림' },
      { text: '매칭된 전문가가 등록한 일정을 통해 체계적인 계획 관리가 가능' },
      { text: '모든 건강관리 일정을 한눈에 확인' }
    ],
    ctaDescription: '마이메디를 통해 나에게 꼭 맞는 전문적 조언과 실질적 도움으로\n나의 몸을 더 건강하게 장기적으로 관리해보세요!',
    onCTAClick: () => navigate('/myhome'),
    combinedImageSrc: combinedImage,
    combinedImageAlt: 'Calendar Features Combined',
    combinedImageWidth: '100%',
    combinedImageHeight: '2916px',
  };

  if (!imagesLoaded) {
    return <LoadingSpinner message="로딩중..." size="lg" />;
  }

  return (
    <div className="mx-auto">
      {/* 캘린더 인트로 섹션 */}
      <BackgroundBlur>
        {/* 콘텐츠 - 중앙 정렬 */}
        <div className="px-4 lg:px-8 xl:px-16">
          <div className="max-w-7xl mx-auto">
            {/* 이미지와 텍스트를 묶은 컨테이너 */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 relative justify-center">
              {/* 이미지 - 가운데 */}
              <div className="mt-8 relative flex justify-center">
                {/* Back 아이콘 */}
                <div className="absolute -left-8 md:-left-10 lg:-left-14 top-2 md:top-3 lg:top-4 cursor-pointer hidden md:block" onClick={handleBackClick}>
                  <img 
                    src={backIcon} 
                    alt="Back" 
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14"
                  />
                </div>
                <img 
                  src={calendarImage} 
                  alt="Calendar" 
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                />
              </div>
              
              {/* 텍스트 설명 */}
              <div className="flex-1 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mb-20 px-4 lg:px-0">
                <h2 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-[#1D68FF] mb-2 leading-tight md:leading-snug lg:leading-9 tracking-tight">
                  건강관리 캘린더
                </h2>
                <p className="text-base md:text-lg lg:text-xl xl:text-xl font-semibold text-[#4D5053] mb-4 md:mb-6 lg:mb-8 leading-relaxed md:leading-snug lg:leading-9 tracking-tight">
                  전문가와 함께 건강관리 공유 캘린더 서비스
                </p>
                <div>
                  <p className="text-sm md:text-base lg:text-lg xl:text-lg text-[#4D5053] leading-relaxed md:leading-snug lg:leading-9 tracking-tight font-medium">
                    나와 매칭된 전문가와의 함께 만드는 공유형 건강관리 캘린더입니다.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg xl:text-lg text-[#4D5053] leading-relaxed md:leading-snug lg:leading-9 tracking-tight font-medium">
                    건강관리 캘린더를 통해 실천가능한 건강 미션부터 식단, 운동, 생활습관 체크까지 체계적으로!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundBlur>
      
      {/* 나머지 섹션들 */}
      <ServiceIntroPage {...calendarData} />
    </div>
  );
};

export default CalendarIntroPage; 