import { css } from 'styled-components';

// 반응형 미디어 쿼리 정의 (view point range 기준 정의)
const media = {
  mobile: `@media (max-width: 719px)`,
  tablet: `@media (min-width: 720px) and (max-width: 1439px)`,
  desktop: `@media (min-width: 1440px) and (max-width: 1919px)`,
  wide: `@media (min-width: 1920px)`,
  hover: '@media (hover: hover) and (pointer: fine)',
} as const;

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

// 컬러보드 디자인 시스템 반영 (세컨더리 보류)
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
  transparents: {
    BL100: 'var(--Colors-Transparent-BL100, rgba(25, 24, 29, 0.10))',
    BL200: 'var(--Colors-Transparent-BL200, rgba(25, 24, 29, 0.20))',
    WH200: 'var(--Colors-Transparent-WH200, rgba(252, 252, 255, 0.20))',
    WH300: 'var(--Colors-Transparent-WH300, rgba(252, 252, 255, 0.30))',
  },
};

// 컬러 opacity 유틸리티
const withOpacity = (color: string, opacity: number) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
};

// 컬러 Tints 유틸리티 (기본 컬러에 white 단계별로 추가)
const withTint = (color: string, amount: number) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const tintR = Math.round(r + (255 - r) * (amount / 100));
  const tintG = Math.round(g + (255 - g) * (amount / 100));
  const tintB = Math.round(b + (255 - b) * (amount / 100));
  
  return `#${tintR.toString(16).padStart(2, '0')}${tintG.toString(16).padStart(2, '0')}${tintB.toString(16).padStart(2, '0')}`;
};

// 컬러 Shadows 유틸리티 (기본 컬러에 black 단계별로 추가)
const withShade = (color: string, amount: number) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const shadeR = Math.round(r * (1 - amount / 100));
  const shadeG = Math.round(g * (1 - amount / 100));
  const shadeB = Math.round(b * (1 - amount / 100));
  
  return `#${shadeR.toString(16).padStart(2, '0')}${shadeG.toString(16).padStart(2, '0')}${shadeB.toString(16).padStart(2, '0')}`;
};

// Shape 유틸리티 (border-radius)
const borders = {
  hard: '0.5rem',
  sharp: '0.75rem',
  soft: '1.5rem',
  round: '2.25rem',
} as const;

// System 컬러 유틸리티 (테두리 컬러)
const systems = {
  default: '#D0D2DC',
  active: '#01B777',
  success: '#3D85FF',
  error: '#EF5D58',
  warning: '#EFB058',
} as const;

// 반응형 폰트 스타일: 옵셔널 속성 사용 (wide-tablet: 스타일 일치, mobile: 별도 분리)
const fonts = {
  heading: {
    Extra: createFontStyle(
      { tablet: 3, mobile: 1.5 }, 
      700, 
      { tablet: 4.5, mobile: 2.25 }, 
      { tablet: -0.06, mobile: -0.03 }
    ),  
    h1: createFontStyle(
      { tablet: 1.75, mobile: 1.375 }, 
      600,
      { tablet: 2.625, mobile: 2 },
      { tablet: -0.035, mobile: -0.0275 }
    ),      
    h2: createFontStyle(
      { tablet: 1.25, mobile: 1.125 }, 
      600, 
      { tablet: 2, mobile: 1.75 }, 
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
      { tablet: 1.63, mobile: 1.25 }, 
      { tablet: -0.0225, mobile: -0.0175 }
    ),   
          
  },
  body: {
    l500: createFontStyle(
      { tablet: 1.125, mobile: 1 }, 
      500, 
      { tablet: 1.75, mobile: 1.5 }, 
      { tablet: -0.0225, mobile: -0.02 }
    ),
    l400: createFontStyle(
      { tablet: 1.125, mobile: 1 }, 
      400, 
      { tablet: 1.75, mobile: 1.5 }, 
      { tablet: -0.0225, mobile: -0.02 }
    ),
    m500: createFontStyle(
      { tablet: 1, mobile: 0.875 }, 
      500, 
      { tablet: 1.5, mobile: 1.25 }, 
      { tablet: -0.02, mobile: -0.0175 }
    ),
    m400: createFontStyle(
      { tablet: 1, mobile: 0.875 }, 
      400, 
      { tablet: 1.5, mobile: 1.25 }, 
      { tablet: -0.02, mobile: -0.0175 }
    ),
    r500: createFontStyle(
      { tablet: 0.875, mobile: 0.8125 }, 
      500, 
      { tablet: 1.25, mobile: 1.125 }, 
      { tablet: -0.0175, mobile: -0.01625}
    ),
    r400: createFontStyle(
      { tablet: 0.875, mobile: 0.8125 }, 
      400, 
      { tablet: 1.25, mobile: 1.125 }, 
      { tablet: -0.0175, mobile: -0.01625}
    ),
    s500: createFontStyle(
      { tablet: 0.75, mobile: 0.75 }, 
      500, 
      { tablet: 1.125, mobile: 0.125 }, 
      { tablet: -0.015, mobile: -0.015 }
    ),
    s400: createFontStyle(
      { tablet: 0.75, mobile: 0.75 }, 
      400, 
      { tablet: 1.125, mobile: 0.125 }, 
      { tablet: -0.015, mobile: -0.015 }
    ),
  },
};

// dropshadows / 배경 블러: Backdrop blur / gradients
const effects = {
  dropShadows: {
    DS100: '0 0 4px 0 var(--Colors-Gray-Scale-GY100, #EEF0F5)',
    DS200: '0 1px 12px 0 var(--Colors-Gray-Scale-GY200, #E1E4EB)',
    DS300: '0 2px 18px 0 var(--Colors-Gray-Scale-GY300, #D0D2DC)',
  },
  
  backdropBlur: {
    BG100: 'backdrop-filter: blur(4px)',
    BG200: 'backdrop-filter: blur(8px)',
    BG300: 'backdrop-filter: blur(16px)',
    BG400: 'backdrop-filter: blur(24px)',
  },
  gradients: {
    primary: 'linear-gradient(83deg, var(--Colors-Primary-VT500, #973EE9) 9.02%, var(--Colors-Secondary-MT500, #66D7BC) 90.81%)',
    grayscale: 'linear-gradient(83deg, var(--Colors-Gray-Scale-GY300, #D0D2DC) 9.02%, var(--Colors-Gray-Scale-GY700, #6F7587) 90.81%)',
  },
};

// 반응형 레이아웃 공통 스타일 정의 (theme.layouts.mobileCommon 형태로 사용)
const layouts = {
  wideCommon: css`
    display: flex;
    width: 100vw;
    height: 67.5rem;
    padding: 0 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    flex-shrink: 0;
  `,
  desktopCommon: css`
    display: flex;
    width: 100vw;
    height: 67.5rem;
    padding: 0 var(--General-Margin, 2rem);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    flex-shrink: 0;
  `,
  tabletCommon: css`
    display: flex;
    width: 100vw;
    height: 67.5rem;
    padding: 0 var(--General-Margin, 2rem);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    flex-shrink: 0;
  `,
  mobileCommon: css`
    display: flex;
    width: 100vw;
    height: 67.5rem;
    padding: 0 var(--General-Margin, 1rem);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    flex-shrink: 0;
  `,
};

export const theme = {
  colors,
  fonts,
  effects,
  layouts,
  media,
  borders,
  systems,
  withOpacity,
  withTint,
  withShade,
} as const;

export type ThemeType = typeof theme;