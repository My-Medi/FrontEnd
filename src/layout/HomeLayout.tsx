import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const HomeLayout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
