import React from 'react';
import stageStyleMap from '../../../../constants/stageStyle';
import TooltipForTerm from './TooltipForTerm';

interface LeftPatientCardProps {
  nickname: string;
  title: string;
  value?: string;
  unit?: string;
  stage: '정상' | '주의' | '위험' | '안심' | '관심' | '알수없음';
  isUnknown?: boolean;
}

const LeftPatientCard: React.FC<LeftPatientCardProps> = ({
  nickname,
  title,
  value,
  unit,
  stage,
  isUnknown = false,
}) => {
  // '알수없음' stage일 때는 isUnknown 스타일 사용
  const shouldUseUnknownStyle = isUnknown || stage === '알수없음';
  const style = stage === '알수없음' ? stageStyleMap['정상'] : stageStyleMap[stage];

  const wrapperStyle: React.CSSProperties = shouldUseUnknownStyle
    ? {
        width: '420px',
        height: '226px',
        borderRadius: '15px',
        padding: '30px',
        background:
          'radial-gradient(79.04% 79.48% at 50% 50%, rgba(157, 160, 163, 0.20) 0%, rgba(157, 160, 163, 0.00) 100%)',
        border: '1px solid #9DA0A3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 6px 0 rgba(120, 120, 120, 0.15)',
      }
    : {
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
      };

  const dashedColor = shouldUseUnknownStyle ? '#9DA0A3' : style.dashedStroke;
  const circleFill = shouldUseUnknownStyle
    ? 'rgba(157, 160, 163, 0.50)'
    : (style.circleFill as string);
  const valueColor = shouldUseUnknownStyle ? '#C0C2C4' : '#121218';
  const unitColor = shouldUseUnknownStyle ? '#121218' : '#121218';
  const stageTextColor = shouldUseUnknownStyle ? '#9DA0A3' : style.textColor;

  return (
    <div style={wrapperStyle}>
      <p
        style={{
          fontWeight: 600,
          fontSize: '20px',
          letterSpacing: '-0.6px',
          color: '#121218',
          marginBottom: '6px',
        }}
      >
        {nickname}님의{' '}
        <TooltipForTerm title={title}>
          <span>{title}</span>
        </TooltipForTerm>
      </p>

      {/* 수치 + 단위 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span
          style={{
            fontSize: '32px',
            fontWeight: 500,
            letterSpacing: '-0.96px',
            color: valueColor,
            minWidth: '1ch', // 레이아웃 안정
          }}
        >
          {shouldUseUnknownStyle ? '' : (value ?? '')} {/* unknown일 때는 빈 값 */}
        </span>
        {unit && (
          <span
            style={{
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '-0.54px',
              color: unitColor,
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
          color: stageTextColor,
          marginTop: '10px',
          marginBottom: '12px',
        }}
      >
        {shouldUseUnknownStyle ? '단계' : `${stage} 단계`}
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
        <div
          style={{
            width: '100%',
            height: '1px',
            borderTop: `2px dotted ${dashedColor}`,
            position: 'absolute',
            top: '12px',
          }}
        />
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: circleFill,
            boxShadow: `0 0 8px 2px ${circleFill}`,
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
};

export default LeftPatientCard;
