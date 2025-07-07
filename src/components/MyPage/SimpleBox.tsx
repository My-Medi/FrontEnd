import React from "react";

interface SimpleBoxProps {
  children?: React.ReactNode;
  className?: string;
}

const SimpleBox: React.FC<SimpleBoxProps> = ({ children, className }) => {
  return (
    <>
      {/* 메인 콘텐츠 */}
      <div
        className={`
          box-border absolute
          w-[calc(1439*100vw/1920)] h-[calc(2493*100vw/1920)] left-[calc(357*100vw/1920)] top-[calc(292*100vw/1920)]
          bg-white border border-[#DBE6FF] rounded-[calc(60*100vw/1920)] overflow-hidden overflow-y-auto
          min-[1024px]:w-[calc(1439*100vw/1920)] min-[1024px]:h-[calc(2493*100vw/1920)] min-[1024px]:left-[calc(357*100vw/1920)] min-[1024px]:top-[calc(292*100vw/1920)]
          ${className || ""}
        `}
        style={{
          boxShadow:
            "0px 46px 18px rgba(29, 104, 255, 0.01), 0px 26px 15px rgba(29, 104, 255, 0.03), 0px 11px 11px rgba(29, 104, 255, 0.06), 0px 3px 6px rgba(29, 104, 255, 0.07)",
        }}
      >
        <div
          className="
            pl-[calc(73*100vw/1920)] pt-[calc(76*100vw/1920)] pr-[calc(73*100vw/1920)] pb-[calc(40*100vw/1920)] h-full flex flex-col
          "
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SimpleBox;
