import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Common/layout/NavBar";
import Footer from "../components/Common/layout/Footer";
import Topbar from "../components/Common/layout/Topbar";

const HomeLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <Topbar />
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
