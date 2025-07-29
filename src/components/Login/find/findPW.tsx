import { useState, useMemo, useRef, useEffect } from "react";
import logo from "../../../assets/Login/mymedi.svg";
import backSvg from "../../../assets/Expert/back.svg";
import LoginInput from "../LoginInput";
import ErrorModal from './ErrorModal';
import ResetPassword from './ResetPassword';

interface FindPWProps {
  onBack: () => void;
}

const FindPW = ({ onBack }: FindPWProps) => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showVerificationErrorModal, setShowVerificationErrorModal] = useState(false);
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3분 타이머
  const [showSuccessStep, setShowSuccessStep] = useState(false);
  const [showTempPasswordModal, setShowTempPasswordModal] = useState(false);
  const [showResetPasswordStep, setShowResetPasswordStep] = useState(false);
  const idInputRef = useRef<HTMLInputElement>(null);

  const isFormValid = useMemo(() => {
    return formData.id.length > 0 && formData.email.length > 0;
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendVerificationCode = () => {
    if (isFormValid) {
      // 등록된 사용자 정보 목록 (실제로는 서버에서 확인)
      const registeredUsers = [
        { id: 'user', email: 'user@example.com' },
        { id: 'expert', email: 'expert@example.com' }
      ];
      
      // 아이디가 등록되어 있는지 확인
      const isIdRegistered = registeredUsers.some(user => user.id === formData.id);
      // 이메일이 등록되어 있는지 확인
      const isEmailRegistered = registeredUsers.some(user => user.email === formData.email);
      
      console.log('입력된 정보:', formData);
      console.log('아이디 등록됨?:', isIdRegistered);
      console.log('이메일 등록됨?:', isEmailRegistered);
      
      // 아이디나 이메일 중 하나라도 등록되지 않았으면 에러
      if (!isIdRegistered || !isEmailRegistered) {
        setShowErrorModal(true);
      } else {
        // 정상적인 경우 인증번호 발송 로직
        console.log("인증번호 발송:", formData);
        setShowVerificationStep(true);
        setTimeLeft(180); // 타이머 시작
      }
    }
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleVerificationErrorModalClose = () => {
    setShowVerificationErrorModal(false);
  };

  const handleTempPasswordModalClose = () => {
    setShowTempPasswordModal(false);
    window.location.href = '/login';

  };

  const handleVerifyCode = () => {
    // 인증번호 확인 로직 (임시 인증번호: 00000)
    if (verificationCode === '00000') {
      setShowSuccessStep(true);
    } else {
      // 잘못된 인증번호 처리
      setShowVerificationErrorModal(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 타이머 효과
  useEffect(() => {
    if (showVerificationStep && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showVerificationStep, timeLeft]);

  // 비밀번호 재설정 화면
  if (showResetPasswordStep) {
    return (
      <ResetPassword
        onBack={() => setShowResetPasswordStep(false)}
      />
    );
  }

  // 성공 화면 - 두 가지 선택지
  if (showSuccessStep) {
    return (
      <div className="relative flex flex-col items-center justify-center p-4">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => setShowSuccessStep(false)}
          className="absolute w-[17px] h-[35px] flex items-center justify-center top-[65px] left-[312px]"
          aria-label="뒤로가기"
        >
          <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
        </button>

        <div className="w-[385.2px] flex flex-col items-center">
          {/* 로고 */}
          <img src={logo} alt="로고" className="w-[111.6px] h-[20.4px] mt-[72px] mb-[15.6px]" />

          {/* 비밀번호 찾기 문구 */}
          <h1 className="text-[28.8px] font-semibold text-[#121218] mb-[32px] leading-[1.4] tracking-[-3%]">
            비밀번호 찾기
          </h1>

                      {/* 두 가지 선택지 버튼 */}
            <div className="w-[385.2px] flex flex-col gap-4">
              <button
                onClick={() => {
                  // 임시 비밀번호 전송 로직
                  console.log("임시 비밀번호 전송");
                  // TODO: 실제 임시 비밀번호 전송 API 호출
                  setShowTempPasswordModal(true);
                }}
                className="w-[385.2px] h-[60px] bg-gray-200 text-black text-[18px] font-semibold rounded-[12px] flex justify-center items-center transition-colors "
              >
                이메일로 임시 비밀번호 전송
              </button>
              <button
                onClick={() => {
                  setShowResetPasswordStep(true);
                }}
                className="w-[385.2px] h-[60px] bg-gray-100 text-black text-[18px] font-semibold rounded-[12px] flex justify-center items-center transition-colors"
              >
                새 비밀번호 재설정
              </button>
            </div>
        </div>

              {/* 임시 비밀번호 전송 성공 모달 */}
      {showTempPasswordModal && (
        <ErrorModal
          isOpen={showTempPasswordModal}
          onClose={handleTempPasswordModalClose}
          message="이메일로 임시 비밀번호가 전송되었습니다!"
        />
      )}
      </div>
    );
  }

  // 인증번호 입력 화면
  if (showVerificationStep) {
    return (
      <div className="relative flex flex-col items-center justify-center p-4">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => setShowVerificationStep(false)}
          className="absolute w-[17px] h-[35px] flex items-center justify-center top-[65px] left-[312px]"
          aria-label="뒤로가기"
        >
          <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
        </button>

        <div className="w-[385.2px] flex flex-col items-center">
          {/* 로고 */}
          <img src={logo} alt="로고" className="w-[111.6px] h-[20.4px] mt-[72px] mb-[15.6px]" />

          {/* 비밀번호 찾기 문구 */}
          <h1 className="text-[28.8px] font-semibold text-[#121218] mb-[32px] leading-[1.4] tracking-[-3%]">
            비밀번호 찾기
          </h1>

          {/* 안내 문구 */}
          <p className="text-[14px] font-medium text-[#4D5053] mb-[32px] leading-[1.714] tracking-[-3%] text-center">
            전송된 이메일의 인증번호를 아래에 입력해주세요.
          </p>

          {/* 인증번호 입력 폼 */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyCode();
            }}
            className="w-[385.2px] flex flex-col gap-4"
          >
            {/* 타이머와 인증번호 입력 필드 */}
            <div className="flex items-center gap-3 mb-6">
              {/* 타이머 */}
              <div className="bg-gray-100 rounded-lg px-4 py-3 min-w-[80px] text-center">
                <span className="text-[14px] font-medium text-[#4D5053]">
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              {/* 인증번호 입력 필드 */}
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증번호를 입력하세요."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-[14px]"
                maxLength={6}
              />
            </div>

            {/* 확인 버튼 */}
            <button
              type="submit"
              disabled={!verificationCode}
              className={`w-[385.2px] h-[60px] text-[18px] font-semibold rounded-[14px] flex justify-center items-center gap-2.5 leading-[1.193] ${
                verificationCode 
                  ? 'text-black bg-gray-100 hover:bg-gray-200' 
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
            >
              <span className="font-semibold text-[18px]">확인</span>
            </button>
          </form>
        </div>
        
        {/* 인증번호 에러 모달 */}
        {showVerificationErrorModal && (
          <ErrorModal
            isOpen={showVerificationErrorModal}
            onClose={handleVerificationErrorModalClose}
            message="인증번호가 올바르지 않습니다."
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="absolute w-[17px] h-[35px] flex items-center justify-center top-[65px] left-[312px]"
        aria-label="뒤로가기"
      >
        <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
      </button>

      <div className="w-[385.2px] flex flex-col items-center">
        {/* 로고 */}
        <img src={logo} alt="로고" className="w-[111.6px] h-[20.4px] mt-[72px] mb-[15.6px]" />

        {/* 비밀번호 찾기 문구 */}
        <h1 className="text-[28.8px] font-semibold text-[#121218] mb-8 leading-[1.4] tracking-[-3%]">
          비밀번호 찾기
        </h1>

        {/* 안내 문구 */}
        <p className="text-[16px] font-medium text-[#4D5053] mb-8 leading-[1.4] tracking-[-3%] text-center">
          회원정보에 등록된 아이디와 이메일을 입력해주세요.
        </p>

        {/* 비밀번호 찾기 폼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendVerificationCode();
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
            label="이메일"
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요."
            value={formData.email}
            onChange={handleInputChange}
          />
          
          {/* 인증번호 받기 버튼 */}
          <button
            className={`w-[385.2px] h-[60px] mt-[32px] text-[18px] font-semibold rounded-[14px] flex justify-center items-center gap-2.5 leading-[1.193] ${isFormValid ? "text-black bg-gray-100" : "bg-gray-100 text-black cursor-not-allowed"}`}
            type="submit"
            disabled={!isFormValid}
          >
            <span className="font-semibold text-[18px]">인증번호 받기</span>
          </button>
        </form>
      </div>

      {/* 에러 모달 */}
      {showErrorModal && (
        <ErrorModal
          isOpen={showErrorModal}
          onClose={handleErrorModalClose}
          message="등록되지 않은 아이디 또는 이메일입니다."
        />
      )}

      {/* 인증번호 에러 모달 */}
      {showVerificationErrorModal && (
        <ErrorModal
          isOpen={showVerificationErrorModal}
          onClose={handleVerificationErrorModalClose}
          message="인증번호가 올바르지 않습니다."
        />
      )}


    </div>
  );
};

export default FindPW;
