import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { connectNotificationStreamWithFetch } from '../../apis/notificationApi/notification';

interface UseNotificationStreamProps {
  enabled?: boolean;
  onNewNotification?: (notification: any) => void;
  fallbackToPolling?: boolean; // SSE 실패 시 폴링으로 대체
  pollingInterval?: number; // 폴링 간격 (ms)
}

export const useNotificationStream = ({ 
  enabled = true, 
  onNewNotification,
  fallbackToPolling = true,
  pollingInterval = 30000 // 30초
}: UseNotificationStreamProps = {}) => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const usePollingRef = useRef(false);
  const isConnectingRef = useRef(false);

  const handleMessage = useCallback((data: any) => {
    try {
      console.log('실시간 알림 수신:', data);
      
      // 새로운 알림이 오면 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['userNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['expertNotifications'] });
      
      // 콜백 실행
      onNewNotification?.(data);
    } catch (error) {
      console.error('알림 메시지 처리 실패:', error);
    }
  }, [queryClient, onNewNotification]);

  const handleError = useCallback((error: any) => {
    // AbortError는 정상적인 연결 해제이므로 무시
    if (error.name === 'AbortError') {
      console.log('SSE 스트림 연결이 정상적으로 해제됨');
      return;
    }
    
    console.error('알림 스트림 에러:', error);
    
    // SSE 스트림이 실패하고 폴링 대체가 활성화된 경우
    if (fallbackToPolling && !usePollingRef.current) {
      console.log('SSE 스트림 실패, 폴링 방식으로 전환...');
      usePollingRef.current = true;
      
      // 기존 SSE 연결 정리
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      
      // 폴링 시작
      startPolling();
      return;
    }
    
    // 기존 재연결 타이머가 있으면 클리어
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    // 5초 후 재연결 시도 (폴링을 사용하지 않는 경우에만)
    if (!fallbackToPolling) {
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('알림 스트림 재연결 시도...');
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        try {
          abortControllerRef.current = connectNotificationStreamWithFetch(
            handleMessage, 
            handleError,
            () => console.log('알림 스트림 재연결 성공')
          );
        } catch (error) {
          console.error('알림 스트림 재연결 실패:', error);
        }
      }, 5000);
    }
  }, [handleMessage, fallbackToPolling]);

  const startPolling = useCallback(() => {
    const poll = () => {
      // 알림 목록을 새로고침하여 새로운 알림 확인
      queryClient.invalidateQueries({ queryKey: ['userNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['expertNotifications'] });
      
      // 다음 폴링 예약
      pollingTimeoutRef.current = setTimeout(poll, pollingInterval);
    };
    
    // 즉시 첫 번째 폴링 실행
    poll();
  }, [queryClient, pollingInterval]);

  const connectStream = useCallback(() => {
    // 이미 연결 중이면 중복 연결 방지
    if (isConnectingRef.current) {
      console.log('이미 연결 중입니다. 중복 연결 방지');
      return;
    }

    try {
      isConnectingRef.current = true;
      
      // 기존 연결이 있으면 정리
      if (abortControllerRef.current) {
        console.log('기존 연결 정리 중...');
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      
      // 폴링 모드가 아닌 경우에만 SSE 연결 시도
      if (!usePollingRef.current) {
        console.log('SSE 스트림 연결 시작...');
        // fetch API를 사용한 SSE 스트림 연결 (Bearer Token 지원)
        abortControllerRef.current = connectNotificationStreamWithFetch(
          handleMessage,
          handleError,
          () => {
            console.log('알림 스트림 연결 성공 (Bearer Token)');
            isConnectingRef.current = false;
          }
        );
      } else {
        // 폴링 방식 사용
        console.log('폴링 방식 사용');
        startPolling();
        isConnectingRef.current = false;
      }
    } catch (error) {
      console.error('알림 스트림 초기 연결 실패:', error);
      isConnectingRef.current = false;
      
      // 연결 실패 시 폴링으로 전환
      if (fallbackToPolling) {
        console.log('SSE 연결 실패, 폴링 방식으로 전환...');
        usePollingRef.current = true;
        startPolling();
      }
    }
  }, [handleMessage, handleError, fallbackToPolling, startPolling]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // 약간의 지연을 두고 연결 시도 (중복 연결 방지)
    const timeoutId = setTimeout(() => {
      connectStream();
    }, 100);

    // 컴포넌트 언마운트 시 연결 정리
    return () => {
      clearTimeout(timeoutId);
      
      if (abortControllerRef.current) {
        console.log('컴포넌트 언마운트: SSE 연결 해제');
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
        pollingTimeoutRef.current = null;
      }
      isConnectingRef.current = false;
    };
  }, [enabled, connectStream]);

  return {
    isConnected: !!abortControllerRef.current,
    isPolling: usePollingRef.current,
    disconnect: () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
        pollingTimeoutRef.current = null;
      }
      usePollingRef.current = false;
      isConnectingRef.current = false;
    },
    reconnect: connectStream
  };
};
