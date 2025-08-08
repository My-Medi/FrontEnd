import React from 'react';
import EmptyReport from '../components/MedicalReportLLM/EmptyReport';
import EmptyReportHeader from '../components/MedicalReportLLM/EmptyReportHeader';

const EmptyReportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto">
        {/* 헤더 섹션 */}
        <EmptyReportHeader 
          currentTab="2회차"
        />
        
        {/* 메디컬 리포트 콘텐츠 */}
        <EmptyReport />  
      </div>
    </div>
  );
};

export default EmptyReportPage; 