// import type { HealthStatus } from "../../constants/healthStatus";
// import { healthStatusMap } from "../../constants/healthStatus";

// interface Props {
//   status: HealthStatus;
//   nickname: string;
// }

// const MyConstantMedical: React.FC<Props> = ({ status, nickname }) => {
//   const current = healthStatusMap[status];

//   return (
//     <section className="w-full max-w-[1280px] mx-auto px-4 py-6 space-y-4">
//       {/* 제목 부분 */}
//       <h2 className="font-pretendard font-medium text-[20px] md:text-[24px] text-[#121218]">
//         내 건강은 지금!
//       </h2>

//       {/* 건강 카트 디자인 전체 */}
//       <div
//         className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-[38px] rounded-xl px-6 py-4 border"
//         style={{
//           backgroundColor: current.bgColor,
//           borderColor: current.borderColor,
//         }}
//       >
//         {/* 좌측: svg + 설명 */}
//         <div className="flex items-start lg:items-center gap-4 lg:gap-[38px] flex-1">
//           {/* 건강 svg 부분 */}
//           <img
//             src={current.iconPath}
//             alt={`${status} 아이콘`}
//             className="w-[60px] h-[60px] lg:w-[77px] lg:h-[65px] ml-2 lg:ml-4"
//           />

//           {/* 세로선 : borderline -> borderColor로 사용 */}
//           <div
//             className="w-[3px] h-[75.5px]"
//             style={{ backgroundColor: current.borderColor }}
//           />

//           {/* 텍스트 부분: ~님의 건강은 ~~ */}
//           <p
//             className="font-pretendard font-semibold text-[16px] md:text-[18px] lg:text-[20px] leading-[140%]"
//             style={{ color: current.textColor }}
//           >
//             {current.message(nickname)}
//           </p>
//         </div>

//         {/* 마이 메디컬 리포트로 가는 링크 */}
//         <a
//           href="#"
//           className="text-sm md:text-base text-[#1D68FF] font-pretendard mt-auto self-end whitespace-nowrap hover:underline"
//         >
//           마이 메디컬 리포트로 알아보기 &gt;
//         </a>
//       </div>
//     </section>
//   );
// };

// export default MyConstantMedical;

import {
  healthStatusMap,
  type HealthStatus,
} from "../../constants/healthStatus";

interface Props {
  status: HealthStatus;
  nickname: string;
}

const MyConstantMedical: React.FC<Props> = ({ status, nickname }) => {
  const current = healthStatusMap[status];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-[1.5vw] py-[2vw] space-y-[1.5vw]">
      {/* 제목 */}
      <h2 className="font-pretendard font-medium text-[clamp(16px,1.25vw,24px)] text-[#121218] mt-[-2vw]">
        내 건강은 지금!
      </h2>

      {/* 카드 + 링크 한 줄 수평 정렬 */}
      <div className="flex justify-between items-center mt-[-0.8vw]">
        {/* 건강 카트부분 */}
        <div
          className="flex items-start lg:items-center gap-[clamp(12px,2vw,38px)] rounded-[clamp(8px,3vw,20px)] px-[clamp(16px,2vw,24px)] py-[clamp(12px,1.5vw,16px)] border w-[clamp(300px,50vw,960px)] h-[clamp(60px,6vw,100px)] mr-[3vw]"
          style={{
            backgroundColor: current.bgColor,
            borderColor: current.borderColor,
          }}
        >
          {/* svg 이미지와 + 설명 */}
          <div className="flex items-start lg:items-center gap-[clamp(12px,2vw,38px)] flex-1">
            {/* svg이미지 */}
            <img
              src={current.iconPath}
              alt={`${status} 아이콘`}
              className="w-[clamp(40px,4.5vw,77px)] h-[clamp(40px,4vw,65px)] ml-[clamp(4px,0.5vw,16px)]"
            />

            {/* 세로선 */}
            <div
              className="w-[0.1vw] h-[clamp(40px,4.3vw,75.5px)]"
              style={{ backgroundColor: current.borderColor }}
            />

            {/* 설명 텍스트 */}
            <p
              className="font-pretendard font-semibold text-[clamp(8px,1.2vw,20px)] leading-[140%]"
              style={{ color: current.textColor }}
            >
              {current.message(nickname)}
            </p>
          </div>
        </div>

        {/* 오른쪽 링크 */}
        <a
          href="#"
          className="text-[clamp(10px,0.9vw,16px)] text-[#1D68FF] font-pretendard whitespace-nowrap hover:underline ml-[clamp(5px,1vw,20px)] mt-[2.5vw] mr-[-3vw]"
        >
          마이 메디컬 리포트로 알아보기 &gt;
        </a>
      </div>
    </section>
  );
};

export default MyConstantMedical;
