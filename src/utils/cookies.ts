// 쿠키 설정 (보안 강화)
export const setCookie = (name: string, value: string, days: number = 7, options: {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
} = {}) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  // 기본 보안 설정
  const isProduction = import.meta.env.PROD;
  const isHttps = window.location.protocol === 'https:';
  
  let cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  
  // SameSite 설정 (기본값: Strict)
  const sameSite = options.sameSite || 'Strict';
  cookieString += `;SameSite=${sameSite}`;
  
  // Secure 플래그 (프로덕션이거나 HTTPS에서만)
  if (options.secure !== false && (isProduction || isHttps)) {
    cookieString += ';Secure';
  }
  
  // HttpOnly 플래그 (서버에서만 설정 가능하므로 클라이언트에서는 제한적)
  // 클라이언트 사이드에서는 HttpOnly를 직접 설정할 수 없음
  // 서버에서 설정하는 것을 권장
  
  document.cookie = cookieString;
};

// 보안 강화된 토큰 쿠키 설정
export const setSecureTokenCookie = (name: string, value: string, days: number = 7) => {
  const isProduction = import.meta.env.PROD;
  const isHttps = window.location.protocol === 'https:';
  
  setCookie(name, value, days, {
    secure: isProduction || isHttps, // 프로덕션이거나 HTTPS에서만 Secure
    sameSite: 'Strict' // CSRF 공격 방지
  });
};

// 쿠키 가져오기
export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// 쿠키 삭제 (보안 강화)
export const deleteCookie = (name: string) => {
  const isProduction = import.meta.env.PROD;
  const isHttps = window.location.protocol === 'https:';
  
  let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`;
  
  if (isProduction || isHttps) {
    cookieString += ';Secure';
  }
  
  document.cookie = cookieString;
};

// 토큰 관련 쿠키 상수
export const TOKEN_COOKIES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const; 