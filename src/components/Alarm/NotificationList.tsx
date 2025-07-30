import React, { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { NotificationItem } from './NotificationItem';
import DeleteModal from './DeleteModal';
import recentIcon from '/src/assets/Alarm/alarm-recent.svg';
import pastIcon from '/src/assets/Alarm/alarm-past.svg';
import pastTitleIcon from '/src/assets/Alarm/alarm-title.svg';
import checkIcon from '/src/assets/Alarm/check.svg';

interface Notification {
  id: string;
  message: string;
  isNew: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const [showAllOld, setShowAllOld] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newNotices = notifications.filter((n) => n.isNew).slice(0, 3);
  const oldNotices = notifications.filter((n) => !n.isNew).slice(0, 8);

  const toggleSelectAll = () => {
    if (selectedIds.length === oldNotices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(oldNotices.map((n) => n.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDelete = () => {
    console.log('삭제할 알림 ID 목록:', selectedIds);
    setSelectedIds([]);
    setIsModalOpen(false);
  };

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
            <img src={pastTitleIcon} alt='지난 알림 아이콘' />
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
      selectedIds.length === oldNotices.length
        ? 'border-0 bg-transparent'
        : 'border border-[#9DA0A3] bg-white'
    }
  `}
              >
                {selectedIds.length === oldNotices.length && (
                  <img
                    src={checkIcon}
                    alt='check'
                    className='absolute top-0 left-0 w-[22.5px] h-[22.5px]'
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
              신규 알림 {newNotices.length}개
            </span>
          </div>
          <div className='flex flex-col gap-[24px] w-full'>
            {newNotices.map((n) => (
              <NotificationItem key={n.id} message={n.message} isNew />
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
              <NotificationItem key={n.id} message={n.message} isNew={false} />
            ))}
          </div>
          {oldNotices.length > 4 && (
            <div className='flex justify-center w-full mt-[40px]'>
              <button
                onClick={() => setShowAllOld(true)}
                className='flex items-center gap-1 cursor-pointer text-[#75787B] text-[18px] font-medium leading-[36px] tracking-[-0.54px] font-[Pretendard]'
              >
                전체보기 <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-col gap-[16px] w-full mt-[16px]'>
          {oldNotices.map((n) => (
            <NotificationItem
              key={n.id}
              message={n.message}
              isNew={false}
              selectable={selectMode}
              isSelected={selectedIds.includes(n.id)}
              onSelectChange={() => handleSelect(n.id)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <DeleteModal onConfirm={handleDelete} onCancel={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
