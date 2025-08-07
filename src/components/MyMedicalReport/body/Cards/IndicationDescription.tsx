import React from 'react';

interface IndicationDescriptionProps {
  indicatorName: string;
  patientValue: string;
  averageValue: string;
  ageGroup: string;
}

const IndicationDescription: React.FC<IndicationDescriptionProps> = ({
  indicatorName,
  patientValue,
  averageValue,
  ageGroup,
}) => {
  const patientNum = parseFloat(patientValue);
  const averageNum = parseFloat(averageValue);

  if (isNaN(patientNum) || isNaN(averageNum) || averageNum === 0) {
    return null;
  }

  const ratio = patientNum / averageNum;
  let diffText = '';

  if (ratio < 0.9) diffText = '낮습니다';
  else if (ratio < 0.97) diffText = '조금 낮습니다';
  else if (ratio <= 1.03) diffText = '비슷합니다';
  else if (ratio <= 1.1) diffText = '조금 높습니다';
  else diffText = '높습니다';

  return (
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
      {`${indicatorName} 수치가 ${ageGroup} 평균보다 ${diffText}.`}
    </p>
  );
};

export default IndicationDescription;
