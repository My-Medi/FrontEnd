import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full hidden lg:flex justify-center" >
      <div
        className="bg-white rounded-full flex items-center justify-around py-[14px] w-[87%] min-h-[56px] mx-[124px]"
        style={{ boxShadow: "0px 0px 20px 0px #1D68FF33" }}
      >
        <p onClick={() => navigate('/myhome')} className="cursor-pointer text-[#121212] text-[22px] leading-[26px]">마이 홈</p>
        <p onClick={() => navigate('/health-result-input')} className="cursor-pointer text-[#121212] text-[22px] leading-[26px]">마이 메디컬 리포트</p>
        <a href="#" className="text-[#121212] text-[22px] leading-[26px]">전문가 찾기</a>
        <a href="#" className="text-[#121212] text-[22px] leading-[26px]">건강용어 알아보기</a>
      </div>
    </nav>
  );
};

export default NavBar;
