import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop View: xl(1280px) 이상에서만 보임. Figma 디자인에 맞춰 스타일 수정 */}
      <div className="hidden lg:block">
        <div className="flex justify-between items-center min-w-[1024px] w-full h-[138px] px-[100px] pt-[30px] bg-white/80">
          <div className="flex items-center gap-2.5">
            <img
              src="/MyMedi_logo.png"
              className="w-[50px] h-[50px] object-cover"
            />
            <p
              onClick={() => navigate("/")}
              className="cursor-pointer text-5xl font-semibold text-left text-[#1d68ff]"
            >
              MYMEDi{" "}
            </p>
            <div className="hidden min-[1410px]:flex items-end gap-2 mr-10">
              <p className="text-[32px] font-semibold text-[#121212] whitespace-nowrap">
                마이 메디
              </p>
              <p className="text-[15px] font-semibold text-[#121212]/70 whitespace-nowrap">
                마이 메디컬 리포트
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2.5">
              <p
                onClick={() => navigate("/introduce")}
                className="cursor-pointer whitespace-nowrap text-xl text-left capitalize text-[#121212]"
              >
                mymedi 소개
              </p>
            </div>
            <div className="flex items-center gap-10 flex-shrink-0">
              <p
                onClick={() => navigate("login")}
                className="cursor-pointer text-xl text-left text-[#121212]"
              >
                LOGIN
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <p
                onClick={() => navigate("/signup")}
                className="cursor-pointer whitespace-nowrap text-xl font-medium text-left text-[#121212]"
              >
                회원가입
              </p>
            </div>
            <div className="hidden min-[1410px]:flex items-center gap-[223px] px-5 py-2.5 rounded-[20px] bg-[#f6f6f6]">
              <p className="text-base font-medium text-left text-[#121212]/50">
                Search
              </p>
              <svg
                width={21}
                height={20}
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.6357 14.9977C13.3152 16.1219 11.6035 16.8003 9.73341 16.8003C5.55446 16.8003 2.16675 13.4126 2.16675 9.23366C2.16675 5.0547 5.55446 1.66699 9.73341 1.66699C13.9124 1.66699 17.3001 5.0547 17.3001 9.23366C17.3001 11.0925 16.6298 12.7948 15.5178 14.112L19.1498 17.744L18.2659 18.6279L14.6357 14.9977ZM16.0501 9.23366C16.0501 12.7223 13.222 15.5503 9.73341 15.5503C6.24482 15.5503 3.41675 12.7223 3.41675 9.23366C3.41675 5.74506 6.24482 2.91699 9.73341 2.91699C13.222 2.91699 16.0501 5.74506 16.0501 9.23366Z"
                  fill="#121212"
                  fill-opacity="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile View: xl(1280px) 미만에서만 보임 */}
      <div className="lg:hidden">
        <div className="relative z-20 flex justify-between items-center w-full h-20 px-4  shadow-sm">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavigate("/")}>
              <img src="/MyMedi_logo.png" className="w-10 h-10 object-cover" alt="MyMedi Logo"/>
              <p className="text-3xl font-semibold text-[#1d68ff]">MYMEDi</p>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴 열기">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-lg z-50">
            <nav className="flex flex-col items-center gap-4 py-8">
              {/* NavBar Links */}
              <a onClick={() => handleNavigate('/myhome')} className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-[#1d68ff]">마이 홈</a>
              <a onClick={() => handleNavigate('/health-result-input')} className="px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff]">마이 메디컬 리포트</a>
              <a onClick={() => handleNavigate('/find-expert')} className="px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff]">전문가 찾기</a>
              <a onClick={() => handleNavigate('/health-terms')} className="px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff]">건강용어 알아보기</a>
              <div className="w-10/12 h-px bg-gray-200 my-4"></div>
              {/* Topbar Links */}
              <a onClick={() => handleNavigate("/introduce")} className="px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff]">mymedi 소개</a>
              <a onClick={() => handleNavigate("/login")} className="px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff]">LOGIN</a>
              <a onClick={() => handleNavigate("/signup")} className="px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff]">회원가입</a>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Topbar;