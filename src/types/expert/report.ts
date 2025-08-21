// 전문가 리포트 관련 타입 정의

export interface ComparingData {
  // BMI 관련
  bmi?: number;
  averageBmi?: number;
  percentageBmi?: number;

  // 허리둘레 관련
  waist?: number;
  averageWaist?: number;
  percentageWaist?: number;

  // 혈압 관련
  systolicBp?: number;
  averageSystolicBp?: number;
  percentageSystolicBp?: number;
  diastolicBp?: number;
  averageDiastolicBp?: number;
  percentageDiastolicBp?: number;

  // 혈색소 관련
  hemoglobin?: number;
  averageHemoglobin?: number;
  percentageHemoglobin?: number;

  // 공복혈당 관련
  fastingBloodSugar?: number;
  averageFastingBloodSugar?: number;
  percentageFastingBloodSugar?: number;

  // 콜레스테롤 관련
  totalCholesterol?: number;
  averageTotalCholesterol?: number;
  percentageTotalCholesterol?: number;
  hdl?: number;
  averageHDL?: number;
  percentageHDL?: number;
  triglyceride?: number;
  averageTriglyceride?: number;
  percentageTriglyceride?: number;
  ldl?: number;
  averageLDL?: number;
  percentageLDL?: number;

  // 신장 관련
  serumCreatinine?: number;
  averageSerumCreatinine?: number;
  percentageSerumCreatinine?: number;
  e_gfr?: number;
  averageE_GFR?: number;
  percentageE_GFR?: number;

  // 간장 관련
  ast?: number;
  averageAst?: number;
  percentageAst?: number;
  alt?: number;
  averageAlt?: number;
  percentageAlt?: number;
  gammaGtp?: number;
  averageGammaGtp?: number;
  percentageGammaGtp?: number;

  // 공통 속성
  healthStatus: 'SAFE' | 'CAUTION' | 'DANGER' | 'WATCH' | 'NORMAL' | 'UNKNOWN';
  rank: string;
  averageComparison: string;
}

export interface ObesityAssessmentDto {
  comparingBmi: ComparingData;
  comparingWaist: ComparingData;
  averageComparisonResult: 'BELOW_BAD' | 'SIMILAR' | 'ABOVE_GOOD';
}

export interface HypertensionAssessmentDto {
  comparingSystolicBp: ComparingData;
  comparingDiastolicBp: ComparingData;
  averageComparisonResult: 'BELOW_BAD' | 'SIMILAR' | 'ABOVE_GOOD';
}

export interface AnemiaAssessmentDto {
  comparingHemoglobin: ComparingData;
  averageComparisonResult: 'BELOW_BAD' | 'SIMILAR' | 'ABOVE_GOOD';
}

export interface DiabetesAssessmentDto {
  comparingFastingBloodSugar: ComparingData;
  averageComparisonResult: 'BELOW_BAD' | 'SIMILAR' | 'ABOVE_GOOD';
}

export interface DyslipidemiaAssessmentDto {
  comparingTotalCholesterol: ComparingData;
  comparingHDL: ComparingData;
  comparingTriglyceride: ComparingData;
  comparingLDL: ComparingData;
  averageComparisonResult: 'BELOW_BAD' | 'SIMILAR' | 'ABOVE_GOOD';
}

export interface KidneyDiseaseAssessmentDto {
  comparingSerumCreatinine: ComparingData;
  comparingEGfr: ComparingData;
  averageComparisonResult: 'BELOW_BAD' | 'SIMILAR' | 'ABOVE_GOOD';
}

export interface LiverDiseaseAssessmentDto {
  comparingAst: ComparingData;
  comparingAlt: ComparingData;
  comparingGammaGtp: ComparingData;
  averageComparisonResult: 'BELOW_BAD' | 'SIMILAR' | 'ABOVE_GOOD';
}

export interface UrineProteinAssessmentDto {
  comparingUrineProtein: {
    urineTestStatus: string;
    averageUrineStatus: string;
    healthStatus: 'SAFE' | 'CAUTION' | 'DANGER' | 'WATCH' | 'NORMAL' | 'UNKNOWN';
    rank: string | null;
    averageComparison: string;
  };
  averageComparisonResult: 'BELOW_BAD' | 'SIMILAR' | 'ABOVE_GOOD';
}

export interface ExpertReportResponse {
  ageGroup10Yr: number;
  checkDate: string;
  obesityAssessmentDto: ObesityAssessmentDto;
  hypertensionAssessmentDto: HypertensionAssessmentDto;
  anemiaAssessmentDto: AnemiaAssessmentDto;
  diabetesAssessmentDto: DiabetesAssessmentDto;
  dyslipidemiaAssessmentDto: DyslipidemiaAssessmentDto;
  kidneyDiseaseAssessmentDto: KidneyDiseaseAssessmentDto;
  liverDiseaseAssessmentDto: LiverDiseaseAssessmentDto;
  urineProteinAssessmentDto: UrineProteinAssessmentDto;
}

export interface ExpertReportResultResponse {
  totalScore: number;
  healthStatus: 'SAFE' | 'CAUTION' | 'DANGER' | 'WATCH' | 'NORMAL' | 'UNKNOWN';
}
