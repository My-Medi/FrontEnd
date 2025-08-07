/**
 * 전화번호를 하이픈으로 포맷팅하는 함수
 * @param phoneNumber - 포맷팅할 전화번호 (예: "01062751233")
 * @returns 포맷팅된 전화번호 (예: "010-6275-1233")
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return '';
  
  // 숫자만 추출
  const numbers = phoneNumber.replace(/\D/g, '');
  
  // 길이에 따라 포맷팅
  if (numbers.length === 11) {
    // 010-1234-5678 형식
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  } else if (numbers.length === 10) {
    // 010-123-4567 형식
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  } else if (numbers.length === 9) {
    // 010-12-3456 형식
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`;
  }
  
  // 기본값: 원본 반환
  return phoneNumber;
};
