export interface MedicalReportLlmTopRisk {
  rank: number;
  title: string;
  indicators: string; // e.g. "(혈색소 ↓)"
  description: string;
}

export interface MedicalReportLlmResult {
  nickname: string;
  majorAbnormalItems: string[];
  lifestyleAdvice: string[];
  top3Risks: MedicalReportLlmTopRisk[];
  summary: string;
  recommendedActions: string[];
}

export interface MedicalReportLlmResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: MedicalReportLlmResult;
}


