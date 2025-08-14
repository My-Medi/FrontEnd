import React, { useState, useEffect, useCallback } from 'react';
import { useExpertResumeQuery } from '../../../hooks/experts/queries/useExpertResumeQuery';
import { useExpertResumeUpdateMutation } from '../../../hooks/experts/mutations/useExpertResumeUpdateMutation';
import { transformResumeData, transformFormDataToUpdateRequest } from '../../../utils/resumeUtils';
import type { ResumeFormData, CareerFormItem, CertificateFormItem } from '../../../types/expert/resume';
import ExpertiseSection from './ExpertiseSection';
import CompanySection from './CompanySection';
import CertificateSection from './CertificateSection';
import SelfIntroductionSection from './SelfIntroductionSection';
import RepresentativeSentenceSection from './RepresentativeSentenceSection';
import ActionButtons from './ActionButtons';
import ResumeConfirmModal from './ResumeConfirmModal.tsx';
import CareerSection from './CareerSection';

interface ResumeManagementProps {}

const ResumeManagement: React.FC<ResumeManagementProps> = () => {
  // API 데이터 조회
  const { data: resumeData, isLoading, error } = useExpertResumeQuery();
  
  // 수정 뮤테이션
  const updateResumeMutation = useExpertResumeUpdateMutation({
    onSuccess: () => {
    },
    onError: () => {
      alert('이력서 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
  
  // 폼 상태
  const [formData, setFormData] = useState<ResumeFormData>({
    specialty: ['영양사'],
    companyName: '',
    career: [],
    certificates: [],
    selfIntroduction: '',
    representativeSentence: '',
  });

  // 새로 업로드된 이미지들
  const [newLicenseImages, setNewLicenseImages] = useState<Array<{ imageUrl: string; imageTitle: string }>>([]);
  
  // 기존 이미지들 (삭제 가능)
  const [existingLicenseImages, setExistingLicenseImages] = useState<Array<{ licenseImageId: number; imageUrl: string; imageTitle: string }>>([]);

  // API 데이터가 로드되면 폼 데이터 초기화
  useEffect(() => {
    if (resumeData && typeof resumeData === 'object') {
      const transformedData = transformResumeData(resumeData as any);
      setFormData(transformedData);
      setExistingLicenseImages(resumeData.licenseImages || []);
    }
  }, [resumeData]);

  const handleFieldToggle = useCallback((field: string) => {
    // 중복 체크 방지: 항상 단일 선택만 가능
    setFormData(prev => ({
      ...prev,
      specialty: prev.specialty.includes(field) 
        ? [] // 이미 선택된 필드라면 선택 해제
        : [field] // 새로운 필드 선택 시 기존 선택을 모두 해제하고 새로 선택
    }));
  }, []);

  const handleCompanyNameChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, companyName: value }));
  }, []);

  const handleCertificatesChange = useCallback((certificates: CertificateFormItem[]) => {
    setFormData(prev => ({ ...prev, certificates }));
  }, []);

  const handleNewImagesChange = useCallback((images: Array<{ imageUrl: string; imageTitle: string }>) => {
    setNewLicenseImages(images);
  }, []);

  const handleExistingFilesChange = useCallback((files: Array<{ licenseImageId: number; imageUrl: string; imageTitle: string }>) => {
    setExistingLicenseImages(files);
  }, []);

  const handleCareerChange = useCallback((career: CareerFormItem[]) => {
    setFormData(prev => ({ ...prev, career }));
  }, []);

  const handleSelfIntroductionChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, selfIntroduction: value }));
  }, []);

  const handleRepresentativeSentenceChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, representativeSentence: value }));
  }, []);

  // 이력서 수정 핸들러
  const handleResumeUpdate = useCallback(() => {
    setIsConfirmOpen(true);
  }, []);

  const handleConfirmSave = useCallback(() => {
    setIsConfirmOpen(false);
    if (!resumeData) {
      alert('이력서 데이터를 불러올 수 없습니다.');
      return;
    }

    // 기존 파일들과 새로 업로드된 파일들을 합침
    const allLicenseImages = [
      ...existingLicenseImages,
      ...newLicenseImages
    ];

    const updateRequest = transformFormDataToUpdateRequest(formData, allLicenseImages);
    
    updateResumeMutation.mutate(updateRequest);
  }, [formData, resumeData, newLicenseImages, existingLicenseImages, updateResumeMutation]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="w-full p-4 xl:p-12 xl:px-[12.6rem] md:p-8 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">이력서 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="w-full p-4 xl:p-12 xl:px-[12.6rem] md:p-8 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">이력서 정보를 불러오는데 실패했습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 xl:p-12 xl:px-[12.6rem] md:p-8 sm:p-6">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className="text-lg xl:text-xl font-semibold text-[#121218] mb-4 xl:mb-[0.9rem]">이력서 관리</h1>
        <p className="text-sm xl:text-sm font-medium text-[#121218] pb-10 xl:pb-[2.4rem]">
          <span className="text-[#1D68FF]">{(resumeData as any)?.nickname || '닉네임'}</span> / {(resumeData as any)?.name || '이름'}
        </p>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="space-y-10 xl:space-y-[2.7rem] md:space-y-8 sm:space-y-6">
        <ExpertiseSection 
          selectedFields={formData.specialty}
          onFieldToggle={handleFieldToggle}
        />
        
        <CompanySection 
          companyName={formData.companyName}
          onCompanyNameChange={handleCompanyNameChange}
        />
        
        <CertificateSection 
          certificates={formData.certificates}
          onCertificatesChange={handleCertificatesChange}
          existingFiles={existingLicenseImages}
          onNewImagesChange={handleNewImagesChange}
          onExistingFilesChange={handleExistingFilesChange}
        />
        
        <CareerSection 
          career={formData.career}
          onCareerChange={handleCareerChange}
        />
        
        <SelfIntroductionSection 
          selfIntroduction={formData.selfIntroduction}
          onSelfIntroductionChange={handleSelfIntroductionChange}
        />
        
        <RepresentativeSentenceSection 
          representativeSentence={formData.representativeSentence}
          onRepresentativeSentenceChange={handleRepresentativeSentenceChange}
        />
      </div>

      <ActionButtons onUpdate={handleResumeUpdate} isLoading={updateResumeMutation.isPending} />
      <ResumeConfirmModal
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmSave}
      />
    </div>
  );
};

export default ResumeManagement; 