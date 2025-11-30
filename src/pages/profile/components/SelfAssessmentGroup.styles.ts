import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const GroupTitle = styled.h3`
  color: ${theme.colors.grayScale.black};
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem; /* 160% */
  letter-spacing: -0.025rem;
  margin: 0;
  white-space: nowrap;
`;

export const CardGrid = styled.div`
  display: flex;
  flex-direction: row;
  ${({ theme }) => theme.responsive.property.gap('M')}
  width: 100%;
  overflow-x: auto;
  padding-top: 0.5rem; /* 위쪽 그림자 공간 확보 */
  padding-bottom: 0.5rem; /* 아래쪽 그림자 공간 확보 */
  padding-left: 0.5rem; /* 첫 번째 카드 왼쪽 그림자 공간 확보 */
`;

export const CardWrapper = styled.div`
  flex: 0 0 auto;
  min-width: 0;
  width: calc((100% - 2 * ${({ theme }) => theme.responsive.gap('M')}) / 3);
  max-width: calc((100% - 2 * ${({ theme }) => theme.responsive.gap('M')}) / 3);
  
  /* Card 컴포넌트 내부 너비 제한 */
  & > * {
    width: 100% !important;
    max-width: 100% !important;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: ${theme.borders.soft};
  background: ${theme.colors.grayScale.white};
  box-shadow: ${theme.effects.dropShadows.DS100};
  border: 1px solid ${theme.colors.grayScale.gray100};
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

