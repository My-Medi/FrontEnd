// src/constants/indicatorMeta.ts
export type IndicatorId =
  | 'bmi'
  | 'waist'
  | 'sbp'
  | 'dbp'
  | 'hemoglobin'
  | 'fbs'
  | 'tcho'
  | 'hdl'
  | 'tg'
  | 'ldl'
  | 'scr'
  | 'egfr'
  | 'ast'
  | 'alt'
  | 'ggtp'
  | 'urine';

type Sex = '남성' | '여성' | undefined;

type Standard = string | ((opts: { gender?: Sex }) => string);

export const INDICATOR_META: Record<
  IndicatorId,
  {
    title: string;
    unit?: string;
    standard?: Standard;
  }
> = {
  bmi: { title: '체질량지수', unit: 'kg/𝑚²', standard: '21.0~22.9' },

  waist: {
    title: '허리둘레',
    unit: 'cm',
    standard: ({ gender }) => (gender === '남성' ? '80~84' : gender === '여성' ? '70~74' : '70~84'),
  },

  sbp: { title: '수축기혈압', unit: 'mmHg', standard: '110~119' },

  dbp: { title: '이완기혈압', unit: 'mmHg', standard: '75~79' },

  hemoglobin: {
    title: '혈색소',
    unit: 'g/dL',
    standard: ({ gender }) =>
      gender === '남성' ? '15.1~16.5' : gender === '여성' ? '13.6~15.0' : '13.6~16.5',
  },

  fbs: { title: '공복혈당', unit: 'mg/dL', standard: '90~99' },

  tcho: { title: '총콜레스테롤', unit: 'mg/dL', standard: '160~179' },

  hdl: {
    title: 'HDL-콜레스테롤',
    unit: 'mg/dL',
    standard: ({ gender }) =>
      gender === '남성' ? '40이상' : gender === '여성' ? '50이상' : '40~50이상',
  },

  tg: { title: '중성지방', unit: 'mg/dL', standard: '100~129' },

  ldl: { title: 'LDL-콜레스테롤', unit: 'mg/dL', standard: '100~109' },

  scr: {
    title: '혈청 크레아티닌',
    unit: 'mg/dL',
    standard: ({ gender }) =>
      gender === '남성' ? '0.9~1.0' : gender === '여성' ? '0.8' : '0.8~1.0',
  },

  egfr: { title: 'eGFR(신사구체여과율)', unit: 'mL/min/1.73㎡', standard: '90~99' },

  ast: { title: 'AST', unit: 'IU/L', standard: '21~30' },

  alt: { title: 'ALT', unit: 'IU/L', standard: '21~30' },

  ggtp: {
    title: '감마-GTP',
    unit: 'IU/L',
    standard: ({ gender }) => (gender === '남성' ? '40~49' : gender === '여성' ? '20~29' : '20~49'),
  },

  urine: { title: '요단백' },
};

export const FIXED_YEAR = '2023';
