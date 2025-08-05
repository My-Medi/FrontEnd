import React from 'react';

interface SimpleBoxProps {
  children?: React.ReactNode;
  fullWidthContent?: React.ReactNode; 
  className?: string;
  isBlurred?: boolean;
}

const SimpleBox: React.FC<SimpleBoxProps> = ({ children, fullWidthContent, className, isBlurred = false }) => {
  return (
    <>
      <div
        className={`
          box-border bg-white border border-[#DBE6FF] rounded-3xl overflow-hidden overflow-y-auto
          flex flex-col
          
          xl:w-[74rem] xl:rounded-[1.25rem]
          
          ${className || ''}
        `}
        style={{
          boxShadow:
            '0px 0px 3px 4px rgba(29, 104, 255, 0.03), 0px 0px 6px 10px rgba(29, 104, 255, 0.015), 0px 0px 8px 8px rgba(29, 104, 255, 0.008), 0px 0px 10px 8px rgba(29, 104, 255, 0.003), 0px 0px 12px 0px rgba(29, 104, 255, 0)',
          ...(isBlurred && {
            background: 'rgba(18, 18, 24, 0.2)'
          })
        }}
      >
        {fullWidthContent}
        {children}
      </div>
    </>
  );
};

export default SimpleBox;