import React, { useState } from "react";

// assets 이미지 import (MyPage 폴더에서 올바른 경로)
import homeIcon from "../../assets/Myhome/home.png";
import writeIcon from "../../assets/Myhome/write.png";
import write2Icon from "../../assets/Myhome/wirte2.png";
import alramIcon from "../../assets/Myhome/alarm.png";
import peopleIcon from "../../assets/Myhome/people.png";

const STYLES = {
  container: "absolute left-[calc(124*100vw/1920)] top-[calc(320*100vw/1920)] z-10 max-[480px]:relative max-[480px]:left-0 max-[480px]:top-0 max-[480px]:m-4",
  
  menuItem: {
    base: "relative flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95",
    dimensions: "gap-[calc(12*100vw/1920)] w-[calc(150*100vw/1920)] h-[calc(150*100vw/1920)] mb-[calc(50*100vw/1920)] rounded-[calc(20*100vw/1920)]",
    responsive: "max-[480px]:w-[120px] max-[480px]:h-[120px] max-[480px]:mb-4 max-[480px]:rounded-[15px] max-[480px]:gap-[8px]"
  },
  
  icon: {
    container: "relative w-[calc(58*100vw/1920)] h-[calc(65*100vw/1920)] max-[480px]:w-[46px] max-[480px]:h-[52px]",
    image: "w-[calc(58*100vw/1920)] h-[calc(65*100vw/1920)] max-[480px]:w-[46px] max-[480px]:h-[52px] object-contain"
  },
  
  title: {
    container: "flex flex-col items-center justify-center text-center gap-[calc(2*100vw/1920)] max-w-[calc(180*100vw/1920)] max-[480px]:max-w-[140px] max-[480px]:gap-[1px]",
    text: "font-semibold leading-relaxed text-blue-600 m-0 p-0 whitespace-nowrap break-keep text-[calc(22*100vw/1920)] max-[480px]:text-[16px]"
  }
};

const DottedIndicator: React.FC = () => {
  const createDots = (direction: 'left' | 'right') => {
    return Array.from({ length: 8 }, (_, i) => (
      <div
        key={`${direction}-${i}`}
        className="absolute bg-[#1D68FF]"
        style={{
          [direction === 'left' ? 'right' : 'left']: `${53 + (i * 6)}%`,
          top: '0',
          width: '3%',
          height: '100%'
        }}
      />
    ));
  };

  return (
    <div 
      className="absolute"
      style={{
        top: '50%',
        left: 'calc(150 * 100vw / 1920)',
        width: 'calc(80 * 100vw / 1920)',
        height: 'calc(4 * 100vw / 1920)',
        transform: 'translateY(-50%)',
        zIndex: 10
      }}
    >
      {/* 왼쪽 점선 */}
      {createDots('left')}
      
      {/* 중앙 원 */}
      <div
        className="absolute bg-[#1D68FF] rounded-full"
        style={{
          left: '50%',
          top: '50%',
          width: 'calc(25 * 100vw / 1920)',
          height: 'calc(25 * 100vw / 1920)',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* 오른쪽 점선 */}
      {createDots('right')}
    </div>
  );
};

const OverlayIcon: React.FC<{ 
  src: string; 
  position: "center" | "right"; 
  alt?: string; 
}> = ({ src, position, alt = "overlay" }) => {
  const positionStyles = {
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(39.39*100vw/1920)] h-[calc(44.53*100vw/1920)] max-[480px]:w-[31px] max-[480px]:h-[35px]",
    right: "top-1/4 -right-[5%] transform -translate-y-1/2 w-[calc(20*100vw/1920)] h-[calc(20*100vw/1920)] max-[480px]:w-[16px] max-[480px]:h-[16px] max-[480px]:-right-[2px]"
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`absolute object-contain z-[2] ${positionStyles[position]}`}
    />
  );
};

interface MenuItem {
  id: number;
  title: string[];
  icon: string;
  overlayIcon?: string;
  overlayPosition?: "center" | "right";
}

// 메뉴 데이터
const menuItems: MenuItem[] = [
  { id: 0, title: ["마이 홈"], icon: homeIcon },
  {
    id: 1,
    title: ["건강관리요청서", "작성하기"],
    icon: writeIcon,
    overlayIcon: write2Icon,
    overlayPosition: "right",
  },
  {
    id: 2,
    title: ["내 알림"],
    icon: alramIcon,
  },
  { id: 3, title: ["매칭된 전문가"], icon: peopleIcon },
];

interface SideBarProps {
  selectedMenu?: number;
  onMenuSelect?: (menuIndex: number) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  selectedMenu = 0,
  onMenuSelect,
}) => {
  const [internalSelectedMenu, setInternalSelectedMenu] = useState(selectedMenu);

  const handleMenuClick = (index: number) => {
    setInternalSelectedMenu(index);
    onMenuSelect?.(index);
  };

  const getMenuItemStyles = (isSelected: boolean) => ({
    className: `
      ${STYLES.menuItem.base}
      ${STYLES.menuItem.dimensions}
      ${STYLES.menuItem.responsive}
      ${isSelected ? 'bg-white' : 'bg-transparent'}
    `,
    boxShadow: isSelected 
      ? '0px 46px 18px rgba(29, 104, 255, 0.01), 0px 26px 15px rgba(29, 104, 255, 0.03), 0px 11px 11px rgba(29, 104, 255, 0.06), 0px 3px 6px rgba(29, 104, 255, 0.07)'
      : 'none'
  });

  return (
    <div className={STYLES.container}>
      {menuItems.map((item, index) => {
        const isSelected = internalSelectedMenu === index;
        const menuStyles = getMenuItemStyles(isSelected);
        
        return (
          <div
            key={item.id}
            onClick={() => handleMenuClick(index)}
            className={menuStyles.className}
            style={{ boxShadow: menuStyles.boxShadow }}
          >
            {isSelected && <DottedIndicator />}


            <div className={STYLES.icon.container}>
              <img
                src={item.icon}
                alt={item.title.join(" ")}
                className={STYLES.icon.image}
              />
              {item.overlayIcon && item.overlayPosition && (
                <OverlayIcon 
                  src={item.overlayIcon} 
                  position={item.overlayPosition}
                  alt={`${item.title.join(" ")} overlay`}
                />
              )}
            </div>
            <div className={STYLES.title.container}>
              {item.title.map((line, lineIndex) => (
                <div key={lineIndex} className={STYLES.title.text}>
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