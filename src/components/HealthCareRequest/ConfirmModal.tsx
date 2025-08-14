import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  userName?: string; // 사용자 이름 prop 추가
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, userName = '사용자' }) => {
  const navigate = useNavigate();

  const handleExpertSearch = () => {
    onConfirm();
    navigate('/expert');
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(18, 18, 24, 0.40)' }}></div>

      {/* 모달 컨테이너 */}
      <div className="relative bg-white rounded-[18px] w-[587px] h-[312px] px-[62px] py-[27px]">
        {/* 메시지 */}
        <div className="text-center pt-[60px] pb-[64px]">
          <p className="text-black text-[24px] font-medium leading-[40px] tracking-[-0.72px]">제안서가 등록되었습니다!<br/>
          {userName}님에게 딱 맞는 전문가와 연결해 드릴게요!</p>
        </div>

        {/* 버튼들 */}
        <div className="flex justify-center gap-[30px] ">
          <button
            onClick={onConfirm}
            className="w-[216px] h-[47px] bg-white text-gray-700 rounded-[36px] shadow-[0_0_6px_4px_rgba(29,104,255,0.10)] transition-colors text-[20px] font-medium  font-[Pretendard]"
          >
            확인
          </button>
          <button
            onClick={handleExpertSearch}
            className="w-[216px] h-[47px] bg-[#1D68FF] text-white rounded-[36px] hover:bg-blue-600 transition-colors text-[20px] font-medium  font-[Pretendard]"
          >
            전문가찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 