import React from 'react';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className='fixed inset-0 fixed inset-0 bg-black/30 z-40 flex justify-center items-center z-50'>
      <div className='bg-white rounded-[18px] w-[587px] py-[27px] px-[62.4px] flex flex-col items-center'>
        <div className='flex py-[60px] px-[0px] justify-center items-center gap-[6px]'>
          <h3 className='text-[#121218] text-[24px] font-[Pretendard] tracking-[-0.72px] font-medium text-center'>
            알림을 삭제하시겠습니까?
          </h3>
        </div>
        <div className='flex justify-center gap-[30px] mt-[4.2px]'>
          <button
            onClick={onCancel}
            className='flex justify-center items-center gap-[6px] w-[216px] h-[46.8px] rounded-full text-[#121218] text-[20px] font-medium font-[Pretendard] border border-[#E3E6EB] tracking-[-0.6px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className='flex justify-center bg-[#75787B] items-center gap-[6px] w-[216px] h-[46.8px] rounded-full text-[#FFF] text-[20px] font-medium font-[Pretendard] border border-[#E3E6EB] tracking-[-0.6px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
