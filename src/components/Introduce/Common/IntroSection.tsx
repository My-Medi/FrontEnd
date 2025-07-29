import React from 'react';

interface IntroSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  descriptions: string[];
  backIconSrc?: string;
  onBackClick?: () => void;
  showBackButton?: boolean;
  imagePosition?: 'left' | 'right';
  className?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  descriptions,
  backIconSrc,
  onBackClick,
  showBackButton = false,
  imagePosition = 'left',
  className = ''
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* 배경 효과 - 전체 너비 */}
      <div 
        className="absolute inset-0 w-full"
        style={{
          background: 'linear-gradient(180deg, rgba(29, 104, 255, 0.2) -3.73%, rgba(255, 255, 255, 0.2) 100%)',
          filter: 'blur(5px)',
          zIndex: 0,
        }}
      />
      
      {/* 콘텐츠 - 중앙 정렬 */}
      <div className="relative px-4 lg:px-8 xl:px-16" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          {/* 이미지와 텍스트를 묶은 컨테이너 */}
          <div className={`flex flex-col lg:flex-row lg:items-end gap-4 relative ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}>
            {/* 이미지 - 왼쪽 또는 오른쪽 */}
            <div className={`mt-8 relative flex justify-center lg:justify-start ${imagePosition === 'right' ? 'lg:justify-end' : ''}`}>
              {/* Back 아이콘 */}
              {showBackButton && backIconSrc && onBackClick && (
                <div className={`absolute -left-8 md:-left-10 lg:-left-14 top-2 md:top-3 lg:top-4 cursor-pointer hidden md:block ${imagePosition === 'right' ? 'lg:-right-14 lg:left-auto' : ''}`} onClick={onBackClick}>
                  <img 
                    src={backIconSrc} 
                    alt="Back" 
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14"
                  />
                </div>
              )}
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
              />
            </div>
            
            {/* 텍스트 설명 */}
            <div className="flex-1 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mb-20 px-4 lg:px-0">
              <h2 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-[#1D68FF] mb-2 leading-tight md:leading-snug lg:leading-9 tracking-tight">
                {title}
              </h2>
              <p className="text-base md:text-lg lg:text-xl xl:text-xl font-semibold text-[#4D5053] mb-4 md:mb-6 lg:mb-8 leading-relaxed md:leading-snug lg:leading-9 tracking-tight">
                {subtitle}
              </p>
              <div>
                {descriptions.map((description, index) => (
                  <p 
                    key={index}
                    className="text-sm md:text-base lg:text-lg xl:text-lg text-[#4D5053] leading-relaxed md:leading-snug lg:leading-9 tracking-tight font-medium"
                  >
                    {description}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection; 