import React from "react";
import { useNavigate } from "react-router-dom";
import checkIcon from "../assets/signupcheck.png";
import Stepper from "../components/SignUp/Stepper";
import { FiChevronLeft } from "react-icons/fi";

const SignUpComplete: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="mt-20 relative w-full mb-10 flex items-center justify-center">
      <button type="button" className="absolute left-[184px]">
     <FiChevronLeft size={50} className="text-gray-400" />
      </button>
      <h2 className="text-2xl font-bold">마이메디 회원가입</h2>
    </div>
      <Stepper />
      <img src={checkIcon} alt="check" className="w-150 mb-5" />
      <button
        className="px-8 py-3 bg-[#1D68FF] text-white rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
        onClick={() => navigate("/")}
      >
        바로 로그인하기
      </button>
    </div>
  );
};

export default SignUpComplete;
