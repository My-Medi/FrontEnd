import React from 'react';
import safeGage from '@/assets/MyMedicalReport/total/safe.svg';
import normalGage from '@/assets/MyMedicalReport/total/normal.svg';
import interestGage from '@/assets/MyMedicalReport/total/interest.svg';
import warnGage from '@/assets/MyMedicalReport/total/warn.svg';
import dangerGage from '@/assets/MyMedicalReport/total/danger.svg';
import { useHealthScoreQuery } from '../../../hooks/myMedicalReport/useHealthScoreQuery';
import { healthStatusMap } from '../../../types/myMedicalReport/graph';

interface GageProps {
  nickname: string;
  round: number;
}

const Gage: React.FC<GageProps> = ({ nickname, round }) => {
  const { data: healthScoreData, isLoading, error } = useHealthScoreQuery(round);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div
        style={{
          position: 'relative',
          width: '555.188px',
          height: '555.188px',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div>로딩 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error || !healthScoreData?.result) {
    return (
      <div
        style={{
          position: 'relative',
          width: '555.188px',
          height: '555.188px',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div>데이터를 불러올 수 없습니다.</div>
      </div>
    );
  }

  const { totalScore, healthStatus } = healthScoreData.result;
  const stage = healthStatusMap[healthStatus] || '정상';

  // stage에 따른 설정값 결정
  const getStageConfig = (stage: '안심' | '정상' | '관심' | '주의' | '위험') => {
    switch (stage) {
      case '안심':
        return {
          gageImage: safeGage,
          percentColor: '#1D68FF',
          textColor: '#002F8E',
          text: `${nickname}님의 건강지수는 ${totalScore}%로 안심 단계입니다.`,
        };
      case '정상':
        return {
          gageImage: normalGage,
          percentColor: '#76E15D',
          textColor: '#136A00',
          text: `${nickname}님의 건강지수는 ${totalScore}%로 정상 단계입니다.`,
        };
      case '관심':
        return {
          gageImage: interestGage,
          percentColor: '#FC0',
          textColor: '#5B3C00',
          text: `${nickname}님의 건강지수는 ${totalScore}%로 관심 단계입니다.`,
        };
      case '주의':
        return {
          gageImage: warnGage,
          percentColor: '#FF732D',
          textColor: '#923100',
          text: `${nickname}님의 건강지수는 ${totalScore}%로 주의 단계입니다.`,
        };
      case '위험':
        return {
          gageImage: dangerGage,
          percentColor: '#ED5151',
          textColor: '#680707',
          text: `${nickname}님의 건강지수는 ${totalScore}%로 위험 단계입니다.`,
        };
    }
  };

  const config = getStageConfig(stage);

  return (
    <div
      style={{
        position: 'relative',
        width: '555.188px',
        height: '555.188px',
        flexShrink: 0,
        backgroundImage: `url(${config.gageImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '238px',
          height: '143px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: config.percentColor,
          fontFamily: 'Pretendard',
          fontSize: '120px',
          fontWeight: 400,
          letterSpacing: '-3.6px',
        }}
      >
        {totalScore}%
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '180px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '100%',
          color: config.textColor,
          fontFamily: 'Pretendard',
          fontSize: '15.75px',
          fontWeight: 600,
          lineHeight: '22.5px',
          letterSpacing: '-0.472px',
        }}
      >
        {config.text}
      </div>
    </div>
  );
};

export default Gage;
