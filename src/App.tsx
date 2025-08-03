import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import HomeLayout from './layout/HomeLayout';
import MyHome from './pages/Myhome/MyHome';
import SignUp from './pages/Signup/SignUp';
import LoginPage from './pages/Login/LoginPage';
import IntroducePage from './pages/Introduce/IntroducePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HealthCheckupResultInput from './pages/HealthCheckupResultInput/HealthCheckupResultInput';
import ExpertPage from './pages/Expert/ExpertPage';
import CalendarIntroPage from './pages/Introduce/CalendarIntroPage';
import ExpertMatchingIntroPage from './pages/Introduce/ExpertMatchingPage';
import MedicalReportPage from './pages/Introduce/MedicalReportPage';
import AIHealthCarePage from './pages/Introduce/AIHealthCarePage';
import HealthTermsPage from './pages/HealthTerms/HealthTerm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoadingSpinner from './components/Common/LoadingSpinner';

// 로딩 상태를 처리하는 컴포넌트
const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="로그인 상태 확인 중..." />;
  }

  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <IntroducePage /> },
      { path: 'myhome', element: <MyHome /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'introduce', element: <IntroducePage /> },
      { path: 'health-result-input', element: <HealthCheckupResultInput /> },
      { path: 'expert', element: <ExpertPage /> },
      { path: 'health-terms', element: <HealthTermsPage /> },
      { path: 'calendar-intro', element: <CalendarIntroPage /> },
      { path: 'expert-matching-intro', element: <ExpertMatchingIntroPage /> },
      { path: 'medical-report-intro', element: <MedicalReportPage /> },
      { path: 'ai-healthcare-intro', element: <AIHealthCarePage /> },
    ],
  },
]);

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
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
