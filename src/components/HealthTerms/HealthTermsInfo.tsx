import React from 'react';

interface HealthTerm {
  id: string;
  name: string;
  description: string;
  quote: string;
}

interface HealthTermInfoProps {
  selectedTerm: string;
  healthTerms: HealthTerm[];
}

const HealthTermInfo: React.FC<HealthTermInfoProps> = ({ selectedTerm, healthTerms }) => {
  const selectedTermData = healthTerms.find(term => term.id === selectedTerm);
  
  if (!selectedTermData) return null;

  return (
    <div className="mb-[60px]">
      <div className="max-w-[1300px] mx-auto">
        {/* 인용구 */}
        <div className="text-center mb-[24px]">
          <p className="text-[20px] text-[#1D68FF] font-medium">
            {selectedTermData.quote}
          </p>
        </div>
        
        {/* 구분선 */}
        <div className="w-full h-[1px] bg-[#1D68FF] mb-[32px]"></div>
        
        {/* 선택된 용어 정보 */}
        <div className="flex flex-col items-center">
          {/* 설명을 문장별로 분리해서 표시 */}
          <div className="text-[18px] text-[#374151] leading-[1.8] mb-[12px] text-center">
            {(() => {
              if (selectedTermData.id === 'B형 간염') {
                // B형 간염의 경우 특별한 처리
                const sentences = selectedTermData.description.split(/\.(?=\s|$)/).filter(sentence => sentence.trim());
                return sentences.map((sentence, index) => {
                                     if (sentence.includes('항원(-) 항체(-)')) {
                     // 항원(-) 항체(-) 부분은 다음 문장과 합쳐서 표시
                     const nextSentence = sentences[index + 1];
                     if (nextSentence && nextSentence.includes('예방접종')) {
                       return (
                         <p key={index} className="mb-[12px] text-left">
                           <span dangerouslySetInnerHTML={{
                             __html: (sentence.trim() + '. ' + nextSentence.trim()).replace(
                               /(\d+~?\d*mg\/dL|\d+~?\d*IU\/L|\d+~?\d*g\/dL|\d+~?\d*mL\/min\/1\.73m²|\d+)/g,
                               '<strong>$1</strong>'
                             ).replace(
                               /(항원\([+-]\) 항체\([+-]\)|항원\([+-]\))/g,
                               '<strong>$1</strong>'
                             ).replace(
                               /(남자 기준|여자 기준|남자는|여자는|이하|이상|아래로 내려가면)/g,
                               '<strong>$1</strong>'
                             )
                           }} />.
                         </p>
                       );
                     }
                   }
                   if (sentence.includes('예방접종') && sentences[index - 1] && sentences[index - 1].includes('항원(-) 항체(-)')) {
                     // 이미 위에서 처리했으므로 건너뛰기
                     return null;
                   }
                   if (sentence.includes('항원')) {
                     return (
                       <p key={index} className="mb-[12px] text-left">
                         <span dangerouslySetInnerHTML={{
                           __html: sentence.trim().replace(
                             /(\d+~?\d*mg\/dL|\d+~?\d*IU\/L|\d+~?\d*g\/dL|\d+~?\d*mL\/min\/1\.73m²|\d+)/g,
                             '<strong>$1</strong>'
                           ).replace(
                             /(항원\([+-]\) 항체\([+-]\)|항원\([+-]\))/g,
                             '<strong>$1</strong>'
                           ).replace(
                             /(남자 기준|여자 기준|남자는|여자는|이하|이상|아래로 내려가면)/g,
                             '<strong>$1</strong>'
                           )
                         }} />.
                       </p>
                     );
                   }
                   if (sentence.includes('하지만 걱정하지 마세요')) {
                     return (
                       <p key={index} className="mb-[32px]">
                         <span dangerouslySetInnerHTML={{
                           __html: sentence.trim().replace(
                             /(\d+~?\d*mg\/dL|\d+~?\d*IU\/L|\d+~?\d*g\/dL|\d+~?\d*mL\/min\/1\.73m²|\d+)/g,
                             '<strong>$1</strong>'
                           ).replace(
                             /(항원\([+-]\) 항체\([+-]\)|항원\([+-]\))/g,
                             '<strong>$1</strong>'
                           ).replace(
                             /(남자 기준|여자 기준|남자는|여자는|이하|이상|아래로 내려가면)/g,
                             '<strong>$1</strong>'
                           )
                         }} />.
                       </p>
                     );
                   }
                  return (
                    <p key={index} className={` last:mb-0 ${index === 0 ? 'font-bold mb-[24px]' : 'mb-[12px]'}`}>
                      <span dangerouslySetInnerHTML={{
                        __html: sentence.trim().replace(
                          /(\d+~?\d*mg\/dL|\d+~?\d*IU\/L|\d+~?\d*g\/dL|\d+~?\d*mL\/min\/1\.73m²|\d+)/g,
                          '<strong>$1</strong>'
                        ).replace(
                          /(항원\([+-]\) 항체\([+-]\)|항원\([+-]\))/g,
                          '<strong>$1</strong>'
                        ).replace(
                          /(남자 기준|여자 기준|남자는|여자는|이하|이상|아래로 내려가면)/g,
                          '<strong>$1</strong>'
                        )
                      }} />.
                    </p>
                  );
                }).filter(Boolean);
              } else {
                // 다른 용어들은 기존 방식대로 처리
                return selectedTermData.description.split(/\.(?=\s|$)/).filter(sentence => sentence.trim()).map((sentence, index) => (
                  <p key={index} className={` last:mb-0 ${index === 0 ? 'font-bold mb-[24px]' : 'mb-[12px]'}`}>
                    <span dangerouslySetInnerHTML={{
                      __html: sentence.trim().replace(
                        /(\d+~?\d*mg\/dL|\d+~?\d*IU\/L|\d+~?\d*g\/dL|\d+~?\d*mL\/min\/1\.73m²|\d+)/g,
                        '<strong>$1</strong>'
                      ).replace(
                        /(항원\([+-]\) 항체\([+-]\)|항원\([+-]\))/g,
                        '<strong>$1</strong>'
                      ).replace(
                        /(남자 기준|여자 기준|남자는|여자는|이하|이상|아래로 내려가면)/g,
                        '<strong>$1</strong>'
                      )
                    }} />.
                  </p>
                ));
              }
            })()}
          </div>
          

          
          {/* 전문가 찾기 버튼 */}
          <div className="flex justify-end">
            <button className="mt-[60px] text-[20px] w-[300px] h-[60px] inline-flex items-center justify-center gap-[8px] px-[24px] py-[12px] bg-white text-[#121218] border border-[#1D68FF] rounded-[60px] font-medium hover:bg-[#F8F9FA] transition-colors">
              건강관리 전문가 찾기
              <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTermInfo; 