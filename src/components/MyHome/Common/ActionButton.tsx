import React from "react";
import nextIcon from "../../../assets/Myhome/next.svg";

interface ActionButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick, className = "" }) => {
  return (
    <div className="flex justify-end pr-4 md:pr-8 lg:pr-11">
      <button
        onClick={onClick}
        className={`flex items-center gap-2 md:gap-3 lg:gap-4 text-[#1D68FF] font-normal text-sm md:text-base leading-[22px] tracking-[-0.16px] ${className}`}
      >
        <span className="hidden sm:inline">{text}</span>
        <span className="sm:hidden">자세히</span>
        <img
          src={nextIcon}
          alt="다음"
          className="w-3 h-6"
        />
      </button>
    </div>
  );
};

export default ActionButton; 