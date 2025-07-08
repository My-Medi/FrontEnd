// import React from "react";

// interface PatientInfoProps {
//   nickname: string;
//   name: string;
//   age: number;
//   height: number;
//   weight: number;
//   checkupCount: number;
// }

// const PatientInfoSection: React.FC<PatientInfoProps> = ({
//   nickname,
//   name,
//   age,
//   height,
//   weight,
//   checkupCount,
// }) => {
//   return (
//     <section className="w-full bg-white rounded-2xl shadow-md p-6 mb-6">
//       <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
//         {/* 왼쪽: 프로필 이미지와 인사 */}
//         <div className="flex flex-col items-center lg:items-start">
//           <h2 className="text-[2rem] font-bold text-[#121218] mb-4 lg:mb-6">
//             안녕하세요! <span className="whitespace-nowrap">{name}님!</span>
//           </h2>
//           <div className="w-[228px] h-[228px] bg-gray-100 rounded-full" />
//         </div>

//         {/* 오른쪽: 정보 리스트 */}
//         <div className="flex flex-col flex-grow min-w-[312px] gap-5 translate-y-3  mt-[29px] lg:mt-[29px] ">
//           <div className="flex items-start gap-">
//             <span className="text-[1.25rem] text-[#121218] w-[140px] border-l-4 pl-2 border-[#1D68FF]">
//               회원명
//             </span>
//             <p className="text-[1.5rem] translate-x-15 font-medium">
//               <span className="text-[#1D68FF]">{nickname}</span>
//               <span className="text-[#121218]"> / {name}</span>
//             </p>
//           </div>

//           <div className="flex items-start gap-15">
//             <span className="text-[1.25rem] text-[#121218] w-[140px] border-l-4 pl-2 border-[#1D68FF]">
//               나이(만)
//             </span>
//             <p className="text-[1.25rem] text-[#121218]">만 {age}세</p>
//           </div>

//           <div className="flex items-start gap-15">
//             <span className="text-[1.25rem] text-[#121218] w-[140px] border-l-4 pl-2 border-[#1D68FF]">
//               키/몸무게
//             </span>
//             <p className="text-[1.25rem] text-[#121218]">
//               {height}cm / {weight}kg
//             </p>
//           </div>

//           <div className="flex items-start gap-15 flex-nowrap">
//             <span className="text-[1.25rem] text-[#121218] w-[140px] border-l-4 pl-2 border-[#1D68FF] whitespace-nowrap">
//               국가건강검진 횟수
//             </span>
//             <p className="text-[1.25rem] text-[#121218] whitespace-nowrap">
//               {checkupCount}회
//             </p>
//           </div>
//         </div>

//         {/* 회원정보 수정하기 */}
//         <div className="mt-4 lg:mt-0 self-center lg:self-end">
//           <a
//             href="#"
//             className="text-[1.25rem] text-[#1D68FF] font-medium hover:underline"
//           >
//             회원정보 수정하기 &gt;
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PatientInfoSection;

import React from "react";
import defaultProfileImage from "@/assets/profile.svg";

interface PatientInfoProps {
  nickname: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  checkupCount: number;
  profileImageUrl?: string; // optional: 사용자 이미지가 있을 경우
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
    <section className="w-full max-w-[90vw] mx-auto h-auto px-[3vw] py-[2vw] bg-white rounded-[4.7vw]">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-[2vw]">
        {/* 왼쪽: 인사말 + 프로필 사진 */}
        <div className="flex flex-col mt-[-2.5vw] mb-[-2.5vw] ml-[-2vw]">
          <h2 className="text-[2vw] font-pretendard font-medium text-[#121218] tracking-[-0.03em] leading-none mb-[0.5vw] whitespace-nowrap">
            안녕하세요! <span className="whitespace-nowrap">{name}님!</span>
          </h2>

          <div className="w-[16vw] h-[16vw] mt-[2.5vw] ml-[0.5vw] bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={profileImageUrl || defaultProfileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* 오른쪽: 회원정보 + 수정 링크*/}
        <div className="flex flex-col justify-between flex-grow min-w-[30vw] mb-[-3vw]">
          <div className="flex flex-col gap-[0.5vw] pt-[1.5vw] mt-[2vw]">
            <InfoItem label="회원명">
              <span className="text-[#1D68FF] text-[1.3vw]">{nickname}</span>
              <span className="text-[#121218] text-[1.3vw]"> / {name}</span>
            </InfoItem>

            <InfoItem label="나이(만)">
              <span className="text-[1.2vw]">만 {age}세</span>
            </InfoItem>

            <InfoItem label="키/몸무게">
              <span className="text-[1.2vw]">
                {height}cm / {weight}kg
              </span>
            </InfoItem>

            <InfoItem label="국가건강검진 횟수">
              <span className="text-[1.2vw]">{checkupCount}회</span>
            </InfoItem>
          </div>

          <div className="mt-[1vw] self-end whitespace-nowrap">
            <a
              href="#"
              className="text-[1.2vw] font-pretendard text-[#1D68FF] font-medium hover:underline flex items-center"
            >
              회원정보 수정하기
              <span className="text-[1.7vw] font-pretendard ml-[0.3vw] mr-[-2vw]">
                &gt;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// 정보 항목 컴포넌트 (이름, 나이, 키/몸무게, 건강검진 횟수)
const InfoItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-[1.2vw] mt-[1vw] ml-[-2vw]">
    <span className="w-[9vw] text-[1.2vw] font-pretendard text-[#121218] border-l-[0.3vw] border-[#1D68FF] pl-[0.6vw] whitespace-nowrap ml-[2vw]">
      {label}
    </span>
    <p className="text-[1.2vw] ml-[2vw] font-pretendard text-[#121218] whitespace-nowrap">
      {children}
    </p>
  </div>
);

export default PatientInfoSection;
