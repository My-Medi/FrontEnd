import { scheduleData, getSchedulesForDate } from '../../../data/scheduleData';

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected?: boolean;
  hasEvent?: string | string[];
}

export const generateCalendarData = (currentDate: Date, today: Date): CalendarDay[][] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const prevLastDay = new Date(year, month, 0);
  
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;
  
  const weeks: CalendarDay[][] = [];
  let currentWeek: CalendarDay[] = [];
  
  // 이전 달의 날짜들
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = prevLastDay.getDate() - i;
    currentWeek.push({
      date,
      isCurrentMonth: false,
      isToday: false,
    });
  }
  
      // 현재 달의 날짜들
    for (let date = 1; date <= lastDay.getDate(); date++) {
      const isToday = 
        year === today.getFullYear() &&
        month === today.getMonth() &&
        date === today.getDate();
      
      // 해당 날짜의 스케줄이 있는지 확인 (기존 + 랜덤 스케줄 포함)
      const selectedDate = new Date(year, month, date);
      const daySchedules = getSchedulesForDate(selectedDate);
      
      let hasEvent: string | string[] = '';
      if (daySchedules.length > 0) {
        if (daySchedules.length === 1) {
          hasEvent = daySchedules[0].title; // 단일 이벤트인 경우 문자열
        } else {
          hasEvent = daySchedules.map(schedule => schedule.title); // 여러 이벤트인 경우 배열
        }
      }
      
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
  
  // 다음 달의 날짜들
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
}; 