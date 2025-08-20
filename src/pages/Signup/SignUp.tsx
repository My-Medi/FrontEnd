import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StepSelector from "../../components/SignUp/StepSelector";
import { checkNicknameDuplication, checkLoginIdDuplication } from "../../apis/duplicationApi/duplication";
import SignUpInfo from "../../components/SignUp/Info";
import ExpertInputForm from "../../components/SignUp/ExpertInputForm";
import SignUpComplete from "../../components/SignUp/SignUpComplete";
import Stepper from "../../components/SignUp/Stepper";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import backSvg from "../../assets/back.svg";
import { useSignUpMutation } from "../../hooks/users/mutations/useSignUpMutation";
import { useExpertSignUpMutation } from "../../hooks/experts/mutations/useSignUpMutation";
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
  height: string;
  weight: string;
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
  height: "",
  weight: "",
};

const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>("select");
  const [userType, setUserType] = useState<UserType>(null);
  const [signUpData, setSignUpData] = useState<SignUpFormData>(initialSignUpData);
  const [expertBasicData, setExpertBasicData] = useState<ExpertBasicData | null>(null);
  const [expertStep3Data, setExpertStep3Data] = useState<ExpertSignUpStep3Request | null>(null);
  // 닉네임 중복 확인 상태 (회원가입 단계 필수 통과)
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const [loginIdChecked, setLoginIdChecked] = useState(false);
  const [loginIdAvailable, setLoginIdAvailable] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // 개인 회원가입 뮤테이션
  const signUpMutation = useSignUpMutation({
    onSuccess: useCallback(() => {
      setCurrentStep("complete");
    }, []),
    onError: useCallback(() => {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }, []),
  });

  // 전문가 회원가입 뮤테이션
  const expertSignUpMutation = useExpertSignUpMutation({
    onSuccess: useCallback(() => {
      setCurrentStep("complete");
    }, []),
    onError: useCallback(() => {
      alert('전문가 회원가입에 실패했습니다. 다시 시도해주세요.');
    }, []),
  });

  // 이메일 생성 함수
  const generateEmail = useCallback((email: string, emailDomain: string): string => {
    return emailDomain === "직접입력" ? email : `${email}@${emailDomain}`;
  }, []);

  // 날짜 문자열 정규화: 'YYYY.MM' | 'YYYY.MM.DD' | 'YYYY-MM' | 'YYYY-MM-DD' -> 'YYYY-MM[-DD]'
  const normalizeDateForApi = useCallback((raw: string): string => {
    if (!raw) return raw;
    const replaced = raw.trim().replace(/\./g, '-');
    if (/^\d{4}-\d{2}-\d{2}$/.test(replaced)) return replaced;
    if (/^\d{4}-\d{2}$/.test(replaced)) return `${replaced}-01`;
    return replaced; // 기타 케이스는 치환만 적용
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
      height: signUpData.height ? parseInt(signUpData.height) : undefined,
      weight: signUpData.weight ? parseInt(signUpData.weight) : undefined,
    };

    
    
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
        startDate: normalizeDateForApi(career.startDate),
        endDate: normalizeDateForApi(career.endDate),
      })),
      licenses: step3Data.licenses.map((license: any) => ({
        ...license,
        licenseDate: license.licenseDate.replace(/\./g, '-'), // YYYY.MM.DD -> YYYY-MM-DD
      })),
      licenseImages: step3Data.licenseImages.filter((img: any) => img.imageUrl !== ''),
    };

    
    
    return apiData;
  }, [signUpData, expertBasicData, expertStep3Data, generateEmail, normalizeDateForApi]);

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
        // 닉네임 중복 확인은 필수 (사용 가능해야 다음 단계 진행)
        if (!nicknameChecked || nicknameAvailable !== true) {
          alert('닉네임 중복 확인을 완료해주세요.');
          return;
        }
        if (!loginIdChecked || loginIdAvailable !== true) {
          alert('아이디 중복 확인을 완료해주세요.');
          return;
        }
        if (userType === "expert") {
          setCurrentStep("expert-info");
        } else {
          // 개인 회원가입인 경우 API 호출
          if (isPasswordValid) {
            try {
              const apiData = transformSignUpData();
              signUpMutation.mutate(apiData);
            } catch (error) {
              alert(error instanceof Error ? error.message : '입력 데이터를 확인해주세요.');
            }
          } else {
            alert('비밀번호를 확인해주세요.');
          }
        }
        break;
      case "expert-info":
        // 전문가 회원가입 API 호출
        
        
        if (isPasswordValid && expertBasicData && expertStep3Data) {
          try {
            const apiData = transformExpertSignUpData();
            expertSignUpMutation.mutate(apiData);
          } catch (error) {
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
    if (field === 'nickname') {
      // 닉네임 변경 시 중복확인 상태 초기화
      setNicknameChecked(false);
      setNicknameAvailable(null);
    }
    if (field === 'loginId') {
      setLoginIdChecked(false);
      setLoginIdAvailable(null);
    }
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
            startDate: normalizeDateForApi(career.startDate),
            endDate: normalizeDateForApi(career.endDate),
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
  }, [isPasswordValid, signUpData, generateEmail, normalizeDateForApi, expertSignUpMutation]);

  const handleCheckNickname = useCallback(async () => {
    const nickname = signUpData.nickname.trim();
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    try {
      const isDuplicate = await checkNicknameDuplication(nickname);
      // API 스펙: result = true → 중복, false → 사용 가능
      setNicknameChecked(true);
      setNicknameAvailable(!isDuplicate);
      if (isDuplicate) {
        alert('이미 사용 중인 닉네임입니다.');
      } else {
        alert('사용 가능한 닉네임입니다.');
      }
    } catch (_) {
      alert('닉네임 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  }, [signUpData.nickname]);

  const handleCheckId = useCallback(() => {
    const loginId = signUpData.loginId.trim();
    if (!loginId) {
      alert('아이디를 입력해주세요.');
      return;
    }
    checkLoginIdDuplication(loginId)
      .then((isDuplicate) => {
        setLoginIdChecked(true);
        setLoginIdAvailable(!isDuplicate);
        if (isDuplicate) alert('이미 사용 중인 아이디입니다.');
        else alert('사용 가능한 아이디입니다.');
      })
      .catch(() => {
        alert('아이디 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      });
  }, [signUpData.loginId]);

  // 로딩 상태
  const isLoading = signUpMutation.isPending || expertSignUpMutation.isPending;

  // 공통 헤더 컴포넌트
  const renderHeader = useCallback((showBackButton: boolean = true) => (
    <div className="mt-[64px] mb-[40px] flex items-center justify-center w-full relative">
      {showBackButton && (
        <button 
          onClick={handlePrev} 
          className="absolute w-[17px] h-[35px] flex items-center justify-center bottom-[10px] left-[312px] lg:flex md:hidden sm:hidden" 
          aria-label="뒤로가기"
        >
          <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
        </button>
      )}
      <h1 className="text-[24px] font-semibold text-[#121218] font-pretendard leading-[36px] tracking-[-0.03em] text-center">
        마이메디 회원가입
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
