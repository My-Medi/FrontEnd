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
  // 추가
  isUnknown?: boolean;
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
  isUnknown = false,
}) => {
  // 값이 없을 때(unknown): 디자인 동일, 내용만 변경
  if (isUnknown) {
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
          {indicatorName}
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
          건강검진결과의 {indicatorName}을 입력해주세요!
        </p>
      </div>
    );
  }

  // 신규 포맷이 모두 제공되면 그 문구를 그대로 사용
  const hasNewFormat =
    typeof ageGroup10Yr === 'number' &&
    !!rankType &&
    typeof rankPercent === 'number' &&
    !!comparisonText;

  if (hasNewFormat) {
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
          {ageGroup10Yr}대 {gender}성 중 {rankType} {rankPercent}%
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
          {`${indicatorName} 수치가 ${ageGroup10Yr}대 ${comparisonText}`}
        </p>
      </div>
    );
  }

  // 기존 로직 (폴백)
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
