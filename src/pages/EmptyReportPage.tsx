// import React, { useState } from 'react';
// import EmptyReport from '../components/MedicalReportLLM/EmptyReport';
// import EmptyReportHeader from '../components/MedicalReportLLM/EmptyReportHeader';
// import Header from '../components/Common/MyMedicalReportHeader';

// const EmptyReportPage: React.FC = () => {
//   const [rounds, setRounds] = useState<number[]>([1, 2]); // 회차 리스트
//   const [selectedRound, setSelectedRound] = useState<number>(); // 현재 선택된 회차

//   const handleRoundChange = (round: number) => {
//     setSelectedRound(round);
//   };

//   const handleAddRound = () => {
//     const nextRound = rounds.length > 0 ? rounds[rounds.length - 1] + 1 : 1;
//     setRounds((prev) => [...prev, nextRound]);
//     setSelectedRound(nextRound);
//   };

//   const handleFilterClick = () => {
//     console.log('전체 회차 보기 클릭됨');
//   };
//   return (
//     <div className='min-h-screen bg-white'>
//       <div className='w-full mx-auto'>
//         {/* 헤더 섹션 */}
//         {/* <EmptyReportHeader
//           currentTab="2회차"
//         /> */}
//         <Header
//           nickname='하나'
//           age={23}
//           height={168}
//           weight={52}
//           checkupCount={rounds.length}
//           rounds={rounds}
//           selectedRound={selectedRound}
//           onRoundChange={handleRoundChange}
//           onAddRound={handleAddRound}
//           onFilterClick={handleFilterClick}
//         />

//         {/* 메디컬 리포트 콘텐츠 */}
//         <EmptyReport />
//       </div>
//     </div>
//   );
// };

// export default EmptyReportPage;

import React, { useState } from 'react';
import EmptyReport from '../components/MedicalReportLLM/EmptyReport';
//import EmptyReportHeader from '../components/MedicalReportLLM/EmptyReportHeader';
import Header from '../components/Common/MyMedicalReportHeader';

const EmptyReportPage: React.FC = () => {
  const [rounds, setRounds] = useState<number[]>([]); // 회차 리스트 - 빈 배열로 초기화
  const [selectedRound, setSelectedRound] = useState<number>(0); // 현재 선택된 회차

  const handleRoundChange = (round: number) => {
    setSelectedRound(round);
  };

  const handleAddRound = () => {
    const nextRound = rounds.length > 0 ? rounds[rounds.length - 1] + 1 : 1;
    setRounds((prev) => [...prev, nextRound]);
    setSelectedRound(nextRound);
  };

  const handleFilterClick = () => {
    console.log('전체 회차 보기 클릭됨');
  };

  return (
    <div className='min-h-screen bg-white'>
      <div className='w-full mx-auto'>
        {/* 헤더 섹션 */}
        <Header
          nickname='하나'
          age={23}
          height={168}
          weight={52}
          checkupCount={rounds.length}
          rounds={rounds}
          selectedRound={selectedRound}
          onRoundChange={handleRoundChange}
          onAddRound={handleAddRound}
          onFilterClick={handleFilterClick}
        />

        {/* 메디컬 리포트 콘텐츠 */}
        <EmptyReport />
      </div>
    </div>
  );
};

export default EmptyReportPage;
