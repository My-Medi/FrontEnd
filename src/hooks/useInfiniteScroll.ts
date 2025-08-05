import { useRef, useCallback, useEffect } from 'react';

interface UseInfiniteScrollProps {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
  enabled?: boolean;
}

export const useInfiniteScroll = ({
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
  enabled = true,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage && enabled) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage, enabled]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return { observerRef };
}; 