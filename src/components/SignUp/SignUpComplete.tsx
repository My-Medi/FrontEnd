import React from "react";
import { useNavigate } from "react-router-dom";
import checkIcon from "../../assets/SignUp/signupcheck.png";

const SignUpComplete: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <img src={checkIcon} alt="check" className="w-200 mb-4" />
      <button
        className="w-[300px] h-[60px] px-[48px] py-[12px] rounded-[60px] cursor-pointer bg-[#1d68ff] text-[20px] text-white font-semibold hover:bg-[#1a5ae6] transition-colors"
        onClick={handleLogin}
      >
        바로 로그인하기
      </button>
    </div>
  );
};

export default SignUpComplete; 