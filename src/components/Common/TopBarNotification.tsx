import React from 'react';
import alarmBox from '../../assets/Alarm/alarmbox.svg';
import alarmIcon from '../../assets/Alarm/alarm.svg';

interface TopBarNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  onAction: () => void;
  message: string;
  actionText: string;
}

const TopBarNotification: React.FC<TopBarNotificationProps> = ({
  isVisible,
  onAction,
  message,
  actionText,
}) => {
  return (
    <div 
      className={`absolute top-5 right-[-345px] z-50 w-[527px] h-[180px] cursor-pointer transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`} 
      onClick={onAction}
    >
      <img src={alarmBox} alt="알림 배경" className="absolute inset-0 w-full h-full" />
      {/* 메인 컨텐츠 */}
      <div className="relative flex items-center p-4 h-full pb-10">
          {/* 알림 아이콘 */}
          <div className="flex items-center gap-2.5 px-5">
            <img 
              src={alarmIcon}
              alt="알림 아이콘" 
              className="w-[37.19px] h-[42.04px] object-contain"
            />
          </div>

                     {/* 텍스트 컨텐츠 */}
           <div className="flex flex-col flex-1 justify-center">
             {/* 알림 메시지 */}
             <p 
               className="text-white font-semibold text-xl leading-[1.8em] tracking-[-3%] text-start"
             >
               {message}
             </p>
 
             {/* 액션 버튼 */}
             <div className="flex items-center gap-4 justify-start">
               <button
                 onClick={onAction}
                 className="text-white font-medium text-lg leading-[2em] tracking-[-3%] hover:text-blue-200 transition-colors"
               >
                 {actionText}
               </button>
               <svg width="8" height="16" viewBox="0 0 8 16" fill="none">
                 <path d="M1 1L7 8L1 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </div>
           </div>
        </div>
      </div>
  );
};

export default TopBarNotification;
