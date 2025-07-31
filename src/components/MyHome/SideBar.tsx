import React, { useState } from "react";
import myHomeIcon from '../../assets/MyHome/SideBar/home.svg';
import scheduleIcon from '../../assets/MyHome/SideBar/write.svg';
import recordIcon from '../../assets/MyHome/SideBar/write2.svg';
import expertNotificationIcon from '../../assets/MyHome/SideBar/notification.svg';
import notificationIcon from '../../assets/MyHome/SideBar/notification.svg';
import expertIcon from '../../assets/MyHome/SideBar/expert.svg';
import resuumeIcon from '../../assets/MyHome/SideBar/resume.svg';
import checkIcon from '../../assets/MyHome/SideBar/check.svg';

const DottedIndicator: React.FC = () => {
    return (
      <div className="absolute top-1/2 -translate-y-1/2 z-10 
                      left-[85.2px] w-[25.6px] h-[9.6px] 
                      lg:left-[85.2px] lg:w-[25.6px] lg:h-[9.6px]">
        <div className="absolute bg-[#1D68FF] rounded-full
                        left-0 top-1/2 -translate-y-1/2
                        w-[9.6px] h-[9.6px] lg:w-[9.6px] lg:h-[9.6px]" />
        <div className="absolute left-[9.6px] top-1/2 -translate-y-1/2 w-[20px] h-[3.2px] flex items-center">
          <div className="w-[2px] h-[3.2px] bg-[#1D68FF] mr-[2px]"></div>
          <div className="w-[2px] h-[3.2px] bg-[#1D68FF] mr-[2px]"></div>
          <div className="w-[2px] h-[3.2px] bg-[#1D68FF] mr-[2px]"></div>
          <div className="w-[2px] h-[3.2px] bg-[#1D68FF] mr-[2px]"></div>
          <div className="w-[2px] h-[3.2px] bg-[#1D68FF]"></div>
        </div>
      </div>
    );
};
  
const OverlayIcon: React.FC<{ src: string; position: "center" | "right"; alt?: string; }> = ({ src, position, alt = "overlay" }) => {
    const positionClasses = {
        center: `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-9 lg:w-[35px] lg:h-[39px]`,
        right: `top-1/4 -right-1 -translate-y-1/2 w-4 h-4 lg:-right-[5%] lg:w-[15px] lg:h-[15px]`
    };
    return <img src={src} alt={alt} className={`absolute object-contain z-[2] ${positionClasses[position]}`} />;
};

interface MenuItem {
  id: number;
  title: string[];
  icon: string;
  overlayIcon?: string;
  overlayPosition?: "center" | "right";
}

interface SideBarProps {
  selectedMenu?: number;
  onMenuSelect?: (index: number) => void;
  userType: 'patient' | 'expert';
}

const patientMenuItems: MenuItem[] = [
  { id: 0, title: ['마이 홈'], icon: myHomeIcon },
  { id: 1, title: ['내 알림'], icon: notificationIcon },
  { id: 2, title: ['매칭 전문가'], icon: expertIcon },
  {
    id: 3,
    title: ['건강관리요청서', '작성하기'],
    icon: scheduleIcon,
    overlayIcon: recordIcon,
    overlayPosition: 'right',
  },
];

const expertMenuItems: MenuItem[] = [
  { id: 0, title: ['마이 홈'], icon: myHomeIcon },
  { id: 1, title: ['환자 관리'], icon: expertIcon },
  { id: 2, title: ['이력서 관리'], icon: resuumeIcon },
  { id: 3, title: ['건강관리요청서', '확인하기'], icon: checkIcon },
  { id: 4, title: ['내 알림'], icon: expertNotificationIcon },
];

const SideBar: React.FC<SideBarProps> = ({
  selectedMenu = 0,
  onMenuSelect,
  userType,
}) => {
  const menuItems = userType === 'expert' ? expertMenuItems : patientMenuItems;
  const handleMenuClick = (index: number) => {
    onMenuSelect?.(index);
  };

  return (
    <div className="relative m-6 z-10 lg:m-0 lg:pb-6 lg:pt-8">
      {menuItems.map((item, index) => {
        const isSelected = selectedMenu === index;
        return (
          <div
            key={item.id}
            onClick={() => handleMenuClick(index)}
            className={`
              relative flex flex-col items-center justify-center cursor-pointer 
              transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95
              w-24 h-24 mb-4 rounded-2xl gap-1
              lg:w-[90px] lg:h-[90px] lg:mb-6 lg:rounded-[12px] lg:gap-[6px]
              ${isSelected ? 'bg-white shadow-[0px_2.4px_4.8px_rgba(29,104,255,0.07),_0px_8.8px_8.8px_rgba(29,104,255,0.06),_0px_20.8px_12px_rgba(29,104,255,0.03),_0px_36.8px_14.4px_rgba(29,104,255,0.01),_0px_56.8px_16px_rgba(29,104,255,0)]' : 'bg-transparent'}
            `}
          >
            {isSelected && <DottedIndicator />}
            <div className="relative w-10 h-11 lg:w-[35px] lg:h-[39px]">
              <img src={item.icon} alt={item.title.join(" ")} className="w-full h-full object-contain" />
              {item.overlayIcon && item.overlayPosition && (
                <OverlayIcon src={item.overlayIcon} position={item.overlayPosition} alt={`${item.title.join(" ")} overlay`} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center max-w-[140px] gap-px lg:gap-[2px] lg:max-w-[80px]">
              {item.title.map((line, lineIndex) => (
                <div key={lineIndex} className="font-semibold leading-relaxed text-[#1D68FF] m-0 p-0 whitespace-nowrap break-keep text-xs lg:text-[12.8px]">
                  {line}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar; 