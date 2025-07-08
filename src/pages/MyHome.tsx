import React from "react";
import SimpleBox from "../components/MyPage/SimpleBox";
import SideBar from "../components/MyPage/SideBar";

const MyHome: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "calc(2950 * 100vw / 1920)",
      }}
    >
      <SideBar />
      <SimpleBox />
    </div>
  );
};

export default MyHome;
