import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceIntroPage from '../Common/ServiceIntroPage';
import calendarImage from '../../../assets/Introduce/Calendar/calendar.svg';
import backIcon from '../../../assets/Introduce/back.svg';
import combinedImage from '../../../assets/Introduce/c.png'; // 통합된 이미지
import bottomImage from '../../../assets/Introduce/bottom.png';

const CalendarIntroPage: React.FC = () => {
  const navigate = useNavigate();

  // 페이지 진입 시 스크롤을 최상단으로
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  const calendarData = {
    imageSrc: calendarImage,
    imageAlt: 'Calendar',
    title: '건강관리 캘린더',
    subtitle: '전문가와 함께 건강관리 공유 캘린더 서비스',
    descriptions: [
      '나와 매칭된 전문가와의 함께 만드는 공유형 건강관리 캘린더입니다.',
      '건강관리 캘린더를 통해 실천가능한 건강 미션부터 식단, 운동, 생활습관 체크까지 체계적으로!'
    ],
    backIconSrc: backIcon,
    onBackClick: handleBackClick,
    showBackButton: true,
    imagePosition: 'left' as const,
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
    combinedImageWidth: '1920px',
    combinedImageHeight: '2916px',
    bottomImageSrc: bottomImage,
    bottomImageAlt: 'Bottom Image'
  };

  return <ServiceIntroPage {...calendarData} />;
};

export default CalendarIntroPage; 