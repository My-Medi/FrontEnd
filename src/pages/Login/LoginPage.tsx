import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cva } from "class-variance-authority";
import logo from "../../assets/Login/logo.svg";
import kakao from "../../assets/Login/kakao.svg";
import naver from "../../assets/Login/naver.svg";
import google from "../../assets/Login/google.svg";
import LoginInput from "../../components/Login/LoginInput";
import SocialLoginButton from "../../components/Login/SocialLoginButton";
import LoginConfirmModal from "../../components/Common/modal/LoginConfirmModal";

const button = cva(
  "w-full h-16 mt-8 text-xl font-semibold rounded-full lg:h-24 lg:mt-10 lg:text-3xl flex justify-center items-center gap-2.5",
  {
    variants: {
      intent: {
        active: "text-white bg-[#1D68FF]",
        inactive:
          "bg-[#C5C8CB] text-white",
      },
    },
  },
);

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const isPasswordValid = useMemo(() => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.,?":{}|<>])(?=.{8,})/;
    return passwordRegex.test(password);
  }, [password]);

  const isFormValid = useMemo(() => {
    return id.length > 0 && isPasswordValid;
  }, [id, isPasswordValid]);

  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    if (isModalOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = '0px';
    };
  }, [isModalOpen]);

  const handleLogin = () => {
    // NOTE: This is a temporary login handler for demonstration.
    // TODO: Replace with actual API call.
    const MOCK_USERS = [
      { id: "testuser", password: "Testpassword1!" },
      { id: "user123", password: "Password123!" },
    ];

    if (!isFormValid) return;

    const foundUser = MOCK_USERS.find((user) => user.id === id);

    if (!foundUser) {
      setModalMessage("등록되지 않은 회원입니다.");
    } else if (foundUser.password !== password) {
      setModalMessage("아이디 혹은 비밀번호가 올바르지 않습니다.");
    } else {
      // This case would be a successful login.
      console.log("Login Successful");
      return; // Do not open modal on success
    }
    setIsModalOpen(true);
  };

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen pt-20 pb-12 lg:pt-44">
      <img
        src={logo}
        alt="MyMedi Logo"
        className="w-48 h-auto mb-11 lg:w-56"
      />
      <h1 className="text-3xl font-semibold text-[#25282B] mb-8 sm:text-4xl lg:text-5xl lg:mb-16">
        로그인
      </h1>
      <div className="flex flex-col items-center w-full max-w-2xl px-4">
        <div className="flex flex-col w-full gap-y-6">
          <LoginInput
            label="아이디"
            type="text"
            id="username"
            placeholder="아이디를 입력하세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <LoginInput
            label="비밀번호"
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요."
            errorMessage="소문자, 대문자 , 특수기호 포함 8글자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={button({ intent: isFormValid ? "active" : "inactive" })}
          disabled={!isFormValid}
          onClick={handleLogin}
        >
          로그인
        </button>
        <div className="flex flex-col items-center w-full gap-4 mt-4 sm:flex-row sm:justify-between">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="sr-only peer"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label
              htmlFor="remember-me"
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="flex items-center justify-center w-7 h-7 border border-[#9DA0A3] rounded-full shrink-0 peer-checked:bg-blue-600 peer-checked:border-transparent">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1.5 3.5L4.5 6.5L10.5 1.5"
                    className="stroke-[#9DA0A3] peer-checked:stroke-white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-lg font-medium text-[#4D5053] lg:text-2xl">
                로그인 유지
              </span>
            </label>
          </div>
          <div className="flex items-center text-lg font-medium text-[#4D5053] gap-4 lg:text-2xl">
            <a href="#" className="hover:underline">
              아이디 찾기
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">
              비밀번호 찾기
            </a>
          </div>
        </div>
        <div className="flex items-baseline mt-8 gap-x-4 lg:mt-12">
          <p className="text-base font-light text-[#121218] lg:text-xl">
            아직 마이메디 회원이 아니신가요?
          </p>
          <a
            href="/signup"
            className="text-lg font-semibold text-[#121218] hover:underline lg:text-2xl"
          >
            회원가입
          </a>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-2xl px-4 mt-10 gap-y-4 lg:mt-14">
        <SocialLoginButton
          icon={kakao}
          text="카카오로 로그인"
          alt="kakao icon"
        />
        <SocialLoginButton
          icon={naver}
          text="네이버로 로그인"
          alt="naver icon"
        />
        <SocialLoginButton
          icon={google}
          text="구글로 로그인"
          alt="google icon"
        />
      </div>
      <LoginConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMessage}
      />
    </div>
  );
};

export default LoginPage;