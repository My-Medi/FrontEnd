import React, { useEffect, useMemo, useState } from 'react';

interface FunLoadingOverlayProps {
  isOpen: boolean;
  messages?: string[];
}

const defaultMessages = [
  'AI가 결과지를 읽고 있어요...',
  '중요 수치를 추출하는 중...',
  '조금만 기다리면 자동으로 채워져요!',
  '건강 목표에 한 걸음 더!'
];

const FunLoadingOverlay: React.FC<FunLoadingOverlayProps> = ({ isOpen, messages }) => {
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

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40'>
      <div className='relative bg-white rounded-[1.25rem] px-8 py-7 flex flex-col items-center gap-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]'>
        {/* 재미있는 도형 애니메이션 (건강 아이콘 느낌의 버블 3개) */}
        <div className='relative w-24 h-24'>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#DBE6FF] animate-ping' />
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#EDF3FF]' />
          <div className='absolute inset-0 flex items-center justify-center gap-2'>
            <span className='inline-block w-3 h-3 rounded-full bg-[#1D68FF] animate-bounce' style={{ animationDelay: '0ms' }} />
            <span className='inline-block w-3 h-3 rounded-full bg-[#6FA0FF] animate-bounce' style={{ animationDelay: '150ms' }} />
            <span className='inline-block w-3 h-3 rounded-full bg-[#9DBDFF] animate-bounce' style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        {/* 메시지 라인 */}
        <div className='min-h-[1.75rem] flex items-center justify-center px-3'>
          <p className='text-[#121218] text-base font-medium text-center transition-opacity duration-300'>
            {lines[idx]}
          </p>
        </div>

        {/* 진행 바 느낌의 스트라이프 로더 */}
        <div className='w-64 h-2 rounded-full overflow-hidden bg-[#F0F4FF]'>
          <div className='h-full w-1/3 bg-gradient-to-r from-[#9DBDFF] via-[#6FA0FF] to-[#1D68FF] animate-[bar_1.2s_linear_infinite]' />
        </div>

        {/* 임베디드 키프레임 (Tailwind 없이 간단히) */}
        <style>{`
          @keyframes bar { 0% { transform: translateX(-120%); } 100% { transform: translateX(320%); } }
        `}</style>
      </div>
    </div>
  );
};

export default FunLoadingOverlay;


