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
      className={`inline-flex items-center gap-2.5 xl:gap-2.5 md:gap-2 sm:gap-1.5 px-5 xl:px-5 md:px-4 sm:px-3 py-2.5 xl:py-2.5 md:py-2 sm:py-1.5 bg-white text-[#1D68FF] font-medium rounded-[3.8rem] xl:rounded-[3.8rem] md:rounded-[2.5rem] sm:rounded-[1.9rem] border-[0.6px] border-[#FFFFFF] hover:cursor-pointer font-pretendard leading-[1.193] xl:leading-[1.193] md:leading-[1.2] sm:leading-[1.3] tracking-[-3%] shadow-[0px_2px_4px_0px_rgba(29,104,255,0.1),0px_4px_8px_0px_rgba(29,104,255,0.05)] transition-all duration-200 hover:shadow-[0px_4px_8px_0px_rgba(29,104,255,0.15),0px_8px_16px_0px_rgba(29,104,255,0.1)] hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

export default CTAButton; 