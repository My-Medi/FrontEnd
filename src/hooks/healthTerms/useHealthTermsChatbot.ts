import { useState, useRef, useEffect } from 'react';
import type { Message } from '../../types/healthTerms';
import { fetchTermData } from '../../apis/healthTermsApi';

export const useHealthTermsChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요! 건강용어에 대해 궁금한 점이 있으시면 언제든 물어보세요. 예를 들어 "혈압이 뭐예요?" 또는 "콜레스테롤이 높으면 어떻게 해요?" 같은 질문을 해주세요.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // 새 메시지가 추가될 때만 스크롤
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, typingText]);

  const typeText = (text: string, callback: () => void) => {
    let index = 0;
    setTypingText('생각 중...');
    setIsTypingComplete(false);
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
        callback();
      }
    }, 30); // 타이핑 속도 조절
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // 건강용어 키워드 추출
    const healthTerms = [
      '혈압', '콜레스테롤', '혈당', '간수치', '신장', '빈혈', '비만', '고혈압', '당뇨병', '이상지질혈증',
      '공복혈당', '혈색소', '중성지방', 'LDL', 'HDL', '크레아티닌', '요단백', 'AST', 'ALT', '감마GTP',
      'eGFR', 'B형간염', '폐결핵', '혈청', '요', '간', '신장', '폐', '심장', '뇌'
    ];

    // 사용자 메시지에서 건강용어 찾기
    let foundTerm = '';
    for (const term of healthTerms) {
      if (lowerMessage.includes(term.toLowerCase())) {
        foundTerm = term;
        break;
      }
    }

    // API에서 데이터 가져오기
    if (foundTerm) {
      const termData = await fetchTermData(foundTerm);
      if (termData && termData.isSuccess) {
        const { result } = termData;
        return `${result.term}에 대해 설명드릴게요!\n\n간단 설명: ${result.shortDesc}\n\n상세 설명: ${result.description}\n\n정상 범위: ${result.normalRange}`;
      }
    }

    // API에서 데이터를 찾지 못한 경우 기본 응답
    return '죄송해요. 해당 건강용어에 대한 정보를 찾을 수 없어요. 다른 건강용어를 물어보세요.';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // 챗봇 응답 생성 및 타이핑 효과
    setTimeout(async () => {
      const response = await generateResponse(inputText);
      typeText(response, () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        setTypingText('');
      });
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    inputText,
    setInputText,
    isTyping,
    typingText,
    isTypingComplete,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress,
  };
};
