import { useEffect } from 'react';

interface UseAutoRefreshProps {
  refetch: () => void;
  refetchInfinite?: () => void;
  enabled?: boolean;
}

export const useAutoRefresh = ({ refetch, refetchInfinite, enabled = true }: UseAutoRefreshProps) => {
  // 포커스 시 자동 새로고침
  useEffect(() => {
    if (!enabled) return;

    const handleFocus = () => {
      refetch();
      refetchInfinite?.();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch, refetchInfinite, enabled]);

  // 탭 변경 시 자동 새로고침
  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
        refetchInfinite?.();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refetch, refetchInfinite, enabled]);
}; 