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
    }
  };

  return (
    <div 
      className="w-full rounded-[20px] cursor-pointer box-border lg:rounded-[20px] md:rounded-[16px] sm:rounded-[12px]"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2 pl-[72px] pt-[41px] pr-10 pb-10 lg:pl-[72px] lg:pt-[41px] lg:pr-10 lg:pb-10 md:pl-8 md:pt-8 md:pr-6 md:pb-8 sm:pl-6 sm:pt-6 sm:pr-4 sm:pb-6">
        <div className="flex flex-col gap-2 lg:gap-2 md:gap-1.5 sm:gap-1">
          <h3 className="text-[28px] font-semibold text-[#1D68FF] leading-[1.43] tracking-[-3%] lg:text-[28px] md:text-2xl sm:text-xl lg:leading-[1.43] md:leading-[1.3] sm:leading-[1.2]">
            {title}
          </h3>
          <p className="text-[24px] font-medium text-[#121218] leading-[1.19] tracking-[-3%] lg:text-[24px] md:text-lg sm:text-base lg:leading-[1.19] md:leading-[1.3] sm:leading-[1.4]">
            {subtitle}
          </p>
        </div>
        <p className="text-[18px] font-normal text-[#121218] leading-[1.5] tracking-[-3%] whitespace-pre-line lg:text-[18px] md:text-base sm:text-sm lg:leading-[1.5] md:leading-[1.6] sm:leading-[1.7]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard; 