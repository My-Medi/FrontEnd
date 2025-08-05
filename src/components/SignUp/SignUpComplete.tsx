import React from "react";
import { useNavigate } from "react-router-dom";
import checkIcon from "../../assets/SignUp/signupcheck.svg";

interface SignUpCompleteProps {
  userType?: "personal" | "expert";
}

const SignUpComplete: React.FC<SignUpCompleteProps> = ({ userType }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <img src={checkIcon} alt="check" className="w-200 mb-4 -mt-55" />
      {userType === "expert" && (
        <div className="text-center mb-8">
          <p className="text-[#4D5053] text-xl font-normal font-pretendard leading-[2.25] tracking-[-0.03em]">
            환자매칭 및 전문가 활동은 자격증 심사완료 후 이용가능합니다. 자격증 심사 기간은 회원가입 후 3일입니다.
          </p>
        </div>
      )}
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