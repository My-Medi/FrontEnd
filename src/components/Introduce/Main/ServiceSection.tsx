import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceSection: React.FC = () => {
  const services = [
    {
      title: '마이메디컬리포트',
      subtitle: '건강검진 결과 자동 분석 서비스',
      description: '용어도 어렵고 해석도 복잡한 건강검진결과지 !\nMyMedi가 자동 분석하여 위험 수치와 주요 질환 가능성, 생활습관 개선 포인트까지 한눈에 제공합니다.'
    },
    {
      title: 'AI 추천 건강관리법 ',
      subtitle: '개인 맞춤형 AI 건강관리 서비스',
      description: '나만의 건강 데이터를 AI가 분석하여\n맞춤형 운동, 식단, 생활습관 개선 방안을 제시합니다.'
    },
    {
      title: '마이메디 전문가 매칭',
      subtitle: '건강 관리를 위한 효율적인 전문가 매칭 서비스',
      description: '건강관리사, 영양사, 웰니스 코치 등 내 건강 상태에 딱 맞는 전문가와 연결됩니다.\n스스로 하는 건강관리! 전문가의 도움으로 더 체계적으로 만들어가세요!'
    },
    {
      title: '건강관리 캘린더',
      subtitle: '전문가와 함께 건강관리 공유 캘린더 서비스',
      description: '실천가능한 건강 미션부터 식단, 운동, 생활습관 체크까지\n전문가와 함께 만드는 실천형 캘린더'
    }
  ];

  return (
    <div className="w-full max-w-[81.7rem] xl:max-w-[81.7rem] mx-auto px-4 pt-16 xl:pt-16 md:max-w-full md:pt-12 md:px-6 sm:pt-10 sm:px-4">
      <div className="flex flex-col items-center gap-8 xl:gap-8 md:gap-6 sm:gap-4">
        <h2 className="text-xl xl:text-[1.4rem] font-semibold text-[#121218] leading-[2.17] xl:leading-[2.17] tracking-[-3%] text-center md:text-xl md:leading-[1.8] sm:text-lg sm:leading-[1.6]">
          서비스 소개
        </h2>
        
        <div className="flex flex-col gap-20 xl:gap-20 w-full md:gap-12 sm:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection; 