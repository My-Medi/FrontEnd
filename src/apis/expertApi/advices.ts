import API from '../axios';
import type { ApiResponse } from '../../types/common';
import type { ExpertAdviceListResponse } from '../../types/expert/advice';

export const registerUserAdvice = async (
  userId: number,
  adviceComment: string,
): Promise<ApiResponse<any>> => {
  const res = await API.post<ApiResponse<any>>(
    `/experts/advices/users/${userId}`,
    { adviceComment },
  );
  return res.data;
};

export const getUserAdvices = async (
  userId: number,
  currentPage = 0,
  pageSize = 2,
): Promise<ExpertAdviceListResponse> => {
  const res = await API.get<ExpertAdviceListResponse>(
    `/experts/advices/users/${userId}`,
    { params: { currentPage, pageSize } },
  );
  return res.data;
};


