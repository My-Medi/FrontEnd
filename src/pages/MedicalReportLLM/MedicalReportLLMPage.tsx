import React, { useState } from 'react';
import ReportHeader from '../../components/MedicalReportLLM/ReportHeader';
import MedicalReport from '../../components/MedicalReportLLM/MedicalReport';

const MedicalReportLLMPage: React.FC = () => {
  const [rounds, setRounds] = useState(['1회차', '2회차']);
  const [currentTab, setCurrentTab] = useState('2회차');

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const handleAddNewRound = () => {
    // 새로운 회차 추가 로직
    const nextRoundNumber = rounds.length + 1;
    const nextRound = `${nextRoundNumber}회차`;
    
    setRounds(prev => [...prev, nextRound]);
    setCurrentTab(nextRound);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-[1300px]">
        {/* 헤더 섹션 */}
        <ReportHeader 
          currentTab={currentTab} 
          onTabChange={handleTabChange}
          onAddNewRound={handleAddNewRound}
          rounds={rounds}
        />
        
        {/* 메디컬 리포트 콘텐츠 */}
        <MedicalReport 
          username="홍길동"
          currentRound={currentTab}
        />
      </div>
    </div>
  );
};

export default MedicalReportLLMPage; 