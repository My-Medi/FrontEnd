import API from '../axios';
import type { ApiResponse } from '../../types/common';

export interface LatestAdviceResult {
  adviceId: number;
  adviceComment: string;
  createdDate: string;
}

export type LatestAdviceResponse = ApiResponse<LatestAdviceResult>;

export const getLatestAdvice = async (): Promise<LatestAdviceResponse> => {
  const res = await API.get<LatestAdviceResponse>('/users/advices/latest');
  return res.data;
};


