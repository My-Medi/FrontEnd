// 전문가 전문분야 타입
export type ExpertSpecialty =
  | 'NUTRITIONIST'
  | 'HEALTH_MANAGER'
  | 'WELLNESS_COACH'
  | 'EXERCISE_THERAPIST'
  | 'ETC';

// 전문분야 매핑 타입
export interface SpecialtyMapping {
  specialty: ExpertSpecialty;
  key: string;
}

// 전문분야 한국어 매핑 함수
export const getSpecialtyKoreanName = (specialty: ExpertSpecialty): string => {
  const specialtyMap: Record<ExpertSpecialty, string> = {
    NUTRITIONIST: '영양사',
    HEALTH_MANAGER: '건강관리사',
    WELLNESS_COACH: '웰니스 코치',
    EXERCISE_THERAPIST: '운동처방사',
    ETC: '기타',
  };

  return specialtyMap[specialty] || '기타';
};

// 한국어를 영어 전문분야로 변환하는 함수
export const getSpecialtyFromKorean = (koreanName: string): ExpertSpecialty | undefined => {
  const koreanToEnglishMap: Record<string, ExpertSpecialty> = {
    영양사: 'NUTRITIONIST',
    건강관리사: 'HEALTH_MANAGER',
    '웰니스 코치': 'WELLNESS_COACH',
    운동처방사: 'EXERCISE_THERAPIST',
    기타: 'ETC',
  };

  return koreanToEnglishMap[koreanName];
};

// 전문분야를 API key로 변환하는 함수
export const getSpecialtyKey = (specialty: ExpertSpecialty): string => {
  const specialtyKeyMap: Record<ExpertSpecialty, string> = {
    NUTRITIONIST: 'nutritionist',
    HEALTH_MANAGER: 'manager',
    WELLNESS_COACH: 'coach',
    EXERCISE_THERAPIST: 'therapist',
    ETC: 'etc',
  };

  return specialtyKeyMap[specialty];
};

// 한국어를 API key로 변환하는 함수
export const getSpecialtyKeyFromKorean = (koreanName: string): string | undefined => {
  const specialty = getSpecialtyFromKorean(koreanName);
  return specialty ? getSpecialtyKey(specialty) : undefined;
};
