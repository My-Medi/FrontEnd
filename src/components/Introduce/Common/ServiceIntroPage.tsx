import React from 'react';
import IntroSection from './IntroSection';
import FeaturesList from './FeaturesList';
import CTAButton from './CTAButton';

interface ServiceIntroPageProps {
  // IntroSection props
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  descriptions: string[];
  backIconSrc?: string;
  onBackClick?: () => void;
  showBackButton?: boolean;
  imagePosition?: 'left' | 'right';
  
  // FeaturesList props
  features: Array<{ text: string }>;
  
  // CTAButton props
  ctaDescription?: string;
  onCTAClick: () => void;
  
  // Combined image (replaces individual additional images)
  combinedImageSrc?: string;
  combinedImageAlt?: string;
  combinedImageWidth?: string;
  combinedImageHeight?: string;
  
  // Bottom image
  bottomImageSrc?: string;
  bottomImageAlt?: string;
  
  // Optional styling
  className?: string;
}

const ServiceIntroPage: React.FC<ServiceIntroPageProps> = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  descriptions,
  backIconSrc,
  onBackClick,
  showBackButton = false,
  imagePosition = 'left',
  features,
  ctaDescription,
  onCTAClick,
  combinedImageSrc,
  combinedImageAlt,
  combinedImageWidth,
  combinedImageHeight,
  bottomImageSrc,
  bottomImageAlt,
  className = ''
}) => {
  return (
    <div className={`mx-auto ${className}`}>
      <IntroSection
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        title={title}
        subtitle={subtitle}
        descriptions={descriptions}
        backIconSrc={backIconSrc}
        onBackClick={onBackClick}
        showBackButton={showBackButton}
        imagePosition={imagePosition}
      />
      <FeaturesList features={features} />
      {combinedImageSrc && (
        <div className="flex justify-center pt-10 pb-0">
          <img 
            src={combinedImageSrc} 
            alt={combinedImageAlt || 'Combined image'} 
            className="object-fill w-full max-w-none"
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
      {bottomImageSrc ? (
        <div className="relative">
          <img 
            src={bottomImageSrc} 
            alt={bottomImageAlt || 'Bottom image'} 
            className="w-full object-contain"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center pt-6">
            <CTAButton description={ctaDescription} onClick={onCTAClick} />
          </div>
        </div>
      ) : (
        <CTAButton description={ctaDescription} onClick={onCTAClick} />
      )}
    </div>
  );
};

export default ServiceIntroPage; 