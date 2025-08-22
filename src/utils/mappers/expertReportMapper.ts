// utils/mappers/expertReportMapper.ts

import { FIXED_YEAR } from '../../constants/indicatorMeta';
import type { Category } from '../../constants/medicalCategory';
import type { ExpertReportResponse } from '../../types/expert/report';

type RightItem = {
  id: string;
  title: string;
  year: string;
  ageGroup: string;
  ageGroup10Yr: number;
  value: string;
  unit: string;
  standard?: string;
  gender?: string;
  rankType?: '상위' | '하위' | '비교불가';
  rankPercent?: number;
  comparisonText?: string;
};
type RightCategoryMap = Record<string, RightItem[]>;

export type CompareStageKor = '정상' | '주의' | '위험' | '안심' | '관심' | '알수없음';

const isUnknown = (v: unknown) => v === undefined || v === null || v === '' || v === 'unknown';

const korStageFrom = (status?: string): CompareStageKor => {
  switch ((status ?? 'UNKNOWN').toUpperCase()) {
    case 'SAFE':
      return '안심';
    case 'NORMAL':
      return '정상';
    case 'CAUTION':
      return '주의';
    case 'WATCH':
      return '관심';
    case 'DANGER':
      return '위험';
    default:
      return '알수없음';
  }
};

// 좌측 카드에서 쓸 메타(타이틀·단위)
const LEFT_META: Record<string, { title: string; unit?: string }> = {
  bmi: { title: '체질량지수', unit: 'kg/𝑚²' },
  waist: { title: '허리둘레', unit: 'cm' },
  sbp: { title: '수축기혈압', unit: 'mmHg' },
  dbp: { title: '이완기혈압', unit: 'mmHg' },
  hemoglobin: { title: '혈색소', unit: 'g/dL' },
  fbs: { title: '공복혈당', unit: 'mg/dL' },
  tcho: { title: '총콜레스테롤', unit: 'mg/dL' },
  hdl: { title: 'HDL-콜레스테롤', unit: 'mg/dL' },
  tg: { title: '중성지방', unit: 'mg/dL' },
  ldl: { title: 'LDL-콜레스테롤', unit: 'mg/dL' },
  scr: { title: '혈청 크레아티닌', unit: 'mg/dL' },
  egfr: { title: 'eGFR(신사구체여과율)', unit: 'mL/min/1.73㎡' },
  ast: { title: 'AST', unit: 'IU/L' },
  alt: { title: 'ALT', unit: 'IU/L' },
  ggtp: { title: '감마-GTP', unit: 'IU/L' },
  urine: { title: '요단백' },
};

// 카테고리 ↔ 포함 지표
const CATEGORY_IDS: Record<Category, string[]> = {
  '비만/복부비만': ['bmi', 'waist'],
  고혈압: ['sbp', 'dbp'],
  빈혈: ['hemoglobin'],
  당뇨병: ['fbs'],
  이상지질혈증: ['tcho', 'hdl', 'tg', 'ldl'],
  신장질환: ['scr', 'egfr'],
  간장질환: ['ast', 'alt', 'ggtp'],
  요단백: ['urine'],
};

// 전문가 API 응답에서 좌측 값 뽑기
function pickLeftValues(res: ExpertReportResponse) {
  return {
    bmi: {
      value: res.obesityAssessmentDto?.comparingBmi?.bmi,
      status: res.obesityAssessmentDto?.comparingBmi?.healthStatus,
    },
    waist: {
      value: res.obesityAssessmentDto?.comparingWaist?.waist,
      status: res.obesityAssessmentDto?.comparingWaist?.healthStatus,
    },
    sbp: {
      value: res.hypertensionAssessmentDto?.comparingSystolicBp?.systolicBp,
      status: res.hypertensionAssessmentDto?.comparingSystolicBp?.healthStatus,
    },
    dbp: {
      value: res.hypertensionAssessmentDto?.comparingDiastolicBp?.diastolicBp,
      status: res.hypertensionAssessmentDto?.comparingDiastolicBp?.healthStatus,
    },
    hemoglobin: {
      value: res.anemiaAssessmentDto?.comparingHemoglobin?.hemoglobin,
      status: res.anemiaAssessmentDto?.comparingHemoglobin?.healthStatus,
    },
    fbs: {
      value: res.diabetesAssessmentDto?.comparingFastingBloodSugar?.fastingBloodSugar,
      status: res.diabetesAssessmentDto?.comparingFastingBloodSugar?.healthStatus,
    },
    tcho: {
      value: res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.totalCholesterol,
      status: res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.healthStatus,
    },
    hdl: {
      value: res.dyslipidemiaAssessmentDto?.comparingHDL?.hdl,
      status: res.dyslipidemiaAssessmentDto?.comparingHDL?.healthStatus,
    },
    tg: {
      value: res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.triglyceride,
      status: res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.healthStatus,
    },
    ldl: {
      value: res.dyslipidemiaAssessmentDto?.comparingLDL?.ldl,
      status: res.dyslipidemiaAssessmentDto?.comparingLDL?.healthStatus,
    },
    scr: {
      value: res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.serumCreatinine,
      status: res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.healthStatus,
    },
    egfr: {
      value: res.kidneyDiseaseAssessmentDto?.comparingEGfr?.e_gfr,
      status: res.kidneyDiseaseAssessmentDto?.comparingEGfr?.healthStatus,
    },
    ast: {
      value: res.liverDiseaseAssessmentDto?.comparingAst?.ast,
      status: res.liverDiseaseAssessmentDto?.comparingAst?.healthStatus,
    },
    alt: {
      value: res.liverDiseaseAssessmentDto?.comparingAlt?.alt,
      status: res.liverDiseaseAssessmentDto?.comparingAlt?.healthStatus,
    },
    ggtp: {
      value: res.liverDiseaseAssessmentDto?.comparingGammaGtp?.gammaGtp,
      status: res.liverDiseaseAssessmentDto?.comparingGammaGtp?.healthStatus,
    },
    urine: {
      value: (() => {
        const status = res.urineProteinAssessmentDto?.comparingUrineProtein?.urineTestStatus;
        if (!status) return undefined;
        // urineTestStatus가 상태값이므로 한국어로 변환
        switch (status.toUpperCase()) {
          case 'SAFE':
            return '안심';
          case 'NORMAL':
            return '정상';
          case 'CAUTION':
            return '주의';
          case 'WATCH':
            return '관심';
          case 'DANGER':
            return '위험';
          default:
            return undefined;
        }
      })(),
      status: res.urineProteinAssessmentDto?.comparingUrineProtein?.healthStatus,
    },
  };
}

// 전문가 API 응답에서 우측 값 뽑기
function pickRightValues(res: ExpertReportResponse) {
  return {
    bmi: {
      value: res.obesityAssessmentDto?.comparingBmi?.averageBmi,
      status: res.obesityAssessmentDto?.comparingBmi?.healthStatus,
      rank: res.obesityAssessmentDto?.comparingBmi?.rank,
      comparisonText: res.obesityAssessmentDto?.comparingBmi?.averageComparison,
    },
    waist: {
      value: res.obesityAssessmentDto?.comparingWaist?.averageWaist,
      status: res.obesityAssessmentDto?.comparingWaist?.healthStatus,
      rank: res.obesityAssessmentDto?.comparingWaist?.rank,
      comparisonText: res.obesityAssessmentDto?.comparingWaist?.averageComparison,
    },
    sbp: {
      value: res.hypertensionAssessmentDto?.comparingSystolicBp?.averageSystolicBp,
      status: res.hypertensionAssessmentDto?.comparingSystolicBp?.healthStatus,
      rank: res.hypertensionAssessmentDto?.comparingSystolicBp?.rank,
      comparisonText: res.hypertensionAssessmentDto?.comparingSystolicBp?.averageComparison,
    },
    dbp: {
      value: res.hypertensionAssessmentDto?.comparingDiastolicBp?.averageDiastolicBp,
      status: res.hypertensionAssessmentDto?.comparingDiastolicBp?.healthStatus,
      rank: res.hypertensionAssessmentDto?.comparingDiastolicBp?.rank,
      comparisonText: res.hypertensionAssessmentDto?.comparingDiastolicBp?.averageComparison,
    },
    hemoglobin: {
      value: res.anemiaAssessmentDto?.comparingHemoglobin?.averageHemoglobin,
      status: res.anemiaAssessmentDto?.comparingHemoglobin?.healthStatus,
      rank: res.anemiaAssessmentDto?.comparingHemoglobin?.rank,
      comparisonText: res.anemiaAssessmentDto?.comparingHemoglobin?.averageComparison,
    },
    fbs: {
      value: res.diabetesAssessmentDto?.comparingFastingBloodSugar?.averageFastingBloodSugar,
      status: res.diabetesAssessmentDto?.comparingFastingBloodSugar?.healthStatus,
      rank: res.diabetesAssessmentDto?.comparingFastingBloodSugar?.rank,
      comparisonText: res.diabetesAssessmentDto?.comparingFastingBloodSugar?.averageComparison,
    },
    tcho: {
      value: res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.averageTotalCholesterol,
      status: res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.healthStatus,
      rank: res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.rank,
      comparisonText: res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.averageComparison,
    },
    hdl: {
      value: res.dyslipidemiaAssessmentDto?.comparingHDL?.averageHDL,
      status: res.dyslipidemiaAssessmentDto?.comparingHDL?.healthStatus,
      rank: res.dyslipidemiaAssessmentDto?.comparingHDL?.rank,
      comparisonText: res.dyslipidemiaAssessmentDto?.comparingHDL?.averageComparison,
    },
    tg: {
      value: res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.averageTriglyceride,
      status: res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.healthStatus,
      rank: res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.rank,
      comparisonText: res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.averageComparison,
    },
    ldl: {
      value: res.dyslipidemiaAssessmentDto?.comparingLDL?.averageLDL,
      status: res.dyslipidemiaAssessmentDto?.comparingLDL?.healthStatus,
      rank: res.dyslipidemiaAssessmentDto?.comparingLDL?.rank,
      comparisonText: res.dyslipidemiaAssessmentDto?.comparingLDL?.averageComparison,
    },
    scr: {
      value: res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.averageSerumCreatinine,
      status: res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.healthStatus,
      rank: res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.rank,
      comparisonText: res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.averageComparison,
    },
    egfr: {
      value: res.kidneyDiseaseAssessmentDto?.comparingEGfr?.averageE_GFR,
      status: res.kidneyDiseaseAssessmentDto?.comparingEGfr?.healthStatus,
      rank: res.kidneyDiseaseAssessmentDto?.comparingEGfr?.rank,
      comparisonText: res.kidneyDiseaseAssessmentDto?.comparingEGfr?.averageComparison,
    },
    ast: {
      value: res.liverDiseaseAssessmentDto?.comparingAst?.averageAst,
      status: res.liverDiseaseAssessmentDto?.comparingAst?.healthStatus,
      rank: res.liverDiseaseAssessmentDto?.comparingAst?.rank,
      comparisonText: res.liverDiseaseAssessmentDto?.comparingAst?.averageComparison,
    },
    alt: {
      value: res.liverDiseaseAssessmentDto?.comparingAlt?.averageAlt,
      status: res.liverDiseaseAssessmentDto?.comparingAlt?.healthStatus,
      rank: res.liverDiseaseAssessmentDto?.comparingAlt?.rank,
      comparisonText: res.liverDiseaseAssessmentDto?.comparingAlt?.averageComparison,
    },
    ggtp: {
      value: res.liverDiseaseAssessmentDto?.comparingGammaGtp?.averageGammaGtp,
      status: res.liverDiseaseAssessmentDto?.comparingGammaGtp?.healthStatus,
      rank: res.liverDiseaseAssessmentDto?.comparingGammaGtp?.rank,
      comparisonText: res.liverDiseaseAssessmentDto?.comparingGammaGtp?.averageComparison,
    },
    urine: {
      value: (() => {
        // averageUrineStatus를 한글로 변환
        const averageStatus =
          res.urineProteinAssessmentDto?.comparingUrineProtein?.averageUrineStatus;
        if (!averageStatus) return undefined;
        switch (averageStatus.toUpperCase()) {
          case 'SAFE':
            return '안심';
          case 'NORMAL':
            return '정상';
          case 'CAUTION':
            return '주의';
          case 'WATCH':
            return '관심';
          case 'DANGER':
            return '위험';
          default:
            return undefined;
        }
      })(),
      status: res.urineProteinAssessmentDto?.comparingUrineProtein?.healthStatus,
      rank: res.urineProteinAssessmentDto?.comparingUrineProtein?.rank,
      comparisonText: res.urineProteinAssessmentDto?.comparingUrineProtein?.averageComparison,
    },
  };
}

export function mapExpertReportToCombinedByCategory(
  reportData: ExpertReportResponse,
  _categoryMap: RightCategoryMap, // 언더스코어로 사용하지 않는 매개변수 표시
  nickname: string,
) {
  const leftValues = pickLeftValues(reportData);
  const rightValues = pickRightValues(reportData);

  const result: Record<Category, any[]> = {
    '비만/복부비만': [],
    고혈압: [],
    빈혈: [],
    당뇨병: [],
    이상지질혈증: [],
    신장질환: [],
    간장질환: [],
    요단백: [],
  };

  // 각 카테고리별로 데이터 매핑
  Object.entries(CATEGORY_IDS).forEach(([category, ids]) => {
    ids.forEach((id) => {
      const left = leftValues[id as keyof typeof leftValues];
      const right = rightValues[id as keyof typeof rightValues];
      const meta = LEFT_META[id];

      if (left && meta) {
        const leftStage = korStageFrom(left.status);
        const rightStage = korStageFrom(right?.status);

        result[category as Category].push({
          indicatorId: id,
          leftProps: {
            nickname,
            title: meta.title,
            value: (() => {
              if (isUnknown(left.value)) return undefined;
              // 요단백의 경우 value 없이 undefined 반환
              if (id === 'urine') {
                return undefined;
              }
              return String(left.value);
            })(),
            unit: meta.unit || '',
            stage: leftStage,
            isUnknown: isUnknown(left.value),
          },
          rightProps: {
            title: `${FIXED_YEAR}년도 평균`,
            value: (() => {
              if (isUnknown(right?.value)) return '알 수 없음';
              return String(right?.value);
            })(),
            unit: meta.unit || '',
            stage: rightStage,
            isUnknown: isUnknown(right?.value),
          },
          compareProps: {
            stage: leftStage,
            patientValue: left.value,
            averageValue: right?.value,
            indicatorId: id,
          },
          descProps: {
            indicatorName: meta.title,
            patientValue: left.value,
            averageValue: right?.value,
            ageGroup: `${reportData.ageGroup10Yr}대`,
            rank: (() => {
              // 백엔드에서 rank 정보 추출
              let rankValue = '';
              switch (id) {
                case 'bmi':
                  rankValue = reportData.obesityAssessmentDto?.comparingBmi?.rank || '';
                  break;
                case 'waist':
                  rankValue = reportData.obesityAssessmentDto?.comparingWaist?.rank || '';
                  break;
                case 'sbp':
                  rankValue = reportData.hypertensionAssessmentDto?.comparingSystolicBp?.rank || '';
                  break;
                case 'dbp':
                  rankValue =
                    reportData.hypertensionAssessmentDto?.comparingDiastolicBp?.rank || '';
                  break;
                case 'hemoglobin':
                  rankValue = reportData.anemiaAssessmentDto?.comparingHemoglobin?.rank || '';
                  break;
                case 'fbs':
                  rankValue =
                    reportData.diabetesAssessmentDto?.comparingFastingBloodSugar?.rank || '';
                  break;
                case 'tcho':
                  rankValue =
                    reportData.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.rank || '';
                  break;
                case 'hdl':
                  rankValue = reportData.dyslipidemiaAssessmentDto?.comparingHDL?.rank || '';
                  break;
                case 'tg':
                  rankValue =
                    reportData.dyslipidemiaAssessmentDto?.comparingTriglyceride?.rank || '';
                  break;
                case 'ldl':
                  rankValue = reportData.dyslipidemiaAssessmentDto?.comparingLDL?.rank || '';
                  break;
                case 'scr':
                  rankValue =
                    reportData.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.rank || '';
                  break;
                case 'egfr':
                  rankValue = reportData.kidneyDiseaseAssessmentDto?.comparingEGfr?.rank || '';
                  break;
                case 'ast':
                  rankValue = reportData.liverDiseaseAssessmentDto?.comparingAst?.rank || '';
                  break;
                case 'alt':
                  rankValue = reportData.liverDiseaseAssessmentDto?.comparingAlt?.rank || '';
                  break;
                case 'ggtp':
                  rankValue = reportData.liverDiseaseAssessmentDto?.comparingGammaGtp?.rank || '';
                  break;
                case 'urine':
                  rankValue =
                    reportData.urineProteinAssessmentDto?.comparingUrineProtein?.rank || '';
                  break;
                default:
                  rankValue = '';
              }
              console.log(`Rank for ${id}:`, rankValue);
              return rankValue;
            })(),
            gender: '여', // 전문가 API에서는 gender 정보가 없으므로 기본값 설정
            ageGroup10Yr: reportData.ageGroup10Yr,
            rankType: (() => {
              // rank 값을 rankType으로 변환
              const rank = (() => {
                switch (id) {
                  case 'bmi':
                    return reportData.obesityAssessmentDto?.comparingBmi?.rank;
                  case 'waist':
                    return reportData.obesityAssessmentDto?.comparingWaist?.rank;
                  case 'sbp':
                    return reportData.hypertensionAssessmentDto?.comparingSystolicBp?.rank;
                  case 'dbp':
                    return reportData.hypertensionAssessmentDto?.comparingDiastolicBp?.rank;
                  case 'hemoglobin':
                    return reportData.anemiaAssessmentDto?.comparingHemoglobin?.rank;
                  case 'fbs':
                    return reportData.diabetesAssessmentDto?.comparingFastingBloodSugar?.rank;
                  case 'tcho':
                    return reportData.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.rank;
                  case 'hdl':
                    return reportData.dyslipidemiaAssessmentDto?.comparingHDL?.rank;
                  case 'tg':
                    return reportData.dyslipidemiaAssessmentDto?.comparingTriglyceride?.rank;
                  case 'ldl':
                    return reportData.dyslipidemiaAssessmentDto?.comparingLDL?.rank;
                  case 'scr':
                    return reportData.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.rank;
                  case 'egfr':
                    return reportData.kidneyDiseaseAssessmentDto?.comparingEGfr?.rank;
                  case 'ast':
                    return reportData.liverDiseaseAssessmentDto?.comparingAst?.rank;
                  case 'alt':
                    return reportData.liverDiseaseAssessmentDto?.comparingAlt?.rank;
                  case 'ggtp':
                    return reportData.liverDiseaseAssessmentDto?.comparingGammaGtp?.rank;
                  case 'urine':
                    return reportData.urineProteinAssessmentDto?.comparingUrineProtein?.rank;
                  default:
                    return undefined;
                }
              })();

              if (!rank) return undefined;
              return rank === '상위' ? '상위' : rank === '하위' ? '하위' : undefined;
            })(),
            rankPercent: (() => {
              // percentage 값을 rankPercent로 변환
              switch (id) {
                case 'bmi':
                  return reportData.obesityAssessmentDto?.comparingBmi?.percentageBmi;
                case 'waist':
                  return reportData.obesityAssessmentDto?.comparingWaist?.percentageWaist;
                case 'sbp':
                  return reportData.hypertensionAssessmentDto?.comparingSystolicBp
                    ?.percentageSystolicBp;
                case 'dbp':
                  return reportData.hypertensionAssessmentDto?.comparingDiastolicBp
                    ?.percentageDiastolicBp;
                case 'hemoglobin':
                  return reportData.anemiaAssessmentDto?.comparingHemoglobin?.percentageHemoglobin;
                case 'fbs':
                  return reportData.diabetesAssessmentDto?.comparingFastingBloodSugar
                    ?.percentageFastingBloodSugar;
                case 'tcho':
                  return reportData.dyslipidemiaAssessmentDto?.comparingTotalCholesterol
                    ?.percentageTotalCholesterol;
                case 'hdl':
                  return reportData.dyslipidemiaAssessmentDto?.comparingHDL?.percentageHDL;
                case 'tg':
                  return reportData.dyslipidemiaAssessmentDto?.comparingTriglyceride
                    ?.percentageTriglyceride;
                case 'ldl':
                  return reportData.dyslipidemiaAssessmentDto?.comparingLDL?.percentageLDL;
                case 'scr':
                  return reportData.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine
                    ?.percentageSerumCreatinine;
                case 'egfr':
                  return reportData.kidneyDiseaseAssessmentDto?.comparingEGfr?.percentageE_GFR;
                case 'ast':
                  return reportData.liverDiseaseAssessmentDto?.comparingAst?.percentageAst;
                case 'alt':
                  return reportData.liverDiseaseAssessmentDto?.comparingAlt?.percentageAlt;
                case 'ggtp':
                  return reportData.liverDiseaseAssessmentDto?.comparingGammaGtp
                    ?.percentageGammaGtp;
                case 'urine':
                  return null; // 요단백은 percentage가 없음
                default:
                  return undefined;
              }
            })(),
            comparisonText: right?.comparisonText || '',
            isUnknown: isUnknown(left.value) || isUnknown(right?.value),
          },
        });
      }
    });
  });

  return result;
}
