import { useState, useMemo, useEffect } from "react";
import { cva } from "class-variance-authority";
import logo from "../../assets/Login/logo.svg";
import kakao from "../../assets/Login/kakao.svg";
import naver from "../../assets/Login/naver.svg";
import google from "../../assets/Login/google.svg";
import backSvg from "../../assets/Expert/back.svg";
import LoginInput from "../../components/Login/LoginInput";
import SocialLoginButton from "../../components/Login/SocialLoginButton";
import LoginConfirmModal from "../../components/Login/modal/LoginConfirmModal";

const button = cva(
  "w-[385.2px] h-[60px] mt-6 text-[19.2px] font-semibold rounded-full flex justify-center items-center gap-2.5 leading-[1.193]",
  {
    variants: {
      intent: {
        active: "text-white bg-[#1D68FF]",
        inactive:
          "bg-[#C5C8CB] text-white",
      },
    },
    defaultVariants: {
      intent: "inactive",
    },
  }
);

const LoginPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [isKeepLogin, setIsKeepLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isFormValid = useMemo(() => {
    return formData.id.length > 0 && formData.password.length > 0;
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (isFormValid) {
      setShowModal(true);
    }
  };

  const handleBack = () => {
    // 뒤로가기 로직
    window.history.back();
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={handleBack}
        className="absolute w-[17px] h-[35px] flex items-center justify-center top-[65px] left-[312px]"
        aria-label="뒤로가기"
      >
        <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
      </button>

      <div className="w-[385.2px] flex flex-col items-center">
        {/* 로고 */}
        <img src={logo} alt="로고" className="w-[139.2px] h-[21.6px] mt-[72px] mb-[33px]" />

        {/* 로그인 문구 */}
        <h1 className="text-[28.8px] font-semibold text-[#121218] mb-8 leading-[1.4] tracking-[-3%]">
          로그인
        </h1>

        {/* 로그인 폼 */}
        <div className="w-[385.2px] flex flex-col gap-4">
          <LoginInput
            label="아이디"
            type="text"
            id="id"
            name="id"
            placeholder="아이디를 입력하세요."
            value={formData.id}
            onChange={handleInputChange}
          />
          <LoginInput
            label="비밀번호"
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요."
            errorMessage="소문자, 대문자 , 특수기호 포함 8글자 이상"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          className={button({ intent: isFormValid ? "active" : "inactive" })}
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          로그인
        </button>
           {/* 로그인 유지 체크박스와 아이디/비밀번호 찾기 */}
        <div className="w-[385.2px] flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="keepLogin"
              checked={isKeepLogin}
              onChange={(e) => setIsKeepLogin(e.target.checked)}
              className="w-[18px] h-[18px] border border-[#9DA0A3] rounded"
            />
            <label
              htmlFor="keepLogin"
              className="text-[14px] font-medium text-[#4D5053] leading-[1.714] tracking-[-3%]"
            >
              로그인 유지
            </label>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-medium text-[#4D5053] leading-[1.714] tracking-[-3%]">
              아이디 찾기
            </span>
            <div className="w-px h-4 bg-[#C5C8CB]"></div>
            <span className="text-[14px] font-medium text-[#4D5053] leading-[1.714] tracking-[-3%]">
              비밀번호 찾기
            </span>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="w-[385.2px] flex items-center justify-center gap-2 mt-6">
          <span className="text-[12px] font-light text-[#121218] leading-[1.833] tracking-[-3%]">
            아직 마이메디 회원이 아니신가요?
          </span>
          <span className="text-[16px] font-semibold text-[#121218] leading-[1.4] tracking-[-3%] cursor-pointer">
            회원가입
          </span>
        </div>

        {/* 소셜 로그인 */}
        <div className="w-[385.2px] flex flex-col gap-2 mt-6">
          <SocialLoginButton
            icon={kakao}
            text="카카오로 로그인"
            alt="카카오"
          />
          <SocialLoginButton
            icon={naver}
            text="네이버로 로그인"
            alt="네이버"
          />
          <SocialLoginButton
            icon={google}
            text="구글로 로그인"
            alt="구글"
          />
        </div>
      </div>

      {showModal && (
        <LoginConfirmModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="로그인 성공"
        />
      )}
    </div>
  );
};

export default LoginPage;