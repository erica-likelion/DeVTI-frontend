import { css } from 'styled-components';

/* 폰트 (완료) */
const createFontStyle = (
  size: number | { wide?: number; desktop?: number; tablet?: number; mobile: number },
  weight: number,
  lineHeight: number | { wide?: number; desktop?: number; tablet?: number; mobile: number },
  letterSpacing: number | { wide?: number; desktop?: number; tablet?: number; mobile: number } = 0,
) => {
  const fontSize = typeof size === 'number' ? size : size.mobile;
  const lineHeightValue = typeof lineHeight === 'number' ? lineHeight : lineHeight.mobile;
  const letterSpacingValue = typeof letterSpacing === 'number' ? letterSpacing : (letterSpacing?.mobile || 0);
  
  return css`
    font-family:
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    font-size: ${fontSize}rem;
    font-style: normal;
    font-weight: ${weight};
    line-height: ${lineHeightValue}rem;
    letter-spacing: ${letterSpacingValue}rem;
    
    ${typeof size === 'object' ? css`
      ${media.tablet} {
        font-size: ${size.tablet || size.desktop || size.wide || size.mobile}rem;
        line-height: ${typeof lineHeight === 'object' ? (lineHeight.tablet || lineHeight.desktop || lineHeight.wide || lineHeight.mobile) : lineHeight}rem;
        letter-spacing: ${typeof letterSpacing === 'object' ? (letterSpacing.tablet || letterSpacing.desktop || letterSpacing.wide || letterSpacing.mobile || 0) : letterSpacing}rem;
      }
      
      ${media.desktop} {
        font-size: ${size.desktop || size.tablet || size.wide || size.mobile}rem;
        line-height: ${typeof lineHeight === 'object' ? (lineHeight.desktop || lineHeight.tablet || lineHeight.wide || lineHeight.mobile) : lineHeight}rem;
        letter-spacing: ${typeof letterSpacing === 'object' ? (letterSpacing.desktop || letterSpacing.tablet || letterSpacing.wide || letterSpacing.mobile || 0) : letterSpacing}rem;
      }
      
      ${media.wide} {
        font-size: ${size.wide || size.desktop || size.tablet || size.mobile}rem;
        line-height: ${typeof lineHeight === 'object' ? (lineHeight.wide || lineHeight.desktop || lineHeight.tablet || lineHeight.mobile) : lineHeight}rem;
        letter-spacing: ${typeof letterSpacing === 'object' ? (letterSpacing.wide || letterSpacing.desktop || letterSpacing.tablet || letterSpacing.mobile || 0) : letterSpacing}rem;
      }
    ` : ''}
  `;
};

// 컬러보드 디자인 시스템 반영 (세컨더리 조절)
const colors = {
  primary: {
    VT500: '#973EE9',
    MT500: '#6CC8C2',      
  },
  secondary: {
    VT700: '#7E19DC',
    VT100: '#F5EEFB',
    MT500: '#66D7BC',
    MT100: '#F2FCF9',

  },
  grayScale: {
    white: '#FCFCFF',
    gray50: '#F6F7FA',
    gray100: '#EEF0F5',
    gray200: '#E1E4EB',
    gray300: '#D0D2DC',
    gray400: '#C0C2CF',
    gray500: '#A3A9BC',
    gray600: '#8A8DA0',
    gray700: '#6F7587',
    gray800: '#575D6B',
    gray900: '#3B3F48',
    black: '#19181D',
  },
};

// TODO: 디자인 가이드에 맞춰 폰트 두께 및 사이즈 관리 (아래는 예시 (지피티한테 부탁한 더미))
const fonts = {
  display: {
    large: createFontStyle(
      { tablet: 3.5, mobile: 2.5 }, 
      800, 
      { tablet: 3.85, mobile: 2.75 }, 
      -0.07
    ),
    medium: createFontStyle(
      { tablet: 2.875, mobile: 2 }, 
      700, 
      { tablet: 3.3, mobile: 2.3 }, 
      -0.0575
    ),
    small: createFontStyle(
      { tablet: 2.25, mobile: 1.75 }, 
      700, 
      { tablet: 2.7, mobile: 2.1 }, 
      -0.045
    ),
  },
  heading: {
    Extra: createFontStyle(
      { tablet: 3, mobile: 1.5 }, 
      700, 
      { tablet: 4.5, mobile: 2.25 }, 
      { tablet: -0.06, mobile: -0.03 }
    ),  
    h1: createFontStyle(
      { tablet: 1.75, mobile: 1.25 }, 
      600,
      { tablet: 2.625, mobile: 1.875 },
      { tablet: -0.035, mobile: -0.025 }
    ),      
    h2: createFontStyle(
      { tablet: 1.25, mobile: 1.125 }, 
      600, 
      { tablet: 2, mobile: 1.69 }, 
      { tablet: -0.025, mobile: -0.0225 }
    ),     
    h3: createFontStyle(
      { tablet: 1.125, mobile: 1 }, 
      600, 
      { tablet: 1.75, mobile: 1.5 }, 
      { tablet: -0.0225, mobile: -0.02 }
    ),       
    h4: createFontStyle(
      { tablet: 1, mobile: 0.875 }, 
      600, 
      { tablet: 1.5, mobile: 1.31 }, 
      { tablet: -0.02, mobile: -0.0175 }
    ),     
    h5: createFontStyle(
      { tablet: 1.125, mobile: 0.875 }, 
      600, 
      { tablet: 1.63, mobile: 1.31 }, 
      { tablet: -0.0225, mobile: -0.0175 }
    ),   
          
  },
  body: {
    large: createFontStyle(
      { tablet: 1.125, mobile: 1 }, 
      400, 
      { tablet: 1.74, mobile: 1.5 }, 
      { tablet: -0.0225, mobile: -0.02 }
    ),
    medium: createFontStyle(
      { tablet: 1, mobile: 0.875 }, 
      400, 
      { tablet: 1.5, mobile: 1.31 }, 
      { tablet: -0.02, mobile: -0.0175 }
    ),
    small: createFontStyle(
      { tablet: 0.875, mobile: 0.75 }, 
      400, 
      { tablet: 1.27, mobile: 1.125 }, 
      { tablet: -0.0175, mobile: -0.015 }
    ),
    xsmall: createFontStyle(
      { tablet: 0.75, mobile: 0.625 }, 
      400, 
      { tablet: 1.05, mobile: 0.9375 }, 
      { tablet: -0.015, mobile: -0.0125 }
    ),
  },
  label: {
    large: createFontStyle(
      { tablet: 1, mobile: 0.875 }, 
      500, 
      { tablet: 1.5, mobile: 1.31 }, 
      { tablet: -0.02, mobile: -0.0175 }
    ),
    medium: createFontStyle(
      { tablet: 0.875, mobile: 0.75 }, 
      500, 
      { tablet: 1.27, mobile: 1.125 }, 
      { tablet: -0.0175, mobile: -0.015 }
    ),
    small: createFontStyle(
      { tablet: 0.75, mobile: 0.625 }, 
      500, 
      { tablet: 1.05, mobile: 0.9375 }, 
      { tablet: -0.015, mobile: -0.0125 }
    ),
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
  gradients: {
    primary: 'linear-gradient(83deg, var(--Colors-Primary-VT500, #973EE9) 9.02%, var(--Colors-Secondary-MT500, #66D7BC) 90.81%)',
    grayscale: 'linear-gradient(83deg, var(--Colors-Gray-Scale-GY300, #D0D2DC) 9.02%, var(--Colors-Gray-Scale-GY700, #6F7587) 90.81%)',
  },
};

// TODO: 반응형을 위한 브레이크 포인트 정의 - 기기 단위가 아닌 화면 사이즈 단위로 나누기! (디자인 가이드 참고해서 수정)
const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
  wide: '1440px',
} as const;

const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
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