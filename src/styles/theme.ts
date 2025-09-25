import { css } from 'styled-components';

/* TODO: 폰트 설정 디자인에 맞춰서 변경 */
const createFontStyle = (
  size: number,
  weight: number,
  lineHeightPercent: number,
  letterSpacing: number = 0,
) => css`
  font-family:
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: ${size}rem;
  font-style: normal;
  font-weight: ${weight};
  line-height: ${lineHeightPercent}%;
  letter-spacing: ${letterSpacing}rem;
`;

// TODO: 디자인에 컬러 보드에 맞춰 변경 
const colors = {
  primary: {
    main: '#000000',      // 
  },
  secondary: {

  },
  grayScale: {
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
    black: '#000000',
  },
};

// TODO: 디자인 가이드에 맞춰 폰트 두께 및 사이즈 관리 (아래는 예시 (지피티한테 부탁한 더미))
const fonts = {
  display: {
    large: createFontStyle(3.5, 800, 110, -0.07),    // 56px
    medium: createFontStyle(2.875, 700, 115, -0.0575), // 46px
    small: createFontStyle(2.25, 700, 120, -0.045),    // 36px
  },
  heading: {
    h1: createFontStyle(2, 700, 125, -0.04),         // 32px
    h2: createFontStyle(1.75, 600, 130, -0.035),     // 28px
    h3: createFontStyle(1.5, 600, 135, -0.03),       // 24px
    h4: createFontStyle(1.25, 600, 140, -0.025),     // 20px
    h5: createFontStyle(1.125, 500, 145, -0.0225),   // 18px
    h6: createFontStyle(1, 500, 150, -0.02),         // 16px
  },
  body: {
    large: createFontStyle(1.125, 400, 155, -0.0225), // 18px
    medium: createFontStyle(1, 400, 150, -0.02),      // 16px
    small: createFontStyle(0.875, 400, 145, -0.0175), // 14px
    xsmall: createFontStyle(0.75, 400, 140, -0.015),  // 12px
  },
  label: {
    large: createFontStyle(1, 500, 150, -0.02),       // 16px
    medium: createFontStyle(0.875, 500, 145, -0.0175), // 14px
    small: createFontStyle(0.75, 500, 140, -0.015),    // 12px
  },
};

// TODO: 디자인 반영하여 이팩트 조절
const effects = {
  shadows: {
   
  },
  blur: {
   
  },
  backdropBlur: {
   
  },
};

// TODO: 반응형을 위한 브레이크 포인트 정의 - 기기 단위가 아닌 화면 사이즈 단위로 나누기! (디자인 가이드 참고해서 수정)
const breakpoints = {
  small: '768px',
  medium: '1024px',
  large: '1280px',
} as const;

const media = {
  mobile: `@media (max-width: ${breakpoints.small})`,
  tablet: `@media (max-width: ${breakpoints.medium})`,
  desktop: `@media (min-width: ${breakpoints.large})`,
  hover: '@media (hover: hover) and (pointer: fine)',
} as const;

export const theme = {
  colors,
  fonts,
  effects,
  breakpoints,
  media,
} as const;

export type ThemeType = typeof theme;