import React from 'react';

interface Feature {
  text: string;
}

interface FeaturesListProps {
  features: Feature[];
  className?: string;
  dotColor?: string;
  textColor?: string;
  borderColor?: string;
}

const FeaturesList: React.FC<FeaturesListProps> = ({
  features,
  className = '',
  dotColor = '#1D68FF',
  textColor = '#25282B',
  borderColor = '#1D68FF'
}) => {
  return (
    <div className={`border-t border-b border-[${borderColor}] py-8 md:py-12 lg:py-[69px] px-4 lg:px-8 xl:px-16 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="space-y-14">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <div className="flex items-center gap-3 md:gap-4 lg:gap-6 xl:gap-12">
                <div className="relative">
                  <div 
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dotColor }}
                  ></div>
                  {/* 점선 연결선 - 마지막 항목이 아닐 때만 표시 */}
                  {index < features.length - 1 && (
                    <div 
                      className="absolute left-1/2 top-full w-px h-14 md:h-16 lg:h-20 xl:h-24"
                      style={{
                        background: `repeating-linear-gradient(
                          to bottom,
                          ${dotColor} 0,
                          ${dotColor} 2px,
                          transparent 2px,
                          transparent 4px
                        )`,
                        transform: 'translateX(-50%)',
                        marginTop: '-1px'
                      }}
                    ></div>
                  )}
                </div>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold leading-relaxed md:leading-snug lg:leading-7 xl:leading-9 tracking-tight" style={{ color: textColor }}>
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesList; 