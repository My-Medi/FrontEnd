import React from 'react';

interface HealthDataModalProps {
  onClose: () => void;
}

const HealthDataModal: React.FC<HealthDataModalProps> = ({ onClose }) => {
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white rounded-xl p-6 w-[500px] shadow-lg relative'>
        <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-black'>
          ✕
        </button>
        <h2 className='text-xl font-bold mb-4'>환자 건강데이터</h2>
        <p></p>
      </div>
    </div>
  );
};

export default HealthDataModal;
