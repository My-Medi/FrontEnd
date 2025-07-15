import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Common/layout/NavBar';
import Footer from '../components/Common/layout/Footer';
import Topbar from '../components/Common/layout/Topbar';

const HomeLayout: React.FC = () => {
  return (
    <div className="w-full"> {/* 전체 배경을 위한 최상위 div */}
      <div className="max-w-[1920px] mx-auto"> {/* 콘텐츠 중앙 정렬을 위한 div */}
        <header>
          <Topbar />
          <NavBar />
        </header>
        <main className="flex-grow pb-[560px]">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;