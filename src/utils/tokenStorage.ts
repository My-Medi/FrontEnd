import { setSecureTokenCookie, deleteCookie, TOKEN_COOKIES, getCookie } from './cookies';

// 간단한 토큰 암호화 (실제 프로덕션에서는 더 강력한 암호화 사용 권장)
const encryptToken = (token: string): string => {
  // Base64 인코딩 (실제로는 더 강력한 암호화 사용)
  return btoa(token);
};

// 토큰 복호화
const decryptToken = (encryptedToken: string): string => {
  // Base64 디코딩
  return atob(encryptedToken);
};

// 토큰 저장 (보안 강화)
export const saveTokens = (accessToken: string, refreshToken: string, isKeepLogin: boolean = false) => {
  // 토큰 암호화 후 저장
  const encryptedAccessToken = encryptToken(accessToken);
  const encryptedRefreshToken = encryptToken(refreshToken);
  
  // 로그인 유지 여부에 따라 토큰 만료 기간 설정
  const accessTokenDays = isKeepLogin ? 30 : 1; // 로그인 유지 시 30일, 아니면 1일
  const refreshTokenDays = isKeepLogin ? 90 : 7; // 로그인 유지 시 90일, 아니면 7일
  
  setSecureTokenCookie(TOKEN_COOKIES.ACCESS_TOKEN, encryptedAccessToken, accessTokenDays);
  setSecureTokenCookie(TOKEN_COOKIES.REFRESH_TOKEN, encryptedRefreshToken, refreshTokenDays);
};

// 토큰 가져오기 (복호화)
export const getTokens = () => {
  const encryptedAccessToken = getCookie(TOKEN_COOKIES.ACCESS_TOKEN);
  const encryptedRefreshToken = getCookie(TOKEN_COOKIES.REFRESH_TOKEN);
  
  if (!encryptedAccessToken || !encryptedRefreshToken) {
    return { accessToken: null, refreshToken: null };
  }
  
  try {
    const accessToken = decryptToken(encryptedAccessToken);
    const refreshToken = decryptToken(encryptedRefreshToken);
    
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('토큰 복호화 실패:', error);
    // 복호화 실패 시 토큰 삭제
    clearTokens();
    return { accessToken: null, refreshToken: null };
  }
};

// 토큰 삭제 (로그아웃)
export const clearTokens = () => {
  deleteCookie(TOKEN_COOKIES.ACCESS_TOKEN);
  deleteCookie(TOKEN_COOKIES.REFRESH_TOKEN);
  
  // 전역 clearTokens 함수가 있으면 호출하여 상태 업데이트
  if ((window as any).clearTokens) {
    (window as any).clearTokens();
  }
}; 