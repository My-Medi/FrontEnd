import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center min-w-[1450px] w-full h-[138px] px-[100px] pt-[30px] bg-white/80">
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
        <div className="flex items-end gap-2 mr-10">
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
        <div className="flex items-center gap-[223px] px-5 py-2.5 rounded-[20px] bg-[#f6f6f6]">
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
  );
};

export default Topbar;