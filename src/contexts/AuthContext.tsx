import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  userType: 'patient' | 'expert' | null;
  setUserType: (type: 'patient' | 'expert' | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // localStorage에서 초기값 가져오기
  const [userType, setUserTypeState] = useState<'patient' | 'expert' | null>(() => {
    const saved = localStorage.getItem('userType');
    return saved as 'patient' | 'expert' | null || null;
  });

  const setUserType = (type: 'patient' | 'expert' | null) => {
    setUserTypeState(type);
    if (type) {
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('userType');
    }
  };

  // 개발자 도구에서 테스트할 수 있도록 window 객체에 노출
  useEffect(() => {
    (window as any).setUserType = setUserType;
    (window as any).getUserType = () => userType;
    
    return () => {
      delete (window as any).setUserType;
      delete (window as any).getUserType;
    };
  }, [userType]);

  return (
    <AuthContext.Provider value={{ userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
}; 