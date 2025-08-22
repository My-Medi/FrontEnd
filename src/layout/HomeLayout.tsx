import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/Common/layout/NavBar';
import Footer from '../components/Common/layout/Footer';
import Topbar from '../components/Common/layout/Topbar';
import HealthTermsChatbot from '../components/HealthTerms/HealthTermsChatbot';
import { useChatbot } from '../contexts/ChatbotContext';

const HomeLayout: React.FC = () => {
  const location = useLocation();
  const { isChatbotOpen, closeChatbot } = useChatbot();
  
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
      <div className={shouldUseFullWidth ? "w-full mx-auto" : "w-full mx-auto"}> 
        <main className="flex-grow pb-[320px]">
          <Outlet />
        </main>
      </div>
      <Footer />
      
      {/* 전역 챗봇 */}
      <HealthTermsChatbot
        isOpen={isChatbotOpen}
        onClose={closeChatbot}
      />
    </div>
  );
};

export default HomeLayout;