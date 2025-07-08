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
    ],
  },
]);

function App(): JSX.Element {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
