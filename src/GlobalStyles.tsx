import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Reset and base styles */
  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    
    /* 폰트 최적화 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* 사용자 선택 설정 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: text; /* 텍스트는 선택 가능 */
  }
  
  body {
    background-color: #ffffff;
    min-height: 100vh;
    width: 100%;
    
    /* 가로 스크롤 허용 (작은 화면에서 필요) */
    overflow-x: auto;
    overflow-y: auto;
    
    /* 부드러운 스크롤 */
    scroll-behavior: smooth;
  }
  
  #root {
    position: relative;
    min-height: 100vh;
    width: 100%;
  }
  
  /* Pretendard 폰트 로드 */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css');
`;

export default GlobalStyles; 