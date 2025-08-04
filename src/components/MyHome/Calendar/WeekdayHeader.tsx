import React from 'react';

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const WeekdayHeader: React.FC = () => {
  return (
    <div className="bg-[#F1F5FF] border-t-2 border-t-[#1D68FF] border-b border-[#DBE6FF]">
      <div className="grid grid-cols-7">
        {weekDays.map((day) => (
          <div key={day} className="h-[36px] flex items-center justify-start px-4 border-r border-[#DBE6FF] last:border-r-0">
            <span className="text-[14px] font-medium text-[#121218] leading-[1.71] tracking-[-0.42px]">
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekdayHeader; 