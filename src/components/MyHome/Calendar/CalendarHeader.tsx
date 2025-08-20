import React from 'react';
import beforeIcon from '../../../assets/MyHome/c-before.svg';
import nextIcon from '../../../assets/MyHome/c-next.svg';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const monthNames = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth 
}) => {
  return (
    <>
      {/* 제목 */}
      <div className="text-[#121212] text-[18px] font-[600] leading-[1.5] tracking-[-0.54px] mb-[9px]">
        건강 캘린더
      </div>

      {/* 월/년도 네비게이션 */}
      <div className="flex items-center justify-center mb-[29px]">
        <button 
          onClick={onPrevMonth}
          className="w-[1.784rem] h-[2.098rem] flex items-center justify-center mr-[28px]" 
        >
          <img src={beforeIcon} alt="이전 달" className="w-full h-full object-contain" />
        </button>
        
        <div className="flex items-center gap-[21px]">
          <span className="text-[14px] font-light text-[#121218] leading-[1.57] tracking-[-0.42px]">
            {currentDate.getFullYear()}
          </span>
          <span className="text-[20px] font-medium text-[#121218] leading-[1.19] tracking-[-0.6px]">
            {monthNames[currentDate.getMonth()]}
          </span>
        </div>
        
        <button 
          onClick={onNextMonth}
          className="w-[1.784rem] h-[2.098rem] flex items-center justify-center ml-[79px]"
        >
          <img src={nextIcon} alt="다음 달" className="w-full h-full object-contain" />
        </button>
      </div>
    </>
  );
};

export default CalendarHeader; 