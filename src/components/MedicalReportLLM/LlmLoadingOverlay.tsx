import React, { useEffect, useMemo, useState } from 'react';

interface LlmLoadingOverlayProps {
  isOpen: boolean;
  messages?: string[];
}

// LLM 리포트 생성 단계에 맞춘 메시지
const defaultMessages = [
  '검진 데이터 파싱 중...',
  '주요 이상 수치 탐지 중...',
  '발병 위험 순위 계산 중...',
  '생활 습관 제안 생성 중...',
  '종합 요약 정리 중...'
];

const LlmLoadingOverlay: React.FC<LlmLoadingOverlayProps> = ({ isOpen, messages }) => {
  const lines = useMemo(() => (messages && messages.length > 0 ? messages : defaultMessages), [messages]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setIdx(0);
    const id = setInterval(() => {
      setIdx((prev) => (prev + 1) % lines.length);
    }, 1400);
    return () => clearInterval(id);
  }, [isOpen, lines.length]);

  // 스크롤 락: 오버레이 표시 중에는 페이지 스크롤 비활성화
  useEffect(() => {
    if (!isOpen) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40' role='dialog' aria-modal='true' aria-label='LLM 리포트 생성 중'>
      <div className='relative bg-white rounded-[1.5rem] px-12 py-10 flex flex-col items-center gap-8 shadow-[0_14px_40px_rgba(0,0,0,0.14)]'>
        {/* 애니메이션 아이콘 (ParsingLoadingOverlay와 동일 UI) */}
        <div className='relative w-40 h-40'>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#DBE6FF] animate-ping' />
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#EDF3FF]' />
          <div className='absolute inset-0 flex items-center justify-center gap-3'>
            <span className='inline-block w-5 h-5 rounded-full bg-[#1D68FF] animate-bounce' style={{ animationDelay: '0ms' }} />
            <span className='inline-block w-5 h-5 rounded-full bg-[#6FA0FF] animate-bounce' style={{ animationDelay: '150ms' }} />
            <span className='inline-block w-5 h-5 rounded-full bg-[#9DBDFF] animate-bounce' style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        {/* 메시지 라인 (동일 스타일) */}
        <div className='min-h-[2.2rem] flex items-center justify-center px-4'>
          <p className='text-[#121218] text-xl font-semibold text-center transition-opacity duration-300'>
            {lines[idx]}
          </p>
        </div>

        {/* 진행 바 (동일 스타일) */}
        <div className='w-96 h-4 rounded-full overflow-hidden bg-[#F0F4FF]'>
          <div className='h-full w-1/3 bg-gradient-to-r from-[#9DBDFF] via-[#6FA0FF] to-[#1D68FF] animate-[bar_1.1s_linear_infinite]' />
        </div>

        <style>{`
          @keyframes bar { 0% { transform: translateX(-120%); } 100% { transform: translateX(320%); } }
        `}</style>
      </div>
    </div>
  );
};

export default LlmLoadingOverlay;


