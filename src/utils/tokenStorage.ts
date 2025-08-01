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
export const saveTokens = (accessToken: string, refreshToken: string) => {
  // 토큰 암호화 후 저장
  const encryptedAccessToken = encryptToken(accessToken);
  const encryptedRefreshToken = encryptToken(refreshToken);
  
  setSecureTokenCookie(TOKEN_COOKIES.ACCESS_TOKEN, encryptedAccessToken, 1); // 1일 (짧은 만료시간)
  setSecureTokenCookie(TOKEN_COOKIES.REFRESH_TOKEN, encryptedRefreshToken, 7); // 7일
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
}; 