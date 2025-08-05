import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layout/HomeLayout';
import MyHome from '../pages/Myhome/MyHome';
import SignUp from '../pages/Signup/SignUp';
import LoginPage from '../pages/Login/LoginPage';
import IntroducePage from '../pages/Introduce/IntroducePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import HealthCheckupResultInput from '../pages/HealthCheckupResultInput/HealthCheckupResultInput';
import ExpertPage from '../pages/Expert/ExpertPage';
import CalendarIntroPage from '../pages/Introduce/CalendarIntroPage';
import ExpertMatchingIntroPage from '../pages/Introduce/ExpertMatchingPage';
import MedicalReportPage from '../pages/Introduce/MedicalReportPage';
import AIHealthCarePage from '../pages/Introduce/AIHealthCarePage';
import HealthTermsPage from '../pages/HealthTerms/HealthTerm';
import ProtectedRoute from '../components/Common/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <IntroducePage /> },
      { 
        path: 'myhome', 
        element: (
          <ProtectedRoute>
            <MyHome />
          </ProtectedRoute>
        ) 
      },
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'introduce', element: <IntroducePage /> },
      { 
        path: 'health-result-input', 
        element: (
          <ProtectedRoute>
            <HealthCheckupResultInput />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'expert', 
        element: (
          <ProtectedRoute>
            <ExpertPage />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'health-terms', 
        element: (
          <ProtectedRoute>
            <HealthTermsPage />
          </ProtectedRoute>
        ) 
      },
      { path: 'calendar-intro', element: <CalendarIntroPage /> },
      { path: 'expert-matching-intro', element: <ExpertMatchingIntroPage /> },
      { path: 'medical-report-intro', element: <MedicalReportPage /> },
      { path: 'ai-healthcare-intro', element: <AIHealthCarePage /> },
    ],
  },
]); 