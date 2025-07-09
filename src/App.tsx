import "./App.css";
import type { JSX } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import HomeLayout from "./layout/HomeLayout";
import MyHome from "./pages/MyHome";
import SignUp from "./pages/SignUp";
import SignUpInfo from "./pages/SignUpInfo";
import SignUpComplete from "./pages/SignUpComplete";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "mypage",
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
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
