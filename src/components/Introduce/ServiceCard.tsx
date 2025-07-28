import React, { useState } from 'react';

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

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0px 46px 18px rgba(29, 104, 255, 0.01), 0px 26px 15px rgba(29, 104, 255, 0.03), 0px 11px 11px rgba(29, 104, 255, 0.06), 0px 3px 6px rgba(29, 104, 255, 0.07)',
    borderRadius: '20px',
    border: isHovered ? '3px solid #1D68FF' : '3px solid #ffffff',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box' as const
  };

  return (
    <div 
      className="w-full rounded-[20px] cursor-pointer box-border"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-2 pl-[72px] pt-[41px] pr-10 pb-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-[28px] font-semibold text-[#1D68FF] leading-[1.43] tracking-[-3%]">
            {title}
          </h3>
          <p className="text-[24px] font-medium text-[#121218] leading-[1.19] tracking-[-3%]">
            {subtitle}
          </p>
        </div>
        <p className="text-[18px] font-normal text-[#121218] leading-[1.5] tracking-[-3%] whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard; 