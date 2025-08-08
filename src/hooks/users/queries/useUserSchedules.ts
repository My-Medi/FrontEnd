import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getUserSchedulesMonthly, getUserSchedulesByDate } from '../../../apis/userApi/user';
import type { UserScheduleSummaryResponse, UserSchedulesByDateResponse } from '../../../types/schedule';

export const useUserMonthlySchedules = (year: number, month: number, enabled = true) => {
  return useQuery<UserScheduleSummaryResponse>({
    queryKey: ['userMonthlySchedules', year, month],
    queryFn: () => getUserSchedulesMonthly(year, month),
    enabled,
    placeholderData: keepPreviousData,
    select: (data) => data,
  });
};

export const useUserSchedulesByDate = (date: string, enabled = true) => {
  return useQuery<UserSchedulesByDateResponse>({
    queryKey: ['userSchedulesByDate', date],
    queryFn: () => getUserSchedulesByDate(date),
    enabled: enabled && !!date,
    placeholderData: keepPreviousData,
    select: (data) => data,
  });
};


