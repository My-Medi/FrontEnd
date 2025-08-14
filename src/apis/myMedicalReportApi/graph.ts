import API from '../axios';
import type { HealthScoreResponse } from '../../types/myMedicalReport/graph';

export const getHealthScore = async (round: number): Promise<HealthScoreResponse> => {
  const response = await API.get<HealthScoreResponse>(`/users/reports/result?round=${round}`);
  return response.data;
};
