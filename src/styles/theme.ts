import { css } from 'styled-components';

// 반응형 미디어 쿼리 정의 (view point range 기준 정의)
const media = {
  mobile: `@media (min-width: 14rem) and (max-width: 44.9375rem)`,
  tablet: `@media (min-width: 45rem) and (max-width: 89.9375rem)`,
  desktop: `@media (min-width: 90rem) and (max-width: 119.9375rem)`,
  wide: `@media (min-width: 120rem)`,
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
    MT400: '#6CC8C2',      
  },
  secondary: {
    VT700: '#7E19DC',
    VT500: '#973EE9',
    VT100: '#F5EEFB',
    VT50: '#FAF6FD',
    MT700: '#008565',
    MT500: '#66D7BC',
    MT100: '#D1EEED',

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
    BL100: 'rgba(25, 24, 29, 0.10)',
    BL200: 'rgba(25, 24, 29, 0.20)',
    WH200: 'rgba(252, 252, 255, 0.20)',
    WH300: 'rgba(252, 252, 255, 0.30)',
  },
  inner: {
    GL100: {
      background: 'rgba(252, 252, 255, 0.30)',
      boxShadow: '-0.0125rem 0 0.0625rem 0 #FCFCFF inset, 0 -0.0625rem 0.625rem 0 rgba(252, 252, 255, 0.30) inset, 0.01875rem 0.01875rem 0.03125rem 0 #FCFCFF inset, 0 0 0.5rem 0 rgba(25, 24, 29, 0.08) inset',
      backdropFilter: 'blur(0.125rem)',
    },
    GL200: {
      background: 'rgba(252, 252, 255, 0.05)',
      boxShadow: '-0.0125rem 0 0.09375rem 0 #FCFCFF inset, -0.0625rem -0.0625rem 0.625rem 0 rgba(252, 252, 255, 0.30) inset, 0.03125rem 0.03125rem 0.0625rem 0 #FCFCFF inset, 0.0625rem 0.0625rem 0.5rem 0 rgba(25, 24, 29, 0.08) inset',
      backdropFilter: 'blur(0.625rem)',
    },
    Gl_DS_VT: {
      background: 'rgba(252, 252, 255, 0.30)',
      boxShadow: '-0.0125rem 0 0.0625rem 0 #FCFCFF inset, 0 -0.0625rem 0.625rem 0 rgba(252, 252, 255, 0.30) inset, 0.01875rem 0.01875rem 0.03125rem 0 #FCFCFF inset, 0 0 0.5rem 0 rgba(25, 24, 29, 0.08) inset, 0 0.0625rem 0.75rem 0 rgba(151, 62, 233, 0.30)',
      backdropFilter: 'blur(0.625rem)',
    },
  },
  systems: {
    default: '#D0D2DC',
    active: '#01B777',
    success: '#3D85FF',
    error: '#EF5D58',
    warning: '#EFB058',
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

// Shape 유틸리티 (border-radius) - 반응형
const borders = {
  hard: {
    wide: '0.5rem',       // 8px
    desktop: '0.5rem',    // 8px
    tablet: '0.5rem',     // 8px
    mobile: '0.375rem',   // 6px
  },
  sharp: {
    wide: '0.75rem',      // 12px
    desktop: '0.75rem',   // 12px
    tablet: '0.75rem',    // 12px
    mobile: '0.5rem',     // 8px
  },
  smooth: {
    wide: '1.125rem',     // 18px
    desktop: '1.125rem',  // 18px
    tablet: '1.125rem',   // 18px
    mobile: '0.75rem',    // 12px
  },
  soft: {
    wide: '1.5rem',       // 24px
    desktop: '1.5rem',    // 24px
    tablet: '1.5rem',     // 24px
    mobile: '1.125rem',   // 18px
  },
  round: {
    wide: '2.25rem',      // 36px
    desktop: '2.25rem',   // 36px
    tablet: '2.25rem',    // 36px
    mobile: '1.5rem',     // 24px
  },
} as const;

// Gap 유틸리티 (spacing) - 반응형
const gaps = {
  none: {
    wide: '0',       // 0px
    desktop: '0',    // 0px
    tablet: '0',     // 0px
    mobile: '0',     // 0px
  },
  XXXS: {
    wide: '0.25rem',    // 4px
    desktop: '0.25rem', // 4px
    tablet: '0.25rem',  // 4px
    mobile: '0.125rem', // 2px
  },
  XXS: {
    wide: '0.5rem',     // 8px
    desktop: '0.5rem',  // 8px
    tablet: '0.375rem', // 6px
    mobile: '0.25rem',  // 4px
  },
  XS: {
    wide: '0.75rem',    // 12px
    desktop: '0.75rem', // 12px
    tablet: '0.5rem',   // 8px
    mobile: '0.375rem', // 6px
  },
  S: {
    wide: '1rem',       // 16px
    desktop: '1rem',    // 16px
    tablet: '0.625rem', // 10px
    mobile: '0.5rem',   // 8px
  },
  R: {
    wide: '1.25rem',    // 20px
    desktop: '1.25rem', // 20px
    tablet: '0.75rem',  // 12px
    mobile: '0.625rem', // 10px
  },
  M: {
    wide: '1.5rem',     // 24px
    desktop: '1.5rem',  // 24px
    tablet: '0.875rem', // 14px
    mobile: '0.75rem',  // 12px
  },
  L: {
    wide: '1.75rem',    // 28px
    desktop: '1.75rem', // 28px
    tablet: '1rem',     // 16px
    mobile: '0.875rem', // 14px
  },
  XL: {
    wide: '2rem',       // 32px
    desktop: '2rem',    // 32px
    tablet: '1.25rem',  // 20px
    mobile: '1rem',     // 16px
  },
  XXL: {
    wide: '2.75rem',    // 44px
    desktop: '2.75rem', // 44px
    tablet: '1.25rem',  // 20px
    mobile: '1rem',     // 16px
  },
  CenterSheet: {
    wide: '8.25rem',       // 132px
    desktop: '7.25rem',    // 116px
    tablet: '3rem',        // 48px
    mobile: '0.75rem',     // 12px
  },
  GeneralMargin: {
    wide: '2rem',          // 32px
    desktop: '2rem',       // 32px
    tablet: '2rem',        // 32px
    mobile: '1rem',        // 16px
  },
} as const;

// Component Width 유틸리티 (component widths) - 반응형
const componentWidths = {
  min: {
    wide: '8.25rem',      // 132px
    desktop: '8.25rem',   // 132px
    tablet: '8rem',       // 128px
    mobile: '6.0625rem',  // 97px
  },
  small: {
    wide: '15.5rem',      // 248px
    desktop: '15.5rem',   // 248px
    tablet: '14rem',      // 224px
    mobile: '8.0625rem',  // 129px
  },
  medium: {
    wide: '28rem',        // 448px
    desktop: '28rem',     // 448px
    tablet: '20rem',      // 320px
    mobile: '11.375rem',  // 182px
  },
  large: {
    wide: '42.5rem',      // 680px
    desktop: '42.5rem',   // 680px
    tablet: '41rem',      // 656px
    mobile: '20.5rem',    // 328px
  },
  max: {
    wide: '71.5rem',      // 1144px
    desktop: '71.5rem',   // 1144px
    tablet: '41rem',      // 656px
    mobile: '20.5rem',    // 328px
  },
} as const;

// Overlay Sheets Width 유틸리티 (modal/sheet widths) - 반응형
const overlaySheets = {
  width: {
    wide: '66.75rem',     // 1068px
    desktop: '51.75rem',  // 828px
    tablet: '36.25rem',   // 580px
    mobile: '22.5rem',    // 360px
  },
} as const;

// Overlay Modals Width 유틸리티 (modal widths) - 반응형
const overlayModals = {
  width: {
    wide: '35.25rem',     // 564px
    desktop: '35.25rem',  // 564px
    tablet: '27rem',      // 432px
    mobile: '20.5rem',    // 328px
  },
} as const;

// Source Width 유틸리티 (image/media source widths) - 반응형
const sourceWidths = {
  S: {
    wide: '1.25rem',      // 20px
    desktop: '1.25rem',   // 20px
    tablet: '1.125rem',   // 18px
    mobile: '1rem',       // 16px
  },
  R: {
    wide: '1.5rem',       // 24px
    desktop: '1.5rem',    // 24px
    tablet: '1.375rem',   // 22px
    mobile: '1.25rem',    // 20px
  },
  M: {
    wide: '1.75rem',      // 28px
    desktop: '1.75rem',   // 28px
    tablet: '1.5rem',     // 24px
    mobile: '1.375rem',   // 22px
  },
  L: {
    wide: '2.5rem',       // 40px
    desktop: '2.5rem',    // 40px
    tablet: '2.25rem',    // 36px
    mobile: '2rem',       // 32px
  },
} as const;

// General viewport sizes - 반응형
const generalViewport = {
  wide: '120rem',       // 1920px
  desktop: '90rem',     // 1440px
  tablet: '45rem',      // 720px
  mobile: '22.5rem',    // 360px
} as const;


// 반응형 폰트 스타일: 옵셔널 속성 사용 (wide-tablet: 스타일 일치, mobile: 별도 분리)
const fonts = {
  heading: {
    Extra: createFontStyle(
      { tablet: 2.5, mobile: 1.375 }, 
      700, 
      { tablet: 3.75, mobile: 2 }, 
      { tablet: -0.06, mobile: -0.03 }
    ),  
    h0: createFontStyle(
      { tablet: 1.75, mobile: 1.375 }, 
      600,
      { tablet: 2.625, mobile: 2 },
      { tablet: -0.035, mobile: -0.0275 }
    ),      
    h1: createFontStyle(
      { tablet: 1.25, mobile: 1.125 }, 
      600, 
      { tablet: 2, mobile: 1.75 }, 
      { tablet: -0.025, mobile: -0.0225 }
    ),     
    h2: createFontStyle(
      { tablet: 1.125, mobile: 1 }, 
      600, 
      { tablet: 1.75, mobile: 1.5 }, 
      { tablet: -0.0225, mobile: -0.02 }
    ),       
    h3: createFontStyle(
      { tablet: 1, mobile: 0.875 }, 
      600, 
      { tablet: 1.5, mobile: 1.31 }, 
      { tablet: -0.02, mobile: -0.0175 }
    ),     
    h4: createFontStyle(
      { tablet: 1.125, mobile: 0.75 }, 
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
    DS100: '0 0 0.25rem 0  rgba(25, 24, 29, 0.10)',
    DS200: '0 0.0625rem 0.75rem 0 rgba(25, 24, 29, 0.10)',
    DS300: '0 0.125rem 1.5rem 0 rgba(25, 24, 29, 0.10)',
    DS200_VT: '0 0.0625rem 0.75rem 0 rgba(151, 62, 233, 0.30)',
  },
  
  backdropBlur: {
    BG100: 'backdrop-filter: blur(0.25rem)',
    BG200: 'backdrop-filter: blur(0.5rem)',
    BG300: 'backdrop-filter: blur(1rem)',
    BG400: 'backdrop-filter: blur(1.5rem)',
  },
  gradients: {
    primary: 'linear-gradient(83deg, #973EE9 9.02%, #66D7BC 90.81%)',
    grayscale: 'linear-gradient(83deg, #D0D2DC 9.02%, #6F7587 90.81%)',
  },
};

// 반응형 값을 자동으로 적용하는 유틸리티 (속성값 전용)
const createResponsiveProperty = (property: string, values: { wide: string; desktop?: string; tablet?: string; mobile: string }) => {
  return css`
    ${property}: ${values.wide};

    ${media.desktop} {
      ${property}: ${values.desktop || values.wide};
    }

    ${media.tablet} {
      ${property}: ${values.tablet || values.desktop || values.wide};
    }

    ${media.mobile} {
      ${property}: ${values.mobile};
    }
  `;
};

// 반응형 값만 반환하는 유틸리티 (값 자체만 필요한 경우)
const responsive = {
  // gaps - 값만 반환 (기본값은 wide)
  gap: (size: keyof typeof gaps, breakpoint?: 'wide' | 'desktop' | 'tablet' | 'mobile') => {
    if (breakpoint) {
      return gaps[size][breakpoint];
    }
    return gaps[size].wide;
  },
  
  // borders - 값만 반환
  border: (type: keyof typeof borders, breakpoint?: 'wide' | 'desktop' | 'tablet' | 'mobile') => {
    if (breakpoint) {
      return borders[type][breakpoint];
    }
    return borders[type].wide;
  },
  
  // componentWidths - 값만 반환
  width: (size: keyof typeof componentWidths, breakpoint?: 'wide' | 'desktop' | 'tablet' | 'mobile') => {
    if (breakpoint) {
      return componentWidths[size][breakpoint];
    }
    return componentWidths[size].wide;
  },
  
  // sourceWidths - 값만 반환
  sourceWidth: (size: keyof typeof sourceWidths, breakpoint?: 'wide' | 'desktop' | 'tablet' | 'mobile') => {
    if (breakpoint) {
      return sourceWidths[size][breakpoint];
    }
    return sourceWidths[size].wide;
  },

  // padding 값만 반환 (gaps와 동일)
  padding: (size: keyof typeof gaps, breakpoint?: 'wide' | 'desktop' | 'tablet' | 'mobile') => {
    if (breakpoint) {
      return gaps[size][breakpoint];
    }
    return gaps[size].wide;
  },

  // borderRadius 값만 반환
  borderRadius: (type: keyof typeof borders, breakpoint?: 'wide' | 'desktop' | 'tablet' | 'mobile') => {
    if (breakpoint) {
      return borders[type][breakpoint];
    }
    return borders[type].wide;
  },

  // Overlay Modal width - 값만 반환
  overlayModalWidth: (breakpoint?: 'wide' | 'desktop' | 'tablet' | 'mobile') => {
    if (breakpoint) {
      return overlayModals.width[breakpoint];
    }
    return overlayModals.width.wide;
  },


  // 전체 속성을 반응형으로 적용하는 유틸리티
  property: {
    gap: (size: keyof typeof gaps) => createResponsiveProperty('gap', {
      wide: gaps[size].wide,
      desktop: gaps[size].desktop,
      tablet: gaps[size].tablet,
      mobile: gaps[size].mobile
    }),
    
    padding: (size: keyof typeof gaps) => createResponsiveProperty('padding', {
      wide: gaps[size].wide,
      desktop: gaps[size].desktop,
      tablet: gaps[size].tablet,
      mobile: gaps[size].mobile
    }),

    // 복잡한 padding 값들을 위한 유틸리티 (top right bottom left 순서)
    paddingComplex: (top: keyof typeof gaps, right: keyof typeof gaps, bottom: keyof typeof gaps, left: keyof typeof gaps) => createResponsiveProperty('padding', {
      wide: `${gaps[top].wide} ${gaps[right].wide} ${gaps[bottom].wide} ${gaps[left].wide}`,
      desktop: `${gaps[top].desktop} ${gaps[right].desktop} ${gaps[bottom].desktop} ${gaps[left].desktop}`,
      tablet: `${gaps[top].tablet} ${gaps[right].tablet} ${gaps[bottom].tablet} ${gaps[left].tablet}`,
      mobile: `${gaps[top].mobile} ${gaps[right].mobile} ${gaps[bottom].mobile} ${gaps[left].mobile}`
    }),
    
    borderRadius: (type: keyof typeof borders) => createResponsiveProperty('border-radius', {
      wide: borders[type].wide,
      desktop: borders[type].desktop,
      tablet: borders[type].tablet,
      mobile: borders[type].mobile
    }),
    
    width: (size: keyof typeof componentWidths) => createResponsiveProperty('width', {
      wide: componentWidths[size].wide,
      desktop: componentWidths[size].desktop,
      tablet: componentWidths[size].tablet,
      mobile: componentWidths[size].mobile
    }),

    height: (size: keyof typeof componentWidths) => createResponsiveProperty('height', {
      wide: componentWidths[size].wide,
      desktop: componentWidths[size].desktop,
      tablet: componentWidths[size].tablet,
      mobile: componentWidths[size].mobile
    }),

    // sourceWidth를 width 속성에 적용
    sourceWidth: (size: keyof typeof sourceWidths) => createResponsiveProperty('width', {
      wide: sourceWidths[size].wide,
      desktop: sourceWidths[size].desktop,
      tablet: sourceWidths[size].tablet,
      mobile: sourceWidths[size].mobile
    }),

    // sourceWidth를 height 속성에 적용
    sourceHeight: (size: keyof typeof sourceWidths) => createResponsiveProperty('height', {
      wide: sourceWidths[size].wide,
      desktop: sourceWidths[size].desktop,
      tablet: sourceWidths[size].tablet,
      mobile: sourceWidths[size].mobile
    }),
    
    // Overlay Modal width를 width 속성에 적용
    overlayModalWidth: () => createResponsiveProperty('width', {
      wide: overlayModals.width.wide,
      desktop: overlayModals.width.desktop,
      tablet: overlayModals.width.tablet,
      mobile: overlayModals.width.mobile
    }),

    // sourceWidth 크기를 width와 height에 동시 적용
    sourceSize: (size: keyof typeof sourceWidths) => css`
      ${createResponsiveProperty('width', {
        wide: sourceWidths[size].wide,
        desktop: sourceWidths[size].desktop,
        tablet: sourceWidths[size].tablet,
        mobile: sourceWidths[size].mobile
      })}
      ${createResponsiveProperty('height', {
        wide: sourceWidths[size].wide,
        desktop: sourceWidths[size].desktop,
        tablet: sourceWidths[size].tablet,
        mobile: sourceWidths[size].mobile
      })}
    `,

    // generalViewport를 width 속성에 적용
    generalViewport: () => createResponsiveProperty('width', {
      wide: generalViewport.wide,
      desktop: generalViewport.desktop,
      tablet: generalViewport.tablet,
      mobile: generalViewport.mobile
    })
  }
};

// 반응형 레이아웃 공통 스타일 정의 (theme.layouts.mobileCommon 형태로 사용)
const layouts = {
  wideCommon: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  `,
  desktopCommon: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;
  `,
  tabletCommon: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  `,
  mobileCommon: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  gaps,
  componentWidths,
  sourceWidths,
  overlaySheets,
  overlayModals,
  responsive,
  generalViewport,
  withOpacity,
  withTint,
  withShade,
} as const;

export type ThemeType = typeof theme;