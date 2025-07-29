import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cva } from "class-variance-authority";
import logo from "../../assets/Login/mymedi.svg";
import backSvg from "../../assets/Expert/back.svg";
import LoginInput from "../../components/Login/LoginInput";
import { useAuth } from "../../contexts/AuthContext";
import LoginConfirmModal from "../../components/Login/modal/LoginConfirmModal";
import FindID from "../../components/Login/find/findID";
import FindPW from "../../components/Login/find/findPW";

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
  const [showFindID, setShowFindID] = useState(false);
  const [showFindPW, setShowFindPW] = useState(false);
  const { setUserType } = useAuth();
  const navigate = useNavigate();
  const [showFailModal, setShowFailModal] = useState(false);
  const idInputRef = useRef<HTMLInputElement>(null);

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
      // 아이디가 'user' 또는 'expert'일 때만 로그인 성공
      const id = formData.id.toLowerCase();
      if (id === 'user' || id === 'expert') {
        const isExpert = id === 'expert';
        setUserType(isExpert ? 'expert' : 'patient');
        navigate('/');
      } else {
        setShowFailModal(true);
      }
    }
  };

  const handleBack = () => {
    // 뒤로가기 로직
    window.history.back();
  };

  const handleFailModalClose = () => {
    setShowFailModal(false);
    setTimeout(() => {
      idInputRef.current?.focus();
    }, 0);
  };

  const handleFindID = () => {
    console.log('아이디 찾기 클릭됨');
    setShowFindID(true);
  };

  const handleBackFromFindID = () => {
    setShowFindID(false);
  };

  const handleBackFromFindPW = () => {
    setShowFindPW(false);
  };

  // 아이디 찾기 화면이 표시되면 FindID 컴포넌트를 렌더링
  if (showFindID) {
    return <FindID onBack={handleBackFromFindID} />;
  }

  // 비밀번호 찾기 화면이 표시되면 FindPW 컴포넌트를 렌더링
  if (showFindPW) {
    return <FindPW onBack={handleBackFromFindPW} />;
  }

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
        <img src={logo} alt="로고" className="w-[111.6px] h-[20.4px] mt-[72px] mb-[15.6px]" />

        {/* 로그인 문구 */}
        <h1 className="text-[28.8px] font-semibold text-[#121218] mb-8 leading-[1.4] tracking-[-3%]">
          로그인
        </h1>

        {/* 로그인 폼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="w-[385.2px] flex flex-col gap-4"
        >
          <LoginInput
            ref={idInputRef}
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
          {/* 로그인 버튼 */}
          <button
            className={button({ intent: isFormValid ? "active" : "inactive" })}
            type="submit"
            disabled={!isFormValid}
          >
            <span className="font-semibold text-[18px]">로그인</span>
          </button>
        </form>
           {/* 로그인 유지 체크박스와 아이디/비밀번호 찾기 */}
        <div className="w-[385.2px] flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="keepLogin"
                checked={isKeepLogin}
                onChange={(e) => setIsKeepLogin(e.target.checked)}
                className="w-[18px] h-[18px] border border-[#9DA0A3] rounded-full appearance-none"
              />
              <span className="ml-3 text-[14px] font-medium text-[#4D5053] leading-[1.714] tracking-[-3%]">
                로그인 유지
              </span>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              className="text-[14px] font-medium text-[#4D5053] leading-[1.714] tracking-[-3%] cursor-pointer hover:text-[#1D68FF] bg-transparent border-none p-0"
              onClick={handleFindID}
            >
              아이디 찾기
            </button>
            <div className="w-px h-4 bg-[#C5C8CB]"></div>
            <button 
              type="button"
              className="text-[14px] font-medium text-[#4D5053] leading-[1.714] tracking-[-3%] cursor-pointer hover:text-[#1D68FF] bg-transparent border-none p-0"
              onClick={() => setShowFindPW(true)}
            >
              비밀번호 찾기
            </button>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="w-[385.2px] flex items-center justify-center gap-2 mt-6">
          <span className="text-[12px] font-light text-[#121218] leading-[1.833] tracking-[-3%]">
            아직 마이메디 회원이 아니신가요?
          </span>
          <span
            className="text-[16px] font-semibold text-[#121218] leading-[1.4] tracking-[-3%] cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </span>
        </div>

      </div>
      {showFailModal && (
        <LoginConfirmModal
          isOpen={showFailModal}
          onClose={handleFailModalClose}
          title={
            '아이디 혹은 비밀번호가 올바르지 않습니다'
          }
        />
      )}
    </div>
  );
};

export default LoginPage;