import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // 현재 경로를 쿼리 파라미터로 전달하여 로그인 후 원래 페이지로 돌아갈 수 있도록 함
      const redirectPath = encodeURIComponent(location.pathname);
      navigate(`/login?redirect=${redirectPath}`);
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  // 로딩 중이거나 인증되지 않은 경우 로딩 화면 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-0">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않은 경우 null 반환 (useEffect에서 리다이렉트 처리)
  if (!isAuthenticated) {
    return null;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute; 