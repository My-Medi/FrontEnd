// 전문가 이력서 API 응답 타입
export interface ExpertResumeResponse {
  name: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  nickname: string;
  phoneNumber: string;
  profileImgUrl: string;
  role: 'EXPERT';
  specialty: 'NUTRITIONIST' | 'HEALTH_MANAGER' | 'WELLNESS_COACH' | 'EXERCISE_THERAPIST' | 'ETC';
  organizationName: string;
  introduction: string;
  introSentence: string;
  careers: CareerResponse[];
  licenseImages: LicenseImageResponse[];
  licenses: LicenseResponse[];
}

export interface CareerResponse {
  id: number;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
}

export interface LicenseImageResponse {
  licenseImageId: number;
  imageUrl: string;
  imageTitle: string;
}

export interface LicenseResponse {
  id: number;
  licenseName: string;
  licenseDate: string;
  licenseDescription: string;
}

// 컴포넌트에서 사용할 변환된 데이터 타입
export interface ResumeFormData {
  specialty: string[];
  companyName: string;
  career: CareerFormItem[];
  certificates: CertificateFormItem[];
  selfIntroduction: string;
  representativeSentence: string;
}

export interface CareerFormItem {
  company: string;
  start: string;
  end: string;
  role: string;
}

export interface CertificateFormItem {
  certificateName: string;
  issueDate: string;
  issuingOrganization: string;
}
