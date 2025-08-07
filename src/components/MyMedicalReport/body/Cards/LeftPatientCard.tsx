import React from 'react';
import stageStyleMap from '../../../../constants/stageStyle';

interface LeftPatientCardProps {
  nickname: string;
  title: string;
  value: string;
  unit?: string;
  stage: '정상' | '주의' | '위험' | '안심' | '관심';
}

const LeftPatientCard: React.FC<LeftPatientCardProps> = ({
  nickname,
  title,
  value,
  unit,
  stage,
}) => {
  const style = stageStyleMap[stage];

  return (
    <div
      style={{
        width: '420px',
        height: '226px',
        borderRadius: '15px',
        padding: '30px',
        background: style.background,
        border: style.border,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 6px 0 rgba(120, 120, 120, 0.15)',
      }}
    >
      <p
        style={{
          fontWeight: 600,
          fontSize: '20px',
          letterSpacing: '-0.6px',
          color: '#121218',
          marginBottom: '6px',
        }}
      >
        {`${nickname}님의 ${title}`}
      </p>

      {/* 수치 + 단위 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span
          style={{
            fontSize: '32px',
            fontWeight: 500,
            letterSpacing: '-0.96px',
            color: '#121218',
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            style={{
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '-0.54px',
              color: '#121218',
            }}
          >
            {unit}
          </span>
        )}
      </div>

      {/* 단계 텍스트 */}
      <p
        style={{
          fontSize: '28px',
          fontWeight: 600,
          letterSpacing: '-0.84px',
          color: style.textColor,
          marginTop: '10px',
          marginBottom: '12px',
        }}
      >
        {stage} 단계
      </p>

      {/* 점선 + 원 */}
      <div
        style={{
          width: '100%',
          height: '48px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* 점선 */}
        <div
          style={{
            width: '100%',
            height: '1px',
            borderTop: `2px dotted ${style.dashedStroke}`,
            position: 'absolute',
            top: '12px',
          }}
        />

        {/* 원 + 퍼지는 그림자 */}
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: style.circleFill,
            boxShadow: `0 0 8px 2px ${style.circleFill}`,
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
};

export default LeftPatientCard;
