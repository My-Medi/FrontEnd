import React from "react";
import defaultProfileImage from "@/assets/profile.svg";

interface PatientInfoProps {
  nickname: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  checkupCount: number;
  profileImageUrl?: string;
}

const PatientInfoSection: React.FC<PatientInfoProps> = ({
  nickname,
  name,
  age,
  height,
  weight,
  checkupCount,
  profileImageUrl,
}) => {
  return (
    <section className="w-full bg-white p-[0.1vw] mt-[-1.8vw] mb-[0.08vw] ml-[-1vw]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[2vw] lg:gap-[3vw]">
        {/* 왼쪽: 제목 + 프로필 이미지 */}
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-[clamp(16px,2vw,32px)] font-medium font-pretendard text-[#121218] mb-[0.8vw] whitespace-nowrap">
            안녕하세요! <span className="whitespace-nowrap">{name}님!</span>
          </h2>
          <div className="w-[clamp(100px,11.875vw,228px)] h-[clamp(100px,11.875vw,228px)] mt-[clamp(20px,1vw,48px)] bg-gray-100 rounded-[50%] overflow-hidden flex items-center justify-center">
            <img
              src={profileImageUrl || defaultProfileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover rounded-[50%]"
            />
          </div>
        </div>

        {/* 오른쪽: 정보 리스트 */}
        <div className="flex flex-col flex-grow min-w-[30vw] ml-[-4.3vw] gap-[1.5vw] mt-[4vw]">
          {[
            {
              label: "회원명",
              content: (
                <>
                  <span className="text-[#1D68FF] font-medium text-[clamp(12px,1.1vw,24px)]">
                    {nickname}
                  </span>
                  <span className="text-[#121218] font-medium text-[clamp(12px,1.1vw,24px)]">
                    {" "}
                    / {name}
                  </span>
                </>
              ),
            },
            { label: "나이(만)", content: `만 ${age}세` },
            { label: "키/몸무게", content: `${height}cm / ${weight}kg` },
            { label: "국가건강검진 횟수", content: `${checkupCount}회` },
          ].map(({ label, content }, idx) => (
            <div className="flex items-start gap-[1vw] mb-[-0.5vw]" key={idx}>
              <div className="flex items-center gap-[0.5vw]">
                <div className="w-[0.2vw] h-[1.2vw] bg-[#1D68FF] " />
                <span className="text-[clamp(12px,1.1vw,20px)] text-[#121218] w-[9vw] pl-[0.8vw] ml-[-0.4vw] border-[#1D68FF]">
                  {label}
                </span>
              </div>
              <p className="text-[clamp(12px,1.1vw,20px)] text-[#121218]">
                {content}
              </p>
            </div>
          ))}
        </div>

        {/* 회원정보 수정하기 */}
        <div className="mt-[2vw] lg:mt-0 self-center lg:self-end mb-[1.2vw]">
          <a
            href="#"
            className="text-[clamp(12px,1vw,20px)] text-[#1D68FF] font-pretendard hover:underline whitespace-nowrap"
          >
            회원정보 수정하기 &gt;
          </a>
        </div>
      </div>
    </section>
  );
};

export default PatientInfoSection;
