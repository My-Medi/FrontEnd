export interface TermResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    term: string;
    shortDesc: string;
    description: string;
    normalRange: string;
  };
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface HealthTermsChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}
