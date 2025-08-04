import { useState } from "react";
import logo from "../../../assets/Login/mymedi.svg";
import backSvg from "../../../assets/Expert/back.svg";
import LoginInput from "../LoginInput";
import ErrorModal from './ErrorModal';

interface ResetPasswordProps {
  onBack: () => void;
}

const ResetPassword = ({ onBack }: ResetPasswordProps) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword) {
      console.log("비밀번호 재설정 완료:", formData.newPassword);
      // TODO: 실제 비밀번호 재설정 API 호출
      setShowSuccessModal(true);
    } else {
      setShowErrorModal(true);
    }
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    window.location.href = '/login';
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

        {/* 비밀번호 재설정 문구 */}
        <h1 className="text-[28.8px] font-semibold text-[#121218] mb-[32px] leading-[1.4] tracking-[-3%]">
          비밀번호 재설정
        </h1>

        {/* 안내 문구 */}
        <p className="text-[16px] font-medium text-[#4D5053] mb-[32px] leading-[1.4] tracking-[-3%] text-center">
          새로운 비밀번호를 입력해주세요.
        </p>

        {/* 비밀번호 재설정 폼 */}
        <form
          onSubmit={handleSubmit}
          className="w-[385.2px] flex flex-col gap-4"
        >
          <LoginInput
            label="새 비밀번호"
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="새 비밀번호를 입력하세요."
            value={formData.newPassword}
            onChange={handleInputChange}
          />
          <LoginInput
            label="새 비밀번호 확인"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="새 비밀번호를 입력하세요."
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          
          {/* 완료 버튼 */}
          <button
            className="w-[385.2px] h-[60px] mt-[32px] bg-gray-200 text-black text-[18px] font-semibold rounded-[12px] flex justify-center items-center transition-colors"
            type="submit"
          >
            완료
          </button>
        </form>
      </div>

      {/* 에러 모달 */}
      {showErrorModal && (
        <ErrorModal
          isOpen={showErrorModal}
          onClose={handleErrorModalClose}
          message="비밀번호가 일치하지 않습니다."
        />
      )}

      {/* 성공 모달 */}
      {showSuccessModal && (
        <ErrorModal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          message="비밀번호 재설정이 완료되었습니다!"
        />
      )}
    </div>
  );
};

export default ResetPassword; 