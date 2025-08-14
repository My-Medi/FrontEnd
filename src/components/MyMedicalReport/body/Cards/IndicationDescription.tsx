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
  nickname?: string;
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
  //nickname,
}) => {
  // 값이 없을 때(unknown): 텍스트를 숨김
  if (isUnknown) {
    return null;
  }

  // 요단백은 IndicationDescription을 표시하지 않음
  if (indicatorName === '요단백') {
    return null;
  }

  // 신규 포맷이 모두 제공되면 그 문구를 그대로 사용
  // comparisonText가 있으면 무조건 신규 포맷 사용
  const hasNewFormat =
    !!comparisonText ||
    (typeof ageGroup10Yr === 'number' && !!rankType && typeof rankPercent === 'number');

  if (hasNewFormat) {
    // 혈색소, 총콜레스테롤, HDL-콜레스테롤, 중성지방, LDL-콜레스테롤, 혈청 크레아티닌, eGFR은 rankType과 rankPercent가 표시되지 않음
    const shouldHideRankInfo =
      indicatorName === '총콜레스테롤' ||
      indicatorName === 'HDL-콜레스테롤' ||
      indicatorName === '중성지방' ||
      indicatorName === 'LDL-콜레스테롤' ||
      indicatorName === '혈청 크레아티닌' ||
      indicatorName === 'eGFR(신사구체여과율)' ||
      indicatorName === '혈색소';

    return (
      <div>
        {!shouldHideRankInfo && (
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
        )}
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
          {comparisonText
            ? `${indicatorName} 수치가 ${ageGroup10Yr}대 ${comparisonText}`
            : `${indicatorName} 수치가 ${ageGroup10Yr}대 평균과 비슷합니다.`}
        </p>
      </div>
    );
  }

  // 기존 로직 (폴백)
  // 혈색소, 총콜레스테롤, HDL-콜레스테롤, 중성지방, LDL-콜레스테롤, 혈청 크레아티닌, eGFR은 rankType과 rankPercent가 표시되지 않음
  const shouldHideRankInfo =
    indicatorName === '총콜레스테롤' ||
    indicatorName === 'HDL-콜레스테롤' ||
    indicatorName === '중성지방' ||
    indicatorName === 'LDL-콜레스테롤' ||
    indicatorName === '혈청 크레아티닌' ||
    indicatorName === 'eGFR(신사구체여과율)' ||
    indicatorName === '혈색소';

  return (
    <div>
      {!shouldHideRankInfo && (
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
      )}
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
