import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 26.75rem;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('S')}
`;

export const ButtonWrapper = styled.div<{ $isSelected?: boolean }>`
  flex: 1 1 0; /* 동일한 너비로 분배 */
  
  ${({ theme }) => theme.media.tablet} {
    flex: 0 0 auto; /* 타블렛에서 flex 제거 */
  }
  
  ${({ theme }) => theme.media.mobile} {
    flex: 0 0 auto; /* 모바일에서 flex 제거 */
  }
  
  button {
    width: 100%; /* 버튼이 wrapper의 전체 너비 사용 */
    /* WtMTextButton의 box-shadow 유지 - 전역 theme 사용 */
    box-shadow: ${theme.effects.dropShadows.DS100};
    
    ${({ theme }) => theme.media.tablet} {
      display: flex;
      width: var(--Component-Width-Min, 8rem);
      padding: var(--Gap-XXS, 0.375rem) 0;
      justify-content: center;
      align-items: center;
    }
    
    ${({ theme }) => theme.media.mobile} {
      display: flex;
      width: var(--Component-Width-Min, 6.0625rem);
      padding: var(--Gap-XXS, 0.25rem) 0;
      justify-content: center;
      align-items: center;
    }
  }

  button:not(.selected) {
    background: ${theme.colors.grayScale.white} !important;
    color: ${theme.colors.grayScale.black} !important;
  }

  button:not(.selected):hover {
    color: ${theme.colors.secondary.VT700} !important;
  }

  button:not(.selected):active {
    background: ${theme.colors.secondary.VT100} !important;
    color: ${theme.colors.grayScale.black} !important;
  }

  & button.selected {
    background: ${theme.colors.secondary.VT100} !important;
    color: ${theme.colors.secondary.VT700} !important;
  }

  & button.selected:hover {
    background: ${theme.colors.secondary.VT100} !important;
    color: ${theme.colors.secondary.VT700} !important;
  }

  & button.selected:active {
    background: ${theme.colors.secondary.VT100} !important;
    color: ${theme.colors.secondary.VT700} !important;
  }
`;
