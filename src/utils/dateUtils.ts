/**
 * 생년월일로부터 만 나이를 계산합니다.
 * @param birthDate - 생년월일 (YYYY-MM-DD 형식 또는 YYMMDD 형식)
 * @returns 만 나이
 */
export const calculateAge = (birthDate: string): number => {
  let formattedBirthDate = birthDate;
  
  // YYMMDD 형식인 경우 YYYY-MM-DD 형식으로 변환
  if (birthDate.length === 6 && /^\d{6}$/.test(birthDate)) {
    const year = birthDate.substring(0, 2);
    const month = birthDate.substring(2, 4);
    const day = birthDate.substring(4, 6);
    
    // 연도 처리: 50 이상이면 19xx, 미만이면 20xx
    const fullYear = parseInt(year) > 50 ? `19${year}` : `20${year}`;
    formattedBirthDate = `${fullYear}-${month}-${day}`;
  }
  
  const today = new Date();
  const birth = new Date(formattedBirthDate);
  
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