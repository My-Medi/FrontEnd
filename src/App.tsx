import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
// import GlobalStyles from "./styles/GlobalStyles";
import HomeLayout from './layout/HomeLayout';
import MyHome from './pages/Myhome/MyHome';
import SignUp from './pages/Signup/SignUp';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import IntroducePage from './pages/Introduce/IntroducePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HealthCheckupResultInput from './pages/HealthCheckupResultInput/HealthCheckupResultInput';
import ExpertPage from './pages/Expert/ExpertPage';
import CalendarIntroPage from './pages/Introduce/CalendarIntroPage';
import ExpertMatchingIntroPage from './pages/Introduce/ExpertMatchingIntroPage';
import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'myhome', element: <MyHome /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'introduce', element: <IntroducePage /> },
      { path: 'health-result-input', element: <HealthCheckupResultInput /> },
      { path: 'expert', element: <ExpertPage /> },
      { path: 'calendar-intro', element: <CalendarIntroPage /> },
      { path: 'expert-matching-intro', element: <ExpertMatchingIntroPage /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
