import React from 'react';
import FeaturesList from './FeaturesList';
import CTAButton from './CTAButton';

interface ServiceIntroPageProps {
  // FeaturesList props
  features: Array<{ text: string }>;
  
  // CTAButton props
  ctaDescription?: string;
  onCTAClick: () => void;

  combinedImageSrc?: string;
  combinedImageAlt?: string;
  combinedImageWidth?: string;
  combinedImageHeight?: string;
  
  // Optional styling
  className?: string;
}

const ServiceIntroPage: React.FC<ServiceIntroPageProps> = ({
  features,
  ctaDescription,
  onCTAClick,
  combinedImageSrc,
  combinedImageAlt,
  combinedImageWidth,
  combinedImageHeight,
  className = ''
}) => {
  return (
    <div className={`mx-auto ${className}`}>
      <FeaturesList features={features} />
      {combinedImageSrc && (
        <div className="flex justify-center pb-0">
          <img 
            src={combinedImageSrc} 
            alt={combinedImageAlt || 'Combined image'} 
            className="object-fill w-full max-w-[1920px]"
            style={{
              width: combinedImageWidth,
              height: combinedImageHeight,
              imageRendering: 'crisp-edges'
            }}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <CTAButton 
        description={ctaDescription} 
        onClick={onCTAClick} 
      />
    </div>
  );
};

export default ServiceIntroPage; 