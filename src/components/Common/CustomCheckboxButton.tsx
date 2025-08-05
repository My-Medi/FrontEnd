import React from "react";

interface CustomCheckboxButtonProps {
  checked: boolean;
  onClick: () => void;
  label: string;
}

const CustomCheckboxButton: React.FC<CustomCheckboxButtonProps> = ({ checked, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center space-x-2 focus:outline-none"
    tabIndex={0}
  >
    {checked ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect width="20" height="20" rx="5.33" fill="#1D68FF"/>
        <path d="M6 9.69L9.12 12.67L14 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="0.33" y="0.33" width="19.33" height="19.33" rx="5" fill="white"/>
        <rect x="0.33" y="0.33" width="19.33" height="19.33" rx="5" stroke="#9DA0A3"/>
        <path d="M6 9.69L9.12 12.67L14 8" stroke="#9DA0A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
    <span className={checked ? "text-black" : "text-gray-600"}>{label}</span>
  </button>
);

export default CustomCheckboxButton;
