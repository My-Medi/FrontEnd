import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="w-full flex justify-center" >
      <div
        className="bg-white rounded-full flex items-center justify-center py-[14px] gap-x-[136px]"
        style={{
          width: "1672px",
          height: "56px",
          marginLeft: "124px",
          marginRight: "124px",
          boxShadow: "0 0 5px 0 #1D68FF",
        }}
      >
        <a href="#" className="text-[#121212] font-medium">마이 홈</a>
        <a href="#" className="text-[#121212] font-medium">마이 메디컬 리포트</a>
        <a href="#" className="text-[#121212] font-medium">전문가 찾기</a>
        <a href="#" className="text-[#121212] font-medium">건강용어 알아보기</a>
      </div>
    </nav>
  );
};

export default NavBar;
