// 더미 데이터 의존 제거
import type { UserScheduleSummaryResponse } from '../../../types/schedule';
import { eventColors } from '../../../constants/colors';

export interface CalendarEventLite {
  text: string;
  colorIndex: number;
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected?: boolean;
  hasEvent?: CalendarEventLite[];
}

export const generateCalendarData = (
  currentDate: Date,
  today: Date,
  monthlyApi?: UserScheduleSummaryResponse
): CalendarDay[][] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  // 월 전체에서 순차 순회할 색상 인덱스 시드
  let colorSeed = 0;

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
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      const dayTitles = monthlyApi?.result?.scheduleSummaryDto
        ?.filter((s) => s.meetingDate === iso)
        ?.map((s) => s.title) ?? [];

      let hasEvent: CalendarEventLite[] | undefined = undefined;
      if (dayTitles.length > 0) {
        hasEvent = dayTitles.map((t) => ({
          text: t,
          colorIndex: (colorSeed++) % eventColors.length,
        }));
      }
      
      currentWeek.push({
        date,
        isCurrentMonth: true,
        isToday,
        hasEvent,
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

// 달 전체의 라운드로빈 색상 순회를 그대로 따라, 특정 날짜의 이벤트 색상 인덱스 배열을 반환
export const getColorIndicesForDate = (
  currentDate: Date,
  monthlyApi: UserScheduleSummaryResponse | undefined,
  targetISO: string
): number[] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const lastDay = new Date(year, month + 1, 0);
  let colorSeed = 0;
  let resultForTarget: number[] = [];

  for (let date = 1; date <= lastDay.getDate(); date++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const titles = monthlyApi?.result?.scheduleSummaryDto
      ?.filter((s) => s.meetingDate === iso)
      ?.map((s) => s.title) ?? [];

    if (iso === targetISO) {
      resultForTarget = titles.map(() => (colorSeed++) % eventColors.length);
    } else {
      colorSeed = (colorSeed + titles.length) % eventColors.length;
    }
  }

  return resultForTarget;
};