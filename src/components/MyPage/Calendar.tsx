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
  
  // 한국 시간 기준 오늘 날짜
  const today = useMemo(() => {
    const now = new Date();
    // 한국 시간대(Asia/Seoul)로 변환
    const koreaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Seoul"}));
    return koreaTime;
  }, []);

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  // 캘린더 데이터 생성
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 현재 월의 첫 번째 날과 마지막 날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 이전 월의 마지막 날
    const prevLastDay = new Date(year, month, 0);
    
    // 첫 번째 날의 요일 (월요일 기준으로 조정: 0=월, 6=일)
    const startDayOfWeek = (firstDay.getDay() + 6) % 7;
    
    // 캘린더 배열 생성
    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];
    
    // 이전 월의 날짜들
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = prevLastDay.getDate() - i;
      currentWeek.push({
        date,
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    // 현재 월의 날짜들
    for (let date = 1; date <= lastDay.getDate(); date++) {
      const isToday = 
        year === today.getFullYear() &&
        month === today.getMonth() &&
        date === today.getDate();
      
      // 예시 이벤트 (실제로는 props나 state로 관리)
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
      
      // 주가 완성되면 weeks에 추가
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }
    
    // 다음 월의 날짜들로 마지막 주 채우기
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

  // 이전 달로 이동
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 월 이름 배열
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  return (
    <div>
      {/* 헤더 - 건강 캘린더 */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#121212]">
          건강 캘린더
        </h2>
      </div>

      {/* 년월 헤더 */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
        {/* 이전 버튼 */}
        <button 
          onClick={goToPrevMonth}
          className="w-2 h-2 sm:w-6 sm:h-6 bg-[#C5C8CB] hover:bg-[#B0B3B6] transition-colors flex items-center justify-center rounded-sm" 
          style={{
            clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)'
          }}
        >
        </button>
        
        {/* 년월 텍스트 */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-lg sm:text-xl lg:text-2xl font-medium text-[#121218]">
            {currentDate.getFullYear()}년
          </span>
          <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D68FF]">
            {monthNames[currentDate.getMonth()]}
          </span>
        </div>
        
        {/* 다음 버튼 */}
        <button 
          onClick={goToNextMonth}
          className="w-2 h-2 sm:w-6 sm:h-6 bg-[#1D68FF] hover:bg-[#0F4CCC] transition-colors flex items-center justify-center rounded-sm"
          style={{
            clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
          }}
        >
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="border-t-4 border-[#1D68FF] bg-[rgba(219,230,255,0.5)]">
        <div className="grid grid-cols-7 gap-0">
          {weekDays.map((day) => (
            <div key={day} className="text-left py-2 sm:py-3 pl-2 sm:pl-3">
              <span className="font-pretendard text-2xl font-semibold text-[#121218] leading-[150%]">
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 캘린더 그리드 */}
      <div className="border-l-2 border-r-2 border-b-2 border-[#DBE6FF]">
        {calendarData.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-0 border-b border-[#DBE6FF] last:border-b-0">
            {week.map((day, dayIndex) => (
              <div 
                key={dayIndex}
                className={`
                  relative h-28 sm:h-32 lg:h-36 xl:h-40 border-r border-[#DBE6FF] last:border-r-0
                  flex flex-col items-start justify-start p-2 sm:p-3
                  ${day.isToday ? 'bg-[rgba(219,230,255,0.5)] outline outline-2 outline-[#1D68FF]' : day.isSelected ? 'bg-[rgba(219,230,255,0.5)] border-2 border-[#1D68FF]' : ''}
                  hover:bg-gray-50 transition-colors cursor-pointer
                  box-border
                `}
              >
                {/* 날짜 */}
                <span 
                  className={`
                    text-lg sm:text-xl lg:text-2xl font-medium leading-none
                    ${day.isToday ? 'text-[#1D68FF] font-bold' : 
                      day.isCurrentMonth ? 'text-[#121218]' : 'text-[#C5C8CB]'}
                  `}
                >
                  {day.date}
                </span>

                {/* 이벤트 표시 */}
                {day.hasEvent && day.isCurrentMonth && (
                  <div className="mt-1 w-full">
                    {day.hasEvent === '이력서 등록일' && (
                      <div className="bg-[rgba(161,246,142,0.3)] px-1 py-0.5 text-[#121218] truncate text-xs sm:text-sm rounded">
                        {day.hasEvent}
                      </div>
                    )}
                    {day.hasEvent === '첫 환자 매칭' && (
                      <span className="text-xs sm:text-sm text-[rgba(255,255,255,0.8)] bg-transparent rounded">
                        {day.hasEvent}
                      </span>
                    )}
                    {day.hasEvent === '00님 예약일' && (
                      <div className="bg-[rgba(29,104,255,0.8)] px-1 py-0.5 text-[rgba(255,255,255,0.8)] truncate text-xs sm:text-sm rounded">
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