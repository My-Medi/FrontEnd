import React, { useState } from 'react';
import Chart from '../components/MyMedicalReport/body/Chart';
import Header from '../components/Common/MyMedicalReportHeader';

const MyMedicalReport: React.FC = () => {
  const [rounds, setRounds] = useState<number[]>([1, 2]); // 회차 리스트
  const [selectedRound, setSelectedRound] = useState<number>(2); // 현재 선택된 회차

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
      <div className='flex justify-center mt-[30px]'>
        <Chart checkupDate='2024/06/27' nickname='하나' />
      </div>
    </div>
  );
};

export default MyMedicalReport;
