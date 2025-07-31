import React from "react";
import nextIcon from "../../../assets/Myhome/next.svg";

interface ActionButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick, className = "" }) => {
  return (
    <div className="flex justify-end pr-11">
      <button
        onClick={onClick}
        className={`flex items-center gap-4 text-[#1D68FF] font-normal text-base leading-[22px] tracking-[-0.16px] ${className}`}
      >
        <span>{text}</span>
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