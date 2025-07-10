import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import StepSelector from "../../components/SignUp/StepSelector";
import TermsAgreement from "../../components/SignUp/TermsAgreement";
import SignUpInfo from "../../components/SignUp/Info";
import ExpertInputForm from "../../components/SignUp/ExpertInputForm";
import SignUpComplete from "../../components/SignUp/SignUpComplete";
import ExpertSignup from "../../components/SignUp/ExpertSignup";
import Stepper from "../../components/SignUp/Stepper";

type SignUpStep = "select" | "terms" | "info" | "expert-info" | "complete";

const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>("select");
  const [userType, setUserType] = useState<"personal" | "expert" | null>(null);
  const [signUpData, setSignUpData] = useState({
    name: "",
    birth: "",
    gender: "male" as "male" | "female",
    nickname: "",
    id: "",
    password: "",
    passwordCheck: "",
    email: "",
    emailDomain: "직접입력",
    phone: "",
    agree: false,
  });
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: "personal" | "expert") => {
    setUserType(type);
    setCurrentStep("terms");
  };

  const handleNext = () => {
    switch (currentStep) {
      case "select":
        // 이미 handleUserTypeSelect에서 처리됨
        break;
      case "terms":
        setCurrentStep("info");
        break;
      case "info":
        if (userType === "expert") {
          setCurrentStep("expert-info");
        } else {
          setCurrentStep("complete");
        }
        break;
      case "expert-info":
        setCurrentStep("complete");
        break;
      case "complete":
        navigate("/");
        break;
    }
  };

  const handlePrev = () => {
    switch (currentStep) {
      case "select":
        navigate(-1);
        break;
      case "terms":
        setCurrentStep("select");
        break;
      case "info":
        setCurrentStep("terms");
        break;
      case "expert-info":
        setCurrentStep("info");
        break;
      case "complete":
        if (userType === "expert") {
          setCurrentStep("expert-info");
        } else {
          setCurrentStep("info");
        }
        break;
    }
  };

  const handleDataChange = (field: string, value: string | boolean) => {
    setSignUpData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckNickname = () => {
    // 닉네임 중복 확인 로직
    console.log("닉네임 확인:", signUpData.nickname);
  };

  const handleCheckId = () => {
    // 아이디 중복 확인 로직
    console.log("아이디 확인:", signUpData.id);
  };

  const handleComplete = () => {
    // 회원가입 완료 처리
    console.log("회원가입 완료:", signUpData);
    navigate("/");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "select":
        return (
          <div className="flex flex-col items-center justify-center min-h-[10vh] w-full">
            <div className="mt-20 relative w-full mb-30 flex items-center justify-center">
              <button type="button" className="absolute left-[184px]" onClick={handlePrev}>
                <FiChevronLeft size={50} className="text-gray-400" />
              </button>
              <h2 className="text-2xl font-bold">마이메디 회원가입</h2>
            </div>
            <StepSelector 
              selected={userType} 
              setSelected={(type) => handleUserTypeSelect(type as "personal" | "expert")} 
              onSubmit={handleNext} 
            />
          </div>
        );
      case "terms":
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
            <Stepper currentStep={currentStep} userType={userType || undefined} />
            <TermsAgreement onNext={handleNext} onPrev={handlePrev} />
          </div>
        );
      case "info":
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
            <div className="mt-20 relative w-full mb-10 flex items-center justify-center">
              <button type="button" className="absolute left-[184px]" onClick={handlePrev}>
                <FiChevronLeft size={50} className="text-gray-400" />
              </button>
              <h2 className="text-2xl font-bold">마이메디 회원가입</h2>
            </div>
            <Stepper currentStep={currentStep} userType={userType || undefined} />
            <SignUpInfo
              values={signUpData}
              onChange={handleDataChange}
              onCheckNickname={handleCheckNickname}
              onCheckId={handleCheckId}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>
        );
      case "expert-info":
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
            <Stepper currentStep={currentStep} userType={userType || undefined} />
            <ExpertInputForm onNext={handleNext} onPrev={handlePrev} />
          </div>
        );
      case "complete":
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
            <Stepper currentStep={currentStep} userType={userType || undefined} />
            <SignUpComplete onPrev={handlePrev} onComplete={handleComplete} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderCurrentStep()}
    </div>
  );
};

export default SignUp;
