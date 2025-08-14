import React from 'react';

interface ActionButtonsProps {
  onUpdate?: () => void;
  isLoading?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onUpdate, isLoading = false }) => {
  return (
    <div className="flex justify-center items-center mt-15 xl:mt-[3.8rem]">
      <button 
        onClick={onUpdate}
        disabled={isLoading}
        className={`w-full xl:w-[18.8rem] h-15 xl:h-[3.8rem] rounded-[2.25rem] xl:rounded-[2.25rem] text-lg xl:text-xl font-semibold shadow-lg transition-all ${
          isLoading 
            ? 'bg-gray-400 text-white cursor-not-allowed' 
            : 'bg-[#1D68FF] text-white hover:bg-[#0056CC]'
        }`} 
        style={{
          boxShadow: isLoading 
            ? '0px 0px 3px 3px rgba(156, 163, 175, 0.04), 0px 0px 2px 2px rgba(156, 163, 175, 0.06)'
            : '0px 0px 3px 3px rgba(29, 104, 255, 0.04), 0px 0px 2px 2px rgba(29, 104, 255, 0.08)'
        }}
      >
        {isLoading ? '수정 중...' : '수정하기'}
      </button>
    </div>
  );
};

export default ActionButtons; 