import type { ApiResponse } from './common';

export interface ScheduleSummaryItem {
  id: number;
  title: string;
  meetingDate: string; // YYYY-MM-DD
}

export interface UserScheduleSummaryResult {
  scheduleSummaryDto: ScheduleSummaryItem[];
}

export type UserScheduleSummaryResponse = ApiResponse<UserScheduleSummaryResult>;

export interface ScheduleDetailItem {
  id: number;
  title: string;
  memo: string;
  location: string;
  meetingDate: string; // YYYY-MM-DD
  hour: number;
  minute: number;
  am: boolean;
}

export type UserSchedulesByDateResponse = ApiResponse<ScheduleDetailItem[]>;


