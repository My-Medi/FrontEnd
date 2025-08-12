import type { ApiResponse } from '../common';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface AcceptedMember {
  consultationId: number;
  userId: number;
  nickname: string;
  gender: Gender;
  weight: number;
  height: number;
  age: string;
  profileImage: string;
  recentCheckupDate: string;
  interestAreas: string[];
}

export interface AcceptedMemberListResult {
  content: AcceptedMember[];
  totalPages: number;
}

export type AcceptedMemberListResponse = ApiResponse<AcceptedMemberListResult>;
