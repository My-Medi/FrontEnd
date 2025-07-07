import React from "react";

interface PatientInfoProps {
  nickname: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  checkupCount: number;
}

const PatientInfoSection: React.FC<PatientInfoProps> = ({
  nickname,
  name,
  age,
  height,
  weight,
  checkupCount,
}) => {
  return (
    <section className="w-full bg-white rounded-2xl shadow-md p-6 mb-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
        {/* 왼쪽: 프로필 이미지와 인사 */}
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-[2rem] font-bold text-[#121218] mb-4 lg:mb-6">
            안녕하세요! <span className="whitespace-nowrap">{name}님!</span>
          </h2>
          <div className="w-[228px] h-[228px] bg-gray-100 rounded-full" />
        </div>

        {/* 오른쪽: 정보 리스트 */}
        <div className="flex flex-col flex-grow min-w-[312px] gap-5 translate-y-3  mt-[29px] lg:mt-[29px] ">
          <div className="flex items-start gap-">
            <span className="text-[1.25rem] text-[#121218] w-[140px] border-l-4 pl-2 border-[#1D68FF]">
              회원명
            </span>
            <p className="text-[1.5rem] translate-x-15 font-medium">
              <span className="text-[#1D68FF]">{nickname}</span>
              <span className="text-[#121218]"> / {name}</span>
            </p>
          </div>

          <div className="flex items-start gap-15">
            <span className="text-[1.25rem] text-[#121218] w-[140px] border-l-4 pl-2 border-[#1D68FF]">
              나이(만)
            </span>
            <p className="text-[1.25rem] text-[#121218]">만 {age}세</p>
          </div>

          <div className="flex items-start gap-15">
            <span className="text-[1.25rem] text-[#121218] w-[140px] border-l-4 pl-2 border-[#1D68FF]">
              키/몸무게
            </span>
            <p className="text-[1.25rem] text-[#121218]">
              {height}cm / {weight}kg
            </p>
          </div>

          <div className="flex items-start gap-15 flex-nowrap">
            <span className="text-[1.25rem] text-[#121218] w-[140px] border-l-4 pl-2 border-[#1D68FF] whitespace-nowrap">
              국가건강검진 횟수
            </span>
            <p className="text-[1.25rem] text-[#121218] whitespace-nowrap">
              {checkupCount}회
            </p>
          </div>
        </div>

        {/* 회원정보 수정하기 */}
        <div className="mt-4 lg:mt-0 self-center lg:self-end">
          <a
            href="#"
            className="text-[1.25rem] text-[#1D68FF] font-medium hover:underline"
          >
            회원정보 수정하기 &gt;
          </a>
        </div>
      </div>
    </section>
  );
};

export default PatientInfoSection;
