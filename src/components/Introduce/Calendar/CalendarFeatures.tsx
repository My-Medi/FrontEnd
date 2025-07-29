import React from 'react';
import FeaturesList from '../Common/FeaturesList';

const CalendarFeatures: React.FC = () => {
  const features = [
    { text: '매칭된 전문가를 통한 지속적인 맞춤 관리 계획을 제공' },
    { text: '다가오는 상담 예약일 알림' },
    { text: '매칭된 전문가가 등록한 일정을 통해 체계적인 계획 관리가 가능' },
    { text: '모든 건강관리 일정을 한눈에 확인' }
  ];

  return <FeaturesList features={features} />;
};

export default CalendarFeatures; 