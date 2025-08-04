import React from 'react';

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
          className="w-[33.57px] h-[28.54px] bg-[#C5C8CB] hover:bg-[#B0B3B6] transition-colors flex items-center justify-center rounded-[1.5px] mr-[28px] [clip-path:polygon(100%_0%,100%_100%,0%_50%)]" 
        >
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
          className="w-[28px] h-[28px] bg-[#1D68FF] hover:bg-[#0F4CCC] transition-colors flex items-center justify-center rounded-[1.5px] ml-[79px] [clip-path:polygon(0%_0%,100%_50%,0%_100%)]"
        >
        </button>
      </div>
    </>
  );
};

export default CalendarHeader; 