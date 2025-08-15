export interface CurrentHealthStatusResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: 'DANGER' | 'CAUTION' | 'WATCH' | 'NORMAL' | 'SAFE';
}

export interface CurrentHealthStatusResult {
  result: 'DANGER' | 'CAUTION' | 'WATCH' | 'NORMAL' | 'SAFE';
}
