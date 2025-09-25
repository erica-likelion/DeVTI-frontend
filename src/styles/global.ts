import { fontFaces } from '@/styles/fonts';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ${fontFaces}

  :root {
    /* TODO: 반응형 폰트 사이즈 조정 */
    font-size: 16px;

    @media (max-width: 768px) {
      font-size: 15px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }

    @media (max-width: 360px) {
      font-size: 13px;
    }
  }

  html, body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    
    /* TODO: 프로젝트 특성에 맞는 기본 폰트 설정 */
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    
    /* TODO: overscroll 동작 조정 */
    overscroll-behavior: none;
    
    /* TODO: 배경색 설정 - 현재 흰색 */
    background-color: ${(props) => props.theme.colors.grayScale.white};
  }

  #root {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
    
    /* TODO: 스크롤바 숨김 여부 결정 */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }


  /* TODO: 버튼 기본 스타일 리셋 */
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
  }

  /* TODO: 입력 필드 기본 스타일 리셋 */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
  }


  /* TODO: 이미지 기본 스타일 */
  img {
    max-width: 100%;
    height: auto;
  }

  /* TODO: Safari에서 SVG 최적화가 필요한 경우 활성화 */
  /* @supports (-webkit-appearance: none) {
    svg {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
  } */
`;