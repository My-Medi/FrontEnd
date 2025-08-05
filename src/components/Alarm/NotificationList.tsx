import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { NotificationItem } from './NotificationItem';
import DeleteModal from './DeleteModal';
import recentIcon from '/src/assets/Alarm/alarm-recent.svg';
import pastIcon from '/src/assets/Alarm/alarm-past.svg';
import pastTitleIcon from '/src/assets/Alarm/alarm-title.svg';
import checkIcon from '/src/assets/Alarm/check.svg';
import { useUserNotificationsQuery } from '../../hooks/notifications/useUserNotificationsQuery';
import { useUserNotificationsInfiniteQuery } from '../../hooks/notifications/useUserNotificationsInfiniteQuery';
import { useMarkNotificationAsReadMutation } from '../../hooks/notifications/useMarkNotificationAsReadMutation';
import { useDeleteNotificationsMutation } from '../../hooks/notifications/useDeleteNotificationsMutation';
import type { UserNotification } from '../../types/notification';

interface NotificationListProps {
  userType?: 'patient' | 'expert';
}

export const NotificationList: React.FC<NotificationListProps> = ({ userType = 'patient' }) => {
  const [showAllOld, setShowAllOld] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // 알림 이미지 사전 로딩
  useEffect(() => {
    const preloadImages = () => {
      const images = [
        recentIcon,
        pastIcon,
        pastTitleIcon,
        checkIcon
      ];
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
  }, []);

  // 메인 화면용 알림 데이터 조회 (최신 3개 + 지난 8개)
  const { data: notificationsData, isLoading, error, refetch } = useUserNotificationsQuery({
    currentPage: 0,
    pageSize: 20,
    enabled: userType === 'patient' && !showAllOld,
    refetchInterval: 10000, // 10초마다 자동 새로고침
  });

  // 전체보기용 무한스크롤 알림 데이터 조회
  const {
    data: infiniteNotificationsData,
    isLoading: isLoadingInfinite,
    error: errorInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchInfinite,
  } = useUserNotificationsInfiniteQuery({
    pageSize: 10,
    enabled: userType === 'patient' && showAllOld,
  });

  // 알림 읽음 처리 mutation
  const markAsReadMutation = useMarkNotificationAsReadMutation({
    onSuccess: () => {
      // 성공 시 추가 처리 없음 (캐시가 자동으로 업데이트됨)
    },
    onError: (error) => {
      console.error('알림 읽음 처리 실패:', error);
    },
  });

  // 알림 삭제 mutation
  const deleteNotificationsMutation = useDeleteNotificationsMutation({
    onSuccess: () => {
      // 성공 시 추가 처리 없음 (캐시가 자동으로 업데이트됨)
    },
    onError: (error) => {
      console.error('알림 삭제 실패:', error);
      alert('알림 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 메인 화면용 데이터 변환
  const notifications = notificationsData?.result?.content || [];
  const newNotices = notifications.filter((n) => !n.isRead); 
  const oldNotices = notifications.filter((n) => n.isRead).slice(0, 8);

  // 전체보기용 데이터 변환 (모든 페이지의 알림을 하나의 배열로 합침)
  const allNotifications = infiniteNotificationsData?.pages.flatMap((page: any) => page.result?.content || []) || [];

  const toggleSelectAll = () => {
    const currentNotices = showAllOld ? allNotifications : oldNotices;
    if (selectedIds.length === currentNotices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentNotices.map((n) => n.userNotificationId));
    }
  };

  // 전체 삭제 핸들러
  const handleDeleteAll = () => {
    const currentNotices = showAllOld ? allNotifications : oldNotices;
    if (currentNotices.length > 0) {
      const allIds = currentNotices.map((n) => n.userNotificationId);
      deleteNotificationsMutation.mutate(allIds);
    }
  };

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      deleteNotificationsMutation.mutate(selectedIds);
      setSelectedIds([]);
      setIsModalOpen(false);
    }
  };

  // 알림 클릭 시 읽음 처리
  const handleNotificationClick = (notification: UserNotification) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.userNotificationId);
    }
  };

  // Intersection Observer 콜백
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  // 포커스 시 자동 새로고침
  useEffect(() => {
    const handleFocus = () => {
      refetch();
      refetchInfinite();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch, refetchInfinite]);

  // 탭 변경 시 자동 새로고침
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
        refetchInfinite();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refetch, refetchInfinite]);

  // 로딩 상태 처리
  if (isLoading || isLoadingInfinite) {
    return (
      <div className='flex flex-col items-center justify-center gap-[40px] w-full max-w-[1183px] px-4 sm:px-[80px] py-[50px] rounded-[20px] border border-white bg-[#F6F9FF] shadow-[...]'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>알림을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error || errorInfinite) {
    return (
      <div className='flex flex-col items-center justify-center gap-[40px] w-full max-w-[1183px] px-4 sm:px-[80px] py-[50px] rounded-[20px] border border-white bg-[#F6F9FF] shadow-[...]'>
        <div className='text-center'>
          <p className='text-red-600'>알림을 불러오는데 실패했습니다.</p>
          <button 
            onClick={() => window.location.reload()} 
            className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center gap-[40px] w-full max-w-[1183px] px-4 sm:px-[80px] py-[50px] rounded-[20px] border border-white bg-[#F6F9FF] shadow-[...]'>
      {!showAllOld ? (
        <h2 className='text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#121218] font-[Pretendard] text-center'>
          알림
        </h2>
      ) : (
        <div className='w-full relative flex items-center justify-center'>
          <button onClick={() => setShowAllOld(false)} className='absolute left-0'>
            <FiChevronLeft
              size={70}
              style={{ strokeWidth: 0.7 }}
              className='text-[#75787B] ml-[-50px] mt-[5px] cursor-pointer'
            />
          </button>
          <div className='flex items-center gap-[8px]'>
            <img src={pastTitleIcon} alt='지난 알림 아이콘' loading="eager" fetchPriority="high" />
            <h2 className='text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#121218] font-[Pretendard]'>
              지난 알림
            </h2>
          </div>
        </div>
      )}

      {showAllOld && (
        <div className='w-full flex flex-col mt-[20px] gap-[16px]'>
          <span
            className='text-[#4D5053] font-semibold text-[16px] leading-[22.4px] tracking-[-0.48px] font-[Pretendard] cursor-pointer'
            onClick={() => setSelectMode((prev) => !prev)}
          >
            {selectMode ? '선택 취소' : '알림 선택'}
          </span>
          {selectMode && (
            <div className='flex items-start gap-3 ml-[-8px] mb-[-40px]'>
              <button
                onClick={toggleSelectAll}
                className={`
    w-[22.5px] h-[22.5px] relative rounded-[6px] cursor-pointer
    ${
      selectedIds.length === (showAllOld ? allNotifications.length : oldNotices.length)
        ? 'border-0 bg-transparent'
        : 'border border-[#9DA0A3] bg-white'
    }
  `}
              >
                {selectedIds.length === (showAllOld ? allNotifications.length : oldNotices.length) && (
                  <img
                    src={checkIcon}
                    alt='check'
                    className='absolute top-0 left-0 w-[22.5px] h-[22.5px]'
                    loading="eager"
                    fetchPriority="high"
                  />
                )}
              </button>
              <span
                className='text-[#4D5053] cursor-pointer font-light text-[16px] leading-[22px] tracking-[-0.48px] font-[Pretendard]'
                onClick={toggleSelectAll}
              >
                전체 선택
              </span>
              <div className='w-px h-4 bg-[#C5C8CB] mt-[3px]' />
              <span
                className='text-[#4D5053] font-light text-[16px] tracking-[-0.48px] leading-[22px] font-[Pretendard] cursor-pointer'
                onClick={() => setIsModalOpen(true)}
              >
                삭제
              </span>
            </div>
          )}
        </div>
      )}

      {!showAllOld ? (
        <div className='flex flex-col items-start gap-[32px] w-full'>
          <div className='flex items-center gap-2'>
            <img src={recentIcon} alt='recent' />
            <span className='text-[#1D68FF] text-[18px] font-medium leading-[36px] tracking-[-0.54px] font-[Pretendard]'>
              신규 알림 {newNotices.length}건
            </span>
          </div>
          <div className='flex flex-col gap-[24px] w-full'>
            {newNotices.map((n) => (
              <NotificationItem 
                key={n.userNotificationId} 
                message={n.notificationContent} 
                isNew 
                onClick={() => handleNotificationClick(n)}
              />
            ))}
          </div>
          <hr className='w-full h-px border-0 bg-[#C5C8CB] my-[24px] mt-[-5px]' />
          <div className='flex items-center gap-2 mt-[-30px]'>
            <img src={pastIcon} alt='past' />
            <span className='text-[#75787B] text-[18px] font-medium leading-[36px] tracking-[-0.54px] font-[Pretendard]'>
              지난 알림
            </span>
          </div>
          <div className='flex flex-col gap-[24px] mt-[-10px] w-full'>
            {oldNotices.slice(0, 4).map((n) => (
              <NotificationItem 
                key={n.userNotificationId} 
                message={n.notificationContent} 
                isNew={false} 
                onClick={() => handleNotificationClick(n)}
              />
            ))}
          </div>
          <div className='flex justify-center w-full mt-[40px]'>
            <button
              onClick={() => setShowAllOld(true)}
              className='flex items-center gap-1 cursor-pointer text-[#75787B] text-[18px] font-medium leading-[36px] tracking-[-0.54px] font-[Pretendard]'
            >
              전체보기 <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-[24px] w-full mt-[16px]'>
          {allNotifications.map((n) => (
            <NotificationItem
              key={n.userNotificationId}
              message={n.notificationContent}
              isNew={!n.isRead}
              selectable={selectMode}
              isSelected={selectedIds.includes(n.userNotificationId)}
              onSelectChange={() => handleSelect(n.userNotificationId)}
              onClick={() => handleNotificationClick(n)}
            />
          ))}
          
          {/* 무한스크롤 스켈레톤 UI */}
          {isFetchingNextPage && (
            <div className='flex flex-col gap-[24px] w-full'>
              {[...Array(3)].map((_, index) => (
                <div key={index} className='flex items-center w-full ml-[-10px] gap-[16px]'>
                  <div className='flex items-center h-[97px] w-full rounded-[20px] bg-gray-200 animate-pulse'>
                    <div className='flex items-center h-full w-full px-[32px] py-[10px] gap-[10px] rounded-[50px_20px_20px_20px] border-2 border-gray-200 bg-gray-100'>
                      <div className='w-full h-6 bg-gray-300 rounded animate-pulse'></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Intersection Observer 요소 */}
          {hasNextPage && (
            <div ref={observerRef} className='h-4 w-full' />
          )}
        </div>
      )}

      {isModalOpen && (
        <DeleteModal onConfirm={handleDelete} onCancel={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
