import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  
  ${({ theme }) => theme.media.tablet} {
    width: 100%; /* 타블렛에서 평점과 정렬되도록 너비 조정 */
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: 100%; /* 모바일에서 평점과 정렬되도록 너비 조정 */
  }
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
  flex-wrap: nowrap; /* 카드가 가로로 배치되도록 줄바꿈 방지 */
  ${({ theme }) => theme.responsive.property.gap('M')}
  width: 100%;
  overflow-x: auto;
  padding-top: 0.5rem; /* 위쪽 그림자 공간 확보 */
  padding-bottom: 0.5rem; /* 아래쪽 그림자 공간 확보 */
  padding-left: 0.5rem; /* 첫 번째 카드 왼쪽 그림자 공간 확보 */
  padding-right: 0.5rem; /* 마지막 카드 오른쪽 그림자 공간 확보 */
  
  ${({ theme }) => theme.media.mobile} {
    /* 스크롤 끝에 도달했을 때만 오른쪽 간격을 위해 마지막 카드에 margin 추가 필요 */
  }
`;

export const CardWrapper = styled.div`
  flex: 0 0 auto;
  min-width: 0;
  /* 카드가 가로로 배치되도록 고정 너비 설정 (피그마 디자인에 맞춤) */
  width: calc((100% - 2 * ${({ theme }) => theme.responsive.gap('M')}) / 3);
  min-width: 15rem; /* 최소 너비 설정으로 모바일에서도 가로 배치 유지 */
  
  ${({ theme }) => theme.media.wide} {
    width: 28rem; /* Component-Width-Medium */
    min-width: 28rem;
  }

  ${({ theme }) => theme.media.desktop} {
    width: 28rem; /* Component-Width-Medium */
    min-width: 28rem;
  }
  
  ${({ theme }) => theme.media.tablet} {
    width: var(--Component-Width-Medium, 20rem);
    min-width: var(--Component-Width-Medium, 20rem);
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: ${({ theme }) => theme.componentWidths.medium.mobile}; /* Component-Width-Medium: 11.375rem */
    min-width: ${({ theme }) => theme.componentWidths.medium.mobile};
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
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: ${theme.borders.soft};
  background: ${theme.colors.grayScale.white};
  box-shadow: ${theme.effects.dropShadows.DS100};
  border: 1px solid ${theme.colors.grayScale.gray100};
  
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    width: var(--Component-Width-Medium, 20rem);
    height: 15.5rem;
    padding: var(--Gap-R, 0.75rem);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--Gap-XS, 0.5rem);
  }
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    width: ${({ theme }) => theme.componentWidths.medium.mobile}; /* Component-Width-Medium: 11.375rem */
    height: 15.5rem;
    padding: ${({ theme }) => theme.gaps.R.mobile}; /* Gap-R: 0.625rem */
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.XS.mobile}; /* Gap-XS: 0.375rem */
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

