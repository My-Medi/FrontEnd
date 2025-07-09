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
    <section className="w-full bg-white p-4 lg:p-0 lg:mb-[0.08vw] lg:ml-[-[calc(73*100vw/1920)]]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-[0.01vw]">
        {/* 왼쪽: 제목 + 프로필 이미지 */}
        <div className="flex flex-col items-center w-full lg:items-start lg:w-auto">
          <h2 className="text-2xl font-medium text-[#121218] mb-4 lg:text-[clamp(16px,2vw,32px)] lg:mb-[0.8vw]">
            안녕하세요! <span className="lg:whitespace-nowrap">{name}님!</span>
          </h2>
          <div className="w-36 h-36 mt-4 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center
                          lg:w-[clamp(100px,11.875vw,228px)] lg:h-[clamp(100px,11.875vw,228px)] lg:mt-[clamp(20px,1vw,48px)]">
            <img
              src={profileImageUrl || defaultProfileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 오른쪽: 정보 리스트 */}
        <div className="flex flex-col flex-grow w-full mt-8 lg:w-auto lg:min-w-[30vw] lg:gap-[1.5vw] lg:mt-[4vw]">
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
            <div className="flex items-start gap-4 mb-2 lg:gap-[1vw] lg:mb-[-0.5vw]" key={idx}>
              <div className="flex items-center gap-2 lg:gap-[0.5vw]">
                <div className="w-1 h-6 bg-[#1D68FF] lg:w-[0.2vw] lg:h-[1.2vw]" />
                <span className="text-base text-[#121218] w-40 pl-2 ml-1 lg:text-[clamp(12px,1.1vw,20px)] lg:w-[9vw] lg:pl-[0.8vw] lg:ml-[-0.4vw]">
                  {label}
                </span>
              </div>
              <p className="text-base text-[#121218] lg:text-[clamp(12px,1.1vw,20px)]">
                {content}
              </p>
            </div>
          ))}
        </div>

        {/* 회원정보 수정하기 */}
        <div className="mt-8 self-center lg:mt-[2vw] lg:self-end lg:mb-[1.2vw]">
          <a
            href="#"
            className="text-base text-[#1D68FF] hover:underline lg:whitespace-nowrap lg:text-[clamp(12px,1vw,20px)]"
          >
            회원정보 수정하기 &gt;
          </a>
        </div>
      </div>
    </section>
  );
};
export default PatientInfoSection;