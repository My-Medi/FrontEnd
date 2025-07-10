import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar/Topbar";

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
