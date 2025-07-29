// import React from 'react';

// interface ReportProps {
//   nickname: string;
//   bmi: number;
//   waist: number;
//   /* 수축기 혈압 */
//   sp: number;
//   /* 이완기 혈압 */
//   dp: number;
//   /* 공복혈당 */
//   fastingBlood: number;
//   /* 혈청 크레아티닌 */
//   creatinine: number;
//   /* eGFR신사구체여과율 */
//   eGFR: number;
//   /* AST */
//   ast: number;
//   /* ALT */
//   alt: number;
//   /* 감마-GTP(Y-GTP) */
//   gtp: number;
//   /* 혈색소 */
//   hemoglobin: number;
//   /* 총 콜레스테롤 */
//   cholesterol: number;
//   /* HDL-콜레스테롤 */
//   hdl: number;
//   /* 중성지방 */
//   neutralFat: number;
//   /* LDL-콜레스테롤 */
//   ldl: number;
//   /* 요단백 */
//   urineProtein: string;
// }

// const getStatusIcon = (status: string) => {
//   return `/assets/health-constants/${status}-constant.svg`;
// };

// const ReportSummary: React.FC<ReportProps> = ({
//   nickname,
//   bmi,
//   waist,
//   sp,
//   dp,
//   fastingBlood,
//   creatinine,
//   eGFR,
//   ast,
//   alt,
//   gtp,
//   hemoglobin,
//   cholesterol,
//   hdl,
//   neutralFat,
//   ldl,
//   urineProtein,
// }) => {
//   return (
//     <div className='w-[817px] flex flex-col items-start font-[Pretendard]'>
//       {/* 제목 */}
//       <div className='flex items-center mb-[16px]'>
//         <div className='w-[14.25px] h-[14.25px] bg-[#1D68FF] rounded-[4.5px] mr-[16px]' />
//         <span className='text-[#121218] text-[16px] leading-[22.4px] tracking-[-0.48px] font-semibold'>
//           {nickname}님의 건강검진 리포트 요약
//         </span>
//         <img
//           src='/assets/health-constants/total-constant.svg'
//           alt='전체 기준'
//           className='ml-2 h-[18px]'
//         />
//       </div>

//       {/* 리포트 본문 */}
//       <div className='flex w-full'>
//         {/* 왼쪽 */}
//         <div className='flex flex-col pr-[18px] gap-[16px] w-1/2'>
//           {[
//             {
//               title: '비만/복부비만',
//               description: [`체질량 지수 : ${bmi} kg/m2`, `허리둘레 : ${waist} mm/HG`],
//               status: 'danger',
//             },
//             {
//               title: '고혈압',
//               description: [`수축기 혈압 : ${sp} mm/HG`, `이완기 혈압 : ${dp} mm/HG`],
//               status: 'interest',
//             },
//             {
//               title: '당뇨병',
//               description: [`공복혈당 : ${fastingBlood} mg/dL`],
//               status: 'danger',
//             },
//             {
//               title: '신장질환',
//               description: [
//                 `혈청 크레아티닌 : ${creatinine} mg/dL`,
//                 `eGFR : ${eGFR} ml/min/1.73m2`,
//               ],
//               status: 'normal',
//             },
//             {
//               title: '간장질환',
//               description: [
//                 `AST : ${ast} IU/L`,
//                 `ALT : ${alt} IU/L`,
//                 `감마-GTP(Y-GTP) : ${gtp} IU/L`,
//               ],
//               status: 'caution',
//             },
//           ].map((item, i) => (
//             <div key={i} className='flex gap-[8px]'>
//               <img
//                 src={getStatusIcon(item.status)}
//                 alt={item.status}
//                 className='w-[18px] h-[18px] mt-[9px]'
//               />
//               <div>
//                 <p className='text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-medium'>
//                   {item.title}
//                 </p>
//                 {item.description.map((line, j) => (
//                   <p
//                     key={j}
//                     className='text-[#121218] text-[14px] leading-[22px] tracking-[-0.42px] font-light'
//                   >
//                     {line}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* 세로 점선 */}
//         <div className='w-[1px] bg-[#DBE6FF]' />

//         {/* 오른쪽 */}
//         <div className='flex flex-col pl-[18px] gap-[16px] w-1/2'>
//           {[
//             {
//               title: '빈혈',
//               description: [`혈색소 : ${hemoglobin} g/dL`],
//               status: 'interest',
//             },
//             {
//               title: '이상지질혈증',
//               description: [
//                 `총콜레스테롤 : ${cholesterol} mg/dL`,
//                 `HDL-콜레스테롤 : ${hdl} mg/dL`,
//                 `중성지방 : ${neutralFat} mg/dL`,
//                 `LDL-콜레스테롤 : ${ldl} mg/dL`,
//               ],
//               status: 'danger',
//             },
//             {
//               title: '요단백',
//               description: [`${urineProtein}`],
//               status: 'normal',
//             },
//           ].map((item, i) => (
//             <div key={i} className='flex gap-[8px]'>
//               <img
//                 src={getStatusIcon(item.status)}
//                 alt={item.status}
//                 className='w-[18px] h-[18px] mt-[9px]'
//               />
//               <div className=''>
//                 <p className='text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-medium font-[Pretendard]'>
//                   {item.title}
//                 </p>
//                 {item.description.map((line, j) => (
//                   <p
//                     key={j}
//                     className='text-[#121218] text-[14px] leading-[22px] tracking-[-0.42px] font-light font-[Pretendard]'
//                   >
//                     {line}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportSummary;
import React from 'react';
import TotalConstant from '@/assets/health-constants/total-constant.svg';
import danger from '@/assets/health-constants/danger-constant.svg';
import caution from '@/assets/health-constants/caution-constant.svg';
import interest from '@/assets/health-constants/interest-constant.svg';
import normal from '@/assets/health-constants/normal-constant.svg';
import safe from '@/assets/health-constants/safe-constant.svg';
import DotCol from '@/assets/dotcol.svg';

interface ReportProps {
  nickname: string;
  bmi: number;
  waist: number;
  /* 수축기 혈압 */
  sp: number;
  /* 이완기 혈압 */
  dp: number;
  /* 공복혈당 */
  fastingBlood: number;
  /* 혈청 크레아티닌 */
  creatinine: number;
  /* eGFR신사구체여과율 */
  eGFR: number;
  /* AST */
  ast: number;
  /* ALT */
  alt: number;
  /* 감마-GTP(Y-GTP) */
  gtp: number;
  /* 혈색소 */
  hemoglobin: number;
  /* 총 콜레스테롤 */
  cholesterol: number;
  /* HDL-콜레스테롤 */
  hdl: number;
  /* 중성지방 */
  neutralFat: number;
  /* LDL-콜레스테롤 */
  ldl: number;
  /* 요단백 */
  urineProtein: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case '위험':
      return danger;
    case '주의':
      return caution;
    case '관심':
      return interest;
    case '정상':
      return normal;
    case '안심':
      return safe;
  }
};

const ReportSummary: React.FC<ReportProps> = ({
  nickname,
  bmi,
  waist,
  sp,
  dp,
  fastingBlood,
  creatinine,
  eGFR,
  ast,
  alt,
  gtp,
  hemoglobin,
  cholesterol,
  hdl,
  neutralFat,
  ldl,
  urineProtein,
}) => {
  return (
    <div className='w-[817px] font-[Pretendard]'>
      {/* 제목 */}
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center gap-4'>
          <div className='w-[14.25px] h-[14.25px] bg-[#1D68FF] rounded-[4.5px]' />
          <span className='text-[#121218] text-[16px] leading-[36px] font-medium tracking-[-0.48px]'>
            {nickname}님의 건강검진 리포트 요약
          </span>
        </div>
        <img src={TotalConstant} alt='전체 기준' className='w-auto h-[34px]' />
      </div>

      {/* 리포트 요약 부분 */}
      <div className='flex flex-row gap-[36px] pl-[32px]'>
        {/* 왼쪽 */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-start gap-2'>
            <img src={getStatusIcon('안심')} alt='안심' className='w-3 h-3 mt-3' />
            <div className='flex gap-6'>
              <p className='text-[#121218] text-[16px] leading-[36px] font-medium tracking-[-0.48px]'>
                비만/복부비만
              </p>
              <div className='flex flex-col mt-[8px] gap-1 text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                <p>체질량 지수 : {bmi} kg/m²</p>
                <p>허리둘레 : {waist} mm/HG</p>
              </div>
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <img src={getStatusIcon('정상')} alt='정상' className='w-3 h-3 mt-3' />
            <div className='flex gap-17'>
              <p className='text-[#121218] text-[16px] leading-[36px] font-medium tracking-[-0.48px]'>
                고혈압
              </p>
              <div className='flex flex-col mt-[10px] gap-1 text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                <p>수축기 혈압 : {sp} kg/m²</p>
                <p>이완기 혈압 : {dp} mm/HG</p>
              </div>
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <img src={getStatusIcon('주의')} alt='주의' className='w-3 h-3 mt-3' />
            <div className='flex gap-17'>
              <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                당뇨병
              </p>
              <p className='text-[14px] mt-[7.5px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                공복혈당 : {fastingBlood} mg/dL
              </p>
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <img src={getStatusIcon('안심')} alt='안심' className='w-3 h-3 mt-3' />
            <div className='flex gap-13'>
              <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                신장질환
              </p>
              <div className='text-[14px] gap-1 mt-[8px] flex-col font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                <p>혈청 크레아티닌 : {creatinine} mg/dL</p>
                <p>eGFR신사구체여과율 : {eGFR} ml/min/1.73m²</p>
              </div>
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <img src={getStatusIcon('정상')} alt='정상' className='w-3 h-3 mt-3' />
            <div className='flex gap-13'>
              <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                간장질환
              </p>
              <div className='text-[14px] gap-1 mt-[8px] flex-col font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                <p>AST : {ast} IU/L</p>
                <p>ALT : {alt} IU/L</p>
                <p>감마-GTP(Y-GTP) : {gtp} IU/L</p>
              </div>
            </div>
          </div>
        </div>

        {/* 세로 점선 */}
        <div className='max-h-[370px]'>
          <img src={DotCol} alt='dot-line' />
        </div>

        {/* 오른쪽 */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-start gap-2'>
            <img src={getStatusIcon('주의')} alt='주의' className='w-3 h-3 mt-3' />
            <div className='flex gap-22'>
              <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                빈혈
              </p>
              <p className='text-[14px] mt-[6px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                혈색소 : {hemoglobin} g/dL
              </p>
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <img src={getStatusIcon('정상')} alt='정상' className='w-[12px] h-[12px] mt-3' />
            <div className='flex gap-8'>
              <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                이상지질혈증
              </p>
              <div className='text-[14px] mt-[8px] flex-col gap-1 font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                <p>총콜레스테롤 : {cholesterol} mg/dL</p>
                <p>HDL-콜레스테롤 : {hdl} mg/dL</p>
                <p>중성지방 : {neutralFat} mg/dL</p>
                <p>LDL-콜레스테롤 : {ldl} mg/dL</p>
              </div>
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <img src={getStatusIcon('안심')} alt='안심' className='w-[12px] h-[12px] mt-3' />
            <div className='flex gap-18'>
              <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                요단백
              </p>
              <p className='text-[14px] mt-[7px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                {urineProtein}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
