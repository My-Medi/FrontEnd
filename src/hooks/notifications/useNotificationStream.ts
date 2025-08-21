import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { connectNotificationStreamWithFetch } from '../../apis/notificationApi/notification';

interface UseNotificationStreamProps {
  enabled?: boolean;
  onNewNotification?: (notification: any) => void;
  userType?: string;
}

export const useNotificationStream = ({ 
  enabled = true, 
  onNewNotification,
  userType
}: UseNotificationStreamProps = {}) => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);

  const handleMessage = useCallback((data: any) => {
    try {
      // 새로운 알림이 오면 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['userNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['expertNotifications'] });
      
      // 콜백 실행 (원본 데이터 그대로 전달)
      onNewNotification?.(data);
    } catch (error) {
      console.error('알림 메시지 처리 실패:', error);
    }
  }, [queryClient, onNewNotification]);

  const handleError = useCallback((error: any) => {
    // AbortError는 정상적인 연결 해제이므로 무시
    if (error.name === 'AbortError') {
      return;
    }
    
    console.error('알림 스트림 에러:', error);
    
    // 기존 재연결 타이머가 있으면 클리어
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    // 5초 후 재연결 시도
    reconnectTimeoutRef.current = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      try {
        // 토큰 리프레시 후 재연결을 위한 콜백
        const handleTokenRefresh = () => {
          // 약간의 지연 후 재연결
          setTimeout(() => {
            connectStream();
          }, 1000);
        };
        
        abortControllerRef.current = connectNotificationStreamWithFetch(
          handleMessage, 
          handleError,
          () => {},
          userType,
          handleTokenRefresh
        );
      } catch (error) {
        // 재연결 실패 처리
      }
    }, 5000);
  }, [handleMessage]);



  const connectStream = useCallback(() => {
    // 이미 연결 중이면 중복 연결 방지
    if (isConnectingRef.current) {
      return;
    }

    try {
      isConnectingRef.current = true;
      
      // 기존 연결이 있으면 정리
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      
      // 토큰 리프레시 후 재연결을 위한 콜백
      const handleTokenRefresh = () => {
        // 약간의 지연 후 재연결
        setTimeout(() => {
          connectStream();
        }, 1000);
      };
      
      // SSE 연결 시도
      abortControllerRef.current = connectNotificationStreamWithFetch(
        handleMessage,
        handleError,
        () => {
          isConnectingRef.current = false;
        },
        userType,
        handleTokenRefresh
      );
    } catch (error) {
      isConnectingRef.current = false;
    }
      }, [handleMessage, handleError]);

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
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      isConnectingRef.current = false;
    };
  }, [enabled, connectStream]);

  return {
    isConnected: !!abortControllerRef.current,
    disconnect: () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      isConnectingRef.current = false;
    },
    reconnect: connectStream
  };
};
