import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../components/Footer";

const HomeLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
