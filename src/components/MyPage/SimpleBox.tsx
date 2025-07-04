import React from "react";
import styled from "styled-components";
import SideBar from "./SideBar";

// 피그마 기준값 (1920px 기준)
const FIGMA_WIDTH = 1920;
const BOX_LEFT = 357;
const BOX_TOP = 292;
const BOX_WIDTH = 1439;
const BOX_HEIGHT = 2493;

// Rectangle 17454 - 하이브리드: Tailwind + styled-components
const Rectangle17454 = styled.div`
  /* 복잡한 계산식과 positioning만 styled-components로 */
  box-sizing: border-box;
  position: absolute;

  /* 해상도에 비례한 크기 조정 */
  width: calc(${BOX_WIDTH} * (100vw / ${FIGMA_WIDTH}));
  height: calc(${BOX_HEIGHT} * (100vw / ${FIGMA_WIDTH}));
  left: calc(${BOX_LEFT} * (100vw / ${FIGMA_WIDTH}));
  top: calc(${BOX_TOP} * (100vw / ${FIGMA_WIDTH}));
  border-radius: 60px;

  /* 작은 화면 대응 */
  @media (max-width: 480px) {
    position: relative;
    left: 0;
    top: 0;
    width: calc(100% - 2rem);
    height: auto;
    margin: 1rem;
    border-radius: 30px;
    min-height: calc(100vh - 2rem);
  }
`;

const SimpleBox: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white min-h-screen w-full relative overflow-x-hidden">
      {/* 사이드바 메뉴들 */}
      <SideBar />

      <Rectangle17454 className="bg-white border border-blue-200 shadow-lg">
        {children}
      </Rectangle17454>
    </div>
  );
};

export default SimpleBox;
