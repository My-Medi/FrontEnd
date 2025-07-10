import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="w-full flex justify-center" >
      <div
        className="bg-white rounded-full flex items-center justify-around py-[14px] min-w-[980px] w-[87%] min-h-[56px] mx-[124px]"
        style={{ boxShadow: "0 0 5px 0 #1D68FF" }}
      >
        <a href="#" className="text-[#121212] text-[22px] leading-[26px]">마이 홈</a>
        <a href="#" className="text-[#121212] text-[22px] leading-[26px]">마이 메디컬 리포트</a>
        <a href="#" className="text-[#121212] text-[22px] leading-[26px]">전문가 찾기</a>
        <a href="#" className="text-[#121212] text-[22px] leading-[26px]">건강용어 알아보기</a>
      </div>
    </nav>
  );
};

export default NavBar;
