import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import ServiceIntroPage from '../Common/ServiceIntroPage';
import BackgroundBlur from '../Common/BackgroundBlur';
import LoadingSpinner from '../../Common/LoadingSpinner';
import backIcon from '../../../assets/back2.svg';
import expertIcon from '../../../assets/Introduce/Matching/matching.svg';
import matchingImage from '../../../assets/Introduce/Matching/m.svg';

const ExpertMatchingIntroPage: React.FC = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const isExpert = userType === 'expert';
  const [imagesLoaded, setImagesLoaded] = useState(false);



  // 이미지 로딩 상태 관리
  useEffect(() => {
    const images = [expertIcon, matchingImage]; // matchingImage는 지연 로딩
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

  const expertMatchingData = {
    features: [
      { text: '전문가 찾기를 통해 자신과 맞는 분야의 전문가를 더 넓은 선택지로 제공' },
      { text: '내가 원하는 전문가와 함께 체계적이고 전문적인 건강관리 가능' },
      { text: '건강관리요청서를 보내 전문가와 매칭요청' },
      { text: '전문가의 한줄 조언으로 나의 건강관리 기준을 명확하게!' }
    ],
    ctaDescription: '마이메디를 통해 나에게 꼭 맞는 전문적 조언과 실질적 도움으로\n나의 몸을 더 건강하게 장기적으로 관리해보세요!',
    onCTAClick: () => { if (!isExpert) navigate('/expert'); },
    combinedImageSrc: matchingImage,
    combinedImageAlt: 'Expert Matching Features',
    combinedImageWidth: '100%',
    combinedImageHeight: '3301px'
  };

  if (!imagesLoaded) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="mx-auto">
      {/* Expert 매칭 인트로 섹션 */}
      <BackgroundBlur>
        {/* 콘텐츠 - 중앙 정렬 */}
        <div className="px-4 lg:px-8 xl:px-16">
          <div className="mx-auto flex justify-center">
            {/* 이미지와 텍스트를 묶은 컨테이너 */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-8">
              {/* 이미지 - 왼쪽 */}
              <div className="mt-8 mb-8 relative flex justify-center">
                {/* Back 아이콘 */}
                <div className="absolute -left-40 top-2 md:top-3 lg:top-4 cursor-pointer hidden md:block" onClick={handleBackClick}>
                  <img 
                    src={backIcon} 
                    alt="Back" 
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14"
                  />
                </div>
                <img 
                  src={expertIcon} 
                  alt="Expert Matching" 
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                />
              </div>
              
              {/* 텍스트 설명 */}
              <div className="flex-1 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mb-14 px-4 lg:px-0">
                <h2 className="text-[#1D68FF] font-semibold text-3xl leading-[36px] tracking-[-0.03em] mb-2">
                  마이메디 전문가 매칭
                </h2>
                <p className="text-[#4D5053] font-semibold text-xl leading-[36px] tracking-[-0.03em] mb-4 md:mb-6 lg:mb-8">
                  건강 관리를 위한 효율적인 전문가 매칭 서비스
                </p>
                <div>
                  <p className="text-[#4D5053] font-medium text-lg leading-[36px] tracking-[-0.03em]">
                    건강관리사, 영양사, 웰니스 코치 등 내 건강 상태에 딱 맞는 전문가와 연결됩니다.<br />
                    스스로 하는 건강관리! 전문가의 도움으로 더 체계적으로 만들어가세요!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundBlur>
      
      {/* 나머지 섹션들 */}
      <ServiceIntroPage {...expertMatchingData} />
    </div>
  );
};

export default ExpertMatchingIntroPage; 