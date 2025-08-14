import React, { useState, useEffect } from 'react';
import MedicalReport from '../../components/MedicalReportLLM/MedicalReport';
import Header from '../../components/Common/MyMedicalReportHeader';
import { useMedicalReportLlmQuery } from '../../hooks/healthCheckup/useMedicalReportLlmQuery';
import LlmLoadingOverlay from '../../components/MedicalReportLLM/LlmLoadingOverlay';
import { getDefaultReport } from '../../apis/userApi/user';

interface UserInfo {
  nickname: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  reportCount: number;
}

const MedicalReportLLMPage: React.FC = () => {
  // 요구사항: round는 1로 고정
  const [rounds] = useState<number[]>([1]);
  const [selectedRound, setSelectedRound] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const { data, isLoading, isError } = useMedicalReportLlmQuery(1, true);

  // 초기 로드시 사용자 기본 정보 조회
  useEffect(() => {
    (async () => {
      try {
        const userRes = await getDefaultReport();
        const userData = userRes.result;
        setUserInfo(userData);
      } catch (e) {
        console.error('사용자 정보 조회 실패', e);
      }
    })();
  }, []);

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
          nickname={userInfo?.nickname || data?.result?.nickname || '사용자'}
          age={userInfo?.age || 0}
          height={userInfo?.height || 0}
          weight={userInfo?.weight || 0}
          checkupCount={userInfo?.reportCount || rounds.length}
          rounds={rounds}
          selectedRound={selectedRound}
          onRoundChange={handleRoundChange}
          onAddRound={handleAddRound}
          onFilterClick={handleFilterClick}
        />
        {/* 메디컬 리포트 콘텐츠 */}
        <MedicalReport
          username={userInfo?.nickname || data?.result?.nickname || '사용자'}
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
