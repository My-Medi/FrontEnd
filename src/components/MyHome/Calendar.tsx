import React, { useState, useMemo } from 'react';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected?: boolean;
  hasEvent?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = useMemo(() => {
    const now = new Date();
    const koreaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Seoul"}));
    return koreaTime;
  }, []);

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const prevLastDay = new Date(year, month, 0);
    
    const startDayOfWeek = (firstDay.getDay() + 6) % 7;
    
    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];
    
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = prevLastDay.getDate() - i;
      currentWeek.push({
        date,
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    for (let date = 1; date <= lastDay.getDate(); date++) {
      const isToday = 
        year === today.getFullYear() &&
        month === today.getMonth() &&
        date === today.getDate();
      
      let hasEvent = '';
      if (date === 15) hasEvent = '이력서 등록일';
      if (date === 18) hasEvent = '첫 환자 매칭';
      if (date === 25) hasEvent = '00님 예약일';
      
      currentWeek.push({
        date,
        isCurrentMonth: true,
        isToday,
        hasEvent: hasEvent || undefined,
      });
      
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }
    
    let nextDate = 1;
    while (currentWeek.length < 7) {
      currentWeek.push({
        date: nextDate++,
        isCurrentMonth: false,
        isToday: false,
      });
    }
    weeks.push(currentWeek);
    
    return weeks;
  }, [currentDate, today]);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  return (
    <div>
      <div className="mb-4 lg:mb-6">
        <h2 className="text-lg font-medium text-[#121212] lg:text-2xl">
          건강 캘린더
        </h2>
      </div>

      <div className="flex items-center justify-center gap-4 lg:gap-8 mb-6 lg:mb-8">
        <button 
          onClick={goToPrevMonth}
          className="w-6 h-6 bg-[#C5C8CB] hover:bg-[#B0B3B6] transition-colors flex items-center justify-center rounded-sm" 
          style={{
            clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)'
          }}
        >
        </button>
        
        <div className="flex items-center gap-2 lg:gap-4">
          <span className="text-lg font-medium text-[#121218] lg:text-2xl">
            {currentDate.getFullYear()}년
          </span>
          <span className="text-2xl font-semibold text-[#1D68FF] lg:text-4xl">
            {monthNames[currentDate.getMonth()]}
          </span>
        </div>
        
        <button 
          onClick={goToNextMonth}
          className="w-6 h-6 bg-[#1D68FF] hover:bg-[#0F4CCC] transition-colors flex items-center justify-center rounded-sm"
          style={{
            clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
          }}
        >
        </button>
      </div>

      <div className="border-t-4 border-[#1D68FF] bg-[rgba(219,230,255,0.5)]">
        <div className="grid grid-cols-7 gap-0">
          {weekDays.map((day) => (
            <div key={day} className="text-left py-2 lg:py-3 pl-2 lg:pl-3">
              <span className="font-pretendard text-2xl font-semibold text-[#121218] leading-[150%]">
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-l-2 border-r-2 border-b-2 border-[#DBE6FF]">
        {calendarData.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-0 border-b border-[#DBE6FF] last:border-b-0">
            {week.map((day, dayIndex) => (
              <div 
                key={dayIndex}
                className={`
                  relative h-28 lg:h-40 border-r border-[#DBE6FF] last:border-r-0
                  flex flex-col items-start justify-start p-2 lg:p-3
                  ${day.isToday ? 'bg-[rgba(219,230,255,0.5)] outline outline-2 outline-[#1D68FF]' : day.isSelected ? 'bg-[rgba(219,230,255,0.5)] border-2 border-[#1D68FF]' : ''}
                  hover:bg-gray-50 transition-colors cursor-pointer
                  box-border
                `}
              >
                <span 
                  className={`
                    text-lg font-medium leading-none lg:text-2xl
                    ${day.isToday ? 'text-[#1D68FF] font-bold' : 
                      day.isCurrentMonth ? 'text-[#121218]' : 'text-[#C5C8CB]'}
                  `}
                >
                  {day.date}
                </span>

                {day.hasEvent && day.isCurrentMonth && (
                  <div className="mt-1 w-full">
                    {day.hasEvent === '이력서 등록일' && (
                      <div className="bg-[rgba(161,246,142,0.3)] px-1 py-0.5 text-[#121218] truncate text-xs rounded">
                        {day.hasEvent}
                      </div>
                    )}
                    {day.hasEvent === '첫 환자 매칭' && (
                      <span className="text-xs text-[rgba(255,255,255,0.8)] bg-transparent rounded">
                        {day.hasEvent}
                      </span>
                    )}
                    {day.hasEvent === '00님 예약일' && (
                      <div className="bg-[rgba(29,104,255,0.8)] px-1 py-0.5 text-[rgba(255,255,255,0.8)] truncate text-xs rounded">
                        {day.hasEvent}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar; 