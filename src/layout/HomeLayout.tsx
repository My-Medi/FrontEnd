import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/Common/layout/NavBar';
import Footer from '../components/Common/layout/Footer';
import Topbar from '../components/Common/layout/Topbar';

const HomeLayout: React.FC = () => {
  const location = useLocation();
  const isIntroducePage = location.pathname === '/introduce';
  const isCalendarIntroPage = location.pathname === '/calendar-intro';
  const shouldUseFullWidth = isIntroducePage || isCalendarIntroPage;

  return (
    <div className="w-full"> 
      <header className='w-full'>
        <Topbar />
        <NavBar />
      </header>
      <div className={shouldUseFullWidth ? "mx-auto" : "max-w-[1920px] mx-auto"}> 
        <main className="flex-grow pb-[320px]">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;