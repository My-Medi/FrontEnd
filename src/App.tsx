import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// import GlobalStyles from "./styles/GlobalStyles";
import HomeLayout from "./layout/HomeLayout";
import MyHome from "./pages/MyHome";
import SignUp from "./pages/SignUp";
import SignUpInfoPage from "./pages/SignUpInfo";
import SignUpComplete from "./pages/SignUpComplete";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import IntroducePage from "./pages/IntroducePage";
import TermsAgreement from "./pages/Signup/TermsAgreement";
import ExpertInputform from "./pages/Signup/ExpertInputform";
import NotFoundPage from "./pages/NotFoundPage";

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
      {/* <GlobalStyles /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
