import React, { useState } from 'react';
import LoginInput from '../LoginInput';
import logo from "../../../assets/Login/mymedi.svg";
import backSvg from "../../../assets/Expert/back.svg";
import ErrorEmailModal from './ErrorEmailModal';

interface FindIDProps {
  onBack: () => void;
}

const FindID: React.FC<FindIDProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleGetVerificationCode = () => {
    // 등록되지 않은 이메일 목록 (실제로는 서버에서 확인)
    const unregisteredEmails = ['test@example.com', 'invalid@email.com'];
    
    if (unregisteredEmails.includes(email)) {
      setShowErrorModal(true);
    } else {
      // 정상적인 경우 인증번호 발송 로직
      console.log('인증번호 받기:', email);
    }
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

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

        {/* 로그인 문구 */}
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
        <ErrorEmailModal
          isOpen={showErrorModal}
          onClose={handleErrorModalClose}
          message="회원 등록되지 않은 이메일입니다."
        />
      )}
    </div>
  );
};

export default FindID;
