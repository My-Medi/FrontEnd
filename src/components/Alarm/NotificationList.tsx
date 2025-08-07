import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { NotificationItem } from './NotificationItem';
import { NotificationItemSkeleton } from './NotificationItemSkeleton';
import DeleteModal from './DeleteModal';
import recentIcon from '/src/assets/Alarm/alarm-recent.svg';
import pastIcon from '/src/assets/Alarm/alarm-past.svg';
import pastTitleIcon from '/src/assets/Alarm/alarm-title.svg';
import checkIcon from '/src/assets/Alarm/check.svg';
import { useNotificationManager } from '../../hooks/notifications/useNotificationManager';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useAutoRefresh } from '../../hooks/useAutoRefresh';
import type { UserNotification, ExpertNotification } from '../../types/notification';

interface NotificationListProps {
  userType?: 'patient' | 'expert';
}

export const NotificationList: React.FC<NotificationListProps> = ({ userType = 'patient' }) => {
  const [showAllOld, setShowAllOld] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 알림 관리 훅
  const {
    currentQuery,
    currentInfiniteQuery,
    newNotices,
    oldNotices,
    allNotifications,
    selectedIds,
    handleSelect,
    toggleSelectAll,
    clearSelection,
    markAsRead,
    deleteNotifications,
    getNotificationId,
  } = useNotificationManager({ userType, showAllOld });

  // 무한스크롤 훅
  const { observerRef } = useInfiniteScroll({
    hasNextPage: currentInfiniteQuery.hasNextPage,
    isFetchingNextPage: currentInfiniteQuery.isFetchingNextPage,
    fetchNextPage: currentInfiniteQuery.fetchNextPage,
    enabled: showAllOld && currentInfiniteQuery.isEnabled,
  });

  // 자동 새로고침 훅
  useAutoRefresh({
    refetch: currentQuery.refetch,
    refetchInfinite: currentInfiniteQuery.refetch,
    enabled: !showAllOld && currentQuery.isEnabled,
  });

  // 알림 이미지 사전 로딩
  useEffect(() => {
    const preloadImages = () => {
      const images = [recentIcon, pastIcon, pastTitleIcon, checkIcon];
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    preloadImages();
  }, []);


  const handleDelete = () => {
    if (selectedIds.length > 0) {
      deleteNotifications(selectedIds);
      clearSelection();
      setIsModalOpen(false);
    }
  };

  // 알림 클릭 시 읽음 처리
  const handleNotificationClick = (notification: UserNotification | ExpertNotification) => {
    markAsRead(notification);
  };

  // 로딩 상태 처리
  const isLoading = currentQuery.isLoading || (showAllOld && currentInfiniteQuery.isLoading);
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center gap-[40px] w-full max-w-[1183px] px-4 sm:px-[80px] py-[50px] rounded-[20px] border border-white bg-[#F6F9FF] shadow-[...]'>
        <h2 className='text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#121218] font-[Pretendard] text-center'>
          알림
        </h2>
        <div className='flex flex-col items-start gap-[32px] w-full min-h-[300px]'>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 bg-gray-200 rounded animate-pulse' />
            <div className='w-32 h-[36px] bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='flex flex-col gap-[24px] w-full'>
            {Array.from({ length: 3 }, (_, index) => (
              <NotificationItemSkeleton key={index} />
            ))}
          </div>
          <hr className='w-full h-px border-0 bg-[#C5C8CB] my-[24px] mt-[-5px]' />
          <div className='flex items-center gap-2 mt-[-30px]'>
            <div className='w-6 h-6 bg-gray-200 rounded animate-pulse' />
            <div className='w-24 h-[36px] bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='flex flex-col gap-[24px] mt-[-10px] w-full'>
            {Array.from({ length: 2 }, (_, index) => (
              <NotificationItemSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  const error = currentQuery.error || (showAllOld && currentInfiniteQuery.error);
  if (error) {
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
                onClick={() => toggleSelectAll(allNotifications)}
                className={`
                  w-[22.5px] h-[22.5px] relative rounded-[6px] cursor-pointer
                  ${
                    selectedIds.length === allNotifications.length
                      ? 'border-0 bg-transparent'
                      : 'border border-[#9DA0A3] bg-white'
                  }
                `}
              >
                {selectedIds.length === allNotifications.length && (
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
                onClick={() => toggleSelectAll(allNotifications)}
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
        <div className='flex flex-col items-start gap-[32px] w-full min-h-[300px]'>
          <div className='flex items-center gap-2'>
            <img src={recentIcon} alt='recent' />
            <span className='text-[#1D68FF] text-[18px] font-medium leading-[36px] tracking-[-0.54px] font-[Pretendard]'>
              신규 알림 {newNotices.length}건
            </span>
          </div>
          <div className='flex flex-col gap-[24px] w-full'>
            {newNotices.length > 0 ? (
              newNotices.map((n) => {
                const notificationId = getNotificationId(n);
                return (
                  <NotificationItem 
                    key={notificationId} 
                    message={n.notificationContent} 
                    isNew 
                    onClick={() => handleNotificationClick(n)}
                  />
                );
              })
            ) : (
              <div className='flex flex-col items-center justify-center py-[40px]'>
                <p className='text-[#75787B] text-[16px] font-medium leading-[24px] tracking-[-0.48px] font-[Pretendard]'>
                  신규 알림이 없습니다.
                </p>
              </div>
            )}
          </div>
          <hr className='w-full h-px border-0 bg-[#C5C8CB] my-[24px] mt-[-5px]' />
          <div className='flex items-center gap-2 mt-[-30px]'>
            <img src={pastIcon} alt='past' />
            <span className='text-[#75787B] text-[18px] font-medium leading-[36px] tracking-[-0.54px] font-[Pretendard]'>
              지난 알림
            </span>
          </div>
          <div className='flex flex-col gap-[24px] mt-[-10px] w-full'>
            {oldNotices.length > 0 ? (
              oldNotices.slice(0, 4).map((n) => {
                const notificationId = getNotificationId(n);
                return (
                  <NotificationItem 
                    key={notificationId} 
                    message={n.notificationContent} 
                    isNew={false} 
                    onClick={() => handleNotificationClick(n)}
                  />
                );
              })
            ) : (
              <div className='flex flex-col items-center justify-center py-[40px]'>
                <p className='text-[#75787B] text-[16px] font-medium leading-[24px] tracking-[-0.48px] font-[Pretendard]'>
                  지난 알림이 없습니다.
                </p>
              </div>
            )}
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
          {currentInfiniteQuery.isLoading ? (
            // 지난 알림 초기 로딩 시 스켈레톤 UI
            Array.from({ length: 5 }, (_, index) => (
              <NotificationItemSkeleton key={index} showCheckbox={selectMode} />
            ))
          ) : allNotifications.length > 0 ? (
            <>
              {allNotifications.map((n) => {
                const notificationId = getNotificationId(n);
                return (
                  <NotificationItem
                    key={notificationId}
                    message={n.notificationContent}
                    isNew={!n.isRead}
                    selectable={selectMode}
                    isSelected={selectedIds.includes(notificationId)}
                    onSelectChange={() => handleSelect(notificationId)}
                    onClick={() => handleNotificationClick(n)}
                  />
                );
              })}
              
              {/* 무한스크롤 스켈레톤 UI */}
              {currentInfiniteQuery.isFetchingNextPage && (
                <div className='flex flex-col gap-[24px] w-full'>
                  {Array.from({ length: 3 }, (_, index) => (
                    <NotificationItemSkeleton key={index} showCheckbox={selectMode} />
                  ))}
                </div>
              )}
              
              {/* Intersection Observer 요소 */}
              {currentInfiniteQuery.hasNextPage && (
                <div ref={observerRef} className='h-4 w-full' />
              )}
            </>
          ) : (
            <div className='flex flex-col items-center justify-center py-[100px] min-h-[300px]'>
              <p className='text-[#75787B] text-[18px] font-medium leading-[36px] tracking-[-0.54px] font-[Pretendard]'>
                지난 알림이 없습니다.
              </p>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <DeleteModal onConfirm={handleDelete} onCancel={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
