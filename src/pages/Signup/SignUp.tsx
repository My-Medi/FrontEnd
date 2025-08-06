import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StepSelector from "../../components/SignUp/StepSelector";
import SignUpInfo from "../../components/SignUp/Info";
import ExpertInputForm from "../../components/SignUp/ExpertInputForm";
import SignUpComplete from "../../components/SignUp/SignUpComplete";
import Stepper from "../../components/SignUp/Stepper";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import backSvg from "../../assets/back.svg";
import { useSignUpMutation } from "../../hooks/users/useSignUpMutation";
import { useExpertSignUpMutation } from "../../hooks/experts/useSignUpMutation";
import type { PersonalSignUpRequest } from "../../types/user";
import type { ExpertSignUpRequest, ExpertSignUpStep3Request, ExpertSpecialty } from "../../types/expert";
import TermsAgreement from "../../components/SignUp/TermsAgreement";

type SignUpStep = "select" | "terms" | "info" | "expert-info" | "complete";
type UserType = "personal" | "expert" | null;

interface SignUpFormData {
  name: string;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  nickname: string;
  loginId: string;
  password: string;
  passwordCheck: string;
  email: string;
  emailDomain: string;
  phoneNumber: string;
  profileImgUrl: string;
}

interface ExpertBasicData {
  specialty: ExpertSpecialty;
  organizationName: string;
  introduction: string;
  introSentence: string;
}

const initialSignUpData: SignUpFormData = {
  name: "",
  birthDate: "",
  gender: "MALE",
  nickname: "",
  loginId: "",
  password: "",
  passwordCheck: "",
  email: "",
  emailDomain: "직접입력",
  phoneNumber: "",
  profileImgUrl: "",
};

const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>("select");
  const [userType, setUserType] = useState<UserType>(null);
  const [signUpData, setSignUpData] = useState<SignUpFormData>(initialSignUpData);
  const [expertBasicData, setExpertBasicData] = useState<ExpertBasicData | null>(null);
  const [expertStep3Data, setExpertStep3Data] = useState<ExpertSignUpStep3Request | null>(null);
  const navigate = useNavigate();

  // 개인 회원가입 뮤테이션
  const signUpMutation = useSignUpMutation({
    onSuccess: useCallback((data: any) => {
      console.log('개인 회원가입 성공:', data);
      setCurrentStep("complete");
    }, []),
    onError: useCallback((error: any) => {
      console.error('개인 회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }, []),
  });

  // 전문가 회원가입 뮤테이션
  const expertSignUpMutation = useExpertSignUpMutation({
    onSuccess: useCallback((data: any) => {
      console.log('전문가 회원가입 성공:', data);
      setCurrentStep("complete");
    }, []),
    onError: useCallback((error: any) => {
      console.error('전문가 회원가입 실패:', error);
      alert('전문가 회원가입에 실패했습니다. 다시 시도해주세요.');
    }, []),
  });

  // 이메일 생성 함수
  const generateEmail = useCallback((email: string, emailDomain: string): string => {
    return emailDomain === "직접입력" ? email : `${email}@${emailDomain}`;
  }, []);

  // 회원가입 데이터를 API 형식으로 변환
  const transformSignUpData = useCallback((): PersonalSignUpRequest => {
    if (!signUpData.birthDate) {
      throw new Error('생년월일을 입력해주세요.');
    }

    const email = generateEmail(signUpData.email, signUpData.emailDomain);

    const apiData: PersonalSignUpRequest = {
      name: signUpData.name,
      birthDate: signUpData.birthDate,
      gender: signUpData.gender,
      nickname: signUpData.nickname,
      email,
      phoneNumber: signUpData.phoneNumber,
      loginId: signUpData.loginId,
      password: signUpData.password,
      profileImgUrl: signUpData.profileImgUrl || "",
    };

    console.log('개인 회원가입 데이터 변환:', {
      original: signUpData,
      transformed: apiData
    });
    
    return apiData;
  }, [signUpData, generateEmail]);

  // 전문가 회원가입 데이터를 API 형식으로 변환
  const transformExpertSignUpData = useCallback((): ExpertSignUpRequest => {
    if (!expertBasicData || !expertStep3Data) {
      throw new Error('전문가 정보가 없습니다.');
    }

    const email = generateEmail(signUpData.email, signUpData.emailDomain);

    const basicData = {
      name: signUpData.name,
      birthDate: signUpData.birthDate,
      gender: signUpData.gender,
      nickname: signUpData.nickname,
      email,
      phoneNumber: signUpData.phoneNumber,
      profileImgUrl: signUpData.profileImgUrl || "",
      loginId: signUpData.loginId,
      password: signUpData.password,
    };

    const step3Data = {
      specialty: expertBasicData.specialty,
      organizationName: expertBasicData.organizationName,
      introduction: expertBasicData.introduction,
      introSentence: expertBasicData.introSentence,
      careers: expertStep3Data.careers,
      licenses: expertStep3Data.licenses,
      licenseImages: expertStep3Data.licenseImages,
    };

    // 날짜 형식 변환
    const apiData: ExpertSignUpRequest = {
      member: {
        ...basicData,
        birthDate: basicData.birthDate, // 이미 YYYYMMDD 형식
      },
      specialty: step3Data.specialty,
      organizationName: step3Data.organizationName,
      introduction: step3Data.introduction,
      introSentence: step3Data.introSentence,
      careers: step3Data.careers.map((career: any) => ({
        ...career,
        startDate: career.startDate.replace('.', '-') + '-01', // YYYY.MM -> YYYY-MM-01
        endDate: career.endDate.replace('.', '-') + '-01', // YYYY.MM -> YYYY-MM-01
      })),
      licenses: step3Data.licenses.map((license: any) => ({
        ...license,
        licenseDate: license.licenseDate.replace(/\./g, '-'), // YYYY.MM.DD -> YYYY-MM-DD
      })),
      licenseImages: step3Data.licenseImages.filter((img: any) => img.imageUrl !== ''),
    };

    console.log('전문가 회원가입 데이터 변환:', {
      member: signUpData,
      expertBasic: expertBasicData,
      expertStep3: expertStep3Data,
      transformed: apiData
    });
    
    return apiData;
  }, [signUpData, expertBasicData, expertStep3Data, generateEmail]);

  // 비밀번호 확인
  const isPasswordValid = useMemo(() => {
    return signUpData.password === signUpData.passwordCheck;
  }, [signUpData.password, signUpData.passwordCheck]);

  const handleNext = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    switch (currentStep) {
      case "select":
        if (!userType) return;
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
          if (isPasswordValid) {
            try {
              const apiData = transformSignUpData();
              console.log('=== 개인 회원가입 전체 Request ===');
              console.log('Request Data:', JSON.stringify(apiData, null, 2));
              console.log('Request URL:', '/users');
              console.log('Request Method:', 'POST');
              console.log('Request Headers:', {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer [token]'
              });
              console.log('=== Request 끝 ===');
              
              // 실제 API 호출 전 전체 request 정보 출력
              console.log('=== 실제 API 호출 정보 ===');
              console.log('Request URL:', 'https://api.my-medi.cloud/api/v1/users');
              console.log('Request Method:', 'POST');
              console.log('Request Headers:', {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer [token]',
                'Accept': '*/*'
              });
              console.log('Request Body:', JSON.stringify(apiData, null, 2));
              console.log('=== 실제 API 호출 정보 끝 ===');
              
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
        // 전문가 회원가입 API 호출
        console.log('전문가 회원가입 조건 확인:', {
          isPasswordValid,
          expertBasicData: !!expertBasicData,
          expertStep3Data: !!expertStep3Data,
          expertBasicDataContent: expertBasicData,
          expertStep3DataContent: expertStep3Data,
          signUpData: {
            password: signUpData.password,
            passwordCheck: signUpData.passwordCheck
          }
        });
        
        if (isPasswordValid && expertBasicData && expertStep3Data) {
          try {
            const apiData = transformExpertSignUpData();
            console.log('=== 전문가 회원가입 전체 Request ===');
            console.log('Request Data:', JSON.stringify(apiData, null, 2));
            console.log('Request URL:', '/experts');
            console.log('Request Method:', 'POST');
            console.log('Request Headers:', {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer [token]'
            });
            console.log('=== Request 끝 ===');
            
            // 실제 API 호출 전 전체 request 정보 출력
            console.log('=== 실제 API 호출 정보 ===');
            console.log('Request URL:', 'https://api.my-medi.cloud/api/v1/experts');
            console.log('Request Method:', 'POST');
            console.log('Request Headers:', {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer [token]',
              'Accept': '*/*'
            });
            console.log('Request Body:', JSON.stringify(apiData, null, 2));
            console.log('=== 실제 API 호출 정보 끝 ===');
            
            expertSignUpMutation.mutate(apiData);
          } catch (error) {
            console.error('전문가 데이터 변환 오류:', error);
            alert(error instanceof Error ? error.message : '입력 데이터를 확인해주세요.');
          }
        } else {
          if (!isPasswordValid) {
            alert('비밀번호를 확인해주세요.');
          } else if (!expertBasicData || !expertStep3Data) {
            alert('전문가 정보를 모두 입력해주세요.');
          }
        }
        break;
      case "complete":
        break;
    }
  }, [currentStep, userType, isPasswordValid, expertBasicData, expertStep3Data, transformSignUpData, transformExpertSignUpData, signUpMutation, expertSignUpMutation]);

  const handlePrev = useCallback(() => {
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
  }, [currentStep, userType, navigate]);

  const handleDataChange = useCallback((field: string, value: string | boolean) => {
    setSignUpData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleExpertDataChange = useCallback((data: any) => {
    // 3단계에서 받은 데이터에 기본 정보가 포함되어 있으므로 분리
    const { specialty, organizationName, introduction, introSentence, careers, licenses, licenseImages } = data;
    
    // 기본 정보 저장
    const basicData = {
      specialty,
      organizationName,
      introduction,
      introSentence,
    };
    
    // 3단계 데이터 저장
    const step3Data = {
      careers,
      licenses,
      licenseImages,
    };
    
    setExpertBasicData(basicData);
    setExpertStep3Data(step3Data);
    
    console.log('전문가 데이터 저장:', {
      basic: basicData,
      step3: step3Data
    });
    
    // 데이터 저장 후 바로 API 호출
    console.log('3단계 완료 - API 호출 시작');
    if (isPasswordValid && basicData && step3Data) {
      try {
        const apiData = {
          member: {
            name: signUpData.name,
            birthDate: signUpData.birthDate,
            gender: signUpData.gender,
            nickname: signUpData.nickname,
            email: generateEmail(signUpData.email, signUpData.emailDomain),
            phoneNumber: signUpData.phoneNumber,
            profileImgUrl: signUpData.profileImgUrl || "",
            loginId: signUpData.loginId,
            password: signUpData.password,
          },
          specialty: basicData.specialty,
          organizationName: basicData.organizationName,
          introduction: basicData.introduction,
          introSentence: basicData.introSentence,
          careers: step3Data.careers.map((career: any) => ({
            ...career,
            startDate: career.startDate.replace('.', '-') + '-01', // 2020.01 -> 2020-01-01
            endDate: career.endDate.replace('.', '-') + '-01',     // 2023.12 -> 2023-12-01
          })),
          licenses: step3Data.licenses.map((license: any) => ({
            ...license,
            licenseDate: license.licenseDate.replace(/\./g, '-'), // 2022.05.24 -> 2022-05-24
          })),
          licenseImages: step3Data.licenseImages.filter((img: any) => img.imageUrl !== ''), // 빈 URL 제거
        };
        
        console.log('=== 전문가 회원가입 전체 Request ===');
        console.log('Request Data:', JSON.stringify(apiData, null, 2));
        console.log('Request URL:', '/experts');
        console.log('Request Method:', 'POST');
        console.log('Request Headers:', {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer [token]'
        });
        console.log('=== Request 끝 ===');
        expertSignUpMutation.mutate(apiData);
      } catch (error) {
        console.error('전문가 데이터 변환 오류:', error);
        alert(error instanceof Error ? error.message : '입력 데이터를 확인해주세요.');
      }
    } else {
      if (!isPasswordValid) {
        alert('비밀번호를 확인해주세요.');
      } else if (!basicData || !step3Data) {
        alert('전문가 정보를 모두 입력해주세요.');
      }
    }
  }, [isPasswordValid, signUpData, generateEmail, expertSignUpMutation]);

  const handleCheckNickname = useCallback(() => {
    console.log("닉네임 확인:", signUpData.nickname);
  }, [signUpData.nickname]);

  const handleCheckId = useCallback(() => {
    console.log("아이디 확인:", signUpData.loginId);
  }, [signUpData.loginId]);

  // 로딩 상태
  const isLoading = signUpMutation.isPending || expertSignUpMutation.isPending;

  // 공통 헤더 컴포넌트
  const renderHeader = useCallback((showBackButton: boolean = true) => (
    <div className="mt-[64px] mb-[96px] flex items-center justify-center w-full relative">
      {showBackButton && (
        <button 
          onClick={handlePrev} 
          className="absolute w-[17px] h-[35px] flex items-center justify-center bottom-[10px] left-[312px] lg:flex md:hidden sm:hidden" 
          aria-label="뒤로가기"
        >
          <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
        </button>
      )}
      <h1 className="text-[32px] font-bold text-[#121218] font-pretendard leading-[1.25] tracking-[-0.03em]">
        회원가입
      </h1>
    </div>
  ), [handlePrev]);

  const renderCurrentStep = useCallback(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    switch (currentStep) {
      case "select":
        return (
          <div className="flex flex-col items-center justify-center min-h-[10vh] w-full">
            {renderHeader()}
            <StepSelector 
              selected={userType}
              setSelected={(type: "personal" | "expert") => {
                setUserType(type);
              }}
              onSubmit={handleNext}
            />
          </div>
        );

      case "terms":
        return (
          <div className="flex flex-col items-center justify-center min-h-[10vh] w-full">
            {renderHeader()}
            <Stepper currentStep="terms" userType={userType || undefined} />
            <TermsAgreement onNext={handleNext} onPrev={handlePrev} />
          </div>
        );

      case "info":
        return (
          <div className="flex flex-col items-center justify-center min-h-[10vh] w-full">
            {renderHeader()}
            <Stepper currentStep="info" userType={userType || undefined} />
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
          <div className="flex flex-col items-center justify-center min-h-[10vh] w-full">
            {renderHeader()}
            <Stepper currentStep="expert-info" userType={userType || undefined} />
            <ExpertInputForm
              onNext={handleExpertDataChange}
              onPrev={handlePrev}
              initialData={expertStep3Data}
            />
          </div>
        );

      case "complete":
        return (
          <div className="flex flex-col items-center justify-center min-h-[10vh] w-full">
            {renderHeader(false)}
            <SignUpComplete userType={userType || undefined} />
          </div>
        );

      default:
        return null;
    }
  }, [currentStep, userType, signUpData, expertStep3Data, isLoading, renderHeader, handleNext, handlePrev, handleDataChange, handleExpertDataChange, handleCheckNickname, handleCheckId]);

  return (
    <div className="w-full">
      {renderCurrentStep()}
    </div>
  );
};

export default SignUp;
