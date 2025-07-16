import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Common/layout/NavBar';
import Footer from '../components/Common/layout/Footer';
import Topbar from '../components/Common/layout/Topbar';

const HomeLayout: React.FC = () => {
  return (
    <div className="w-full"> 
      <div className="max-w-[1920px] mx-auto"> 
        <header>
          <Topbar />
          <NavBar />
        </header>
        <main className="flex-grow pb-[320px]">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;