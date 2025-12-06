import { createGlobalStyle } from 'styled-components';

export const RechartsGlobalStyle = createGlobalStyle`
  
  .recharts-legend-wrapper {
    .recharts-legend-item {
      ${({ theme }) => theme.fonts.heading.h3}
      display: flex !important;
      align-items: center !important;
      gap: ${({ theme }) => theme.responsive.property.gap('S')} !important;
      margin-bottom: ${({ theme }) => theme.responsive.property.gap('S')} !important;
    
      
      & * {
        color: ${({ theme }) => theme.colors.grayScale.black} !important;
      }
      
    }
  
     .recharts-legend-icon {
      margin-right: 0 !important;
      border-radius: 50% !important;
      width: 1.25rem !important;
      height: 1.25rem !important;
    }
  }

  /* 차트 기본 스타일링 */
  .recharts-pie-sector {
    stroke: none !important;
  }
  
  
  /* 차트 가운데 정렬 */
  .recharts-wrapper {
    margin:auto !important;
  }
  
  /* Radar Chart 라벨 스타일링 */
  .recharts-polar-angle-axis-tick text {
    ${({ theme }) => theme.fonts.body.m500}
  }
  
  .recharts-polar-angle-axis-tick:nth-child(1) text {
    fill: #7E19DC !important;
  }
  .recharts-polar-angle-axis-tick:nth-child(2) text {
    fill: #743DB5 !important;
  }
  .recharts-polar-angle-axis-tick:nth-child(3) text {
    fill: #6A5ACD !important;
  }
  .recharts-polar-angle-axis-tick:nth-child(4) text {
    fill: #4A7C8F !important;
  }
  .recharts-polar-angle-axis-tick:nth-child(5) text {
    fill: #008565 !important;
  }
  

  /* Tooltip 스타일링 */
  .recharts-tooltip-wrapper {
    .recharts-default-tooltip {
      border-radius: ${({ theme }) => theme.borders.soft} !important;
      box-shadow: ${({ theme }) => theme.effects.dropShadows.DS200} !important;
    }

    /* tooltip 관련 css 임시 설정 -> 디자이너와 협의 후 수정 예정 */
    
    .recharts-tooltip-label {
      ${({ theme }) => theme.fonts.body.m400}
      color: ${({ theme }) => theme.colors.grayScale.black} !important;
    }
    
    .recharts-tooltip-item {
      ${({ theme }) => theme.fonts.body.s500}
      color: ${({ theme }) => theme.colors.grayScale.gray700} !important;
    }
  }

  /* Axis 스타일링 */
  .recharts-cartesian-axis-tick {
    .recharts-cartesian-axis-tick-value {
      ${({ theme }) => theme.fonts.heading.h3}
    }
  }
  
  

`;