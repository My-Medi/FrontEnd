import React from "react";
import checkIcon from "../../assets/SignUp/signupcheck.png";

interface SignUpCompleteProps {
  onPrev: () => void;
  onComplete: () => void;
}

const SignUpComplete: React.FC<SignUpCompleteProps> = ({ onPrev, onComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <img src={checkIcon} alt="check" className="w-150 mb-8" />
      <button
        className="px-8 py-3 bg-[#1D68FF] text-white rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
        onClick={onComplete}
      >
        바로 로그인하기
      </button>
    </div>
  );
};

export default SignUpComplete; 