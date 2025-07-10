import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// import GlobalStyles from "./styles/GlobalStyles";
import HomeLayout from "./layout/HomeLayout";
import MyHome from "./pages/Myhome/MyHome";
import SignUp from "./pages/Signup/SignUp";
import SignUpInfoPage from "./pages/Signup/SignUpInfo";
import SignUpComplete from "./pages/Signup/SignUpComplete";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import IntroducePage from "./pages/Introduce/IntroducePage";
import TermsAgreement from "./pages/Signup/TermsAgreement";
import ExpertInputform from "./pages/Signup/ExpertInputform";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "myhome", element: <MyHome /> },
      { path: "signup", element: <SignUp /> },
      { path: "terms-agreement", element: <TermsAgreement /> },
      { path: "signup-info", element: <SignUpInfoPage /> },
      { path: "expert-info", element: <ExpertInputform /> },
      { path: "signup-complete", element: <SignUpComplete /> },
      { path: "login", element: <LoginPage /> },
      { path: "introduce", element: <IntroducePage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App; 