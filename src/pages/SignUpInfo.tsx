import React from "react";
import SignUpInfo from "../components/SignUp/Info";
import { FiChevronLeft } from "react-icons/fi";
import Stepper from "../components/SignUp/Stepper";
import { useLocation, useNavigate } from "react-router-dom";

const SignUpInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType;

  const handleNext = () => {
    if (userType === "expert") {
      navigate("/expert-info", { state: { userType } });
    } else {
      navigate("/signup-complete", { state: { userType } });
    }
  };

  const handlePrev = () => {
    navigate("/terms-agreement", { state: { userType } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="mt-20 relative w-full mb-10 flex items-center justify-center">
        <button type="button" className="absolute left-[184px]" onClick={handlePrev}>
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
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default SignUpInfoPage;
