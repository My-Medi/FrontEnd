import React, { useState } from 'react';
import BackIcon from '/src/assets/back.svg';

interface AdviceRegisterModalProps {
  onClose: (isFromRegister?: boolean) => void; // 모달을 닫을 때 실행할 함수
}

const AdviceRegisterModal: React.FC<AdviceRegisterModalProps> = ({ onClose }) => {
  const [adviceText, setAdviceText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdviceText(e.target.value);
  };

  const handleRegister = () => {
    alert('한줄 조언 등록 완료');
    // 등록 버튼을 누르면 모든 모달을 닫기
    onClose(true); // isFromRegister = true
  };
  return (
    <>
      <div className='fixed inset-0 bg-black/30 z-60' />
      <div className='absolute left-1/2 -translate-x-1/2 z-70 top-[20px]'>
        <div className='hidden lg:flex flex-col items-center relative w-[889px] pt-[50px] pl-[50px] pr-[80px] pb-[50px] rounded-[40px] bg-white shadow-md'>
          {/* 상단 헤더 */}
          <div className='flex items-center gap-6 w-full justify-center'>
            {/* 뒤로가기 버튼 */}
                                        <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClose(false); // isFromRegister = false
                              }}
              className='cursor-pointer shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity'
              style={{ position: 'relative', zIndex: 100, minWidth: '40px', minHeight: '40px' }}
            >
              <img src={BackIcon} alt='뒤로가기' className='w-[18px] mt-[-30px] h-[35px] pointer-events-none' />
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
            className='w-full ml-[40px] mt-[20px] h-[42px] p-[10px_24px] resize-none rounded-[14px] border border-[#C5C8CB] bg-[#FFF] text-[14px] text-[#121218] font-[Pretendard] leading-[22px] placeholder:text-[#75787B] max-w-full'
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
