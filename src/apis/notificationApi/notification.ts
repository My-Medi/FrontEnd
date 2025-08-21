import API from '../axios';
import type { ApiResponse } from '../../types/common';
import type { 
  NotificationListResponse, 
  ExpertNotificationListResponse 
} from '../../types/notification';
import { getTokens } from '../../utils/tokenStorage';

/**
 * fetch API를 사용한 SSE 스트림 연결 (Bearer Token 지원)
 * @param onMessage - 메시지 수신 시 콜백
 * @param onError - 에러 발생 시 콜백
 * @param onOpen - 연결 성공 시 콜백
 * @returns AbortController (연결 해제용)
 */
export const connectNotificationStreamWithFetch = (
  onMessage: (data: any) => void,
  onError: (error: any) => void,
  onOpen: () => void,
  userType?: string
): AbortController => {
  // 환경변수에서 BASE_URL 가져오기 (기본값 설정)
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.my-medi.cloud/api/v1';
  
  // 토큰을 쿠키에서 가져오기
  const { accessToken } = getTokens();
  
  // 사용자 타입에 따라 다른 스트림 경로 사용
  const streamPath = userType === 'expert' 
    ? '/experts/notifications/stream'
    : '/users/notifications/stream';
  
  // 토큰이 없으면 연결하지 않음
  if (!accessToken) {
    console.error('알림 스트림 연결 실패: 토큰이 없습니다.');
    onError(new Error('토큰이 없어 알림 스트림을 연결할 수 없습니다.'));
    throw new Error('토큰이 없어 알림 스트림을 연결할 수 없습니다.');
  }
  
  const url = `${BASE_URL}${streamPath}`;
  

  
  // AbortController로 연결 해제 가능하게 설정
  const abortController = new AbortController();
  
  // fetch API로 SSE 스트림 연결
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
    signal: abortController.signal,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    onOpen();
    
    // ReadableStream 처리
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    if (!reader) {
      throw new Error('Response body is null');
    }
    
            const processStream = async () => {
          try {
            let buffer = '';
            
            while (true) {
              const { done, value } = await reader.read();
              
              if (done) {
                console.log('SSE 스트림 종료');
                break;
              }
              
                        // 받은 데이터를 텍스트로 디코딩하고 버퍼에 추가
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
              
              // 완전한 SSE 메시지 단위로 분리 (빈 줄로 구분)
              const messages = buffer.split('\n\n');
              buffer = messages.pop() || ''; // 마지막 불완전한 메시지는 버퍼에 유지
              
              for (const message of messages) {
                if (!message.trim()) continue;
                
                let eventType = '';
                let data = '';
                
                const lines = message.split('\n');
                for (const line of lines) {
                  // 정규식을 사용해서 더 안정적으로 처리
                  const eventMatch = line.match(/^event:\s*(.+)$/);
                  const dataMatch = line.match(/^data:\s*(.+)$/);
                  const idMatch = line.match(/^id:\s*(.+)$/);
                  
                  if (eventMatch) {
                    eventType = eventMatch[1].trim();
                  } else if (dataMatch) {
                    data = dataMatch[1].trim();
                  }
                }
                
                // notification 이벤트이고 데이터가 있는 경우 처리
                if (eventType === 'notification' && data) {
                  try {
                    const parsedData = JSON.parse(data);
                    // 서버에서 보내는 데이터 구조에 맞춰 처리
                    const notificationData = parsedData.userNotificationDto ? parsedData : parsedData;
                    onMessage(notificationData);
                  } catch (error) {
                    console.error('SSE 알림 데이터 파싱 실패:', error, '원본 데이터:', data);
                  }
                }
              }
            }
          } catch (error: any) {
            if (error.name === 'AbortError') {
              console.log('SSE 스트림 연결 해제됨');
            } else {
              console.error('SSE 스트림 처리 중 에러:', error);
              onError(error);
            }
          }
        };
    
    processStream();
  })
  .catch(error => {
    console.error('SSE 스트림 연결 실패:', error);
    onError(error);
  });
  
  return abortController;
};

/**
 * SSE 스트림을 통한 실시간 알림 연결
 * @param onMessage - 메시지 수신 시 콜백
 * @param onError - 에러 발생 시 콜백
 * @returns EventSource 인스턴스
 */
export const connectNotificationStream = (
  onMessage: (event: MessageEvent) => void,
  onError: (event: Event) => void
): EventSource => {
  // 환경변수에서 BASE_URL 가져오기
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  // 토큰을 URL 파라미터로 전달 (EventSource는 헤더를 지원하지 않음)
  const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  
  // BASE_URL에 이미 /api/v1이 포함되어 있는지 확인
  const streamPath = BASE_URL.includes('/api/v1') 
    ? '/users/notifications/stream' 
    : '/api/v1/users/notifications/stream';
  
  const url = token 
    ? `${BASE_URL}${streamPath}?token=${encodeURIComponent(token)}`
    : `${BASE_URL}${streamPath}`;
  
  console.log('SSE 스트림 연결 시도:', url);
  console.log('토큰 존재 여부:', !!token);
  
  const eventSource = new EventSource(url);
  
  eventSource.onmessage = onMessage;
  eventSource.onerror = onError;
  
  // 연결 상태 로깅
  eventSource.onopen = () => {
    console.log('알림 스트림 연결 성공');
  };
  
  return eventSource;
};

/**
 * 사용자 알림 목록 조회 API
 * @param currentPage - 현재 페이지 (0부터 시작)
 * @param pageSize - 페이지 크기
 * @returns Promise<NotificationListResponse>
 */
export const getUserNotifications = async (currentPage: number = 0, pageSize: number = 10): Promise<NotificationListResponse> => {
  try {
    const response = await API.get<NotificationListResponse>(`/users/notifications?currentPage=${currentPage}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 사용자 알림 읽음 처리 API
 * @param notificationId - 알림 ID
 * @returns Promise<ApiResponse<void>>
 */
export const markNotificationAsRead = async (notificationId: number): Promise<ApiResponse<void>> => {
  try {
    const response = await API.patch<ApiResponse<void>>(`/users/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 사용자 알림 삭제 API
 * @param notificationIds - 삭제할 알림 ID 배열
 * @returns Promise<ApiResponse<void>>
 */
export const deleteNotifications = async (notificationIds: number[]): Promise<ApiResponse<void>> => {
  try {
    const queryParams = notificationIds.map(id => `notificationId=${id}`).join('&');
    const response = await API.delete<ApiResponse<void>>(`/users/notifications?${queryParams}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 전문가 알림 목록 조회 API
 * @param currentPage - 현재 페이지 (0부터 시작)
 * @param pageSize - 페이지 크기
 * @returns Promise<ExpertNotificationListResponse>
 */
export const getExpertNotifications = async (currentPage: number = 0, pageSize: number = 10): Promise<ExpertNotificationListResponse> => {
  try {
    const response = await API.get<ExpertNotificationListResponse>(`/experts/notifications?currentPage=${currentPage}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 전문가 알림 읽음 처리 API
 * @param notificationId - 알림 ID
 * @returns Promise<ApiResponse<void>>
 */
export const markExpertNotificationAsRead = async (notificationId: number): Promise<ApiResponse<void>> => {
  try {
    const response = await API.patch<ApiResponse<void>>(`/experts/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 전문가 알림 삭제 API
 * @param notificationIds - 삭제할 알림 ID 배열
 * @returns Promise<ApiResponse<void>>
 */
export const deleteExpertNotifications = async (notificationIds: number[]): Promise<ApiResponse<void>> => {
  try {
    const queryParams = notificationIds.map(id => `notificationId=${id}`).join('&');
    const response = await API.delete<ApiResponse<void>>(`/experts/notifications?${queryParams}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const notificationAPI = {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotifications,
  getExpertNotifications,
  markExpertNotificationAsRead,
  deleteExpertNotifications,
}; 