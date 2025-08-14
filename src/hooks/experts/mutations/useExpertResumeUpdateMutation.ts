import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpertResume } from '../../../apis/expertApi/resume';
import type { ResumeUpdateRequest } from '../../../apis/expertApi/resume';

interface UseExpertResumeUpdateMutationProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useExpertResumeUpdateMutation = ({
  onSuccess,
  onError,
}: UseExpertResumeUpdateMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resumeData: ResumeUpdateRequest) => updateExpertResume(resumeData),
    onSuccess: () => {
      // 이력서 데이터 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['expertResume'] });
      // 마이홈 프로필에도 바로 반영되도록 전문가 프로필 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['expertProfile'] });
      queryClient.invalidateQueries({ queryKey: ['expertProfileOverview'] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
