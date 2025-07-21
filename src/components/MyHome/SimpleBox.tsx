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
          
          lg:w-[1184px] lg:rounded-[20px]
          
          ${className || ''}
        `}
        style={{
          boxShadow:
            '0px 0px 3px 4px rgba(29, 104, 255, 0.03), 0px 0px 6px 10px rgba(29, 104, 255, 0.015), 0px 0px 8px 8px rgba(29, 104, 255, 0.008), 0px 0px 10px 8px rgba(29, 104, 255, 0.003), 0px 0px 12px 0px rgba(29, 104, 255, 0)',
        }}
      >
        {fullWidthContent}
        {children}
      </div>
    </>
  );
};

export default SimpleBox;