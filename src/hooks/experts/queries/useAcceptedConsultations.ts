import { useQuery } from '@tanstack/react-query';
import { getAcceptedMembers } from '../../../apis/expertApi/consultations';

interface Props {
  page?: number; // UI는 1부터, API는 0부터 → 훅에서 변환
  size?: number; // 기본 3
  enabled?: boolean;
}

export const useAcceptedMembersQuery = ({ page = 1, size = 3, enabled = true }: Props = {}) => {
  const apiPage = Math.max(0, page - 1);
  return useQuery({
    queryKey: ['acceptedMembers', apiPage, size],
    queryFn: () => getAcceptedMembers(apiPage, size),
    enabled,
    // 필요 시 result/data 혼용 방어:
    select: (res) => res.result ?? (res as any).data,
    staleTime: 30_000,
  });
};
