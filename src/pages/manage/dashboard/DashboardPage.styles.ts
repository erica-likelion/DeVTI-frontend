import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 3.75rem;
  overflow-y: auto;
`;

export const TextButtonFrame = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StyledButton = styled.button`
  height: 2.5rem;

  ${theme.media.mobile} {
    height: 1.75rem;
  }
`;

export const TextFrame = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;
`;


export const Title = styled.h1`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
`;

export const Subtitle = styled.p`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.secondary.VT700};
`;

export const ControlButton = styled.div`
   ${({ theme }) => theme.responsive.property.width('large')}
`;


export const DashBoardSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3rem;

`;

export const PartGrid = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.responsive.property.gap('XXL')};
  
  ${theme.media.mobile} {
    flex-direction: column;
  }
  ${theme.media.tablet} {
    flex-direction: column;
  }
  ${theme.media.desktop} {
    flex-direction: column;
  }
  
`;

export const TeamPartGraphFrame = styled.div`
  display: flex;
  ${({ theme }) => theme.responsive.property.width('medium')}
  ${({ theme }) => theme.responsive.property.padding('XXL')}
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => theme.responsive.property.gap('L')};
  flex: 1 0 0;
  height: auto;

  background: ${({ theme }) => theme.colors.transparents.WH200};
  ${({ theme }) => theme.responsive.property.borderRadius('round')}
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS300};
  
  ${theme.media.desktop} {
    width: 100%;
  }
  ${theme.media.tablet} {
    width: 100%;
  }
  
  ${theme.media.mobile} {
    width: 100%;
  }
`;

export const GraphTitle = styled.h3`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
`;


export const ChartContainer = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: visible;
  text-align: center;
  
  .recharts-wrapper {
    pointer-events: none !important;
  }
  
  .recharts-surface {
    pointer-events: none !important;
  }
`;


export const TeamLanGraphFrame = styled.div`
  display: flex;
  width: 100%;
  ${({ theme }) => theme.responsive.property.padding('XXL')}
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => theme.responsive.property.gap('L')};
  flex: 1 0 0;

  background: ${({ theme }) => theme.colors.transparents.WH200};
  ${({ theme }) => theme.responsive.property.borderRadius('round')}
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS300};
`;

export const RadarGridFrame = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  width: 100%;
`;

export const RadarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.gap('CenterSheet')};
  width: 100%;

  /* 한 줄에 최대 4개 */
  & > div {
    flex: 0 0 calc(15%);
  }

  ${theme.media.desktop} {
    /* 한 줄에 최대 3개 */
    & > div {
      flex: 0 0 calc(25% - 2rem);
    }
  }

  ${theme.media.tablet} {
    /* 한 줄에 최대 2개 */
    & > div {
      flex: 0 0 calc(50% - 1.5rem);
    }
  }

  ${theme.media.mobile} {
    /* 한 줄에 1개 */
    & > div {
      flex: 0 0 100%;
    }
  }
`;

export const RadarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 15.5rem;
  height: 15.25rem;
  
  .recharts-wrapper {
    pointer-events: none;
  }
`;

export const TeamLabel = styled.h4`
  ${({ theme }) => theme.fonts.heading.h4}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;


/* RadarLegend 라벨 커스텀 */

export const RadarLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

export const RadarLegendItem = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('S')};
`;



/* 파이차트 라벨 커스텀 */
export const CustomLegend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => theme.responsive.property.gap('S')};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('S')};
`;

export const LegendIcon = styled.div<{ color: string }>`
  ${({ theme }) => theme.responsive.property.sourceSize('S')};
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  flex-shrink: 0;
`;

export const LegendText = styled.span`
  ${({ theme }) => theme.fonts.heading.h3}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

/* 파이차트 legend 컨테이너 위치 조정용 */
export const PieChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.width('small')};
  height: 15.5rem;

  ${theme.media.tablet} {
    height: 14rem;
  
  }
  
  ${theme.media.mobile} {

    height: 8.0625rem;
  }


`;

export const PMDesignGraphFrame = styled.div`
  display: flex;
  width: 100%;
  ${({ theme }) => theme.responsive.property.padding('XXL')}
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => theme.responsive.property.gap('L')};
  flex: 1 0 0;

  background: ${({ theme }) => theme.colors.transparents.WH200};
  ${({ theme }) => theme.responsive.property.borderRadius('round')}
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS300};
`;