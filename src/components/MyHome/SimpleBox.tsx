import React from 'react';

interface SimpleBoxProps {
  children?: React.ReactNode;
  fullWidthContent?: React.ReactNode; 
  className?: string;
}

const SimpleBox: React.FC<SimpleBoxProps> = ({ children, fullWidthContent, className }) => {
  return (
    <>
      <div
        className={`
          box-border bg-white border border-[#DBE6FF] rounded-3xl overflow-hidden overflow-y-auto
          m-4 flex flex-col
          
          lg:max-w-[1439px] lg:mb-8 lg:rounded-[60px]
          
          ${className || ''}
        `}
        style={{
          boxShadow:
            '0px 46px 18px rgba(29, 104, 255, 0.01), 0px 26px 15px rgba(29, 104, 255, 0.03), 0px 11px 11px rgba(29, 104, 255, 0.06), 0px 3px 6px rgba(29, 104, 255, 0.07)',
        }}
      >
        {fullWidthContent}
        {children}
      </div>
    </>
  );
};

export default SimpleBox;
