import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepSelector from "../../components/SignUp/StepSelector";
import TermsAgreement from "../../components/SignUp/TermsAgreement";
import SignUpInfo from "../../components/SignUp/Info";
import ExpertInputForm from "../../components/SignUp/ExpertInputForm";
import SignUpComplete from "../../components/SignUp/SignUpComplete";
import Stepper from "../../components/SignUp/Stepper";
import backSvg from "../../assets/back.svg";

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

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    switch (currentStep) {
      case "select":
        if (!userType) return; // 선택 안 했으면 진행 안 함
        setCurrentStep("terms");
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
    // 화면 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
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
            {/* 제목 */}
            <div className="mt-[64px] mb-[96px] flex items-center justify-center w-full relative">
              {/* 뒤로가기 버튼 */}
              <button onClick={handlePrev} 
              className="absolute w-[17px] h-[35px] flex items-center justify-center bottom-[10px] left-[312px] lg:flex md:hidden sm:hidden" 
              aria-label="뒤로가기">
                <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
              </button>
              <h2 className="text-[24px] font-bold">마이메디 회원가입</h2>
            </div>
            
            <StepSelector 
              selected={userType} 
              setSelected={setUserType} 
              onSubmit={handleNext} 
            />
          </div>
        );
      case "terms":
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
            {/* 제목 */}
            <div className="mt-[64px] mb-[96px] flex items-center justify-center w-full relative">
              {/* 뒤로가기 버튼 */}
              <button onClick={handlePrev} 
              className="absolute w-[17px] h-[35px] flex items-center justify-center bottom-[10px] left-[312px] lg:flex md:hidden sm:hidden" 
              aria-label="뒤로가기">
                <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
              </button>
              <h2 className="text-2xl font-bold">마이메디 회원가입</h2>
            </div>

            {/* Stepper */}
              <Stepper currentStep={currentStep} userType={userType || undefined} />


            {/* 약관동의 폼 */}
            <TermsAgreement onNext={handleNext} onPrev={handlePrev} />
          </div>
        );
      case "info":
        return (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="mt-[64px] relative w-full mb-[96px] flex items-center justify-center">
              {/* 뒤로가기 버튼 */}
              <button onClick={handlePrev} 
              className="absolute w-[17px] h-[35px] flex items-center justify-center bottom-[10px] left-[312px] lg:flex md:hidden sm:hidden" 
              aria-label="뒤로가기">
                <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
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
            {/* 제목 */}
            <div className="mt-[64px] mb-[96px] flex items-center justify-center w-full relative">
              {/* 뒤로가기 버튼 */}
              <button onClick={handlePrev} 
              className="absolute w-[17px] h-[35px] flex items-center justify-center bottom-[10px] left-[312px] lg:flex md:hidden sm:hidden" 
              aria-label="뒤로가기">
                <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
              </button>
              <h2 className="text-2xl font-bold">마이메디 회원가입</h2>
            </div>

            {/* Stepper */}

              <Stepper currentStep={currentStep} userType={userType || undefined} />

            {/* 전문가 정보 입력 폼 */}
            <ExpertInputForm onNext={handleNext} onPrev={handlePrev} />
          </div>
        );
      case "complete":
        return (
          <div className="flex flex-col items-center justify-center w-full">
            {/* 제목 */}
            <div className="mt-[64px] mb-[96px] flex items-center justify-center w-full relative">
              {/* 뒤로가기 버튼 */}
              <button onClick={handlePrev} 
              className="absolute w-[17px] h-[35px] flex items-center justify-center bottom-[10px] left-[312px] lg:flex md:hidden sm:hidden" 
              aria-label="뒤로가기">
                <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
              </button>
              <h2 className="text-2xl font-bold">마이메디 회원가입</h2>
            </div>

            {/* Stepper */}
            <div className="mb-10">
              <Stepper currentStep={currentStep} userType={userType || undefined} />
            </div>

            {/* 회원가입 완료 */}
            <SignUpComplete />
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
