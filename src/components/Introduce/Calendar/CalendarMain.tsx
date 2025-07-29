import React from 'react';
import calendarImage from '../../../assets/Introduce/Calendar/calendar.svg';
import backIcon from '../../../assets/Introduce/back.svg';
import IntroSection from '../Common/IntroSection';

const CalendarMain: React.FC = () => {
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
    showBackButton: true
  };

  return <IntroSection {...calendarData} />;
};

export default CalendarMain; 