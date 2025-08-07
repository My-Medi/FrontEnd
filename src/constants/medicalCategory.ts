export const CATEGORY_LIST = [
  '비만/복부비만',
  '고혈압',
  '빈혈',
  '당뇨병',
  '이상지질혈증',
  '신장질환',
  '간장질환',
  '요단백',
] as const;

export type Category = (typeof CATEGORY_LIST)[number];
