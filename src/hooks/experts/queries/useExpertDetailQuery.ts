import { useQuery } from '@tanstack/react-query';
import { getExpertDetail } from '../../../apis/expertApi/detail';
import { getMatchedExpertDetail, getRequestedExpertDetail } from '../../../apis/expertApi/matching';
import type { ExpertDetailResponse } from '../../../types/expert/detail';

/**
 * 전문가 상세 조회 훅
 * @param expertId - 전문가 ID
 * @returns useQuery 결과
 */
export const useExpertDetailQuery = (
  expertId: number,
  expertStatus?: 'matched' | 'request' | 'rejected'
) => {
  return useQuery<ExpertDetailResponse['result']>({
    queryKey: ['expertDetail', expertId, expertStatus],
    queryFn: async () => {
      if (expertStatus === 'matched') {
        const matched = await getMatchedExpertDetail(expertId);
        const r = matched.result;
        return {
          expertId: r.expertId,
          name: r.name,
          email: '',
          birthDate: '',
          gender: '',
          nickname: r.nickname,
          phoneNumber: r.phoneNumber,
          profileImgUrl: r.profileImageUrl,
          role: 'EXPERT',
          specialty: r.specialty as any,
          organizationName: r.organization,
          introduction: r.introduction,
          introSentence: r.introSentence,
          matchedAt: r.matchedAt,
          careers: r.career?.map((c, idx) => ({
            careerId: idx,
            companyName: c,
            jobTitle: '',
            startDate: '',
            endDate: ''
          })) || [],
          licenseImages: [],
          licenses: []
        };
      }

      if (expertStatus === 'request') {
        const requested = await getRequestedExpertDetail(expertId);
        const r = requested.result;
        return {
          expertId: r.expertId,
          name: r.name,
          email: '',
          birthDate: '',
          gender: '',
          nickname: r.nickname,
          phoneNumber: '',
          profileImgUrl: r.profileImageUrl,
          role: 'EXPERT',
          specialty: r.specialty as any,
          organizationName: r.organization,
          introduction: r.introduction,
          introSentence: r.introSentence,
          matchedAt: undefined,
          requestCount: r.requestCount,
          careers: r.career?.map((c, idx) => ({
            careerId: idx,
            companyName: c,
            jobTitle: '',
            startDate: '',
            endDate: ''
          })) || [],
          licenseImages: [],
          licenses: []
        };
      }

      const response = await getExpertDetail(expertId);
      if (!response.isSuccess) {
        throw new Error(response.message || '전문가 상세 조회에 실패했습니다.');
      }
      return response.result!;
    },
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    enabled: !!expertId,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};
