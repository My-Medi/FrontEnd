import React from 'react';

const ProblemCards: React.FC = () => {
  const problems = [
    {
      text: "",
      className: "w-[607px] h-[69px]",
      isEmpty: true
    },
    {
      text: "건강검진 받았지만, 무슨 의미인지 뭘 해야 할지 모르겠어요.",
      className: "w-[607px]"
    },
    {
      text: "",
      className: "w-[607px] h-[69px]",
      isEmpty: true
    },
    {
      text: "",
      className: "w-[607px] h-[69px]",
      isEmpty: true
    },
    {
      text: "내 건강을 더 정확히 분석하고 싶어요!",
      className: "w-auto"
    },
    {
      text: "",
      className: "w-[607px] h-[69px]",
      isEmpty: true
    },
    {
      text: "",
      className: "w-[607px] h-[69px]",
      isEmpty: true
    },
    {
      text: "운동, 식단, 습관... 어디서부터 시작해야 할까요?",
      className: "w-auto"
    },
    {
      text: "",
      className: "w-[607px] h-[69px]",
      isEmpty: true
    }
  ];

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="pb-[75px]">
        {/* 문제 상황 카드들 */}
        <div className="grid grid-cols-3 gap-x-[84px] gap-y-[56px] justify-items-center">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`flex justify-center items-center rounded-[60px] gap-[10px] ${problem.className}`}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: problem.isEmpty ? '0' : '20px 30px',
                boxShadow: problem.isEmpty 
                  ? '0px 46px 18px rgba(29, 104, 255, 0.01), 0px 26px 15px rgba(29, 104, 255, 0.03), 0px 11px 11px rgba(29, 104, 255, 0.06), 0px 3px 6px rgba(29, 104, 255, 0.07)'
                  : '0px 3px 6px 0px rgba(29,104,255,0.07), 0px 11px 11px 0px rgba(29,104,255,0.06), 0px 26px 15px 0px rgba(29,104,255,0.03), 0px 46px 18px 0px rgba(29,104,255,0.01), 0px 71px 20px 0px rgba(29,104,255,0)'
              }}
            >
              {!problem.isEmpty && (
                <p className="text-[22px] font-medium text-[#121218] leading-[1.19] tracking-[-3%] text-center font-pretendard">
                  {problem.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemCards; 