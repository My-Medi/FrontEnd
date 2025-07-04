import React, { useState } from "react";
import styled from "styled-components";

// assets 이미지 import (MyPage 폴더에서 올바른 경로)
import homeIcon from "../../assets/home.png";
import writeIcon from "../../assets/write.png";
import write2Icon from "../../assets/wirte2.png";
import alramIcon from "../../assets/alram.png";
import alram2Icon from "../../assets/alram2.png";
import peopleIcon from "../../assets/people.png";

// 피그마 기준값 (1920px 기준)
const FIGMA_WIDTH = 1920;

// 메뉴 데이터 타입
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
    overlayIcon: alram2Icon,
    overlayPosition: "center",
  },
  { id: 3, title: ["매칭된 전문가"], icon: peopleIcon },
];

// 사이드바 컨테이너 - 계산식만 styled-components
const SideBarContainer = styled.div`
  position: absolute;
  left: calc(124 * (100vw / ${FIGMA_WIDTH}));
  top: calc(320 * (100vw / ${FIGMA_WIDTH}));
  z-index: 10;
  
  @media (max-width: 480px) {
    position: relative;
    left: 0;
    top: 0;
    margin: 1rem;
  }
`;

// 메뉴 아이템 박스 - 하이브리드
const MenuBox = styled.div<{ isSelected: boolean }>`
  /* 복잡한 계산식과 동적 스타일만 styled-components */
  gap: calc(12 * (100vw / ${FIGMA_WIDTH}));
  width: calc(150 * (100vw / ${FIGMA_WIDTH}));
  height: calc(150 * (100vw / ${FIGMA_WIDTH}));
  margin-bottom: calc(50 * (100vw / ${FIGMA_WIDTH}));
  border-radius: calc(20 * (100vw / ${FIGMA_WIDTH}));

  background: ${(props) => (props.isSelected ? "#FFFFFF" : "transparent")};
  box-shadow: ${(props) =>
    props.isSelected
      ? "0px 46px 18px rgba(29, 104, 255, 0.01), 0px 26px 15px rgba(29, 104, 255, 0.03), 0px 11px 11px rgba(29, 104, 255, 0.06), 0px 3px 6px rgba(29, 104, 255, 0.07)"
      : "none"};
  
  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
    border-radius: 15px;
    gap: 8px;
  }
`;

// 아이콘 컨테이너 - 계산식만 styled-components
const IconContainer = styled.div`
  position: relative;
  width: calc(58 * (100vw / ${FIGMA_WIDTH}));
  height: calc(65 * (100vw / ${FIGMA_WIDTH}));
  
  @media (max-width: 480px) {
    width: 46px;
    height: 52px;
  }
`;

// 아이콘 스타일 - 계산식만 styled-components
const MenuIcon = styled.img<{ isSelected: boolean }>`
  width: calc(58 * (100vw / ${FIGMA_WIDTH}));
  height: calc(65 * (100vw / ${FIGMA_WIDTH}));
  
  @media (max-width: 480px) {
    width: 46px;
    height: 52px;
  }
`;

// 겹침 아이콘 스타일 - 복잡한 계산식과 positioning
const OverlayIcon = styled.img<{ position: "center" | "right" }>`
  position: absolute;
  z-index: 2;
  
  ${(props) =>
    props.position === "center"
      ? `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(39.39 * (100vw / ${FIGMA_WIDTH}));
    height: calc(44.53 * (100vw / ${FIGMA_WIDTH}));
  `
      : `
    top: 25%;
    right: -5%;
    transform: translateY(-50%);
    width: calc(20 * (100vw / ${FIGMA_WIDTH}));
    height: calc(20 * (100vw / ${FIGMA_WIDTH}));
  `}
  
  @media (max-width: 480px) {
    ${(props) =>
      props.position === "center"
        ? `
      width: 31px;
      height: 35px;
    `
        : `
      width: 16px;
      height: 16px;
      right: -2px;
    `}
  }
`;

// 텍스트 컨테이너 - 계산식만 styled-components
const MenuTextContainer = styled.div<{ isSelected: boolean }>`
  gap: calc(2 * (100vw / ${FIGMA_WIDTH}));
  max-width: calc(180 * (100vw / ${FIGMA_WIDTH}));
  
  @media (max-width: 480px) {
    max-width: 140px;
    gap: 1px;
  }
`;

// 텍스트 스타일 - 계산식만 styled-components
const MenuText = styled.div<{ isSelected: boolean }>`
  font-size: calc(22 * (100vw / ${FIGMA_WIDTH}));
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

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

  return (
    <SideBarContainer>
      {menuItems.map((item, index) => (
        <MenuBox
          key={item.id}
          isSelected={internalSelectedMenu === index}
          onClick={() => handleMenuClick(index)}
          className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <IconContainer>
            <MenuIcon
              src={item.icon}
              alt={item.title.join(" ")}
              isSelected={internalSelectedMenu === index}
              className="object-contain"
            />
            {item.overlayIcon && (
              <OverlayIcon
                src={item.overlayIcon}
                alt="overlay"
                position={item.overlayPosition || "center"}
                className="object-contain"
              />
            )}
          </IconContainer>

          <MenuTextContainer
            isSelected={internalSelectedMenu === index}
            className="flex flex-col items-center justify-center text-center"
          >
            {item.title.map((line, lineIndex) => (
              <MenuText
                key={lineIndex}
                isSelected={internalSelectedMenu === index}
                className="font-semibold leading-relaxed text-blue-600 m-0 p-0 whitespace-nowrap break-keep"
              >
                {line}
              </MenuText>
            ))}
          </MenuTextContainer>
        </MenuBox>
      ))}
    </SideBarContainer>
  );
};

export default SideBar; 