import React from 'react';
import CTAButton from '../Common/CTAButton';

interface CalendarCTAProps {
  onStart: () => void;
}

const CalendarCTA: React.FC<CalendarCTAProps> = ({ onStart }) => {
  return (
    <CTAButton
      description="마이메디를 통해 나에게 꼭 맞는 전문적 조언과 실질적 도움으로 나의 몸을 더 건강하게 장기적으로 관리해보세요!"
      onClick={onStart}
    />
  );
};

export default CalendarCTA; 