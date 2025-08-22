import React from 'react';

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-[#1D68FF] hover:bg-[#1D68FF]/90 text-white rounded-2xl w-16 h-16 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[#1D68FF]/25 group relative overflow-hidden"
      aria-label="건강용어 AI 어시스턴트 열기"
    >
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 rounded-full -translate-y-2 translate-x-2"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 bg-white/10 rounded-full translate-y-2 -translate-x-2"></div>
      
      <div className="relative z-10">
        <svg
          className="w-7 h-7 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
      </div>
    </button>
  );
};

export default ChatbotButton;
