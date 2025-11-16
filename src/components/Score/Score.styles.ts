import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StarContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--Gap-XXS, 0.5rem);
`;

export const StarButton = styled.button<{ $isFilled?: boolean; $disabled?: boolean }>`
  display: inline-flex;
  padding: var(--Gap-XXS, 0.5rem);
  justify-content: center;
  align-items: center;
  gap: var(--Gap-XXS, 0.5rem);
  border-radius: var(--Numbers-Border-Sharp, 0.75rem);
  background: var(--Colors-Gray-Scale-White, #FCFCFF);
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  flex-shrink: 0;
  transition: background-color 0.2s ease;

  img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
    ${({ $isFilled }) =>
      $isFilled
        ? `
      filter: brightness(0) saturate(100%) invert(37%) sepia(89%) saturate(2000%) hue-rotate(250deg) brightness(0.9) contrast(1.1);
    `
        : ""}
  }

  /* DActv (disabled) 상태 */
  &:disabled {
    background: var(--Colors-Gray-Scale-White, #FCFCFF);
    cursor: not-allowed;
  }

  /* hovering (기본 상태) - disabled가 아닐 때만 */
  &:hover:not(:active):not(:disabled) {
    background: var(--Colors-Secondary-VT100, #F5EEFB);
  }

  /* pressing (기본 상태) - disabled가 아닐 때만 */
  &:active:not(:disabled) {
    background: var(--Colors-Secondary-VT100, #F5EEFB);
    transition: none;
  }

  /* clicked (선택된 별) - 기본 상태는 이미 white */
  ${({ $isFilled }) =>
    $isFilled &&
    `
    background: var(--Colors-Gray-Scale-White, #FCFCFF);
    
    /* clicked_hovering - disabled가 아닐 때만 */
    &:hover:not(:active):not(:disabled) {
      background: var(--Colors-Secondary-VT100, #F5EEFB);
    }
    
    /* clicked_pressing - disabled가 아닐 때만 */
    &:active:not(:disabled) {
      background: var(--Colors-Secondary-VT100, #F5EEFB);
      transition: none;
    }
  `}
`;

