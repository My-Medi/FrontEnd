// utils/mappers/idNormalize.ts
export const RIGHT_TO_LEFT_ID: Record<string, string> = {
  // 동일
  bmi: 'bmi',
  waist: 'waist',
  sbp: 'sbp',
  dbp: 'dbp',
  fbs: 'fbs',
  hdl: 'hdl',
  tg: 'tg',
  ldl: 'ldl',
  ast: 'ast',
  alt: 'alt',
  egfr: 'egfr',
  urine: 'urine',

  // 이름 다른 애들 (오른쪽 → 왼쪽 정규화)
  hb: 'hemoglobin', // 혈색소
  tc: 'tcho', // 총콜레스테롤
  ggt: 'ggtp', // 감마GTP
  creatinine: 'scr', // 혈청 크레아티닌
};

export const LEFT_TO_RIGHT_ID = Object.fromEntries(
  Object.entries(RIGHT_TO_LEFT_ID).map(([r, l]) => [l, r]),
);
