import React, { useState } from 'react';

interface HealthTerm {
  id: string;
  name: string;
  englishName?: string;
}

const HealthTermsPage: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<string>('공복혈당(FBS)');

  const healthTerms: HealthTerm[] = [
    { id: '공복혈당(FBS)', name: '공복혈당(FBS)', englishName: 'Fasting Blood Sugar' },
    { id: '혈색소(Hemoglobin)', name: '혈색소(Hemoglobin)', englishName: 'Hemoglobin' },
    { id: '총콜레스테롤', name: '총콜레스테롤', englishName: 'Total Cholesterol' },
    { id: 'LDL 콜레스테롤', name: 'LDL 콜레스테롤', englishName: 'LDL Cholesterol' },
    { id: 'HDL 콜레스테롤', name: 'HDL 콜레스테롤', englishName: 'HDL Cholesterol' },
    { id: '중성지방(Triglyceride)', name: '중성지방(Triglyceride)', englishName: 'Triglyceride' },
    { id: '혈청 크레아티닌', name: '혈청 크레아티닌', englishName: 'Serum Creatinine' },
    { id: '요단백', name: '요단백', englishName: 'Urine Protein' },
    { id: 'AST(SGOT) / ALT(SGPT)', name: 'AST(SGOT) / ALT(SGPT)' },
    { id: '신사구체여과율(eGFR)', name: '신사구체여과율(eGFR)', englishName: 'Glomerular Filtration Rate' },
    { id: 'B형 간염', name: 'B형 간염', englishName: 'Hepatitis B' },
    { id: '비활동성 폐결핵', name: '비활동성 폐결핵', englishName: 'Inactive Pulmonary Tuberculosis' },
    { id: '감마GTP(Y-GTP)', name: '감마GTP(Y-GTP)', englishName: 'Gamma-GTP' },
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1301px] mx-auto px-[60px] py-[60px]">
        <div className="text-center mb-[60px]">
          <h1 className="text-[32px] font-bold text-[#121218] leading-[1.2]">
            더 알아보고 싶은 건강용어를 선택해보세요!
          </h1>
        </div>
        
        <div className="grid grid-cols-5 gap-[16px] max-w-[1000px] mx-auto">
          {healthTerms.map((term) => (
            <button
              key={term.id}
              onClick={() => setSelectedTerm(term.id)}
              className={`
                px-[20px] py-[16px] rounded-[8px] text-[14px] rounded-full font-medium transition-all duration-200
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
        
        {selectedTerm && (
          <div className="mt-[60px] text-center">
            <div className="bg-[#F8F9FA] rounded-[12px] p-[40px] max-w-[800px] mx-auto">
              <h2 className="text-[24px] font-bold text-[#121218] mb-[16px]">
                {selectedTerm}
              </h2>
              <p className="text-[16px] text-[#6B7280] leading-[1.6]">
                선택하신 건강용어에 대한 상세한 설명이 여기에 표시됩니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthTermsPage; 