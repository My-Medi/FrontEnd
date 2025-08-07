import React from 'react';

interface CompareProps {
  stage: '정상' | '주의' | '위험' | '안심' | '관심';
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
};

//비교 제외 ID(요단백은 공간만 차지)
const noCompareIndicators = ['proteinuria'];

const Compare: React.FC<CompareProps> = ({ stage, patientValue, averageValue, indicatorId }) => {
  const patientNum = parseFloat(patientValue);
  const averageNum = parseFloat(averageValue);

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

  if (isNaN(patientNum) || isNaN(averageNum) || averageNum === 0) return null;

  let comparison: 'small' | 'same' | 'big';
  if (patientNum < averageNum) comparison = 'small';
  else if (patientNum > averageNum) comparison = 'big';
  else comparison = 'same';

  const stageKey = stageKeyMap[stage];
  const svgPath = `/src/assets/MyMedicalReport/compare/${stageKey}-${comparison}.svg`;

  return (
    <img
      src={svgPath}
      alt={`부등호-${comparison}`}
      style={{
        width: '26px',
        height: '54px',
        margin: '0 80px',
      }}
    />
  );
};

export default Compare;
