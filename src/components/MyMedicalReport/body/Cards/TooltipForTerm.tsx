import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TooltipForTermProps {
  title: string;
  children: React.ReactNode;
}

const TOOLTIP_TEXT_MAP: Record<string, string | undefined> = {
  혈색소: '피 속 산소 배달부가 부족하지 않은지 확인해요!',
  공복혈당: '피 속에 설탕이 얼마나 있는 지 확인할 수 있어요!',
  총콜레스테롤: '피 속 기름이 얼마나 있는 지 알 수 있어요!',
  'HDL-콜레스테롤': '나쁜 기름을 치워주는 착한 기름이 얼마나 있는 지 알려줘요!',
  중성지방: '먹고 남은 에너지가 기름이 되어 쌓인거에요!',
  'LDL-콜레스테롤': '혈관을 막는 나쁜 기름이 얼마나 있는 지 알려줘요!',
  '혈청 크레아티닌': '콩팥이 찌꺼기를 잘 버리는 지 알 수 있어요!',
  'eGFR(신사구체여과율)': '콩팥 속 작은 필터가 잘 작동하는 지 알 수 있어요!',
  AST: '아프면 올라가는 간 수치를 알 수 있어요!',
  ALT: '아프면 올라가는 간 수치를 알 수 있어요!',
  '감마-GTP': '간이 술이나 기름진 음식으로 힘들어하는 지를 확인해요!',
  요단백: '소변에 단백질이 섞여 나오는 지 확인할 수 있어요!',
};

const HIDE_DELAY_MS = 300; // 호버 해제 후 유지 시간

const TooltipForTerm: React.FC<TooltipForTermProps> = ({ title, children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [tooltipLeftOffset, setTooltipLeftOffset] = useState(0);
  const navigate = useNavigate();
  const hideTimer = useRef<number | null>(null);

  const tooltipText = TOOLTIP_TEXT_MAP[title];

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTooltipLeftOffset(rect.left + rect.width / 2);
    }
  }, [isHovering]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  const open = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    setIsHovering(true);
  };

  const scheduleClose = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setIsHovering(false), HIDE_DELAY_MS);
  };

  const handleClick = () => {
    // TooltipForTerm의 title을 HealthTerm의 id로 매핑
    const titleToIdMap: Record<string, string> = {
      혈색소: '혈색소(Hemoglobin)',
      공복혈당: '공복혈당(FBS)',
      총콜레스테롤: '총콜레스테롤',
      'HDL-콜레스테롤': 'HDL 콜레스테롤',
      중성지방: '중성지방(Triglyceride)',
      'LDL-콜레스테롤': 'LDL 콜레스테롤',
      '혈청 크레아티닌': '혈청 크레아티닌',
      'eGFR(신사구체여과율)': '신사구체여과율(eGFR)',
      AST: 'AST(SGOT) / ALT(SGPT)',
      ALT: 'AST(SGOT) / ALT(SGPT)', // ALT도 AST/ALT 항목으로 이동
      '감마-GTP': '감마GTP(Y-GTP)',
      요단백: '요단백',
    };

    const targetTerm = titleToIdMap[title] || title;
    navigate('/health-terms', { state: { preselectTerm: targetTerm } });
  };

  if (!tooltipText) return <>{children}</>;

  return (
    <span
      ref={ref}
      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
    >
      {children}

      {isHovering && (
        <>
          {/* 삼각형 */}
          <div
            onMouseEnter={open}
            onMouseLeave={scheduleClose}
            style={{
              position: 'fixed',
              top: `calc(${ref.current?.getBoundingClientRect().bottom ?? 0}px + 4px)`,
              left: tooltipLeftOffset,
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderBottom: '14px solid rgba(0, 47, 142, 0.48)',
              zIndex: 1000,
              pointerEvents: 'auto',
            }}
          />
          {/* 툴팁 박스 */}
          <div
            onMouseEnter={open}
            onMouseLeave={scheduleClose}
            onClick={handleClick}
            style={{
              position: 'fixed',
              top: `calc(${ref.current?.getBoundingClientRect().bottom ?? 0}px + 18px)`,
              left: tooltipLeftOffset - 120,
              width: '493px',
              height: '116.589px',
              padding: '20px',
              borderRadius: '20px',
              background: 'rgba(0, 47, 142, 0.48)',
              color: '#FFF',
              fontFamily: 'Pretendard',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '36px',
              letterSpacing: '-0.6px',
              textAlign: 'center',
              boxShadow: `
                4px 4px 9.6px rgba(29, 104, 255, 0.04),
                4px 4px 8.4px rgba(29, 104, 255, 0.06),
                4px 4px 7.2px rgba(29, 104, 255, 0.08),
                4px 4px 5.4px rgba(29, 104, 255, 0.10),
                4px 4px 3px rgba(29, 104, 255, 0.12)
              `,
              border: '2px solid #1D68FF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
          >
            <div>{title}</div>
            <div>{tooltipText}</div>
          </div>
        </>
      )}
    </span>
  );
};

export default TooltipForTerm;
