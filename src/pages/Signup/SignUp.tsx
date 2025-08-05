import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepSelector from "../../components/SignUp/StepSelector";
import SignUpInfo from "../../components/SignUp/Info";
import ExpertInputForm from "../../components/SignUp/ExpertInputForm";
import SignUpComplete from "../../components/SignUp/SignUpComplete";
import Stepper from "../../components/SignUp/Stepper";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import backSvg from "../../assets/back.svg";
import { useSignUpMutation } from "../../hooks/users/useSignUpMutation";
import type { PersonalSignUpRequest } from "../../types/user";
import TermsAgreement from "../../components/SignUp/TermsAgreement";

type SignUpStep = "select" | "terms" | "info" | "expert-info" | "complete";

const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>("select");
  const [userType, setUserType] = useState<"personal" | "expert" | null>(null);
  const [signUpData, setSignUpData] = useState({
    name: "",
    birthDate: "",
    gender: "MALE" as "MALE" | "FEMALE",
    nickname: "",
    loginId: "",
    password: "",
    passwordCheck: "",
    email: "",
    emailDomain: "직접입력",
    phoneNumber: "",
    profileImgUrl: "",
  });
  const navigate = useNavigate();

  // 회원가입 뮤테이션
  const signUpMutation = useSignUpMutation({
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
      // 성공 시 complete 단계로 이동
      setCurrentStep("complete");
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      // 에러 처리 (나중에 모달이나 토스트로 표시)
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 회원가입 데이터를 API 형식으로 변환
  const transformSignUpData = (): PersonalSignUpRequest => {
    // 생년월일 유효성 검사
    if (!signUpData.birthDate) {
      throw new Error('생년월일을 입력해주세요.');
    }

    // 이메일 도메인 처리
    const email = signUpData.emailDomain === "직접입력" 
      ? signUpData.email 
      : `${signUpData.email}@${signUpData.emailDomain}`;

    const apiData = {
      name: signUpData.name,
      birthDate: signUpData.birthDate, // 입력받은 그대로 사용
      gender: signUpData.gender,
      nickname: signUpData.nickname,
      email,
      phoneNumber: signUpData.phoneNumber,
      loginId: signUpData.loginId,
      password: signUpData.password,
      profileImgUrl: signUpData.profileImgUrl || "",
    };

    console.log('회원가입 데이터 변환:', {
      original: signUpData,
      transformed: apiData
    });
    
    // API 요청 전 최종 데이터 확인
    console.log('최종 API 요청 데이터:', JSON.stringify(apiData, null, 2));

    return apiData;
  };

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
          // 개인 회원가입인 경우 API 호출
          if (signUpData.password === signUpData.passwordCheck) {
            try {
              const apiData = transformSignUpData();
              signUpMutation.mutate(apiData);
            } catch (error) {
              console.error('데이터 변환 오류:', error);
              alert(error instanceof Error ? error.message : '입력 데이터를 확인해주세요.');
            }
          } else {
            alert('비밀번호를 확인해주세요.');
          }
        }
        break;
      case "expert-info":
        setCurrentStep("complete");
        break;
      case "complete":
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
    console.log("아이디 확인:", signUpData.loginId);
  };

  const renderCurrentStep = () => {
    // 로딩 중일 때 스피너 표시
    if (signUpMutation.isPending) {
      return <LoadingSpinner />;
    }

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
            <SignUpComplete userType={userType || undefined} />
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
