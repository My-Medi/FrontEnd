import React from "react";
import SimpleBox from "../components/MyPage/SimpleBox";
import SideBar from "../components/MyPage/SideBar";

const MyHome: React.FC = () => {
  return (
    <div 
      className="relative w-full"
      style={{ 
        minHeight: 'calc(2900 * 100vw / 1920)' 
      }}
    >
      {/* SideBar */}
      <SideBar />
      
      {/* SimpleBox */}
      <SimpleBox />
    </div>
  );
};

export default MyHome;
