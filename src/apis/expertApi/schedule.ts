import API from '../axios';
import type { UserScheduleSummaryResponse, UserSchedulesByDateResponse } from '../../types/schedule';
import type { ApiResponse } from '../../types/common';

export interface CreateExpertScheduleRequest {
  title: string;
  memo: string;
  location: string;
  meetingDate: string; // YYYY-MM-DD
  hour: number;
  minute: number;
  am: boolean;
}

export type CreateExpertScheduleResponse = ApiResponse<number>;

// 전문가 스케줄 요약(월별) 조회
export const getExpertSchedulesMonthly = async (
  year: number,
  month: number
): Promise<UserScheduleSummaryResponse> => {
  const response = await API.get<UserScheduleSummaryResponse>(
    `/experts/schedules`,
    { params: { year, month } }
  );
  return response.data;
};

// 전문가 특정 날짜 스케줄 상세 조회
export const getExpertSchedulesByDate = async (
  date: string
): Promise<UserSchedulesByDateResponse> => {
  const response = await API.get<UserSchedulesByDateResponse>(
    `/experts/schedules/date`,
    { params: { date } }
  );
  return response.data;
};

// 전문가 다가오는 일정 조회
export const getExpertUpcomingSchedules = async (): Promise<UserSchedulesByDateResponse> => {
  const response = await API.get<UserSchedulesByDateResponse>(
    `/experts/schedules/upcoming`
  );
  return response.data;
};

// 전문가가 특정 사용자에게 상담 일정을 등록
export const createExpertScheduleForUser = async (
  userId: number,
  payload: CreateExpertScheduleRequest
): Promise<CreateExpertScheduleResponse> => {
  const response = await API.post<CreateExpertScheduleResponse>(
    `/experts/schedules/users/${userId}`,
    payload
  );
  return response.data;
};


