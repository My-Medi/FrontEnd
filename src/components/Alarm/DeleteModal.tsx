import React from 'react';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className='fixed inset-0 fixed inset-0 bg-black/30 z-40 flex justify-center items-center z-50'>
      <div className='bg-white rounded-[20px] w-[400px] p-8 flex flex-col items-center'>
        <h3 className='text-[#121218] text-[20px] font-semibold mb-4 text-center'>
          알림을 삭제하시겠습니까?
        </h3>
        <div className='flex justify-center gap-4 mt-6'>
          <button
            onClick={onCancel}
            className='bg-gray-300 text-[#121218] font-semibold py-2 px-5 rounded-[8px]'
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className='bg-[#1D68FF] text-white font-semibold py-2 px-5 rounded-[8px]'
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
