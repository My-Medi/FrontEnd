import type { HealthStatus, MyMedicalReportResponse } from '../../types/myMedicalReport/compare';

export type UiStage = '안심' | '정상' | '관심' | '주의' | '위험' | 'unknown';

// 백엔드 healthStatus → 프론트 stage
const HEALTH_STATUS_TO_STAGE: Record<HealthStatus | 'UNKNOWN' | string, UiStage> = {
  SAFE: '안심',
  NORMAL: '정상',
  WATCH: '관심',
  CAUTION: '주의',
  DANGER: '위험',
  UNKNOWN: 'unknown',
  NULL: 'unknown',
};

const AVG_RESULT_TO_KO: Record<
  string,
  '높습니다' | '낮습니다' | '비슷합니다' | '자료를 찾을 수 없습니다'
> = {
  ABOVE_GOOD: '높습니다',
  BELOW_BAD: '낮습니다',
  SIMILAR: '비슷합니다',
  INSUFFICIENT: '자료를 찾을 수 없습니다',
};

export type ComparingIndicator = {
  id: string; // ex) 'bmi', 'waist', 'sbp', ...
  label: string; // 표시 라벨
  userValue: number | string | null;
  average: number | string | null;
  percentage: number | null; // 백엔드 소수1자리 유지
  rank: string | null; // '상위' | '하위' | '비교불가' | null
  averageComparison: string; // "평균보다 매우 높습니다." 등
  stage: UiStage;
};

export type ComparingCategory = {
  key:
    | 'obesity'
    | 'hypertension'
    | 'anemia'
    | 'diabetes'
    | 'dyslipidemia'
    | 'kidney'
    | 'liver'
    | 'urine';
  title: string;
  summary: '상위 양호' | '하위 불량' | '유사' | '자료부족';
  indicators: ComparingIndicator[];
};

export type ComparingUiModel = {
  meta: {
    totalDataSize: number;
    ageGroup10Yr: number;
    // swagger 예시에 있던 값은 타입엔 없어서 optional 처리
    nickname?: string;
    gender?: string;
  };
  categories: ComparingCategory[];
};

const safe = <T, K extends keyof T>(obj: T | null | undefined, key: K) =>
  obj && obj[key] !== undefined ? (obj[key] as any) : null;

const mapStage = (hs: HealthStatus | string | null): UiStage =>
  hs ? (HEALTH_STATUS_TO_STAGE[hs] ?? 'unknown') : 'unknown';

export function mapComparingResponse(result: MyMedicalReportResponse): ComparingUiModel {
  const ob = result.obesityAssessmentDto;
  const ht = result.hypertensionAssessmentDto;
  const an = result.anemiaAssessmentDto;
  const db = result.diabetesAssessmentDto;
  const dl = result.dyslipidemiaAssessmentDto;
  const kd = result.kidneyDiseaseAssessmentDto;
  const lv = result.liverDiseaseAssessmentDto;
  const ur = result.urineProteinAssessmentDto;

  const obesity: ComparingCategory = {
    key: 'obesity',
    title: '비만/복부비만',
    summary: AVG_RESULT_TO_KO[ob?.averageComparisonResult] ?? '자료부족',
    indicators: [
      {
        id: 'bmi',
        label: '체질량지수',
        userValue: ob?.comparingBmi?.bmi ?? null,
        average: ob?.comparingBmi?.averageBmi ?? null,
        percentage: ob?.comparingBmi?.percentageBmi ?? null,
        rank: ob?.comparingBmi?.rank ?? null,
        averageComparison: ob?.comparingBmi?.averageComparison ?? '',
        stage: mapStage(ob?.comparingBmi?.healthStatus ?? null),
      },
      {
        id: 'waist',
        label: '허리둘레',
        userValue: ob?.comparingWaist?.waist ?? null,
        average: ob?.comparingWaist?.averageWaist ?? null,
        percentage: ob?.comparingWaist?.percentageWaist ?? null,
        rank: ob?.comparingWaist?.rank ?? null,
        averageComparison: ob?.comparingWaist?.averageComparison ?? '',
        stage: mapStage(ob?.comparingWaist?.healthStatus ?? null),
      },
    ],
  };

  const hypertension: ComparingCategory = {
    key: 'hypertension',
    title: '고혈압',
    summary: AVG_RESULT_TO_KO[ht?.averageComparisonResult] ?? '자료부족',
    indicators: [
      {
        id: 'sbp',
        label: '수축기혈압',
        userValue: ht?.comparingSystolicBp?.systolicBp ?? null,
        average: ht?.comparingSystolicBp?.averageSystolicBp ?? null,
        percentage: ht?.comparingSystolicBp?.percentageSystolicBp ?? null,
        rank: ht?.comparingSystolicBp?.rank ?? null,
        averageComparison: ht?.comparingSystolicBp?.averageComparison ?? '',
        stage: mapStage(ht?.comparingSystolicBp?.healthStatus ?? null),
      },
      {
        id: 'dbp',
        label: '이완기혈압',
        userValue: ht?.comparingDiastolicBp?.diastolicBp ?? null,
        average: ht?.comparingDiastolicBp?.averageDiastolicBp ?? null,
        percentage: ht?.comparingDiastolicBp?.percentageDiastolicBp ?? null,
        rank: ht?.comparingDiastolicBp?.rank ?? null,
        averageComparison: ht?.comparingDiastolicBp?.averageComparison ?? '',
        stage: mapStage(ht?.comparingDiastolicBp?.healthStatus ?? null),
      },
    ],
  };

  const anemia: ComparingCategory = {
    key: 'anemia',
    title: '빈혈',
    summary: AVG_RESULT_TO_KO[an?.averageComparisonResult] ?? '자료부족',
    indicators: [
      {
        id: 'hemoglobin',
        label: '혈색소',
        userValue: an?.comparingHemoglobin?.hemoglobin ?? null,
        average: an?.comparingHemoglobin?.averageHemoglobin ?? null,
        percentage: an?.comparingHemoglobin?.percentageHemoglobin ?? null,
        rank: an?.comparingHemoglobin?.rank ?? null,
        averageComparison: an?.comparingHemoglobin?.averageComparison ?? '',
        stage: mapStage(an?.comparingHemoglobin?.healthStatus ?? null),
      },
    ],
  };

  const diabetes: ComparingCategory = {
    key: 'diabetes',
    title: '당뇨',
    summary: AVG_RESULT_TO_KO[db?.averageComparisonResult] ?? '자료부족',
    indicators: [
      {
        id: 'fbs',
        label: '공복혈당',
        userValue: db?.comparingFastingBloodSugar?.fastingBloodSugar ?? null,
        average: db?.comparingFastingBloodSugar?.averageFastingBloodSugar ?? null,
        percentage: db?.comparingFastingBloodSugar?.percentageFastingBloodSugar ?? null,
        rank: db?.comparingFastingBloodSugar?.rank ?? null,
        averageComparison: db?.comparingFastingBloodSugar?.averageComparison ?? '',
        stage: mapStage(db?.comparingFastingBloodSugar?.healthStatus ?? null),
      },
    ],
  };

  const dyslipidemia: ComparingCategory = {
    key: 'dyslipidemia',
    title: '이상지질혈증',
    summary: AVG_RESULT_TO_KO[dl?.averageComparisonResult] ?? '자료부족',
    indicators: [
      {
        id: 'tc',
        label: '총콜레스테롤',
        userValue: dl?.comparingTotalCholesterol?.totalCholesterol ?? null,
        average: dl?.comparingTotalCholesterol?.averageTotalCholesterol ?? null,
        percentage: dl?.comparingTotalCholesterol?.percentageTotalCholesterol ?? null,
        rank: dl?.comparingTotalCholesterol?.rank ?? null,
        averageComparison: dl?.comparingTotalCholesterol?.averageComparison ?? '',
        stage: mapStage(dl?.comparingTotalCholesterol?.healthStatus ?? null),
      },
      {
        id: 'hdl',
        label: 'HDL 콜레스테롤',
        userValue: dl?.comparingHDL?.hdl ?? null,
        average: dl?.comparingHDL?.averageHDL ?? null,
        percentage: dl?.comparingHDL?.percentageHDL ?? null,
        rank: dl?.comparingHDL?.rank ?? null,
        averageComparison: dl?.comparingHDL?.averageComparison ?? '',
        stage: mapStage(dl?.comparingHDL?.healthStatus ?? null),
      },
      {
        id: 'tg',
        label: '중성지방',
        userValue: dl?.comparingTriglyceride?.triglyceride ?? null,
        average: dl?.comparingTriglyceride?.averageTriglyceride ?? null,
        percentage: dl?.comparingTriglyceride?.percentageTriglyceride ?? null,
        rank: dl?.comparingTriglyceride?.rank ?? null,
        averageComparison: dl?.comparingTriglyceride?.averageComparison ?? '',
        stage: mapStage(dl?.comparingTriglyceride?.healthStatus ?? null),
      },
      {
        id: 'ldl',
        label: 'LDL 콜레스테롤',
        userValue: dl?.comparingLDL?.ldl ?? null,
        average: dl?.comparingLDL?.averageLDL ?? null,
        percentage: dl?.comparingLDL?.percentageLDL ?? null,
        rank: dl?.comparingLDL?.rank ?? null,
        averageComparison: dl?.comparingLDL?.averageComparison ?? '',
        stage: mapStage(dl?.comparingLDL?.healthStatus ?? null),
      },
    ],
  };

  const kidney: ComparingCategory = {
    key: 'kidney',
    title: '신장질환',
    summary: AVG_RESULT_TO_KO[kd?.averageComparisonResult] ?? '자료부족',
    indicators: [
      {
        id: 'creatinine',
        label: '혈청크레아티닌',
        userValue: kd?.comparingSerumCreatinine?.serumCreatinine ?? null,
        average: kd?.comparingSerumCreatinine?.averageSerumCreatinine ?? null,
        percentage: kd?.comparingSerumCreatinine?.percentageSerumCreatinine ?? null,
        rank: kd?.comparingSerumCreatinine?.rank ?? null,
        averageComparison: kd?.comparingSerumCreatinine?.averageComparison ?? '',
        stage: mapStage(kd?.comparingSerumCreatinine?.healthStatus ?? null),
      },
      {
        id: 'egfr',
        label: 'eGFR',
        userValue: kd?.comparingEGfr?.e_gfr ?? null,
        average: kd?.comparingEGfr?.averageE_GFR ?? null,
        percentage: kd?.comparingEGfr?.percentageE_GFR ?? null,
        rank: kd?.comparingEGfr?.rank ?? null,
        averageComparison: kd?.comparingEGfr?.averageComparison ?? '',
        stage: mapStage(kd?.comparingEGfr?.healthStatus ?? null),
      },
    ],
  };

  const liver: ComparingCategory = {
    key: 'liver',
    title: '간질환',
    summary: AVG_RESULT_TO_KO[lv?.averageComparisonResult] ?? '자료부족',
    indicators: [
      {
        id: 'ast',
        label: 'AST',
        userValue: lv?.comparingAst?.ast ?? null,
        average: lv?.comparingAst?.averageAst ?? null,
        percentage: lv?.comparingAst?.percentageAst ?? null,
        rank: lv?.comparingAst?.rank ?? null,
        averageComparison: lv?.comparingAst?.averageComparison ?? '',
        stage: mapStage(lv?.comparingAst?.healthStatus ?? null),
      },
      {
        id: 'alt',
        label: 'ALT',
        userValue: lv?.comparingAlt?.alt ?? null,
        average: lv?.comparingAlt?.averageAlt ?? null,
        percentage: lv?.comparingAlt?.percentageAlt ?? null,
        rank: lv?.comparingAlt?.rank ?? null,
        averageComparison: lv?.comparingAlt?.averageComparison ?? '',
        stage: mapStage(lv?.comparingAlt?.healthStatus ?? null),
      },
      {
        id: 'ggt',
        label: '감마GT',
        userValue: lv?.comparingGammaGtp?.gammaGtp ?? null,
        average: lv?.comparingGammaGtp?.averageGammaGtp ?? null,
        percentage: lv?.comparingGammaGtp?.percentageGammaGtp ?? null,
        rank: lv?.comparingGammaGtp?.rank ?? null,
        averageComparison: lv?.comparingGammaGtp?.averageComparison ?? '',
        stage: mapStage(lv?.comparingGammaGtp?.healthStatus ?? null),
      },
    ],
  };

  const urine: ComparingCategory = {
    key: 'urine',
    title: '요단백',
    // 카테고리 요약값이 응답에 없으므로 안전한 기본값(원하면 바꿔도 됨)
    summary: '유사',
    indicators: [
      {
        id: 'urine',
        label: '요단백',
        userValue: ur?.comparingUrineProtein?.urineTestStatus ?? null,
        average: ur?.comparingUrineProtein?.averageUrineStatus ?? null,
        percentage: null,
        rank: ur?.comparingUrineProtein?.rank ?? null,
        averageComparison: ur?.comparingUrineProtein?.averageComparison ?? '',
        stage: mapStage(ur?.comparingUrineProtein?.healthStatus ?? null),
      },
    ],
  };

  // swagger 예시엔 nickname, gender가 있었지만 타입엔 없어 optional 처리
  const metaAny = result as any;

  return {
    meta: {
      totalDataSize: result.totalDataSize ?? 0,
      ageGroup10Yr: result.ageGroup10Yr ?? 0,
      nickname: metaAny?.nickname,
      gender: metaAny?.gender,
    },
    categories: [obesity, hypertension, anemia, diabetes, dyslipidemia, kidney, liver, urine],
  };
}
