import logo from "../../assets/Login/logo.svg";
import kakao from "../../assets/Login/kakao.svg";
import naver from "../../assets/Login/naver.svg";
import google from "../../assets/Login/google.svg";
import LoginInput from "../../components/Login/LoginInput";
import SocialLoginButton from "../../components/Login/SocialLoginButton";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center w-full pt-44 pb-12">
      <img
        src={logo}
        alt="MyMedi Logo"
        className="w-56 h-9 mb-8"
      />
      <h1 className="text-5xl font-semibold text-[#25282B] mb-16">
        로그인
      </h1>
      <div className="flex flex-col items-center w-full max-w-2xl px-4">
        <div className="flex flex-col w-full gap-y-6">
          <LoginInput
            label="아이디"
            type="text"
            id="username"
            placeholder="아이디를 입력하세요."
          />
          <LoginInput
            label="비밀번호"
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요."
            errorMessage="소문자, 대문자 , 특수기호 포함 8글자 이상"
          />
        </div>
        <button
          className="w-full h-24 mt-10 text-white bg-[#1D68FF] rounded-full text-3xl font-semibold flex justify-center items-center gap-2.5"
        >
          로그인
        </button>
        <div className="flex flex-col items-center w-full gap-4 mt-4 sm:flex-row sm:justify-between">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="sr-only peer"
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
              <span className="text-2xl font-medium text-[#4D5053]">
                로그인 유지
              </span>
            </label>
          </div>
          <div className="flex items-center text-2xl font-medium text-[#4D5053] gap-4">
            <a href="#" className="hover:underline">
              아이디 찾기
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">
              비밀번호 찾기
            </a>
          </div>
        </div>
        <div className="flex items-baseline mt-12 gap-x-4">
          <p className="text-xl font-light text-[#121218]">
            아직 마이메디 회원이 아니신가요?
          </p>
          <a
            href="/signup"
            className="text-2xl font-semibold text-[#121218] hover:underline"
          >
            회원가입
          </a>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-2xl px-4 mt-14 gap-y-4">
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
    </div>
  );
};

export default LoginPage;