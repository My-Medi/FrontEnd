// import React, { useState } from 'react';
// import BackIcon from '/src/assets/back.svg';
// import TimeIcon from '/src/assets/Calendar/time.svg';
// import LocationIcon from '/src/assets/Calendar/location.svg';
// import MemoIcon from '/src/assets/Calendar/memo.svg';
// import type dayjs from 'dayjs';

// interface ConsultDateModalProps {
//   onClose: () => void;
//   selectedDate: dayjs.Dayjs;
// }

// const ConsultDateModal: React.FC<ConsultDateModalProps> = ({ onClose, selectedDate }) => {
//   const [hour, setHour] = useState('');
//   const [minute, setMinute] = useState('');
//   const [meridiem, setMeridiem] = useState<'오전' | '오후'>('오전');
//   const [location, setLocation] = useState('');
//   const [memo, setMemo] = useState('');

//   const toggleMeridiem = () => {
//     setMeridiem((prev) => (prev === '오전' ? '오후' : '오전'));
//   };

//   return (
//     <>
//       <div className='fixed inset-0 bg-black/30 z-40' />
//       <div className='absolute left-1/2 -translate-x-1/2 z-50 top-[20px]'>
//         <div className='hidden lg:flex flex-col items-center gap-[40px] relative w-[889px] pt-[50px] pl-[50px] pr-[80px] pb-[50px] rounded-[40px] bg-white shadow-md'>
//           {/* 상단 헤더 */}
//           <div className='flex mt-[-10px] items-center gap-6 self-start'>
//             <button
//               onClick={onClose}
//               className='cursor-pointer shrink-0 flex items-center justify-center'
//             >
//               <img src={BackIcon} alt='뒤로가기' className='w-[17px] h-[35px]' />
//             </button>
//             <div className='flex flex-col ml-[-80px] w-[837px] items-center justify-between h-[60px]'>
//               <p className='text-[#121218] mt-[15px] text-[24px] font-semibold font-[Pretendard] leading-[36px] tracking-[-0.72px]'>
//                 상담 예약일 지정
//               </p>
//             </div>
//           </div>

//           {/* 입력 영역 */}
//           <div className='flex flex-col w-[740px] h-[245px] gap-6'>
//             {/* 시간 */}
//             <div className='flex items-center gap-4'>
//               <img src={TimeIcon} alt='시간' className='w-[16px] h-[16px]' />
//               <span className='text-[#4D5053] text-[14px] font-medium font-[Pretendard] leading-[24px] tracking-[-0.42px] mr-1'>
//                 시간
//               </span>

//               <div className='flex items-center gap-[16px] w-[176px] h-[39px] px-[24px] rounded-[8px] border border-[#EDF0F3] bg-white'>
//                 <input
//                   type='text'
//                   value={hour}
//                   onChange={(e) => setHour(e.target.value)}
//                   placeholder='00'
//                   className='w-[24px] text-[#C5C8CB] text-[16px] font-light outline-none text-center'
//                 />
//                 <span className='text-[#4D5053] text-[16px] font-light'>:</span>
//                 <input
//                   type='text'
//                   value={minute}
//                   onChange={(e) => setMinute(e.target.value)}
//                   placeholder='00'
//                   className='w-[24px] text-[#C5C8CB] text-[16px] font-light outline-none text-center'
//                 />
//               </div>

//               <button
//                 className='ml-[16px] flex w-[39px] h-[39px] px-[10px] justify-center items-center rounded-[8px] bg-white shadow-md'
//                 onClick={toggleMeridiem}
//               >
//                 <span className='text-[#4D5053] text-[16px] font-light'>{meridiem}</span>
//               </button>
//             </div>

//             {/* 장소 */}
//             <div className='flex items-center gap-4'>
//               <img src={LocationIcon} alt='장소' className='w-[16.51px] h-[20.17px]' />
//               <span className='text-[#4D5053] text-[14px] font-medium font-[Pretendard] leading-[24px] tracking-[-0.42px]'>
//                 장소
//               </span>
//               <input
//                 type='text'
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder='장소'
//                 className='w-[339px] px-[24px] py-[10px] rounded-[8px] border border-[#EDF0F3] bg-white text-[#9DA0A3] text-[16px] font-light outline-none'
//               />
//             </div>

//             {/* 메모 */}
//             <div className='flex items-center gap-4'>
//               <img src={MemoIcon} alt='메모' className='w-[16.08px] h-[16.05px]' />
//               <span className='text-[#4D5053] text-[14px] font-medium font-[Pretendard] leading-[24px] tracking-[-0.42px]'>
//                 메모
//               </span>
//               <input
//                 type='text'
//                 value={memo}
//                 onChange={(e) => setMemo(e.target.value)}
//                 placeholder='메모'
//                 className='w-[339px] px-[24px] py-[10px] rounded-[8px] border border-[#EDF0F3] bg-white text-[#9DA0A3] text-[16px] font-light outline-none'
//               />
//             </div>
//           </div>

//           {/* 등록 버튼 */}
//           <button
//             className='w-[160px] h-[48px] mt-4 rounded-[12px] bg-[#306BFF] text-white text-[16px] font-semibold font-[Pretendard] shadow-sm'
//             onClick={() => alert('등록 완료')}
//           >
//             등록
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ConsultDateModal;

import React, { useState } from 'react';
import BackIcon from '/src/assets/back.svg';
import TimeIcon from '/src/assets/Calendar/time.svg';
import LocationIcon from '/src/assets/Calendar/location.svg';
import MemoIcon from '/src/assets/Calendar/memo.svg';
import type dayjs from 'dayjs';
import SuccessReservationModal from './SuccessReservationModal';

interface ConsultDateModalProps {
  onClose: () => void;
  selectedDate: dayjs.Dayjs;
}

const ConsultDateModal: React.FC<ConsultDateModalProps> = ({ onClose, selectedDate }) => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [meridiem, setMeridiem] = useState<'오전' | '오후'>('오전');
  const [location, setLocation] = useState('');
  const [memo, setMemo] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleRegister = () => {
    setIsSuccessModalOpen(true);
  };

  const toggleMeridiem = () => {
    setMeridiem((prev) => (prev === '오전' ? '오후' : '오전'));
  };

  return (
    <>
      <div className='fixed inset-0 bg-black/30 z-40' />
      <div className='absolute left-1/2 -translate-x-1/2 z-50 top-[20px]'>
        <div className='hidden lg:flex flex-col items-center gap-[40px] relative w-[889px] pt-[50px] pl-[50px] pr-[80px] pb-[50px] rounded-[40px] bg-white shadow-md'>
          {/* 상단 헤더 */}
          <div className='flex mt-[-10px] items-center gap-6 self-start'>
            <button
              onClick={onClose}
              className='cursor-pointer shrink-0 flex items-center justify-center'
            >
              <img src={BackIcon} alt='뒤로가기' className='w-[17px] h-[35px]' />
            </button>
            <div className='flex flex-col ml-[-80px] w-[837px] items-center justify-between h-[60px]'>
              <p className='text-[#121218] mt-[15px] text-[24px] font-semibold font-[Pretendard] leading-[36px] tracking-[-0.72px]'>
                상담 예약 상세 입력
              </p>
            </div>
          </div>

          {/* 입력 영역 */}
          <div className='w-[402px] h-[165px] mx-auto flex flex-col justify-center gap-6'>
            {/* 시간 입력 */}
            <div className='flex items-center gap-4'>
              <img src={TimeIcon} alt='시간' className='w-[16px] h-[16px]' />
              <span className='text-[#4D5053] text-[14px] font-medium leading-[24px] tracking-[-0.42px]'>
                시간
              </span>

              <div className='flex items-center gap-[16px] w-[176px] h-[39px] px-[16px] rounded-[8px] border border-[#EDF0F3] bg-white'>
                <input
                  type='text'
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder='00'
                  className='w-[24px] text-center text-[#C5C8CB] text-[16px] font-light outline-none'
                />
                <span className='text-[#4D5053] text-[16px] font-light'>:</span>
                <input
                  type='text'
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  placeholder='00'
                  className='w-[24px] text-center text-[#C5C8CB] text-[16px] font-light outline-none'
                />
              </div>

              <button
                className='w-[48px] h-[39px] ml-[8px] rounded-[8px] bg-white shadow border border-[#EDF0F3] text-[#4D5053] text-[16px] font-light'
                onClick={toggleMeridiem}
              >
                {meridiem}
              </button>
            </div>

            {/* 장소 입력 */}
            <div className='flex items-center gap-4'>
              <img src={LocationIcon} alt='장소' className='w-[16px] h-[16px]' />
              <span className='text-[#4D5053] text-[14px] font-medium leading-[24px] tracking-[-0.42px]'>
                장소
              </span>
              <input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='장소'
                className='w-[300px] px-[16px] py-[10px] rounded-[8px] border border-[#EDF0F3] bg-white text-[#9DA0A3] text-[16px] font-light outline-none'
              />
            </div>

            {/* 메모 입력 */}
            <div className='flex items-center gap-4'>
              <img src={MemoIcon} alt='메모' className='w-[16px] h-[16px]' />
              <span className='text-[#4D5053] text-[14px] font-medium leading-[24px] tracking-[-0.42px]'>
                메모
              </span>
              <input
                type='text'
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder='메모'
                className='w-[300px] px-[16px] py-[10px] rounded-[8px] border border-[#EDF0F3] bg-white text-[#9DA0A3] text-[16px] font-light outline-none'
              />
            </div>
          </div>
          {/* 등록 버튼 */}
          <div className='flex flex-col justify-center items-center border-[#1D68FF] w-[274px] h-[48px]'>
            <button
              className='flex justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#1D68FF] border border-[#E3E6EB] text-[#FFF] text-[18px] font-semibold font-[Pretendard] leading-[27px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
              onClick={handleRegister}
            >
              등록
            </button>
          </div>
        </div>
      </div>
      {isSuccessModalOpen && (
        <SuccessReservationModal onClose={() => setIsSuccessModalOpen(false)} />
      )}
    </>
  );
};

export default ConsultDateModal;
