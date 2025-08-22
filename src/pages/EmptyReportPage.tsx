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

import React, { useEffect, useState } from 'react';
import EmptyReport from '../components/MedicalReportLLM/EmptyReport';
//import EmptyReportHeader from '../components/MedicalReportLLM/EmptyReportHeader';
import Header from '../components/Common/MyMedicalReportHeader';
import { getDefaultReport } from '../apis/userApi/user';

const EmptyReportPage: React.FC = () => {
  const [rounds, setRounds] = useState<number[]>([]);
  const [selectedRound, setSelectedRound] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [reportCount, setReportCount] = useState<number>(0);

  const handleRoundChange = (round: number) => {
    setSelectedRound(round);
  };

  const handleAddRound = () => {
    const nextRound = rounds.length > 0 ? rounds[rounds.length - 1] + 1 : 1;
    setRounds((prev) => [...prev, nextRound]);
    setSelectedRound(nextRound);
  };

  const handleFilterClick = () => {
    // 전체 회차 보기 클릭 처리
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getDefaultReport();
        const r = (res as any)?.result;
        setNickname(r?.nickname || '');
        setAge(r?.age || 0);
        setHeight(r?.height || 0);
        setWeight(r?.weight || 0);
        setReportCount(r?.reportCount ?? 0);
        // empty 페이지이므로 회차는 0개, 선택회차 없음 유지
        setRounds([]);
        setSelectedRound(0);
      } catch (e) {
        setRounds([]);
        setSelectedRound(0);
      }
    })();
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      <div className='w-full mx-auto'>
        {/* 헤더 섹션 */}
        <Header
          nickname={nickname || '사용자'}
          age={age}
          height={height}
          weight={weight}
          checkupCount={reportCount}
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
