import React, { useState, useEffect } from 'react';
import LoginInput from '../LoginInput';
import logo from "../../../assets/Login/mymedi.svg";
import backSvg from "../../../assets/Expert/back.svg";
import ErrorModal from './ErrorModal';

interface FindIDProps {
  onBack: () => void;
}

const FindID: React.FC<FindIDProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showVerificationErrorModal, setShowVerificationErrorModal] = useState(false);
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3분 타이머
  const [showSuccessStep, setShowSuccessStep] = useState(false);
  const [foundId, setFoundId] = useState('asdf22'); // 찾은 아이디
  const [userName, setUserName] = useState('홍길동'); // 찾은 사용자 이름

  const handleGetVerificationCode = () => {
    // 등록되지 않은 이메일 목록 (실제로는 서버에서 확인)
    const unregisteredEmails = ['test@example.com', 'invalid@email.com'];
    
    if (unregisteredEmails.includes(email)) {
      setShowErrorModal(true);
    } else {
      // 정상적인 경우 인증번호 발송 로직
      console.log('인증번호 받기:', email);
      setShowVerificationStep(true);
      setTimeLeft(180); // 타이머 시작
    }
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleVerificationErrorModalClose = () => {
    setShowVerificationErrorModal(false);
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

  // 성공 화면
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

          {/* 아이디 찾기 문구 */}
          <h1 className="text-[28.8px] font-semibold text-[#121218] mb-[32px] leading-[1.4] tracking-[-3%]">
            아이디 찾기
          </h1>

          {/* 성공 메시지 */}
          <div className="text-center mb-[32px]">
            <p className="text-[24px] font-medium leading-[1.4] tracking-[-3%]">
              <span className="text-[#1D68FF]">{userName}</span>
              <span className="text-[#121218]">님의 아이디는 {foundId} 입니다.</span>
            </p>
          </div>

          {/* 버튼들 */}
          <div className="w-[385.2px] flex flex-col gap-3">
            {/* 바로 로그인하기 버튼 */}
            <button
              onClick={() => {
                // 로그인 페이지로 이동
                window.location.href = '/login';
              }}
              className="w-[300px] h-[60px] bg-[#1D68FF] text-white text-[18px] ml-[42px] mb-[24px]font-semibold rounded-[60px] flex justify-center items-center  transition-colors"
            >
              바로 로그인하기
            </button>

            {/* 비밀번호 찾기 버튼 */}
            <button
              onClick={() => {
                // 비밀번호 찾기 페이지로 이동 (추후 구현)
                
              }}
              className="w-[300px] h-[60px] bg-white text-[#121218] text-[18px] ml-[42px] font-semibold rounded-[60px] flex justify-center items-center  shadow-[0_0_6px_4px_rgba(29,104,255,0.10)] transition-colors"
            >
              비밀번호 찾기
            </button>
          </div>
        </div>
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

          {/* 아이디 찾기 문구 */}
          <h1 className="text-[28.8px] font-semibold text-[#121218] mb-[32px] leading-[1.4] tracking-[-3%]">
            아이디 찾기
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

        {/* 아이디 찾기 문구 */}
        <h1 className="text-[28.8px] font-semibold text-[#121218] mb-[32px] leading-[1.4] tracking-[-3%]">
          아이디 찾기
        </h1>


        {/* 안내 문구 */}
        <p className="text-[14px] font-medium text-[#4D5053] mb-[32px] leading-[1.714] tracking-[-3%] text-center">
          회원정보에 등록된 이메일을 입력하세요.
        </p>

        {/* 이메일 입력 폼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGetVerificationCode();
          }}
          className="w-[385.2px] flex flex-col gap-4"
        >
          <LoginInput
            label=""
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          {/* 인증번호 받기 버튼 */}
          <button
            type="submit"
            disabled={!email}
            className={`w-[385.2px] h-[60px] mt-[32px] text-[18px] font-semibold rounded-[14px] flex justify-center items-center gap-2.5 leading-[1.193] ${
              email 
                ? 'text-black bg-gray-100' 
                : 'bg-gray-100 text-black cursor-not-allowed'
            }`}
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
          message="회원 등록되지 않은 이메일입니다."
        />
      )}

      {/* 인증번호 에러 모달 */}
      {showVerificationErrorModal && (
        <div>
          <ErrorModal
            isOpen={showVerificationErrorModal}
            onClose={handleVerificationErrorModalClose}
            message="인증번호가 올바르지 않습니다."
          />
        </div>
      )}
    </div>
  );
};

export default FindID;
