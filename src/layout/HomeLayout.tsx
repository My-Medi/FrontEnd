import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Common/layout/NavBar";
import Footer from "../components/Common/layout/Footer";
import Topbar from "../components/Common/layout/Topbar";

const HomeLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="w-full max-w-[1920px] mx-auto flex flex-col flex-grow">
        <NavBar />
        <main className="flex-grow mb-24 lg:mb-[640px]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
