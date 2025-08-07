export const patientIndicators = {
  '비만/복부비만': [
    {
      id: 'bmi',
      title: '체질량지수',
      value: '17.4',
      unit: 'kg/𝑚²',
      level: '관심',
    },
    {
      id: 'waist',
      title: '허리둘레',
      value: '62',
      unit: 'cm',
      level: '안심',
    },
  ],
  고혈압: [
    {
      id: 'sbp',
      title: '수축기혈압',
      value: '125',
      unit: 'mmHg',
      level: '주의',
    },
    {
      id: 'dbp',
      title: '이완기혈압',
      value: '100',
      unit: 'mmHg',
      level: '위험',
    },
  ],
  빈혈: [
    {
      id: 'hb',
      title: '혈색소',
      value: '17.2',
      unit: 'g/dL',
      level: '주의',
    },
  ],
  당뇨병: [
    {
      id: 'fbs',
      title: '공복혈당(FBS)',
      value: '150',
      unit: 'mg/dL',
      level: '주의',
    },
  ],
  이상지질혈증: [
    {
      id: 'tc',
      title: '총콜레스테롤',
      value: '100',
      unit: 'mg/dL',
      level: '정상',
    },
    {
      id: 'hdl',
      title: 'HDL-콜레스테롤',
      value: '78',
      unit: 'mg/dL',
      level: '정상',
    },
    {
      id: 'tg',
      title: '중성지방',
      value: '64',
      unit: 'mg/dL',
      level: '정상',
    },
    {
      id: 'ldl',
      title: 'LDL-콜레스테롤',
      value: '160',
      unit: 'mg/dL',
      level: '위험',
    },
  ],
  신장질환: [
    {
      id: 'creatinine',
      title: '혈청 크레아티닌',
      value: '0.8',
      unit: 'mg/dL',
      level: '정상',
    },
    {
      id: 'egfr',
      title: 'eGFR(신사구체여과율)',
      value: '72',
      unit: 'mL/min/1.73㎡',
      level: '정상',
    },
  ],
  간장질환: [
    {
      id: 'ast',
      title: 'AST(SGOT)',
      value: '18',
      unit: 'IU/L',
      level: '정상',
    },
    {
      id: 'alt',
      title: 'ALT(SGPT)',
      value: '9',
      unit: 'IU/L',
      level: '정상',
    },
    {
      id: 'ygtp',
      title: '감마-GTP(Y-GTP)',
      value: '17',
      unit: 'IU/L',
      level: '정상',
    },
  ],
  요단백: [
    {
      id: 'proteinuria',
      title: '요단백',
      value: '정상',
      unit: '',
      level: '정상',
    },
  ],
} as const;
