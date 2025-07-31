import React, { useState } from 'react';
import ExpertiseSection from './ExpertiseSection';
import CompanySection from './CompanySection';
import CertificateSection from './CertificateSection';
import SelfIntroductionSection from './SelfIntroductionSection';
import RepresentativeSentenceSection from './RepresentativeSentenceSection';
import ActionButtons from './ActionButtons';
import CareerSection from './CareerSection';

interface ResumeManagementProps {}

const ResumeManagement: React.FC<ResumeManagementProps> = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>(['영양사']);
  const [companyName, setCompanyName] = useState('');
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [representativeSentence, setRepresentativeSentence] = useState('');

  const handleFieldToggle = (field: string) => {
    // 중복 체크 방지: 항상 단일 선택만 가능
    setSelectedFields(prev => 
      prev.includes(field) 
        ? [] // 이미 선택된 필드라면 선택 해제
        : [field] // 새로운 필드 선택 시 기존 선택을 모두 해제하고 새로 선택
    );
  };

  return (
    <div className="w-full p-4 xl:p-12 xl:px-[12.6rem] md:p-8 sm:p-6">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className="text-lg xl:text-xl font-semibold text-[#121218] mb-4 xl:mb-[0.9rem]">이력서 관리</h1>
        <p className="text-sm xl:text-sm font-medium text-[#121218] pb-10 xl:pb-[2.4rem]">
          <span className="text-[#1D68FF]">튼튼핏</span> / 이수령
        </p>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="space-y-10 xl:space-y-[2.7rem] md:space-y-8 sm:space-y-6">
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