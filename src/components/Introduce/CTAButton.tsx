import React from 'react';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  children, 
  onClick, 
  className = '' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center gap-[10px] px-[20px] py-[10px] bg-white text-[#1D68FF] text-[22px] font-medium rounded-[60px] border-[0.6px] border-[#FFFFFF] hover:cursor-pointer font-pretendard font-medium text-[22px] leading-[1.193] tracking-[-3%] shadow-[0px_2px_4px_0px_rgba(29,104,255,0.1),0px_4px_8px_0px_rgba(29,104,255,0.05)] ${className}`}
    >
      {children}
    </button>
  );
};

export default CTAButton; 