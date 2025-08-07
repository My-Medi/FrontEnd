export interface SummaryData {
  ageGroup: string;
  gender: string;
  rank: string;
  nickname: string;
  category: string;
  comparison: '낮습니다' | '높습니다' | '비슷합니다';
}
export const summaryDataMap: Record<string, SummaryData> = {
  '비만/복부비만': {
    ageGroup: '20대',
    gender: '여성',
    rank: '상위 10%',
    nickname: '하나',
    category: '비만/복부비만',
    comparison: '낮습니다',
  },
  고혈압: {
    ageGroup: '20대',
    gender: '여성',
    rank: '상위 10%',
    nickname: '하나',
    category: '고혈압',
    comparison: '비슷합니다',
  },
  빈혈: {
    ageGroup: '20대',
    gender: '여성',
    rank: '하위 40%',
    nickname: '하나',
    category: '빈혈',
    comparison: '높습니다',
  },
  당뇨병: {
    ageGroup: '20대',
    gender: '여성',
    rank: '하위 30%',
    nickname: '하나',
    category: '당뇨병',
    comparison: '높습니다',
  },
  이상지질혈증: {
    ageGroup: '20대',
    gender: '여성',
    rank: '상위 20%',
    nickname: '하나',
    category: '이상지질혈증',
    comparison: '비슷합니다',
  },
  신장질환: {
    ageGroup: '20대',
    gender: '여성',
    rank: '상위 10%',
    nickname: '하나',
    category: '신장질환',
    comparison: '비슷합니다',
  },
  간장질환: {
    ageGroup: '20대',
    gender: '여성',
    rank: '상위 5%',
    nickname: '하나',
    category: '간장질환',
    comparison: '낮습니다',
  },
  요단백: {
    ageGroup: '20대',
    gender: '여성',
    rank: '하위 30%',
    nickname: '하나',
    category: '요단백',
    comparison: '낮습니다',
  },
};
