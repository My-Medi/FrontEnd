import type { ExpertResumeResponse, ResumeFormData, CareerFormItem, CertificateFormItem } from '../types/expert/resume';
import type { ResumeUpdateRequest } from '../apis/expertApi/resume';
import { getSpecialtyKoreanName, getSpecialtyFromKorean } from '../types/expert/common';

/**
 * API 응답을 이력서 폼 데이터로 변환
 */
export const transformResumeData = (apiResponse: ExpertResumeResponse): ResumeFormData => {
  // 전문분야 변환 (API는 단일 값, 컴포넌트는 배열)
  const specialtyKorean = getSpecialtyKoreanName(apiResponse.specialty);
  
  // 경력사항 변환
  const career: CareerFormItem[] = apiResponse.careers.map(career => ({
    company: career.companyName,
    start: formatDateForInput(career.startDate),
    end: formatDateForInput(career.endDate),
    role: career.jobTitle,
  }));

  // 자격증 변환
  const certificates: CertificateFormItem[] = apiResponse.licenses.map(license => ({
    certificateName: license.licenseName,
    issueDate: formatDateForInput(license.licenseDate),
    issuingOrganization: license.licenseDescription,
  }));

  return {
    specialty: [specialtyKorean],
    companyName: apiResponse.organizationName,
    career,
    certificates,
    selfIntroduction: apiResponse.introduction,
    representativeSentence: apiResponse.introSentence,
  };
};

/**
 * 이력서 폼 데이터를 API 요청 형태로 변환
 */
export const transformFormDataToApi = (formData: ResumeFormData): Partial<ExpertResumeResponse> => {
  // 전문분야를 API 형태로 변환 (첫 번째 선택된 전문분야 사용)
  const specialty = formData.specialty.length > 0 ? formData.specialty[0] : 'NUTRITIONIST';
  
  // 경력사항 변환
  const careers = formData.career.map((career, index) => ({
    id: index + 1, // 임시 ID
    companyName: career.company,
    jobTitle: career.role,
    startDate: formatDateForApi(career.start),
    endDate: formatDateForApi(career.end),
  }));

  // 자격증 변환
  const licenses = formData.certificates.map((cert, index) => ({
    id: index + 1, // 임시 ID
    licenseName: cert.certificateName,
    licenseDate: formatDateForApi(cert.issueDate),
    licenseDescription: cert.issuingOrganization,
  }));

  return {
    specialty: specialty as any, // 타입 변환
    organizationName: formData.companyName,
    introduction: formData.selfIntroduction,
    introSentence: formData.representativeSentence,
    careers,
    licenses,
  };
};

/**
 * 이력서 폼 데이터를 수정 API 요청 형태로 변환
 */
export const transformFormDataToUpdateRequest = (
  formData: ResumeFormData, 
  licenseImages: Array<{ imageUrl: string; imageTitle: string }> = []
): ResumeUpdateRequest => {
  // 전문분야를 API 형태로 변환 (첫 번째 선택된 전문분야 사용)
  const koreanSpecialty = formData.specialty.length > 0 ? formData.specialty[0] : '영양사';
  const specialty = getSpecialtyFromKorean(koreanSpecialty) || 'NUTRITIONIST';
  
  // 경력사항 변환
  const careers = formData.career.map((career) => ({
    companyName: career.company,
    jobTitle: career.role,
    startDate: formatDateForApi(career.start),
    endDate: formatDateForApi(career.end),
  }));

  // 자격증 변환
  const licenses = formData.certificates.map((cert) => ({
    licenseName: cert.certificateName,
    licenseDate: formatDateForApi(cert.issueDate),
    licenseDescription: cert.issuingOrganization,
  }));

  return {
    specialty,
    organizationName: formData.companyName,
    introduction: formData.selfIntroduction,
    introSentences: formData.representativeSentence,
    careers,
    licenses,
    licenseImages,
  };
};

/**
 * 날짜를 입력 필드용 형식으로 변환 (YYYY.MM.DD)
 */
const formatDateForInput = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}.${month}.${day}`;
};

/**
 * 날짜를 API 형식으로 변환 (YYYY-MM-DD)
 */
const formatDateForApi = (dateString: string): string => {
  if (!dateString) return '';
  
  // YYYY.MM.DD 형식을 YYYY-MM-DD로 변환
  const formatted = dateString.replace(/\./g, '-');
  
  // 유효성 검사
  const date = new Date(formatted);
  if (isNaN(date.getTime())) return '';
  
  return formatted;
};
