import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ExpertChart from '../../components/Expert/ExpertChart';

const ExpertReportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get('userId') || '0');
  const round = parseInt(searchParams.get('round') || '1');
  const nickname = searchParams.get('nickname') || '';

  if (!userId) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 py-8'>
      <ExpertChart userId={userId} round={round} nickname={nickname} />
    </div>
  );
};

export default ExpertReportPage;
