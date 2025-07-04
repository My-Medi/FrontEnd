import React from "react";
import styled from "styled-components";
import SideBar from "./SideBar";

// 피그마 기준값 (1920px 기준)
const FIGMA_WIDTH = 1920;
const BOX_LEFT = 357;
const BOX_TOP = 292;
const BOX_WIDTH = 1439;
const BOX_HEIGHT = 2493;

// 반응형 페이지 컨테이너
const PageContainer = styled.div`
  background: #FFFFFF;
  min-height: 100vh;
  width: 100%;
  position: relative;
  
  /* 가로 스크롤 방지 */
  overflow-x: hidden;
  box-sizing: border-box;
`;

// Rectangle 17454 - 해상도 비례 조정
const Rectangle17454 = styled.div`
  /* Rectangle 17454 */
  box-sizing: border-box;
  
  position: absolute;
  /* 해상도에 비례한 크기 조정 */
  width: calc(${BOX_WIDTH} * (100vw / ${FIGMA_WIDTH}));
  height: calc(${BOX_HEIGHT} * (100vw / ${FIGMA_WIDTH}));
  left: calc(${BOX_LEFT} * (100vw / ${FIGMA_WIDTH}));
  top: calc(${BOX_TOP} * (100vw / ${FIGMA_WIDTH}));
  
  background: #FFFFFF;
  /* 마이메디연블루 */
  border: 1px solid #DBE6FF;
  /* 내비 */
  box-shadow: 0px 46px 18px rgba(29, 104, 255, 0.01), 0px 26px 15px rgba(29, 104, 255, 0.03), 0px 11px 11px rgba(29, 104, 255, 0.06), 0px 3px 6px rgba(29, 104, 255, 0.07);
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
    <PageContainer>
      {/* 사이드바 메뉴들 */}
      <SideBar />
      
      <Rectangle17454>
        {children}
      </Rectangle17454>
    </PageContainer>
  );
};

export default SimpleBox;
