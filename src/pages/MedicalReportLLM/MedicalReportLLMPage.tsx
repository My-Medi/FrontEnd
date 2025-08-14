import React, { useState } from 'react';
import MedicalReport from '../../components/MedicalReportLLM/MedicalReport';
import Header from '../../components/Common/MyMedicalReportHeader';
import { useMedicalReportLlmQuery } from '../../hooks/healthCheckup/useMedicalReportLlmQuery';
import LlmLoadingOverlay from '../../components/MedicalReportLLM/LlmLoadingOverlay';

const MedicalReportLLMPage: React.FC = () => {
  // 요구사항: round는 1로 고정
  const [rounds] = useState<number[]>([1]);
  const [selectedRound, setSelectedRound] = useState<number>(1);

  const { data, isLoading, isError } = useMedicalReportLlmQuery(1, true);

  const handleRoundChange = (round: number) => {
    setSelectedRound(round);
  };

  const handleAddRound = () => {};

  const handleFilterClick = () => {
    console.log('전체 회차 보기 클릭됨');
  };

  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto max-w-[1300px]'>
        <LlmLoadingOverlay isOpen={isLoading} />
        {/* 헤더 섹션 */}
        <Header
          nickname={data?.result?.nickname || ''}
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
        <MedicalReport
          username={data?.result?.nickname || ''}
          selectedRound={selectedRound}
          isLoading={!!isLoading}
          isError={!!isError}
          llmData={data?.result || undefined}
        />
      </div>
    </div>
  );
};

export default MedicalReportLLMPage;
