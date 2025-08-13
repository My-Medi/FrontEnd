export type HealthStatus = 'SAFE' | 'WATCH' | 'DANGER' | 'NORMAL' | 'CAUTION' | 'UNKNOWN';

export type Rank = '상위' | '중간' | '하위' | '비교불가' | null;

//비만-체질량지수
export interface ComparingBmi {
  bmi: number; //환자 수치
  averageBmi: number; //데이터 수치
  percentageBmi: number; //상위 ~%일 때의 %
  healthStatus: HealthStatus; //건강단계
  rank: Rank; //상위, 하위, 비교불가
  averageComparison: string; //세부지표 텍스트
}

//비만-허리둘레
export interface ComparingWaist {
  waist: number;
  averageWaist: number;
  percentageWaist: number;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//비만
export interface ObesityAssessmentDto {
  comparingBmi: ComparingBmi;
  comparingWaist: ComparingWaist;
  averageComparisonResult: string; //텍스트 결과값
}

//혈압-수축기
export interface ComparingSystolicBp {
  systolicBp: number;
  averageSystolicBp: number;
  percentageSystolicBp: number;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//혈압-이완기
export interface ComparingDiastolicBp {
  diastolicBp: number;
  averageDiastolicBp: number;
  percentageDiastolicBp: number;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//혈압
export interface HypertensionAssessmentDto {
  comparingSystolicBp: ComparingSystolicBp;
  comparingDiastolicBp: ComparingDiastolicBp;
  averageComparisonResult: string;
}

//빈혈-혈색소
export interface ComparingHemoglobin {
  hemoglobin: number;
  averageHemoglobin: number;
  percentageHemoglobin: number;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//빈혈
export interface AnemiaAssessmentDto {
  comparingHemoglobin: ComparingHemoglobin;
  averageComparisonResult: string;
}

//당뇨병-공복혈당
export interface ComparingFastingBloodSugar {
  fastingBloodSugar: number;
  averageFastingBloodSugar: number;
  percentageFastingBloodSugar: number;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//당뇨병
export interface DiabetesAssessmentDto {
  comparingFastingBloodSugar: ComparingFastingBloodSugar;
  averageComparisonResult: string;
}

//이상지질혈증-총콜레스테롤
export interface ComparingTotalCholesterol {
  totalCholesterol: number;
  averageTotalCholesterol: number;
  percentageTotalCholesterol: number | null;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//이상지질혈증-HDL-콜레스테롤
export interface ComparingHDL {
  hdl: number;
  averageHDL: number;
  percentageHDL: number | null;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//아상지질혈증-중성지방
export interface ComparingTriglyceride {
  triglyceride: number;
  averageTriglyceride: number;
  percentageTriglyceride: number | null;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//이상지질혈증-LDL-콜레스테롤
export interface ComparingLDL {
  ldl: number;
  averageLDL: number;
  percentageLDL: number | null;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//이상지질혈증
export interface DyslipidemiaAssessmentDto {
  comparingTotalCholesterol: ComparingTotalCholesterol;
  comparingHDL: ComparingHDL;
  comparingTriglyceride: ComparingTriglyceride;
  comparingLDL: ComparingLDL;
  averageComparisonResult: string;
}

//신장질환-혈청 크레아티닌
export interface ComparingSerumCreatinine {
  serumCreatinine: number;
  averageSerumCreatinine: number;
  percentageSerumCreatinine: number | null;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//신장질환-eGFR
export interface ComparingEGfr {
  e_gfr: number;
  averageE_GFR: number;
  percentageE_GFR: number | null;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//신장질환
export interface KidneyDiseaseAssessmentDto {
  comparingSerumCreatinine: ComparingSerumCreatinine;
  comparingEGfr: ComparingEGfr;
  averageComparisonResult: string;
}

//간장질환-AST
export interface ComparingAst {
  ast: number;
  averageAst: number;
  percentageAst: number;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//간장질환-ALT
export interface ComparingAlt {
  alt: number;
  averageAlt: number;
  percentageAlt: number;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//간장질환-감마-GTP
export interface ComparingGammaGtp {
  gammaGtp: number;
  averageGammaGtp: number;
  percentageGammaGtp: number;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//간장질환
export interface LiverDiseaseAssessmentDto {
  comparingAst: ComparingAst;
  comparingAlt: ComparingAlt;
  comparingGammaGtp: ComparingGammaGtp;
  averageComparisonResult: string;
}

//요단백(세부지표)
export interface ComparingUrineProtein {
  urineTestStatus: string;
  averageUrineStatus: string;
  healthStatus: HealthStatus;
  rank: Rank;
  averageComparison: string;
}

//요단백(카테고리)
export interface UrineProteinAssessmentDto {
  comparingUrineProtein: ComparingUrineProtein;
}

export interface MyMedicalReportResponse {
  totalDataSize: number;
  ageGroup10Yr: number; //연령
  obesityAssessmentDto: ObesityAssessmentDto; //비만
  hypertensionAssessmentDto: HypertensionAssessmentDto; //고혈압
  anemiaAssessmentDto: AnemiaAssessmentDto; //빈혈
  diabetesAssessmentDto: DiabetesAssessmentDto; //당뇨
  dyslipidemiaAssessmentDto: DyslipidemiaAssessmentDto; //이상지질혈증
  kidneyDiseaseAssessmentDto: KidneyDiseaseAssessmentDto; //신장질환
  liverDiseaseAssessmentDto: LiverDiseaseAssessmentDto; //간장질환
  urineProteinAssessmentDto: UrineProteinAssessmentDto; //요단백
}
