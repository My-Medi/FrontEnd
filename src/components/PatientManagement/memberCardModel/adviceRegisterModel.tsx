import React, { useState } from 'react';
import BackIcon from '/src/assets/back.svg';

interface AdviceRegisterModalProps {
  onClose: () => void; // 모달을 닫을 때 실행할 함수
}

const AdviceRegisterModal: React.FC<AdviceRegisterModalProps> = ({ onClose }) => {
  const [adviceText, setAdviceText] = useState('한줄 조언을 등록해 보세요!');
  const [isEditing, setIsEditing] = useState(false);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdviceText(e.target.value);
  };

  const handleTextFocus = () => {
    if (adviceText === '한줄 조언을 등록해 보세요!') {
      setAdviceText('');
    }
    setIsEditing(true);
  };

  const handleRegister = () => {
    alert('한줄 조언 등록 완료');
    onClose(); // 모달 닫기
  };
  return (
    <>
      <div className='fixed inset-0 bg-black/30 z-40' />
      <div className='absolute left-1/2 -translate-x-1/2 z-50 top-[20px]'>
        <div className='hidden lg:flex flex-col items-center relative w-[889px] pt-[50px] pl-[50px] pr-[80px] pb-[50px] rounded-[40px] bg-white shadow-md'>
          {/* 상단 헤더 */}
          <div className='flex items-center gap-6  self-start'>
            {/* 뒤로가기 버튼 */}
            <button
              onClick={onClose}
              className='cursor-pointer shrink-0 flex items-center justify-center'
            >
              <img src={BackIcon} alt='뒤로가기' className='w-[18px] mt-[-30px] h-[35px]' />
            </button>

            {/* 텍스트 블럭 */}
            <div className='flex flex-col ml-[-30px] w-[770px] items-center justify-between h-[60px]'>
              <p className='text-[#121218] text-[24px] font-semibold font-[Pretendard] leading-[36px] tracking-[-0.72px]'>
                한줄 조언 등록
              </p>
            </div>
          </div>
          {/* 한줄 조언 입력 박스 */}
          <textarea
            value={adviceText}
            onChange={handleTextChange}
            onFocus={handleTextFocus}
            className='w-full ml-[40px] mt-[20px] h-[42px] p-[10px_24px] resize-none rounded-[14px] border border-[#C5C8CB] bg-[#FFF] text-[14px] text-[#C5C8CB] font-[Pretendard] leading-[22px] placeholder:text-[#B4B9C1] max-w-full'
            placeholder='한줄 조언을 등록해 보세요!'
          />

          {/* 등록 버튼 */}
          <button
            onClick={handleRegister}
            className='mt-[24px] flex justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#1D68FF] text-white text-[20px] font-medium font-[Pretendard] leading-[36px] tracking-[-0.6px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
};

export default AdviceRegisterModal;
