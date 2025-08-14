// 기존 파일과의 호환성을 위한 re-export
export { getExpertList } from './list';
export { signUpExpert, signUpExpertNew } from './signup';
export { getMatchedExperts, cancelConsultation } from './matching';
export { getExpertDetail } from './detail';

// 기존 API 객체 (하위 호환성)
export const expertAPI = {
  signUpExpert: async (data: any) => {
    const { signUpExpert } = await import('./signup');
    return signUpExpert(data);
  },
  signUpExpertNew: async (data: any) => {
    const { signUpExpertNew } = await import('./signup');
    return signUpExpertNew(data);
  },
  getExpertList: async (params: any) => {
    const { getExpertList } = await import('./list');
    return getExpertList(params);
  }
}; 