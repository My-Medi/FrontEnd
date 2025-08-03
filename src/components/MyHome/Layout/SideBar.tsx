import React from "react";
import myHomeIcon from '../../../assets/MyHome/SideBar/home.svg';
import scheduleIcon from '../../../assets/MyHome/SideBar/write.svg';
import recordIcon from '../../../assets/MyHome/SideBar/write2.svg';
import resumeIcon from '../../../assets/MyHome/SideBar/resume.svg';
import expertIcon from '../../../assets/MyHome/SideBar/expert.svg';
import notificationIcon from '../../../assets/MyHome/SideBar/notification.svg';
import checkIcon from '../../../assets/MyHome/SideBar/check.svg';

const DottedIndicator: React.FC = () => {
    return (
      <div className="hidden xl:block absolute top-1/2 -translate-y-1/2 z-10 
                      left-[5.3rem] w-[1.6rem] h-[0.6rem]">
        <div className="absolute bg-[#1D68FF] rounded-full
                        left-0 top-1/2 -translate-y-1/2
                        w-[0.6rem] h-[0.6rem]" />
        <div className="absolute left-[0.6rem] top-1/2 -translate-y-1/2 w-[1.25rem] h-[0.2rem] flex items-center">
          <div className="w-[0.125rem] h-[0.2rem] bg-[#1D68FF] mr-[0.125rem]"></div>
          <div className="w-[0.125rem] h-[0.2rem] bg-[#1D68FF] mr-[0.125rem]"></div>
          <div className="w-[0.125rem] h-[0.2rem] bg-[#1D68FF] mr-[0.125rem]"></div>
          <div className="w-[0.125rem] h-[0.2rem] bg-[#1D68FF] mr-[0.125rem]"></div>
          <div className="w-[0.125rem] h-[0.2rem] bg-[#1D68FF]"></div>
        </div>
      </div>
    );
};
  
const OverlayIcon: React.FC<{ src: string; position: "center" | "right"; alt?: string; }> = ({ src, position, alt = "overlay" }) => {
    const positionClasses = {
        center: `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-9 xl:w-[2.2rem] xl:h-[2.4rem]`,
        right: `top-1/4 -right-1 -translate-y-1/2 w-4 h-4 xl:-right-[5%] xl:w-[0.9rem] xl:h-[0.9rem]`
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
  { id: 2, title: ['이력서 관리'], icon: resumeIcon },
  { id: 3, title: ['건강관리요청서', '확인하기'], icon: checkIcon },
  { id: 4, title: ['내 알림'], icon: notificationIcon },
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
    <div className="flex xl:block relative xl:m-0 xl:pb-6 xl:pt-8 gap-2 xl:gap-0 px-4 xl:px-0">
      {menuItems.map((item, index) => {
        const isSelected = selectedMenu === index;
        return (
          <div
            key={item.id}
            onClick={() => handleMenuClick(index)}
            className={`
              relative flex flex-col items-center justify-center cursor-pointer 
              transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95
              w-20 h-20 xl:w-[5.6rem] xl:h-[5.6rem] rounded-2xl xl:rounded-[0.75rem] gap-1 xl:gap-[0.375rem] xl:mb-6
              ${isSelected ? 'bg-white shadow-[0px_2.4px_4.8px_rgba(29,104,255,0.07),_0px_8.8px_8.8px_rgba(29,104,255,0.06),_0px_20.8px_12px_rgba(29,104,255,0.03),_0px_36.8px_14.4px_rgba(29,104,255,0.01),_0px_56.8px_16px_rgba(29,104,255,0)]' : 'bg-transparent'}
            `}
          >
            {isSelected && <DottedIndicator />}
            <div className="relative w-8 h-9 xl:w-[2.2rem] xl:h-[2.4rem]">
              <img src={item.icon} alt={item.title.join(" ")} className="w-full h-full object-contain" />
              {item.overlayIcon && item.overlayPosition && (
                <OverlayIcon src={item.overlayIcon} position={item.overlayPosition} alt={`${item.title.join(" ")} overlay`} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center max-w-[5rem] xl:max-w-[5rem] gap-px xl:gap-[0.125rem]">
              {item.title.map((line, lineIndex) => (
                <div key={lineIndex} className="font-semibold leading-relaxed text-[#1D68FF] m-0 p-0 whitespace-nowrap break-keep text-xs xl:text-[0.8rem]">
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