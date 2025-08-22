import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import LoadingSpinner from './components/Common/LoadingSpinner';
import { router } from './router';

// 로딩 상태를 처리하는 컴포넌트
const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <RouterProvider router={router} />;
};

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChatbotProvider>
          <AppContent />
        </ChatbotProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
