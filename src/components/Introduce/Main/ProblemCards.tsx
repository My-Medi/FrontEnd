import React from 'react';

const ProblemCards: React.FC = () => {
  const problems = [
    {
      text: "",
      isEmpty: true
    },
    {
      text: "건강검진 받았지만, 무슨 의미인지 뭘 해야 할지 모르겠어요.",
      isEmpty: false
    },
    {
      text: "",
      isEmpty: true
    },
    {
      text: "",
      isEmpty: true
    },
    {
      text: "내 건강을 더 정확히 분석하고 싶어요!",
      isEmpty: false
    },
    {
      text: "",
      isEmpty: true
    },
    {
      text: "",
      isEmpty: true
    },
    {
      text: "운동, 식단, 습관... 어디서부터 시작해야 할까요?",
      isEmpty: false
    },
    {
      text: "",
      isEmpty: true
    }
  ];

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="pb-[75px] lg:pb-[75px] md:pb-16 sm:pb-12">
        {/* 문제 상황 카드들 */}
        <div className="grid grid-cols-3 gap-x-[84px] gap-y-[56px] justify-items-center lg:grid-cols-3 lg:gap-x-[84px] lg:gap-y-[56px] md:grid-cols-2 md:gap-x-8 md:gap-y-8 sm:grid-cols-1 sm:gap-x-4 sm:gap-y-6">
          {problems.map((problem, index) => {
            const baseClasses = `flex justify-center items-center rounded-[60px] gap-[10px] ${problem.isEmpty ? 'w-[607px] h-[69px]' : ''}`;
            const shadowClasses = 'shadow-[0px_46px_18px_rgba(29,104,255,0.01),0px_26px_15px_rgba(29,104,255,0.03),0px_11px_11px_rgba(29,104,255,0.06),0px_3px_6px_rgba(29,104,255,0.07)]';
            
            const paddingClasses = problem.isEmpty ? 'p-0' : 'py-5 px-[30px]';
            
            const responsiveClasses = `
              lg:rounded-[60px]
              md:rounded-[40px] md:${problem.isEmpty ? 'p-0' : 'py-4 px-6'}
              sm:rounded-[30px] sm:${problem.isEmpty ? 'p-0' : 'py-3 px-4'}
            `;

            return (
              <div
                key={index}
                className={`${baseClasses} ${paddingClasses} ${shadowClasses} ${responsiveClasses}`}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.70)' }}
              >
                {!problem.isEmpty && (
                  <p className="text-[22px] font-medium text-[#121218] leading-[1.19] tracking-[-3%] text-center font-pretendard lg:text-[22px] md:text-lg sm:text-base lg:leading-[1.19] md:leading-[1.3] sm:leading-[1.4]">
                    {problem.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProblemCards; 