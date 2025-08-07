import React from 'react';
import safeGage from 'src/assets/total/safe.svg';
import normalGage from 'src/assets/total/normal.svg';
import interestGage from 'src/assets/total/interest.svg';
import warnGage from 'src/assets/total/warn.svg';
import dangerGage from 'src/assets/total/danger.svg';

interface Indicator {
  id: string;
  stage: '안심' | '정상' | '관심' | '주의' | '위험';
}

interface GageProps {
  nickname: string;
  indicators: Indicator[];
}

const Gage: React.FC<GageProps> = ({ nickname, indicators }) => {
  const warningCount = indicators.filter((i) => i.stage === '위험').length;
  const cautionCount = indicators.filter((i) => i.stage === '주의').length;

  let gageImage = safeGage;
  let percentage = 90;
  let percentColor = '#64DF48';
  let text = `${nickname}님의 건강지수는 ${percentage}%로 안심 단계입니다.`;
  let textColor = '#002F8E';

  if (cautionCount >= 1 && cautionCount <= 2 && warningCount === 0) {
    gageImage = normalGage;
    percentage = 86;
    percentColor = '#FC0';
    text = `${nickname}님의 건강지수는 ${percentage}%로 정상 단계입니다.`;
    textColor = '#136A00';
  } else if ((cautionCount >= 3 || warningCount === 1) && warningCount < 2) {
    gageImage = interestGage;
    percentage = 73;
    percentColor = '#FF732D';
    text = `${nickname}님의 건강지수는 ${percentage}%로 관심 단계입니다.`;
    textColor = '#5B3C00';
  } else if (warningCount === 2) {
    gageImage = warnGage;
    percentage = 58;
    percentColor = '#ED5151';
    text = `${nickname}님의 건강지수는 ${percentage}%로 주의 단계입니다.`;
    textColor = '#923100';
  } else if (warningCount >= 3) {
    gageImage = dangerGage;
    percentage = 39;
    percentColor = '#ED5151';
    text = `${nickname}님의 건강지수는 ${percentage}%로 위험 단계입니다.`;
    textColor = '#680707';
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '555.188px',
        height: '555.188px',
        flexShrink: 0,
        backgroundImage: `url(${gageImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '143px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '238px',
          height: '143px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: percentColor,
          fontFamily: 'Pretendard',
          fontSize: '120px',
          fontWeight: 400,
          letterSpacing: '-3.6px',
        }}
      >
        {percentage}%
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '100%',
          color: textColor,
          fontFamily: 'Pretendard',
          fontSize: '15.75px',
          fontWeight: 600,
          lineHeight: '22.5px',
          letterSpacing: '-0.472px',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Gage;
