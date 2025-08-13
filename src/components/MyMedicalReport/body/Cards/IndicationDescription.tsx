import React from 'react';

interface IndicationDescriptionProps {
  indicatorName: string;
  patientValue: string;
  averageValue: string;
  ageGroup: string;
  rank: string;
  gender: string;
  // 신규 백엔드 필드
  ageGroup10Yr?: number;
  rankType?: '상위' | '하위';
  rankPercent?: number;
  comparisonText?: string;
}

const IndicationDescription: React.FC<IndicationDescriptionProps> = ({
  indicatorName,
  ageGroup,
  rank,
  gender,
  ageGroup10Yr,
  rankType,
  rankPercent,
  comparisonText,
}) => {
  // 신규 포맷이 모두 제공되면 그 문구를 그대로 사용
  const hasNewFormat =
    typeof ageGroup10Yr === 'number' &&
    !!rankType &&
    typeof rankPercent === 'number' &&
    !!comparisonText;

  if (hasNewFormat) {
    // comparisonText에 따라 조사 결정
    const connector = comparisonText === '비슷합니다' ? '과' : '보다';

    return (
      <div>
        <p
          style={{
            color: '#121218',
            fontFamily: 'Pretendard',
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: '36px',
            letterSpacing: '-0.72px',
            margin: 0,
            textAlign: 'center',
          }}
        >
          {ageGroup10Yr}대 {gender} 중 {rankType} {rankPercent}%
        </p>
        <p
          style={{
            color: '#25282B',
            fontSize: '20px',
            fontWeight: 500,
            fontFamily: 'Pretendard',
            letterSpacing: '-0.6px',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          {`${indicatorName} 수치가 ${ageGroup10Yr}대 평균${connector} ${comparisonText}.`}
        </p>
      </div>
    );
  }

  // 기존 로직 (폴백) - 계산 로직 제거하고 기본값 사용
  return (
    <div>
      <p
        style={{
          color: '#121218',
          fontFamily: 'Pretendard',
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: '36px',
          letterSpacing: '-0.72px',
          margin: 0,
          textAlign: 'center',
        }}
      >
        {ageGroup} {gender} 중 {rank}
      </p>
      <p
        style={{
          color: '#25282B',
          fontSize: '20px',
          fontWeight: 500,
          fontFamily: 'Pretendard',
          letterSpacing: '-0.6px',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        {`${indicatorName} 수치가 ${ageGroup} 평균과 비슷합니다.`}
      </p>
    </div>
  );
};

export default IndicationDescription;
