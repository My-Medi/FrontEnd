import React from "react";

interface ExpertSignupProps {
  onNext: () => void;
  onPrev: () => void;
}

const ExpertSignup: React.FC<ExpertSignupProps> = ({ onNext, onPrev }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[10vh] w-full">
      <div className="mt-20 relative w-full mb-30 flex items-center justify-center">
        <button type="button" className="absolute left-[184px]" onClick={onPrev}>
          <svg
            width={31}
            height={57}
            viewBox="0 0 31 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[27px] h-[53px] text-gray-400"
            preserveAspectRatio="none"
          >
            <path
              d="M29 2L2 29.0933L29 55"
              stroke="#121218"
              strokeOpacity="0.5"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">전문가 회원가입</h2>
      </div>
      <div className="text-center">
        <p className="text-lg text-gray-600 mb-8">전문가 회원가입 페이지입니다.</p>
        <button
          className="px-8 py-3 bg-[#1D68FF] text-white rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
          onClick={onNext}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default ExpertSignup; 