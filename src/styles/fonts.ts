import { css } from 'styled-components';

/** 기본 폰트: pretendard 유지 */
export const fontFaces = css`
  @font-face {
    font-family: Pretendard;
    font-weight: 400;
    src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 500;
    src: url('/fonts/Pretendard-Medium.woff2') format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 600;
    src: url('/fonts/Pretendard-SemiBold.woff2') format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 700;
    src: url('/fonts/Pretendard-Bold.woff2') format('woff2');
  }
`;