import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  subtitle, 
  description
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.90)',
    boxShadow: '0px 3px 6px 0px #1D68FF12, 0px 11px 11px 0px #1D68FF0F, 0px 26px 15px 0px #1D68FF08, 0px 46px 18px 0px #1D68FF03, 0px 71px 20px 0px #1D68FF00',
    borderRadius: '20px',
    border: isHovered ? '3px solid #1D68FF' : '3px solid #ffffff',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box' as const
  };

  const handleClick = () => {
    if (title === '건강관리 캘린더') {
      navigate('/calendar-intro');
    } else if (title === '마이메디 전문가 매칭') {
      navigate('/expert-matching-intro');
    } else if (title === '마이메디컬리포트') {
      navigate('/medical-report-intro');
    } else if (title === 'AI 추천 건강관리법 ') {
      navigate('/ai-healthcare-intro');
    }
  };

  return (
    <div 
      className="w-full rounded-5 xl:rounded-5 cursor-pointer box-border md:rounded-4 sm:rounded-3"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2 pl-18 xl:pl-18 pt-10 xl:pt-10 pr-10 xl:pr-10 pb-10 xl:pb-10 md:pl-8 md:pt-8 md:pr-6 md:pb-8 sm:pl-6 sm:pt-6 sm:pr-4 sm:pb-6">
        <div className="flex flex-col gap-2 xl:gap-2 md:gap-1.5 sm:gap-1">
          <h3 className="text-2xl xl:text-[1.8rem] font-semibold text-[#1D68FF] leading-[1.43] xl:leading-[1.43] tracking-[-3%] md:text-2xl md:leading-[1.3] sm:text-xl sm:leading-[1.2]">
            {title}
          </h3>
          <p className="text-xl xl:text-[1.5rem] font-medium text-[#121218] leading-[1.19] xl:leading-[1.19] tracking-[-3%] md:text-lg md:leading-[1.3] sm:text-base sm:leading-[1.4]">
            {subtitle}
          </p>
        </div>
        <p className="text-lg xl:text-[1.1rem] font-normal text-[#121218] leading-[1.5] xl:leading-[1.5] tracking-[-3%] whitespace-pre-line md:text-base md:leading-[1.6] sm:text-sm sm:leading-[1.7]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard; 