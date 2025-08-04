import React from 'react';
import checkIcon from '/src/assets/Alarm/check.svg';

interface NotificationItemProps {
  message: string;
  isNew?: boolean;
  isSelected?: boolean;
  selectable?: boolean;
  onSelectChange?: (checked: boolean) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  message,
  isNew = false,
  isSelected = false,
  selectable = false,
  onSelectChange,
}) => {
  return (
    <div className='flex items-center w-full ml-[-10px] gap-[16px]'>
      {/*체크박스: 알림 상자 바깥쪽 */}
      {selectable && (
        <div className='relative w-[22.5px] h-[22.5px] shrink-0'>
          <input
            type='checkbox'
            checked={isSelected}
            onChange={(e) => onSelectChange?.(e.target.checked)}
            className={`
              peer appearance-none
              w-full h-full
              rounded-[6px]
              bg-white
              border border-[#9DA0A3]
              cursor-pointer
            `}
          />
          <img
            src={checkIcon}
            alt='check'
            className='absolute inset-0 m-auto w-[22.5px] h-[22.5px] pointer-events-none peer-checked:block hidden'
          />
        </div>
      )}

      {/*알림 상자 */}
      <div
        className={`
          flex items-center
          h-[97px] w-full
          rounded-[20px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)]
          ${isNew ? 'bg-[#1D68FF]' : 'bg-[#C5C8CB]'}
        `}
      >
        <div
          className={`
            flex items-center
            h-full w-full
      px-[32px] py-[10px] gap-[10px]
      rounded-[50px_20px_20px_20px]
      border-2 ${isNew ? 'border-[#1D68FF]' : 'border-[#C5C8CB]'}
      bg-white
          `}
        >
          <p
            className={`
              text-[#25282B] text-center sm:text-left
        font-[Pretendard] font-medium text-[20px] tracking-[-0.6px]
        w-full
            `}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
