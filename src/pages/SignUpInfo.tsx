import React from "react";
import SignUpInfo from "../components/SignUp/Info";
import { FiChevronLeft } from "react-icons/fi";
import Stepper from "../components/SignUp/Stepper";

const SignUpInfoPage: React.FC = () => {
  return (  
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
    <div className="mt-20 relative w-full mb-10 flex items-center justify-center">
      <button type="button" className="absolute left-[184px]">
     <FiChevronLeft size={50} className="text-gray-400" />
      </button>
      <h2 className="text-2xl font-bold">마이메디 회원가입</h2>
    </div>
    <Stepper />
      <SignUpInfo 
        values={{
          name: "",
          birth: "",
          gender: "male",
          nickname: "",
          id: "",
          password: "",
          passwordCheck: "",
          email: "",
          emailDomain: "직접입력",
          phone: "",
          agree: false,
        }}
        onChange={() => {}}
        onCheckNickname={() => {}}
        onCheckId={() => {}}
        onPrev={() => {}}
        onNext={() => {}}
      />
    </div>
  );
};

export default SignUpInfoPage;
