import React from 'react';
// 이미지 import
import unknownSvg from '../../../../assets/MyMedicalReport/compare/unknown.svg';
import safeBigSvg from '../../../../assets/MyMedicalReport/compare/safe-big.svg';
import safeSameSvg from '../../../../assets/MyMedicalReport/compare/safe-same.svg';
import safeSmallSvg from '../../../../assets/MyMedicalReport/compare/safe-small.svg';
import warnBigSvg from '../../../../assets/MyMedicalReport/compare/warn-big.svg';
import warnSameSvg from '../../../../assets/MyMedicalReport/compare/warn-same.svg';
import warnSmallSvg from '../../../../assets/MyMedicalReport/compare/warn-small.svg';
import interestSmallSvg from '../../../../assets/MyMedicalReport/compare/interest-small.svg';
import normalBigSvg from '../../../../assets/MyMedicalReport/compare/normal-big.svg';
import normalSameSvg from '../../../../assets/MyMedicalReport/compare/normal-same.svg';
import normalSmallSvg from '../../../../assets/MyMedicalReport/compare/normal-small.svg';
import dangerBigSvg from '../../../../assets/MyMedicalReport/compare/danger-big.svg';
import dangerSameSvg from '../../../../assets/MyMedicalReport/compare/danger-same.svg';
import dangerSmallSvg from '../../../../assets/MyMedicalReport/compare/danger-small.svg';
import interestBigSvg from '../../../../assets/MyMedicalReport/compare/interest-big.svg';
import interestSameSvg from '../../../../assets/MyMedicalReport/compare/interest-same.svg';

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

// 이미지 매핑 객체
const imageMap: Record<string, string> = {
  'normal-big': normalBigSvg,
  'normal-same': normalSameSvg,
  'normal-small': normalSmallSvg,
  'warn-big': warnBigSvg,
  'warn-same': warnSameSvg,
  'warn-small': warnSmallSvg,
  'danger-big': dangerBigSvg,
  'danger-same': dangerSameSvg,
  'danger-small': dangerSmallSvg,
  'safe-big': safeBigSvg,
  'safe-same': safeSameSvg,
  'safe-small': safeSmallSvg,
  'interest-big': interestBigSvg,
  'interest-same': interestSameSvg,
  'interest-small': interestSmallSvg,
  'unknown': unknownSvg,
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
        src={imageMap['unknown']}
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
  const imageKey = `${stageKey}-${comparison}`;
  const imageSrc = imageMap[imageKey];

  return (
    <img
      src={imageSrc}
      alt={`부등호-${comparison}`}
      style={{ width: '26px', height: '54px', margin: '0 80px' }}
    />
  );
};

export default Compare;
