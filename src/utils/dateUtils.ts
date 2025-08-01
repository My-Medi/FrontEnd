/**
 * 생년월일로부터 만 나이를 계산합니다.
 * @param birthDate - 생년월일 (YYYY-MM-DD 형식)
 * @returns 만 나이
 */
export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  // 생일이 지나지 않았으면 나이에서 1을 뺍니다
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * 날짜를 한국어 형식으로 포맷합니다.
 * @param dateString - 날짜 문자열
 * @returns 포맷된 날짜 문자열
 */
export const formatKoreanDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}; 