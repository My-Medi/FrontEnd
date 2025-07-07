import "./App.css";
import type { JSX } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import HomeLayout from "./layout/HomeLayout";
import MyHome from "./pages/MyHome";
import Home from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "mypage",
        element: <MyHome />,
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
