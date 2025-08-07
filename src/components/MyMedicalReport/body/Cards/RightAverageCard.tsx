import React from 'react';

interface RightAverageCardProps {
  year: string; // "2023"
  ageGroup: string; // "20대"
  value: string; // "115"
  unit: string; //  "mm/HG"
  standard: string; //  "120 미만"
  gender?: string; // "여"
}

const RightAverageCard: React.FC<RightAverageCardProps> = ({
  year,
  ageGroup,
  value,
  unit,
  standard,
  gender,
}) => {
  return (
    <div
      style={{
        width: '420px',
        height: '226px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        gap: '8px',
        borderRadius: '15px',
        border: '1px solid #DBE6FF',
        background: '#FFFFFF',
        boxShadow: '0px 2px 6px rgba(120, 120, 120, 0.15)',
      }}
    >
      {/* 텍스트 영역 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          height: '148px',
        }}
      >
        <p style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
          {year} 건강 데이터의 {ageGroup} 평균
        </p>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '32px', fontWeight: 500 }}>{value}</span>
          <span style={{ fontSize: '18px', fontWeight: 500 }}>{unit}</span>
        </div>

        <p style={{ fontSize: '24px', fontWeight: 500, color: '#75787B', margin: 0 }}>
          정상 기준 수치 {gender ? `${gender} ${standard}` : standard}
        </p>
      </div>

      {/* 하단 점선 + 원 */}
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
            borderTop: '2px dotted #DBE6FF',
            position: 'absolute',
            top: '12px',
          }}
        />
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#DBE6FF',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
};

export default RightAverageCard;
