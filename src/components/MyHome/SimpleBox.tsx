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
          m-4 flex flex-col flex-grow
          
          lg:absolute
          lg:w-[calc(1439*100vw/1920)] lg:h-[calc(2493*100vw/1920)] lg:left-[calc(357*100vw/1920)] lg:top-[calc(292*100vw/1920)]
          lg:rounded-[calc(60*100vw/1920)]
          lg:m-0
          
          ${className || ''}
        `}
        style={{
          boxShadow:
            '0px 46px 18px rgba(29, 104, 255, 0.01), 0px 26px 15px rgba(29, 104, 255, 0.03), 0px 11px 11px rgba(29, 104, 255, 0.06), 0px 3px 6px rgba(29, 104, 255, 0.07)',
        }}
      >
        {fullWidthContent}
        <div
          className='
            p-6 flex flex-col
            lg:p-0 lg:pl-[calc(73*100vw/1920)] lg:pt-[calc(76*100vw/1920)] lg:pr-[calc(73*100vw/1920)] lg:pb-[calc(40*100vw/1920)]
          '
        >
        {children}
        </div>
      </div>
    </>
  );
};

export default SimpleBox;
