import React from 'react';
import ChartClip from '/src/assets/MyMedicalReport/chart-clip.svg';
import ChartSideClip from '/src/assets/MyMedicalReport/chart-2-clip.svg';
import SafeFace from '/src/assets/health-icons/safe-face.svg';
import ExpertPatientCardList from './ExpertPatientCardList';
import ExpertGage from './ExpertGage';
import { useExpertUserReportQuery } from '../../hooks/expert/report/useExpertUserReportQuery';
import { useExpertUserReportResultQuery } from '../../hooks/expert/report/useExpertUserReportResultQuery';

interface ExpertChartProps {
  userId: number;
  round: number;
  nickname: string;
}

const ExpertChart: React.FC<ExpertChartProps> = ({ userId, round, nickname }) => {
  // API 데이터 가져오기
  const {
    data: reportData,
    isLoading: isReportLoading,
    error: reportError,
  } = useExpertUserReportQuery(userId, round);
  const { isLoading: isResultLoading, error: resultError } = useExpertUserReportResultQuery(
    userId,
    round,
  );

  // API 데이터가 있으면 사용, 없으면 기본값 사용
  const displayNickname = nickname || '사용자';

  if (isReportLoading || isResultLoading) {
    return <div>로딩 중...</div>;
  }

  if (reportError || resultError) {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  const checkupDate = reportData?.checkDate || '';

  return (
    <div className='flex flex-col'>
      <div className='w-[1301px] max-h-[2600px] flex-shrink-0 rounded-[20px] border-[2px] border-[#DBE6FF] bg-[linear-gradient(157deg,_rgba(161,189,255,0.30)_-0.5%,_rgba(219,230,255,0.30)_85.34%)] flex flex-col items-center pt-[46px] relative'>
        {/* 회색 클립 이미지 그룹 */}
        <div className='relative w-full flex justify-center items-start mb-[-32px] z-10'>
          {/* 가운데 클립 */}
          <img src={ChartClip} alt='center-clip' width={549} height={64} className='z-0' />
        </div>

        {/* 내부 흰색 박스 */}
        <div className='w-[1237px] max-h-[2600px] mt-[10px] mb-[46px] flex-shrink-0 rounded-[20px] bg-white shadow-[0_2px_4px_rgba(119,119,119,0.25)] px-[70px] pt-[60px] pb-[40px] relative z-20'>
          {/* 왼쪽 작은 클립 */}
          <img
            src={ChartSideClip}
            alt='left-clip'
            width={12}
            height={36}
            className='absolute left-[calc(50%-245px)] top-[-14px] z-10'
          />
          {/* 오른쪽 작은 클립 */}
          <img
            src={ChartSideClip}
            alt='right-clip'
            width={12}
            height={36}
            className='absolute right-[calc(50%-245px)] top-[-14px] z-10'
          />
          {/* 상단 검사일 + 인사말 */}
          <div className='mb-10 flex flex-col items-center'>
            <div className='text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#121218] flex items-center justify-center gap-[8px]'>
              <div className='flex items-center gap-[16px] ml-[-280px] mr-[100px]'>
                <div className='text-[#25282B] text-[20px] font-medium tracking-[-0.6px]'>
                  검진일
                </div>
                <div className='text-[#25282B] text-[20px] font-medium tracking-[-0.6px]'>
                  {checkupDate}
                </div>
              </div>
              안녕하세요! <span className='text-[#1D68FF]'>{displayNickname}</span>님의
              메디컬리포트입니다.
              <img
                src={SafeFace}
                alt='safe-face'
                width={24}
                height={19.5}
                className='object-contain'
              />
            </div>
            <div className='flex w-[556px] h-[556px] mt-[50px] mb-[100px]'>
              {/*원형 그래프*/}
              <ExpertGage userId={userId} round={round} nickname={displayNickname} />
            </div>

            <ExpertPatientCardList userId={userId} round={round} nickname={nickname} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertChart;
