import React, { useState } from "react";
import myHomeIcon from '../../assets/MyHome/SideBar/home.svg';
import scheduleIcon from '../../assets/MyHome/SideBar/write.svg';
import recordIcon from '../../assets/MyHome/SideBar/write2.svg';
import requestCheckIcon from '../../assets/MyHome/SideBar/write.svg';
import expertNotificationIcon from '../../assets/MyHome/SideBar/notification.svg';
import notificationIcon from '../../assets/MyHome/SideBar/notification.svg';
import expertIcon from '../../assets/MyHome/SideBar/expert.svg';

const DottedIndicator: React.FC = () => {
    const createDots = (direction: 'left' | 'right') => Array.from({ length: 10 }, (_, i) => (
        <div key={`${direction}-${i}`} className="absolute bg-[#1D68FF]" style={{
            [direction === 'left' ? 'right' : 'left']: `${52 + (i * 5)}%`,
            top: '0', width: '2.5%', height: '100%'
        }} />
    ));
    return (
      <div className="absolute top-1/2 -translate-y-1/2 z-10 
                      left-28 w-20 h-1 
                      lg:left-[150px] lg:w-[80px] lg:h-[4px]">
        <div className="absolute bg-[#1D68FF] rounded-full
                        left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-5 h-5 lg:w-[25px] lg:h-[25px]" />
        {createDots('left')}
        {createDots('right')}
      </div>
    );
};
  
const OverlayIcon: React.FC<{ src: string; position: "center" | "right"; alt?: string; }> = ({ src, position, alt = "overlay" }) => {
    const positionClasses = {
        center: `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-9 lg:w-[39px] lg:h-[45px]`,
        right: `top-1/4 -right-1 -translate-y-1/2 w-4 h-4 lg:-right-[5%] lg:w-[20px] lg:h-[20px]`
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
  {
    id: 1,
    title: ['건강관리요청서', '작성하기'],
    icon: scheduleIcon,
    overlayIcon: recordIcon,
    overlayPosition: 'right',
  },
  { id: 2, title: ['내 알림'], icon: notificationIcon },
  { id: 3, title: ['매칭된 전문가'], icon: expertIcon },
];

const expertMenuItems: MenuItem[] = [
  { id: 0, title: ['마이 홈'], icon: myHomeIcon },
  { id: 1, title: ['환자 관리'], icon: expertIcon },
  { id: 2, title: ['이력서 관리'], icon: expertIcon },
  { id: 3, title: ['건강관리요청서', '확인하기'], icon: requestCheckIcon },
  { id: 4, title: ['내 알림'], icon: expertNotificationIcon },
];

const SideBar: React.FC<SideBarProps> = ({
  selectedMenu = 0,
  onMenuSelect,
  userType,
}) => {
  const [internalSelectedMenu, setInternalSelectedMenu] = useState(selectedMenu);
  const menuItems = userType === 'expert' ? expertMenuItems : patientMenuItems;
  const handleMenuClick = (index: number) => {
    setInternalSelectedMenu(index);
    onMenuSelect?.(index);
  };

  return (
    <div className="relative m-4 z-10 lg:m-0 lg:ml-[124px] lg:mt-7">
      {menuItems.map((item, index) => {
        const isSelected = internalSelectedMenu === index;
        return (
          <div
            key={item.id}
            onClick={() => handleMenuClick(index)}
            className={`
              relative flex flex-col items-center justify-center cursor-pointer 
              transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95
              w-24 h-24 mb-4 rounded-2xl gap-1
              lg:w-[150px] lg:h-[150px] lg:mb-[50px] lg:rounded-[20px] lg:gap-[12px]
              ${isSelected ? 'bg-white shadow-[0px_46px_18px_rgba(29,104,255,0.01),_0px_26px_15px_rgba(29,104,255,0.03),_0px_11px_11px_rgba(29,104,255,0.06),_0px_3px_6px_rgba(29,104,255,0.07)]' : 'bg-transparent'}
            `}
          >
            {isSelected && <DottedIndicator />}
            <div className="relative w-10 h-11 lg:w-[58px] lg:h-[65px]">
              <img src={item.icon} alt={item.title.join(" ")} className="w-full h-full object-contain" />
              {item.overlayIcon && item.overlayPosition && (
                <OverlayIcon src={item.overlayIcon} position={item.overlayPosition} alt={`${item.title.join(" ")} overlay`} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center max-w-[140px] gap-px lg:gap-[2px] lg:max-w-[180px]">
              {item.title.map((line, lineIndex) => (
                <div key={lineIndex} className="font-semibold leading-relaxed text-[#1D68FF] m-0 p-0 whitespace-nowrap break-keep text-xs lg:text-[22px]">
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