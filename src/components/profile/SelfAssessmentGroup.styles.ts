import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  overflow: visible; /* 그림자가 잘리지 않도록 */
  
  ${({ theme }) => theme.media.tablet} {
    width: 100%; /* 타블렛에서 평점과 정렬되도록 너비 조정 */
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: 100%; /* 모바일에서 평점과 정렬되도록 너비 조정 */
  }
`;

export const GroupTitle = styled.h3`
  ${theme.fonts.heading.h3}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: nowrap;
`;

export const CardGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; /* 카드가 가로로 배치되도록 줄바꿈 방지 */
  width: 100%;
  overflow-x: auto;
  overflow-y: visible; /* 그림자가 위아래로 잘리지 않도록 */
  
  ${({ theme }) => theme.media.wide} {
    gap: ${({ theme }) => theme.gaps.R.wide};
    padding: ${({ theme }) => theme.gaps.XXS.wide}; /* 그림자 공간 확보 */
  }

  ${({ theme }) => theme.media.desktop} {
    gap: ${({ theme }) => theme.gaps.R.desktop};
    padding: ${({ theme }) => theme.gaps.XXS.desktop}; /* 그림자 공간 확보 */
  }

  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.R.tablet};
    padding: ${({ theme }) => theme.gaps.XXS.tablet}; /* 그림자 공간 확보 */
  }

  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.R.mobile};
    padding: ${({ theme }) => theme.gaps.XXS.mobile}; /* 그림자 공간 확보 */
  }
`;

export const CardWrapper = styled.div<{ $cardSize?: "M" | "L" }>`
  flex: 0 0 auto;
  min-width: 0;
  /* 카드가 가로로 배치되도록 고정 너비 설정 (피그마 디자인에 맞춤) */
  width: calc((100% - 2 * ${({ theme }) => theme.responsive.gap('M')}) / 3);
  min-width: 15rem; /* 최소 너비 설정으로 모바일에서도 가로 배치 유지 */
  
  ${({ theme, $cardSize }) => theme.media.wide} {
    width: ${({ $cardSize, theme }) => $cardSize === "L" ? theme.componentWidths.large.wide : '28rem'}; /* Component-Width-Large or Medium */
    min-width: ${({ $cardSize, theme }) => $cardSize === "L" ? theme.componentWidths.large.wide : '28rem'};
  }

  ${({ theme, $cardSize }) => theme.media.desktop} {
    width: ${({ $cardSize, theme }) => $cardSize === "L" ? theme.componentWidths.large.desktop : '28rem'}; /* Component-Width-Large or Medium */
    min-width: ${({ $cardSize, theme }) => $cardSize === "L" ? theme.componentWidths.large.desktop : '28rem'};
  }
  
  ${({ theme, $cardSize }) => theme.media.tablet} {
    width: ${({ $cardSize, theme }) => $cardSize === "L" ? theme.componentWidths.large.tablet : theme.componentWidths.medium.tablet};
    min-width: ${({ $cardSize, theme }) => $cardSize === "L" ? theme.componentWidths.large.tablet : theme.componentWidths.medium.tablet};
  }

  ${({ theme, $cardSize }) => theme.media.mobile} {
    width: ${({ $cardSize, theme }) => $cardSize === "L" ? theme.componentWidths.large.mobile : theme.componentWidths.medium.mobile};
    min-width: ${({ $cardSize, theme }) => $cardSize === "L" ? theme.componentWidths.large.mobile : theme.componentWidths.medium.mobile};
  }
  
  /* Card 컴포넌트 내부 너비 제한 */
  & > * {
    width: 100% !important;
    max-width: 100% !important;
  }
  
  /* 첫 번째 카드: margin 제거 */
  &:first-child {
    margin-left: 0;
  }
  
  /* 마지막 카드: margin 제거 */
  &:last-child {
    margin-right: 0;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.R.wide};
  padding: 0;
  border-radius: ${theme.borders.soft};
  background: ${theme.colors.grayScale.white};
  box-shadow: ${theme.effects.dropShadows.DS100};
  border: 1px solid ${theme.colors.grayScale.gray100};
  
  ${({ theme }) => theme.media.wide} {
    display: flex;
    width: 28rem;
    height: 15.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.R.wide};
  }
  
  ${({ theme }) => theme.media.desktop} {
    display: flex;
    width: 28rem;
    height: 15.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.R.desktop};
  }
  
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    width: ${({ theme }) => theme.componentWidths.medium.tablet};
    height: 15.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.R.tablet};
  }
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    width: ${({ theme }) => theme.componentWidths.medium.mobile}; /* Component-Width-Medium: 11.375rem */
    height: 15.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.R.mobile};
  }
`;

export const CardTitle = styled.h4`
  ${theme.fonts.heading.h4}
  color: ${theme.colors.grayScale.black};
  margin: 0;
`;

export const CardDescription = styled.p`
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.gray800};
  margin: 0;
  align-self: stretch;
`;

export const RatingGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const RatingOption = styled.label<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: ${theme.borders.sharp};
  border: 1px solid
    ${({ $active }) =>
      $active ? theme.colors.grayScale.gray600 : theme.colors.grayScale.gray300};
  background: ${theme.colors.grayScale.white};
  color: ${theme.colors.grayScale.black};
  transition: border-color 0.2s ease, background-color 0.2s ease;

  ${({ $active }) =>
    $active &&
    `
      background: ${theme.colors.grayScale.gray100};
    `}
`;

export const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const RatingCircle = styled.span<{ $active: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  aspect-ratio: 1 / 1;
  border-radius: ${theme.borders.round};
  background: ${theme.colors.grayScale.gray600};
  opacity: ${({ $active }) => ($active ? 1 : 0.35)};
  transition: opacity 0.2s ease, transform 0.2s ease;

  ${({ $active }) =>
    $active &&
    `
      transform: scale(1.05);
    `}
`;

export const RatingLabelText = styled.span`
  ${theme.fonts.body.l500}
  text-align: center;
  color: ${theme.colors.grayScale.black};
  white-space: nowrap;
`;

