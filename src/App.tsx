import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import IntroducePage from "./pages/IntroducePage";
import TermsAgreement from "./pages/Signup/TermsAgreement";
import ExpertInputform from "./pages/Signup/ExpertInputform";

import "./App.css";
import type { JSX } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import HomeLayout from "./layout/HomeLayout";
import MyHome from "./pages/MyHome";
import SignUp from "./pages/SignUp";
import SignUpInfo from "./pages/SignUpInfo";
import SignUpComplete from "./pages/SignUpComplete";
import './App.css';
import type { JSX } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';
import MyHome from './pages/MyHome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: 'myhome',
        element: <MyHome />,
      },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "signupinfo",
          element: <SignUpInfo />,
        },
        {
          path: "signupcomplete",
          element: <SignUpComplete />,
        },
    ],
  },
]);

function App(): JSX.Element {
  return (
    <div>
      <BrowserRouter>
      <Topbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/introduce" element={<IntroducePage />} />
        </Routes>
      <ExpertInputform/>
      {/* <TermsAgreement/> */}
    
      </BrowserRouter>
    
      
      
      
    </div>
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
