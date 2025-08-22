import type { TermResponse } from '../types/healthTerms';
import { API } from './axios';

export const fetchTermData = async (term: string): Promise<TermResponse | null> => {
  try {
    // URL 인코딩 개선 - 한글 처리
    const encodedTerm = encodeURIComponent(term.trim());
    
    const response = await API.get<TermResponse>(`/term?term=${encodedTerm}`);
    
    return response.data;
  } catch (error) {
    return null;
  }
};
