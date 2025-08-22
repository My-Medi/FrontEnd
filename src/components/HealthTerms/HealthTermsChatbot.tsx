import React, { useEffect } from 'react';
import type { HealthTermsChatbotProps } from '../../types/healthTerms';
import { useHealthTermsChatbot } from '../../hooks/healthTerms/useHealthTermsChatbot';
import useModalScrollLock from '../../hooks/useModalScrollLock';

const HealthTermsChatbot: React.FC<HealthTermsChatbotProps> = ({ isOpen, onClose }) => {
  const {
    messages,
    inputText,
    setInputText,
    isTyping,
    typingText,
    isTypingComplete,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress,
  } = useHealthTermsChatbot();

  // 모달 스크롤 방지
  useModalScrollLock(isOpen);

  // 모달이 열릴 때 스크롤 위치 유지
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      // 약간의 지연 후 스크롤 위치 복원
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#121218]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#ffffff] rounded-3xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col overflow-hidden border border-[#1D68FF]/20">
        {/* 헤더 */}
        <div className="bg-[#1D68FF] text-white p-6 rounded-t-3xl relative overflow-hidden">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">건강용어 AI 어시스턴트</h2>
                <p className="text-white/90 text-sm">건강용어에 대해 궁금한 점을 물어보세요</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors duration-200 p-2 rounded-full hover:bg-white/20 backdrop-blur-sm"
              aria-label="챗봇 닫기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#ffffff]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-2xl ${message.isUser ? 'order-2' : 'order-1'}`}>
                {!message.isUser && (
                  <div className="w-10 h-10 bg-[#1D68FF] rounded-full flex items-center justify-center mb-2 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`px-6 py-4 rounded-3xl shadow-lg ${
                    message.isUser
                      ? 'bg-[#1D68FF] text-white'
                      : 'bg-[#ffffff] text-black border border-[#1D68FF]/20 shadow-md'
                  }`}
                >
                  <p className="text-base leading-relaxed whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-10 h-10 bg-[#1D68FF] rounded-full flex items-center justify-center mb-2 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="bg-[#ffffff] text-black px-6 py-4 rounded-3xl border border-[#1D68FF]/20 shadow-md max-w-2xl">
                {typingText === '생각 중...' ? (
                  // 응답 생성 중일 때만 "생각 중" 애니메이션 표시
                  <div className="flex items-center space-x-2">
                    <span className="text-base text-gray-600">생각 중</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#1D68FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-[#1D68FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-[#1D68FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                ) : (
                  // 응답 텍스트 타이핑 중일 때는 실제 텍스트 표시
                  <p className="text-base leading-relaxed whitespace-pre-line">
                    {typingText}
                    {!isTypingComplete && <span className="animate-pulse text-[#1D68FF]">|</span>}
                  </p>
                )}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <div className="p-6 border-t border-[#1D68FF]/20 bg-[#ffffff]">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="건강용어에 대해 물어보세요..."
                className="w-full px-6 py-4 border border-[#1D68FF]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1D68FF] focus:border-[#1D68FF] transition-all duration-200 text-base pr-16 bg-[#ffffff] shadow-sm hover:shadow-md hover:border-[#1D68FF]/50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-[#1D68FF] text-white rounded-xl hover:bg-[#1D68FF]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center hover:scale-105"
              >
                <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTermsChatbot;
