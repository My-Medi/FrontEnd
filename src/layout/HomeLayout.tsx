import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/Common/layout/NavBar';
import Footer from '../components/Common/layout/Footer';
import Topbar from '../components/Common/layout/Topbar';

const HomeLayout: React.FC = () => {
  const location = useLocation();
  
  // 페이지 변경 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const isIntroducePage = location.pathname === '/introduce';
  const isCalendarIntroPage = location.pathname === '/calendar-intro';
  const isExpertMatchingIntroPage = location.pathname === '/expert-matching-intro';
  const isMedicalReportIntroPage = location.pathname === '/medical-report-intro';
  const isAIHealthCareIntroPage = location.pathname === '/ai-healthcare-intro';
  const shouldUseFullWidth = isIntroducePage || isCalendarIntroPage || isExpertMatchingIntroPage || isMedicalReportIntroPage || isAIHealthCareIntroPage;

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