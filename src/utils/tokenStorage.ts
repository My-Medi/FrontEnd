import { setCookie, deleteCookie, TOKEN_COOKIES } from './cookies';

// 토큰 저장
export const saveTokens = (accessToken: string, refreshToken: string) => {
  setCookie(TOKEN_COOKIES.ACCESS_TOKEN, accessToken, 7); // 7일
  setCookie(TOKEN_COOKIES.REFRESH_TOKEN, refreshToken, 14); // 14일
};

// 토큰 삭제 (로그아웃)
export const clearTokens = () => {
  deleteCookie(TOKEN_COOKIES.ACCESS_TOKEN);
  deleteCookie(TOKEN_COOKIES.REFRESH_TOKEN);
}; 