// utils/mappers/medicalReportMapper.ts

import { FIXED_YEAR, INDICATOR_META } from '../../constants/indicatorMeta';
import type { Category } from '../../constants/medicalCategory';
import type { HealthStatus, MyMedicalReportResponse } from '../../types/myMedicalReport/compare';
import { RIGHT_TO_LEFT_ID } from './idNormalize';

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

const korStageFrom = (status?: HealthStatus): CompareStageKor => {
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

function resolveStandard(id: keyof typeof INDICATOR_META, gender?: '남성' | '여성') {
  const s = INDICATOR_META[id]?.standard;
  return typeof s === 'function' ? s({ gender }) : s;
}

const sexKor = (g?: string) => (g === 'MALE' ? '남' : g === 'FEMALE' ? '여' : undefined);

// 좌측 카드에서 쓸 메타(타이틀·단위)
// (표준치는 Right 카드가 아닌, 상수 레이어에서 계산하여 주입)
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

// Swagger 응답에서 좌측 값 뽑기 (id→value/stage 매핑)
function pickLeftValues(res: MyMedicalReportResponse) {
  const g = res.gender; // 'MALE' | 'FEMALE'
  return {
    bmi: {
      value: res.obesityAssessmentDto?.comparingBmi?.bmi,
      status: res.obesityAssessmentDto?.comparingBmi?.healthStatus,
      gender: sexKor(g),
    },
    waist: {
      value: res.obesityAssessmentDto?.comparingWaist?.waist,
      status: res.obesityAssessmentDto?.comparingWaist?.healthStatus,
      gender: sexKor(g),
    },
    sbp: {
      value: res.hypertensionAssessmentDto?.comparingSystolicBp?.systolicBp,
      status: res.hypertensionAssessmentDto?.comparingSystolicBp?.healthStatus,
      gender: sexKor(g),
    },
    dbp: {
      value: res.hypertensionAssessmentDto?.comparingDiastolicBp?.diastolicBp,
      status: res.hypertensionAssessmentDto?.comparingDiastolicBp?.healthStatus,
      gender: sexKor(g),
    },
    hemoglobin: {
      value: res.anemiaAssessmentDto?.comparingHemoglobin?.hemoglobin,
      status: res.anemiaAssessmentDto?.comparingHemoglobin?.healthStatus,
      gender: sexKor(g),
    },
    fbs: {
      value: res.diabetesAssessmentDto?.comparingFastingBloodSugar?.fastingBloodSugar,
      status: res.diabetesAssessmentDto?.comparingFastingBloodSugar?.healthStatus,
      gender: sexKor(g),
    },
    tcho: {
      value: res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.totalCholesterol,
      status: res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.healthStatus,
      gender: sexKor(g),
    },
    hdl: {
      value: res.dyslipidemiaAssessmentDto?.comparingHDL?.hdl,
      status: res.dyslipidemiaAssessmentDto?.comparingHDL?.healthStatus,
      gender: sexKor(g),
    },
    tg: {
      value: res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.triglyceride,
      status: res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.healthStatus,
      gender: sexKor(g),
    },
    ldl: {
      value: res.dyslipidemiaAssessmentDto?.comparingLDL?.ldl,
      status: res.dyslipidemiaAssessmentDto?.comparingLDL?.healthStatus,
      gender: sexKor(g),
    },
    scr: {
      value: res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.serumCreatinine,
      status: res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.healthStatus,
      gender: sexKor(g),
    },
    egfr: {
      value: res.kidneyDiseaseAssessmentDto?.comparingEGfr?.e_gfr,
      status: res.kidneyDiseaseAssessmentDto?.comparingEGfr?.healthStatus,
      gender: sexKor(g),
    },
    ast: {
      value: res.liverDiseaseAssessmentDto?.comparingAst?.ast,
      status: res.liverDiseaseAssessmentDto?.comparingAst?.healthStatus,
      gender: sexKor(g),
    },
    alt: {
      value: res.liverDiseaseAssessmentDto?.comparingAlt?.alt,
      status: res.liverDiseaseAssessmentDto?.comparingAlt?.healthStatus,
      gender: sexKor(g),
    },
    ggtp: {
      value: res.liverDiseaseAssessmentDto?.comparingGammaGtp?.gammaGtp,
      status: res.liverDiseaseAssessmentDto?.comparingGammaGtp?.healthStatus,
      gender: sexKor(g),
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
      gender: sexKor(g),
    },
  } as const;
}

export type CombinedRow = {
  // LeftPatientCard
  leftProps: {
    nickname: string;
    title: string;
    value?: string; // '' 대신 undefined로 넘어가면 Left에서 빈칸 표시
    unit?: string;
    stage: Exclude<CompareStageKor, '알수없음'> | '알수없음';
    isUnknown: boolean;
  };
  // Compare
  compareProps: {
    stage: Exclude<CompareStageKor, '알수없음'> | '알수없음';
    patientValue: string;
    averageValue: string;
    indicatorId: string; // 좌측 정규화 ID
  };
  // RightAverageCard
  rightProps?: {
    year: string;
    ageGroup: string;
    value: string;
    unit: string;
    standard?: string;
    gender?: string;
    // 확장: rankType, rankPercent, comparisonText를 쓰려면 IndicationDescription로 전달
  };
  // IndicationDescription
  descProps?: {
    indicatorName: string;
    patientValue: string;
    averageValue: string;
    ageGroup: string;
    rank: string;
    gender: string;
    ageGroup10Yr?: number;
    rankType?: '상위' | '하위';
    rankPercent?: number;
    comparisonText?: string;
    isUnknown?: boolean;
  };
  indicatorId: string; // 정규화 ID
};

export type CombinedByCategory = Record<Category, CombinedRow[]>;

/**
 * Swagger 응답(result) + 우측(공공데이터) → 좌/우/비교/설명 props로 변환
 */
export function mapReportToCombinedByCategory(
  res: MyMedicalReportResponse,
  rightCategoryMap: RightCategoryMap,
  nickname: string,
): CombinedByCategory {
  const left = pickLeftValues(res);

  // 우측 빠른 조회 테이블: (좌측 정규화 ID) → right item
  const rightLookup: Record<string, RightItem | undefined> = {};
  Object.values(rightCategoryMap).forEach((arr) => {
    arr.forEach((item) => {
      const leftId = RIGHT_TO_LEFT_ID[item.id] ?? item.id;
      rightLookup[leftId] = item;
    });
  });

  const buildRow = (leftId: string): CombinedRow | null => {
    const meta = LEFT_META[leftId];
    if (!meta) return null;

    const lv = left[leftId as keyof typeof left] as
      | { value: any; status?: HealthStatus; gender?: string }
      | undefined;
    const valueRaw = lv?.value;
    const isUnk = isUnknown(valueRaw);
    const stageKor = korStageFrom(lv?.status);

    // API에서 받은 평균값 데이터 (백엔드 응답에서 추출)
    const getAverageValue = () => {
      switch (leftId) {
        case 'bmi':
          return res.obesityAssessmentDto?.comparingBmi?.averageBmi;
        case 'waist':
          return res.obesityAssessmentDto?.comparingWaist?.averageWaist;
        case 'sbp':
          return res.hypertensionAssessmentDto?.comparingSystolicBp?.averageSystolicBp;
        case 'dbp':
          return res.hypertensionAssessmentDto?.comparingDiastolicBp?.averageDiastolicBp;
        case 'hemoglobin':
          return res.anemiaAssessmentDto?.comparingHemoglobin?.averageHemoglobin;
        case 'fbs':
          return res.diabetesAssessmentDto?.comparingFastingBloodSugar?.averageFastingBloodSugar;
        case 'tcho':
          return res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.averageTotalCholesterol;
        case 'hdl':
          return res.dyslipidemiaAssessmentDto?.comparingHDL?.averageHDL;
        case 'tg':
          return res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.averageTriglyceride;
        case 'ldl':
          return res.dyslipidemiaAssessmentDto?.comparingLDL?.averageLDL;
        case 'scr':
          return res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.averageSerumCreatinine;
        case 'egfr':
          return res.kidneyDiseaseAssessmentDto?.comparingEGfr?.averageE_GFR;
        case 'ast':
          return res.liverDiseaseAssessmentDto?.comparingAst?.averageAst;
        case 'alt':
          return res.liverDiseaseAssessmentDto?.comparingAlt?.averageAlt;
        case 'ggtp':
          return res.liverDiseaseAssessmentDto?.comparingGammaGtp?.averageGammaGtp;
        case 'urine':
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
        default:
          return undefined;
      }
    };

    const averageValue = getAverageValue();

    return {
      leftProps: {
        nickname,
        title: meta.title,
        value: isUnk ? undefined : String(valueRaw),
        unit: meta.unit,
        stage: stageKor,
        isUnknown: isUnk,
      },
      compareProps: {
        stage: stageKor,
        patientValue: isUnk ? '' : String(valueRaw ?? ''),
        averageValue: averageValue ? String(averageValue) : '',
        indicatorId: leftId,
      },
      rightProps: {
        year: FIXED_YEAR, // 고정 연도
        ageGroup: `${res.ageGroup10Yr}대`, // API에서 받은 연령대
        value: averageValue ? String(averageValue) : '',
        unit: INDICATOR_META[leftId as keyof typeof INDICATOR_META]?.unit ?? '', // 단위는 상수에서 가져옴
        standard: resolveStandard(
          leftId as keyof typeof INDICATOR_META,
          lv?.gender as '남성' | '여성' | undefined,
        ), // 정상 기준 상수에서 계산
        gender: lv?.gender, // 좌측 성별(남/여) 기준으로 문구 생성
      },
      descProps: {
        indicatorName: meta.title,
        patientValue: String(valueRaw ?? ''),
        averageValue: averageValue ? String(averageValue) : '',
        ageGroup: `${res.ageGroup10Yr}대`,
        rank: '', // 기존 폴백용(문구 포맷 새 필드 사용 시 비워둠)
        gender: lv?.gender ?? '',
        ageGroup10Yr: res.ageGroup10Yr,
        rankType: (() => {
          // 백엔드에서 rank 정보 추출
          const rank = (() => {
            switch (leftId) {
              case 'bmi':
                return res.obesityAssessmentDto?.comparingBmi?.rank;
              case 'waist':
                return res.obesityAssessmentDto?.comparingWaist?.rank;
              case 'sbp':
                return res.hypertensionAssessmentDto?.comparingSystolicBp?.rank;
              case 'dbp':
                return res.hypertensionAssessmentDto?.comparingDiastolicBp?.rank;
              case 'hemoglobin':
                return res.anemiaAssessmentDto?.comparingHemoglobin?.rank;
              case 'fbs':
                return res.diabetesAssessmentDto?.comparingFastingBloodSugar?.rank;
              case 'tcho':
                return res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.rank;
              case 'hdl':
                return res.dyslipidemiaAssessmentDto?.comparingHDL?.rank;
              case 'tg':
                return res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.rank;
              case 'ldl':
                return res.dyslipidemiaAssessmentDto?.comparingLDL?.rank;
              case 'scr':
                return res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.rank;
              case 'egfr':
                return res.kidneyDiseaseAssessmentDto?.comparingEGfr?.rank;
              case 'ast':
                return res.liverDiseaseAssessmentDto?.comparingAst?.rank;
              case 'alt':
                return res.liverDiseaseAssessmentDto?.comparingAlt?.rank;
              case 'ggtp':
                return res.liverDiseaseAssessmentDto?.comparingGammaGtp?.rank;
              case 'urine':
                return res.urineProteinAssessmentDto?.comparingUrineProtein?.rank;
              default:
                return undefined;
            }
          })();

          // rank 값을 rankType으로 변환
          if (!rank) return undefined;

          // 백엔드에서 받은 rank 값이 '상위' 또는 '하위'인 경우 그대로 사용
          if (rank === '상위' || rank === '하위') {
            return rank;
          }

          // 다른 형태의 rank 값이 있다면 변환 로직 추가
          // 예: 'HIGH' -> '상위', 'LOW' -> '하위' 등
          switch (rank.toUpperCase()) {
            case 'HIGH':
            case 'ABOVE':
              return '상위';
            case 'LOW':
            case 'BELOW':
              return '하위';
            default:
              return undefined;
          }
        })(),
        rankPercent: (() => {
          // 백엔드에서 rankPercent 정보 추출
          const percent = (() => {
            switch (leftId) {
              case 'bmi':
                return res.obesityAssessmentDto?.comparingBmi?.percentageBmi;
              case 'waist':
                return res.obesityAssessmentDto?.comparingWaist?.percentageWaist;
              case 'sbp':
                return res.hypertensionAssessmentDto?.comparingSystolicBp?.percentageSystolicBp;
              case 'dbp':
                return res.hypertensionAssessmentDto?.comparingDiastolicBp?.percentageDiastolicBp;
              case 'hemoglobin':
                return res.anemiaAssessmentDto?.comparingHemoglobin?.percentageHemoglobin;
              case 'fbs':
                return res.diabetesAssessmentDto?.comparingFastingBloodSugar
                  ?.percentageFastingBloodSugar;
              case 'tcho':
                return res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol
                  ?.percentageTotalCholesterol;
              case 'hdl':
                return res.dyslipidemiaAssessmentDto?.comparingHDL?.percentageHDL;
              case 'tg':
                return res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.percentageTriglyceride;
              case 'ldl':
                return res.dyslipidemiaAssessmentDto?.comparingLDL?.percentageLDL;
              case 'scr':
                return res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine
                  ?.percentageSerumCreatinine;
              case 'egfr':
                return res.kidneyDiseaseAssessmentDto?.comparingEGfr?.percentageE_GFR;
              case 'ast':
                return res.liverDiseaseAssessmentDto?.comparingAst?.percentageAst;
              case 'alt':
                return res.liverDiseaseAssessmentDto?.comparingAlt?.percentageAlt;
              case 'ggtp':
                return res.liverDiseaseAssessmentDto?.comparingGammaGtp?.percentageGammaGtp;
              case 'urine':
                return undefined; // 요단백은 percentage가 없음
              default:
                return undefined;
            }
          })();

          // null 값을 undefined로 변환
          return percent === null ? undefined : percent;
        })(),
        comparisonText: (() => {
          // 백엔드에서 averageComparison 값을 가져와서 comparisonText로 사용
          const leftIdKey = leftId as keyof typeof left;
          const leftValue = left[leftIdKey];
          if (!leftValue) return undefined;

          // 각 지표별로 백엔드 응답에서 averageComparison 값을 찾기
          switch (leftId) {
            case 'bmi':
              return res.obesityAssessmentDto?.comparingBmi?.averageComparison;
            case 'waist':
              return res.obesityAssessmentDto?.comparingWaist?.averageComparison;
            case 'sbp':
              return res.hypertensionAssessmentDto?.comparingSystolicBp?.averageComparison;
            case 'dbp':
              return res.hypertensionAssessmentDto?.comparingDiastolicBp?.averageComparison;
            case 'hemoglobin':
              return res.anemiaAssessmentDto?.comparingHemoglobin?.averageComparison;
            case 'fbs':
              return res.diabetesAssessmentDto?.comparingFastingBloodSugar?.averageComparison;
            case 'tcho':
              return res.dyslipidemiaAssessmentDto?.comparingTotalCholesterol?.averageComparison;
            case 'hdl':
              return res.dyslipidemiaAssessmentDto?.comparingHDL?.averageComparison;
            case 'tg':
              return res.dyslipidemiaAssessmentDto?.comparingTriglyceride?.averageComparison;
            case 'ldl':
              return res.dyslipidemiaAssessmentDto?.comparingLDL?.averageComparison;
            case 'scr':
              return res.kidneyDiseaseAssessmentDto?.comparingSerumCreatinine?.averageComparison;
            case 'egfr':
              return res.kidneyDiseaseAssessmentDto?.comparingEGfr?.averageComparison;
            case 'ast':
              return res.liverDiseaseAssessmentDto?.comparingAst?.averageComparison;
            case 'alt':
              return res.liverDiseaseAssessmentDto?.comparingAlt?.averageComparison;
            case 'ggtp':
              return res.liverDiseaseAssessmentDto?.comparingGammaGtp?.averageComparison;
            case 'urine':
              return res.urineProteinAssessmentDto?.comparingUrineProtein?.averageComparison;
            default:
              return undefined;
          }
        })(),
        isUnknown: isUnk,
      },
      indicatorId: leftId,
    };
  };

  const out: Partial<CombinedByCategory> = {};

  (Object.keys(CATEGORY_IDS) as Category[]).forEach((cat) => {
    const ids = CATEGORY_IDS[cat];
    const rows = ids.map(buildRow).filter((x): x is CombinedRow => !!x);
    out[cat] = rows;
  });

  return out as CombinedByCategory;
}
