import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface UserInfo {
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  nickname: string;
  userId: string;
  email: string;
  emailDomain: string;
  contact: string;
}

interface AuthContextType {
  userType: 'patient' | 'expert' | null;
  setUserType: (type: 'patient' | 'expert' | null) => void;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
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
    console.log('AuthContext 초기화 - localStorage userType:', saved);
    return saved as 'patient' | 'expert' | null || null;
  });

  // 사용자 정보 상태
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  });

  const setUserType = (type: 'patient' | 'expert' | null) => {
    setUserTypeState(type);
    if (type) {
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('userType');
    }
  };

  const setUserInfo = (info: UserInfo | null) => {
    setUserInfoState(info);
    if (info) {
      localStorage.setItem('userInfo', JSON.stringify(info));
    } else {
      localStorage.removeItem('userInfo');
    }
  };

  // 개발자 도구에서 테스트할 수 있도록 window 객체에 노출
  useEffect(() => {
    (window as any).setUserType = setUserType;
    (window as any).getUserType = () => userType;
    (window as any).setUserInfo = setUserInfo;
    (window as any).getUserInfo = () => userInfo;
    
    return () => {
      delete (window as any).setUserType;
      delete (window as any).getUserType;
      delete (window as any).setUserInfo;
      delete (window as any).getUserInfo;
    };
  }, [userType, userInfo]);

  return (
    <AuthContext.Provider value={{ userType, setUserType, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}; 