import React from 'react';

interface CompareProps {
  stage: '정상' | '주의' | '위험' | '안심' | '관심' | '알수없음';
  patientValue: string;
  averageValue: string;
  indicatorId: string;
}

const stageKeyMap: Record<string, string> = {
  정상: 'normal',
  주의: 'warn',
  위험: 'danger',
  안심: 'safe',
  관심: 'interest',
  알수없음: 'unknown',
};

// 비교 제외 ID(요단백은 공간만 차지)
const noCompareIndicators = ['urine'];

const isUnknown = (v: unknown) => v === undefined || v === null || v === '' || v === 'unknown';

const Compare: React.FC<CompareProps> = ({ stage, patientValue, averageValue, indicatorId }) => {
  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '186px',
    alignSelf: 'stretch',
  };

  if (noCompareIndicators.includes(indicatorId)) {
    return (
      <div style={wrapperStyle}>
        <div style={{ width: '186px', height: '54px' }} />
      </div>
    );
  }

  // '알수없음' stage이거나 값이 unknown인 경우 unknown 이미지 사용
  if (stage === '알수없음' || isUnknown(patientValue)) {
    return (
      <img
        src={`/src/assets/MyMedicalReport/compare/unknown.svg`}
        alt='비교-unknown'
        style={{ width: '26px', height: '54px', margin: '0 80px' }}
      />
    );
  }

  const patientNum = parseFloat(patientValue);
  const averageNum = parseFloat(averageValue);
  if (isNaN(patientNum) || isNaN(averageNum) || averageNum === 0) return null;

  let comparison: 'small' | 'same' | 'big';
  if (patientNum < averageNum) comparison = 'small';
  else if (patientNum > averageNum) comparison = 'big';
  else comparison = 'same';

  const stageKey = stageKeyMap[stage] || 'normal';
  const svgPath = `/src/assets/MyMedicalReport/compare/${stageKey}-${comparison}.svg`;

  return (
    <img
      src={svgPath}
      alt={`부등호-${comparison}`}
      style={{ width: '26px', height: '54px', margin: '0 80px' }}
    />
  );
};

export default Compare;
