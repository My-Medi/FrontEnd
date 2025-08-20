import React, { useEffect } from "react";
import myHomeIcon from '../../../assets/MyHome/SideBar/home.svg';
import scheduleIcon from '../../../assets/MyHome/SideBar/write.svg';
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
  
const OverlayIcon: React.FC<{ src: string; position: "center" | "right"; alt?: string; eager?: boolean; }> = ({ src, position, alt = "overlay", eager = false }) => {
    const positionClasses = {
        center: `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-9 xl:w-[2.2rem] xl:h-[2.4rem]`,
        right: `top-1/4 -right-1 -translate-y-1/2 w-4 h-4 xl:-right-[5%] xl:w-[0.9rem] xl:h-[0.9rem]`
    };
    return <img 
      src={src} 
      alt={alt} 
      className={`absolute object-contain z-[2] ${positionClasses[position]}`} 
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />;
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
  { id: 1, title: ['알림'], icon: notificationIcon },
  { id: 2, title: ['매칭 전문가'], icon: expertIcon },
  {
    id: 3,
    title: ['건강관리요청서', '작성하기'],
    icon: scheduleIcon,
  },
];

const expertMenuItems: MenuItem[] = [
  { id: 0, title: ['마이 홈'], icon: myHomeIcon },
  { id: 1, title: ['환자 관리'], icon: expertIcon },
  { id: 2, title: ['이력서 관리'], icon: resumeIcon },
  { id: 3, title: ['건강관리요청서', '확인하기'], icon: checkIcon },
  { id: 4, title: ['알림'], icon: notificationIcon },
];

const SideBar: React.FC<SideBarProps> = ({
  selectedMenu = 0,
  onMenuSelect,
  userType,
}) => {
  const menuItems = userType === 'expert' ? expertMenuItems : patientMenuItems;

  // 아이콘 사전 로드로 초기 렌더/전환 체감 속도 개선
  useEffect(() => {
    const allIcons = Array.from(new Set([
      myHomeIcon,
      scheduleIcon,
      resumeIcon,
      expertIcon,
      notificationIcon,
      checkIcon,
    ]));
    const links: HTMLLinkElement[] = [];
    allIcons.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      // @ts-expect-error: fetchpriority는 일부 브라우저에서만 지원
      link.fetchpriority = 'high';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
      // 다운로드 트리거 (background 아님)
      const img = new Image();
      img.decoding = 'async';
      img.src = href;
    });
    return () => {
      links.forEach((l) => document.head.removeChild(l));
    };
  }, []);
  
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
              <img 
                src={item.icon} 
                alt={item.title.join(" ")} 
                className="w-full h-full object-contain" 
                loading={isSelected ? "eager" : "lazy"}
                fetchPriority={isSelected ? "high" : "auto"}
                decoding="async"
              />
              {item.overlayIcon && item.overlayPosition && (
                <OverlayIcon src={item.overlayIcon} position={item.overlayPosition} alt={`${item.title.join(" ")} overlay`} eager={isSelected} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center max-w-[5rem] xl:max-w-[5rem] gap-0">
              {item.title.map((line, lineIndex) => (
                <div key={lineIndex} className="font-semibold text-[#1D68FF] m-0 p-0 whitespace-nowrap break-keep text-[0.8rem] leading-[140%] tracking-[-0.0384rem]">
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