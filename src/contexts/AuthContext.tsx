import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getTokens } from '../utils/tokenStorage';

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
  isAuthenticated: boolean;
  isLoading: boolean;
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
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
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  
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

  // 토큰 검증 및 자동 로그인 처리
  useEffect(() => {
    const validateTokens = async () => {
      try {
        const { accessToken, refreshToken } = getTokens();
        
        if (accessToken && refreshToken) {
          // 토큰이 있으면 인증된 상태로 간주
          console.log('토큰이 발견되어 자동 로그인 처리 중...');
          
          // 여기서 실제로는 토큰 유효성을 서버에 검증해야 합니다
          // 현재는 토큰 존재 여부만 확인
          if (!userType) {
            // userType이 없으면 기본값으로 'patient' 설정
            setUserType('patient');
          }
        } else {
          // 토큰이 없으면 로그아웃 상태로 설정
          console.log('토큰이 없어 로그아웃 상태로 설정');
          setUserType(null);
          setUserInfo(null);
        }
      } catch (error) {
        console.error('토큰 검증 중 오류:', error);
        setUserType(null);
        setUserInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    validateTokens();
  }, []);

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

  const isAuthenticated = !!userType;

  return (
    <AuthContext.Provider value={{ 
      userType, 
      setUserType, 
      userInfo, 
      setUserInfo, 
      isAuthenticated,
      isLoading,
      showNotification,
      setShowNotification
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 