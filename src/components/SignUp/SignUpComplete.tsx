import React from "react";
import checkIcon from "../../assets/SignUp/signupcheck.png";

interface SignUpCompleteProps {
  onPrev: () => void;
  onComplete: () => void;
}

const SignUpComplete: React.FC<SignUpCompleteProps> = ({ onPrev, onComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <img src={checkIcon} alt="check" className="w-200 mb-8" />
      <button
        className="w-[380px] px-20 py-5 rounded-[60px] cursor-pointer bg-[#1d68ff] text-[32px] text-white font-semibold"
        onClick={onComplete}
      >
        바로 로그인하기
      </button>
    </div>
  );
};

export default SignUpComplete; 