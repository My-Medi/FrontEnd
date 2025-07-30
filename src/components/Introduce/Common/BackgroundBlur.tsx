import React from 'react';

interface BackgroundBlurProps {
  children: React.ReactNode;
  className?: string;
  blurIntensity?: number;
  gradientColors?: {
    start: string;
    end: string;
  };
}

const BackgroundBlur: React.FC<BackgroundBlurProps> = ({
  children,
  className = '',
  blurIntensity = 5,
  gradientColors = {
    start: 'rgba(29, 104, 255, 0.2)',
    end: 'rgba(255, 255, 255, 0.2)'
  }
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* 배경 효과 - 전체 너비 */}
      <div 
        className="absolute inset-0 w-full"
        style={{
          background: `linear-gradient(180deg, ${gradientColors.start} -3.73%, ${gradientColors.end} 100%)`,
          filter: `blur(${blurIntensity}px)`,
          zIndex: 0,
        }}
      />
      
      {/* 콘텐츠 */}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundBlur; 