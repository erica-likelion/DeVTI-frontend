// 차트 설정을 위한 상수들
export const CHART_CONFIG = {
  pie: {
    innerRadius: 0,
    outerRadius: 124,
    paddingAngle: 0,
  },
  bar: {
    maxBarSize: 28,
  },
  colors: {
    PM: '#973EE9',
    디자인: '#7FDAD4',
    프론트엔드: '#BB85ED',
    백엔드: '#EDC0FD',
  },
  margins: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  }
} as const;

// 색상 배열 (Cell 컴포넌트용)
export const CHART_COLORS = [
  CHART_CONFIG.colors.PM,
  CHART_CONFIG.colors.디자인,
  CHART_CONFIG.colors.프론트엔드,
  CHART_CONFIG.colors.백엔드,
];