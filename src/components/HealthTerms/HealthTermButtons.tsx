import React from 'react';

interface HealthTerm {
  id: string;
  name: string;
  description: string;
  quote: string;
}

interface HealthTermButtonsProps {
  healthTerms: HealthTerm[];
  selectedTerm: string;
  onTermSelect: (termId: string) => void;
}

const HealthTermButtons: React.FC<HealthTermButtonsProps> = ({ 
  healthTerms, 
  selectedTerm, 
  onTermSelect 
}) => {
  return (
    <div className=" mx-auto">
      {/* 첫 번째 줄 (6개) */}
      <div className="flex flex-wrap gap-[14px] mb-[40px] justify-center">
        {healthTerms.slice(0, 6).map((term) => (
          <button
            key={term.id}
            onClick={() => onTermSelect(term.id)}
            className={`
              px-[20px] py-[12px] rounded-[36px] text-[14px] font-medium transition-all duration-200 whitespace-nowrap
              ${selectedTerm === term.id
                ? 'bg-[#1D68FF] text-white shadow-md'
                : 'bg-white text-[#121218] border border-[#E5E7EB] hover:border-[#1D68FF] hover:shadow-sm'
              }
            `}
          >
            {term.name}
          </button>
        ))}
      </div>
      
      {/* 두 번째 줄 (7개) */}
      <div className="flex flex-wrap gap-[14px] justify-center">
        {healthTerms.slice(6).map((term) => (
          <button
            key={term.id}
            onClick={() => onTermSelect(term.id)}
            className={`
              px-[20px] py-[12px] rounded-[36px] text-[14px] font-medium transition-all duration-200 whitespace-nowrap
              ${selectedTerm === term.id
                ? 'bg-[#1D68FF] text-white shadow-md'
                : 'bg-white text-[#121218] border border-[#E5E7EB] hover:border-[#1D68FF] hover:shadow-sm'
              }
            `}
          >
            {term.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HealthTermButtons; 