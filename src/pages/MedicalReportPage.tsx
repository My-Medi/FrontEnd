import React, { useEffect, useState } from 'react';
import Chart from '../components/MyMedicalReport/body/Chart';
import Header from '../components/Common/MyMedicalReportHeader';
import { useNavigate } from 'react-router-dom';
import { getHealthReportByRound, getHealthReportCount } from '../apis/healthCheckupApi/healthCheckup';
import { getDefaultReport } from '../apis/userApi/user';

interface UserInfo {
  nickname: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  reportCount: number;
}

const MyMedicalReport: React.FC = () => {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState<number[]>([]); // 서버에서 불러온 회차 리스트
  const [selectedRound, setSelectedRound] = useState<number>(1); // 현재 선택된 회차
  const [checkupDate, setCheckupDate] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // 초기 로드시 사용자 기본 정보와 서버의 총 회차 수를 불러와 UI 세팅
  useEffect(() => {
    (async () => {
      try {
        // 사용자 기본 정보 조회
        const userRes = await getDefaultReport();
        const userData = userRes.result;
        setUserInfo(userData);

        // 회차 수 조회
        const res = await getHealthReportCount();
        const count = res.result ?? 0;
        if (count <= 0) {
          navigate('/empty-report');
          return;
        }
        const safeCount = Math.max(1, count);
        const arr = Array.from({ length: safeCount }, (_, i) => i + 1);
        setRounds(arr);
        setSelectedRound(safeCount);
      } catch (e) {
        console.error('사용자 정보 또는 회차 수 조회 실패', e);
        setRounds([1]);
        setSelectedRound(1);
      }
    })();
  }, []);

  // 선택된 회차 변경 시 해당 회차 데이터 조회하여 화면에 반영
  useEffect(() => {
    (async () => {
      if (!selectedRound) return;
      try {
        const res = await getHealthReportByRound(selectedRound);
        const raw = res.result?.checkupDate ?? '';
        // YYYY-MM-DD -> YYYY/MM/DD 표기로 변경 (replaceAll 미지원 환경 대비)
        setCheckupDate(raw.split('-').join('/'));
      } catch (e) {
        console.error('회차별 리포트 조회 실패', e);
        setCheckupDate('');
      }
    })();
  }, [selectedRound]);

  const handleRoundChange = (round: number) => {
    setSelectedRound(round);
  };

  const handleAddRound = () => {
    const currentMax = rounds.length > 0 ? Math.max(...rounds) : 0;
    const nextRound = currentMax + 1;
    // 새 회차 입력 화면으로 이동 (저장 완료 후 목록/회차 갱신됨)
    navigate(`/health-result-input?round=${nextRound}`);
  };

  const handleFilterClick = () => {
    console.log('전체 회차 보기 클릭됨');
  };

  return (
    <div className='min-h-screen bg-white'>
      <Header
        nickname={userInfo?.nickname || '사용자'}
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
      <div className='flex justify-center mt-[30px]'>
        <Chart checkupDate={checkupDate || '-'} nickname={userInfo?.nickname || '사용자'} />
      </div>
    </div>
  );
};

export default MyMedicalReport;
