import type { ApiResponse } from '../common';

export interface ExpertAdviceItem {
  adviceId: number;
  adviceComment: string;
  createdDate: string;
}

export interface ExpertAdviceList {
  adviceList: ExpertAdviceItem[];
  totalPages: number;
  page: number;
}

export type ExpertAdviceListResponse = ApiResponse<ExpertAdviceList>;


