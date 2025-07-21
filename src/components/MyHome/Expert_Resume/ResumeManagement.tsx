import React, { useState } from 'react';
import ExpertiseSection from './components/ExpertiseSection';
import CompanySection from './components/CompanySection';
import CertificateSection from './components/CertificateSection';
import SelfIntroductionSection from './components/SelfIntroductionSection';
import RepresentativeSentenceSection from './components/RepresentativeSentenceSection';
import ActionButtons from './components/ActionButtons';
import CareerSection from './components/CareerSection';

interface ResumeManagementProps {}

const ResumeManagement: React.FC<ResumeManagementProps> = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>(['영양사']);
  const [companyName, setCompanyName] = useState('');
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [representativeSentence, setRepresentativeSentence] = useState('ex) 매일 1%의 건강을 쌓아가요.');

  const handleFieldToggle = (field: string) => {
    // 중복 체크 방지: 항상 단일 선택만 가능
    setSelectedFields(prev => 
      prev.includes(field) 
        ? [] // 이미 선택된 필드라면 선택 해제
        : [field] // 새로운 필드 선택 시 기존 선택을 모두 해제하고 새로 선택
    );
  };

  return (
    <div className="w-full p-[50px_202px]">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className="text-[20px] font-semibold text-[#121218] mb-[14.4px]">이력서 관리</h1>
        <p className="text-[14px] font-medium text-[#121218] pb-[37.8px]">튼튼핏 / 이수령</p>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="space-y-[43.2px]">
        <ExpertiseSection 
          selectedFields={selectedFields}
          onFieldToggle={handleFieldToggle}
        />
        
        <CompanySection 
          companyName={companyName}
          onCompanyNameChange={setCompanyName}
        />
        
        <CertificateSection />
        
        <CareerSection />
        
        <SelfIntroductionSection 
          selfIntroduction={selfIntroduction}
          onSelfIntroductionChange={setSelfIntroduction}
        />
        
        <RepresentativeSentenceSection 
          representativeSentence={representativeSentence}
          onRepresentativeSentenceChange={setRepresentativeSentence}
        />
      </div>

      <ActionButtons />
    </div>
  );
};

export default ResumeManagement; 