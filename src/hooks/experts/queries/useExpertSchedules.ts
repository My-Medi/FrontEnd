import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getExpertSchedulesMonthly, getExpertSchedulesByDate, getExpertUpcomingSchedules } from '../../../apis/expertApi/schedule';
import type { UserScheduleSummaryResponse, UserSchedulesByDateResponse } from '../../../types/schedule';

export const useExpertMonthlySchedules = (year: number, month: number, enabled = true) => {
  return useQuery<UserScheduleSummaryResponse>({
    queryKey: ['expertMonthlySchedules', year, month],
    queryFn: () => getExpertSchedulesMonthly(year, month),
    enabled,
    placeholderData: keepPreviousData,
    select: (data) => data,
  });
};

export const useExpertSchedulesByDate = (date: string, enabled = true) => {
  return useQuery<UserSchedulesByDateResponse>({
    queryKey: ['expertSchedulesByDate', date],
    queryFn: () => getExpertSchedulesByDate(date),
    enabled: enabled && !!date,
    placeholderData: keepPreviousData,
    select: (data) => data,
  });
};

export const useExpertUpcomingSchedules = (enabled = true) => {
  return useQuery<UserSchedulesByDateResponse>({
    queryKey: ['expertUpcomingSchedules'],
    queryFn: () => getExpertUpcomingSchedules(),
    enabled,
    placeholderData: keepPreviousData,
    select: (data) => data,
  });
};


