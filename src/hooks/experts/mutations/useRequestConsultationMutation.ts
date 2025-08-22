import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestConsultation } from '../../../apis/expertApi/matching';

// 요청 횟수를 일별로 관리하는 함수들
const getTodayKey = () => {
  const today = new Date();
  return `request_count_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

const getRequestCount = () => {
  const key = getTodayKey();
  const count = localStorage.getItem(key);
  return count ? parseInt(count, 10) : 0;
};

const setRequestCount = (count: number) => {
  const key = getTodayKey();
  localStorage.setItem(key, count.toString());
};

const incrementRequestCount = () => {
  const currentCount = getRequestCount();
  const newCount = currentCount + 1;
  setRequestCount(newCount);
  return newCount;
};

const decrementRequestCount = () => {
  const currentCount = getRequestCount();
  const newCount = Math.max(0, currentCount - 1);
  setRequestCount(newCount);
  return newCount;
};

export const useRequestConsultationMutation = (options?: { skipQueryInvalidation?: boolean }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ expertId, comment }: { expertId: number; comment: string }) => {
      // 요청 횟수 증가
      incrementRequestCount();
      return requestConsultation(expertId, comment);
    },
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효화 (옵션으로 건너뜀)
      if (!options?.skipQueryInvalidation) {
        queryClient.invalidateQueries({ queryKey: ['matchedExperts'] });
      }
    },
    onError: () => {
      // 에러 발생 시 요청 횟수 감소 (실패한 요청은 카운트하지 않음)
      decrementRequestCount();
      
      // 상담 요청 실패 처리
    },
  });
};

// 현재 요청 횟수를 반환하는 함수
export { getRequestCount };

// 요청 횟수를 리셋하는 함수
export const resetRequestCount = () => {
  const key = getTodayKey();
  localStorage.removeItem(key);
};
