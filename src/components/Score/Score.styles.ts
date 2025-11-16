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
  border-radius: ${theme.borders.sharp};
  background: ${theme.colors.grayScale.white};
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  flex-shrink: 0;
  transition: background-color 0.2s ease;

  img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
  }

  &:disabled {
    background: ${theme.colors.grayScale.white};
    cursor: not-allowed;
  }

  &:hover:not(:active):not(:disabled) {
    background: ${theme.colors.secondary.VT100};
  }

  &:active:not(:disabled) {
    background: ${theme.colors.secondary.VT100};
    transition: none;
  }

  ${({ $isFilled }) =>
    $isFilled &&
    `
    background: ${theme.colors.grayScale.white};

    &:hover:not(:active):not(:disabled) {
      background: ${theme.colors.secondary.VT100};
    }

    &:active:not(:disabled) {
      background: ${theme.colors.secondary.VT100};
      transition: none;
    }
  `}
`;

