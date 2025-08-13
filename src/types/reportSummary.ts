import type { ApiResponse } from './common';

export interface ReportSummary {
  reportId: number;
  userId: number;
  round: number;
  checkupDate: string;
  obesity: {
    bmi: number;
    waistType: string;
  };
  hypertension: {
    systolic: number;
    diastolic: number;
  };
  diabetes: {
    fastingGlucose: number;
  };
  kidney: {
    creatinine: number;
    egfr: number;
  };
  liver: {
    ast: number;
    alt: number;
    gtp: number;
  };
  anemia: {
    hemoglobin: number;
  };
  dyslipidemia: {
    totalCholesterol: number;
    hdl: number;
    triglyceride: number;
    ldl: number;
  };
  urine: {
    urineTestStatus: string;
  };
}

export type ReportSummaryResponse = ApiResponse<ReportSummary>;


