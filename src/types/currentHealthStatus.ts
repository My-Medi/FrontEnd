export interface CurrentHealthStatusResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: 'DANGER' | 'CAUTION' | 'INTEREST' | 'NORMAL' | 'SAFE';
}

export interface CurrentHealthStatusResult {
  result: 'DANGER' | 'CAUTION' | 'INTEREST' | 'NORMAL' | 'SAFE';
}
