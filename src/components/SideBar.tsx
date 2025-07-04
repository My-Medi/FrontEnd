import React, { useState } from "react";
import styled from "styled-components";

// assets 이미지 import
import homeIcon from "../assets/home.png";
import writeIcon from "../assets/write.png";
import write2Icon from "../assets/wirte2.png";
import alramIcon from "../assets/alram.png";
import alram2Icon from "../assets/alram2.png";
import peopleIcon from "../assets/people.png";

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

// 사이드바 컨테이너
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

// 메뉴 아이템 박스
const MenuBox = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(12 * (100vw / ${FIGMA_WIDTH}));
  
  width: calc(150 * (100vw / ${FIGMA_WIDTH}));
  height: calc(150 * (100vw / ${FIGMA_WIDTH}));
  margin-bottom: calc(50 * (100vw / ${FIGMA_WIDTH}));

  background: ${(props) => (props.isSelected ? "#FFFFFF" : "transparent")};
  border: none;
  box-shadow: ${(props) =>
    props.isSelected
      ? "0px 46px 18px rgba(29, 104, 255, 0.01), 0px 26px 15px rgba(29, 104, 255, 0.03), 0px 11px 11px rgba(29, 104, 255, 0.06), 0px 3px 6px rgba(29, 104, 255, 0.07)"
      : "none"};
  border-radius: calc(20 * (100vw / ${FIGMA_WIDTH}));
  
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
    border-radius: 15px;
    gap: 8px;
  }
`;

// 아이콘 컨테이너 (겹침 효과용)
const IconContainer = styled.div`
  position: relative;
  width: calc(58 * (100vw / ${FIGMA_WIDTH}));
  height: calc(65 * (100vw / ${FIGMA_WIDTH}));
  
  @media (max-width: 480px) {
    width: 46px;
    height: 52px;
  }
`;

// 아이콘 스타일
const MenuIcon = styled.img<{ isSelected: boolean }>`
  width: calc(58 * (100vw / ${FIGMA_WIDTH}));
  height: calc(65 * (100vw / ${FIGMA_WIDTH}));
  object-fit: contain;
  
  @media (max-width: 480px) {
    width: 46px;
    height: 52px;
  }
`;

// 겹침 아이콘 스타일
const OverlayIcon = styled.img<{ position: "center" | "right" }>`
  position: absolute;
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
  object-fit: contain;
  z-index: 2;
  
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

// 텍스트 컨테이너
const MenuTextContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: calc(2 * (100vw / ${FIGMA_WIDTH}));
  max-width: calc(180 * (100vw / ${FIGMA_WIDTH}));
  
  @media (max-width: 480px) {
    max-width: 140px;
    gap: 1px;
  }
`;

// 텍스트 스타일
const MenuText = styled.div<{ isSelected: boolean }>`
  font-family: "Pretendard", sans-serif;
  font-weight: 600; /* SemiBold */
  font-size: calc(22 * (100vw / ${FIGMA_WIDTH}));
  line-height: 1.4; /* 140% */
  letter-spacing: 0%;
  text-align: center;
  color: #1d68ff;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  word-break: keep-all;
  
  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 1.4;
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
  const [selected, setSelected] = useState<number>(selectedMenu);
  
  const handleMenuClick = (index: number) => {
    setSelected(index);
    onMenuSelect?.(index);
  };
  
  return (
    <SideBarContainer>
      {menuItems.map((item) => (
        <MenuBox
          key={item.id}
          isSelected={selected === item.id}
          onClick={() => handleMenuClick(item.id)}
        >
          <IconContainer>
            <MenuIcon
              src={item.icon}
              alt={item.title.join(" ")}
              isSelected={selected === item.id}
            />
            {item.overlayIcon && (
              <OverlayIcon
                src={item.overlayIcon}
                alt={`${item.title.join(" ")} overlay`}
                position={item.overlayPosition || "center"}
              />
            )}
          </IconContainer>
          <MenuTextContainer isSelected={selected === item.id}>
            {item.title.map((line, index) => (
              <MenuText key={index} isSelected={selected === item.id}>
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
