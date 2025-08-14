import { useQuery } from '@tanstack/react-query';
import { getAcceptedMembers } from '../../../apis/expertApi/consultations';

interface Props {
  page?: number; // UI는 1부터, API는 0부터 → 훅에서 변환
  size?: number; // 기본 3
  enabled?: boolean;
}

export const useAcceptedMembersQuery = ({ page = 1, size = 6, enabled = true }: Props = {}) => {
  const apiPage = Math.max(0, page - 1);
  return useQuery({
    queryKey: ['acceptedMembers', apiPage, size],
    queryFn: () => getAcceptedMembers(apiPage, size),
    enabled,
    // 필요 시 result/data 혼용 방어 및 색상 매핑(서버 totalHealthStatus → 프론트 코리안 라벨)
    select: (res: any) => {
      const payload = res.result ?? res.data ?? res;
      const content = Array.isArray(payload?.content) ? payload.content : [];
      const mapped = content.map((item: any) => {
        const status = (item?.totalHealthStatus ?? '').toString().toUpperCase();
        const statusKor = (() => {
          switch (status) {
            case 'DANGER':
              return '위험';
            case 'CAUTION':
              return '주의';
            case 'WATCH':
              return '관심';
            case 'NORMAL':
              return '정상';
            case 'SAFE':
              return '안심';
            default:
              return '정상';
          }
        })();
        return {
          ...item,
          totalHealthStatusKor: statusKor,
        };
      });
      return { ...payload, content: mapped };
    },
    staleTime: 30_000,
  });
};
